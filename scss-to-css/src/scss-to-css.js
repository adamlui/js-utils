// © 2024–2026 Adam Lui & contributors under the MIT license.
// Source: https://github.com/adamlui/scss-to-css/tree/main/src
// Documentation: https://github.com/adamlui/scss-to-css/tree/main/docs

const fs = require('fs'),
      path = require('path'),
      sass = require('sass')

Object.assign(globalThis.api ??= {},
    require(`${ /[\\/]src(?:[\\/]|$)/i.test(__dirname) ? '../' : './data/' }package-data.json`))
api.aliases = {
    compile: ['build', 'Build', 'Compile', 'compress', 'Compress', 'minify', 'Minify'],
    findSCSS: ['find', 'Find', 'findscss', 'findScss', 'Findscss', 'FindScss', 'FindSCSS', 'search', 'Search']
}

function findSCSS(searchDir, options = {}) {

    const docURL = 'https://github.com/adamlui/scss-to-css/tree/main/docs/#findscsssearchdir-options',
          exampleCall = `findSCSS('assets/scss', { verbose: false, dotFolders: true })`

    const defaultOptions = {
        recursive: true,   // recursively search for nested files in searchDir passed
        verbose: true,     // show logging in console/terminal
        dotFolders: false, // include dotfolders in file search
        ignores: []        // files/dirs to exclude from search results
    }

    logger.prefix = 'findSCSS()'

    // Validate searchDir
    if (typeof searchDir != 'string')
        logger.errHelpURLandThrow({ errMsg: '1st arg <searchDir> must be a string.', helpURL: docURL })
    else { // verify searchDir path existence
        const searchPath = path.resolve(process.cwd(), searchDir)
        if (!fs.existsSync(searchPath)) {
            logger.error('1st arg <searchDir> must be an existing directory.')
            logger.error(`${searchPath} does not exist.`)
            return logger.helpURL(docURL)
        }
    }

    // Validate/init options
    if (!validateOptions({ options, defaultOptions, helpURL: docURL, exampleCall })) return
    options = { ...defaultOptions, ...options } // merge validated options w/ missing default ones
    if (options.ignoreFiles) options.ignores = [...options.ignores, ...options.ignoreFiles] // for bw compat

    // Search for files
    const dirFiles = fs.readdirSync(searchDir), scssFiles = []
    if (options.verbose && !options.isRecursing)
        logger.info('Searching for files...')
    dirFiles.forEach(file => {
        const filePath = path.resolve(searchDir, file)
        const shouldIgnore = options.ignores.some(pattern =>
            pattern.endsWith('/') ? filePath.split(path.sep).some(part => part == pattern.replace(/\/$/, ''))
          : file == pattern
        )
        if (shouldIgnore) {
            if (options.verbose) logger.info(`** ${file} ignored`)
        } else if (fs.statSync(filePath).isDirectory() && file != 'node_modules' // folder found
            && options.recursive // only proceed if recursion enabled
            && (options.dotFolders || !file.startsWith('.')) // exclude dotfolders if prohibited
        ) scssFiles.push( // recursively find files in eligible dir
            ...findSCSS(filePath, { ...options, isRecursing: true }))
        else if (/s[ac]ss$/.test(file)) // .s[ac]ss file found
            scssFiles.push(filePath) // store for returning
    })

    // Log/return final results
    if (options.verbose && !options.isRecursing) {
        logger.info('Search complete!',
            `${ scssFiles.length || 'No' } file${ scssFiles.length == 1 ? '' : 's' } found.`)
        if (findSCSS.caller?.name != 'compile' && typeof window != 'undefined')
            logger.info('Check returned array.')
    }
    return options.isRecursing || scssFiles.length ? scssFiles : []
}

