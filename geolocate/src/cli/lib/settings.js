(globalThis.app ??= {}).config = {}

module.exports = {

    controls: {
        quietMode: { type: 'flag', regex: /^--?q(?:uiet)?(?:-?mode)?$/ },
        help: { type: 'infoCmd', regex: /^--?h(?:elp)?$/ },
        version: { type: 'infoCmd', regex: /^--?ve?r?s?i?o?n?$/ }
    },

    load(keys = Object.keys(this.controls)) {
        const print = require(`./print${ env.devMode ? '' : '.min' }.js`)
        for (const arg of process.argv.slice(2)) {
            if (!arg.startsWith('-')) continue
            const matchKey = [].concat(keys).find(key => this.controls[key]?.regex?.test(arg))
            if (!matchKey) print.errorAndExit(`[${arg}] ${app.msgs?.error_notRecognized}.`)
            const ctrlData = this.controls[matchKey]
            if (ctrlData.type == 'paramOption') {
                if (!/=/.test(arg)) print.errorAndExit(`[${arg}] must include =val`)
                const val = arg.split('=')[1]
                app.config[matchKey] = ctrlData.parser ? ctrlData.parser(val) : val
            } else
                app.config[matchKey] = true
        }
        if (app.config.qty && (isNaN(app.config.qty) || app.config.qty < 1))
            print.errorAndExit(`[qty] ${app.msgs.error_nonPositiveNum}.`)
        return app.config
    }
}
