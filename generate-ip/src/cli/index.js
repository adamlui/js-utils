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
          init = require(`./lib/init${env.modExt}`),
        { ipv4, ipv6, mac } = require(`../generate-ip${env.modExt}`),
          log = require(`./lib/log${env.modExt}`)

    await init.cli()

    // Exec CMD arg if passed
    if (cli.config.init) return init.configFile()
    else if (cli.config.help) return log.help()
    else if (cli.config.version) return log.version()

    // Log/copy random IP(s)
    const genOptions = { qty: cli.config.qty, verbose: !cli.config.quietMode },
          ipResult = { ipv4, ipv6, mac }[cli.config.mode || 'ipv4'].generate(genOptions)
    log.ifNotQuiet(`\n${cli.msgs.info_copyingToClip}...`)
    clipboardy.writeSync([].concat(ipResult).join('\n'))

})()
