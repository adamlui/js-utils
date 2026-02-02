module.exports = {

    generateRandomLang({ includes = [], excludes = [] } = {}) {

        const fs = require('fs'),
              log = require(`./log${ env.devMode ? '' : '.min' }.js`),
              path = require('path')

        let locales = includes.length ? includes : (() => {

            // Read cache if found
            const cacheDir = path.join(__dirname, '..', '.cache'),
                  localeCache = path.join(cacheDir, 'locales.json')
            if (fs.existsSync(localeCache))
                try { return JSON.parse(fs.readFileSync(localeCache, 'utf8')) } catch {}

            // Discover project _locales
            const localesDir = path.resolve(process.cwd(), '_locales')
            if (!fs.existsSync(localesDir)) return ['en']
            const locales = fs.readdirSync(localesDir, { withFileTypes: true })
                .filter(entry => entry.isDirectory())
                .map(entry => entry.name)
                .filter(name => /^[a-z]{2}(?:_[A-Z]{2})?$/.test(name))

            // Cache result
            fs.mkdirSync(cacheDir, { recursive: true })
            fs.writeFileSync(localeCache, JSON.stringify(locales, null, 2))

            return locales
        })()

        // Filter out excludes
        const excludeSet = new Set(excludes)
        locales = locales.filter(locale => !excludeSet.has(locale))

        // Get random language
        let randomLang = 'en'
        if (locales.length)
            randomLang = locales[Math.floor(Math.random() * locales.length)]
        log.debug(`\nRandom language:  ${randomLang}\n`)

        return randomLang
    },

    async getMsgs(langCode = 'en') {
        const data = require(`./data${ env.devMode ? '' : '.min' }.js`)
        let msgs = data.flatten( // local ones
            require(`../${ env.devMode ? '../../_locales/en/' : 'data/' }messages.json`), { key: 'message' })
        if (!langCode.startsWith('en')) { // fetch non-English msgs from jsDelivr
            const msgHostURL = `${app.urls.jsdelivr}@${app.commitHashes.locales}/_locales/`
            let msgHref = `${msgHostURL}${langCode.replace('-', '_')}/messages.json`,
                msgFetchTries = 0
            while (msgFetchTries < 3)
                try {
                    msgs = data.flatten(await (await data.fetch(msgHref)).json(), { key: 'message' })
                    break
                } catch (err) { // retry up to 2X (region-stripped + EN)
                    msgFetchTries++ ; if (msgFetchTries > 2) break
                    msgHref = langCode.includes('-') && msgFetchTries == 1 ? // if regional lang on 1st try...
                        msgHref.replace(/([^_]*)_[^/]*(\/.*)/, '$1$2') // ...strip region before retrying
                            : `${msgHostURL}en/messages.json` // else use EN msgs
                }
        }
        return msgs
    },

    getSysLang() {
        if (process.platform == 'win32')
            try {
                return require('child_process').execSync(
                    '(Get-Culture).TwoLetterISOLanguageName', { shell: 'powershell', encoding: 'utf-8' }
                ).trim()
            } catch (err) {
                console.error('ERROR loading system language:', err.message)
                return 'en'
            }
        else { // macOS/Linux
            const pe = process.env
            return (pe.LANG || pe.LANGUAGE || pe.LC_ALL || pe.LC_MESSAGES || pe.LC_NAME || 'en').split('.')[0]
        }
    }
}
