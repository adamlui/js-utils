const log = require(`./log${env.modExt}`),
      settings = require(`./settings${env.modExt}`)

module.exports = {

    async cli() {
        const language = require(`./language${env.modExt}`)

        Object.assign(globalThis.cli ??= {}, require(`../../${ env.devMode ? '../' : 'data/' }package-data.json`))
        cli.lang = settings.load('uiLang') || (
            env.debugMode ? language.generateRandomLang({ excludes: ['en'] }) : language.getSysLang() )
        cli.msgs = await language.getMsgs(cli.lang)
        if (cli.lang.startsWith('en'))
            cli.urls.cliDocs ||= `${cli.urls.docs}/#-command-line-usage`
        else {
            cli.docLocale = cli.lang.replace('_', '-').toLowerCase()
            cli.docLocales ??= await language.getDocLocales()
            if (cli.docLocales.includes(cli.docLocale))
                log.debug(cli.urls.localDocs = `${cli.urls.docs}/${cli.docLocale}#readme`)
        }

        settings.load() // all control keys
    },

    async configFile(filename = settings.configFilename) {
        const fs = require('fs'),
              path = require('path'),
              paths = { target: path.resolve(process.cwd(), filename) }

        if (fs.existsSync(paths.target)) // use existing config file
            return log.warn(`${cli.msgs.warn_configFileExists}:`, paths.target)
        if (fs.existsSync(paths.src = path.resolve(__dirname, `../../${ env.devMode ? '../' : 'data/' }${filename}`)))
            fs.copyFileSync(paths.src, paths.target) // use found template

        else { // use jsDelivr copy
            cli.version ??= require(`./pkg${env.modExt}`).getVer('local')
            const data = require(`./data${env.modExt}`),
                  verTag = cli.version ? `node-v${cli.version}` : 'latest',
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
    }
}
