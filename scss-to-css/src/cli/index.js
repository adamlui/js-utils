#!/usr/bin/env node

(() => {
    'use strict'

    globalThis.env = { devMode: __dirname.match(/[\\/]src/) }

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
          fs = require('fs'),
          path = require('path'),
          print = require(`./lib/print${ env.devMode ? '' : '.min' }.js`),
          scssToCSS = require(`../scss-to-css${ env.devMode ? '' : '.min' }.js`)

    // Init APP data
    globalThis.app = require(`../${ env.devMode ? '../' : './data/' }app.json`)
    app.urls.docs += '/#-command-line-usage'
    app.colors = {
        nc: '\x1b[0m',    // no color
        br: '\x1b[1;91m', // bright red
        by: '\x1b[1;33m', // bright yellow
        bg: '\x1b[1;92m', // bright green
        bw: '\x1b[1;97m', // bright white
        blk: '\x1b[30m',  // black
        tlBG: '\x1b[106m' // teal bg
    }
    app.regex = {
        flags: {
            dryRun: /^--?(?:n|dry-?run)$/,
            includeDotFolders: /^--?(?:dd?|(?:include-?)?dot-?(?:folder|dir(?:ector(?:y|ie))?)s?=?(?:true|1)?)$/,
            noSourceMaps: /^--?(?:S|(?:exclude|disable|no)-?so?u?rce?-?maps?|so?u?rce?-?maps?=(?:false|0))$/,
            noRecursion: /^--?(?:R|(?:disable|no)-?recursi(?:on|ve)|recursi(?:on|ve)=(?:false|0))$/,
            noMinify: /^--?(?:M|(?:disable|no)-?minif(?:y|ication)|minif(?:y|ication)=(?:false|0))$/,
            relativeOutput: /^--?(?:r|relative-?output?=?(?:true|1)?)$/,
            copy: /^--?c(?:opy)?$/,
            quietMode: /^--?q(?:uiet)?(?:-?mode)?$/
        },
        paramOptions: {
            ignores: /^--?(?:ignores?|(?:ignore|skip|exclude)(?:d?-?files?)?)(?:=.*|$)/,
            comment: /^--?comments?(?:=.*|$)/
        },
        infoCmds: {
            help: /^--?h(?:elp)?$/,
            version: /^--?ve?r?s?i?o?n?$/
        },
        version: /^[~^>=]?\d+\.\d+\.\d+$/
    }

    // Load SETTINGS from args
    app.config = {}
    process.argv.forEach(arg => {
        if (!arg.startsWith('-')) return
        const matchedParamOption = Object.keys(app.regex.paramOptions)
            .find(option => app.regex.paramOptions[option].test(arg))
        const matchedFlag = Object.keys(app.regex.flags).find(flag => app.regex.flags[flag].test(arg))
        const matchedInfoCmd = Object.keys(app.regex.infoCmds).find(cmd => app.regex.infoCmds[cmd].test(arg))
        if (matchedFlag) app.config[matchedFlag] = true
        else if (matchedParamOption) {
            if (!/=.+/.test(arg)) {
                console.error(`\n${app.colors.br}ERROR: Arg [--${
                    arg.replace(/-/g, '')}] requires '=' followed by a value.${app.colors.nc}`)
                print.helpCmdAndDocURL() ; process.exit(1)
            }
            const val = arg.split('=')[1]
            app.config[matchedParamOption] = parseInt(val) || val
        } else if (!matchedInfoCmd) {
            console.error(`\n${app.colors.br}ERROR: Arg [${arg}] not recognized.${app.colors.nc}`)
            console.info(`\n${app.colors.by}Valid arguments are below.${app.colors.nc}`)
            print.help(['flags', 'paramOptions', 'infoCmds'])
            process.exit(1)
        }
    })

    // Show HELP screen if --?<h|help> passed
    if (process.argv.some(arg => app.regex.infoCmds.help.test(arg)))
        print.help()

    // Show VERSION number if --?<v|version> passed
    else if (process.argv.some(arg => app.regex.infoCmds.version.test(arg)))
        print.version()

    else { // run MAIN routine

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
                console.error(`\n${app.colors.br}Error: First argument can only be an existing file or directory.`,
                    `\n'${inputPath}' does not exist.${app.colors.nc}`)
                console.info(
                    `\n${app.colors.bg}Example valid command: \n» scss-to-css . output.min.css${app.colors.nc}`)
                print.helpCmdAndDocURL() ; process.exit(1)
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
                console.info(`\n${app.colors.by}SCSS files to be compiled:${app.colors.nc}`)
                scssFiles.forEach(file => console.info(file))
            } else // no files found
                console.info(`${app.colors.by}\nNo SCSS files will be compiled.${app.colors.nc}`)

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
                print.ifNotQuiet(`\n${app.colors.bg}Compilation complete!${app.colors.nc}`)
                print.ifNotQuiet(`${app.colors.bw}${compileData.length} CSS file${cssCntSuffix}`
                    +( !app.config.noSourceMaps ? ` + ${compileData.length} source map${cssCntSuffix}` : '' )
                    + ` generated.${app.colors.nc}`)
            } else print.ifNotQuiet(`\n${app.colors.by}No SCSS files processed.${app.colors.nc}`)
            if (failedPaths.length) {
                print.ifNotQuiet(`\n${app.colors.br}`
                    + `${failedPaths.length} file${ failedPaths.length > 1 ? 's' : '' }`
                    + ` failed to compile:${app.colors.nc}`)
                failedPaths.forEach(path => print.ifNotQuiet(path))
            }
            if (!compileData?.length) return

            // Copy single result code to clipboard if --copy passed
            if (app.config.copy && compileData?.length == 1) {
                console.log(`\n${app.colors.bw}${compileData[0].code}${app.colors.nc}`)
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
                    print.ifNotQuiet(`  ${app.colors.bg}✓${app.colors.nc} ${path.relative(process.cwd(), outputPath)}`)
                    if (!app.config.noSourceMaps) fs.writeFileSync(outputPath + '.map', JSON.stringify(srcMap), 'utf8')
                    print.ifNotQuiet(`  ${app.colors.bg}✓${app.colors.nc} ${path.relative(process.cwd(), outputPath)}`)
                })
            }
        }
    }

})()
