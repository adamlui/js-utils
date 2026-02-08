#!/usr/bin/env node

(async () => {
    'use strict'

    globalThis.env = {
        args: process.argv.slice(2),
        devMode: /[\\/]src(?:[\\/]|$)/i.test(__dirname)
    }
    env.debugMode = env.args.some(arg => /^--?debug(?:-?mode)?$/.test(arg))
    env.modExt = `${ env.devMode ? '' : '.min' }.js`

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
        { generatePassword } = require(`../generate-pw${env.modExt}`),
          initCLI = require(`./lib/init${env.modExt}`),
          log = require(`./lib/log${env.modExt}`),
          settings = require(`./lib/settings${env.modExt}`)

    await initCLI()

    // Exec CMD arg if passed
    if (cli.config.init) return settings.initConfigFile()
    else if (cli.config.help) return log.help()
    else if (cli.config.version) return log.version()

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
