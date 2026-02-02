const fs = require('fs'),
      log = require(`./log${ env.devMode ? '' : '.min' }.js`),
      path = require('path')

;(globalThis.app ??= {}).config = {}

module.exports = {

    controls: {
        dryRun: {
            type: 'flag', regex: /^--?(?:n|dry-?run)$/ },
        includeDotFolders: {
            type: 'flag', regex: /^--?(?:dd?|(?:include-?)?dot-?(?:folder|dir(?:ector(?:y|ie))?)s?=?(?:true|1)?)$/ },
        includeDotFiles: {
            type: 'flag', regex: /^--?(?:df|D|(?:include-?)?dot-?files?=?(?:true|1)?)$/ },
        noRecursion: {
            type: 'flag', regex: /^--?(?:R|(?:disable|no)-?recursi(?:on|ve)|recursi(?:on|ve)=(?:false|0))$/ },
        noMangle: {
            type: 'flag', regex: /^--?(?:M|(?:disable|no)-?mangle|mangle=(?:false|0))$/ },
        noFilenameChange: {
            type: 'flag', regex: /^--?(?:X|(?:disable|no)-?(?:file)?name-?change|(?:file)?name-?change=(?:false|0))$/ },
        rewriteImports: {
            type: 'param', regex: /^--?(?:i|rewrite-?imports?=?(?:true|1)?)$/ },
        relativeOutput: {
            type: 'param', regex: /^--?(?:r|relative-?output?=?(?:true|1)?)$/ },
        copy: {
            type: 'param', regex: /^--?c(?:opy)?$/ },
        quietMode: {
            type: 'param', regex: /^--?q(?:uiet)?(?:-?mode)?$/ },
        ignores: {
            type: 'param', regex: /^--?(?:ignores?|(?:ignore|skip|exclude)(?:d?-?files?)?)(?:=.*|$)/ },
        comment: {
            type: 'param', regex: /^--?comments?(?:=.*|$)/ },
        config: {
            type: 'param', regex: /^--?config(?:=.*|$)/ },
        init: {
            type: 'cmd', regex: /^-{0,2}init$/ },
        help: {
            type: 'cmd', regex: /^--?h(?:elp)?$/ },
        version: {
            type: 'cmd', regex: /^--?ve?r?s?i?o?n?$/ }
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
        if (configArg) { // resolve input path, then validate
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
            if (this.controls[ctrlKey].type == 'cmd') return
            let ctrlKeyVal = this.controls[ctrlKey].type == 'param' ? arg.split('=')[1] : true

            // Parse/validate vals
            const parser = this.controls[ctrlKey].parser
            if (parser) { // parse val first
                ctrlKeyVal = parser(ctrlKeyVal)
                if (isNaN(ctrlKeyVal) || ctrlKeyVal < 1)
                    log.errorAndExit(`[${ctrlKey}] ${app.msgs.error_nonPositiveNum}.`)
            }

            app.config[ctrlKey] = ctrlKeyVal
        })

        return app.config
    }
}
