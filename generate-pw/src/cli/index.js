#!/usr/bin/env node

(async () => {
    'use strict'

    globalThis.env = {
        args: process.argv.slice(2),
        modes: { dev: /[\\/]src(?:[\\/]|$)/i.test(__dirname) },
        paths: { lib: './lib' }
    }
    env.modes.debug = env.args.some(arg => /^--?debug(?:[-_]?mode)?$/.test(arg))

    // Import LIBS
    globalThis.log = require(`${env.paths.lib}/log`)
    const clipboardy = require('node-clipboardy'),
        { generatePassword } = require(`../generate-pw${ env.modes.dev ? '' : '.min' }.js`),
          init = require(`${env.paths.lib}/init`)

    await init.cli()

    // Exec CMD arg if passed
    if (cli.config.init) return init.configFile()
    else if (cli.config.help) return log.help()
    else if (cli.config.version) return log.version()
    else if (cli.config.stats) return log.stats()

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
    log.break()
    clipboardy.writeSync([].concat(generatePassword(genOptions)).join('\n'))
    log.ifNotQuiet(`${cli.msgs.info_copyingToClip}...`)

})()
