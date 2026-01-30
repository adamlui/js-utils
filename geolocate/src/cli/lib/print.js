module.exports = {

    colors: {
        nc: '\x1b[0m',    // no color
        br: '\x1b[1;91m', // bright red
        by: '\x1b[1;33m', // bright yellow
        bg: '\x1b[1;92m', // bright green
        bw: '\x1b[1;97m', // bright white
        blk: '\x1b[30m',  // black
        tlBG: '\x1b[106m' // teal bg
    },

    data(msg) { console.log(`\n${this.colors.bw}${msg}${this.colors.nc}`) },
    error(...args) { console.error(`\n${this.colors.br}${app.msgs.prefix_error}:`, ...args, this.colors.nc) },
    errorAndExit(...args) { this.error(...args) ; this.helpCmdAndDocURL() ; process.exit(1) },
    ifNotQuiet(msg) { if (!app.config.quietMode) console.info(msg) },
    info(msg) { console.info(`\n${this.colors.by}${msg}${this.colors.nc}`) },
    success(msg) { console.log(`\n${this.colors.bg}${msg}${this.colors.nc}`) },

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

    help(includeSections = ['header', 'usage', 'configOptions', 'infoCmds']) {
        app.prefix = `${this.colors.tlBG}${this.colors.blk} ${app.name.replace(/^@[^/]+\//, '')} ${this.colors.nc} `
        const helpSections = {
            header: [
                `\n├ ${app.prefix}${ app.msgs.appCopyright || `© ${
                       app.copyrightYear} ${app.author} under the ${app.license} license`
                }.`,
                `${app.prefix}${app.msgs.prefix_source}: ${app.urls.src}`
            ],
            usage: [
                `\n${this.colors.bw}o ${app.msgs.helpSection_usage}:${this.colors.nc}`,
                ` ${this.colors.bw}» ${this.colors.bg}${app.cmdFormat}${this.colors.nc}`
            ],
            configOptions: [
                `\n${this.colors.bw}o ${app.msgs.helpSection_configOptions}:${this.colors.nc}`,
                ` -q, --quiet                 ${app.msgs.optionDesc_quiet}.`
            ],
            infoCmds: [
                `\n${this.colors.bw}o ${app.msgs.helpSection_infoCmds}:${this.colors.nc}`,
                ` -h, --help                  ${app.msgs.optionDesc_help}`,
                ` -v, --version               ${app.msgs.optionDesc_version}.`
            ]
        }
        includeSections.forEach(section => // print valid arg elems
            helpSections[section]?.forEach(line => printHelpMsg(line, /header|usage/.test(section) ? 1 : 29)))
        console.info(
            `\n${app.msgs.info_moreHelp}, ${app.msgs.info_visit}: ${this.colors.bw}${app.urls.docs}${this.colors.nc}`)

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
