const fs = require('fs'),
      log = require(`./log${ env.devMode ? '' : '.min' }.js`),
      path = require('path')

;(globalThis.app ??= {}).config = {}

module.exports = {

    controls: {
        qty: { type: 'param', regex: /^--?qu?a?n?ti?t?y(?:=.*|$)/, parser: val => parseInt(val, 10) },
        config: { type: 'param', regex: /^--?config(?:=.*|$)/ },
        ipv6mode: { type: 'flag', regex: /^--?(?:ip)?v?6(?:-?mode)?$/ },
        macMode: { type: 'flag', regex: /^--?m(?:ac)?(?:-?mode)?$/ },
        quietMode: { type: 'flag', regex: /^--?q(?:uiet)?(?:-?mode)?$/ },
        init: { type: 'cmd', regex: /^-{0,2}i(?:nit)?$/ },
        help: { type: 'cmd', regex: /^--?h(?:elp)?$/ },
        version: { type: 'cmd', regex: /^--?ve?r?s?i?o?n?$/ }
    },

    initConfigFile() {
        const filename = 'generate-ip.config.mjs',
              targetPath = path.resolve(process.cwd(), filename)
        if (fs.existsSync(targetPath))
            return log.warn('Config file already exists:', targetPath)
        const srcPath = path.resolve(__dirname, `../../${ env.devMode ? '../' : './data/' }${filename}`)
        if (!fs.existsSync(srcPath)) {
            log.error('Template file not found at:', srcPath)
            process.exit(1)
        }
        fs.copyFileSync(srcPath, targetPath)
        log.success(`Config file created: ${targetPath}\n`)
        log.tip('Edit this file to customize defaults.')
        log.tip('CLI arguments always override these values.')
    },

    load(ctrlKeys = Object.keys(this.controls)) {

        // Load from config file
        let configPath = null
        const configArg = process.argv.slice(2).find(arg => this.controls.config.regex.test(arg))
        if (configArg) {
            if (!/=/.test(configArg))
                log.errorAndExit(`[${configArg}] must include =path`)
            const inputPath = configArg.split('=')[1]
            configPath = path.isAbsolute(inputPath) ? inputPath : path.resolve(process.cwd(), inputPath)
            if (!fs.existsSync(configPath))
                log.configAndExit('Config file not found:', configPath)
        } else // auto-discover .config.[cm]?js file
            for (const ext of ['mjs', 'cjs', 'js']) {
                const autoPath = path.resolve(process.cwd(), `generate-ip.config.${ext}`)
                if (fs.existsSync(autoPath)) { configPath = autoPath ; break }
            }
        if (configPath)
            try { // to load config file
                const mod = require(configPath), fileConfig = mod?.default ?? mod
                if (!fileConfig || typeof fileConfig != 'object')
                    log.configAndExit('Config file must export an object.')
                Object.assign(app.config, fileConfig)
            } catch (err) {
                log.configAndExit('Failed to load config file:', configPath, `\n${err.message}`) }

        // Load from CLI args
        process.argv.slice(2).forEach(arg => {
            if (!arg.startsWith('-')) return
            const ctrlKey = ctrlKeys.find(key => this.controls[key]?.regex?.test(arg))
            if (!ctrlKey) log.errorAndExit(`[${arg}] not recognized.`)
            if (ctrlKey == 'config' || ctrlKey.type == 'cmd') return
            app.config[ctrlKey] = this.controls[ctrlKey].type == 'param' ? arg.split('=')[1] : true
        })

        // Parse/validate options
        Object.keys(app.config).forEach(key => {
            const ctrl = this.controls[key] ; if (!ctrl) return
            if (ctrl.parser) {
                const parsed = ctrl.parser(app.config[key])
                if (isNaN(parsed) || parsed < 1)
                    log.errorAndExit(`[${key}] argument can only be > 0.`)
                app.config[key] = parsed
            }
        })

        return app.config
    }
}
