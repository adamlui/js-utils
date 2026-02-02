#!/usr/bin/env node

(async () => {
    'use strict'

    globalThis.env = {
        debugMode: process.argv.slice(2).some(arg => /^--?debug(?:-?mode)?$/.test(arg)),
        devMode: /[\\/]src(?:[\\/]|$)/i.test(__dirname)
    }

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
        { getMsgs, getSysLang } = require(`./lib/language${ env.devMode ? '' : '.min' }.js`),
        { ipv4, ipv6, mac } = require(`../generate-ip${ env.devMode ? '' : '.min' }.js`),
          log = require(`./lib/log${ env.devMode ? '' : '.min' }.js`),
          settings = require(`./lib/settings${ env.devMode ? '' : '.min' }.js`)

    // Init APP data
    log.debug(Object.assign(globalThis.app ??= {}, require(`../${ env.devMode ? '../' : './data/' }app.json`)))
    app.msgs = await getMsgs(env.debugMode ? 'es' : getSysLang()) // --debug in Spanish to test jsDelivr
    app.urls.docs += '/#-command-line-usage'

    // Exec CMD arg if passed
    for (const arg of process.argv.slice(2)) {
        if (settings.controls.init.regex.test(arg)) return settings.initConfigFile()
        else if (settings.controls.help.regex.test(arg)) return log.help()
        else if (settings.controls.version.regex.test(arg)) return log.version()
    }

    // Log/copy random IP(s)
    settings.load()
    const genOptions = { qty: app.config.qty, verbose: !app.config.quietMode },
          ipResult = app.config.ipv6mode ? ipv6.generate(genOptions)
                   : app.config.macMode  ?  mac.generate(genOptions)
                                         : ipv4.generate(genOptions)
    log.ifNotQuiet(`\n${app.msgs.info_copying}...`)
    clipboardy.writeSync([].concat(ipResult).join('\n'))

})()
