const colors = require('./color'),
    { getDownloads, getVer } = require('./pkg')

module.exports = {
    colors,

    configURL() { this.info(`\n${cli.msgs.info_exampleValidConfigFile}: ${cli.urls.config}`) },
    configURLandExit(...args) { this.error(...args); this.configURL(); process.exit(1) },
    data(msg) { console.log(`\n${colors.bw}${msg}${colors.nc}`) },
    debug(msg) { if (env.modes.debug) console.debug(`\n${colors.bo}DEBUG:`, msg, colors.nc, '\n') },
    dim(msg) { console.log(`${colors.gry}${msg}${colors.nc}`) },
    error(...args) { console.error(`\n${colors.br}ERROR:`, ...args, colors.nc) },
    errorAndExit(...args) { this.error(...args); this.helpCmdAndDocURL(); process.exit(1) },
    ifNotQuiet(msg) { if (!cli.config.quietMode) this.info(msg) },
    info(msg) { console.info(`\n${colors.schemes.default[0]}${msg}${colors.nc}`) },
    break() { console.log() },
    tip(msg) { console.info(`${colors.by}TIP: ${msg}${colors.nc}`) },
    success(msg) { console.log(`\n${colors.bg}${msg}${colors.nc}`) },
    warn(...args) { console.warn(`\n${colors.bo}WARNING:`, ...args, colors.nc) },

    help(includeSections = ['header', 'usage', 'pathArgs', 'flags', 'params', 'cmds']) {
        cli.prefix = `${this.colors.tlBG}${this.colors.blk} ${cli.name.replace(/^@[^/]+\//, '')} ${this.colors.nc} `
        const helpSections = {
            header: [
                `\n├ ${cli.prefix}${cli.msgs.appCopyright}.`,
                `${cli.prefix}${cli.msgs.prefix_source}: ${cli.urls.src}`
            ],
            usage: [
                `\n${this.colors.bw}o ${cli.msgs.helpSection_usage}:${this.colors.nc}`,
                ` ${this.colors.bw}» ${this.colors.bg}${cli.cmdFormat}${this.colors.nc}`
            ],
            pathArgs: [
                `\n${this.colors.bw}o ${cli.msgs.helpSection_pathArgs}:${this.colors.nc}`,
                ` [inputPath]                             ${cli.msgs.inputPathDesc_main}, ${
                                                            cli.msgs.inputPathDesc_extra}.`,
                ` [outputPath]                            ${cli.msgs.outputPathDesc_main}, ${
                                                            cli.msgs.outputPathDesc_extra}`
            ],
            flags: [
                `\n${this.colors.bw}o ${cli.msgs.helpSection_flags}:${this.colors.nc}`,
                ` -n, --dry-run                           ${cli.msgs.optionDesc_dryRun}.`,
                ` -d, --include-dotfolders                ${cli.msgs.optionDesc_dotfolders}.`,
                ` -S, --no-source-maps                    ${cli.msgs.optionDesc_noSourceMaps}.`,
                ` -M, --no-minify                         ${cli.msgs.optionDesc_noMinify}.`,
                ` -R, --no-recursion                      ${cli.msgs.optionDesc_noRecursion}.`,
                ` -r, --relative-output                   ${cli.msgs.optionDesc_relativeOutput}.`,
                ` -c, --copy                              ${cli.msgs.optionDesc_copy}.`,
                ` -q, --quiet                             ${cli.msgs.optionDesc_quiet}.`
            ],
            params: [
                `\n${this.colors.bw}o ${cli.msgs.helpSection_params}:${this.colors.nc}`,
                `--ignores="dir/,file1.scss,file2.sass"   ${cli.msgs.optionDesc_ignores}.`,
                `--comment="comment"                      ${cli.msgs.optionDesc_commentMain}. ${
                                                            cli.msgs.optionDesc_commentExtra}.`,
                ` --ui-lang="code"                        ${cli.msgs.optionDesc_uiLang}.`,
                ` --config="path/to/file"                 ${cli.msgs.optionDesc_config}.`
            ],
            cmds: [
                `\n${this.colors.bw}o ${cli.msgs.helpSection_cmds}:${this.colors.nc}`,
                ` -i, --init                              ${cli.msgs.optionDesc_init}.`,
                ` -h, --help                              ${cli.msgs.optionDesc_help}.`,
                ` -v, --version                           ${cli.msgs.optionDesc_version}.`,
                ` -v, --stats                             ${cli.msgs.optionDesc_stats}.`
            ]
        }
        includeSections.forEach(section => // print valid arg elems
            helpSections[section]?.forEach(line => printHelpMsg(line, /header|usage/.test(section) ? 1 : 41)))
        console.info(`\n${cli.msgs.info_moreHelp}, ${
            cli.msgs.info_visit}: ${this.colors.bw}${cli.urls.cliDocs}${this.colors.nc}`)

        function printHelpMsg(msg, indent) { // wrap msg + indent 2nd+ lines
            const terminalWidth = process.stdout.columns || 80,
                  words = msg.match(/\S+|\s+/g),
                  lines = [], prefix = '| '

            // Split msg into lines of appropriate lengths
            let currentLine = ''
            words.forEach(word => {
                const lineLength = terminalWidth -( !lines.length ? 0 : indent )
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
            cli.msgs.info_moreHelp}, ${cli.msgs.info_type} ${cli.name.split('/')[1]} --help' ${
                cli.msgs.info_or} ${cli.msgs.info_visit}\n${
                    colors.bw}${cli.urls.docs}${colors.nc}`
        )
    },

    async stats(pkgName = cli.name, options = { ecosystem: 'npm', maxDays: 8, maxVers: 5, scheme: 'default' }) {
        const pkgStats = await getDownloads(pkgName, options),
              schemeData = colors.schemes[options.scheme]
        if (!schemeData) return this.error(`Scheme '${options.scheme}' not found!`)
        const colorMap = Object.fromEntries(schemeData.map((hex, idx) => [`c${idx}`, hex])),
              statsTable = new (require('console-table-printer').Table)({ colorMap })
        pkgStats.forEach((row, idx) => // build colored rows
            statsTable.addRow(row, { color: `c${Math.floor(idx / pkgStats.length * schemeData.length)}` }))
        statsTable.printTable()
    },

    version() {
        this.info(cli.name)
        this.data(`${
            cli.msgs.prefix_globalVer}: ${ getVer('global') || 'none' }\n${
            cli.msgs.prefix_localVer }: ${ getVer('local')  || 'none' }`
        )
    }
}
