#!/usr/bin/env node

(async () => {
    'use strict'

    globalThis.env = {
        args: process.argv.slice(2),
        devMode: /[\\/]src(?:[\\/]|$)/i.test(__dirname)
    }
    env.debugMode = env.args.some(arg => /^--?debug(?:-?mode)?$/.test(arg))

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
        { ipv4, ipv6, mac } = require(`../generate-ip${ env.devMode ? '' : '.min' }.js`),
          language = require(`./lib/language${ env.devMode ? '' : '.min' }.js`),
          log = require(`./lib/log${ env.devMode ? '' : '.min' }.js`),
          settings = require(`./lib/settings${ env.devMode ? '' : '.min' }.js`)

    // Init CLI data
    Object.assign(globalThis.cli ??= {}, require(`../${ env.devMode ? '../' : 'data/' }package-data.json`))
    cli.lang = settings.load('uiLang') || (
        env.debugMode ? language.generateRandomLang({ excludes: ['en'] }) : language.getSysLang() )
    cli.msgs = await language.getMsgs(cli.lang)
    cli.urls.docs += '/#-command-line-usage'

    // Exec CMD arg if passed
    for (const arg of env.args) {
        if (settings.controls.init.regex.test(arg)) return settings.initConfigFile()
        else if (settings.controls.help.regex.test(arg)) return log.help()
        else if (settings.controls.version.regex.test(arg)) return log.version()
    }

    // Log/copy random IP(s)
    settings.load() // all keys
    const genOptions = { qty: cli.config.qty, verbose: !cli.config.quietMode },
          ipResult = { ipv4, ipv6, mac }[cli.config.mode || 'ipv4'].generate(genOptions)
    log.ifNotQuiet(`\n${cli.msgs.info_copyingToClip}...`)
    clipboardy.writeSync([].concat(ipResult).join('\n'))

})()
