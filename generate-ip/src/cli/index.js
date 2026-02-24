#!/usr/bin/env node

(async () => {
    'use strict'

    globalThis.env = {
        args: process.argv.slice(2),
        modes: { dev: /[\\/]src(?:[\\/]|$)/i.test(__dirname) },
        paths: { lib: './lib' }
    }
    env.modes.debug = env.args.some(arg => /^--?debug(?:[-_]?mode)?$/.test(arg))

    // Import LIBS
    globalThis.log = require(`${env.paths.lib}/log`)
    const clipboardy = require('node-clipboardy'),
          generateIP = require(`../generate-ip${ env.modes.dev ? '' : '.min' }.js`),
          init = require(`${env.paths.lib}/init`)

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
