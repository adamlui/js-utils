#!/usr/bin/env node

(async () => {
    'use strict'

    globalThis.env = { devMode: __dirname.match(/[\\/]src/) }

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
        { execSync } = require('child_process'),
          fs = require('fs'),
        { getMsgs, getSysLang } = require(`./lib/language${ env.devMode ? '' : '.min' }.js`),
          minifyJS = require(`../minify${ env.devMode ? '' : '.min' }.js`),
          path = require('path')

    // Init APP data
    globalThis.app = require(`../${ env.devMode ? '../' : './data/' }app.json`)
    app.urls.docs += '/#-command-line-usage' ; app.msgs = await getMsgs(getSysLang())
    app.regex = {
        flags: {
            dryRun: /^--?(?:n|dry-?run)$/,
            includeDotFolders: /^--?(?:dd?|(?:include-?)?dot-?(?:folder|dir(?:ector(?:y|ie))?)s?=?(?:true|1)?)$/,
            includeDotFiles: /^--?(?:df|D|(?:include-?)?dot-?files?=?(?:true|1)?)$/,
            noRecursion: /^--?(?:R|(?:disable|no)-?recursi(?:on|ve)|recursi(?:on|ve)=(?:false|0))$/,
            noMangle: /^--?(?:M|(?:disable|no)-?mangle|mangle=(?:false|0))$/,
            noFilenameChange: /^--?(?:X|(?:disable|no)-?(?:file)?name-?change|(?:file)?name-?change=(?:false|0))$/,
            rewriteImports: /^--?(?:i|rewrite-?imports?=?(?:true|1)?)$/,
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

    // Init UI COLORS
    const colors = {
        nc: '\x1b[0m',    // no color
        br: '\x1b[1;91m', // bright red
        by: '\x1b[1;33m', // bright yellow
        bg: '\x1b[1;92m', // bright green
        bw: '\x1b[1;97m', // bright white
        blk: '\x1b[30m',  // black
        btBG: '\x1b[106m' // bright teal background
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
                console.error(`\n${colors.br}${
                    app.msgs.prefix_error}: Arg [--${arg.replace(/-/g, '')}] ${app.msgs.error_noEqual}.${colors.nc}`)
                printHelpCmdAndDocURL() ; process.exit(1)
            }
            const val = arg.split('=')[1]
            app.config[matchedParamOption] = parseInt(val) || val
        } else if (!matchedInfoCmd) {
            console.error(
                `\n${colors.br}${app.msgs.prefix_error}: Arg [${arg}] ${app.msgs.error_notRecognized}.${colors.nc}`)
            console.info(`\n${colors.by}${app.msgs.info_validArgs}.${colors.nc}`)
            printHelpSections(['paramOptions', 'flags', 'infoCmds'])
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
                )?.match(/^[~^>=]?\d+\.\d+\.\d+$/)?.[1] || 'none'
                break
            }
            currentDir = path.dirname(currentDir)
        }
        console.info(`\n${app.msgs.prefix_globalVer}: ${globalVer}`)
        console.info(`${app.msgs.prefix_localVer}: ${localVer}`)

    } else { // run MAIN routine

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
                console.error(`\n${colors.br}${app.msgs.prefix_error}: `
                    + `${app.msgs.error_firstArgNotExist}.`
                    + `\n${inputPath} ${app.msgs.error_doesNotExist}.${colors.nc}`)
                console.info(`\n${colors.bg}${app.msgs.info_exampleValidCmd}: `
                    + `\n» minify-js . output.min.js${colors.nc}`)
                printHelpCmdAndDocURL() ; process.exit(1)
            } else inputPath = jsInputPath
        }

        // Find all eligible JavaScript files or arg-passed file
        const ogJSfiles = inputPath.endsWith('.js') && !fs.statSync(inputPath).isDirectory() ? [inputPath]
            : minifyJS.findJS(inputPath, {
                recursive: !app.config.noRecursion,
                verbose: !app.config.quietMode,
                ignores: (app.config.ignores?.split(',') ?? []).map(ignore => ignore.trim())
            })

        if (app.config.dryRun) { // -n or --dry-run passed
            if (ogJSfiles.length) { // print files to be processed
                console.info(`\n${colors.by}${app.msgs.info_filesToBeMinned}:${colors.nc}`)
                ogJSfiles.forEach(file => console.info(file))
            } else // no files found
                console.info(`\n${colors.by}${app.msgs.info_noFilesWillBeMinned}.${colors.nc}`)

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
            if (minifyData?.length) {
                printIfNotQuiet(`\n${colors.bg}${app.msgs.info_minComplete}!${colors.nc}`)
                printIfNotQuiet(`${colors.bw}${minifyData.length} ${app.msgs.info_file}`
                    + `${ minifyData.length > 1 ? 's' : '' } ${app.msgs.info_minified}.${colors.nc}`)
            } else printIfNotQuiet(
                `\n${colors.by}${app.msgs.info_noFilesProcessed}.${colors.nc}`)
            if (failedPaths.length) {
                printIfNotQuiet(
                    `\n${colors.br}${failedPaths.length} ${app.msgs.info_file}`
                    + `${ failedPaths.length > 1 ? 's' : '' } ${app.msgs.info_failedToMinify}:${colors.nc}`
                )
                failedPaths.forEach(path => printIfNotQuiet(path))
            }
            if (!minifyData?.length) return

            // Copy single result code to clipboard if --copy passed
            if (app.config.copy && minifyData?.length == 1) {
                console.log(`\n${colors.bw}${minifyData[0].code}${colors.nc}`)
                printIfNotQuiet(`\n${app.msgs.info_copying}...`)
                clipboardy.writeSync(minifyData[0].code)

            } else { // write array data to files
                printIfNotQuiet(`\n${app.msgs.info_writing}${ minifyData?.length > 1 ? 's' : '' }...`)
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
                    printIfNotQuiet(`  ${colors.bg}✓${colors.nc} ${path.relative(process.cwd(), outputPath)}`)
                })
            }
        }
    }

    // Define FUNCTIONS

    function printHelpCmdAndDocURL() {
        console.info(`\n${
            app.msgs.info_moreHelp}, ${app.msgs.info_type} ${app.name.split('/')[1]} --help' ${
            app.msgs.info_or} ${app.msgs.info_visit}\n${colors.bw}${app.urls.docs}${colors.nc}`
        )
    }

    function printHelpSections(includeSections = ['header', 'usage', 'pathArgs', 'flags', 'paramOptions', 'infoCmds']) {
        app.prefix = `${colors.btBG}${colors.blk} ${app.name.replace(/^@[^/]+\//, '')} ${colors.nc} `
        const helpSections = {
            header: [
                `\n├ ${app.prefix}${ app.msgs.appCopyright || `© ${
                       app.copyrightYear} ${app.author} under the ${app.license} license`
                }.`,
                `${app.prefix}${app.msgs.prefix_source}: ${app.urls.src}`
            ],
            usage: [
                `\n${colors.bw}o ${app.msgs.helpSection_usage}:${colors.nc}`,
                ` ${colors.bw}» ${colors.bg}${app.cmdFormat}${colors.nc}`
            ],
            pathArgs: [
                `\n${colors.bw}o ${app.msgs.helpSection_pathArgs}:${colors.nc}`,
                ' [inputPath]                         '
                    + `${app.msgs.inputPathDesc_main}, `
                    + `${app.msgs.inputPathDesc_extra}.`,
                ' [outputPath]                        '
                    + `${app.msgs.outputPathDesc_main}, `
                    + `${app.msgs.outputPathDesc_extra}.`
            ],
            flags: [
                `\n${colors.bw}o ${app.msgs.helpSection_flags}:${colors.nc}`,
                ` -n, --dry-run                       ${app.msgs.optionDesc_dryRun}.`,
                ` -d, --include-dotfolders            ${app.msgs.optionDesc_dotfolders}.`,
                ` -D, --include-dotfiles              ${app.msgs.optionDesc_dotfiles}.`,
                ` -R, --no-recursion                  ${app.msgs.optionDesc_noRecursion}.`,
                ` -M, --no-mangle                     ${app.msgs.optionDesc_noMangle}.`,
                ` -X, --no-filename-change            ${app.msgs.optionDesc_noFilenameChange}`,
                ` -i, --rewrite-imports               ${app.msgs.optionDesc_rewriteImports}.`,
                ` -c, --copy                          ${app.msgs.optionDesc_copy}.`,
                ` -r, --relative-output               ${app.msgs.optionDesc_relativeOutput}.`,
                ` -q, --quiet                         ${app.msgs.optionDesc_quiet}.`
            ],
            paramOptions: [
                `\n${colors.bw}o ${app.msgs.helpSection_paramOptions}:${colors.nc}`,
                `--ignores="dir/,file1.js,file2.js"   ${app.msgs.optionDesc_ignores}.`,
                `--comment="comment"                  ${app.msgs.optionDesc_commentMain}.`
                                                 +  ` ${app.msgs.optionDesc_commentExtra}.`
            ],
            infoCmds: [
                `\n${colors.bw}o ${app.msgs.helpSection_infoCmds}:${colors.nc}`,
                ` -h, --help                          ${app.msgs.optionDesc_help}`,
                ` -v, --version                       ${app.msgs.optionDesc_version}.`
            ]
        }
        includeSections.forEach(section => // print valid arg elems
            helpSections[section]?.forEach(line => printHelpMsg(line, /header|usage/.test(section) ? 1 : 37)))
        console.info(
            `\n${app.msgs.info_moreHelp}, ${app.msgs.info_visit}: ${colors.bw}${app.urls.docs}${colors.nc}`)

        function printHelpMsg(msg, indent) { // wrap msg + indent 2nd+ lines
            const terminalWidth = process.stdout.columns || 80,
                  lines = [], words = msg.match(/\S+|\s+/g),
                  prefix = '| '

            // Split msg into lines of appropriate lengths
            let currentLine = ''
            words.forEach(word => {
                const lineLength = terminalWidth -( !lines.length ? 0 : indent )
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

    function printIfNotQuiet(msg) { if (!app.config.quietMode) console.info(msg) }

})()
