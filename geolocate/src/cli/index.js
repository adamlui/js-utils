#!/usr/bin/env node

(async () => {
    'use strict'

    globalThis.env = { devMode: __dirname.match(/[\\/]src/) }

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
        { execSync } = require('child_process'),
          fs = require('fs'),
          geo = require(`../geolocate${ env.devMode ? '' : '.min' }.js`),
        { getMsgs, getSysLang } = require(`./lib/language${ env.devMode ? '' : '.min' }.js`),
          path = require('path')

    // Init APP data
    globalThis.app = require(`../${ env.devMode ? '../' : './data/' }app.json`)
    app.urls.docs += '/#-command-line-usage' ; app.msgs = await getMsgs(getSysLang())
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
        const matchedFlag = Object.keys(app.regex.flags).find(flag => app.regex.flags[flag].test(arg)),
              matchedInfoCmd = Object.keys(app.regex.infoCmds).find(cmd => app.regex.infoCmds[cmd].test(arg))
        if (matchedFlag) app.config[matchedFlag] = true
        else if (!matchedInfoCmd) {
            console.error(
                `\n${colors.br}${app.msgs.prefix_error}: Arg [${arg}] ${app.msgs.error_notRecognized}.${colors.nc}`)
            console.info(`\n${colors.by}${app.msgs.info_validArgs}.${colors.nc}`)
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
            console.info(`\nIP: ${colors.bw}${geoResults[0].ip}${colors.nc}`)
            console.info(`${app.msgs.geoLabel_country}: ${colors.bw}${geoResults[0].country}${colors.nc}}`)
            console.info(`${app.msgs.geoLabel_region}: ${colors.bw}${geoResults[0].regionName}${colors.nc}}`)
            console.info(`${app.msgs.geoLabel_city}: ${colors.bw}${geoResults[0].city}${colors.nc}}`)
            console.info(`${app.msgs.geoLabel_zip}: ${colors.bw}${geoResults[0].zip}${colors.nc}}`)
            console.info(`${app.msgs.geoLabel_lat}: ${colors.bw}${geoResults[0].lat}${colors.nc}}`)
            console.info(`${app.msgs.geoLabel_lon}: ${colors.bw}${geoResults[0].lon}${colors.nc}}`)
            console.info(`${app.msgs.geoLabel_timeZone}: ${colors.bw}${geoResults[0].timezone
                .replace(/_/g, ' ') // insert spaces
                .replace(/\//g, ' / ') // pad slashes
            }${colors.nc}`)
            console.info(`ISP: ${colors.bw}${geoResults[0].isp}${colors.nc}}`)
        }

        // Copy to clipboard
        printIfNotQuiet(`\n${app.msgs.info_copying}...`)
        clipboardy.writeSync(JSON.stringify(geoResults, undefined, 2))
    }

    // Define FUNCTIONS

    function printHelpSections(includeSections = ['header', 'usage', 'configOptions', 'infoCmds']) {
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
            configOptions: [
                `\n${colors.bw}o ${app.msgs.helpSection_configOptions}:${colors.nc}`,
                ` -q, --quiet                 ${app.msgs.optionDesc_quiet}.`
            ],
            infoCmds: [
                `\n${colors.bw}o ${app.msgs.helpSection_infoCmds}:${colors.nc}`,
                ` -h, --help                  ${app.msgs.optionDesc_help}`,
                ` -v, --version               ${app.msgs.optionDesc_version}.`
            ]
        }
        includeSections.forEach(section => // print valid arg elems
            helpSections[section]?.forEach(line => printHelpMsg(line, /header|usage/.test(section) ? 1 : 29)))
        console.info(`\n${app.msgs.info_moreHelp}, ${app.msgs.info_visit}: ${colors.bw}${app.urls.docs}${colors.nc}`)

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
