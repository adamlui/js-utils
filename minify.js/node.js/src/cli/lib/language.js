const data = require(`./data${ env.devMode ? '' : '.min' }.js`),
    { execSync } = require('child_process')

module.exports = {
    async initMsgs() {
        app.msgs = data.flatten(
            require(`../../../${ env.devMode ? '../_locales/en/' : 'data/' }messages.json`), { type: 'message' })
        if (!env.sysLang.startsWith('en'))
            try { // to fetch from jsDelivr
                const msgHostDir = `${app.urls.jsdelivr}@${app.commitHashes.locales}/_locales/`,
                      msgLocaleDir = `${ env.sysLang ? env.sysLang.replace('-', '_') : 'en' }/`
                let msgHref = `${msgHostDir}${msgLocaleDir}messages.json`, msgFetchTries = 0
                while (msgFetchTries < 3)
                    try {
                        app.msgs = data.flatten(await (await data.fetch(msgHref)).json(), { type: 'message' }) ; break
                    } catch (err) { // if bad response
                        msgFetchTries++ ; if (msgFetchTries == 3) break // try original/region-stripped/EN only
                        msgHref = env.sysLang.includes('-') && msgFetchTries == 1 ? // if regional lang on 1st try...
                            msgHref.replace(/([^_]*)_[^/]*(\/.*)/, '$1$2') // ...strip region before retrying
                                : `${msgHostDir}en/messages.json` // else use default English messages
                    }
            } catch (err) { console.error('ERROR loading messages:', err.message) }
    },

    initSysLang() {
        if (process.platform == 'win32')
            try {
                env.sysLang = execSync(
                    '(Get-Culture).TwoLetterISOLanguageName', { shell: 'powershell', encoding: 'utf-8' }
                ).trim()
            } catch (err) { console.error('ERROR loading system language:', err.message) }
        else { // macOS/Linux
            const pe = process.env
            env.sysLang = (pe.LANG || pe.LANGUAGE || pe.LC_ALL || pe.LC_MESSAGES || pe.LC_NAME || 'en')?.split('.')[0]
        }
    }
}
