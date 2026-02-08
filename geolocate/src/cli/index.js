#!/usr/bin/env node

(async () => {
    'use strict'

    globalThis.env = {
        args: process.argv.slice(2),
        devMode: /[\\/]src(?:[\\/]|$)/i.test(__dirname)
    }
    env.debugMode = env.args.some(arg => /^--?debug(?:-?mode)?$/.test(arg))
    env.modExt = `${ env.devMode ? '' : '.min' }.js`

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
          geo = require(`../geolocate${env.modExt}`),
          initCLI = require(`./lib/init${env.modExt}`),
          log = require(`./lib/log${env.modExt}`),
          settings = require(`./lib/settings${env.modExt}`)

    await initCLI()

    // Exec CMD arg if passed
    if (cli.config.init) return settings.initConfigFile()
    else if (cli.config.help) return log.help()
    else if (cli.config.version) return log.version()

    // Process IP args
    const validIPs = []
    for (const arg of env.args) if (!arg.startsWith('-')) // load IP from leading-dash-less arg
        validIPs.push(arg.replace(/[[\]]/g, '')) // strip outer '[]' in case copied from docs

    // Log/copy GEO result(s)
    const geoResults = await geo.locate(validIPs, { verbose: !cli.config.quietMode })
    if (!geoResults) process.exit(1)
    if (!cli.config.quietMode && geoResults.length == 1) log.geoData(geoResults[0])
    log.ifNotQuiet(`\n${cli.msgs.info_copyingToClip}...`)
    clipboardy.writeSync(JSON.stringify(geoResults, null, 2))

})()
