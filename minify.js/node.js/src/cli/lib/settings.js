const fs = require('fs'),
      log = require(`./log${ env.devMode ? '' : '.min' }.js`),
      path = require('path')

;(globalThis.cli ??= {}).config = {}

module.exports = {
    configFilename: 'minify.config.mjs',

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
            type: 'flag', regex: /^--?(?:i|rewrite-?imports?=?(?:true|1)?)$/ },
        copy: {
            type: 'flag', regex: /^--?c(?:opy)?$/ },
        relativeOutput: {
            type: 'flag', regex: /^--?(?:r|relative-?output?=?(?:true|1)?)$/ },
        quietMode: {
            type: 'flag', regex: /^--?q(?:uiet)?(?:-?mode)?$/ },
        ignores: {
            type: 'param', regex: /^--?(?:ignores?|(?:ignore|skip|exclude)(?:d?-?files?)?)(?:=.*|$)/ },
        comment: {
            type: 'param', regex: /^--?comments?(?:=.*)?$/ },
        uiLang: {
            type: 'param', regex: /^--?ui-?lang(?:=.*|$)/ },
        config: {
            type: 'param', regex: /^--?config(?:=.*|$)/ },
        init: {
            type: 'cmd', regex: /^-{0,2}init$/ },
        help: {
            type: 'cmd', regex: /^--?h(?:elp)?$/ },
        version: {
            type: 'cmd', regex: /^--?ve?r?s?i?o?n?$/ }
    },

    async initConfigFile(filename = this.configFilename) {
        const paths = { target: path.resolve(process.cwd(), filename) }

        if (fs.existsSync(paths.target)) // use existing config file
            return log.warn(`${cli.msgs.warn_configFileExists}:`, paths.target)
        if (fs.existsSync(paths.src = path.resolve(__dirname, `../../${ env.devMode ? '../' : 'data/' }${filename}`)))
            fs.copyFileSync(paths.src, paths.target) // use found template

        else { // use jsDelivr copy
            const data = require(`./data${ env.devMode ? '' : '.min' }.js`),
                  pkgVer = require(`./pkg${ env.devMode ? '' : '.min' }.js`).getVer('local'),
                  verTag = pkgVer ? `node-v${pkgVer}` : 'latest',
                  jsdURL = `${cli.urls.jsdelivr}@${verTag}/node.js/${filename}`

            log.data(`${cli.msgs.info_fetchingRemoteConfigFrom} ${jsdURL}...`)
            try {
                const resp = await data.fetch(jsdURL)
                if (resp.ok) data.atomicWrite(paths.target, await resp.text())
                else return log.warn(`${cli.msgs.warn_remoteConfigNotFound}: ${jsdURL} (${resp.status})`)
            } catch (err) {
                return log.warn(`${cli.msgs.warn_remoteConfigFailed}: ${jsdURL} ${err.message}`) }
        }

        log.success(`${cli.msgs.info_configFileCreated}: ${paths.target}\n`)
        log.tip(`${cli.msgs.tip_editToSetDefaults}.`)
        log.tip(`${cli.msgs.tip_cliArgsPrioritized}.`)
    },

    load(ctrlKeys = Object.keys(this.controls)) {
        const inputCtrlKeys = [].concat(ctrlKeys) // force array

        if (!arguments.length && !cli.defaultsSet) { // init all defaults on arg-less load()
            inputCtrlKeys.forEach(key => {
                const ctrl = this.controls[key] ; if (ctrl.mode || ctrl.type == 'cmd') return
                cli.config[key] ??= ctrl.defaultVal ?? ( ctrl.type == 'flag' ? false : '' )
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
            } else // auto-discover .config.[cm]?js file
                for (const ext of ['mjs', 'cjs', 'js']) {
                    const autoPath = path.resolve(process.cwd(), this.configFilename.replace(/\.[^.]+$/, `.${ext}`))
                    if (fs.existsSync(autoPath)) { cli.configPath = autoPath ; break }
                }
            cli.configPathTried = true
        }

        if (cli.configPath)
            try { // to load from config file
                const mod = require(cli.configPath), fileConfig = mod?.default ?? mod
                if (!fileConfig || typeof fileConfig != 'object')
                    log.configURLandExit(`${cli.msgs.error_invalidConfigFile}.`)
                Object.assign(cli.config, arguments.length ?
                    inputCtrlKeys.reduce((acc, key) => fileConfig[key] ? { ...acc, [key]: fileConfig[key] } : acc, {})
                        : fileConfig // whole file on arg-less load()
                )
            } catch (err) {
                log.configURLandExit(`${cli.msgs.error_failedToLoadConfigFile}:`, cli.configPath, `\n${err.message}`) }

        env.args.forEach(arg => { // load from CLI arg (overriding config file loads)
            if (/^[^-]|--?(?:config|debug)/.test(arg)) return

            const ctrlKey = Object.keys(this.controls).find(key => this.controls[key]?.regex?.test(arg))
            if (!ctrlKey && !arguments.length) // invalid CLI arg passed, exit on arg-less load()
                log.errorAndExit(`[${arg}] ${cli.msgs.error_notRecognized}.`)
            if (!inputCtrlKeys.includes(ctrlKey))
                return // don't process env.args when load() specific keys
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
