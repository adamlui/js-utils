(globalThis.app ??= {}).config = {}

module.exports = {

    controls: {
        dryRun: {
            type: 'flag', regex: /^--?(?:n|dry-?run)$/ },
        includeDotFolders: {
            type: 'flag', regex: /^--?(?:dd?|(?:include-?)?dot-?(?:folder|dir(?:ector(?:y|ie))?)s?=?(?:true|1)?)$/ },
        noSourceMaps: {
            type: 'flag', regex: /^--?(?:S|(?:exclude|disable|no)-?so?u?rce?-?maps?|so?u?rce?-?maps?=(?:false|0))$/ },
        noRecursion: {
            type: 'flag', regex: /^--?(?:R|(?:disable|no)-?recursi(?:on|ve)|recursi(?:on|ve)=(?:false|0))$/ },
        noMinify: {
            type: 'flag', regex: /^--?(?:M|(?:disable|no)-?minif(?:y|ication)|minif(?:y|ication)=(?:false|0))$/ },
        relativeOutput: {
            type: 'paramOption', regex: /^--?(?:r|relative-?output?=?(?:true|1)?)$/ },
        copy: {
            type: 'paramOption', regex: /^--?c(?:opy)?$/ },
        quietMode: {
            type: 'paramOption', regex: /^--?q(?:uiet)?(?:-?mode)?$/ },
        ignores: {
            type: 'paramOption', regex: /^--?(?:ignores?|(?:ignore|skip|exclude)(?:d?-?files?)?)(?:=.*|$)/ },
        comment: {
            type: 'paramOption', regex: /^--?comments?(?:=.*|$)/ },
        help: {
            type: 'infoCmd', regex: /^--?h(?:elp)?$/ },
        version: {
            type: 'infoCmd', regex: /^--?ve?r?s?i?o?n?$/ }
    },

    load(keys = Object.keys(this.controls)) {
        const print = require(`./print${ env.devMode ? '' : '.min' }.js`)
        for (const arg of process.argv.slice(2)) {
            if (!arg.startsWith('-')) continue
            const matchKey = [].concat(keys).find(key => this.controls[key]?.regex?.test(arg))
            if (!matchKey) print.errorAndExit(`[${arg}] not recognized.`)
            const ctrlData = this.controls[matchKey]
            if (ctrlData.type == 'paramOption') {
                if (!/=/.test(arg)) print.errorAndExit(`[${arg}] must include =val`)
                const val = arg.split('=')[1]
                app.config[matchKey] = ctrlData.parser ? ctrlData.parser(val) : val
            } else
                app.config[matchKey] = true
        }
        if (app.config.qty && (isNaN(app.config.qty) || app.config.qty < 1))
            print.errorAndExit('[qty] argument can only be > 0.')
        return app.config
    }
}
