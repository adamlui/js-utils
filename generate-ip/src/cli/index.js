#!/usr/bin/env node

(async () => {
    'use strict'

    globalThis.env = {
        args: process.argv.slice(2),
        paths: { lib: './lib' },
        devMode: /[\\/]src(?:[\\/]|$)/i.test(__dirname)
    }
    env.debugMode = env.args.some(arg => /^--?debug(?:[-_]?mode)?$/.test(arg))

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
          generateIP = require(`../generate-ip${ env.devMode ? '' : '.min' }.js`),
          init = require(`${env.paths.lib}/init`),
          log = require(`${env.paths.lib}/log`)

    await init.cli()

    // Exec CMD arg if passed
    if (cli.config.init) return init.configFile()
    else if (cli.config.help) return log.help()
    else if (cli.config.version) return log.version()

    // Log/copy random IP(s)
    const genOptions = {
        qty: cli.config.qty,
        sequential: cli.config.sequential,
        network: cli.config.network,
        verbose: !cli.config.quietMode
    }
    clipboardy.writeSync([].concat(generateIP[cli.config.mode || 'ipv4'].generate(genOptions)).join('\n'))
    log.ifNotQuiet(`\n${cli.msgs.info_copyingToClip}...`)

})()
