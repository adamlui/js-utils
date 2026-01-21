#!/usr/bin/env node

const pkgName = '@adamlui/geolocate',
      copyright = '© 2024–2026 Adam Lui under the MIT license.',
      cmdFormat = 'geolocate [ip1] [ip2] [...] [options|commands]',
      srcURL = 'https://code.geolocatejs.org',
      docURL = 'https://docs.geolocatejs.org/#-command-line-usage',
      latestLocaleCommitHash = '0e30af1'

;(async () => {
    'use strict'

    // Import LIBS
    const geo = require(__dirname.match(/src/) ? './geolocate' : './geolocate.min'),
          fs = require('fs'), path = require('path'),
          { execSync, execFileSync } = require('child_process') // for --version cmd + cross-platform copying

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
            langCode = execSync('(Get-Culture).TwoLetterISOLanguageName', { shell: 'powershell', encoding: 'utf-8' })
                .trim()
        } catch (err) { console.error('ERROR loading system language:', err.message) }
    } else { // macOS/Linux
        const env = process.env
        langCode = (env.LANG || env.LANGUAGE || env.LC_ALL || env.LC_MESSAGES || env.LC_NAME || 'en')?.split('.')[0]
    }

    // Define MESSAGES
    let msgs = {}
    const msgsLoaded = new Promise((resolve, reject) => {
        const msgHostDir = `https://cdn.jsdelivr.net/gh/adamlui/js-utils@${latestLocaleCommitHash}/geolocate/_locales/`,
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
                        : `${msgHostDir}en/messages.json` // else use default English messages
                fetchData(msgHref).then(handleMsgs).catch(reject)
            }
        }
    })
    try { msgs = await msgsLoaded } catch (err) { console.error(`ERROR fetching messages: ${err.message}`) }

    // Load SETTINGS from args
    const config = {}
    const regex = {
        flags: { 'quietMode': /^--?q(?:uiet)?(?:-?mode)?$/ },
        infoCmds: { 'help': /^--?h(?:elp)?$/, 'version': /^--?ve?r?s?i?o?n?$/ }
    }
    process.argv.forEach(arg => {
        if (!arg.startsWith('-')) return
        const matchedFlag = Object.keys(regex.flags).find(flag => regex.flags[flag].test(arg)),
              matchedInfoCmd = Object.keys(regex.infoCmds).find(cmd => regex.infoCmds[cmd].test(arg))
        if (matchedFlag) config[matchedFlag] = true
        else if (!matchedInfoCmd) {
            console.error(`\n${ br +( msgs.prefix_error || 'ERROR' )}: `
                + `Arg [${arg}] ${ msgs.error_notRecognized || 'not recognized' }.${nc}`)
            console.info(`\n${ by +( msgs.info_validArgs || 'Valid arguments are below' )}.${nc}`)
            printHelpSections(['configOptions', 'infoCmds'])
            process.exit(1)
    }})

    // Show HELP screen if -h or --help passed
    if (process.argv.some(arg => regex.infoCmds.help.test(arg))) printHelpSections()

    // Show VERSION number if -v or --version passed
    else if (process.argv.some(arg => regex.infoCmds.version.test(arg))) {
        const globalVer = execSync(`npm view ${pkgName} version`).toString().trim() || 'none'
        let localVer, currentDir = process.cwd()
        while (currentDir != '/') {
            const localManifestPath = path.join(currentDir, 'package.json')
            if (fs.existsSync(localManifestPath)) {
                const localManifest = require(localManifestPath)
                localVer = (localManifest.dependencies?.[pkgName]
                         || localManifest.devDependencies?.[pkgName]
                )?.match(/^[~^>=]?\d+\.\d+\.\d+$/)?.[1] || 'none'
                break
            }
            currentDir = path.dirname(currentDir)
        }
        console.info(`\n${ msgs.prefix_globalVer || 'Global version' }: ${globalVer}`)
        console.info(`${ msgs.prefix_localVer || 'Local version' }: ${localVer}`)

    } else { // run MAIN routine

        // Load IP arg(s) into [validIPs]
        const args = process.argv.slice(2), validIPs = []
        for (const arg of args) if (!arg.startsWith('-')) {
            const ip = arg.replace(/[[\]]/g, '') // strip surrounding '[]' in case copied from docs
            validIPs.push(ip)
        }

        // Fetch/store geolocation data
        const geoResults = await geo.locate(validIPs, { verbose: !config.quietMode })
        if (!geoResults) process.exit(1)

        // Log single result
        if (!config.quietMode && geoResults.length == 1) {
            console.info(`\nIP: ${bw}${geoResults[0].ip}${nc}`)
            console.info(`${ msgs.geoLabel_country || 'Country' }: ${bw}${geoResults[0].country}${nc}}`)
            console.info(`${ msgs.geoLabel_region || 'Region' }: ${bw}${geoResults[0].regionName}${nc}}`)
            console.info(`${ msgs.geoLabel_city || 'City' }: ${bw}${geoResults[0].city}${nc}}`)
            console.info(`${ msgs.geoLabel_zip || 'Zip' }: ${bw}${geoResults[0].zip}${nc}}`)
            console.info(`${ msgs.geoLabel_lat || 'Latitude' }: ${bw}${geoResults[0].lat}${nc}}`)
            console.info(`${ msgs.geoLabel_lon || 'Longitude' }: ${bw}${geoResults[0].lon}${nc}}`)
            console.info(`${ msgs.geoLabel_timeZone || 'Time zone' }: ${bw}${geoResults[0].timezone
                .replace(/_/g, ' ') // insert spaces
                .replace(/\//g, ' / ') // pad slashes
            }${nc}`)
            console.info(`ISP: ${bw}${geoResults[0].isp}${nc}}`)
        }

        // Copy to clipboard
        printIfNotQuiet(`\n${ msgs.info_copying || 'Copying to clipboard' }...`)
        copyToClipboard(JSON.stringify(geoResults, undefined, 2))
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
    })}

    function printHelpSections(includeSections = ['header', 'usage', 'configOptions', 'infoCmds']) {
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
            'configOptions': [
                `\n${bw}o ${ msgs.helpSection_configOptions || 'Config options' }:${nc}`,
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
        console.info(
            `\n${ msgs.info_moreHelp || 'For more help' }, ${ msgs.info_visit || 'visit' }: ${bw}${docURL}${nc}`)

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

    function printIfNotQuiet(msg) { if (!config.quietMode) console.info(msg) }

    function copyToClipboard(data) {
        data = data.replace(/"/g, '""')
        const osConfig = {
            darwin: { binPath: '/usr/bin/pbcopy', args: [] },
            linux: { binPath: '/usr/bin/xclip', args: ['-selection', 'clipboard'] },
            win32: {
                binPath: path.join(process.env.SYSTEMROOT, 'System32', 'WindowsPowerShell', 'v1.0', 'powershell.exe'),
                args: ['-Command', 'Set-Clipboard -Value $input']
            }
        }
        execFileSync(...Object.values(osConfig[process.platform]), { input: data })
    }

})()
