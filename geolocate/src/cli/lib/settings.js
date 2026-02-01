const fs = require('fs'),
      log = require(`./log${ env.devMode ? '' : '.min' }.js`),
      path = require('path')

;(globalThis.app ??= {}).config = {}

module.exports = {

    controls: {
        config: { type: 'param', regex: /^--?config(?:=.*|$)/ },
        quietMode: { type: 'flag', regex: /^--?q(?:uiet)?(?:-?mode)?$/ },
        init: { type: 'cmd', regex: /^-{0,2}i(?:nit)?$/ },
        help: { type: 'cmd', regex: /^--?h(?:elp)?$/ },
        version: { type: 'cmd', regex: /^--?ve?r?s?i?o?n?$/ }
    },

    initConfigFile() {
        const configFilename = 'generate-ip.config.mjs',
              targetPath = path.resolve(process.cwd(), configFilename)
        if (fs.existsSync(targetPath))
            return log.warn(`${app.msgs.warn_configFileExists}:`, targetPath)
        const srcPath = path.resolve(__dirname, `../../${ env.devMode ? '../' : './data/' }${configFilename}`)
        if (!fs.existsSync(srcPath)) {
            log.error(`${app.msgs.error_templateNotFound}:`, srcPath)
            process.exit(1)
        }
        fs.copyFileSync(srcPath, targetPath)
        log.success(`${app.msgs.info_configFileCreated}: ${targetPath}\n`)
        log.tip(`${app.msgs.tip_editToSetDefaults}.`)
        log.tip(`${app.msgs.tip_cliArgsPrioritized}.`)
    },

    load(ctrlKeys = Object.keys(this.controls)) {

        // Load from config file
        let configPath = null
        const configArg = process.argv.slice(2).find(arg => this.controls.config.regex.test(arg))
        if (configArg) { // resolve path then validate
            if (!/=/.test(configArg))
                log.errorAndExit(`[${configArg}] ${app.msgs.error_mustIncludePath}`)
            const inputPath = configArg.split('=')[1]
            configPath = path.isAbsolute(inputPath) ? inputPath : path.resolve(process.cwd(), inputPath)
            if (!fs.existsSync(configPath))
                log.configAndExit(`${app.msgs.error_configFileNotFound}:`, configPath)
        } else // auto-discover .config.[cm]?js file
            for (const ext of ['cjs', 'mjs', 'js']) {
                const autoPath = path.resolve(process.cwd(), `generate-ip.config.${ext}`)
                if (fs.existsSync(autoPath)) { configPath = autoPath ; break }
            }
        if (configPath)
            try { // to load config file
                const mod = require(configPath), fileConfig = mod?.default ?? mod
                if (!fileConfig || typeof fileConfig != 'object')
                    log.configAndExit(`${app.msgs.error_invalidConfigFile}.`)
                Object.assign(app.config, fileConfig)
            } catch (err) {
                log.configAndExit(`${app.msgs.error_failedToLoadConfigFile}:`, configPath, `\n${err.message}`) }

        // Load from CLI args
        process.argv.slice(2).forEach(arg => {
            if (!arg.startsWith('-') || /^--?(?:config|debug)/.test(arg)) return
            const ctrlKey = ctrlKeys.find(key => this.controls[key]?.regex?.test(arg))
            if (!ctrlKey) log.errorAndExit(`[${arg}] ${app.msgs.error_notRecognized}.`)
            else if (ctrlKey.type == 'cmd') return
            app.config[ctrlKey] = this.controls[ctrlKey].type == 'param' ? arg.split('=')[1] : true
        })

        // Parse/validate options
        Object.keys(app.config).forEach(key => {
            const ctrl = this.controls[key] ; if (!ctrl) return
            if (ctrl.parser) {
                const parsed = ctrl.parser(app.config[key])
                if (isNaN(parsed) || parsed < 1)
                    log.errorAndExit(`[${key}] ${app.msgs.error_nonPositiveNum}.`)
                app.config[key] = parsed
            }
        })

        return app.config
    }
}
