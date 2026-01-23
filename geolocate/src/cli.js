#!/usr/bin/env node

(async () => {
    'use strict'

    globalThis.env = { sysLang: 'en', devMode: __dirname.match(/src/) }

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
        { execSync } = require('child_process'),
          fs = require('fs'),
          geo = require(`./geolocate${ env.devMode ? '' : '.min' }.js`),
          path = require('path')

    // Init APP data
    globalThis.app = require(`${ env.devMode ? '..' : '.' }/app.json`)
    app.config = {} ; app.urls.docs += '/#-command-line-usage'
    app.regex = {
        flags: {
            quietMode: /^--?q(?:uiet)?(?:-?mode)?$/ },
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
            env.sysLang = execSync(
                '(Get-Culture).TwoLetterISOLanguageName', { shell: 'powershell', encoding: 'utf-8' }
            ).trim()
        } catch (err) { console.error('ERROR loading system language:', err.message) }
    else { // macOS/Linux
        const pe = process.env
        env.sysLang = (pe.LANG || pe.LANGUAGE || pe.LC_ALL || pe.LC_MESSAGES || pe.LC_NAME || 'en')?.split('.')[0]
    }

    // Load MESSAGES
    app.msgs = flattenMsgs(require(`${ env.devMode ? '../_locales/en' : '.' }/messages.json`))
    if (!env.sysLang.startsWith('en'))
        try { // to fetch from jsDelivr
            const msgHostDir = `${app.urls.jsdelivr}@${app.commitHashes.locales}/${app.name.split('/')[1]}/_locales/`,
                  msgLocaleDir = `${ env.sysLang ? env.sysLang.replace('-', '_') : 'en' }/`
            let msgHref = `${msgHostDir}${msgLocaleDir}messages.json`, msgFetchTries = 0
            while (msgFetchTries < 3)
                try { app.msgs = flattenMsgs(await (await fetchData(msgHref)).json()) ; break }
                catch (err) { // if bad response
                    msgFetchTries++ ; if (msgFetchTries == 3) break // try original/region-stripped/EN only
                    msgHref = env.sysLang.includes('-') && msgFetchTries == 1 ? // if regional lang on 1st try...
                        msgHref.replace(/([^_]*)_[^/]*(\/.*)/, '$1$2') // ...strip region before retrying
                            : `${msgHostDir}en/messages.json` // else use default English messages
                }
        } catch (err) { console.error('ERROR loading messages:', err.message) }

    // Load SETTINGS from args
    process.argv.forEach(arg => {
        if (!arg.startsWith('-')) return
        const matchedFlag = Object.keys(app.regex.flags).find(flag => app.regex.flags[flag].test(arg)),
              matchedInfoCmd = Object.keys(app.regex.infoCmds).find(cmd => app.regex.infoCmds[cmd].test(arg))
        if (matchedFlag) app.config[matchedFlag] = true
        else if (!matchedInfoCmd) {
            console.error(`\n${br}${app.msgs.prefix_error}: Arg [${arg}] ${app.msgs.error_notRecognized}.${nc}`)
            console.info(`\n${by}${app.msgs.info_validArgs}.${nc}`)
            printHelpSections(['paramOptions', 'infoCmds'])
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
            console.info(`${app.msgs.geoLabel_country}: ${bw}${geoResults[0].country}${nc}}`)
            console.info(`${app.msgs.geoLabel_region}: ${bw}${geoResults[0].regionName}${nc}}`)
            console.info(`${app.msgs.geoLabel_city}: ${bw}${geoResults[0].city}${nc}}`)
            console.info(`${app.msgs.geoLabel_zip}: ${bw}${geoResults[0].zip}${nc}}`)
            console.info(`${app.msgs.geoLabel_lat}: ${bw}${geoResults[0].lat}${nc}}`)
            console.info(`${app.msgs.geoLabel_lon}: ${bw}${geoResults[0].lon}${nc}}`)
            console.info(`${app.msgs.geoLabel_timeZone}: ${bw}${geoResults[0].timezone
                .replace(/_/g, ' ') // insert spaces
                .replace(/\//g, ' / ') // pad slashes
            }${nc}`)
            console.info(`ISP: ${bw}${geoResults[0].isp}${nc}}`)
        }

        // Copy to clipboard
        printIfNotQuiet(`\n${app.msgs.info_copying}...`)
        clipboardy.writeSync(JSON.stringify(geoResults, undefined, 2))
    }

    // Define FUNCTIONS

    function fetchData(url) { // instead of fetch() to support Node.js < v21
        return new Promise((resolve, reject) => {
            const protocol = url.match(/^([^:]+):\/\//)[1]
            if (!/^https?$/.test(protocol)) reject(new Error(`${app.msgs.error_invalidURL}.`))
            require(protocol).get(url, resp => {
                let rawData = ''
                resp.on('data', chunk => rawData += chunk)
                resp.on('end', () => resolve({ json: () => JSON.parse(rawData) }))
            }).on('error', reject)
        })
    }

    function flattenMsgs(json) { // eliminate need to ref nested keys
        const flatMsgs = {} ; for (const key in json) flatMsgs[key] =
            typeof json[key] == 'object' && 'message' in json[key] ? json[key].message : json[key]
        return flatMsgs
    }

    function printHelpSections(includeSections = ['header', 'usage', 'configOptions', 'infoCmds']) {
        app.prefix = `\x1b[106m\x1b[30m ${app.name.replace(/^@[^/]+\//, '')} ${nc} ` // bright teal bg + black fg
        const helpSections = {
            header: [
                `\n├ ${app.prefix}${ app.msgs.appCopyright || `© ${
                    app.creationYear}–${new Date().getFullYear()} ${
                    app.author} under the ${app.license} license.`
                }`,
                `${app.prefix}${app.msgs.prefix_source}: ${app.urls.src}`
            ],
            usage: [
                `\n${bw}o ${app.msgs.helpSection_usage}:${nc}`,
                ` ${bw}» ${bg}${app.cmdFormat}${nc}`
            ],
            configOptions: [
                `\n${bw}o ${app.msgs.helpSection_configOptions}:${nc}`,
                ` -q, --quiet                 ${app.msgs.optionDesc_quiet}.`
            ],
            infoCmds: [
                `\n${bw}o ${app.msgs.helpSection_infoCmds}:${nc}`,
                ` -h, --help                  ${app.msgs.optionDesc_help}`,
                ` -v, --version               ${app.msgs.optionDesc_version}.`
            ]
        }
        includeSections.forEach(section => // print valid arg elems
            helpSections[section]?.forEach(line => printHelpMsg(line, /header|usage/.test(section) ? 1 : 29)))
        console.info(`\n${app.msgs.info_moreHelp}, ${app.msgs.info_visit}: ${bw}${app.urls.docs}${nc}`)

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
