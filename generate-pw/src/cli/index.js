#!/usr/bin/env node

(async () => {
    'use strict'

    globalThis.env = {
        args: process.argv.slice(2),
        devMode: /[\\/]src(?:[\\/]|$)/i.test(__dirname)
    }
    env.debugMode = env.args.some(arg => /^--?debug(?:-?mode)?$/.test(arg))

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
        { generatePassword } = require(`../generate-pw${ env.devMode ? '' : '.min' }.js`),
          initCLI = require(`./lib/init${ env.devMode ? '' : '.min' }.js`),
          log = require(`./lib/log${ env.devMode ? '' : '.min' }.js`),
          settings = require(`./lib/settings${ env.devMode ? '' : '.min' }.js`)

    await initCLI()

    // Exec CMD arg if passed
    for (const arg of env.args) {
        if (settings.controls.init.regex.test(arg)) return settings.initConfigFile()
        else if (settings.controls.help.regex.test(arg)) return log.help()
        else if (settings.controls.version.regex.test(arg)) return log.version()
    }

    // Copy random PASSWORD(s)
    const genOptions = {
        length: cli.config.length,
        qty: cli.config.qty,
        strength: cli.config.mode,
        charset: cli.config.charset,
        exclude: cli.config.excludeChars,
        numbers: !cli.config.excludeNums,
        symbols: !cli.config.excludeSymbols,
        lowercase: !cli.config.excludeLowerChars,
        uppercase: !cli.config.excludeUpperChars,
        similarChars: cli.config.similarChars,
        strict: !cli.config.unstrict,
        entropy: cli.config.entropy,
        verbose: !cli.config.quietMode
    }
    clipboardy.writeSync([].concat(generatePassword(genOptions)).join('\n'))
    log.ifNotQuiet(`\n${cli.msgs.info_copyingToClip}...`)

})()
