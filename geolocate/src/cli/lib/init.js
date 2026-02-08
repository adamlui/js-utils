module.exports = async function initCLI() {
    const language = require(`./language${env.modExt}`),
          settings = require(`./settings${env.modExt}`)

    Object.assign(globalThis.cli ??= {}, require(`../../${ env.devMode ? '../' : 'data/' }package-data.json`))
    cli.lang = settings.load('uiLang') || (
        env.debugMode ? language.generateRandomLang({ excludes: ['en'] }) : language.getSysLang() )
    cli.msgs = await language.getMsgs(cli.lang)
    cli.urls.docs += '/#-command-line-usage'

    settings.load() // all control keys
}
