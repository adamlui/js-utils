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
    const compile = require(`${env.paths.lib}/compile`),
        { findSCSS } = require('../scss-to-css'),
          fs = require('fs'),
          init = require(`${env.paths.lib}/init`),
          path = require('path')

    await init.cli()

    // Exec CMD arg if passed
    if (cli.config.init) return init.configFile()
    else if (cli.config.help) return log.help()
    else if (cli.config.version) return log.version()
    else if (cli.config.stats) return log.stats()

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

    // Find all eligible source files or arg-passed file
    log.break()
    const srcFiles = /s[ac]ss$/.test(inputPath) && !fs.statSync(inputPath).isDirectory() ? [inputPath]
        : findSCSS(inputPath, {
            recursive: !cli.config.noRecursion,
            verbose: !cli.config.quietMode,
            ignores: cli.config.ignores
        })

    // Print/compile files
    if (env.modes.debug || cli.config.dryRun) {
        if (srcFiles.length) {
            log.info(`${cli.msgs.info_scssFilesToBeCompiled}:`)
            srcFiles.forEach(file => log.dim(file))
        } else // no files found
            log.info(`${cli.msgs.info_noSCSSfilesWillBeCompiled}.`)
    } else
        compile.scss({ srcFiles, inputPath, inputArg, outputArg })

})()
