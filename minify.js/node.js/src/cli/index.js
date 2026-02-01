#!/usr/bin/env node

(async () => {
    'use strict'

    globalThis.env = {
        debugMode: process.argv.slice(2).some(arg => /^--?debug(?:-?mode)?$/.test(arg)),
        devMode: /[\\/]src(?:[\\/]|$)/i.test(__dirname)
    }

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
          fs = require('fs'),
        { getMsgs, getSysLang } = require(`./lib/language${ env.devMode ? '' : '.min' }.js`),
          log = require(`./lib/log${ env.devMode ? '' : '.min' }.js`),
          minifyJS = require(`../minify${ env.devMode ? '' : '.min' }.js`),
          path = require('path'),
          settings = require(`./lib/settings${ env.devMode ? '' : '.min' }.js`)

    // Init APP data
    Object.assign(globalThis.app ??= {}, require(`../${ env.devMode ? '../' : './data/' }app.json`))
    log.debug(app.urls.docs += '/#-command-line-usage')
    log.debug(app.msgs = await getMsgs(env.debugMode ? 'es' : getSysLang())) // use Spanish in --debug mode to test JSD

    // Exec CMD arg if passed
    for (const arg of process.argv.slice(2)) {
        if (settings.controls.init.regex.test(arg)) return settings.initConfigFile()
        else if (settings.controls.help.regex.test(arg)) return log.help()
        else if (settings.controls.version.regex.test(arg)) return log.version()
    }

    // Init I/O args
    const [inputArg = '', outputArg = ''] = // default to empty strings for error-less handling
        process.argv.slice(2) // exclude executable and script paths
            .filter(arg => !arg.startsWith('-')) // exclude flags
            .map(arg => arg.replace(/^\/*/, '')) // clean leading slashes to avoid parsing system root

    // Validate input arg (output arg can be anything)
    let inputPath = path.resolve(process.cwd(), inputArg)
    if (inputArg && !fs.existsSync(inputPath)) {
        const jsInputPath = inputPath + '.js' // append '.js' in case ommitted from intended filename
        if (!fs.existsSync(jsInputPath)) {
            log.error(`${app.msgs.error_firstArgNotExist}.\n${inputPath} ${app.msgs.error_doesNotExist}.`)
            log.success(`${app.msgs.info_exampleValidCmd}: \n» minify-js . output.min.js`)
            log.helpCmdAndDocURL()
            process.exit(1)
        } else inputPath = jsInputPath
    }

    // Find all eligible JavaScript files or arg-passed file
    settings.load()
    const ogJSfiles = inputPath.endsWith('.js') && !fs.statSync(inputPath).isDirectory() ? [inputPath]
        : minifyJS.findJS(inputPath, {
            recursive: !app.config.noRecursion,
            verbose: !app.config.quietMode,
            ignores: (app.config.ignores?.split(',') ?? []).map(ignore => ignore.trim())
        })

    if (app.config.dryRun) { // -n or --dry-run passed
        if (ogJSfiles.length) { // print files to be processed
            log.info(`${app.msgs.info_filesToBeMinned}:`)
            ogJSfiles.forEach(file => console.info(file))
        } else // no files found
            log.info(`${app.msgs.info_noFilesWillBeMinned}.`)

    } else { // actually minify JavaScript files

        // Build array of minification data
        const failedPaths = [] ; let minifyData = []
        if (!app.config.relativeOutput && fs.statSync(inputPath).isDirectory()) {
            const minifyResult = minifyJS.minify(inputPath, {
                verbose: false,
                mangle: !app.config.noMangle,
                comment: app.config.comment?.replace(/\\n/g, '\n'),
                relativeOutput: false,
                recursive: !app.config.noRecursion,
                dotFolders: !!app.config.includeDotFolders,
                dotFiles: !!app.config.includeDotFiles,
                rewriteImports: !!app.config.rewriteImports,
                ignores: app.config.ignores ? app.config.ignores.split(',').map(ignore => ignore.trim()) : []
            })
            if (minifyResult) {
                if (minifyResult.error) failedPaths.push(inputPath)
                else minifyData = [].concat(minifyResult)
            }
        } else minifyData = ogJSfiles.map(jsPath => {
            const minifyResult = minifyJS.minify(jsPath, {
                verbose: !app.config.quietMode,
                mangle: !app.config.noMangle,
                comment: app.config.comment?.replace(/\\n/g, '\n')
            })
            if (minifyResult.error) failedPaths.push(jsPath)
            return minifyResult
        }).filter(minifyResult => !minifyResult.error)

        // Print minification summary
        if (!app.config.quietMode) {
            if (minifyData?.length) {
                log.success(`${app.msgs.info_minComplete}!`)
                log.data(`${minifyData.length} ${app.msgs.info_file}`
                    + `${ minifyData.length == 1 ? '' : 's' } ${app.msgs.info_minified}.`)
            } else
                console.info(`${app.msgs.info_noFilesProcessed}.`)
            if (failedPaths.length) {
                log.error(`${failedPaths.length} ${app.msgs.info_file}`
                    + `${ failedPaths.length == 1 ? '' : 's' } ${app.msgs.info_failedToMinify}:`)
                failedPaths.forEach(path => console.info(path))
            }
        }
        if (!minifyData?.length) return

        // Copy single result code to clipboard if --copy passed
        if (app.config.copy && minifyData?.length == 1) {
            log.data(minifyData[0].code)
            log.ifNotQuiet(`\n${app.msgs.info_copying}...`)
            clipboardy.writeSync(minifyData[0].code)

        } else { // write array data to files
            log.ifNotQuiet(`\n${app.msgs.info_writing}${ minifyData?.length > 1 ? 's' : '' }...`)
            minifyData?.forEach(({ code, srcPath, relPath }) => {
                let outputDir, outputFilename
                if (!app.config.relativeOutput && relPath) { // preserve folder structure
                    const outputPath = path.resolve(process.cwd(), outputArg || 'min'),
                          relativeDir = path.dirname(relPath)
                    outputDir = relativeDir != '.' ? path.join(outputPath, relativeDir) : outputPath
                    outputFilename = path.basename(srcPath, '.js')
                                    + `${ app.config.noFilenameChange ? '' : '.min' }.js`
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
                    }${ app.config.noFilenameChange ? '' : '.min' }.js`
                }
                const outputPath = path.join(outputDir, outputFilename)
                if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })
                fs.writeFileSync(outputPath, code, 'utf8')
                log.ifNotQuiet(
                    `  ${log.colors.bg}✓${log.colors.nc} ${path.relative(process.cwd(), outputPath)}`)
            })
        }
    }

})()
