const fs = require('fs'),
      log = require(`./log${ env.devMode ? '' : '.min' }.js`),
      path = require('path')

;(globalThis.cli ??= {}).config = {}

module.exports = {
    configFilename: 'generate-pw.config.mjs',

    controls: {
        length: { type: 'param', defaultVal: 12, regex: /^--?length(?:=.*|$)/, parser: val => parseInt(val, 10) },
        qty: { type: 'param', defaultVal: 1, regex: /^--?qu?a?n?ti?t?y(?:=.*|$)/, parser: val => parseInt(val, 10) },
        charset: { type: 'param', regex: /^--?charse?t?(?:=.*|$)/ },
        excludeChars: { type: 'param', regex:/^--?exclude(?:=.*|$)/ },
        config: { type: 'param', regex: /^--?config(?:=.*|$)/ },
        weak: { type: 'flag', mode: true, regex: /^--?(?:w|weak)$/ },
        basic: { type: 'flag',  mode: true, regex: /^--?(?:b|basic)$/ },
        strong: { type: 'flag', mode: true, regex: /^--?(?:t|strong)$/ },
        excludeNums: { type: 'flag', regex: /^--?(?:N|(?:exclude|disable|no)-?num(?:ber)?s?=?(?:true|1)?)$/ },
        excludeSymbols: { type: 'flag', regex: /^--?(?:Y|(?:exclude|disable|no)-?symbols?=?(?:true|1)?)$/ },
        excludeLowerChars: {
            type: 'flag', regex: /^--?(?:L|(?:exclude|disable|no)-?lower-?(?:case)?|lower-?(?:case)?=(?:false|0))$/},
        excludeUpperChars: {
            type: 'flag', regex: /^--?(?:U|(?:exclude|disable|no)-?upper-?(?:case)?|upper-?(?:case)?=(?:false|0))$/},
        similarChars: { type: 'flag', regex: /^--?(?:s|(?:include-?)?similar-?chars?=?(?:true|1)?)$/ },
        unstrict: { type: 'flag', regex: /^--?(?:S|(?:un-?strict)?(?:-?mode)?)$/ },
        entropy: { type: 'flag', regex: /^--?e(?:ntropy)?$/ },
        quietMode: { type: 'flag', regex: /^--?q(?:uiet)?(?:-?mode)?$/ },
        init: { type: 'cmd', regex: /^-{0,2}i(?:nit)?$/ },
        help: { type: 'cmd', regex: /^--?h(?:elp)?$/ },
        version: { type: 'cmd', regex: /^--?ve?r?s?i?o?n?$/ }
    },

    async initConfigFile(filename = this.configFilename) {
        log.prefix = 'initConfigFile()'

        const targetPath = path.resolve(process.cwd(), filename)
        if (fs.existsSync(targetPath))
            return log.warn(`${cli.msgs.warn_configFileExists}:`, targetPath)
        const srcPath = path.resolve(__dirname, `../../${ env.devMode ? '../' : './data/' }${filename}`)

        if (fs.existsSync(srcPath)) // use found template
            fs.copyFileSync(srcPath, targetPath)

        else { // use jsDelivr copy
            const data = require(`./data${ env.devMode ? '' : '.min' }.js`),
                  pkg = require(`./pkg${ env.devMode ? '' : '.min' }.js`),
                  pkgVer = pkg.getVer('global') || 'latest',
                  jsdURL = `${cli.urls.jsdelivr}@${cli.name}-${pkgVer}/${cli.name}/${filename}`

            log.data(`${cli.msgs.info_fetchingRemoteConfigFrom} ${jsdURL}...`)
            try {
                const resp = await data.fetch(jsdURL)
                if (resp.ok) data.atomicWrite(targetPath, await resp.text())
                else return log.warn(`${cli.msgs.warn_remoteConfigNotFound}: ${jsdURL} (${resp.status})`)
            } catch (err) {
                return log.warn(`${cli.msgs.warn_remoteConfigFailed}: ${jsdURL} ${err.message}`) }
        }

        log.success(`${cli.msgs.info_configFileCreated}: ${targetPath}\n`)
        log.tip(`${cli.msgs.tip_editToSetDefaults}.`)
        log.tip(`${cli.msgs.tip_cliArgsPrioritized}.`)
    },

    load({ args = process.argv.slice(2), ctrlKeys = Object.keys(this.controls) } = {}) {
        log.prefix = 'settings.load()'

        // Init defaults
        ctrlKeys.forEach(key => {
            const ctrl = this.controls[key] ; if (ctrl.mode || ctrl.type == 'cmd') return
            cli.config[key] ??= ctrl.defaultVal ?? ( ctrl.type == 'flag' ? false : '' )
        })

        // Load from config file
        let configPath
        const configArg = args.find(arg => this.controls.config.regex.test(arg))
        if (configArg) { // resolve input path, then validate
            if (!/=/.test(configArg))
                log.errorAndExit(`[${configArg}] ${cli.msgs.error_mustIncludePath}`)
            const inputPath = configArg.split('=')[1]
            configPath = path.isAbsolute(inputPath) ? inputPath : path.resolve(process.cwd(), inputPath)
            if (!fs.existsSync(configPath))
                log.configURLandExit(`${cli.msgs.error_configFileNotFound}:`, configPath)
        } else // auto-discover .config.[cm]?js file
            for (const ext of ['mjs', 'cjs', 'js']) {
                const autoPath = path.resolve(process.cwd(), this.configFilename.replace(/\.[^.]+$/, `.${ext}`))
                if (fs.existsSync(autoPath)) { configPath = autoPath ; break }
            }
        if (configPath)
            try { // to load config file
                const mod = require(configPath), fileConfig = mod?.default ?? mod
                if (!fileConfig || typeof fileConfig != 'object')
                    log.configURLandExit(`${cli.msgs.error_invalidConfigFile}.`)
                Object.assign(cli.config, fileConfig)
            } catch (err) {
                log.configURLandExit(`${cli.msgs.error_failedToLoadConfigFile}:`, configPath, `\n${err.message}`) }

        // Load from CLI args (overriding config file)
        args.forEach(arg => {
            if (/^[^-]|--?(?:config|debug)/.test(arg)) return

            const ctrlKey = ctrlKeys.find(key => this.controls[key]?.regex?.test(arg))
            if (!ctrlKey) log.errorAndExit(`[${arg}] ${cli.msgs.error_notRecognized}.`)
            const ctrl = this.controls[ctrlKey] ; if (ctrl.type == 'cmd') return
            let ctrlKeyVal = ctrl.type == 'param' ? arg.split('=')[1]?.trim() : true

            if (ctrl.mode) // set cli.config.mode to mode name
                cli.config.mode = ctrlKey.replace(/mode$/i, '').toLowerCase()

            else { // init flag/param cli.config[ctrlKey] val
                const parser = ctrl.parser
                if (parser) {
                    ctrlKeyVal = parser(ctrlKeyVal)
                    if (isNaN(ctrlKeyVal) || ctrlKeyVal < 1)
                        log.errorAndExit(`[${ctrlKey}] ${cli.msgs.error_nonPositiveNum}.`)
                }
                cli.config[ctrlKey] = ctrlKeyVal
            }
        })

        return cli.config
    }
}
