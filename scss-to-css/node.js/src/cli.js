#!/usr/bin/env node

(() => {
    'use strict'

    const pkgName = '@adamlui/scss-to-css',
          copyright = '© 2024–2025 Adam Lui & contributors under the MIT license.',
          cmdFormat = 'scss-to-css [inputPath] [outputPath] [options]',
          srcURL = 'https://code.scsstocss.org/node.js',
          docURL = 'https://docs.scsstocss.org/node.js/#-command-line-usage'

    // Import LIBS
    const scssToCSS = require(__dirname.match(/src/) ? './scss-to-css' : './scss-to-css.min'),
        fs = require('fs'), path = require('path'),
        ncp = require('node-clipboardy'), // for --copy flag
        { execSync } = require('child_process') // for --version cmd

    // Init UI colors
    const nc = '\x1b[0m',    // no color
        br = '\x1b[1;91m', // bright red
        by = '\x1b[1;33m', // bright yellow
        bg = '\x1b[1;92m', // bright green
        bw = '\x1b[1;97m' // bright white

    // Load FLAG settings
    const config = {}
    const reArgs = {
        flags: {
            'dryRun': /^--?(?:n|dry-?run)$/,
            'includeDotFolders': /^--?(?:dd?|(?:include-?)?dot-?(?:folder|dir(?:ector(?:y|ie))?)s?=?(?:true|1)?)$/,
            'noSourceMaps': /^--?(?:S|(?:exclude|disable|no)-?so?u?rce?-?maps?|so?u?rce?-?maps?=(?:false|0))$/,
            'noRecursion': /^--?(?:R|(?:disable|no)-?recursi(?:on|ve)|recursi(?:on|ve)=(?:false|0))$/,
            'noMinify': /^--?(?:M|(?:disable|no)-?minif(?:y|ication)|minif(?:y|ication)=(?:false|0))$/,
            'copy': /^--?c(?:opy)?$/,
            'quietMode': /^--?q(?:uiet)?(?:-?mode)?$/
        },
        paramOptions: {
            'ignoreFiles': /^--?(?:ignore|skip|exclude)(?:d?-?files?)?(?:=.*|$)/,
            'comment': /^--?comments?(?:=.*|$)/
        },
        infoCmds: { 'help': /^--?h(?:elp)?$/,'version': /^--?ve?r?s?i?o?n?$/ }
    }
    process.argv.forEach(arg => {
        if (!arg.startsWith('-')) return
        const matchedFlag = Object.keys(reArgs.flags).find(flag => reArgs.flags[flag].test(arg)),
            matchedParamOption = Object.keys(reArgs.paramOptions).find(option => reArgs.paramOptions[option].test(arg)),
            matchedInfoCmd = Object.keys(reArgs.infoCmds).find(cmd => reArgs.infoCmds[cmd].test(arg))
        if (matchedFlag) config[matchedFlag] = true
        else if (matchedParamOption) {
            if (!/=.+/.test(arg)) {
                console.error(`\n${br}ERROR: Arg [--${arg.replace(/-/g, '')}] requires '=' followed by a value.${nc}`)
                printHelpCmdAndDocURL() ; process.exit(1)
            }
            const value = arg.split('=')[1]
            config[matchedParamOption] = parseInt(value) || value
        } else if (!matchedInfoCmd) {
            console.error(`\n${br}ERROR: Arg [${arg}] not recognized.${nc}`)
            console.info(`\n${by}Valid arguments are below.${nc}`)
            printHelpSections(['flags', 'paramOptions', 'infoCmds'])
            process.exit(1)
    }})

    // Show HELP screen if -h or --help passed
    if (process.argv.some(arg => reArgs.infoCmds.help.test(arg))) printHelpSections()

    // Show VERSION number if -v or --version passed
    else if (process.argv.some(arg => reArgs.infoCmds.version.test(arg))) {
        const globalVer = execSync(`npm view ${pkgName} version`).toString().trim() || 'none'
        let localVer, currentDir = process.cwd()
        while (currentDir != '/') {
            const localManifestPath = path.join(currentDir, 'package.json')
            if (fs.existsSync(localManifestPath)) {
                const localManifest = require(localManifestPath)
                localVer = ( localManifest.dependencies?.[pkgName]
                        || localManifest.devDependencies?.[pkgName]
                )?.match(/(\d+\.\d+\.\d+)/)[0] || 'none'
                break
            }
            currentDir = path.dirname(currentDir)
        }
        console.info(`\nGlobal version: ${globalVer}`)
        console.info(`Local version: ${localVer}`)

    } else { // run MAIN routine

        // Init I/O args
        const [inputArg = '', outputArg = ''] = ( // default to empty strings for error-less handling
            process.argv.slice(2) // exclude executable and script paths
                .filter(arg => !arg.startsWith('-')) // exclude flags
                .map(arg => arg.replace(/^\/*/, '')) // clean leading slashes to avoid parsing system root
        )

        // Validate input arg (output arg can be anything)
        let inputPath = path.resolve(process.cwd(), inputArg)
        if (inputArg && !fs.existsSync(inputPath)) {
            const scssInputPath = inputPath + '.scss' // append '.scss' in case ommitted from intended filename
            if (!fs.existsSync(scssInputPath)) {
                console.error(`\n${br}Error: First argument can only be an existing file or directory.`
                    + `\n'${inputPath}' does not exist.${nc}`)
                console.info(`\n${bg}Example valid command: \n» scss-to-css . output.min.css${nc}`)
                printHelpCmdAndDocURL() ; process.exit(1)
            } else inputPath = scssInputPath
        }

        // Find all eligible JavaScript files or arg-passed file
        const scssFiles = inputPath.endsWith('.scss') && !fs.statSync(inputPath).isDirectory() ? [inputPath]
            : scssToCSS.findSCSS(inputPath, {
                recursive: !config.noRecursion, verbose: !config.quietMode,
                ignoreFiles: (config.ignoreFiles?.split(',') ?? []).map(file => file.trim())
            })

        if (config.dryRun) { // -n or --dry-run passed
            if (scssFiles.length) { // print files to be processed
                console.info(`\n${by}SCSS files to be compiled:${nc}`)
                scssFiles.forEach(file => console.info(file))
            } else console.info(`${by}\nNo SCSS files will be compiled.${nc}`)

        } else { // actually compile SCSS files

            // Build array of compilation data
            const failedPaths = []
            const compileData = scssFiles.map(scssPath => {
                const compileResult = scssToCSS.compile(scssPath, {
                    verbose: !config.quietMode, minify: !config.noMinify, sourceMaps: !config.noSourceMaps,
                    comment: config.comment?.replace(/\\n/g, '\n')
                })
                if (compileResult.error) failedPaths.push(scssPath)
                return compileResult
            }).filter(data => !data.error ) // filter out failed compilations

            // Print compilation summary
            if (compileData?.length) {
                const cssCntSuffix = compileData.length > 1 ? 's' : ''
                printIfNotQuiet(`\n${bg}Compilation complete!${nc}`)
                printIfNotQuiet(`${bw + compileData.length} CSS file${ cssCntSuffix }`
                    + ( !config.noSourceMaps ? ` + ${compileData.length} source map${ cssCntSuffix }` : '' )
                    + ' generated.' + nc)
            } else printIfNotQuiet(`\n${by}No SCSS files processed.${nc}`)
            if (failedPaths.length) {
                printIfNotQuiet(`\n${br}`
                    + `${failedPaths.length} file${ failedPaths.length > 1 ? 's' : '' }`
                    + ` failed to compile:${nc}`)
                failedPaths.forEach(path => printIfNotQuiet(path))
            }
            if (compileData?.length == 0) process.exit(0)

            // Copy single result code to clipboard if --copy passed
            if (config.copy && compileData?.length == 1) {
                console.log(`\n${bw + compileData[0].code + nc}`)
                printIfNotQuiet('\nCopying to clipboard...')
                ncp.writeSync(compileData[0].code)

            } else { // write array data to files
                printIfNotQuiet(`\nWriting to file${ compileData?.length > 1 ? 's' : '' }...`)
                compileData?.forEach(({ code, srcMap, srcPath }) => {
                    const outputDir = path.join(
                        path.dirname(srcPath), // path of file to be minified
                        /(?:src|s[ac]ss)$/.test(path.dirname(srcPath)) ? (
                            '../' + ( outputArg || 'css' ) // + ../outputArg|css/ if in *(src|sass|scss)/
                        ) : outputArg.endsWith('.css') ? path.dirname(outputArg) // or path from file output arg
                          : outputArg || 'css' // or path from folder outputArg or css/ if no outputArg passed
                    )
                    const outputFilename = (
                        outputArg.endsWith('.css') && inputArg.endsWith('.scss')
                            ? path.basename(outputArg).replace(/(\.min)?\.css$/, '')
                            : path.basename(srcPath, '.scss')
                    ) + '.min.css'
                    const outputPath = path.join(outputDir, outputFilename)
                    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })
                    fs.writeFileSync(outputPath, code, 'utf8')
                    if (!config.noSourceMaps) fs.writeFileSync(outputPath + '.map', JSON.stringify(srcMap), 'utf8')
                })
            }
        }
    }

    // Define LOGGING functions

    function printHelpSections(includeSections = ['header', 'usage', 'pathArgs', 'flags', 'paramOptions', 'infoCmds']) {
        const appPrefix = `\x1b[106m\x1b[30m ${pkgName.replace(/^@[^/]+\//, '')} ${nc} ` // bright teal bg + black fg
        const helpSections = {
            'header': [`\n├ ${ appPrefix + copyright }`, `${ appPrefix }Source: ${srcURL}`],
            'usage': [`\n${bw}o Usage:${nc}`, ` ${bw}» ${bg + cmdFormat + nc}`],
            'pathArgs': [
                `\n${bw}o Path arguments:${nc}`,
                ' [inputPath]                             '
                    + 'Path to SCSS file or directory containing SCSS files to be compiled,'
                    + ' relative to the current working directory.',
                ' [outputPath]                            '
                    + 'Path to file or directory where CSS + sourcemap files will be stored,'
                    + ' relative to original file location (if not provided, css/ is used).'
            ],
            'flags': [
                `\n${bw}o Boolean options:${nc}`,
                ' -n, --dry-run                           Don\'t actually compile the file(s),'
                                                        + ' just show if they will be processed.',
                ' -d, --include-dotfolders                Include dotfolders in file search.',
                ' -S, --no-source-maps                    Prevent source maps from being generated.',
                ' -M, --no-minify                         Disable minification of output CSS.',
                ' -R, --no-recursion                      Disable recursive file searching.',
                ' -c, --copy                              Copy compiled CSS to clipboard instead of writing to file'
                                                        + ' if single source file is processed.',
                ' -q, --quiet                             Suppress all logging except errors.'
            ],
            'paramOptions': [
                `\n${bw}o Parameter options:${nc}`,
                '--ignore-files="file1.scss,file2.scss"   Files to exclude from compilation.',
                '--comment="comment"                      Prepend header comment to compiled CSS.'
                                                        + ' Separate by line using \'\\n\'.'
            ],
            'infoCmds': [
                `\n${bw}o Info commands:${nc}`,
                ' -h, --help                              Display help screen.',
                ' -v, --version                           Show version number.'
            ]
        }
        includeSections.forEach(section => // print valid arg elems
            helpSections[section]?.forEach(line => printHelpMsg(line, /header|usage/.test(section) ? 1 : 41)))
        console.info('\nFor more help, please visit: ' + bw + docURL + nc)

        function printHelpMsg(msg, indent) { // wrap msg + indent 2nd+ lines
            const terminalWidth = process.stdout.columns || 80,
                lines = [], words = msg.match(/\S+|\s+/g),
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
            lines.forEach((line, idx) => console.info(prefix + (
                idx == 0 ? line // print 1st line unindented
                    : ' '.repeat(indent) + line // print subsequent lines indented
            )))
        }
    }

    function printHelpCmdAndDocURL() {
        console.info(`\nFor more help, type 'scss-to-css --help' or visit\n${ bw + docURL + nc }`) }

    function printIfNotQuiet(msg) { if (!config.quietMode) console.info(msg) }
})()
