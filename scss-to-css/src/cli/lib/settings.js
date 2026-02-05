const fs = require('fs'),
      log = require(`./log${ env.devMode ? '' : '.min' }.js`),
      path = require('path')

;(globalThis.app ??= {}).config = {}

module.exports = {
    configFilename: 'scss-to-css.config.mjs',

    controls: {
        dryRun: {
            type: 'flag', regex: /^--?(?:n|dry-?run)$/ },
        includeDotFolders: {
            type: 'flag', regex: /^--?(?:dd?|(?:include-?)?dot-?(?:folder|dir(?:ector(?:y|ie))?)s?=?(?:true|1)?)$/ },
        noSourceMaps: {
            type: 'flag', regex: /^--?(?:S|(?:exclude|disable|no)-?so?u?rce?-?maps?|so?u?rce?-?maps?=(?:false|0))$/ },
        noRecursion: {
            type: 'flag', regex: /^--?(?:R|(?:disable|no)-?recursi(?:on|ve)|recursi(?:on|ve)=(?:false|0))$/ },
        noMinify: {
            type: 'flag', regex: /^--?(?:M|(?:disable|no)-?minif(?:y|ication)|minif(?:y|ication)=(?:false|0))$/ },
        relativeOutput: {
            type: 'flag', regex: /^--?(?:r|relative-?output?=?(?:true|1)?)$/ },
        copy: {
            type: 'flag', regex: /^--?c(?:opy)?$/ },
        quietMode: {
            type: 'flag', regex: /^--?q(?:uiet)?(?:-?mode)?$/ },
        ignores: {
            type: 'param', regex: /^--?(?:ignores?|(?:ignore|skip|exclude)(?:d?-?files?)?)(?:=.*|$)/ },
        comment: {
            type: 'param', regex: /^--?comments?(?:=.*|$)/ },
        config: {
            type: 'param', regex: /^--?config(?:=.*|$)/ },
        init: {
            type: 'cmd', regex: /^-{0,2}i(?:nit)?$/ },
        help: {
            type: 'cmd', regex: /^--?h(?:elp)?$/ },
        version: {
            type: 'cmd', regex: /^--?ve?r?s?i?o?n?$/ }
    },

    async initConfigFile(filename = this.configFilename) {

        const targetPath = path.resolve(process.cwd(), filename)
        if (fs.existsSync(targetPath))
            return log.warn(`${app.msgs.warn_configFileExists}:`, targetPath)
        const srcPath = path.resolve(__dirname, `../../${ env.devMode ? '../' : './data/' }${filename}`)

        if (fs.existsSync(srcPath)) // use found template
            fs.copyFileSync(srcPath, targetPath)

        else { // use jsDelivr copy
            const data = require(`./data${ env.devMode ? '' : '.min' }.js`),
                  jsdURL = `${app.urls.jsdelivr}/${filename}`
            log.data(`${app.msgs.info_fetchingRemoteConfigFrom} ${jsdURL}...`)
            try {
                const resp = await data.fetch(jsdURL)
                if (resp.ok) data.atomicWrite(targetPath, await resp.text())
                else return log.warn(`${app.msgs.warn_remoteConfigNotFound}: ${jsdURL} (${resp.status})`)
            } catch (err) {
                return log.warn(`${app.msgs.warn_remoteConfigFailed}: ${jsdURL} ${err.message}`) }
        }

        log.success(`${app.msgs.info_configFileCreated}: ${targetPath}\n`)
        log.tip(`${app.msgs.tip_editToSetDefaults}.`)
        log.tip(`${app.msgs.tip_cliArgsPrioritized}.`)
    },

    load({ args = process.argv.slice(2), ctrlKeys = Object.keys(this.controls) } = {}) {

        // Init defaults
        ctrlKeys.forEach(key => {
            const ctrl = this.controls[key] ; if (ctrl.mode || ctrl.type == 'cmd') return
            app.config[key] ??= ctrl.defaultVal ?? ( ctrl.type == 'flag' ? false : '' )
        })

        // Load from config file
        let configPath
        const configArg = args.find(arg => this.controls.config.regex.test(arg))
        if (configArg) { // resolve input path, then validate
            if (!/=/.test(configArg))
                log.errorAndExit(`[${configArg}] ${app.msgs.error_mustIncludePath}`)
            const inputPath = configArg.split('=')[1]
            configPath = path.isAbsolute(inputPath) ? inputPath : path.resolve(process.cwd(), inputPath)
            if (!fs.existsSync(configPath))
                log.configURLandExit(`${app.msgs.error_configFileNotFound}:`, configPath)
        } else // auto-discover .config.[cm]?js file
            for (const ext of ['mjs', 'cjs', 'js']) {
                const autoPath = path.resolve(process.cwd(), this.configFilename.replace(/\.[^.]+$/, `.${ext}`))
                if (fs.existsSync(autoPath)) { configPath = autoPath ; break }
            }
        if (configPath)
            try { // to load config file
                const mod = require(configPath), fileConfig = mod?.default ?? mod
                if (!fileConfig || typeof fileConfig != 'object')
                    log.configURLandExit(`${app.msgs.error_invalidConfigFile}.`)
                Object.assign(app.config, fileConfig)
            } catch (err) {
                log.configURLandExit(`${app.msgs.error_failedToLoadConfigFile}:`, configPath, `\n${err.message}`) }

        // Load from CLI args (overriding config file)
        args.forEach(arg => {
            if (/^[^-]|--?(?:config|debug)/.test(arg)) return

            const ctrlKey = ctrlKeys.find(key => this.controls[key]?.regex?.test(arg))
            if (!ctrlKey) log.errorAndExit(`[${arg}] ${app.msgs.error_notRecognized}.`)
            const ctrl = this.controls[ctrlKey] ; if (ctrl.type == 'cmd') return
            let ctrlKeyVal = ctrl.type == 'param' ? arg.split('=')[1]?.trim() : true

            if (ctrl.mode) // set app.config.mode to mode name
                app.config.mode = ctrlKey.replace(/mode$/i, '').toLowerCase()

            else { // init flag/param app.config[ctrlKey] val
                const parser = ctrl.parser
                if (parser) {
                    ctrlKeyVal = parser(ctrlKeyVal)
                    if (isNaN(ctrlKeyVal) || ctrlKeyVal < 1)
                        log.errorAndExit(`[${ctrlKey}] ${app.msgs.error_nonPositiveNum}.`)
                }
                app.config[ctrlKey] = ctrlKeyVal
            }
        })

        return app.config
    }
}
