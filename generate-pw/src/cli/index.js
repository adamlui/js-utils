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
          pkg = require(`./lib/pkg${ env.devMode ? '' : '.min' }.js`),
          settings = require(`./lib/settings${ env.devMode ? '' : '.min' }.js`)

    // Init CLI data
    Object.assign(globalThis.cli ??= {}, require(`../${ env.devMode ? '../' : './data/' }package-data.json`))
    env.sysLang = env.debugMode ? generateRandomLang({ excludes: ['en'] }) : getSysLang()
    cli.msgs = await getMsgs(env.sysLang)
    cli.urls.docs += '/#-command-line-usage'
    if (!(env.sysLang).startsWith('en')){ // localize cli.urls.docs
        cli.docLocale = env.sysLang.replace('_', '-').toLowerCase()
        cli.docLocales = await github.getDirContents({ path: 'generate-pw/docs', type: 'dir' })
        if (cli.docLocales.includes(cli.docLocale))
            cli.urls.docs = cli.urls.docs.replace(/\/#.*$/g, `/${cli.docLocale}#readme`)
    }
    cli.version = {} ; ['global', 'local'].forEach(verType => cli.version[verType] = pkg.getVer(verType) || 'none')

    // Exec CMD arg if passed
    for (const arg of args) {
        if (settings.controls.init.regex.test(arg)) return settings.initConfigFile()
        else if (settings.controls.help.regex.test(arg)) return log.help()
        else if (settings.controls.version.regex.test(arg)) return log.version()
    }

    // Copy random PASSWORD(s)
    settings.load()
    const genOptions = {
        length: cli.config.length,
        qty: cli.config.qty,
        strength: cli.config.mode,
        charset: cli.config.charset,
        exclude: cli.config.excludeChars,
        numbers: !cli.config.excludeNums,
        symbols: !cli.config.excludeSymbols,
        lowercase: !cli.config.excludeLowerChars,
        uppercase: !cli.config.excludeUpperChars,
        similarChars: cli.config.similarChars,
        strict: !cli.config.unstrict,
        entropy: cli.config.entropy,
        verbose: !cli.config.quietMode
    }
    clipboardy.writeSync([].concat(generatePassword(genOptions)).join('\n'))
    log.ifNotQuiet(`\n${cli.msgs.info_copyingToClip}...`)

})()
