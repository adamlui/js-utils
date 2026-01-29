module.exports = {
    helpCmdAndDocURL() {
        console.info(`\n${
            app.msgs.info_moreHelp}, ${app.msgs.info_type} ${app.name.split('/')[1]} --help' ${
                app.msgs.info_or} ${app.msgs.info_visit}\n${
                app.colors.bw}${app.urls.docs}${app.colors.nc}`
        )
    },

    helpSections(includeSections = ['header', 'usage', 'pathArgs', 'flags', 'paramOptions', 'infoCmds']) {
        app.prefix = `${app.colors.tlBG}${app.colors.blk} ${app.name.replace(/^@[^/]+\//, '')} ${app.colors.nc} `
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
            pathArgs: [
                `\n${app.colors.bw}o ${app.msgs.helpSection_pathArgs}:${app.colors.nc}`,
                ' [inputPath]                         '
                    + `${app.msgs.inputPathDesc_main}, `
                    + `${app.msgs.inputPathDesc_extra}.`,
                ' [outputPath]                        '
                    + `${app.msgs.outputPathDesc_main}, `
                    + `${app.msgs.outputPathDesc_extra}.`
            ],
            flags: [
                `\n${app.colors.bw}o ${app.msgs.helpSection_flags}:${app.colors.nc}`,
                ` -n, --dry-run                       ${app.msgs.optionDesc_dryRun}.`,
                ` -d, --include-dotfolders            ${app.msgs.optionDesc_dotfolders}.`,
                ` -D, --include-dotfiles              ${app.msgs.optionDesc_dotfiles}.`,
                ` -R, --no-recursion                  ${app.msgs.optionDesc_noRecursion}.`,
                ` -M, --no-mangle                     ${app.msgs.optionDesc_noMangle}.`,
                ` -X, --no-filename-change            ${app.msgs.optionDesc_noFilenameChange}`,
                ` -i, --rewrite-imports               ${app.msgs.optionDesc_rewriteImports}.`,
                ` -c, --copy                          ${app.msgs.optionDesc_copy}.`,
                ` -r, --relative-output               ${app.msgs.optionDesc_relativeOutput}.`,
                ` -q, --quiet                         ${app.msgs.optionDesc_quiet}.`
            ],
            paramOptions: [
                `\n${app.colors.bw}o ${app.msgs.helpSection_paramOptions}:${app.colors.nc}`,
                `--ignores="dir/,file1.js,file2.js"   ${app.msgs.optionDesc_ignores}.`,
                `--comment="comment"                  ${app.msgs.optionDesc_commentMain}.`
                                                 +  ` ${app.msgs.optionDesc_commentExtra}.`
            ],
            infoCmds: [
                `\n${app.colors.bw}o ${app.msgs.helpSection_infoCmds}:${app.colors.nc}`,
                ` -h, --help                          ${app.msgs.optionDesc_help}`,
                ` -v, --version                       ${app.msgs.optionDesc_version}.`
            ]
        }
        includeSections.forEach(section => // print valid arg elems
            helpSections[section]?.forEach(line => printHelpMsg(line, /header|usage/.test(section) ? 1 : 37)))
        console.info(
            `\n${app.msgs.info_moreHelp}, ${app.msgs.info_visit}: ${app.colors.bw}${app.urls.docs}${app.colors.nc}`)

        function printHelpMsg(msg, indent) { // wrap msg + indent 2nd+ lines
            const terminalWidth = process.stdout.columns || 80,
                  lines = [], words = msg.match(/\S+|\s+/g),
                  prefix = '| '

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

    ifNotQuiet(msg) { if (!app.config.quietMode) console.info(msg) },

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
