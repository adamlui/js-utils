#!/usr/bin/env node

(async () => {
    'use strict'

    const args = process.argv.slice(2)
    globalThis.env = {
        debugMode: args.some(arg => /^--?debug(?:-?mode)?$/.test(arg)),
        devMode: /[\\/]src(?:[\\/]|$)/i.test(__dirname)
    }

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
        { generatePassword } = require(`../generate-pw${ env.devMode ? '' : '.min' }.js`),
        { generateRandomLang, getMsgs, getSysLang } = require(`./lib/language${ env.devMode ? '' : '.min' }.js`),
          github = require(`./lib/github${ env.devMode ? '' : '.min' }.js`),
          log = require(`./lib/log${ env.devMode ? '' : '.min' }.js`),
          settings = require(`./lib/settings${ env.devMode ? '' : '.min' }.js`)

    // Init APP data
    Object.assign(globalThis.app ??= {}, require(`../${ env.devMode ? '../' : './data/' }app.json`))
    env.sysLang = env.debugMode ? generateRandomLang({ excludes: ['en'] }) : getSysLang()
    app.msgs = await getMsgs(env.sysLang)
    app.urls.docs += '/#-command-line-usage'
    if (!(env.sysLang).startsWith('en')){ // localize app.urls.docs
        app.docLocale = env.sysLang.replace('_', '-').toLowerCase()
        app.docLocales = await github.getDirContents({ path: 'generate-pw/docs', type: 'dir' })
        if (app.docLocales.includes(app.docLocale))
            app.urls.docs = app.urls.docs.replace(/\/#.*$/g, `/${app.docLocale}#readme`)
    }

    // Exec CMD arg if passed
    for (const arg of args) {
        if (settings.controls.init.regex.test(arg)) return settings.initConfigFile()
        else if (settings.controls.help.regex.test(arg)) return log.help()
        else if (settings.controls.version.regex.test(arg)) return log.version()
    }

    // Copy random PASSWORD(s)
    settings.load()
    const genOptions = {
        length: app.config.length,
        qty: app.config.qty,
        strength: app.config.mode,
        charset: app.config.charset,
        exclude: app.config.excludeChars,
        numbers: !app.config.excludeNums,
        symbols: !app.config.excludeSymbols,
        lowercase: !app.config.excludeLowerChars,
        uppercase: !app.config.excludeUpperChars,
        similarChars: app.config.similarChars,
        strict: !app.config.unstrict,
        entropy: app.config.entropy,
        verbose: !app.config.quietMode
    }
    clipboardy.writeSync([].concat(generatePassword(genOptions)).join('\n'))
    log.ifNotQuiet(`\n${app.msgs.info_copyingToClip}...`)

})()
