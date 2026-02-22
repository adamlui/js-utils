#!/usr/bin/env node

(async () => {
    'use strict'

    globalThis.env = {
        args: process.argv.slice(2),
        paths: { lib: './lib' },
        devMode: /[\\/]src(?:[\\/]|$)/i.test(__dirname)
    }
    env.debugMode = env.args.some(arg => /^--?debug(?:-?mode)?$/.test(arg))

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
          geo = require(`../geolocate${ env.devMode ? '' : '.min' }.js`),
          init = require(`${env.paths.lib}/init`),
          log = require(`${env.paths.lib}/log`)

    await init.cli()

    // Exec CMD arg if passed
    if (cli.config.init) return init.configFile()
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
