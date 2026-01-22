#!/usr/bin/env node

(async () => {
    'use strict'

    globalThis.env = { langCode: 'en', devMode: __dirname.match(/src/) }

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
          { execSync } = require('child_process'),
          fs = require('fs'),
          minifyJS = require(`./minify${ env.devMode ? '' : '.min' }.js`),
          path = require('path')

    // Init APP data
    globalThis.app = require(`${ env.devMode ? '..' : '.' }/app.json`)
    app.config = {} ; app.urls.docs += '/#-command-line-usage'
    app.regex = {
        flags: {
            'dryRun': /^--?(?:n|dry-?run)$/,
            'includeDotFolders': /^--?(?:dd?|(?:include-?)?dot-?(?:folder|dir(?:ector(?:y|ie))?)s?=?(?:true|1)?)$/,
            'includeDotFiles': /^--?(?:df|D|(?:include-?)?dot-?files?=?(?:true|1)?)$/,
            'noRecursion': /^--?(?:R|(?:disable|no)-?recursi(?:on|ve)|recursi(?:on|ve)=(?:false|0))$/,
            'noMangle': /^--?(?:M|(?:disable|no)-?mangle|mangle=(?:false|0))$/,
            'noFilenameChange': /^--?(?:X|(?:disable|no)-?(?:file)?name-?change|(?:file)?name-?change=(?:false|0))$/,
            'rewriteImports': /^--?(?:i|rewrite-?imports?=?(?:true|1)?)$/,
            'relativeOutput': /^--?(?:r|relative-?output?=?(?:true|1)?)$/,
            'copy': /^--?c(?:opy)?$/,
            'quietMode': /^--?q(?:uiet)?(?:-?mode)?$/
        },
        paramOptions: {
            'ignores': /^--?(?:ignores?|(?:ignore|skip|exclude)(?:d?-?files?)?)(?:=.*|$)/,
            'comment': /^--?comments?(?:=.*|$)/
        },
        infoCmds: {
            'help': /^--?h(?:elp)?$/,
            'version': /^--?ve?r?s?i?o?n?$/
        },
        version: /^[~^>=]?\d+\.\d+\.\d+$/
    }

    // Init UI COLORS
    const nc = '\x1b[0m',    // no color
          br = '\x1b[1;91m', // bright red
          by = '\x1b[1;33m', // bright yellow
          bg = '\x1b[1;92m', // bright green
          bw = '\x1b[1;97m'  // bright white

    // Init sys LANGUAGE
    if (process.platform == 'win32')
        try {
            env.langCode = execSync(
                '(Get-Culture).TwoLetterISOLanguageName', { shell: 'powershell', encoding: 'utf-8' }
            ).trim()
        } catch (err) { console.error('ERROR loading system language:', err.message) }
    else { // macOS/Linux
        const pe = process.env
        env.langCode = (pe.LANG || pe.LANGUAGE || pe.LC_ALL || pe.LC_MESSAGES || pe.LC_NAME || 'en')?.split('.')[0]
    }

    // Load MESSAGES
    try {
        app.msgs = await new Promise((resolve, reject) => {
            const msgHostDir = `${app.urls.jsdelivr}@${app.commitHashes.locales}/_locales/`,
                  msgLocaleDir = `${ env.langCode ? env.langCode.replace('-', '_') : 'en' }/`
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
                    msgHref = env.langCode.includes('-') && msgFetchTries == 1 ? // if regional lang on 1st try...
                        msgHref.replace(/([^_]*)_[^/]*(\/.*)/, '$1$2') // ...strip region before retrying
                            : `${msgHostDir}en/messages.json` // else use default English messages
                    fetchData(msgHref).then(handleMsgs).catch(reject)
                }
            }
        })
    } catch (err) { app.msgs = {} ; console.error('ERROR fetching messages:', err.message) }

    // Load SETTINGS from args
    process.argv.forEach(arg => {
        if (!arg.startsWith('-')) return
        const matchedParamOption = Object.keys(app.regex.paramOptions)
            .find(option => app.regex.paramOptions[option].test(arg))
        const matchedFlag = Object.keys(app.regex.flags).find(flag => app.regex.flags[flag].test(arg))
        const matchedInfoCmd = Object.keys(app.regex.infoCmds).find(cmd => app.regex.infoCmds[cmd].test(arg))
        if (matchedFlag) app.config[matchedFlag] = true
        else if (matchedParamOption) {
            if (!/=.+/.test(arg)) {
                console.error(`\n${ br +( app.msgs.prefix_error || 'ERROR' )}: `
                    + `Arg [--${arg.replace(/-/g, '')}] `
                    + `${ app.msgs.error_noEqual || 'requires \'=\' followed by a value' }.${nc}`)
                printHelpCmdAndDocURL() ; process.exit(1)
            }
            const val = arg.split('=')[1]
            app.config[matchedParamOption] = parseInt(val) || val
        } else if (!matchedInfoCmd) {
            console.error(`\n${ br +( app.msgs.prefix_error || 'ERROR' )}: `
                + `Arg [${arg}] ${ app.msgs.error_notRecognized || 'not recognized' }.${nc}`)
            console.info(`\n${ by +( app.msgs.info_validArgs || 'Valid arguments are below' )}.${nc}`)
            printHelpSections(['flags', 'paramOptions', 'infoCmds'])
            process.exit(1)
        }
    })

    // Show HELP screen if -h or --help passed
    if (process.argv.some(arg => app.regex.infoCmds.help.test(arg))) printHelpSections()

    // Show VERSION number if -v or --version passed
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
        console.info(`\n${ app.msgs.prefix_globalVer || 'Global version' }: ${globalVer}`)
        console.info(`${ app.msgs.prefix_localVer || 'Local version' }: ${localVer}`)

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
                console.error(`\n${ br +( app.msgs.prefix_error || 'ERROR' )}: `
                    + `${ app.msgs.error_firstArgNotExist || 'First argument can only be an existing file or directory' }.`
                    + `\n${inputPath} ${ app.msgs.error_doesNotExist || 'does not exist' }.${nc}`)
                console.info(`\n${bg}${ app.msgs.info_exampleValidCmd || 'Example valid command' }: `
                    + `\n» minify-js . output.min.js${nc}`)
                printHelpCmdAndDocURL() ; process.exit(1)
            } else inputPath = jsInputPath
        }

        // Find all eligible JavaScript files or arg-passed file
        const unminnedJSfiles = inputPath.endsWith('.js') && !fs.statSync(inputPath).isDirectory() ? [inputPath]
            : minifyJS.findJS(inputPath, {
                recursive: !app.config.noRecursion, verbose: !app.config.quietMode,
                ignores: (app.config.ignores?.split(',') ?? []).map(ignore => ignore.trim())
            })

        if (app.config.dryRun) { // -n or --dry-run passed
            if (unminnedJSfiles.length) { // print files to be processed
                console.info(`\n${by +( app.msgs.info_filesToBeMinned || 'JS files to be minified' )}:${nc}`)
                unminnedJSfiles.forEach(file => console.info(file))
            } else // no files found
                console.info(`\n${by +( app.msgs.info_noFilesWillBeMinned || 'No JS files will be minified' )}.${nc}`)

        } else { // actually minify JavaScript files

            // Build array of minification data
            const failedPaths = [] ; let minifyData = []
            if (!app.config.relativeOutput && fs.statSync(inputPath).isDirectory()) {
                const minifyResult = minifyJS.minify(inputPath, {
                    verbose: false, mangle: !app.config.noMangle,
                    comment: app.config.comment?.replace(/\\n/g, '\n'), relativeOutput: false,
                    recursive: !app.config.noRecursion, dotFolders: !!app.config.includeDotFolders,
                    dotFiles: !!app.config.includeDotFiles, rewriteImports: !!app.config.rewriteImports,
                    ignores: app.config.ignores ? app.config.ignores.split(',').map(ignore => ignore.trim()) : []
                })
                if (minifyResult) {
                    if (minifyResult.error) failedPaths.push(inputPath)
                    else minifyData = [].concat(minifyResult)
                }
            } else minifyData = unminnedJSfiles.map(jsPath => {
                const minifyResult = minifyJS.minify(jsPath, {
                    verbose: !app.config.quietMode, mangle: !app.config.noMangle,
                    comment: app.config.comment?.replace(/\\n/g, '\n')
                })
                if (minifyResult.error) failedPaths.push(jsPath)
                return minifyResult
            }).filter(minifyResult => !minifyResult.error)

            // Print minification summary
            if (minifyData?.length) {
                printIfNotQuiet(`\n${bg +( app.msgs.info_minComplete || 'Minification complete' )}!${nc}`)
                printIfNotQuiet(`${bw + minifyData.length} ${ app.msgs.info_file || 'file' }`
                    + `${ minifyData.length > 1 ? 's' : '' } ${ app.msgs.info_minified || 'minified' }.${nc}`)
            } else printIfNotQuiet(
                `\n${by +( app.msgs.info_noFilesProcessed || 'No unminified JavaScript files processed' )}.${nc}`)
            if (failedPaths.length) {
                printIfNotQuiet(
                    `\n${br + failedPaths.length} ${ app.msgs.info_file || 'file' }`
                    + `${ failedPaths.length > 1 ? 's' : '' } ${ app.msgs.info_failedToMinify || 'failed to minify' }:${nc}`
                )
                failedPaths.forEach(path => printIfNotQuiet(path))
            }
            if (minifyData?.length == 0) return

            // Copy single result code to clipboard if --copy passed
            if (app.config.copy && minifyData?.length == 1) {
                console.log(`\n${bw}${minifyData[0].code}${nc}`)
                printIfNotQuiet(`\n${ app.msgs.info_copying || 'Copying to clipboard' }...`)
                clipboardy.writeSync(minifyData[0].code)

            } else { // write array data to files
                printIfNotQuiet(
                    `\n${ app.msgs.info_writing || 'Writing to file' }${ minifyData?.length > 1 ? 's' : '' }...`)
                minifyData?.forEach(({ code, srcPath, relPath }) => {
                    let outputDir, outputFilename
                    if (!app.config.relativeOutput && relPath) { // preserve folder structure
                        const outputPath = path.resolve(process.cwd(), outputArg || 'min'),
                              relativeDir = path.dirname(relPath)
                        outputDir = relativeDir != '.' ? path.join(outputPath, relativeDir) : outputPath
                        outputFilename = path.basename(srcPath, '.js') + `${ app.config.noFilenameChange ? '' : '.min' }.js`
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
                    printIfNotQuiet(`  ${bg}✓${nc} ${path.relative(process.cwd(), outputPath)}`)
                })
            }
        }
    }

    // Define FUNCTIONS

    function fetchData(url) { // instead of fetch() to support Node.js < v21
        return new Promise((resolve, reject) => {
            const protocol = url.match(/^([^:]+):\/\//)[1]
            if (!/^https?$/.test(protocol)) reject(new Error(`${ app.msgs.error_invalidURL || 'Invalid URL' }.`))
            require(protocol).get(url, resp => {
                let rawData = ''
                resp.on('data', chunk => rawData += chunk)
                resp.on('end', () => resolve({ json: () => JSON.parse(rawData) }))
            }).on('error', reject)
        })
    }

    function printHelpCmdAndDocURL() {
        console.info(`\n${ app.msgs.info_moreHelp || 'For more help' }, ${
            app.msgs.info_type || 'type' } minify-js --help' ${ app.msgs.info_or || 'or' } ${
            app.msgs.info_visit || 'visit' }\n${bw}${app.urls.docs}${nc}`
        )
    }

    function printHelpSections(includeSections = ['header', 'usage', 'pathArgs', 'flags', 'paramOptions', 'infoCmds']) {
        const appPrefix = `\x1b[106m\x1b[30m ${app.name.replace(/^@[^/]+\//, '')} ${nc} ` // bright teal bg + black fg
        const helpSections = {
            'header': [
                `\n├ ${appPrefix}${ app.msgs.appCopyright || app.copyright }`,
                `${appPrefix}${ app.msgs.prefix_source || 'Source' }: ${app.urls.src}`
            ],
            'usage': [
                `\n${bw}o ${ app.msgs.helpSection_usage || 'Usage' }:${nc}`,
                ` ${bw}» ${bg}${app.cmdFormat}${nc}`
            ],
            'pathArgs': [
                `\n${bw}o ${ app.msgs.helpSection_pathArgs || 'Path arguments' }:${nc}`,
                ' [inputPath]                         '
                    + `${ app.msgs.inputPathDesc_main || 'Path to JS file or directory containing JS files to be minified' }, `
                    + `${ app.msgs.inputPathDesc_extra || 'relative to the current working directory' }.`,
                ' [outputPath]                        '
                    + `${ app.msgs.outputPathDesc_main || 'Path to file or directory where minified files will be stored' }, `
                    + `${ app.msgs.outputPathDesc_extra || 'relative to original file location (if not provided, min/ is used)' }.`
            ],
            'flags': [
                `\n${bw}o ${ app.msgs.helpSection_flags || 'Boolean options' }:${nc}`,
                ' -n, --dry-run                       '
                    + `${ app.msgs.optionDesc_dryRun || 'Don\'t actually minify the file(s), '
                                                  + 'just show if they will be processed' }.`,
                ` -d, --include-dotfolders            ${ app.msgs.optionDesc_dotfolders || 'Include dotfolders in file search' }.`,
                ` -D, --include-dotfiles              ${ app.msgs.optionDesc_dotfiles || 'Include dotfiles in file search' }.`,
                ` -R, --no-recursion                  ${ app.msgs.optionDesc_noRecursion || 'Disable recursive file searching' }.`,
                ` -M, --no-mangle                     ${ app.msgs.optionDesc_noMangle || 'Disable mangling names' }.`,
                ` -X, --no-filename-change            ${ app.msgs.optionDesc_noFilenameChange || 'Disable changing file extension to .min.js' }`,
                ` -i, --rewrite-imports               ${ app.msgs.optionDesc_rewriteImports || 'Update import paths from .js to .min.js' }.`,
                ` -c, --copy                          ${ app.msgs.optionDesc_copy || 'Copy minified code to clipboard instead of writing to file'
                                                                               + ' if single source file is processed' }.`,
                ` -r, --relative-output               ${ app.msgs.optionDesc_relativeOutput || 'Output files relative to each source file instead of to input root' }.`,
                ` -q, --quiet                         ${ app.msgs.optionDesc_quiet || 'Suppress all logging except errors' }.`
            ],
            'paramOptions': [
                `\n${bw}o ${ app.msgs.helpSection_paramOptions || 'Parameter options' }:${nc}`,
                `--ignores="dir/,file1.js,file2.js"   ${ app.msgs.optionDesc_ignores || 'Files/directories to exclude from minification' }.`,
                `--comment="comment"                  ${ app.msgs.optionDesc_commentMain || 'Prepend header comment to minified code' }.`
                                                 +  ` ${ app.msgs.optionDesc_commentExtra || 'Separate by line using \'\\n\'' }.`
            ],
            'infoCmds': [
                `\n${bw}o ${ app.msgs.helpSection_infoCmds || 'Info commands' }:${nc}`,
                ` -h, --help                          ${ app.msgs.optionDesc_help || 'Display help screen.' }`,
                ` -v, --version                       ${ app.msgs.optionDesc_version || 'Show version number' }.`
            ]
        }
        includeSections.forEach(section => // print valid arg elems
            helpSections[section]?.forEach(line => printHelpMsg(line, /header|usage/.test(section) ? 1 : 37)))
        console.info(
            `\n${ app.msgs.info_moreHelp || 'For more help' }, ${ app.msgs.info_visit || 'visit' }: ${bw}${app.urls.docs}${nc}`)

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
