const data = require(`./data${ env.devMode ? '' : '.min' }.js`),
      log = require(`./log${ env.devMode ? '' : '.min' }.js`)

module.exports = {

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
            const localesDir = path.resolve(process.cwd(), '_locales')
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
        log.debug(`Random language:  ${randomLang}\n`)

        return randomLang
    },

    async getMsgs(langCode = 'en') {
        let msgs = data.flatten( // local ones
            require(`../../${ env.devMode ? '../_locales/en/' : 'data/' }messages.json`))

        if (!langCode.startsWith('en')) { // fetch non-English msgs from jsDelivr
            const msgHostURL = `${cli.urls.jsdelivr}@${cli.commitHashes.locales}/_locales/`
            let msgHref = `${msgHostURL}${langCode.replace('-', '_')}/messages.json`
            while ((this.msgFetchesTried ||= 0) < 3)
                try { // fetch remote msgs
                    msgs = data.flatten(await (await data.fetch(msgHref)).json())
                    this.msgFetchesTried = 0 ; break
                } catch (err) { // retry up to 2X (region-stripped + EN)
                    this.msgFetchesTried++ ; if (this.msgFetchesTried >= 3) break
                    log.debug(msgHref = langCode.includes('-') && this.msgFetchesTried == 1 ? // if regional lang on 1st try...
                        msgHref.replace(/([^_]*)_[^/]*(\/.*)/, '$1$2') // ...strip region before retrying
                            : `${msgHostURL}en/messages.json` // else use EN msgs
                    )
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
                log.error('ERROR loading system language:', err.message)
                return 'en'
            }
        else { // macOS/Linux
            const pe = process.env
            return (pe.LANG || pe.LANGUAGE || pe.LC_ALL || pe.LC_MESSAGES || pe.LC_NAME || 'en')
                .split('.')[0] // strip encoding e.g. .UTF-8
                .split('_')[0] // strip region
        }
    }
}
