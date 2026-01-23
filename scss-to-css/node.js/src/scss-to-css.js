// © 2024 Adam Lui & contributors under the MIT license.
// Source: https://github.com/adamlui/scss-to-css/tree/main/node.js/src
// Documentation: https://github.com/adamlui/scss-to-css/tree/main/node.js/docs

const fs = require('fs'),
      path = require('path'),
      sass = require('sass')

globalThis.app = require(`../${ __dirname.match(/[\\/]src[\\/]/) ? '../' : 'data/' }app.json`)

function findSCSS(searchDir, options = {}) {

    const docURL = `${app.urls.docs}/#findscsssearchdir-options`,
          exampleCall = `findSCSS('assets/scss', { verbose: false, dotFolders: true })`,
          logPrefix = 'findSCSS() » '

    const defaultOptions = {
        recursive: true,   // recursively search for nested files in searchDir passed
        verbose: true,     // enable logging
        dotFolders: false, // include dotfolders in file search
        ignores: []        // files/dirs to exclude from search results
    }

    // Validate searchDir
    if (typeof searchDir != 'string') {
            console.error(`${logPrefix}ERROR: 1st arg <searchDir> must be a string.`)
            console.info(`${logPrefix}For more help, please visit ${docURL}`)
            return
    } else { // verify searchDir path existence
        const searchPath = path.resolve(process.cwd(), searchDir)
        if (!fs.existsSync(searchPath)) {
            console.error(`${logPrefix}ERROR: 1st arg <searchDir> must be an existing directory.`)
            console.error(`${logPrefix}${searchPath} does not exist.`)
            console.info(`${logPrefix}For more help, please visit ${docURL}`)
            return
        }
    }

    // Validate/init options
    if (!validateOptions(options, defaultOptions, docURL, exampleCall)) return
    options = { ...defaultOptions, ...options } // merge validated options w/ missing default ones
    if (options.ignoreFiles) options.ignores = [...(options.ignores ?? []), ...options.ignoreFiles] // for bw compat

    // Search for SCSS
    const dirFiles = fs.readdirSync(searchDir), scssFiles = []
    if (options.verbose && !options.isRecursing)
        console.info(`${logPrefix}Searching for SCSS files...`)
    dirFiles.forEach(file => {
        const filePath = path.resolve(searchDir, file)
        const shouldIgnore = options.ignores.some(pattern =>
            pattern.endsWith('/') ? filePath.split(path.sep).some(part => part == pattern.replace(/\/$/, ''))
          : file == pattern
        )
        if (shouldIgnore) {
            if (options.verbose) console.info(`${logPrefix}** ${file} ignored`)
        } else if (fs.statSync(filePath).isDirectory() && file != 'node_modules' // folder found
            && options.recursive // only proceed if recursion enabled
            && (options.dotFolders || !file.startsWith('.')) // exclude dotfolders if prohibited
        ) scssFiles.push( // recursively find SCSS in eligible dir
            ...findSCSS(filePath, { ...options, isRecursing: true }))
        else if (file.endsWith('.scss')) // SCSS file found
            scssFiles.push(filePath) // store eligible SCSS file for returning
    })

    // Log/return final result
    if (options.verbose && !options.isRecursing) {
        console.info(`${logPrefix}Search complete! `
            + `${ scssFiles.length || 'No' } file${ scssFiles.length == 1 ? '' : 's' } found.`)
        if (findSCSS.caller?.name != 'compile' && typeof window != 'undefined')
            console.info(`${logPrefix}Check returned array.`)
    }
    return options.isRecursing || scssFiles.length ? scssFiles : []
}

