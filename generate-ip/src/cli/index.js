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
          generateIP = require(`../generate-ip${ env.modes.dev ? '' : '.min' }.js`)

    await init.cli()

    // Exec CMD arg if passed
    if (cli.config.init) return init.configFile()
    else if (cli.config.help) return log.help()
    else if (cli.config.version) return log.version()
    else if (cli.config.stats) return log.stats()

    // Log/copy random IP(s)
    const genOptions = {
        qty: cli.config.qty,
        sequential: cli.config.sequential,
        network: cli.config.network,
        verbose: !cli.config.quietMode
    }
    log.break()
    clipboardy.writeSync([].concat(generateIP[cli.config.mode || 'ipv4'].generate(genOptions)).join('\n'))
    log.ifNotQuiet(`${cli.msgs.info_copyingToClip}...`)

})()
