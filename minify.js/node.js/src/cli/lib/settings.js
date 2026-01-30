(globalThis.app ??= {}).config = {}

module.exports = {

    controls: {
        dryRun: {
            type: 'flag', regex: /^--?(?:n|dry-?run)$/ },
        includeDotFolders: {
            type: 'flag', regex: /^--?(?:dd?|(?:include-?)?dot-?(?:folder|dir(?:ector(?:y|ie))?)s?=?(?:true|1)?)$/ },
        includeDotFiles: {
            type: 'flag', regex: /^--?(?:df|D|(?:include-?)?dot-?files?=?(?:true|1)?)$/ },
        noRecursion: {
            type: 'flag', regex: /^--?(?:R|(?:disable|no)-?recursi(?:on|ve)|recursi(?:on|ve)=(?:false|0))$/ },
        noMangle: {
            type: 'flag', regex: /^--?(?:M|(?:disable|no)-?mangle|mangle=(?:false|0))$/ },
        noFilenameChange: {
            type: 'flag', regex: /^--?(?:X|(?:disable|no)-?(?:file)?name-?change|(?:file)?name-?change=(?:false|0))$/ },
        rewriteImports: {
            type: 'paramOption', regex: /^--?(?:i|rewrite-?imports?=?(?:true|1)?)$/ },
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
