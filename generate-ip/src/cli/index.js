#!/usr/bin/env node

(async () => {
    'use strict'

    globalThis.env = { devMode: __dirname.match(/[\\/]src/) }

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
        { execSync } = require('child_process'),
          fs = require('fs'),
        { getMsgs, getSysLang } = require(`./lib/language${ env.devMode ? '' : '.min' }.js`),
        { ipv4, ipv6, mac } = require(`../generate-ip${ env.devMode ? '' : '.min' }.js`),
          path = require('path')

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
                printHelpCmdAndDocURL() ; process.exit(1)
            }
            const val = arg.split('=')[1]
            app.config[matchedParamOption] = parseInt(val) || val
        } else if (!matchedInfoCmd && !/ipv4/.test(arg)) {
            console.error(`\n${app.colors.br}${app.msgs.prefix_error}: Arg [${
                arg}] ${app.msgs.error_notRecognized}.${app.colors.nc}`)
            console.info(`\n${app.colors.by}${app.msgs.info_validArgs}.${app.colors.nc}`)
            printHelpSections(['paramOptions', 'flags', 'infoCmds'])
            process.exit(1)
        }
    })
    if (app.config.qty && (isNaN(app.config.qty) || app.config.qty < 1)) {
        console.error(
            `\n${app.colors.br}${app.msgs.prefix_error}: [qty] ${app.msgs.error_nonPositiveNum}.${app.colors.nc}`)
        printHelpCmdAndDocURL() ; process.exit(1)
    }

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
                )?.match(app.regex.version)?.[1] || 'none'
                break
            }
            currentDir = path.dirname(currentDir)
        }
        console.info(`\n${app.msgs.prefix_globalVer}: ${globalVer}\n${app.msgs.prefix_localVer}: ${localVer}`)

    } else { // log/copy RESULT(S)
        const genOptions = { qty: app.config.qty || 1, verbose: !app.config.quietMode },
              ipResult = app.config.ipv6mode ? ipv6.generate(genOptions)
                       : app.config.macMode  ?  mac.generate(genOptions)
                                             : ipv4.generate(genOptions)
        printIfNotQuiet(`\n${app.msgs.info_copying}...`)
        clipboardy.writeSync([].concat(ipResult).join('\n'))
    }

    // Define FUNCTIONS

    function printHelpCmdAndDocURL() {
        console.info(`\n${
            app.msgs.info_moreHelp}, ${app.msgs.info_type} ${app.name} --help' ${
            app.msgs.info_or} ${app.msgs.info_visit}\n${app.colors.bw}${app.urls.docs}${app.colors.nc}`
        )
    }

    function printHelpSections(includeSections = ['header', 'usage', 'paramOptions', 'flags', 'infoCmds']) {
        app.prefix = `${app.colors.tlBG}${app.colors.blk}\x1b[30m ${app.name} ${app.colors.nc} `
        const helpSections = {
            header: [
                `\n├ ${app.prefix}${ app.msgs.appCopyright || `© ${
                       app.copyrightYear} ${app.author} under the ${app.license} license`
                }.`,
                `${app.prefix}${app.msgs.prefix_source}: ${app.urls.src}`
            ],
            usage: [
                `\n${app.colors.bw}o ${app.msgs.helpSection_usage}:${app.colors.nc}`,
                ` ${app.colors.bw}» ${app.colors.bg}${app.cmdFormat}${app.colors.nc}`
            ],
            paramOptions: [
                `\n${app.colors.bw}o ${app.msgs.helpSection_paramOptions}:${app.colors.nc}`,
                ` --qty=n                     ${app.msgs.optionDesc_qty}.`
            ],
            flags: [
                `\n${app.colors.bw}o ${app.msgs.helpSection_flags}:${app.colors.nc}`,
                ` -6, --ipv6                  ${app.msgs.optionDesc_ipv6}.`,
                ` -m, --mac                   ${app.msgs.optionDesc_mac}.`,
                ` -q, --quiet                 ${app.msgs.optionDesc_quiet}.`
            ],
            infoCmds: [
                `\n${app.colors.bw}o ${app.msgs.helpSection_infoCmds}:${app.colors.nc}`,
                ` -h, --help                  ${app.msgs.optionDesc_help}`,
                ` -v, --version               ${app.msgs.optionDesc_version}.`
            ]
        }
        includeSections.forEach(section => // print valid arg elems
            helpSections[section]?.forEach(line => printHelpMsg(line, /header|usage/.test(section) ? 1 : 29)))
        console.info(
            `\n${app.msgs.info_moreHelp}, ${app.msgs.info_visit}: ${app.colors.bw}${app.urls.docs}${app.colors.nc}`)

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
