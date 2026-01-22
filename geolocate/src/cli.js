#!/usr/bin/env node

(async () => {
    'use strict'

    // Init DATA
    globalThis.env = { langCode: 'en', devMode: __dirname.match(/src/) }
    globalThis.app = require(`${ env.devMode ? '..' : '.' }/app.json`)
    app.config = {} ; app.urls.docs += '/#-command-line-usage'
    app.regex = {
        flags: {
            'quietMode': /^--?q(?:uiet)?(?:-?mode)?$/ },
        infoCmds: {
            'help': /^--?h(?:elp)?$/,
            'version': /^--?ve?r?s?i?o?n?$/
        },
        version: /^[~^>=]?\d+\.\d+\.\d+$/
    }

    // Import LIBS
    const { execSync } = require('child_process'), // for --version cmd
          fs = require('fs'),
          geo = require(`./${app.name.split('/')[1]}${ env.devMode ? '' : '.min' }.js`),
          ncp = require('node-clipboardy'),
          path = require('path')

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
            const msgHostDir = `${app.urls.jsdelivr}@${app.commitHashes.locales}/geolocate/_locales/`,
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
        const matchedFlag = Object.keys(app.regex.flags).find(flag => app.regex.flags[flag].test(arg)),
              matchedInfoCmd = Object.keys(app.regex.infoCmds).find(cmd => app.regex.infoCmds[cmd].test(arg))
        if (matchedFlag) app.config[matchedFlag] = true
        else if (!matchedInfoCmd) {
            console.error(`\n${ br +( app.msgs.prefix_error || 'ERROR' )}: `
                + `Arg [${arg}] ${ app.msgs.error_notRecognized || 'not recognized' }.${nc}`)
            console.info(`\n${ by +( app.msgs.info_validArgs || 'Valid arguments are below' )}.${nc}`)
            printHelpSections(['configOptions', 'infoCmds'])
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

        // Load IP arg(s) into [validIPs]
        const args = process.argv.slice(2), validIPs = []
        for (const arg of args) if (!arg.startsWith('-')) {
            const ip = arg.replace(/[[\]]/g, '') // strip surrounding '[]' in case copied from docs
            validIPs.push(ip)
        }

        // Fetch/store geolocation data
        const geoResults = await geo.locate(validIPs, { verbose: !app.config.quietMode })
        if (!geoResults) process.exit(1)

        // Log single result
        if (!app.config.quietMode && geoResults.length == 1) {
            console.info(`\nIP: ${bw}${geoResults[0].ip}${nc}`)
            console.info(`${ app.msgs.geoLabel_country || 'Country' }: ${bw}${geoResults[0].country}${nc}}`)
            console.info(`${ app.msgs.geoLabel_region || 'Region' }: ${bw}${geoResults[0].regionName}${nc}}`)
            console.info(`${ app.msgs.geoLabel_city || 'City' }: ${bw}${geoResults[0].city}${nc}}`)
            console.info(`${ app.msgs.geoLabel_zip || 'Zip' }: ${bw}${geoResults[0].zip}${nc}}`)
            console.info(`${ app.msgs.geoLabel_lat || 'Latitude' }: ${bw}${geoResults[0].lat}${nc}}`)
            console.info(`${ app.msgs.geoLabel_lon || 'Longitude' }: ${bw}${geoResults[0].lon}${nc}}`)
            console.info(`${ app.msgs.geoLabel_timeZone || 'Time zone' }: ${bw}${geoResults[0].timezone
                .replace(/_/g, ' ') // insert spaces
                .replace(/\//g, ' / ') // pad slashes
            }${nc}`)
            console.info(`ISP: ${bw}${geoResults[0].isp}${nc}}`)
        }

        // Copy to clipboard
        printIfNotQuiet(`\n${ app.msgs.info_copying || 'Copying to clipboard' }...`)
        ncp.writeSync(JSON.stringify(geoResults, undefined, 2))
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
    })}

    function printHelpSections(includeSections = ['header', 'usage', 'configOptions', 'infoCmds']) {
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
            'configOptions': [
                `\n${bw}o ${ app.msgs.helpSection_configOptions || 'Config options' }:${nc}`,
                ` -q, --quiet                 ${ app.msgs.optionDesc_quiet || 'Suppress all logging except errors' }.`
            ],
            'infoCmds': [
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
