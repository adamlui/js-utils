#!/usr/bin/env node

(async () => {
    'use strict'

    globalThis.env = { devMode: __dirname.match(/[\\/]src/) }

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
        { generatePassword } = require(`../generate-pw${ env.devMode ? '' : '.min' }.js`),
        { getMsgs, getSysLang } = require(`./lib/language${ env.devMode ? '' : '.min' }.js`),
          print = require(`./lib/print${ env.devMode ? '' : '.min' }.js`),
          settings = require(`./lib/settings${ env.devMode ? '' : '.min' }.js`)

    // Init APP data
    Object.assign(globalThis.app ??= {}, require(`../${ env.devMode ? '../' : './data/' }app.json`))
    app.urls.docs += '/#-command-line-usage'
    app.msgs = await getMsgs(getSysLang())

    // Show HELP screen if --?<h|help> passed
    if (process.argv.some(arg => settings.controls.help.regex.test(arg)))
        print.help()

    // Show VERSION number if --?<v|version> passed
    else if (process.argv.some(arg => settings.controls.version.regex.test(arg)))
        print.version()

    else { // copy RESULT(S)
        settings.load()
        const genOptions = {
            length: app.config.length || 8,
            qty: app.config.qty || 1,
            charset: app.config.charset,
            exclude: app.config.excludeChars,
            numbers: !!app.config.includeNums,
            symbols: !!app.config.includeSymbols,
            lowercase: !app.config.excludeLowerChars,
            uppercase: !app.config.excludeUpperChars,
            excludeSimilarChars: !!app.config.excludeSimilarChars,
            strict: !!app.config.strictMode,
            verbose: !app.config.quietMode
        }
        print.ifNotQuiet(`\n${app.msgs.info_copying}...`)
        clipboardy.writeSync([].concat(generatePassword(genOptions)).join('\n'))
    }

})()
