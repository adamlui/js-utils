#!/usr/bin/env node

(async () => {
    'use strict'

    globalThis.env = {
        args: process.argv.slice(2),
        devMode: /[\\/]src(?:[\\/]|$)/i.test(__dirname)
    }
    env.debugMode = env.args.some(arg => /^--?debug(?:-?mode)?$/.test(arg))

    // Import LIBS
    const compile = require(`./lib/compile${ env.devMode ? '' : '.min' }.js`),
        { findSCSS } = require(`../scss-to-css${ env.devMode ? '' : '.min' }.js`),
          fs = require('fs'),
          language = require(`./lib/language${ env.devMode ? '' : '.min' }.js`),
          log = require(`./lib/log${ env.devMode ? '' : '.min' }.js`),
          path = require('path'),
          settings = require(`./lib/settings${ env.devMode ? '' : '.min' }.js`)

    // Init CLI data
    Object.assign(globalThis.cli ??= {}, require(`../${ env.devMode ? '../' : 'data/' }package-data.json`))
    settings.load('uiLang')
    env.sysLang = cli.config.uiLang || (
        env.debugMode ? language.generateRandomLang({ excludes: ['en'] }) : language.getSysLang() )
    cli.msgs = await language.getMsgs(env.sysLang)
    cli.urls.docs += '/#-command-line-usage'
    if (!(env.sysLang).startsWith('en')){ // localize cli.urls.docs
        cli.docLocale = env.sysLang.replace('_', '-').toLowerCase()
        cli.docLocales = await language.getDocLocales()
        if (cli.docLocales.includes(cli.docLocale))
            cli.urls.docs = cli.urls.docs.replace(/\/[^/]+$/g, `/${cli.docLocale}#readme`)
    }

    // Exec CMD arg if passed
    for (const arg of env.args) {
        if (settings.controls.init.regex.test(arg)) return settings.initConfigFile()
        else if (settings.controls.help.regex.test(arg)) return log.help()
        else if (settings.controls.version.regex.test(arg)) return log.version()
    }

    // Init I/O args
    const [inputArg = '', outputArg = ''] = // default to empty strings for error-less handling
        env.args // exclude executable and script paths
            .filter(arg => !arg.startsWith('-')) // exclude flags
            .map(arg => arg.replace(/^\/*/, '')) // clean leading slashes to avoid parsing system root

    // Validate input arg (output arg can be anything)
    let inputPath = path.resolve(process.cwd(), inputArg)
    if (inputArg && !fs.existsSync(inputPath)) {
        const scssInputPath = inputPath + '.scss' // append '.scss' in case ommitted from intended filename
        if (!fs.existsSync(scssInputPath)) {
            log.error(`${cli.msgs.error_firstArgNotExist}.\n${inputPath} ${cli.msgs.error_doesNotExist}.`)
            log.success(`${cli.msgs.info_exampleValidCmd}: \n» scss-to-css . output.min.css`)
            log.helpCmdAndDocURL()
            process.exit(1)
        } else inputPath = scssInputPath
    }

    // Find all eligible SCSS files or arg-passed file
    settings.load()
    const srcFiles = inputPath.endsWith('.scss') && !fs.statSync(inputPath).isDirectory() ? [inputPath]
        : findSCSS(inputPath, {
            recursive: !cli.config.noRecursion,
            verbose: !cli.config.quietMode,
            ignores: (cli.config.ignores?.split(',') ?? []).map(ignore => ignore.trim())
        })

    // Print/compile files
    if (cli.config.dryRun) {
        if (srcFiles.length) {
            log.info(`${cli.msgs.info_scssFilesToBeCompiled}:`)
            srcFiles.forEach(file => console.info(log.colors.gry, file, log.colors.nc))
        } else // no files found
            log.info(`\n${cli.msgs.info_noSCSSfilesWillBeCompiled}.`)
    } else
        compile.scss({ srcFiles, inputPath, inputArg, outputArg })

})()
