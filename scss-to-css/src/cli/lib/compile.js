const log = require(`./log${env.modExt}`)

module.exports = {
    scss({ srcFiles, inputPath, inputArg, outputArg }) {
        const { compile } = require(`../../scss-to-css${env.modExt}`),
                fs = require('fs'),
                path = require('path')

        // Build array of compilation data
        const failedPaths = [] ; let compileData = []
        if (!cli.config.relativeOutput && fs.statSync(inputPath).isDirectory()) {
            const compileResult = compile(inputPath, {
                verbose: false,
                minify: !cli.config.noMinify,
                comment: cli.config.comment,
                relativeOutput: false,
                recursive: !cli.config.noRecursion,
                dotFolders: cli.config.includeDotFolders,
                sourceMaps: !cli.config.noSourceMaps,
                ignores: cli.config.ignores
            })
            if (compileResult) {
                if (compileResult.error) failedPaths.push(inputPath)
                else compileData = [].concat(compileResult)
            }
        } else compileData = srcFiles.map(scssPath => {
            const compileResult = compile(scssPath, {
                verbose: !cli.config.quietMode,
                minify: !cli.config.noMinify,
                sourceMaps: !cli.config.noSourceMaps,
                comment: cli.config.comment
            })
            if (compileResult.error) failedPaths.push(scssPath)
            return compileResult
        }).filter(compileResult => !compileResult.error)

        // Print compilation summary
        if (!cli.config.quietMode) {
            const compiledCnt = compileData.length,
                  cssCntSuffix = compiledCnt == 1 ? '' : 's'
            if (compiledCnt) {
                log.success(`${cli.msgs.info_compilationComplete}!`)
                log.data(`${compiledCnt} CSS ${cli.msgs.info_file}${cssCntSuffix}${
                    !cli.config.noSourceMaps ? ` + ${compiledCnt} ${cli.msgs.info_srcMap}${cssCntSuffix}`
                        : '' } ${cli.msgs.info_generated}.`
                )
            } else
                console.info(`${cli.msgs.info_noSCSSfilesProcessed}.`)
            if (failedPaths.length) {
                log.error(`${failedPaths.length} ${cli.msgs.info_file}${ failedPaths.length == 1 ? '' : 's' }`,
                    `${cli.msgs.info_failedToCompile}:`)
                failedPaths.forEach(path => log.ifNotQuiet(path))
            }
        }
        if (!compileData?.length) return

        // Copy single result code to clipboard if --copy passed
        if (cli.config.copy && compileData?.length == 1) {
            log.data(compileData[0].code)
            log.ifNotQuiet(`\n${cli.msgs.info_copyingToClip}...`)
            require('node-clipboardy').writeSync(compileData[0].code)

        } else { // write array data to files
            log.ifNotQuiet(`\n${cli.msgs.info_writing}${ compileData?.length > 1 ? 's' : '' }...`)
            compileData?.forEach(({ code, srcMap, srcPath, relPath }) => {
                let outputDir, outputFilename
                if (!cli.config.relativeOutput && relPath) { // preserve folder structure
                    const outputPath = path.resolve(process.cwd(), outputArg || 'css'),
                          relativeDir = path.dirname(relPath)
                    outputDir = relativeDir != '.' ? path.join(outputPath, relativeDir) : outputPath
                    outputFilename =
                        `${path.basename(srcPath, path.extname(srcPath))}${ cli.config.noMinify ? '' : '.min' }.css`
                } else {
                    outputDir = path.join(
                        path.dirname(srcPath), // path of file to be minified
                        outputArg.endsWith('.css') ? path.dirname(outputArg) // or path from file output arg
                            : outputArg || 'css' // or path from folder outputArg or css/ if no outputArg passed
                    )
                    outputFilename = `${
                        outputArg.endsWith('.css') && /s[ac]ss$/.test(inputArg)
                            ? path.basename(outputArg).replace(/(\.min)?\.css$/, '')
                                : path.basename(srcPath, path.extname(srcPath))
                    }.min.css`
                }                const outputPath = path.join(outputDir, outputFilename)
                fs.mkdirSync(outputDir, { recursive: true })
                fs.writeFileSync(outputPath, code, 'utf8')
                log.ifNotQuiet(`  ${log.colors.bg}✓${log.colors.nc} ${path.relative(process.cwd(), outputPath)}`)
                if (!cli.config.noSourceMaps) fs.writeFileSync(`${outputPath}.map`, JSON.stringify(srcMap), 'utf8')
                log.ifNotQuiet(`  ${log.colors.bg}✓${log.colors.nc} ${path.relative(process.cwd(), outputPath)}.map`)
            })
        }
    }
}