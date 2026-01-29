#!/usr/bin/env node

(async () => {
    'use strict'

    globalThis.env = { devMode: __dirname.match(/[\\/]src/) }

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
          geo = require(`../geolocate${ env.devMode ? '' : '.min' }.js`),
        { getMsgs, getSysLang } = require(`./lib/language${ env.devMode ? '' : '.min' }.js`),
          print = require(`./lib/print${ env.devMode ? '' : '.min' }.js`)

    // Init APP data
    Object.assign(globalThis.app ??= {}, require(`../${ env.devMode ? '../' : './data/' }app.json`))
    app.urls.docs += '/#-command-line-usage' ; app.msgs = await getMsgs(getSysLang())
    app.colors = {
        nc: '\x1b[0m',    // no color
        br: '\x1b[1;91m', // bright red
        by: '\x1b[1;33m', // bright yellow
        bg: '\x1b[1;92m', // bright green
        bw: '\x1b[1;97m', // bright white
        blk: '\x1b[30m',  // black
        tlBG: '\x1b[106m' // teal bg
    }
    app.regex = {
        flags: {
            quietMode: /^--?q(?:uiet)?(?:-?mode)?$/ },
        infoCmds: {
            help: /^--?h(?:elp)?$/,
            version: /^--?ve?r?s?i?o?n?$/
        },
        version: /^[~^>=]?\d+\.\d+\.\d+$/
    }

    // Load SETTINGS from args
    app.config = {}
    process.argv.forEach(arg => {
        if (!arg.startsWith('-')) return
        const matchedFlag = Object.keys(app.regex.flags).find(flag => app.regex.flags[flag].test(arg)),
              matchedInfoCmd = Object.keys(app.regex.infoCmds).find(cmd => app.regex.infoCmds[cmd].test(arg))
        if (matchedFlag) app.config[matchedFlag] = true
        else if (!matchedInfoCmd) {
            console.error(`\n${app.colors.br}${app.msgs.prefix_error}: Arg [${
                arg}] ${app.msgs.error_notRecognized}.${app.colors.nc}`)
            console.info(`\n${app.colors.by}${app.msgs.info_validArgs}.${app.colors.nc}`)
            print.help(['paramOptions', 'infoCmds'])
            process.exit(1)
        }
    })

    // Show HELP screen if --?<h|help> passed
    if (process.argv.some(arg => app.regex.infoCmds.help.test(arg)))
        print.help()

    // Show VERSION number if --?<v|version> passed
    else if (process.argv.some(arg => app.regex.infoCmds.version.test(arg)))
        print.version()

    else { // log/copy RESULT(S)

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
            const data = geoResults[0]
            console.info([
                `\nIP: ${app.colors.bw}${data.ip}${app.colors.nc}`,
                `${app.msgs.geoLabel_country}: ${app.colors.bw}${data.country}${app.colors.nc}`,
                `${app.msgs.geoLabel_region}: ${app.colors.bw}${data.regionName}${app.colors.nc}`,
                `${app.msgs.geoLabel_city}: ${app.colors.bw}${data.city}${app.colors.nc}`,
                `${app.msgs.geoLabel_zip}: ${app.colors.bw}${data.zip}${app.colors.nc}`,
                `${app.msgs.geoLabel_lat}: ${app.colors.bw}${data.lat}${app.colors.nc}`,
                `${app.msgs.geoLabel_lon}: ${app.colors.bw}${data.lon}${app.colors.nc}`,
                `${app.msgs.geoLabel_timeZone}: ${app.colors.bw}${data.timezone.replace(/_/g, ' ')
                    .replace(/\//g, ' / ')}${app.colors.nc}`,
                `ISP: ${app.colors.bw}${data.isp}${app.colors.nc}`
            ].join('\n'))
        }

        // Copy to clipboard
        print.ifNotQuiet(`\n${app.msgs.info_copying}...`)
        clipboardy.writeSync(JSON.stringify(geoResults, undefined, 2))
    }

})()
