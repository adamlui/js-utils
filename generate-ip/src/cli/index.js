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
          initCLI = require(`./lib/init${env.modExt}`),
        { ipv4, ipv6, mac } = require(`../generate-ip${env.modExt}`),
          log = require(`./lib/log${env.modExt}`),
          settings = require(`./lib/settings${env.modExt}`)

    await initCLI()

    // Exec CMD arg if passed
    for (const arg of env.args) {
        if (settings.controls.init.regex.test(arg)) return settings.initConfigFile()
        else if (settings.controls.help.regex.test(arg)) return log.help()
        else if (settings.controls.version.regex.test(arg)) return log.version()
    }

    // Log/copy random IP(s)
    const genOptions = { qty: cli.config.qty, verbose: !cli.config.quietMode },
          ipResult = { ipv4, ipv6, mac }[cli.config.mode || 'ipv4'].generate(genOptions)
    log.ifNotQuiet(`\n${cli.msgs.info_copyingToClip}...`)
    clipboardy.writeSync([].concat(ipResult).join('\n'))

})()
