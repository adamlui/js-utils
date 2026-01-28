#!/usr/bin/env node

(() => {
    'use strict'

    globalThis.env = { devMode: __dirname.match(/[\\/]src/) }

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
        { execSync } = require('child_process'),
          fs = require('fs'),
          path = require('path'),
          scssToCSS = require(`../scss-to-css${ env.devMode ? '' : '.min' }.js`)

    // Init APP data
    globalThis.app = require(`../${ env.devMode ? '../' : './data/' }app.json`)
    app.urls.docs += '/#-command-line-usage'
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

    // Init UI colors
    const colors = {
        nc: '\x1b[0m',    // no color
        br: '\x1b[1;91m', // bright red
        by: '\x1b[1;33m', // bright yellow
        bg: '\x1b[1;92m', // bright green
        bw: '\x1b[1;97m', // bright white
        blk: '\x1b[30m',  // black
        btBG: '\x1b[106m' // bright teal bg
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
                console.error(`\n${
                    colors.br}ERROR: Arg [--${arg.replace(/-/g, '')}] requires '=' followed by a value.${colors.nc}`)
                printHelpCmdAndDocURL() ; process.exit(1)
            }
            const val = arg.split('=')[1]
            app.config[matchedParamOption] = parseInt(val) || val
        } else if (!matchedInfoCmd) {
            console.error(`\n${colors.br}ERROR: Arg [${arg}] not recognized.${colors.nc}`)
            console.info(`\n${colors.by}Valid arguments are below.${colors.nc}`)
            printHelpSections(['flags', 'paramOptions', 'infoCmds'])
            process.exit(1)
        }
    })

    // Show HELP screen if --?<h|help> passed
    if (process.argv.some(arg => app.regex.infoCmds.help.test(arg))) printHelpSections()

    // Show VERSION number if --?<v|version> passed
    else if (process.argv.some(arg => app.regex.infoCmds.version.test(arg))) {
        const globalVer = execSync(`npm view ${JSON.stringify(app.name)} version`).toString().trim() || 'none'
        let localVer, currentDir = process.cwd()
        while (currentDir != '/') {
            const localManifestPath = path.join(currentDir, 'package.json')
            if (fs.existsSync(localManifestPath)) {
                const localManifest = require(localManifestPath)
                localVer = (localManifest.dependencies?.[app.name]
                         || localManifest.devDependencies?.[app.name]
                )?.match(/^[~^>=]?\d+\.\d+\.\d+$/)[1] || 'none'
                break
            }
            currentDir = path.dirname(currentDir)
        }
        console.info(`\nGlobal version: ${globalVer}`)
        console.info(`Local version: ${localVer}`)

    } else { // run MAIN routine

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
                console.error(`\n${colors.br}Error: First argument can only be an existing file or directory.`
                    + `\n'${inputPath}' does not exist.${colors.nc}`)
                console.info(`\n${colors.bg}Example valid command: \n» scss-to-css . output.min.css${colors.nc}`)
                printHelpCmdAndDocURL() ; process.exit(1)
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
                console.info(`\n${colors.by}SCSS files to be compiled:${colors.nc}`)
                scssFiles.forEach(file => console.info(file))
            } else // no files found
                console.info(`${colors.by}\nNo SCSS files will be compiled.${colors.nc}`)

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
                printIfNotQuiet(`\n${colors.bg}Compilation complete!${colors.nc}`)
                printIfNotQuiet(`${colors.bw}${compileData.length} CSS file${cssCntSuffix}`
                    +( !app.config.noSourceMaps ? ` + ${compileData.length} source map${cssCntSuffix}` : '' )
                    + ` generated.${colors.nc}`)
            } else printIfNotQuiet(`\n${colors.by}No SCSS files processed.${colors.nc}`)
            if (failedPaths.length) {
                printIfNotQuiet(`\n${colors.br}`
                    + `${failedPaths.length} file${ failedPaths.length > 1 ? 's' : '' }`
                    + ` failed to compile:${colors.nc}`)
                failedPaths.forEach(path => printIfNotQuiet(path))
            }
            if (!compileData?.length) return

            // Copy single result code to clipboard if --copy passed
            if (app.config.copy && compileData?.length == 1) {
                console.log(`\n${colors.bw}${compileData[0].code}${colors.nc}`)
                printIfNotQuiet('\nCopying to clipboard...')
                clipboardy.writeSync(compileData[0].code)

            } else { // write array data to files
                printIfNotQuiet(`\nWriting to file${ compileData?.length > 1 ? 's' : '' }...`)
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
                    printIfNotQuiet(`  ${colors.bg}✓${colors.nc} ${path.relative(process.cwd(), outputPath)}`)
                    if (!app.config.noSourceMaps) fs.writeFileSync(outputPath + '.map', JSON.stringify(srcMap), 'utf8')
                    printIfNotQuiet(`  ${colors.bg}✓${colors.nc} ${path.relative(process.cwd(), outputPath)}`)
                })
            }
        }
    }

    // Define LOGGING functions

    function printHelpSections(includeSections = ['header', 'usage', 'pathArgs', 'flags', 'paramOptions', 'infoCmds']) {
        app.prefix = `${colors.btBG}${colors.blk} ${app.name.replace(/^@[^/]+\//, '')} ${colors.nc} `
        const helpSections = {
            header: [
                `\n├ ${app.prefix}© ${app.copyrightYear} ${app.author} under the ${app.license} license.`,
                `${app.prefix}Source: ${app.urls.src}`
            ],
            usage: [`\n${colors.bw}o Usage:${colors.nc}`, ` ${colors.bw}» ${colors.bg}${app.cmdFormat}${colors.nc}`],
            pathArgs: [
                `\n${colors.bw}o Path arguments:${colors.nc}`,
                ' [inputPath]                             '
                    + 'Path to SCSS file or directory containing SCSS files to be compiled,'
                    + ' relative to the current working directory.',
                ' [outputPath]                            '
                    + 'Path to file or directory where CSS + sourcemap files will be stored,'
                    + ' relative to input root (if not provided, css/ is used).'
            ],
            flags: [
                `\n${colors.bw}o Boolean options:${colors.nc}`,
                ' -n, --dry-run                           Don\'t actually compile the file(s),'
                                                        + ' just show if they will be processed.',
                ' -d, --include-dotfolders                Include dotfolders in file search.',
                ' -S, --no-source-maps                    Prevent source maps from being generated.',
                ' -M, --no-minify                         Disable minification of output CSS.',
                ' -R, --no-recursion                      Disable recursive file searching.',
                ' -r, --relative-output                   Output files relative to each source file instead of to input root.',
                ' -c, --copy                              Copy compiled CSS to clipboard instead of writing to file'
                                                        + ' if single source file is processed.',
                ' -q, --quiet                             Suppress all logging except errors.'
            ],
            paramOptions: [
                `\n${colors.bw}o Parameter options:${colors.nc}`,
                '--ignores="dir/,file1.scss,file2.scss"   Files/directories to exclude from compilation.',
                '--comment="comment"                      Prepend header comment to compiled CSS.'
                                                        + ' Separate by line using \'\\n\'.'
            ],
            infoCmds: [
                `\n${colors.bw}o Info commands:${colors.nc}`,
                ' -h, --help                              Display help screen.',
                ' -v, --version                           Show version number.'
            ]
        }
        includeSections.forEach(section => // print valid arg elems
            helpSections[section]?.forEach(line => printHelpMsg(line, /header|usage/.test(section) ? 1 : 41)))
        console.info(`\nFor more help, please visit: ${colors.bw}${app.urls.docs}${colors.nc}`)

        function printHelpMsg(msg, indent) { // wrap msg + indent 2nd+ lines
            const terminalWidth = process.stdout.columns || 80,
                  lines = [],
                  words = msg.match(/\S+|\s+/g),
                  prefix = '| '

            // Split msg into lines of appropriate lengths
            let currentLine = ''
            words.forEach(word => {
                const lineLength = terminalWidth - ( !lines.length ? 0 : indent )
                if (currentLine.length + prefix.length + word.length > lineLength) { // cap/store it
                    lines.push(!lines.length ? currentLine : currentLine.trimStart())
                    currentLine = ''
                }
                currentLine += word
            })
            lines.push(!lines.length ? currentLine : currentLine.trimStart())

            // Print formatted msg
            lines.forEach((line, idx) => console.info(prefix +(
                idx == 0 ? line // print 1st line unindented
                    : ' '.repeat(indent) + line // print subsequent lines indented
            )))
        }
    }

    function printHelpCmdAndDocURL() {
        console.info(`\nFor more help, type 'scss-to-css --help' or visit\n${colors.bw}${app.urls.docs}${colors.nc}`) }

    function printIfNotQuiet(msg) { if (!app.config.quietMode) console.info(msg) }
})()
