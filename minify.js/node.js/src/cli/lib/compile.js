module.exports = {
    js({ srcFiles, inputPath, inputArg, outputArg }) {
        const fs = require('fs'),
            { minify } = require(`../../minify${ env.modes.dev ? '' : '.min' }.js`),
              path = require('path')

        // Build array of minification data
        const failedPaths = [] ; let minifyData = []
        if (!cli.config.relativeOutput && fs.statSync(inputPath).isDirectory()) {
            const minifyResult = minify(inputPath, {
                verbose: false,
                mangle: !cli.config.noMangle,
                comment: cli.config.comment,
                relativeOutput: false,
                recursive: !cli.config.noRecursion,
                dotFolders: cli.config.includeDotFolders,
                dotFiles: cli.config.includeDotFiles,
                rewriteImports: cli.config.rewriteImports,
                ignores: cli.config.ignores
            })
            if (minifyResult) {
                if (minifyResult.error) failedPaths.push(inputPath)
                else minifyData = [].concat(minifyResult)
            }
        } else minifyData = srcFiles.map(jsPath => {
            const minifyResult = minify(jsPath, {
                verbose: !cli.config.quietMode,
                mangle: !cli.config.noMangle,
                comment: cli.config
            })
            if (minifyResult.error) failedPaths.push(jsPath)
            return minifyResult
        }).filter(minifyResult => !minifyResult.error)

        // Print minification summary
        if (!cli.config.quietMode) {
            if (minifyData?.length) {
                log.success(`${cli.msgs.info_minComplete}!`)
                log.data(`${minifyData.length} ${cli.msgs.info_file}`
                    + `${ minifyData.length == 1 ? '' : 's' } ${cli.msgs.info_minified}.`)
            } else
                console.info(`${cli.msgs.info_noFilesProcessed}.`)
            if (failedPaths.length) {
                log.error(`${failedPaths.length} ${cli.msgs.info_file}${ failedPaths.length == 1 ? '' : 's' }`,
                    `${cli.msgs.info_failedToMinify}:`)
                failedPaths.forEach(path => console.info(path))
            }
        }
        if (!minifyData?.length) return

        // Copy single result code to clipboard if --copy passed
        if (cli.config.copy && minifyData?.length == 1) {
            log.data(minifyData[0].code)
            log.ifNotQuiet(`\n${cli.msgs.info_copyingToClip}...`)
            require('node-clipboardy').writeSync(minifyData[0].code)

        } else { // write array data to files
            log.ifNotQuiet(`${cli.msgs.info_writing}${ minifyData?.length > 1 ? 's' : '' }...`)
            minifyData?.forEach(({ code, srcPath, relPath }) => {
                let outputDir, outputFilename
                if (!cli.config.relativeOutput && relPath) { // preserve folder structure
                    const outputPath = path.resolve(process.cwd(), outputArg || 'min'),
                          relativeDir = path.dirname(relPath)
                    outputDir = relativeDir != '.' ? path.join(outputPath, relativeDir) : outputPath
                    outputFilename = `${path.basename(srcPath, '.js')}${ cli.config.noFilenameChange ? '' : '.min' }.js`
                } else {
                    outputDir = path.join(
                        path.dirname(srcPath), // path of file to be minified
                        outputArg.endsWith('.js') ? path.dirname(outputArg) // + path from file outputArg
                            : outputArg || 'min' // or path from folder outputArg or min/ if no outputArg passed
                    )
                    outputFilename = `${
                        outputArg.endsWith('.js') && inputArg.endsWith('.js')
                            ? path.basename(outputArg).replace(/(\.min)?\.js$/, '')
                                : path.basename(srcPath, '.js')
                    }${ cli.config.noFilenameChange ? '' : '.min' }.js`
                }
                const outputPath = path.join(outputDir, outputFilename)
                fs.mkdirSync(outputDir, { recursive: true })
                fs.writeFileSync(outputPath, code, 'utf8')
                log.ifNotQuiet(`  ${log.colors.bg}✓${log.colors.nc} ${path.relative(process.cwd(), outputPath)}`)
            })
        }
    }
}
