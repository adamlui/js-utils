#!/usr/bin/env node

const pkgName = '@adamlui/minify.js',
      copyright = '© 2024–2026 Adam Lui & contributors under the MIT license.',
      cmdFormat = 'minify-js [inputPath] [outputPath] [options]',
      srcURL = 'https://code.minify-js.org/node.js',
      docURL = 'https://docs.minify-js.org/node.js/#-command-line-usage',
      latestLocaleCommitHash = '9b7e97f'

;(async () => {
    'use strict'

    // Import LIBS
    const minifyJS = require(__dirname.match(/src/) ? './minify' : './minify.min'),
          fs = require('fs'), path = require('path'),
          ncp = require('node-clipboardy'), // for --copy flag
          { execSync } = require('child_process') // for --version cmd

    // Init UI COLORS
    const nc = '\x1b[0m',    // no color
          br = '\x1b[1;91m', // bright red
          by = '\x1b[1;33m', // bright yellow
          bg = '\x1b[1;92m', // bright green
          bw = '\x1b[1;97m' // bright white

    // Load sys LANGUAGE
    let langCode = 'en'
    if (process.platform == 'win32') {
        try {
            langCode = execSync('(Get-Culture).TwoLetterISOLanguageName',
                { shell: 'powershell', encoding: 'utf-8' }).trim()
        } catch (err) { printIfNotQuiet(`Error loading system language: ${err}`) }
    } else { // macOS/Linux
        const env = process.env
        langCode = (env.LANG || env.LANGUAGE || env.LC_ALL || env.LC_MESSAGES || env.LC_NAME || 'en')?.split('.')[0]
    }

    // Define MESSAGES
    let msgs = {}
    const msgsLoaded = new Promise((resolve, reject) => {
        const msgHostDir = `https://cdn.jsdelivr.net/gh/adamlui/minify.js@${latestLocaleCommitHash}/_locales/`,
              msgLocaleDir = `${ langCode ? langCode.replace('-', '_') : 'en' }/`
        let msgHref = msgHostDir + msgLocaleDir + 'messages.json', msgFetchTries = 0
        fetchData(msgHref).then(handleMsgs).catch(reject)
        async function handleMsgs(resp) {
            try { // to return localized messages.json
                const msgs = await resp.json(), flatMsgs = {}
                for (const key in msgs)  // remove need to ref nested keys
                    if (typeof msgs[key] == 'object' && 'message' in msgs[key])
                        flatMsgs[key] = msgs[key].message
                resolve(flatMsgs)
            } catch (err) { // if bad response
                msgFetchTries++ ; if (msgFetchTries == 3) return resolve({}) // try original/region-stripped/EN only
                msgHref = langCode.includes('-') && msgFetchTries == 1 ? // if regional lang on 1st try...
                    msgHref.replace(/([^_]*)_[^/]*(\/.*)/, '$1$2') // ...strip region before retrying
                        : ( msgHostDir + 'en/messages.json' ) // else use default English messages
                fetchData(msgHref).then(handleMsgs).catch(reject)
            }
        }
    })
    try { msgs = await msgsLoaded } catch (err) { printIfNotQuiet(`Error fetching messages: ${err}`) }

    // Load SETTINGS from args
    const config = {}
    const reArgs = {
        flags: {
            'dryRun': /^--?(?:n|dry-?run)$/,
            'includeDotFolders': /^--?(?:dd?|(?:include-?)?dot-?(?:folder|dir(?:ector(?:y|ie))?)s?=?(?:true|1)?)$/,
            'includeDotFiles': /^--?(?:df|D|(?:include-?)?dot-?files?=?(?:true|1)?)$/,
            'noRecursion': /^--?(?:R|(?:disable|no)-?recursi(?:on|ve)|recursi(?:on|ve)=(?:false|0))$/,
            'noMangle': /^--?(?:M|(?:disable|no)-?mangle|mangle=(?:false|0))$/,
            'noFilenameChange': /^--?(?:X|(?:disable|no)-?(?:file)?name-?change|(?:file)?name-?change=(?:false|0))$/,
            'noRewriteImports': /^--?(?:I|(?:disable|no)-?rewrite-?imports|rewrite-?imports=(?:false|0))$/,
            'cloneFolders': /^--?(?:C|clone-?folders?=?(?:true|1)?)$/,
            'copy': /^--?c(?:opy)?$/,
            'quietMode': /^--?q(?:uiet)?(?:-?mode)?$/
        },
        paramOptions: {
            'ignores': /^--?ignores?(?:=.*|$)/,
            'comment': /^--?comments?(?:=.*|$)/
        },
        infoCmds: { 'help': /^--?h(?:elp)?$/,'version': /^--?ve?r?s?i?o?n?$/ }
    }
    process.argv.forEach(arg => {
        if (!arg.startsWith('-')) return
        const matchedFlag = Object.keys(reArgs.flags).find(flag => reArgs.flags[flag].test(arg))
        const matchedParamOption = Object.keys(reArgs.paramOptions)
            .find(option => reArgs.paramOptions[option].test(arg))
        const matchedInfoCmd = Object.keys(reArgs.infoCmds).find(cmd => reArgs.infoCmds[cmd].test(arg))
        if (matchedFlag) config[matchedFlag] = true
        else if (matchedParamOption) {
            if (!/=.+/.test(arg)) {
                console.error(`\n${ br +( msgs.prefix_error || 'ERROR' )}: `
                    + `Arg [--${arg.replace(/-/g, '')}] `
                    + `${ msgs.error_noEqual || 'requires \'=\' followed by a value' }.${nc}`)
                printHelpCmdAndDocURL() ; process.exit(1)
            }
            const value = arg.split('=')[1]
            config[matchedParamOption] = parseInt(value) || value
        } else if (!matchedInfoCmd) {
            console.error(`\n${ br +( msgs.prefix_error || 'ERROR' )}: `
                + `Arg [${arg}] ${ msgs.error_notRecognized || 'not recognized' }.${nc}`)
            console.info(`\n${ by +( msgs.info_validArgs || 'Valid arguments are below' )}.${nc}`)
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
                localVer = (localManifest.dependencies?.[pkgName]
                         || localManifest.devDependencies?.[pkgName])
                    ?.match(/^[~^>=]?\d+\.\d+\.\d+$/)?.[1] || 'none'
                break
            }
            currentDir = path.dirname(currentDir)
        }
        console.info(`\n${ msgs.prefix_globalVer || 'Global version' }: ${globalVer}`)
        console.info(`${ msgs.prefix_localVer || 'Local version' }: ${localVer}`)

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
            const jsInputPath = inputPath + '.js' // append '.js' in case ommitted from intended filename
            if (!fs.existsSync(jsInputPath)) {
                console.error(`\n${ br +( msgs.prefix_error || 'ERROR' )}: `
                    + `${ msgs.error_firstArgNotExist || 'First argument can only be an existing file or directory' }.`
                    + `\n${inputPath} ${ msgs.error_doesNotExist || 'does not exist' }.${nc}`)
                console.info(`\n${bg}${ msgs.info_exampleValidCmd || 'Example valid command' }: `
                    + `\n» minify-js . output.min.js${nc}`)
                printHelpCmdAndDocURL() ; process.exit(1)
            } else inputPath = jsInputPath
        }

        // Find all eligible JavaScript files or arg-passed file
        const unminnedJSfiles = inputPath.endsWith('.js') && !fs.statSync(inputPath).isDirectory() ? [inputPath]
            : minifyJS.findJS(inputPath, {
                recursive: !config.noRecursion, verbose: !config.quietMode,
                ignores: (config.ignores?.split(',') ?? []).map(item => item.trim())
            })

        if (config.dryRun) { // -n or --dry-run passed
            if (unminnedJSfiles.length) { // print files to be processed
                console.info(`\n${by +( msgs.info_filesToBeMinned || 'JS files to be minified' )}:${nc}`)
                unminnedJSfiles.forEach(file => console.info(file))
            } else console.info(`\n${by +( msgs.info_noFilesWillBeMinned || 'No JS files will be minified' )}.${nc}`)

        } else { // actually minify JavaScript files

            // Build array of minification data
            const failedPaths = [] ; let minifyData = []
            if (config.cloneFolders && fs.statSync(inputPath).isDirectory()) {
                const minifyResult = minifyJS.minify(inputPath, {
                    verbose: !config.quietMode, mangle: !config.noMangle,
                    comment: config.comment?.replace(/\\n/g, '\n'), cloneFolders: true, recursive: !config.noRecursion,
                    dotFolders: !!config.includeDotFolders, dotFiles: !!config.includeDotFiles,
                    rewriteImports: !config.noRewriteImports,
                    ignores: config.ignores ? config.ignores.split(',').map(item => item.trim()) : []
                })
                if (minifyResult) {
                    if (minifyResult.error) failedPaths.push(inputPath)
                    else minifyData = [].concat(minifyResult)
                }
            } else minifyData = unminnedJSfiles.map(jsPath => {
                    const minifyResult = minifyJS.minify(jsPath, {
                        verbose: !config.quietMode, mangle: !config.noMangle,
                        comment: config.comment?.replace(/\\n/g, '\n')
                    })
                    if (minifyResult.error) failedPaths.push(jsPath)
                    return minifyResult
                }).filter(minifyResult => !minifyResult.error)

            // Print minification summary
            if (minifyData?.length) {
                printIfNotQuiet(`\n${bg +( msgs.info_minComplete || 'Minification complete' )}!${nc}`)
                printIfNotQuiet(`${bw + minifyData.length} ${ msgs.info_file || 'file' }`
                    + `${ minifyData.length > 1 ? 's' : '' } ${ msgs.info_minified || 'minified' }.${nc}`)
            } else printIfNotQuiet(
                `\n${by +( msgs.info_noFilesProcessed || 'No unminified JavaScript files processed' )}.${nc}`)
            if (failedPaths.length) {
                printIfNotQuiet(
                    `\n${br + failedPaths.length} ${ msgs.info_file || 'file' }`
                    + `${ failedPaths.length > 1 ? 's' : '' } ${ msgs.info_failedToMinify || 'failed to minify' }:${nc}`
                )
                failedPaths.forEach(path => printIfNotQuiet(path))
            }
            if (minifyData?.length == 0) return

            // Copy single result code to clipboard if --copy passed
            if (config.copy && minifyData?.length == 1) {
                console.log(`\n${bw}${minifyData[0].code}${nc}`)
                printIfNotQuiet(`\n${ msgs.info_copying || 'Copying to clipboard' }...`)
                ncp.writeSync(minifyData[0].code)

            } else { // write array data to files
                printIfNotQuiet(
                    `\n${ msgs.info_writing || 'Writing to file' }${ minifyData?.length > 1 ? 's' : '' }...`)
                minifyData?.forEach(({ code, srcPath, relPath }) => {
                    let outputDir, outputFilename
                    if (config.cloneFolders && relPath && outputArg) { // preserve folder structure
                        const outputPath = path.resolve(process.cwd(), outputArg),
                              relativeDir = path.dirname(relPath)
                        outputDir = relativeDir != '.' ? path.join(outputPath, relativeDir) : outputPath
                        outputFilename = path.basename(srcPath, '.js') + `${ config.noFilenameChange ? '' : '.min' }.js`
                    } else {
                        outputDir = path.join(
                            path.dirname(srcPath), // path of file to be minified
                            ( /so?u?rce?$/.test(path.dirname(srcPath)) ? '../' : '' ) // + '../' if in if in *(src|source)/
                          +( outputArg.endsWith('.js') ? path.dirname(outputArg) // + path from file outputArg
                                : outputArg || 'min' ) // or path from folder outputArg or min/ if no outputArg passed
                        )
                        outputFilename = (
                            outputArg.endsWith('.js') && inputArg.endsWith('.js')
                                ? path.basename(outputArg).replace(/(\.min)?\.js$/, '')
                                : path.basename(srcPath, '.js')
                        ) + `${ config.noFilenameChange ? '' : '.min' }.js`
                    }
                    const outputPath = path.join(outputDir, outputFilename)
                    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })
                    fs.writeFileSync(outputPath, code, 'utf8')
                    printIfNotQuiet(`  ${bg}✓${nc} ${path.relative(process.cwd(), outputPath)}`)
                })
            }
        }
    }

    // Define FUNCTIONS

    function fetchData(url) { // instead of fetch() to support Node.js < v21
        return new Promise((resolve, reject) => {
            const protocol = url.match(/^([^:]+):\/\//)[1]
            if (!/^https?$/.test(protocol)) reject(new Error(`${ msgs.error_invalidURL || 'Invalid URL' }.`))
            require(protocol).get(url, resp => {
                let rawData = ''
                resp.on('data', chunk => rawData += chunk)
                resp.on('end', () => resolve({ json: () => JSON.parse(rawData) }))
            }).on('error', reject)
        })
    }

    function printHelpSections(includeSections = ['header', 'usage', 'pathArgs', 'flags', 'paramOptions', 'infoCmds']) {
        const appPrefix = `\x1b[106m\x1b[30m ${pkgName.replace(/^@[^/]+\//, '')} ${nc} ` // bright teal bg + black fg
        const helpSections = {
            'header': [
                `\n├ ${appPrefix}${ msgs.appCopyright || copyright }`,
                `${appPrefix}${ msgs.prefix_source || 'Source' }: ${srcURL}`
            ],
            'usage': [
                `\n${bw}o ${ msgs.helpSection_usage || 'Usage' }:${nc}`,
                ` ${bw}» ${bg}${cmdFormat}${nc}`
            ],
            'pathArgs': [
                `\n${bw}o ${ msgs.helpSection_pathArgs || 'Path arguments' }:${nc}`,
                ' [inputPath]                         '
                    + `${ msgs.inputPathDesc_main || 'Path to JS file or directory containing JS files to be minified' }, `
                    + `${ msgs.inputPathDesc_extra || 'relative to the current working directory' }.`,
                ' [outputPath]                        '
                    + `${ msgs.outputPathDesc_main || 'Path to file or directory where minified files will be stored' }, `
                    + `${ msgs.outputPathDesc_extra || 'relative to original file location (if not provided, min/ is used)' }.`
            ],
            'flags': [
                `\n${bw}o ${ msgs.helpSection_flags || 'Boolean options' }:${nc}`,
                ' -n, --dry-run                       '
                    + `${ msgs.optionDesc_dryRun || 'Don\'t actually minify the file(s), '
                                                  + 'just show if they will be processed' }.`,
                ` -d, --include-dotfolders            ${ msgs.optionDesc_dotfolders || 'Include dotfolders in file search' }.`,
                ` -D, --include-dotfiles              ${ msgs.optionDesc_dotfiles || 'Include dotfiles in file search' }.`,
                ` -R, --no-recursion                  ${ msgs.optionDesc_noRecursion || 'Disable recursive file searching' }.`,
                ` -M, --no-mangle                     ${ msgs.optionDesc_noMangle || 'Disable mangling names' }.`,
                ` -X, --no-filename-change            ${ msgs.optionDesc_noFilenameChange || 'Disable changing file extension to .min.js' }`,
                ` -I, --no-rewrite-imports            ${ msgs.optionDesc_noRewriteImports || 'Disable updating import paths from .js to .min.js' }.`,
                ` -c, --copy                          ${ msgs.optionDesc_copy || 'Copy minified code to clipboard instead of writing to file'
                                                                               + ' if single source file is processed' }.`,
                ` -C, --clone-folders                 ${ msgs.optionDesc_cloneFolders || 'Preserve folder structure in output directory' }.`,
                ` -q, --quiet                         ${ msgs.optionDesc_quiet || 'Suppress all logging except errors' }.`
            ],
            'paramOptions': [
                `\n${bw}o ${ msgs.helpSection_paramOptions || 'Parameter options' }:${nc}`,
                `--ignores="dir/,file1.js,file2.js"   ${ msgs.optionDesc_ignores || 'Files/directories to exclude from minification' }.`,
                `--comment="comment"                  ${ msgs.optionDesc_commentMain || 'Prepend header comment to minified code' }.`
                                                 +  ` ${ msgs.optionDesc_commentExtra || 'Separate by line using \'\\n\'' }.`
            ],
            'infoCmds': [
                `\n${bw}o ${ msgs.helpSection_infoCmds || 'Info commands' }:${nc}`,
                ` -h, --help                          ${ msgs.optionDesc_help || 'Display help screen.' }`,
                ` -v, --version                       ${ msgs.optionDesc_version || 'Show version number' }.`
            ]
        }
        includeSections.forEach(section => // print valid arg elems
            helpSections[section]?.forEach(line => printHelpMsg(line, /header|usage/.test(section) ? 1 : 37)))
        console.info(
            `\n${ msgs.info_moreHelp || 'For more help' }, ${ msgs.info_visit || 'visit' }: ${bw}${docURL}${nc}`)

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

    function printHelpCmdAndDocURL() {
        console.info(`\n${ msgs.info_moreHelp || 'For more help' }, ${
            msgs.info_type || 'type' } minify-js --help' ${ msgs.info_or || 'or' } ${
            msgs.info_visit || 'visit' }\n${bw}${docURL}${nc}`
        )
    }

    function printIfNotQuiet(msg) { if (!config.quietMode) console.info(msg) }

})()
