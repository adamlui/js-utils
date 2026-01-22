#!/usr/bin/env node

(async () => {
    'use strict'

    globalThis.env = { langCode: 'en', devMode: __dirname.match(/src/) }

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
          { execSync } = require('child_process'),
          fs = require('fs'),
          { generatePassword } = require(`./generate-pw${ env.devMode ? '' : '.min' }.js`),
          path = require('path')

    // Init APP data
    globalThis.app = require(`${ env.devMode ? '..' : '.' }/app.json`)
    app.config = {} ; app.urls.docs += '/#-command-line-usage'
    app.regex = {
        paramOptions: {
            length: /^--?length(?:=.*|$)/,
            qty: /^--?qu?a?n?ti?t?y(?:=.*|$)/,
            charset: /^--?charse?t?(?:=.*|$)/,
            excludeChars: /^--?exclude(?:=.*|$)/
        },
        flags: {
            includeNums: /^--?(?:n|(?:include-?)?num(?:ber)?s?=?(?:true|1)?)$/,
            includeSymbols: /^--?(?:y|(?:include-?)?symbols?=?(?:true|1)?)$/,
            excludeLowerChars: /^--?(?:L|(?:exclude|disable|no)-?lower-?(?:case)?|lower-?(?:case)?=(?:false|0))$/,
            excludeUpperChars: /^--?(?:U|(?:exclude|disable|no)-?upper-?(?:case)?|upper-?(?:case)?=(?:false|0))$/,
            excludeSimilarChars:
                /^--?(?:S|(?:exclude|disable|no)-?similar-?(?:char(?:acter)?s?)?|similar-?(?:char(?:acter)?s?)?=(?:false|0))$/,
            strictMode: /^--?s(?:trict)?(?:-?mode)?$/,
            quietMode: /^--?q(?:uiet)?(?:-?mode)?$/
        },
        infoCmds: {
            help: /^--?h(?:elp)?$/,
            version: /^--?ve?r?s?i?o?n?$/
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
            const msgHostDir = `${app.urls.jsdelivr}@${app.commitHashes.locales}/${app.name}/_locales/`,
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
            console.info(`\n${by}${ app.msgs.info_validArgs || 'Valid arguments are below' }.${nc}`)
            printHelpSections(['paramOptions', 'flags', 'infoCmds'])
            process.exit(1)
        }
    })
    for (const numArgType of ['length', 'qty'])
        if (app.config[numArgType] && (isNaN(app.config[numArgType]) || app.config[numArgType] < 1)) {
            console.error(`\n${ br +( app.msgs.prefix_error || 'ERROR' )}: [${numArgType}] `
                + `${ app.msgs.error_nonPositiveNum || 'argument can only be > 0' }.${nc}`)
            printHelpCmdAndDocURL() ; process.exit(1)
        }

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
                )?.match(app.regex.version)?.[1] || 'none'
                break
            }
            currentDir = path.dirname(currentDir)
        }
        console.info(`\n${ app.msgs.prefix_globalVer || 'Global version' }: ${globalVer}`)
        console.info(`${ app.msgs.prefix_localVer || 'Local version' }: ${localVer}`)

    } else { // run MAIN routine
        const funcOptions = {
            length: app.config.length || 8, qty: app.config.qty || 1,
            charset: app.config.charset, exclude: app.config.excludeChars,
            numbers: !!app.config.includeNums, symbols: !!app.config.includeSymbols,
            lowercase: !app.config.excludeLowerChars, uppercase: !app.config.excludeUpperChars,
            excludeSimilarChars: !!app.config.excludeSimilarChars,
            strict: !!app.config.strictMode, verbose: !app.config.quietMode
        }
        const pwResult = generatePassword(funcOptions)
        printIfNotQuiet(`\n${ app.msgs.info_copying || 'Copying to clipboard' }...`)
        clipboardy.writeSync(Array.isArray(pwResult) ? pwResult.join('\n') : pwResult)
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
            app.msgs.info_type || 'type' } generate-pw --help' ${ app.msgs.info_or || 'or' } ${
            app.msgs.info_visit || 'visit' }\n${bw}${app.urls.docs}${nc}`
        )
    }

    function printHelpSections(includeSections = ['header', 'usage', 'paramOptions', 'flags', 'infoCmds']) {
        const appPrefix = `\x1b[106m\x1b[30m ${app.name} ${nc} ` // bright teal bg + black fg
        const helpSections = {
            header: [
                `\n├ ${appPrefix}${ app.msgs.appCopyright || `© ${
                    app.creationYear}–${new Date().getFullYear()} ${
                    app.author} under the ${app.license} license.`
                }`,
                `${appPrefix}${ app.msgs.prefix_source || 'Source' }: ${app.urls.src}`
            ],
            usage: [
                `\n${bw}o ${ app.msgs.helpSection_usage || 'Usage' }:${nc}`,
                ` ${bw}» ${bg}${app.cmdFormat}${nc}`
            ],
            paramOptions: [
                `\n${bw}o ${ app.msgs.helpSection_paramOptions || 'Parameter options' }:${nc}`,
                ` --length=n                  ${ app.msgs.optionDesc_length || 'Generate password(s) of n length' }.`,
                ` --qty=n                     ${ app.msgs.optionDesc_qty || 'Generate n password(s)' }.`,
                ` --charset=chars             ${ app.msgs.optionDesc_charset || 'Only include chars in password(s)' }.`,
                ` --exclude=chars             ${ app.msgs.optionDesc_exclude || 'Exclude chars from password(s)' }.`
            ],
            flags: [
                `\n${bw}o ${ app.msgs.helpSection_flags || 'Boolean options' }:${nc}`,
                ` -n, --include-numbers       ${ app.msgs.optionDesc_includeNums || 'Allow numbers in password(s)' }.`,
                ` -y, --include-symbols       ${ app.msgs.optionDesc_includeSymbols || 'Allow symbols in password(s)' }.`,
                ` -L, --no-lowercase          ${ app.msgs.optionDesc_noLower || 'Disallow lowercase letters in password(s)' }.`,
                ` -U, --no-uppercase          ${ app.msgs.optionDesc_noUpper || 'Disallow uppercase letters in password(s)' }.`,
                ` -S, --no-similar            ${ app.msgs.optionDesc_noSimilar || 'Exclude similar characters in password(s)' }.`,
                ` -s, --strict                ${ app.msgs.optionDesc_strict || 'Require at least one character from each'
                                                                         + 'allowed character set in password(s)' }.`,
                ` -q, --quiet                 ${ app.msgs.optionDesc_quiet || 'Suppress all logging except errors' }.`
            ],
            infoCmds: [
                `\n${bw}o ${ app.msgs.helpSection_infoCmds || 'Info commands' }:${nc}`,
                ` -h, --help                  ${ app.msgs.optionDesc_help || 'Display help screen.' }`,
                ` -v, --version               ${ app.msgs.optionDesc_version || 'Show version number' }.`
            ]
        }
        includeSections.forEach(section => // print valid arg elems
            helpSections[section]?.forEach(line => printHelpMsg(line, /header|usage/.test(section) ? 1 : 29)))
        console.info(
            `\n${ app.msgs.info_moreHelp || 'For more help' }, ${
                  app.msgs.info_visit || 'visit' }: ${bw}${app.urls.docs}${nc}`
        )

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
            lines.forEach((line, idx) => console.info(prefix +(
                idx == 0 ? line // print 1st line unindented
                    : ' '.repeat(indent) + line // print subsequent lines indented
            )))
        }
    }

    function printIfNotQuiet(msg) { if (!app.config.quietMode) console.info(msg) }

})()