function compile(input, options = {}) {

    const docURL = `${app.urls.docs}/#compileinput-options`,
          exampleCall = `compile('assets/scss', { recursive: false, minify: false })`,
          logPrefix = 'compile() » '

    const defaultOptions = {
        recursive: true,       // recursively search for nested files if dir path passed
        verbose: true,         // enable logging
        dotFolders: false,     // include dotfolders in file search
        minify: true,          // minify output CSS
        sourceMaps: true,      // generate CSS source maps
        relativeOutput: false, // output files relative to each source file instead of to input root
        ignores: [],           // files/dirs to exclude from compilation
        comment: ''            // header comment to prepend to compiled CSS
    }

    // Validate input
    if (typeof input != 'string') {
        console.error(`${logPrefix}ERROR: 1st arg <input> must be a string.`)
        console.info(`${logPrefix}For more help, please visit ${docURL}`)
        return
    }

    // Validate/init options
    if (!validateOptions(options, defaultOptions, docURL, exampleCall)) return
    options = { ...defaultOptions, ...options } // merge validated options w/ missing default ones
    if (options.ignoreFiles) options.ignores = [...(options.ignores ?? []), ...options.ignoreFiles] // for bw compat

    // Compile SCSS based on input
    const compileOptions = {
        style: options.minify ? 'compressed' : 'expanded',
        sourceMap: options.sourceMaps,
        charset: false // prevent UTF-8 BOM in output
    }
    if (fs.existsSync(input)) { // compile based on path arg
        if (input.endsWith('.scss') && fs.statSync(input).isFile()) { // file path passed
            if (options.verbose) console.info(`${logPrefix}** Compiling ${input}...`)
            try { // to compile file passed
                const compileResult = sass.compile(input, compileOptions)
                if (options.comment) compileResult.css = prependComment(compileResult.css, options.comment)
                if (options.verbose && typeof window != 'undefined')
                    console.info(`${logPrefix}Compilation complete! Check returned object.`)
                return {
                    code: compileResult.css, srcMap: compileResult.sourceMap,
                    srcPath: path.resolve(process.cwd(), input), error: undefined
                }
            } catch (err) {
                console.error(`\n${logPrefix}ERROR: ${err.message}\n`)
                return { code: undefined, srcMap: undefined, srcPath: undefined, error: err }
            }
        } else { // dir path passed
            const compileResult = findSCSS(input, options)?.map(scssPath => { // compile found SCSS files
                if (options.verbose) console.info(`${logPrefix}** Compiling ${scssPath}...`)
                try { // to compile found file
                    const compileResult = sass.compile(scssPath, compileOptions),
                          relPath = options.relativeOutput ? undefined
                                  : path.relative(path.resolve(process.cwd(), input), scssPath)
                    if (options.comment) compileResult.css = prependComment(compileResult.css, options.comment)
                    return {
                        code: compileResult.css, srcMap: compileResult.sourceMap, srcPath: scssPath, relPath,
                        error: undefined
                    }
                } catch (err) {
                    console.error(`\n${logPrefix}ERROR: ${err.message}\n`)
                    return { code: undefined, srcMap: undefined, srcPath: undefined, error: err }
                }
            }).filter(data => !data.error ) // filter out failed compilations
            if (options.verbose) {
                if (compileResult.length && typeof window != 'undefined')
                    console.info(`${logPrefix}Compilation complete! Check returned object.`)
                else
                    console.info(`${logPrefix}No SCSS files processed.`)
            }
            return compileResult
        }
    } else { // compile based on src code arg
        if (options.verbose)
            console.info(`${logPrefix}** Compiling passed source code...`)
        try { // to compile passed src code
            const compileResult = sass.compileString(input, compileOptions)
            if (options.comment) compileResult.css = prependComment(compileResult.css, options.comment)
            return { code: compileResult.css, srcMap: compileResult.sourceMap, srcPath: undefined, error: undefined }
        } catch (err) {
            console.error(`\n${logPrefix}ERROR: ${err.message}\n`)
            return { code: undefined, srcMap: undefined, srcPath: undefined, error: err }
        }
    }

    function prependComment(code, comment) {
        const commentBlock = comment.split('\n').map(line => ` * ${line}`).join('\n'),
              shebangIdx = code.indexOf('#!')
        if (shebangIdx >= 0) {
            const postShebangIdx = code.indexOf('\n', shebangIdx) +1 // idx of 1st newline after shebang
            return code.slice(0, postShebangIdx) + `/**\n${commentBlock}\n */\n` + code.slice(postShebangIdx)
        } else
            return `/**\n${commentBlock}\n */\n${code}`
    }
}

