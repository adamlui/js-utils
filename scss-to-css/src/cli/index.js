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
          log = require(`./lib/log${ env.devMode ? '' : '.min' }.js`),
          path = require('path'),
          scssToCSS = require(`../scss-to-css${ env.devMode ? '' : '.min' }.js`),
          settings = require(`./lib/settings${ env.devMode ? '' : '.min' }.js`)

    // Init APP data
    Object.assign(globalThis.app ??= {}, require(`../${ env.devMode ? '../' : './data/' }app.json`))
    log.debug(app.msgs = await getMsgs(env.debugMode ? generateRandomLang({ excludes: ['en'] }) : getSysLang()))
    app.urls.docs += '/#-command-line-usage'

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
        const scssInputPath = inputPath + '.scss' // append '.scss' in case ommitted from intended filename
        if (!fs.existsSync(scssInputPath)) {
            log.error(`${app.msgs.error_firstArgNotExist}.\n${inputPath} ${app.msgs.error_doesNotExist}.`)
            log.success(`${app.msgs.info_exampleValidCmd}: \n» scss-to-css . output.min.css`)
            log.helpCmdAndDocURL()
            process.exit(1)
        } else inputPath = scssInputPath
    }

    // Find all eligible SCSS files or arg-passed file
    settings.load()
    const scssFiles = inputPath.endsWith('.scss') && !fs.statSync(inputPath).isDirectory() ? [inputPath]
        : scssToCSS.findSCSS(inputPath, {
            recursive: !app.config.noRecursion,
            verbose: !app.config.quietMode,
            ignores: (app.config.ignores?.split(',') ?? []).map(ignore => ignore.trim())
        })

    if (app.config.dryRun) { // -n or --dry-run passed
        if (scssFiles.length) { // print files to be processed
            log.info(`${app.msgs.info_scssFilesToBeCompiled}:`)
            scssFiles.forEach(file => console.info(file))
        } else // no files found
            log.info(`\n${app.msgs.info_noSCSSfilesWillBeCompiled}.`)

    } else { // actually compile SCSS files

        // Build array of compilation data
        const failedPaths = [] ; let compileData = []
        if (!app.config.relativeOutput && fs.statSync(inputPath).isDirectory()) {
            const compileResult = scssToCSS.compile(inputPath, {
                verbose: !app.config.quietMode,
                minify: !app.config.noMinify,
                comment: app.config.comment?.replace(/\\n/g, '\n'),
                relativeOutput: false,
                recursive: !app.config.noRecursion,
                dotFolders: app.config.includeDotFolders,
                sourceMaps: !app.config.noSourceMaps,
                ignores: app.config.ignores ? app.config.ignores.split(',').map(ignore => ignore.trim()) : []
            })
            if (Array.isArray(compileResult)) compileData = compileResult
            if (compileResult) {
                if (compileResult.error) failedPaths.push(inputPath)
                else compileData = [].concat(compileResult)
            }
        } else compileData = scssFiles.map(scssPath => {
            const compileResult = scssToCSS.compile(scssPath, {
                verbose: !app.config.quietMode,
                minify: !app.config.noMinify,
                sourceMaps: !app.config.noSourceMaps,
                comment: app.config.comment?.replace(/\\n/g, '\n')
            })
            if (compileResult.error) failedPaths.push(scssPath)
            return compileResult
        }).filter(compileResult => !compileResult.error)

        // Print compilation summary
        if (!app.config.quietMode) {
            const compiledCnt = compileData.length,
                  cssCntSuffix = compiledCnt == 1 ? '' : 's'
            if (compiledCnt) {
                log.success(`${app.msgs.info_compilationComplete}!`)
                log.data(`${compiledCnt} CSS ${app.msgs.info_file}${cssCntSuffix}${
                    !app.config.noSourceMaps ? ` + ${compiledCnt} ${app.msgs.info_srcMap}${cssCntSuffix}`
                        : '' } ${app.msgs.info_generated}.`
                )
            } else
                console.info(`${app.msgs.info_noSCSSfilesProcessed}.`)
            if (failedPaths.length) {
                log.error(`${failedPaths.length} ${app.msgs.info_file}${ failedPaths.length == 1 ? '' : 's' }`,
                    `${app.msgs.info_failedToCompile}:`)
                failedPaths.forEach(path => log.ifNotQuiet(path))
            }
        }
        if (!compileData?.length) return

        // Copy single result code to clipboard if --copy passed
        if (app.config.copy && compileData?.length == 1) {
            log.data(compileData[0].code)
            log.ifNotQuiet(`\n${app.msgs.info_copying}...`)
            clipboardy.writeSync(compileData[0].code)

        } else { // write array data to files
            log.ifNotQuiet(`\n${app.msgs.info_writing}${ compileData?.length > 1 ? 's' : '' }...`)
            compileData?.forEach(({ code, srcMap, srcPath, relPath }) => {
                let outputDir, outputFilename
                if (!app.config.relativeOutput && relPath) { // preserve folder structure
                    const outputPath = path.resolve(process.cwd(), outputArg || 'css'),
                          relativeDir = path.dirname(relPath)
                    outputDir = relativeDir != '.' ? path.join(outputPath, relativeDir) : outputPath
                    outputFilename = `${path.basename(srcPath, '.scss')}${ app.config.noMinify ? '' : '.min' }.css`
                } else {
                    outputDir = path.join(
                        path.dirname(srcPath), // path of file to be minified
                        outputArg.endsWith('.css') ? path.dirname(outputArg) // or path from file output arg
                            : outputArg || 'css' // or path from folder outputArg or css/ if no outputArg passed
                    )
                    outputFilename = `${
                        outputArg.endsWith('.css') && inputArg.endsWith('.scss')
                            ? path.basename(outputArg).replace(/(\.min)?\.css$/, '')
                                : path.basename(srcPath, '.scss')
                    }.min.css`
                }
                const outputPath = path.join(outputDir, outputFilename)
                fs.mkdirSync(outputDir, { recursive: true })
                fs.writeFileSync(outputPath, code, 'utf8')
                log.ifNotQuiet(`  ${log.colors.bg}✓${log.colors.nc} ${path.relative(process.cwd(), outputPath)}`)
                if (!app.config.noSourceMaps) fs.writeFileSync(`${outputPath}.map`, JSON.stringify(srcMap), 'utf8')
                log.ifNotQuiet(`  ${log.colors.bg}✓${log.colors.nc} ${path.relative(process.cwd(), outputPath)}.map`)
            })
        }
    }

})()
