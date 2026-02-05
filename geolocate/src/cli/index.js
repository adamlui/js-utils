#!/usr/bin/env node

(async () => {
    'use strict'

    const args = process.argv.slice(2)
    globalThis.env = {
        debugMode: args.some(arg => /^--?debug(?:-?mode)?$/.test(arg)),
        devMode: /[\\/]src(?:[\\/]|$)/i.test(__dirname)
    }

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
          geo = require(`../geolocate${ env.devMode ? '' : '.min' }.js`),
        { generateRandomLang, getMsgs, getSysLang } = require(`./lib/language${ env.devMode ? '' : '.min' }.js`),
          log = require(`./lib/log${ env.devMode ? '' : '.min' }.js`),
          settings = require(`./lib/settings${ env.devMode ? '' : '.min' }.js`)

    // Init CLI data
    Object.assign(globalThis.cli ??= {}, require(`../${ env.devMode ? '../' : './data/' }cli.json`))
    env.sysLang = env.debugMode ? generateRandomLang({ excludes: ['en'] }) : getSysLang()
    cli.msgs = await getMsgs(env.sysLang)
    cli.urls.docs += '/#-command-line-usage'

    // Process ARGS
    const validIPs = []
    for (const arg of args) {
        const isInitCmd = settings.controls.init.regex.test(arg)
        if (isInitCmd) return settings.initConfigFile()
        else if (settings.controls.help.regex.test(arg)) return log.help()
        else if (settings.controls.version.regex.test(arg)) return log.version()
        else if (!arg.startsWith('-') && !isInitCmd) // load IPs from leading-dash-less arg(s)
            validIPs.push(arg.replace(/[[\]]/g, '')) // strip '[]' in case copied from docs
    }

    // Log/copy GEO result(s)
    settings.load()
    const geoResults = await geo.locate(validIPs, { verbose: !cli.config.quietMode })
    if (!geoResults) process.exit(1)
    if (!cli.config.quietMode && geoResults.length == 1) log.geoData(geoResults[0])
    log.ifNotQuiet(`\n${cli.msgs.info_copyingToClip}...`)
    clipboardy.writeSync(JSON.stringify(geoResults, null, 2))

})()
