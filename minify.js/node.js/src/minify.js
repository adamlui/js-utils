// © 2023–2026 Adam Lui & contributors under the MIT license.
// Source: https://github.com/adamlui/minify.js/tree/main/node.js/src
// Documentation: https://github.com/adamlui/minify.js/tree/main/node.js/docs

// Import LIBS
const fs = require('fs'),
      path = require('path'),
      uglifyJS = require('uglify-js')

// Init APP data
Object.assign(globalThis.app ??= {}, require(`${ __dirname.match(/[\\/]src/) ? '../' : './data/' }app.json`))
app.aliases = {
    minify: ['build', 'Build', 'compile', 'Compile', 'compress', 'Compress', 'Minify'],
    findJS: ['find', 'Find', 'findjs', 'findJs', 'Findjs', 'FindJs', 'FindJS', 'search', 'Search']
}

function findJS(searchDir, options = {}) {

    const docURL = 'https://github.com/adamlui/minify.js/tree/main/node.js/docs/#findjssearchdir-options',
          exampleCall = `findJS('assets/js', { verbose: false, dotFoldes: true })`

    const defaultOptions = {
        recursive: true,   // recursively search for nested files in searchDir passed
        verbose: true,     // enable logging
        dotFolders: false, // include dotfolders in file search
        dotFiles: false,   // include dotfiles in file search
        ignores: []        // files/dirs to exclude from search results
    }

    log.prefix = 'findJS()'

    // Validate searchDir
    if (typeof searchDir != 'string') {
            log.error('1st arg <searchDir> must be a string.')
            return log.helpURL(docURL)
    } else { // verify searchDir path existence
        const searchPath = path.resolve(process.cwd(), searchDir)
        if (!fs.existsSync(searchPath)) {
            log.error('1st arg <searchDir> must be an existing directory.')
            log.error(`${searchPath} does not exist.`)
            return log.helpURL(docURL)
        }
    }

    // Validate/init options
    if (!validateOptions({ options, defaultOptions, helpURL: docURL, exampleCall })) return
    options = { ...defaultOptions, ...options } // merge validated options w/ missing default ones
    if (options.ignoreFiles) options.ignores = [...options.ignores, ...options.ignoreFiles] // for bw compat

    // Search for unminified JS
    const dirFiles = fs.readdirSync(searchDir), jsFiles = []
    if (options.verbose && !options.isRecursing)
        log.info('Searching for unminified JS files...')
    dirFiles.forEach(file => {
        const filePath = path.resolve(searchDir, file)
        const shouldIgnore = options.ignores.some(pattern =>
            pattern.endsWith('/') ? filePath.split(path.sep).some(part => part == pattern.replace(/\/$/, ''))
          : file == pattern
        )
        if (shouldIgnore) {
            if (options.verbose) log.info(`** ${file} ignored`)
        } else if (fs.statSync(filePath).isDirectory() && file != 'node_modules' // folder found
            && options.recursive // only proceed if recursion enabled
            && (options.dotFolders || !file.startsWith('.')) // exclude dotfolders if prohibited
        ) jsFiles.push( // recursively find unminified JS in eligible dir
            ...findJS(filePath, { ...options, isRecursing: true }))
        else if (/\.js(?<!\.min\.js)$/.test(file) // minified JS file found
            && (options.dotFiles || !file.startsWith('.')) // exclude dotfiles if prohibited
        ) jsFiles.push(filePath) // store eligible unminified JS file for returning
    })

    // Log/return final result
    if (options.verbose && !options.isRecursing) {
        log.info('Search complete!',
            `${ jsFiles.length || 'No' } file${ jsFiles.length == 1 ? '' : 's' } found.`)
        if (findJS.caller?.name != 'minify' && typeof window != 'undefined')
            log.info('Check returned array.')
    }
    return options.isRecursing || jsFiles.length ? jsFiles : []
}

