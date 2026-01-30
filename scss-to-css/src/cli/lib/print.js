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
    error(...args) { console.error(`\n${this.colors.br}ERROR:`, ...args, this.colors.nc) },
    errorAndExit(...args) { this.error(...args) ; this.helpCmdAndDocURL() ; process.exit(1) },
    ifNotQuiet(msg) { if (!app.config.quietMode) console.info(msg) },
    info(msg) { console.info(`\n${this.colors.by}${msg}${this.colors.nc}`) },
    success(msg) { console.log(`\n${this.colors.bg}${msg}${this.colors.nc}`) },

    help(includeSections = ['header', 'usage', 'pathArgs', 'flags', 'paramOptions', 'infoCmds']) {
        app.prefix = `${this.colors.tlBG}${this.colors.blk} ${app.name.replace(/^@[^/]+\//, '')} ${this.colors.nc} `
        const helpSections = {
            header: [
                `\n├ ${app.prefix}© ${app.copyrightYear} ${app.author} under the ${app.license} license.`,
                `${app.prefix}Source: ${app.urls.src}`
            ],
            usage: [
                `\n${this.colors.bw}o Usage:${this.colors.nc}`,
                ` ${this.colors.bw}» ${this.colors.bg}${app.cmdFormat}${this.colors.nc}`
            ],
            pathArgs: [
                `\n${this.colors.bw}o Path arguments:${this.colors.nc}`,
                ' [inputPath]                             '
                    + 'Path to SCSS file or directory containing SCSS files to be compiled,'
                    + ' relative to the current working directory.',
                ' [outputPath]                            '
                    + 'Path to file or directory where CSS + sourcemap files will be stored,'
                    + ' relative to input root (if not provided, css/ is used).'
            ],
            flags: [
                `\n${this.colors.bw}o Boolean options:${this.colors.nc}`,
                ' -n, --dry-run                           Don\'t actually compile the file(s),'
                                                        + ' just show if they will be processed.',
                ' -d, --include-dotfolders                Include dotfolders in file search.',
                ' -S, --no-source-maps                    Prevent source maps from being generated.',
                ' -M, --no-minify                         Disable minification of output CSS.',
                ' -R, --no-recursion                      Disable recursive file searching.',
                ' -r, --relative-output                   Output files relative to each source file instead of to input root.',
                ' -c, --copy                              Copy compiled CSS to clipboard instead of writing to file'
                                                        + ' if single source file is processed.',
                ' -q, --quiet                             Suppress all logging except errors.'
            ],
            paramOptions: [
                `\n${this.colors.bw}o Parameter options:${this.colors.nc}`,
                '--ignores="dir/,file1.scss,file2.scss"   Files/directories to exclude from compilation.',
                '--comment="comment"                      Prepend header comment to compiled CSS.'
                                                        + ' Separate by line using \'\\n\'.'
            ],
            infoCmds: [
                `\n${this.colors.bw}o Info commands:${this.colors.nc}`,
                ' -h, --help                              Display help screen.',
                ' -v, --version                           Show version number.'
            ]
        }
        includeSections.forEach(section => // print valid arg elems
            helpSections[section]?.forEach(line => printHelpMsg(line, /header|usage/.test(section) ? 1 : 41)))
        console.info(`\nFor more help, please visit: ${this.colors.bw}${app.urls.docs}${this.colors.nc}`)

        function printHelpMsg(msg, indent) { // wrap msg + indent 2nd+ lines
            const terminalWidth = process.stdout.columns || 80,
                  lines = [],
                  words = msg.match(/\S+|\s+/g),
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
        console.info(
            `\nFor more help, type 'scss-to-css --help' or visit\n${
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
        console.info(`\nGlobal version: ${globalVer}\nLocal version: ${localVer}`)
    }
}