function compile(input, options = {}) {

    const docURL = 'https://github.com/adamlui/scss-to-css/tree/main/docs/#compileinput-options',
          exampleCall = `compile('assets/scss', { recursive: false, minify: false })`

    const defaultOptions = {
        recursive: true,       // recursively search for nested files if dir path passed
        verbose: true,         // show logging in console/terminal
        dotFolders: false,     // include dotfolders in file search
        minify: true,          // minify output CSS
        sourceMaps: true,      // generate CSS source maps
        relativeOutput: false, // output files relative to each source file instead of to input root
        ignores: [],           // files/dirs to exclude from compilation
        comment: ''            // header comment to prepend to compiled CSS
    }

    logger.prefix = 'compile()'

    // Validate input
    if (typeof input != 'string')
        logger.errHelpURLandThrow({ errMsg: '1st arg <input> must be a string.', helpURL: docURL })

    // Validate/init options
    if (!validateOptions({ options, defaultOptions, helpURL: docURL, exampleCall })) return
    options = { ...defaultOptions, ...options } // merge validated options w/ missing default ones
    if (options.ignoreFiles) options.ignores = [...options.ignores, ...options.ignoreFiles] // for bw compat

    // Compile SCSS based on input
    const compileOptions = {
        style: options.minify ? 'compressed' : 'expanded',
        sourceMap: options.sourceMaps,
        charset: false // prevent UTF-8 BOM in output
    }
    if (fs.existsSync(input)) { // compile based on path arg
        if (/s[ac]ss$/.test(input) && fs.statSync(input).isFile()) { // file path passed
            if (options.verbose) logger.info(`** Compiling ${input}...`)
            try { // to compile file passed
                const compileResult = sass.compile(input, compileOptions)
                if (options.comment)
                    compileResult.css = prependComment(compileResult.css, options.comment)
                if (options.verbose && typeof window != 'undefined')
                    logger.info('Compilation complete! Check returned object.')
                return {
                    code: compileResult.css, srcMap: compileResult.sourceMap,
                    srcPath: path.resolve(process.cwd(), input), error: undefined
                }
            } catch (err) {
                logger.error(err.message)
                return { code: undefined, srcMap: undefined, srcPath: undefined, error: err }
            }
        } else { // dir path passed
            const compileResult = findSCSS(input, options)?.map(scssPath => { // compile found SCSS files
                if (options.verbose) logger.info(`** Compiling ${scssPath}...`)
                try { // to compile found file
                    const compileResult = sass.compile(scssPath, compileOptions),
                          relPath = options.relativeOutput ? undefined
                                  : path.relative(path.resolve(process.cwd(), input), scssPath)
                    if (options.comment)
                        compileResult.css = prependComment(compileResult.css, options.comment)
                    return {
                        code: compileResult.css, srcMap: compileResult.sourceMap, srcPath: scssPath, relPath,
                        error: undefined
                    }
                } catch (err) {
                    logger.error(err.message)
                    return { code: undefined, srcMap: undefined, srcPath: undefined, error: err }
                }
            }).filter(data => !data.error ) // filter out failed compilations
            if (options.verbose) {
                if (compileResult.length && typeof window != 'undefined')
                    logger.info('Compilation complete! Check returned object.')
                else
                    logger.info('No SCSS files processed.')
            }
            return compileResult
        }
    } else { // compile based on src code arg
        if (options.verbose)
            logger.info('** Compiling passed source code...')
        try { // to compile passed src code
            const compileResult = sass.compileString(input, compileOptions)
            if (options.comment)
                compileResult.css = prependComment(compileResult.css, options.comment)
            return { code: compileResult.css, srcMap: compileResult.sourceMap, srcPath: undefined, error: undefined }
        } catch (err) {
            logger.error(err.message)
            return { code: undefined, srcMap: undefined, srcPath: undefined, error: err }
        }
    }
}

function prependComment(code, comment) {
    let shebang = '' ; const shebangMatch = code.match(/^#!.*\n/)
    if (shebangMatch) { // slice shebang from code to memory
        shebang = shebangMatch[0] ; code = code.slice(shebang.length) }
    return `${shebang}/**\n${comment.split('\n').map(line => ` * ${line}`).join('\n')}\n */\n${code}`
}

function validateOptions({ options, defaultOptions, helpURL, exampleCall }) {

    // Init option strings/types
    const booleanOptions = Object.keys(defaultOptions).filter(key => typeof defaultOptions[key] == 'boolean'),
          integerOptions = Object.keys(defaultOptions).filter(key => Number.isInteger(defaultOptions[key]))

    // Validate options
    if (typeof options != 'object') { // validate as obj
        let optionsPos = exampleCall.split(',').findIndex(arg => arg.trim().startsWith('{')) +1
        optionsPos += ['st','nd','rd'][optionsPos -1] || 'th' // append ordinal suffix
        logger.error(`${ optionsPos == '0th' ? '[O' : optionsPos + ' arg [o' }ptions] can only be an object of key/vals.`)
        logger.info('Example valid call:', exampleCall)
        logger.validOptions(defaultOptions) ; logger.helpURL(helpURL)
        return false
    }
    for (const key in options) { // validate each key
        if (key == 'isRecursing' || !Object.prototype.hasOwnProperty.call(defaultOptions, key))
            continue // to next key
        else if (booleanOptions.includes(key) && typeof options[key] != 'boolean') {
            logger.error(`[${key}] option can only be \`true\` or \`false\`.`)
            logger.helpURL(helpURL)
            return false
        } else if (integerOptions.includes(key)) {
            options[key] = parseInt(options[key], 10)
            if (isNaN(options[key]) || options[key] < 1) {
                logger.error(`[${key}] option can only be an integer > 0.`)
                logger.helpURL(helpURL)
                return false
            }
        }
    }

    return true
}

const logger = {
    prefix: api.name,

    errHelpURLandThrow({ errMsg, helpURL }) { this.error(errMsg) ; this.helpURL(helpURL) ; throw new Error(errMsg) },
    error(...args) { console.error(`${this.prefix} » ERROR:`, ...args) },
    helpURL(url = api.urls?.docs) { this.info('For more help, please visit', url) },
    info(...args) { console.info(`${this.prefix} »`, ...args) },

    validOptions(options) {
        const strValidOptions = Object.keys(options).join(', ')
        const strDefaultOptions = JSON.stringify(options, null, 2)
            .replace(/"([^"]+)":/g, '$1:') // strip quotes from keys
            .replace(/"/g, '\'') // replace double quotes w/ single quotes
            .replace(/\n\s*/g, ' ') // condense to single line
        this.info(`Valid options: [${strValidOptions}]`)
        this.info(`If omitted, default settings are: ${strDefaultOptions}`)
    }
}

module.exports = { compile, findSCSS }
for (const fn in api.aliases) // export aliases
    api.aliases[fn].forEach(alias => module.exports[alias] ??= module.exports[fn]);