function validateOptions(options, defaultOptions, docURL, exampleCall) {

    // Init option strings/types
    const strDefaultOptions = JSON.stringify(defaultOptions, undefined, 2)
        .replace(/"([^"]+)":/g, '$1:') // strip quotes from keys
        .replace(/"/g, '\'') // replace double quotes w/ single quotes
        .replace(/\n\s*/g, ' ') // condense to single line
    const strValidOptions = Object.keys(defaultOptions).join(', '),
          booleanOptions = Object.keys(defaultOptions).filter(key => typeof defaultOptions[key] == 'boolean'),
          integerOptions = Object.keys(defaultOptions).filter(key => Number.isInteger(defaultOptions[key])),
          arrayOptions = Object.keys(defaultOptions).filter(key => Array.isArray(defaultOptions[key]))

    // Init log vars
    const logPrefix = `${ validateOptions.caller?.name || 'validateOptions' }() » `
    let optionsPos = exampleCall.split(',').findIndex(arg => arg.trim().startsWith('{')) + 1
    optionsPos += ['st','nd','rd'][optionsPos - 1] || 'th' // append ordinal suffix

    // Define print functions
    function printValidOptions() {
        console.info(`${logPrefix}Valid options: [ ${strValidOptions} ]`)
        console.info(`${logPrefix}If omitted, default settings are: ${strDefaultOptions}`)
    }
    function printDocURL() {
        console.info(`${logPrefix}For more help, please visit ${docURL}`) }

    // Validate options
    if (typeof options != 'object') { // validate as obj
        console.error(`${logPrefix}ERROR: ${
            optionsPos == '0th' ? '[O' : optionsPos + ' arg [o'}ptions] can only be an object of key/values.`)
        console.info(`${logPrefix}Example valid call: ${exampleCall}`)
        printValidOptions() ; printDocURL() ; return false
    }
    for (const key in options) { // validate each key
        if (key != 'isRecursing' && !Object.prototype.hasOwnProperty.call(defaultOptions, key))
            continue // to next key due to unused option
        else if (booleanOptions.includes(key) && typeof options[key] != 'boolean') {
            console.error(`${logPrefix}ERROR: [${key}] option can only be \`true\` or \`false\`.`)
            printDocURL() ; return false
        } else if (integerOptions.includes(key)) {
            options[key] = parseInt(options[key], 10)
            if (isNaN(options[key]) || options[key] < 1) {
                console.error(`${logPrefix}ERROR: [${key}] option can only be an integer > 0.`)
                printDocURL() ; return false
            }
        } else if (arrayOptions.includes(key)) {
            if (typeof options[key] == 'string' && !options[key].includes(','))
                options[key] = [options[key]] // convert comma-less string to array
            else if (!Array.isArray(options[key])) {
                console.error(`${logPrefix}ERROR: [${key}] option can only be an array.`)
                printDocURL() ; return false
            }
        }
    }
    return true
}

const stcAliases = {
    compile: ['build', 'Build', 'Compile', 'compress', 'Compress', 'minify', 'Minify'],
    findSCSS: ['find', 'Find', 'findscss', 'findScss', 'Findscss', 'FindScss', 'FindSCSS', 'search', 'Search']
}
module.exports = { compile, findSCSS }
for (const func in stcAliases) // init/export aliases
    stcAliases[func].forEach(alias => module.exports[alias] = module.exports[func]);
