module.exports = {

    colors: {
        nc: '\x1b[0m',        // no color
        br: '\x1b[1;91m',     // bright red
        by: '\x1b[1;33m',     // bright yellow
        bo: '\x1b[38;5;214m', // bright orange
        bg: '\x1b[1;92m',     // bright green
        bw: '\x1b[1;97m',     // bright white
        blk: '\x1b[30m',      // black
        tlBG: '\x1b[106m'     // teal bg
    },

    config() { this.info(`\n${app.msgs.info_exampleValidConfigFile}: ${app.urls.config}`) },
    configAndExit(...args) { this.error(...args) ; this.config() ; process.exit(1) },
    data(msg) { console.log(`\n${this.colors.bw}${msg}${this.colors.nc}`) },
    debug(msg) { if (env.debugMode) console.log(msg) },
    error(...args) { console.error(`\n${this.colors.br}${app.msgs.prefix_error}:`, ...args, this.colors.nc) },
    errorAndExit(...args) { this.error(...args) ; this.helpCmdAndDocURL() ; process.exit(1) },
    ifNotQuiet(msg) { if (!app.config.quietMode) console.info(msg) },
    info(msg) { console.info(`\n${this.colors.by}${msg}${this.colors.nc}`) },
    tip(msg) { console.info(`${this.colors.by}${app.msgs.prefix_tip}: ${msg}${this.colors.nc}`) },
    success(msg) { console.log(`\n${this.colors.bg}${msg}${this.colors.nc}`) },
    warn(...args) { console.warn(`\n${this.colors.bo}${app.msgs.prefix_warning}:`, ...args, this.colors.nc) },

    help(includeSections = ['header', 'usage', 'pathArgs', 'flags', 'params', 'cmds']) {
        app.prefix = `${this.colors.tlBG}${this.colors.blk} ${app.name.replace(/^@[^/]+\//, '')} ${this.colors.nc} `
        const helpSections = {
            header: [
                `\n├ ${app.prefix}${ app.msgs.appCopyright || `© ${app.copyrightYear} ${
                       app.author} under the ${app.license} license` }.`,
                `${app.prefix}${app.msgs.prefix_source}: ${app.urls.src}`
            ],
            usage: [
                `\n${this.colors.bw}o ${app.msgs.helpSection_usage}:${this.colors.nc}`,
                ` ${this.colors.bw}» ${this.colors.bg}${app.cmdFormat}${this.colors.nc}`
            ],
            pathArgs: [
                `\n${this.colors.bw}o ${app.msgs.helpSection_pathArgs}:${this.colors.nc}`,
                ` [inputPath]                             ${app.msgs.inputPathDesc_main}, ${
                                                            app.msgs.inputPathDesc_extra}.`,
                ` [outputPath]                            ${app.msgs.outputPathDesc_main}, ${
                                                            app.msgs.outputPathDesc_extra}`
            ],
            flags: [
                `\n${this.colors.bw}o ${app.msgs.helpSection_flags}:${this.colors.nc}`,
                ` -n, --dry-run                           ${app.msgs.optionDesc_dryRun}.`,
                ` -d, --include-dotfolders                ${app.msgs.optionDesc_dotfolders}.`,
                ` -S, --no-source-maps                    ${app.msgs.optionDesc_noSourceMaps}.`,
                ` -M, --no-minify                         ${app.msgs.optionDesc_noMinify}.`,
                ` -R, --no-recursion                      ${app.msgs.optionDesc_noRecursion}.`,
                ` -r, --relative-output                   ${app.msgs.optionDesc_relativeOutput}.`,
                ` -c, --copy                              ${app.msgs.optionDesc_copy}.`,
                ` -q, --quiet                             ${app.msgs.optionDesc_quiet}.`
            ],
            params: [
                `\n${this.colors.bw}o ${app.msgs.helpSection_params}:${this.colors.nc}`,
                `--ignores="dir/,file1.scss,file2.scss"   ${app.msgs.optionDesc_ignores}.`,
                `--comment="comment"                      ${app.msgs.optionDesc_commentMain}. ${
                                                            app.msgs.optionDesc_commentExtra}.`,
                ` --config="path/to/file"                 ${app.msgs.optionDesc_config}.`
            ],
            cmds: [
                `\n${this.colors.bw}o ${app.msgs.helpSection_cmds}:${this.colors.nc}`,
                ` -i, --init                              ${app.msgs.optionDesc_init}.`,
                ` -h, --help                              ${app.msgs.optionDesc_help}.`,
                ` -v, --version                           ${app.msgs.optionDesc_version}.`
            ]
        }
        includeSections.forEach(section => // print valid arg elems
            helpSections[section]?.forEach(line => printHelpMsg(line, /header|usage/.test(section) ? 1 : 41)))
        console.info(
            `\n${app.msgs.info_moreHelp}, ${app.msgs.info_visit}: ${this.colors.bw}${app.urls.docs}${this.colors.nc}`)

        function printHelpMsg(msg, indent) { // wrap msg + indent 2nd+ lines
            const terminalWidth = process.stdout.columns || 80,
                  words = msg.match(/\S+|\s+/g),
                  lines = [], prefix = '| '

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
            app.msgs.info_moreHelp}, ${app.msgs.info_type} ${app.name.split('/')[1]} --help' ${
                app.msgs.info_or} ${app.msgs.info_visit}\n${
                this.colors.bw}${app.urls.docs}${this.colors.nc}`
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
                )?.match(/^[~^>=]?\d+\.\d+\.\d+$/)[1] || 'none'
                break
            }
            currentDir = path.dirname(currentDir)
        }
        console.info(`\n${app.msgs.prefix_globalVer}: ${globalVer}\n${app.msgs.prefix_localVer}: ${localVer}`)
    }
}
