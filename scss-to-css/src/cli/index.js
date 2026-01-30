#!/usr/bin/env node

(() => {
    'use strict'

    globalThis.env = { devMode: __dirname.match(/[\\/]src/) }

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
          fs = require('fs'),
          path = require('path'),
          print = require(`./lib/print${ env.devMode ? '' : '.min' }.js`),
          scssToCSS = require(`../scss-to-css${ env.devMode ? '' : '.min' }.js`),
          settings = require(`./lib/settings${ env.devMode ? '' : '.min' }.js`)

    // Init APP data
    Object.assign(globalThis.app ??= {}, require(`../${ env.devMode ? '../' : './data/' }app.json`))
    app.urls.docs += '/#-command-line-usage'

    // Show HELP screen if --?<h|help> passed
    if (process.argv.some(arg => settings.controls.help.regex.test(arg)))
        print.help()

    // Show VERSION number if --?<v|version> passed
    else if (process.argv.some(arg => settings.controls.version.regex.test(arg)))
        print.version()

    else { // run MAIN routine
        settings.load()

        // Init I/O args
        const [inputArg = '', outputArg = ''] = // default to empty strings for error-less handling
            process.argv.slice(2) // exclude executable and script paths
                .filter(arg => !arg.startsWith('-')) // exclude flags
                .map(arg => arg.replace(/^\/*/, '')) // clean leading slashes to avoid parsing system root

        // Validate input arg (output arg can be anything)
        let inputPath = path.resolve(process.cwd(), inputArg)
        if (inputArg && !fs.existsSync(inputPath)) {
            const scssInputPath = inputPath + '.scss' // append '.scss' in case ommitted from intended filename
            if (!fs.existsSync(scssInputPath)) {
                print.error('First argument can only be an existing file or directory.',
                    `\n'${inputPath}' does not exist.`)
                print.success(`Example valid command: \n» scss-to-css . output.min.css`)
                print.helpCmdAndDocURL()
                process.exit(1)
            } else inputPath = scssInputPath
        }

        // Find all eligible JavaScript files or arg-passed file
        const scssFiles = inputPath.endsWith('.scss') && !fs.statSync(inputPath).isDirectory() ? [inputPath]
            : scssToCSS.findSCSS(inputPath, {
                recursive: !app.config.noRecursion,
                verbose: !app.config.quietMode,
                ignores: (app.config.ignores?.split(',') ?? []).map(ignore => ignore.trim())
            })

        if (app.config.dryRun) { // -n or --dry-run passed
            if (scssFiles.length) { // print files to be processed
                print.info('SCSS files to be compiled:')
                scssFiles.forEach(file => console.info(file))
            } else // no files found
                print.info('\nNo SCSS files will be compiled.')

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
                    dotFolders: !!app.config.includeDotFolders,
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
            if (compileData?.length) {
                const cssCntSuffix = compileData.length > 1 ? 's' : ''
                print.ifNotQuiet(`\n${print.colors.bg}Compilation complete!${print.colors.nc}`)
                print.ifNotQuiet(`${print.colors.bw}${compileData.length} CSS file${cssCntSuffix}`
                    +( !app.config.noSourceMaps ? ` + ${compileData.length} source map${cssCntSuffix}` : '' )
                    + ` generated.${print.colors.nc}`)
            } else print.ifNotQuiet(`\n${print.colors.by}No SCSS files processed.${print.colors.nc}`)
            if (failedPaths.length) {
                print.ifNotQuiet(`\n${print.colors.br}`
                    + `${failedPaths.length} file${ failedPaths.length > 1 ? 's' : '' }`
                    + ` failed to compile:${print.colors.nc}`)
                failedPaths.forEach(path => print.ifNotQuiet(path))
            }
            if (!compileData?.length) return

            // Copy single result code to clipboard if --copy passed
            if (app.config.copy && compileData?.length == 1) {
                print.data(compileData[0].code)
                print.ifNotQuiet('\nCopying to clipboard...')
                clipboardy.writeSync(compileData[0].code)

            } else { // write array data to files
                print.ifNotQuiet(`\nWriting to file${ compileData?.length > 1 ? 's' : '' }...`)
                compileData?.forEach(({ code, srcMap, srcPath, relPath }) => {
                    let outputDir, outputFilename
                    if (!app.config.relativeOutput && relPath) { // preserve folder structure
                        const outputPath = path.resolve(process.cwd(), outputArg || 'css'),
                              relativeDir = path.dirname(relPath)
                        outputDir = relativeDir != '.' ? path.join(outputPath, relativeDir) : outputPath
                        outputFilename = path.basename(srcPath, '.scss') + `${ app.config.noMinify ? '' : '.min' }.css`
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
                    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })
                    fs.writeFileSync(outputPath, code, 'utf8')
                    print.ifNotQuiet(
                        `  ${print.colors.bg}✓${print.colors.nc} ${path.relative(process.cwd(), outputPath)}`)
                    if (!app.config.noSourceMaps) fs.writeFileSync(outputPath + '.map', JSON.stringify(srcMap), 'utf8')
                    print.ifNotQuiet(
                        `  ${print.colors.bg}✓${print.colors.nc} ${path.relative(process.cwd(), outputPath)}`)
                })
            }
        }
    }

})()
