const fs = require('fs'),
      path = require('path')

;(globalThis.cli ??= {}).config = {}

module.exports = {
    configFilename: 'scss-to-css.config.mjs',

    controls: {
        dryRun: {
            type: 'flag', regex: /^--?(?:n|dry[-_]?run)$/ },
        includeDotFolders: {
            type: 'flag', regex: /^--?(?:dd?|(?:include[-_]?)?dot[-_]?(?:folder|dir(?:ector(?:y|ie))?)s?=?(?:true|1)?)$/ },
        noSourceMaps: {
            type: 'flag', regex: /^--?(?:S|(?:exclude|disable|no)[-_]?so?u?rce?[-_]?maps?|so?u?rce?[-_]?maps?=(?:false|0))$/ },
        noRecursion: {
            type: 'flag', regex: /^--?(?:R|(?:disable|no)[-_]?recursi(?:on|ve)|recursi(?:on|ve)=(?:false|0))$/ },
        noMinify: {
            type: 'flag', regex: /^--?(?:M|(?:disable|no)[-_]?minif(?:y|ication)|minif(?:y|ication)=(?:false|0))$/ },
        relativeOutput: {
            type: 'flag', regex: /^--?(?:r|relative[-_]?output?=?(?:true|1)?)$/ },
        copy: {
            type: 'flag', regex: /^--?c(?:opy)?$/ },
        quietMode: {
            type: 'flag', regex: /^--?q(?:uiet)?(?:[-_]?mode)?$/ },
        ignores: {
            type: 'param', parser: val => val.split(',').map(val => val.trim()),
            regex: /^--?(?:ignores?|(?:ignore|skip|exclude)(?:d?[-_]?files?)?)(?:[=\s].*|$)/
        },
        comment: {
            type: 'param', parser: val => val.replace(/\\n/g, '\n'), regex: /^--?comments?(?:[=\s].*)?$/ },
        uiLang: {
            type: 'param', valType: 'langCode', regex: /^--?ui[-_]?lang(?:[=\s].*|$)/ },
        config: {
            type: 'param', valType: 'filepath', regex: /^--?config(?:[=\s].*|$)/ },
        init: {
            type: 'cmd', regex: /^-{0,2}i(?:nit)?$/ },
        help: {
            type: 'cmd', regex: /^--?h(?:elp)?$/ },
        version: {
            type: 'cmd', regex: /^--?ve?r?s?i?o?n?$/ }
    },

    load(ctrlKeys = Object.keys(this.controls)) {
        const inputCtrlKeys = [].concat(ctrlKeys) // force array

        if (!cli.defaultsSet && !arguments.length) { // init all defaults on arg-less load()
            inputCtrlKeys.forEach(key => {
                const ctrl = this.controls[key] ; if (ctrl.mode) return
                cli.config[key] ??= ctrl.defaultVal ?? ( ctrl.type == 'param' ? '' : false )
            })
            cli.defaultsSet = true
        }

        if (!cli.configPathTried) { // init config file path
            const configArg = env.args.find(arg => this.controls.config.regex.test(arg))

            if (configArg) { // resolve input path, then validate
                if (!/=/.test(configArg))
                    log.errorAndExit(`[${configArg}] ${cli.msgs.error_mustIncludePath}`)
                const inputPath = configArg.split('=')[1]
                cli.configPath = path.isAbsolute(inputPath) ? inputPath : path.resolve(process.cwd(), inputPath)
                if (!fs.existsSync(cli.configPath))
                    log.configURLandExit(`${cli.msgs.error_configFileNotFound}:`, cli.configPath)

            } else // auto-discover .config.[mc]?js file
                for (const configExt of ['.mjs', '.cjs', '.js']) {
                    const autoPath = path.resolve(process.cwd(), this.configFilename.replace(/\.[^.]+$/, configExt))
                    if (fs.existsSync(autoPath)) { cli.configPath = autoPath ; break }
                }

            cli.configPathTried = true
        }

        if (cli.configPath) // load from config file
            try {
                const mod = require(cli.configPath), fileConfig = mod?.default ?? mod
                if (!fileConfig || typeof fileConfig != 'object')
                    log.configURLandExit(`${cli.msgs.error_invalidConfigFile}.`)
                Object.assign(cli.config, arguments.length ?
                    inputCtrlKeys.reduce((acc, key) => fileConfig[key] ? { ...acc, [key]: fileConfig[key] } : acc, {})
                        : fileConfig // whole file on arg-less load()
                )
            } catch (err) {
                log.configURLandExit(`${cli.msgs.error_failedToLoadConfigFile}:`, cli.configPath, `\n${err.message}`) }

        for (let i = 0 ; i < env.args.length ; i++) { // load from CLI arg (overriding config file loads)
            const arg = env.args[i]
            if (/^[^-]|--?(?:config|debug)/.test(arg) && arg != 'init') return
            const ctrlKey = Object.keys(this.controls).find(key => this.controls[key]?.regex?.test(arg))
            if (!ctrlKey && cli.msgs) log.errorAndExit(`[${arg}] ${cli.msgs.error_notRecognized}.`)
            if (!inputCtrlKeys.includes(ctrlKey)) return // don't process env.args when load() specific keys
            const ctrl = this.controls[ctrlKey]
            if (ctrl.mode) // set cli.config.mode to mode name
                cli.config.mode = ctrlKey.replace(/mode$/i, '').toLowerCase()
            else { // init flag/param/cmd cli.config[ctrlKey] val
                if (ctrl.type == 'param')
                    cli.config[ctrlKey] =
                        arg.includes('=') ? arg.split('=')[1]?.trim() ?? '' // =val
                      : (i +1 < env.args.length && !env.args[i +1].startsWith('-')) ? env.args[++i] // dashless val
                      : '' // val-less --key passed
                else // flag/cmd
                    cli.config[ctrlKey] = true
            }
        }

        this.parseValidateConfig(inputCtrlKeys)

        return inputCtrlKeys.length == 1 ? cli.config[inputCtrlKeys[0]] : cli.config
    },

    parseValidateConfig(ctrlKeys = Object.keys(this.controls)) {
        const language = require('./language')
        for (const key of [].concat(ctrlKeys)) {
            const ctrl = this.controls[key], configVal = cli.config[key]

            if (ctrl.parser && !ctrl.parsed) {
                cli.config[key] = ctrl.parser(configVal) ; ctrl.parsed = true }

            if (ctrl.valType) ({
                positiveInt() {
                    const numVal = parseInt(configVal, 10)
                    if (isNaN(numVal) || numVal < 1)
                        log.errorAndExit(`[${key}] ${cli.msgs.error_nonPositiveNum}: ${configVal}`)
                    cli.config[key] = numVal
                },
                filepath() {
                    if (configVal && !fs.existsSync(configVal))
                        log.errorAndExit(`[${key}] ${cli.msgs.error_invalidFilepath}: ${configVal}`)
                },
                langCode() {
                    if (configVal && !language.validateLangCode(configVal))
                        log.errorAndExit(`[${key}] ${cli.msgs.error_invalidLangCode}: ${configVal}`)
                }
            })[ctrl.valType]()
        }
    }
}
