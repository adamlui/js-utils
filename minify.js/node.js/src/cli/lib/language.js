const data = require(`./data${env.modExt}`),
      log = require(`./log${env.modExt}`)

module.exports = {

    formatCode(langCode) { // to match locale dir name
        return langCode.replace(
            /([a-z]{2,8})[-_]([a-z]{2})/i, (_, lang, region) =>`${lang.toLowerCase()}_${region.toUpperCase()}`) },

    generateRandomLang({ includes = [], excludes = [] } = {}) {
        const fs = require('fs'),
              path = require('path')

        let locales = includes.length ? includes : (() => {

            // Read cache if found
            const cacheDir = path.join(__dirname, '..', '.cache'),
                  localeCache = path.join(cacheDir, 'locales.json')
            if (fs.existsSync(localeCache))
                try { return JSON.parse(fs.readFileSync(localeCache, 'utf8')) } catch (err) {}

            // Discover pkg _locales
            const localesDir = path.resolve(process.cwd(), '../_locales')
            if (!fs.existsSync(localesDir)) return ['en']
            const locales = fs.readdirSync(localesDir, { withFileTypes: true })
                .filter(entry => entry.isDirectory()).map(entry => entry.name)
                .filter(name => /^\w{2}[-_]?\w{0,2}$/.test(name))

            // Cache result
            fs.mkdirSync(cacheDir, { recursive: true })
            data.atomicWrite(localeCache, JSON.stringify(locales, null, 2))

            return locales
        })()

        // Filter out excludes
        const excludeSet = new Set(excludes)
        locales = locales.filter(locale => !excludeSet.has(locale))

        // Get random language
        let randomLang = 'en'
        if (locales.length)
            randomLang = locales[Math.floor(Math.random() * locales.length)]
        log.debug(`Random language: ${randomLang}\n`)

        return randomLang
    },

    async getDocLocales() {
        cli.version ||= require(`./pkg${env.modExt}`).getVer('local') || 'none'
        const verTag = cli.version != 'none' ? `node-v${cli.version}` : 'latest',
              jsdURL = `${cli.urls.jsdelivr}@${verTag}/node.js/docs/`,
              locales = []
        try {
            const respText = await (await data.fetch(jsdURL)).text(),
                  reLocale = /href=".*\/docs\/([^/]+)\/"/g
            let match ; while ((match = reLocale.exec(respText))) locales.push(match[1]) // store locale dir names
        } catch (err) {
            log.warn(`${cli.msgs.warn_docLocalesFetchFailed}:`, err.message)
        }
        return locales
    },

    async getMsgs(langCode = 'en') {
        langCode = module.exports.formatCode(langCode)
        if (env.msgs && langCode == cli.lang) return env.msgs
        let msgs = data.flatten( // local ones
            require(`../../${ env.devMode ? '../../_locales/en/' : 'data/' }messages.json`))

        if (!langCode.startsWith('en')) { // fetch non-English msgs from jsDelivr
            const msgHostURL = `${cli.urls.jsdelivr}@${cli.commitHashes.locales}/_locales/`
            let msgHref = `${msgHostURL}${langCode}/messages.json`, msgFetchesTried = 0
            while (msgFetchesTried < 3)
                try { // fetch remote msgs
                    msgs = data.flatten(await (await data.fetch(msgHref)).json())
                    break
                } catch (err) { // retry up to 2X (region-stripped + EN)
                    msgFetchesTried++ ; if (msgFetchesTried >= 3) break
                    log.debug(msgHref = langCode.includes('-') && msgFetchesTried == 1 ?
                        msgHref.replace(/([^_]*)_[^/]*(\/.*)/, '$1$2') // strip region before retrying
                            : `${msgHostURL}en/messages.json` // else use EN msgs
                    )
                }
        }

        return msgs
    },

    getSysLang() {
        try {
            if (process.platform == 'win32')
                return require('child_process').execSync(
                    '(Get-Culture).TwoLetterISOLanguageName', { shell: 'powershell', encoding: 'utf-8' }
                ).trim()
            else { // macOS/Linux
                const pe = process.env
                return (pe.LANG || pe.LANGUAGE || pe.LC_ALL || pe.LC_MESSAGES || pe.LC_NAME)
                    .split('.')[0] // strip encoding e.g. .UTF-8
            }
        } catch (err) {
            log.error(`${cli.msgs.error_failedToFetchSysLang}:`, err.message)
            return 'en'
        }
    }
}
