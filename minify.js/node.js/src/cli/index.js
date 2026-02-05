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
          fs = require('fs'),
        { generateRandomLang, getMsgs, getSysLang } = require(`./lib/language${ env.devMode ? '' : '.min' }.js`),
          github = require(`./lib/github${ env.devMode ? '' : '.min' }.js`),
          log = require(`./lib/log${ env.devMode ? '' : '.min' }.js`),
          minifyJS = require(`../minify${ env.devMode ? '' : '.min' }.js`),
          path = require('path'),
          settings = require(`./lib/settings${ env.devMode ? '' : '.min' }.js`)

    // Init CLI data
    Object.assign(globalThis.cli ??= {}, require(`../${ env.devMode ? '../' : './data/' }cli.json`))
    env.sysLang = env.debugMode ? generateRandomLang({ excludes: ['en'] }) : getSysLang()
    cli.msgs = await getMsgs(env.sysLang)
    cli.urls.docs += '/#-command-line-usage'
    if (!(env.sysLang).startsWith('en')){ // localize cli.urls.docs
        cli.docLocale = env.sysLang.replace('_', '-').toLowerCase()
        cli.docLocales = await github.getDirContents({ path: 'node.js/docs', type: 'dir' })
        if (cli.docLocales.includes(cli.docLocale))
            cli.urls.docs = cli.urls.docs.replace(/\/#.*$/g, `/${cli.docLocale}#readme`)
    }

    // Exec CMD arg if passed
    for (const arg of args) {
        if (settings.controls.init.regex.test(arg)) return settings.initConfigFile()
        else if (settings.controls.help.regex.test(arg)) return log.help()
        else if (settings.controls.version.regex.test(arg)) return log.version()
    }

    // Init I/O args
    const [inputArg = '', outputArg = ''] = // default to empty strings for error-less handling
        args // exclude executable and script paths
            .filter(arg => !arg.startsWith('-')) // exclude flags
            .map(arg => arg.replace(/^\/*/, '')) // clean leading slashes to avoid parsing system root

    // Validate input arg (output arg can be anything)
    let inputPath = path.resolve(process.cwd(), inputArg)
    if (inputArg && !fs.existsSync(inputPath)) {
        const jsInputPath = inputPath + '.js' // append '.js' in case ommitted from intended filename
        if (!fs.existsSync(jsInputPath)) {
            log.error(`${cli.msgs.error_firstArgNotExist}.\n${inputPath} ${cli.msgs.error_doesNotExist}.`)
            log.success(`${cli.msgs.info_exampleValidCmd}: \n» minify-js . output.min.js`)
            log.helpCmdAndDocURL()
            process.exit(1)
        } else inputPath = jsInputPath
    }

    // Find all eligible JavaScript files or arg-passed file
    settings.load()
    const ogJSfiles = inputPath.endsWith('.js') && !fs.statSync(inputPath).isDirectory() ? [inputPath]
        : minifyJS.findJS(inputPath, {
            recursive: !cli.config.noRecursion,
            verbose: !cli.config.quietMode,
            ignores: (cli.config.ignores?.split(',') ?? []).map(ignore => ignore.trim())
        })

    if (cli.config.dryRun) { // -n or --dry-run passed
        if (ogJSfiles.length) { // print files to be processed
            log.info(`${cli.msgs.info_filesToBeMinned}:`)
            ogJSfiles.forEach(file => console.info(file))
        } else // no files found
            log.info(`${cli.msgs.info_noFilesWillBeMinned}.`)

    } else { // actually minify JS files

        // Build array of minification data
        const failedPaths = [] ; let minifyData = []
        if (!cli.config.relativeOutput && fs.statSync(inputPath).isDirectory()) {
            const minifyResult = minifyJS.minify(inputPath, {
                verbose: false,
                mangle: !cli.config.noMangle,
                comment: cli.config.comment?.replace(/\\n/g, '\n'),
                relativeOutput: false,
                recursive: !cli.config.noRecursion,
                dotFolders: cli.config.includeDotFolders,
                dotFiles: cli.config.includeDotFiles,
                rewriteImports: cli.config.rewriteImports,
                ignores: cli.config.ignores ? cli.config.ignores.split(',').map(ignore => ignore.trim()) : []
            })
            if (minifyResult) {
                if (minifyResult.error) failedPaths.push(inputPath)
                else minifyData = [].concat(minifyResult)
            }
        } else minifyData = ogJSfiles.map(jsPath => {
            const minifyResult = minifyJS.minify(jsPath, {
                verbose: !cli.config.quietMode,
                mangle: !cli.config.noMangle,
                comment: cli.config.comment?.replace(/\\n/g, '\n')
            })
            if (minifyResult.error) failedPaths.push(jsPath)
            return minifyResult
        }).filter(minifyResult => !minifyResult.error)

        // Print minification summary
        if (!cli.config.quietMode) {
            if (minifyData?.length) {
                log.success(`${cli.msgs.info_minComplete}!`)
                log.data(`${minifyData.length} ${cli.msgs.info_file}`
                    + `${ minifyData.length == 1 ? '' : 's' } ${cli.msgs.info_minified}.`)
            } else
                console.info(`${cli.msgs.info_noFilesProcessed}.`)
            if (failedPaths.length) {
                log.error(`${failedPaths.length} ${cli.msgs.info_file}${ failedPaths.length == 1 ? '' : 's' }`,
                    `${cli.msgs.info_failedToMinify}:`)
                failedPaths.forEach(path => console.info(path))
            }
        }
        if (!minifyData?.length) return

        // Copy single result code to clipboard if --copy passed
        if (cli.config.copy && minifyData?.length == 1) {
            log.data(minifyData[0].code)
            log.ifNotQuiet(`\n${cli.msgs.info_copyingToClip}...`)
            clipboardy.writeSync(minifyData[0].code)

        } else { // write array data to files
            log.ifNotQuiet(`\n${cli.msgs.info_writing}${ minifyData?.length > 1 ? 's' : '' }...`)
            minifyData?.forEach(({ code, srcPath, relPath }) => {
                let outputDir, outputFilename
                if (!cli.config.relativeOutput && relPath) { // preserve folder structure
                    const outputPath = path.resolve(process.cwd(), outputArg || 'min'),
                          relativeDir = path.dirname(relPath)
                    outputDir = relativeDir != '.' ? path.join(outputPath, relativeDir) : outputPath
                    outputFilename = `${path.basename(srcPath, '.js')}${ cli.config.noFilenameChange ? '' : '.min' }.js`
                } else {
                    outputDir = path.join(
                        path.dirname(srcPath), // path of file to be minified
                        outputArg.endsWith('.js') ? path.dirname(outputArg) // + path from file outputArg
                            : outputArg || 'min' // or path from folder outputArg or min/ if no outputArg passed
                    )
                    outputFilename = `${
                        outputArg.endsWith('.js') && inputArg.endsWith('.js')
                            ? path.basename(outputArg).replace(/(\.min)?\.js$/, '')
                                : path.basename(srcPath, '.js')
                    }${ cli.config.noFilenameChange ? '' : '.min' }.js`
                }
                const outputPath = path.join(outputDir, outputFilename)
                fs.mkdirSync(outputDir, { recursive: true })
                fs.writeFileSync(outputPath, code, 'utf8')
                log.ifNotQuiet(`  ${log.colors.bg}✓${log.colors.nc} ${path.relative(process.cwd(), outputPath)}`)
            })
        }
    }

})()
