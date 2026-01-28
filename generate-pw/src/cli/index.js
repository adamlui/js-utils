#!/usr/bin/env node

(async () => {
    'use strict'

    globalThis.env = { devMode: __dirname.match(/[\\/]src/) }

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
        { execSync } = require('child_process'),
          fs = require('fs'),
        { generatePassword } = require(`../generate-pw${ env.devMode ? '' : '.min' }.js`),
        { getMsgs, getSysLang } = require(`./lib/language${ env.devMode ? '' : '.min' }.js`),
          path = require('path'),
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
        tlBG: '\x1b[106m' // bright teal bg
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
                console.error(`\n${app.colors.br}${app.msgs.prefix_error}: Arg [--${
                    arg.replace(/-/g, '')}] ${app.msgs.error_noEqual}.${app.colors.nc}`)
                print.helpCmdAndDocURL() ; process.exit(1)
            }
            const val = arg.split('=')[1]
            app.config[matchedParamOption] = parseInt(val) || val
        } else if (!matchedInfoCmd) {
            console.error(`\n${app.colors.br}${app.msgs.prefix_error}: Arg [${
                arg}] ${app.msgs.error_notRecognized}.${app.colors.nc}`)
            console.info(`\n${app.colors.by}${app.msgs.info_validArgs}.${app.colors.nc}`)
            print.helpSections(['paramOptions', 'flags', 'infoCmds'])
            process.exit(1)
        }
    })
    for (const numArgType of ['length', 'qty'])
        if (app.config[numArgType] && (isNaN(app.config[numArgType]) || app.config[numArgType] < 1)) {
            console.error(`\n${app.colors.br}${app.msgs.prefix_error}: [${
                numArgType}] ${app.msgs.error_nonPositiveNum}.${app.colors.nc}`)
            print.helpCmdAndDocURL() ; process.exit(1)
        }

    // Show HELP screen if --?<h|help> passed
    if (process.argv.some(arg => app.regex.infoCmds.help.test(arg))) print.helpSections()

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
                )?.match(app.regex.version)?.[1] || 'none'
                break
            }
            currentDir = path.dirname(currentDir)
        }
        console.info(`\n${app.msgs.prefix_globalVer}: ${globalVer}\n${app.msgs.prefix_localVer}: ${localVer}`)

    } else { // run MAIN routine
        const funcOptions = {
            length: app.config.length || 8, qty: app.config.qty || 1,
            charset: app.config.charset, exclude: app.config.excludeChars,
            numbers: !!app.config.includeNums, symbols: !!app.config.includeSymbols,
            lowercase: !app.config.excludeLowerChars, uppercase: !app.config.excludeUpperChars,
            excludeSimilarChars: !!app.config.excludeSimilarChars,
            strict: !!app.config.strictMode, verbose: !app.config.quietMode
        }
        const pwResult = generatePassword(funcOptions)
        print.ifNotQuiet(`\n${app.msgs.info_copying}...`)
        clipboardy.writeSync([].concat(pwResult).join('\n'))
    }

})()
