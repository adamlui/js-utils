#!/usr/bin/env node

(async () => {
    'use strict'

    globalThis.env = { sysLang: 'en', devMode: __dirname.match(/src/) }

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
        { execSync } = require('child_process'),
          fs = require('fs'),
          geo = require(`./geolocate${ env.devMode ? '' : '.min' }.js`),
          language = require(`../lib/language${ env.devMode ? '' : '.min' }.js`),
          path = require('path')

    // Init APP data
    globalThis.app = require(`../${ env.devMode ? '../' : 'data/' }app.json`)
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

    // Init LANGUAGE props
    language.initSysLang() ; await language.initMsgs()

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
