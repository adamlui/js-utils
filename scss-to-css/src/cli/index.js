#!/usr/bin/env node

(async () => {
    'use strict'

    const args = process.argv.slice(2)
    globalThis.env = {
        debugMode: args.some(arg => /^--?debug(?:-?mode)?$/.test(arg)),
        devMode: /[\\/]src(?:[\\/]|$)/i.test(__dirname)
    }

    // Import LIBS
    const clipboardy = require('node-clipboardy'),
          fs = require('fs'),
        { generateRandomLang, getMsgs, getSysLang } = require(`./lib/language${ env.devMode ? '' : '.min' }.js`),
          github = require(`./lib/github${ env.devMode ? '' : '.min' }.js`),
          log = require(`./lib/log${ env.devMode ? '' : '.min' }.js`),
          path = require('path'),
          scssToCSS = require(`../scss-to-css${ env.devMode ? '' : '.min' }.js`),
          settings = require(`./lib/settings${ env.devMode ? '' : '.min' }.js`)

    // Init CLI data
    Object.assign(globalThis.cli ??= {}, require(`../${ env.devMode ? '../' : './data/' }package-data.json`))
    env.sysLang = env.debugMode ? generateRandomLang({ excludes: ['en'] }) : getSysLang()
    cli.msgs = await getMsgs(env.sysLang)
    cli.urls.docs += '/#-command-line-usage'
    if (!(env.sysLang).startsWith('en')){ // localize cli.urls.docs
        cli.docLocale = env.sysLang.replace('_', '-').toLowerCase()
        cli.docLocales = await github.getDirContents({ path: 'docs', type: 'dir' })
        if (cli.docLocales.includes(cli.docLocale))
            cli.urls.docs = cli.urls.docs.replace(/\/#.*$/g, `/${cli.docLocale}#readme`)
    }

    // Exec CMD arg if passed
    for (const arg of args) {
        if (settings.controls.init.regex.test(arg)) return settings.initConfigFile()
        else if (settings.controls.help.regex.test(arg)) return log.help()
        else if (settings.controls.version.regex.test(arg)) return log.version()
    }

    // Init I/O args
    const [inputArg = '', outputArg = ''] = // default to empty strings for error-less handling
        args // exclude executable and script paths
            .filter(arg => !arg.startsWith('-')) // exclude flags
            .map(arg => arg.replace(/^\/*/, '')) // clean leading slashes to avoid parsing system root

    // Validate input arg (output arg can be anything)
    let inputPath = path.resolve(process.cwd(), inputArg)
    if (inputArg && !fs.existsSync(inputPath)) {
        const scssInputPath = inputPath + '.scss' // append '.scss' in case ommitted from intended filename
        if (!fs.existsSync(scssInputPath)) {
            log.error(`${cli.msgs.error_firstArgNotExist}.\n${inputPath} ${cli.msgs.error_doesNotExist}.`)
            log.success(`${cli.msgs.info_exampleValidCmd}: \n» scss-to-css . output.min.css`)
            log.helpCmdAndDocURL()
            process.exit(1)
        } else inputPath = scssInputPath
    }

    // Find all eligible SCSS files or arg-passed file
    settings.load()
    const scssFiles = inputPath.endsWith('.scss') && !fs.statSync(inputPath).isDirectory() ? [inputPath]
        : scssToCSS.findSCSS(inputPath, {
            recursive: !cli.config.noRecursion,
            verbose: !cli.config.quietMode,
            ignores: (cli.config.ignores?.split(',') ?? []).map(ignore => ignore.trim())
        })

    if (cli.config.dryRun) { // -n or --dry-run passed
        if (scssFiles.length) { // print files to be processed
            log.info(`${cli.msgs.info_scssFilesToBeCompiled}:`)
            scssFiles.forEach(file => console.info(file))
        } else // no files found
            log.info(`\n${cli.msgs.info_noSCSSfilesWillBeCompiled}.`)

    } else { // actually compile SCSS files

        // Build array of compilation data
        const failedPaths = [] ; let compileData = []
        if (!cli.config.relativeOutput && fs.statSync(inputPath).isDirectory()) {
            const compileResult = scssToCSS.compile(inputPath, {
                verbose: !cli.config.quietMode,
                minify: !cli.config.noMinify,
                comment: cli.config.comment?.replace(/\\n/g, '\n'),
                relativeOutput: false,
                recursive: !cli.config.noRecursion,
                dotFolders: cli.config.includeDotFolders,
                sourceMaps: !cli.config.noSourceMaps,
                ignores: cli.config.ignores ? cli.config.ignores.split(',').map(ignore => ignore.trim()) : []
            })
            if (Array.isArray(compileResult)) compileData = compileResult
            if (compileResult) {
                if (compileResult.error) failedPaths.push(inputPath)
                else compileData = [].concat(compileResult)
            }
        } else compileData = scssFiles.map(scssPath => {
            const compileResult = scssToCSS.compile(scssPath, {
                verbose: !cli.config.quietMode,
                minify: !cli.config.noMinify,
                sourceMaps: !cli.config.noSourceMaps,
                comment: cli.config.comment?.replace(/\\n/g, '\n')
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
            clipboardy.writeSync(compileData[0].code)

        } else { // write array data to files
            log.ifNotQuiet(`\n${cli.msgs.info_writing}${ compileData?.length > 1 ? 's' : '' }...`)
            compileData?.forEach(({ code, srcMap, srcPath, relPath }) => {
                let outputDir, outputFilename
                if (!cli.config.relativeOutput && relPath) { // preserve folder structure
                    const outputPath = path.resolve(process.cwd(), outputArg || 'css'),
                          relativeDir = path.dirname(relPath)
                    outputDir = relativeDir != '.' ? path.join(outputPath, relativeDir) : outputPath
                    outputFilename = `${path.basename(srcPath, '.scss')}${ cli.config.noMinify ? '' : '.min' }.css`
                } else {
                    outputDir = path.join(
                        path.dirname(srcPath), // path of file to be minified
                        outputArg.endsWith('.css') ? path.dirname(outputArg) // or path from file output arg
                            : outputArg || 'css' // or path from folder outputArg or css/ if no outputArg passed
                    )
                    outputFilename = `${
                        outputArg.endsWith('.css') && inputArg.endsWith('.scss')
                            ? path.basename(outputArg).replace(/(\.min)?\.css$/, '')
                                : path.basename(srcPath, '.scss')
                    }.min.css`
                }
                const outputPath = path.join(outputDir, outputFilename)
                fs.mkdirSync(outputDir, { recursive: true })
                fs.writeFileSync(outputPath, code, 'utf8')
                log.ifNotQuiet(`  ${log.colors.bg}✓${log.colors.nc} ${path.relative(process.cwd(), outputPath)}`)
                if (!cli.config.noSourceMaps) fs.writeFileSync(`${outputPath}.map`, JSON.stringify(srcMap), 'utf8')
                log.ifNotQuiet(`  ${log.colors.bg}✓${log.colors.nc} ${path.relative(process.cwd(), outputPath)}.map`)
            })
        }
    }

})()
