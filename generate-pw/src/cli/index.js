#!/usr/bin/env node

(async () => {
    'use strict'

    globalThis.env = { devMode: __dirname.match(/[\\/]src/) }

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
        { generatePassword } = require(`../generate-pw${ env.devMode ? '' : '.min' }.js`),
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
                print.error(`Arg [--${arg.replace(/-/g, '')}] ${app.msgs.error_noEqual}.`)
                print.helpCmdAndDocURL()
                process.exit(1)
            }
            const val = arg.split('=')[1]
            app.config[matchedParamOption] = parseInt(val) || val
        } else if (!matchedInfoCmd) {
            print.error(`Arg [${arg}] ${app.msgs.error_notRecognized}.`)
            print.info(`${app.msgs.info_validArgs}.`)
            print.help(['paramOptions', 'flags', 'infoCmds'])
            process.exit(1)
        }
    })
    for (const numArgType of ['length', 'qty'])
        if (app.config[numArgType] && (isNaN(app.config[numArgType]) || app.config[numArgType] < 1)) {
            print.error(`[${numArgType}] ${app.msgs.error_nonPositiveNum}.`)
            print.helpCmdAndDocURL()
            process.exit(1)
        }

    // Show HELP screen if --?<h|help> passed
    if (process.argv.some(arg => app.regex.infoCmds.help.test(arg)))
        print.help()

    // Show VERSION number if --?<v|version> passed
    else if (process.argv.some(arg => app.regex.infoCmds.version.test(arg)))
        print.version()

    else { // copy RESULT(S)
        const genOptions = {
            length: app.config.length || 8, qty: app.config.qty || 1,
            charset: app.config.charset, exclude: app.config.excludeChars,
            numbers: !!app.config.includeNums, symbols: !!app.config.includeSymbols,
            lowercase: !app.config.excludeLowerChars, uppercase: !app.config.excludeUpperChars,
            excludeSimilarChars: !!app.config.excludeSimilarChars,
            strict: !!app.config.strictMode, verbose: !app.config.quietMode
        }
        print.ifNotQuiet(`\n${app.msgs.info_copying}...`)
        clipboardy.writeSync([].concat(generatePassword(genOptions)).join('\n'))
    }

})()
