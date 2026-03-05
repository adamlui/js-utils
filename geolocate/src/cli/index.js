#!/usr/bin/env node

(async () => {
    'use strict'

    // Init ENV
    globalThis.env = { paths: { lib: './lib' }}
    const init = require(`${env.paths.lib}/init`)
    init.env()

    // Import LIBS
    globalThis.log = require(`${env.paths.lib}/log`)
    const clipboardy = require('node-clipboardy'),
          geo = require(`../geolocate${ env.modes.dev ? '' : '.min' }.js`)

    await init.cli()

    // Exec CMD arg if passed
    if (cli.config.init) return init.configFile()
    else if (cli.config.help) return log.help()
    else if (cli.config.version) return log.version()
    else if (cli.config.stats) return log.stats()

    // Process IP args
    const validIPs = []
    for (const arg of env.args) if (!arg.startsWith('-')) // load IP from leading-dash-less arg
        validIPs.push(arg.replace(/[[\]]/g, '')) // strip outer '[]' in case copied from docs

    // Log/copy GEO result(s)
    log.break()
    const geoResults = await geo.locate(validIPs, { verbose: !cli.config.quietMode })
    if (!geoResults) process.exit(1)
    if (!cli.config.quietMode && geoResults.length == 1) log.geoData(geoResults[0])
    log.ifNotQuiet(`${cli.msgs.info_copyingToClip}...`)
    clipboardy.writeSync(JSON.stringify(geoResults, null, 2))

})()
