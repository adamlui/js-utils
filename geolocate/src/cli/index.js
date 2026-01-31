#!/usr/bin/env node

(async () => {
    'use strict'

    globalThis.env = { devMode: /[\\/]src(?:[\\/]|$)/i.test(__dirname) }

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
          geo = require(`../geolocate${ env.devMode ? '' : '.min' }.js`),
        { getMsgs, getSysLang } = require(`./lib/language${ env.devMode ? '' : '.min' }.js`),
          log = require(`./lib/log${ env.devMode ? '' : '.min' }.js`),
          settings = require(`./lib/settings${ env.devMode ? '' : '.min' }.js`)

    // Init APP data
    Object.assign(globalThis.app ??= {}, require(`../${ env.devMode ? '../' : './data/' }app.json`))
    app.urls.docs += '/#-command-line-usage'
    app.msgs = await getMsgs(getSysLang())

    // Process ARGS
    const validIPs = []
    for (const arg of process.argv.slice(2)) {
        const isInitCmd = settings.controls.init.regex.test(arg)
        if (isInitCmd) return settings.initConfigFile()
        else if (settings.controls.help.regex.test(arg)) return log.help()
        else if (settings.controls.version.regex.test(arg)) return log.version()
        else if (!arg.startsWith('-') && !isInitCmd) // load IPs from leading-dash-less arg(s)
            validIPs.push(arg.replace(/[[\]]/g, '')) // strip '[]' in case copied from docs
    }

    // Log/copy GEO result(s)
    settings.load()
    const geoResults = await geo.locate(validIPs, { verbose: !app.config.quietMode })
    if (!geoResults) process.exit(1)
    if (!app.config.quietMode && geoResults.length == 1) log.geoData(geoResults[0])
    log.ifNotQuiet(`\n${app.msgs.info_copying}...`)
    clipboardy.writeSync(JSON.stringify(geoResults, undefined, 2))

})()
