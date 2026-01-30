(globalThis.app ??= {}).config = {}

module.exports = {

    controls: {
        length: { type: 'paramOption', regex: /^--?length(?:=.*|$)/ },
        qty: { type: 'paramOption', regex: /^--?qu?a?n?ti?t?y(?:=.*|$)/ },
        charset: { type: 'paramOption', regex: /^--?charse?t?(?:=.*|$)/ },
        excludeChars: { type: 'paramOption', regex:/^--?exclude(?:=.*|$)/ },
        includeNums: { type: 'flag', regex: /^--?(?:n|(?:include-?)?num(?:ber)?s?=?(?:true|1)?)$/ },
        includeSymbols: { type: 'flag', regex: /^--?(?:y|(?:include-?)?symbols?=?(?:true|1)?)$/ },
        excludeLowerChars: {
            type: 'flag', regex: /^--?(?:L|(?:exclude|disable|no)-?lower-?(?:case)?|lower-?(?:case)?=(?:false|0))$/ },
        excludeUpperChars: {
            type: 'flag', regex: /^--?(?:U|(?:exclude|disable|no)-?upper-?(?:case)?|upper-?(?:case)?=(?:false|0))$/ },
        excludeSimilarChars: {
            type: 'flag', regex: /^--?(?:S|(?:exclude|disable|no)-?similar-?(?:char(?:acter)?s?)?|similar-?(?:char(?:acter)?s?)?=(?:false|0))$/ },
        strictMode: { type: 'flag', regex: /^--?s(?:trict)?(?:-?mode)?$/ },
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
