#!/usr/bin/env node

(async () => {
    'use strict'

    globalThis.env = { devMode: __dirname.match(/[\\/]src/) }

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
        { getMsgs, getSysLang } = require(`./lib/language${ env.devMode ? '' : '.min' }.js`),
        { ipv4, ipv6, mac } = require(`../generate-ip${ env.devMode ? '' : '.min' }.js`),
          print = require(`./lib/print${ env.devMode ? '' : '.min' }.js`)

    // Init APP data
    globalThis.app = require(`../${ env.devMode ? '../' : './data/' }app.json`)
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
        paramOptions: {
            qty: /^--?qu?a?n?ti?t?y(?:=.*|$)/ },
        flags: {
            ipv6mode: /^--?(?:ip)?v?6(?:-?mode)?$/,
            macMode: /^--?m(?:ac)?(?:-?mode)?$/,
            quietMode: /^--?q(?:uiet)?(?:-?mode)?$/
        },
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
        const matchedParamOption = Object.keys(app.regex.paramOptions)
            .find(option => app.regex.paramOptions[option].test(arg))
        const matchedFlag = Object.keys(app.regex.flags).find(flag => app.regex.flags[flag].test(arg))
        const matchedInfoCmd = Object.keys(app.regex.infoCmds).find(cmd => app.regex.infoCmds[cmd].test(arg))
        if (matchedFlag) app.config[matchedFlag] = true
        else if (matchedParamOption) {
            if (!/=.+/.test(arg)) {
                console.error(`\n${app.colors.br}${app.msgs.prefix_error}: Arg [--${
                    arg.replace(/-/g, '')}] ${app.msgs.error_noEqual}.${app.colors.nc}`)
                print.helpCmdAndDocURL() ; process.exit(1)
            }
            const val = arg.split('=')[1]
            app.config[matchedParamOption] = parseInt(val) || val
        } else if (!matchedInfoCmd && !/ipv4/.test(arg)) {
            console.error(`\n${app.colors.br}${app.msgs.prefix_error}: Arg [${
                arg}] ${app.msgs.error_notRecognized}.${app.colors.nc}`)
            console.info(`\n${app.colors.by}${app.msgs.info_validArgs}.${app.colors.nc}`)
            print.helpSections(['paramOptions', 'flags', 'infoCmds'])
            process.exit(1)
        }
    })
    if (app.config.qty && (isNaN(app.config.qty) || app.config.qty < 1)) {
        console.error(
            `\n${app.colors.br}${app.msgs.prefix_error}: [qty] ${app.msgs.error_nonPositiveNum}.${app.colors.nc}`)
        print.helpCmdAndDocURL() ; process.exit(1)
    }

    // Show HELP screen if --?<h|help> passed
    if (process.argv.some(arg => app.regex.infoCmds.help.test(arg)))
        print.helpSections()

    // Show VERSION number if --?<v|version> passed
    else if (process.argv.some(arg => app.regex.infoCmds.version.test(arg)))
        print.version()

    else { // log/copy RESULT(S)
        const genOptions = { qty: app.config.qty || 1, verbose: !app.config.quietMode },
              ipResult = app.config.ipv6mode ? ipv6.generate(genOptions)
                       : app.config.macMode  ?  mac.generate(genOptions)
                                             : ipv4.generate(genOptions)
        print.ifNotQuiet(`\n${app.msgs.info_copying}...`)
        clipboardy.writeSync([].concat(ipResult).join('\n'))
    }

})()