function minify(input, options = {}) {

    const docURL = 'https://github.com/adamlui/minify.js/tree/main/node.js/docs/#minifyinput-options',
          exampleCall = `minify('assets/js', { recursive: false, mangle: false })`

    const defaultOptions = {
        recursive: true,       // recursively search for nested files if dir path passed
        verbose: true,         // enable logging
        dotFolders: false,     // include dotfolders in file search
        dotFiles: false,       // include dotfiles in file search
        mangle: true,          // shorten var names (typically to one character)
        rewriteImports: false, // update import paths from .js to .min.js
        relativeOutput: false, // output files relative to each source file instead of to input root
        ignores: [],           // files/dirs to exclude from minification
        comment: ''            // header comment to prepend to minified code
    }

    log.prefix = 'minify()'

    // Validate input
    if (typeof input != 'string') {
        log.error('1st arg <input> must be a string.')
        return log.helpURL(docURL)
    }

    // Validate/init options
    if (!validateOptions({ options, defaultOptions, helpURL: docURL, exampleCall })) return
    options = { ...defaultOptions, ...options } // merge validated options w/ missing default ones
    if (options.ignoreFiles) options.ignores = [...options.ignores, ...options.ignoreFiles] // for bw compat

    // Minify JS based on input
    const minifyOptions = { mangle: options.mangle ? { toplevel: false } : false }
    try {
        const fd = fs.openSync(input, fs.constants.O_RDONLY),
              stats = fs.fstatSync(fd)

        if (stats.isFile()) {
            if (!/\.[cm]?jsx?$/i.test(input)) {
                const err = new Error(`${input} is not a JavaScript file (.js, .mjs, .cjs, .jsx)`)
                log.error(err.message)
                fs.closeSync(fd)
                return { code: '', srcPath: path.resolve(process.cwd(), input), error: err }
            }
            if (options.verbose) log.info(`** Minifying ${input}...`)
            const buffer = Buffer.alloc(stats.size)
            fs.readSync(fd, buffer, 0, stats.size, 0)
            fs.closeSync(fd)
            const minifyResult = uglifyJS.minify(buffer.toString('utf8'), minifyOptions)
            if (options.comment) minifyResult.code = prependComment(minifyResult.code, options.comment)
            if (minifyResult.error) log.error(minifyResult.error.message)
            else if (options.verbose && typeof window != 'undefined')
                log.info('Minification complete! Check returned object.')
            return { code: minifyResult.code, srcPath: path.resolve(process.cwd(), input), error: minifyResult.error }

        } else { // dir path passed
            fs.closeSync(fd)
            const minifyResult = findJS(input, options)?.map(jsPath => { // minify found JS files
                if (options.verbose) log.info(`** Minifying ${jsPath}...`)
                const srcCode = fs.readFileSync(jsPath, 'utf8'),
                      minifyResult = uglifyJS.minify(srcCode, minifyOptions),
                      relPath = options.relativeOutput ? undefined
                              : path.relative(path.resolve(process.cwd(), input), jsPath)
                if (options.comment) minifyResult.code = prependComment(minifyResult.code, options.comment)
                if (minifyResult.error) log.error(minifyResult.error.message)
                return { code: minifyResult.code, srcPath: jsPath, relPath, error: minifyResult.error }
            }).filter(data => !data.error) // filter out failed minifications
            if (options.verbose) {
                if (minifyResult.length && typeof window != 'undefined')
                    log.info('Minification complete! Check returned object.')
                else
                    log.info('No unminified JavaScript files processed.')
            }

            // Rewrite import paths if enabled and multiple files processed
            if (options.rewriteImports && minifyResult && minifyResult.length > 1) {
                if (options.verbose) log.info('** Rewriting import paths...')
                const minifiedFiles = minifyResult.map(file => path.basename(file.srcPath, '.js'))
                minifyResult.forEach(minifiedFile => minifiedFiles.forEach(filename => {
                    const reMatch = new RegExp(`(\\./?)?\\b${filename}\\.js(['"])`, 'g'),
                          before = minifiedFile.code
                    minifiedFile.code = minifiedFile.code.replace(reMatch, `$1${filename}.min.js$2`)
                    if (before != minifiedFile.code && options.verbose)
                        log.info(`Updated ${filename}.js in ${path.basename(minifiedFile.srcPath)}`)
                }))
                if (options.verbose) log.info('Import paths rewritten.')
            }

            return minifyResult
        }

    } catch (err) {
        if (err.code == 'ENOENT') { // minify based on src code arg
            if (options.verbose && !process.argv.some(arg => arg.includes('gulp')))
                log.info('** Minifying passed source code...')
            const minifyResult = uglifyJS.minify(input, minifyOptions)
            if (options.comment) minifyResult.code = prependComment(minifyResult.code, options.comment)
            if (minifyResult.error) log.error(minifyResult.error.message)
            else if (options.verbose && !process.argv.some(arg => arg.includes('gulp')))
                log.info('Minification complete! Check returned object.')
            return { code: minifyResult.code, srcPath: undefined, error: minifyResult.error }
        }
        throw err
    }
}

function prependComment(code, comment) {
    const shebangMatch = code.match(/^#!.*\n/)
    let shebang = ''
    if (shebangMatch) { shebang = shebangMatch[0] ; code = code.slice(shebang.length) }
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
        log.error(`${ optionsPos == '0th' ? '[O' : optionsPos + ' arg [o' }ptions] can only be an object of key/vals.`)
        log.info('Example valid call:', exampleCall)
        log.validOptions(defaultOptions) ; log.helpURL(helpURL)
        return false
    }
    for (const key in options) { // validate each key
        if (key == 'isRecursing' || !Object.prototype.hasOwnProperty.call(defaultOptions, key))
            continue // to next key
        else if (booleanOptions.includes(key) && typeof options[key] != 'boolean') {
            log.error(`[${key}] option can only be \`true\` or \`false\`.`)
            log.helpURL(helpURL)
            return false
        } else if (integerOptions.includes(key)) {
            options[key] = parseInt(options[key], 10)
            if (isNaN(options[key]) || options[key] < 1) {
                log.error(`[${key}] option can only be an integer > 0.`)
                log.helpURL(helpURL)
                return false
            }
        }
    }

    return true
}

const log = {
    prefix: app.name,

    error(...args) { console.error(`${this.prefix} » ERROR:`, ...args) },
    helpURL(url = app.urls?.docs) { this.info('For more help, please visit', url) },
    info(...args) { console.info(`${this.prefix} »`, ...args) },

    validOptions(options) {
        const strValidOptions = Object.keys(options).join(', ')
        const strDefaultOptions = JSON.stringify(options, undefined, 2)
            .replace(/"([^"]+)":/g, '$1:') // strip quotes from keys
            .replace(/"/g, '\'') // replace double quotes w/ single quotes
            .replace(/\n\s*/g, ' ') // condense to single line
        this.info(`Valid options: [${strValidOptions}]`)
        this.info(`If omitted, default settings are: ${strDefaultOptions}`)
    }
}

module.exports = { minify, findJS }
for (const fn in app.aliases) // export aliases
    app.aliases[fn].forEach(alias => module.exports[alias] = module.exports[fn]);
