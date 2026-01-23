module.exports = {
    async getMsgs(langCode = 'en') {
        const data = require(`./data${ env.devMode ? '' : '.min' }.js`)
        let msgs = data.flatten(
            require(`../../${ env.devMode ? '../../_locales/en/' : 'data/' }messages.json`), { key: 'message' })
        if (!langCode.startsWith('en')) { // fetch non-English msgs from jsDelivr
            const msgHostURL = `${app.urls.jsdelivr}@${app.commitHashes.locales}/_locales/`,
                  msgLocaleDir = `${ langCode ? langCode.replace('-', '_') : 'en' }/`
            let msgHref = `${msgHostURL}${msgLocaleDir}messages.json`, msgFetchTries = 0
            while (msgFetchTries < 3)
                try {
                    msgs = data.flatten(await (await data.fetch(msgHref)).json(), { key: 'message' }) ; break
                } catch (err) { // if bad response
                    msgFetchTries++ ; if (msgFetchTries == 3) break // try 3X (original/region-stripped/EN) only
                    msgHref = langCode.includes('-') && msgFetchTries == 1 ? // if regional lang on 1st try...
                        msgHref.replace(/([^_]*)_[^/]*(\/.*)/, '$1$2') // ...strip region before retrying
                            : `${msgHostURL}en/messages.json` // else use default English messages
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
