module.exports = {

    colors: {
        nc: '\x1b[0m',        // no color
        br: '\x1b[1;91m',     // bright red
        by: '\x1b[1;33m',     // bright yellow
        bo: '\x1b[38;5;214m', // bright orange
        bg: '\x1b[1;92m',     // bright green
        bw: '\x1b[1;97m',     // bright white
        gry: '\x1b[90m',      // gray
        blk: '\x1b[30m',      // black
        tlBG: '\x1b[106m'     // teal bg
    },

    configURL() { this.info(`\n${cli.msgs.info_exampleValidConfigFile}: ${cli.urls.config}`) },
    configURLandExit(...args) { this.error(...args) ; this.configURL() ; process.exit(1) },
    data(msg) { console.log(`\n${this.colors.bw}${msg}${this.colors.nc}`) },
    debug(msg) { if (env.debugMode) console.debug(`\n${this.colors.bo}DEBUG:`, msg, this.colors.nc, '\n') },
    dim(msg) { console.log(`${this.colors.gry}${msg}${this.colors.nc}`) },
    error(...args) { console.error(`\n${this.colors.br}ERROR:`, ...args, this.colors.nc) },
    errorAndExit(...args) { this.error(...args) ; this.helpCmdAndDocURL() ; process.exit(1) },
    ifNotQuiet(msg) { if (!cli.config.quietMode) console.info(msg) },
    info(msg) { console.info(`\n${this.colors.by}${msg}${this.colors.nc}`) },
    tip(msg) { console.info(`${this.colors.by}TIP: ${msg}${this.colors.nc}`) },
    success(msg) { console.log(`\n${this.colors.bg}${msg}${this.colors.nc}`) },
    warn(...args) { console.warn(`\n${this.colors.bo}WARNING:`, ...args, this.colors.nc) },

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
                ` -v, --version                           ${cli.msgs.optionDesc_version}.`
            ]
        }
        includeSections.forEach(section => // print valid arg elems
            helpSections[section]?.forEach(line => printHelpMsg(line, /header|usage/.test(section) ? 1 : 41)))
        console.info(
            `\n${cli.msgs.info_moreHelp}, ${cli.msgs.info_visit}: ${this.colors.bw}${cli.urls.docs}${this.colors.nc}`)

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
                    this.colors.bw}${cli.urls.docs}${this.colors.nc}`
        )
    },

    version() {
        const { getVer } = require(`./pkg${ env.devMode ? '' : '.min' }.js`)
        this.info(cli.name)
        this.data(`${
            cli.msgs.prefix_globalVer}: ${ getVer('global') || 'none' }\n${
            cli.msgs.prefix_localVer }: ${ getVer('local')  || 'none' }`
        )
    }
}
