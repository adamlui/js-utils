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

    configURL() { this.info(`\n${app.msgs.info_exampleValidConfigFile}: ${app.urls.config}`) },
    configURLandExit(...args) { this.error(...args) ; this.configURL() ; process.exit(1) },
    data(msg) { console.log(`\n${this.colors.bw}${msg}${this.colors.nc}`) },
    debug(msg) { if (env.debugMode) console.log(msg) },
    error(...args) { console.error(`\n${this.colors.br}${app.msgs.prefix_error}:`, ...args, this.colors.nc) },
    errorAndExit(...args) { this.error(...args) ; this.helpCmdAndDocURL() ; process.exit(1) },
    ifNotQuiet(msg) { if (!app.config.quietMode) console.info(msg) },
    info(msg) { console.info(`\n${this.colors.by}${msg}${this.colors.nc}`) },
    tip(msg) { console.info(`${this.colors.by}${app.msgs.prefix_tip}: ${msg}${this.colors.nc}`) },
    success(msg) { console.log(`\n${this.colors.bg}${msg}${this.colors.nc}`) },
    warn(...args) { console.warn(`\n${this.colors.bo}${app.msgs.prefix_warning}:`, ...args, this.colors.nc) },

    geoData(data) {
        console.info([
            `\nIP: ${this.colors.bw}${data.ip}${this.colors.nc}`,
            `${app.msgs.geoLabel_country}: ${this.colors.bw}${data.country}${this.colors.nc}`,
            `${app.msgs.geoLabel_region}: ${this.colors.bw}${data.regionName}${this.colors.nc}`,
            `${app.msgs.geoLabel_city}: ${this.colors.bw}${data.city}${this.colors.nc}`,
            `${app.msgs.geoLabel_zip}: ${this.colors.bw}${data.zip}${this.colors.nc}`,
            `${app.msgs.geoLabel_lat}: ${this.colors.bw}${data.lat}${this.colors.nc}`,
            `${app.msgs.geoLabel_lon}: ${this.colors.bw}${data.lon}${this.colors.nc}`,
            `${app.msgs.geoLabel_timeZone}: ${
                this.colors.bw}${data.timezone.replace(/_/g, ' ').replace(/\//g, ' / ')}${this.colors.nc}`,
            `ISP: ${this.colors.bw}${data.isp}${this.colors.nc}`
        ].join('\n'))
    },

    help(includeSections = ['header', 'usage', 'params', 'flags', 'cmds']) {
        app.prefix = `${this.colors.tlBG}${this.colors.blk} ${app.name.replace(/^@[^/]+\//, '')} ${this.colors.nc} `
        const helpSections = {
            header: [
                `\n├ ${app.prefix}${app.msgs.appCopyright}.`,
                `${app.prefix}${app.msgs.prefix_source}: ${app.urls.src}`
            ],
            usage: [
                `\n${this.colors.bw}o ${app.msgs.helpSection_usage}:${this.colors.nc}`,
                ` ${this.colors.bw}» ${this.colors.bg}${app.cmdFormat}${this.colors.nc}`
            ],
            params: [
                `\n${this.colors.bw}o ${app.msgs.helpSection_params}:${this.colors.nc}`,
                ` --config="path/to/file"     ${app.msgs.optionDesc_config}.`
            ],
            flags: [
                `\n${this.colors.bw}o ${app.msgs.helpSection_flags}:${this.colors.nc}`,
                ` -q, --quiet                 ${app.msgs.optionDesc_quiet}.`
            ],
            cmds: [
                `\n${this.colors.bw}o ${app.msgs.helpSection_cmds}:${this.colors.nc}`,
                ` -i, --init                  ${app.msgs.optionDesc_init}.`,
                ` -h, --help                  ${app.msgs.optionDesc_help}.`,
                ` -v, --version               ${app.msgs.optionDesc_version}.`
            ]
        }
        includeSections.forEach(section => // print valid arg elems
            helpSections[section]?.forEach(line => printHelpMsg(line, /header|usage/.test(section) ? 1 : 29)))
        console.info(
            `\n${app.msgs.info_moreHelp}, ${app.msgs.info_visit}: ${this.colors.bw}${app.urls.docs}${this.colors.nc}`)

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
            app.msgs.info_moreHelp}, ${app.msgs.info_type} ${app.name.split('/')[1]} --help' ${
                app.msgs.info_or} ${app.msgs.info_visit}\n${
                this.colors.bw}${app.urls.docs}${this.colors.nc}`
        )
    },

    version() {
        const globalVer = require('child_process')
            .execSync(`npm view ${JSON.stringify(app.name)} version`).toString().trim() || 'none'
        let localVer = 'none'

        try { // to set localVer from node_modules package.json
            const localPkgPath = require('path').resolve(process.cwd(), 'node_modules', app.name, 'package.json')
            if (require('fs').existsSync(localPkgPath)) localVer = require(localPkgPath).version || 'none'
        } catch (err) {
            this.error(`${app.msgs.error_readingLocalPkgVer}:`, err.message) }

        console.info(`\n${app.msgs.prefix_globalVer}: ${globalVer}\n${app.msgs.prefix_localVer}: ${localVer}`)
    }
}
