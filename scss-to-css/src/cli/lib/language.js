module.exports = {

    async getMsgs(langCode = 'en') {
        const data = require(`./data${ env.devMode ? '' : '.min' }.js`)
        let msgs = data.flatten( // local ones
            require(`../${ env.devMode ? '../../_locales/en/' : 'data/' }messages.json`), { key: 'message' })
        if (!langCode.startsWith('en')) { // fetch non-English msgs from jsDelivr
            const msgHostURL = `${app.urls.jsdelivr}@${app.commitHashes.locales}/_locales/`,
                  localeDir = `${ langCode ? langCode.replace('-', '_') : 'en' }/`
            let msgHref = `${msgHostURL}${localeDir}messages.json`, msgFetchTries = 0
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
