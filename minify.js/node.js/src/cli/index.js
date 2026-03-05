#!/usr/bin/env node

(async () => {
    'use strict'

    // Init ENV
    const init = require('./lib/init')
    init.env()

    // Import LIBS
    globalThis.log = require('./lib/log')
    const compile = require('.lib/compile'),
        { findJS } = require('../minify'),
          fs = require('fs'),
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
        const jsInputPath = inputPath + '.js' // append '.js' in case ommitted from intended filename
        if (!fs.existsSync(jsInputPath)) {
            log.error(`${cli.msgs.error_firstArgNotExist}.\n${inputPath} ${cli.msgs.error_doesNotExist}.`)
            log.success(`${cli.msgs.info_exampleValidCmd}: \n» minify-js . output.min.js`)
            log.helpDocsCmdsDocsURL()
            process.exit(1)
        } else inputPath = jsInputPath
    }

    // Find all eligible JavaScript files or arg-passed file
    log.break()
    const srcFiles = inputPath.endsWith('.js') && !fs.statSync(inputPath).isDirectory() ? [inputPath]
        : findJS(inputPath, {
            recursive: !cli.config.noRecursion,
            verbose: !cli.config.quietMode,
            ignores: cli.config.ignores
        })

    // Print/compile files
    if (env.modes.debug || cli.config.dryRun) {
        if (srcFiles.length) {
            log.info(`${cli.msgs.info_filesToBeMinned}:`)
            srcFiles.forEach(file => log.dim(file))
        } else // no files found
            log.info(`${cli.msgs.info_noFilesWillBeMinned}.`)
    } else
        compile.js({ srcFiles, inputPath, inputArg, outputArg })

})()
