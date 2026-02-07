const log = require(`./log${ env.devMode ? '' : '.min' }.js`)

module.exports = async function initCLI() {
    const language = require(`./language${ env.devMode ? '' : '.min' }.js`),
          settings = require(`./settings${ env.devMode ? '' : '.min' }.js`)

    Object.assign(globalThis.cli ??= {}, require(`../../${ env.devMode ? '../' : 'data/' }package-data.json`))
    cli.lang = settings.load('uiLang') || (
        env.debugMode ? language.generateRandomLang({ excludes: ['en'] }) : language.getSysLang() )
    cli.msgs = await language.getMsgs(cli.lang)
    if (cli.lang.startsWith('en'))
        cli.urls.docs += '/#-command-line-usage'
    else { // localize cli.urls.docs
        cli.docLocale = cli.lang.replace('_', '-').toLowerCase()
        if ((await language.getDocLocales()).includes(cli.docLocale))
            log.debug(cli.urls.docs += `/${cli.docLocale}#readme`)
    }
}
