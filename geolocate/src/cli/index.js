#!/usr/bin/env node

(async () => {
    'use strict'

    globalThis.env = { devMode: __dirname.match(/[\\/]src/) }

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
          geo = require(`../geolocate${ env.devMode ? '' : '.min' }.js`),
        { getMsgs, getSysLang } = require(`./lib/language${ env.devMode ? '' : '.min' }.js`),
          print = require(`./lib/print${ env.devMode ? '' : '.min' }.js`),
          settings = require(`./lib/settings${ env.devMode ? '' : '.min' }.js`)

    // Init APP data
    Object.assign(globalThis.app ??= {}, require(`../${ env.devMode ? '../' : './data/' }app.json`))
    app.urls.docs += '/#-command-line-usage'
    app.msgs = await getMsgs(getSysLang())

    // Show HELP screen if --?<h|help> passed
    if (process.argv.some(arg => settings.controls.help.regex.test(arg)))
        print.help()

    // Show VERSION number if --?<v|version> passed
    else if (process.argv.some(arg => settings.controls.version.regex.test(arg)))
        print.version()

    else { // log/copy RESULT(S)
        settings.load()

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
        if (!app.config.quietMode && geoResults.length == 1)
            print.geoData(geoResults[0])

        // Copy to clipboard
        print.ifNotQuiet(`\n${app.msgs.info_copying}...`)
        clipboardy.writeSync(JSON.stringify(geoResults, undefined, 2))
    }

})()
