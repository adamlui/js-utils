module.exports = {
    helpSections(includeSections = ['header', 'usage', 'pathArgs', 'flags', 'paramOptions', 'infoCmds']) {
        app.prefix = `${app.colors.tlBG}${app.colors.blk} ${app.name.replace(/^@[^/]+\//, '')} ${app.colors.nc} `
        const helpSections = {
            header: [
                `\n├ ${app.prefix}© ${app.copyrightYear} ${app.author} under the ${app.license} license.`,
                `${app.prefix}Source: ${app.urls.src}`
            ],
            usage: [
                `\n${app.colors.bw}o Usage:${app.colors.nc}`,
                ` ${app.colors.bw}» ${app.colors.bg}${app.cmdFormat}${app.colors.nc}`
            ],
            pathArgs: [
                `\n${app.colors.bw}o Path arguments:${app.colors.nc}`,
                ' [inputPath]                             '
                    + 'Path to SCSS file or directory containing SCSS files to be compiled,'
                    + ' relative to the current working directory.',
                ' [outputPath]                            '
                    + 'Path to file or directory where CSS + sourcemap files will be stored,'
                    + ' relative to input root (if not provided, css/ is used).'
            ],
            flags: [
                `\n${app.colors.bw}o Boolean options:${app.colors.nc}`,
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
                `\n${app.colors.bw}o Parameter options:${app.colors.nc}`,
                '--ignores="dir/,file1.scss,file2.scss"   Files/directories to exclude from compilation.',
                '--comment="comment"                      Prepend header comment to compiled CSS.'
                                                        + ' Separate by line using \'\\n\'.'
            ],
            infoCmds: [
                `\n${app.colors.bw}o Info commands:${app.colors.nc}`,
                ' -h, --help                              Display help screen.',
                ' -v, --version                           Show version number.'
            ]
        }
        includeSections.forEach(section => // print valid arg elems
            helpSections[section]?.forEach(line => printHelpMsg(line, /header|usage/.test(section) ? 1 : 41)))
        console.info(`\nFor more help, please visit: ${app.colors.bw}${app.urls.docs}${app.colors.nc}`)

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
            app.colors.bw}${app.urls.docs}${app.colors.nc}`
        )
    },

    ifNotQuiet(msg) { if (!app.config.quietMode) console.info(msg) }
}
