#!/usr/bin/env node

const pkgName = 'generate-ip',
      copyright = '© 2024–2025 Adam Lui & contributors under the MIT license.',
      cmdFormat = 'generate-[ip|ipv6|mac] [options|commands]',
      srcURL = 'https://code.generate-ip.org',
      docURL = 'https://docs.generate-ip.org/#-command-line-usage'

(async () => {

    // Import LIBS
    const { ipv4, ipv6, mac } = require(__dirname.match(/src/) ? './generate-ip' : './generate-ip.min'),
          fs = require('fs'), path = require('path'),
          { execSync } = require('child_process') // for --version cmd + cross-platform copying

    // Init UI COLORS
    const nc = '\x1b[0m',    // no color
          br = '\x1b[1;91m', // bright red
          by = '\x1b[1;33m', // bright yellow
          bg = '\x1b[1;92m', // bright green
          bw = '\x1b[1;97m' // bright white

    // Load sys LANGUAGE
    let langCode = 'en'
    if (process.platform == 'win32') {
        try { langCode = execSync('(Get-Culture).TwoLetterISOLanguageName', { shell: 'powershell', encoding: 'utf-8' }).trim() }
        catch (err) {}
    } else { // macOS/Linux
        const env = process.env
        langCode = (env.LANG || env.LANGUAGE || env.LC_ALL || env.LC_MESSAGES || env.LC_NAME || 'en')?.split('.')[0]
    }

    // Define MESSAGES
    let msgs = {}
    const msgsLoaded = new Promise((resolve, reject) => {
        const msgHostURL = 'https://cdn.jsdelivr.net/gh/adamlui/js-utils/generate-ip/_locales/',
              msgLocaleDir = ( langCode ? langCode.replace('-', '_') : 'en' ) + '/'
        let msgHref = msgHostURL + msgLocaleDir + 'messages.json', msgFetchTries = 0
        fetchData(msgHref).then(onLoad).catch(reject)
        async function onLoad(resp) {
            try { // to return localized messages.json
                const msgs = await resp.json(), flatMsgs = {}
                for (const key in msgs)  // remove need to ref nested keys
                    if (typeof msgs[key] == 'object' && 'message' in msgs[key])
                        flatMsgs[key] = msgs[key].message
                resolve(flatMsgs)
            } catch (err) { // if bad response
                msgFetchTries++ ; if (msgFetchTries == 3) return resolve({}) // try up to 3X (original/region-stripped/EN) only
                msgHref = langCode.includes('-') && msgFetchTries == 1 ? // if regional lang on 1st try...
                    msgHref.replace(/([^_]*)_[^/]*(\/.*)/, '$1$2') // ...strip region before retrying
                        : ( msgHostURL + 'en/messages.json' ) // else use default English messages
                fetchData(msgHref).then(onLoad).catch(reject)
            }
        }
    })
    try { msgs = await msgsLoaded } catch (err) {}

    // Load SETTINGS from args
    const config = {}
    const reArgs = {
        paramOptions: { 'qty': /^--?qu?a?n?ti?t?y(?:=.*|$)/ },
        flags: {
            'ipv6mode': /^--?(?:ip)?v?6(?:-?mode)?$/,
            'macMode': /^--?m(?:ac)?(?:-?mode)?$/,
            'quietMode': /^--?q(?:uiet)?(?:-?mode)?$/
        },
        infoCmds: { 'help': /^--?h(?:elp)?$/, 'version': /^--?ve?r?s?i?o?n?$/ }
    }
    process.argv.forEach(arg => {
        if (!arg.startsWith('-')) return
        const matchedParamOption = Object.keys(reArgs.paramOptions)
            .find(option => reArgs.paramOptions[option].test(arg))
        const matchedFlag = Object.keys(reArgs.flags).find(flag => reArgs.flags[flag].test(arg))
        const matchedInfoCmd = Object.keys(reArgs.infoCmds).find(cmd => reArgs.infoCmds[cmd].test(arg))
        if (matchedFlag) config[matchedFlag] = true
        else if (matchedParamOption) {
            if (!/=.+/.test(arg)) {
                console.error(`\n${ br + ( msgs.prefix_error || 'ERROR' )}: `
                    + `Arg [--${arg.replace(/-/g, '')}] `
                    + `${ msgs.error_noEqual || 'requires \'=\' followed by a value' }.${nc}`)
                printHelpCmdAndDocURL() ; process.exit(1)
            }
            const value = arg.split('=')[1]
            config[matchedParamOption] = parseInt(value) || value
        } else if (!matchedInfoCmd && !/ipv4/.test(arg)) {
            console.error(`\n${ br + ( msgs.prefix_error || 'ERROR' )}: `
                + `Arg [${arg}] ${ msgs.error_notRecognized || 'not recognized' }.${nc}`)
            console.info(`\n${ by + ( msgs.info_validArgs || 'Valid arguments are below' )}.${nc}`)
            printHelpSections(['paramOptions', 'flags', 'infoCmds'])
            process.exit(1)
    }})
    if (config.qty && (isNaN(config.qty) || config.qty < 1)) {
        console.error(`\n${ br + ( msgs.prefix_error || 'ERROR' )}: [qty] `
            + `${ msgs.error_nonPositiveNum || 'argument can only be > 0' }.${nc}`)
        printHelpCmdAndDocURL() ; process.exit(1)
    }

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
        console.info(`\n${ msgs.prefix_globalVer || 'Global version' }: ${globalVer}`)
        console.info(`${ msgs.prefix_localVer || 'Local version' }: ${localVer}`)

    } else { // log/copy RESULT(S)
        const genOptions = { qty: config.qty || 1, verbose: !config.quietMode },
              ipResult = config.ipv6mode ? ipv6.generate(genOptions)
                        : config.macMode ? mac.generate(genOptions)
                                         : ipv4.generate(genOptions)
        printIfNotQuiet(`\n${ msgs.info_copying || 'Copying to clipboard' }...`)
        copyToClipboard(Array.isArray(ipResult) ? ipResult.join('\n') : ipResult)
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

    function printHelpSections(includeSections = ['header', 'usage', 'paramOptions', 'flags', 'infoCmds']) {
        const appPrefix = `\x1b[106m\x1b[30m ${pkgName} ${nc} ` // bright teal bg + black fg
        const helpSections = {
            'header': [
                '\n├ ' + appPrefix + ( msgs.appCopyright || copyright ),
                `${ appPrefix + ( msgs.prefix_source || 'Source' )}: ${srcURL}`
            ],
            'usage': [
                `\n${bw}o ${ msgs.helpSection_usage || 'Usage' }:${nc}`,
                ` ${bw}» ${bg + cmdFormat + nc}`
            ],
            'paramOptions': [
                `\n${bw}o ${ msgs.helpSection_paramOptions || 'Parameter options' }:${nc}`,
                ` --qty=n                     ${ msgs.optionDesc_qty || 'Generate n IP address(es)' }.`
            ],
            'flags': [
                `\n${bw}o ${ msgs.helpSection_flags || 'Boolean options' }:${nc}`,
                ` -6, --ipv6                  ${ msgs.optionDesc_ipv6 || 'Generate IPv6 address' }.`,
                ` -m, --mac                   ${ msgs.optionDesc_mac || 'Generate MAC address' }.`,
                ` -q, --quiet                 ${ msgs.optionDesc_quiet || 'Suppress all logging except errors' }.`
            ],
            'infoCmds': [
                `\n${bw}o ${ msgs.helpSection_infoCmds || 'Info commands' }:${nc}`,
                ` -h, --help                  ${ msgs.optionDesc_help || 'Display help screen.' }`,
                ` -v, --version               ${ msgs.optionDesc_version || 'Show version number' }.`
            ]
        }
        includeSections.forEach(section => // print valid arg elems
            helpSections[section]?.forEach(line => printHelpMsg(line, /header|usage/.test(section) ? 1 : 29)))
        console.info(`\n${ msgs.info_moreHelp || 'For more help' }, ${ msgs.info_visit || 'visit' }: ${ bw + docURL + nc }`)

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
        console.info(`\n${ msgs.info_moreHelp || 'For more help' },`
            + ` ${ msgs.info_type || 'type' } 'generate-ip --help'`
            + ` ${ msgs.info_or || 'or' } ${ msgs.info_visit || 'visit' }\n${ bw + docURL + nc }`
        )
    }

    function printIfNotQuiet(msg) { if (!config.quietMode) console.info(msg) }

    function copyToClipboard(data) {
        if (process.platform == 'darwin') // macOS
            execSync(`printf "${data}" | pbcopy`)
        else if (process.platform == 'linux')
            execSync(`printf "${data}" | xclip -selection clipboard`)
        else if (process.platform == 'win32')
            execSync(`Set-Clipboard -Value "${data}"`, { shell: 'powershell' })
    }

})()
