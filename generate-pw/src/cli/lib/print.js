module.exports = {

    data(msg) { console.log(`\n${app.colors.bw}${msg}${app.colors.nc}`) },
    error(...args) { console.error(`\n${app.colors.br}${app.msgs.prefix_error}:`, ...args, app.colors.nc) },
    errorAndExit(...args) { this.error(...args) ; this.helpCmdAndDocURL() ; process.exit(1) },
    ifNotQuiet(msg) { if (!app.config.quietMode) console.info(msg) },
    info(msg) { console.info(`\n${app.colors.by}${msg}${app.colors.nc}`) },
    success(msg) { console.log(`\n${app.colors.bg}${msg}${app.colors.nc}`) },

    help(includeSections = ['header', 'usage', 'paramOptions', 'flags', 'infoCmds']) {
        app.prefix = `${app.colors.tlBG}${app.colors.blk}\x1b[30m ${app.name} ${app.colors.nc} `
        const helpSections = {
            header: [
                `\n├ ${app.prefix}${ app.msgs.appCopyright || `© ${
                       app.copyrightYear} ${app.author} under the ${app.license} license`
                }.`,
                `${app.prefix}${app.msgs.prefix_source}: ${app.urls.src}`
            ],
            usage: [
                `\n${app.colors.bw}o ${app.msgs.helpSection_usage}:${app.colors.nc}`,
                ` ${app.colors.bw}» ${app.colors.bg}${app.cmdFormat}${app.colors.nc}`
            ],
            paramOptions: [
                `\n${app.colors.bw}o ${app.msgs.helpSection_paramOptions}:${app.colors.nc}`,
                ` --length=n                  ${app.msgs.optionDesc_length}.`,
                ` --qty=n                     ${app.msgs.optionDesc_qty}.`,
                ` --charset=chars             ${app.msgs.optionDesc_charset}.`,
                ` --exclude=chars             ${app.msgs.optionDesc_exclude}.`
            ],
            flags: [
                `\n${app.colors.bw}o ${app.msgs.helpSection_flags}:${app.colors.nc}`,
                ` -n, --include-numbers       ${app.msgs.optionDesc_includeNums}.`,
                ` -y, --include-symbols       ${app.msgs.optionDesc_includeSymbols}.`,
                ` -L, --no-lowercase          ${app.msgs.optionDesc_noLower}.`,
                ` -U, --no-uppercase          ${app.msgs.optionDesc_noUpper}.`,
                ` -S, --no-similar            ${app.msgs.optionDesc_noSimilar}.`,
                ` -s, --strict                ${app.msgs.optionDesc_strict}.`,
                ` -q, --quiet                 ${app.msgs.optionDesc_quiet}.`
            ],
            infoCmds: [
                `\n${app.colors.bw}o ${app.msgs.helpSection_infoCmds}:${app.colors.nc}`,
                ` -h, --help                  ${app.msgs.optionDesc_help}`,
                ` -v, --version               ${app.msgs.optionDesc_version}.`
            ]
        }
        includeSections.forEach(section => // print valid arg elems
            helpSections[section]?.forEach(line => printHelpMsg(line, /header|usage/.test(section) ? 1 : 29)))
        console.info(
            `\n${app.msgs.info_moreHelp}, ${app.msgs.info_visit}: ${app.colors.bw}${app.urls.docs}${app.colors.nc}`)

        function printHelpMsg(msg, indent) { // wrap msg + indent 2nd+ lines
            const terminalWidth = process.stdout.columns || 80,
                  lines = [], words = msg.match(/\S+|\s+/g),
                  prefix = '| '

            // Split msg into lines of appropriate lengths
            let currentLine = ''
            words.forEach(word => {
                const lineLength = terminalWidth - ( !lines.length ? 0 : indent )
                if (currentLine.length + prefix.length + word.length > lineLength) { // cap/store it
                    lines.push(!lines.length ? currentLine : currentLine.trimStart())
                    currentLine = ''
                }
                currentLine += word
            })
            lines.push(!lines.length ? currentLine : currentLine.trimStart())

            // Print formatted msg
            lines.forEach((line, idx) => console.info(prefix +(
                idx == 0 ? line // print 1st line unindented
                    : ' '.repeat(indent) + line // print subsequent lines indented
            )))
        }
    },

    helpCmdAndDocURL() {
        console.info(`\n${
            app.msgs.info_moreHelp}, ${app.msgs.info_type} ${app.name} --help' ${
                app.msgs.info_or} ${app.msgs.info_visit}\n${
                app.colors.bw}${app.urls.docs}${app.colors.nc}`
        )
    },

    version() {
        const path = require('path')
        const globalVer = require('child_process')
            .execSync(`npm view ${JSON.stringify(app.name)} version`).toString().trim() || 'none'
        let localVer, currentDir = process.cwd()
        while (currentDir != '/') {
            const localManifestPath = path.join(currentDir, 'package.json')
            if (require('fs').existsSync(localManifestPath)) {
                const localManifest = require(localManifestPath)
                localVer = (localManifest.dependencies?.[app.name]
                         || localManifest.devDependencies?.[app.name]
                )?.match(/^[~^>=]?\d+\.\d+\.\d+$/)?.[1] || 'none'
                break
            }
            currentDir = path.dirname(currentDir)
        }
        console.info(`\n${app.msgs.prefix_globalVer}: ${globalVer}\n${app.msgs.prefix_localVer}: ${localVer}`)
    }
}
