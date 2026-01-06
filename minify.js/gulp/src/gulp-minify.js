// © 2024–2026 Adam Lui under the MIT license.
// Source: https://code.minify-js.org/gulp
// Documentation: https://docs.minify-js.org/gulp

const minifyJS = require('@adamlui/minify.js'),
      fs = require('fs'),
      path = require('path'),
      { Transform } = require('stream')

function minify(input, output, options = {}) {

    // Init options
    const defaultOptions = {
        recursive: true,   // recursively search for nested files if dir path passed
        verbose: true,     // enable logging
        dotFolders: false, // include dotfolders in file search
        dotFiles: false,   // include dotfiles in file search
        mangle: true,      // shorten var names (typically to one character)
        comment: ''        // header comment to prepend to minified code
    }
    options = { ...defaultOptions, ...options }

    if (!input && !output) { // return I/O-argless minify() for use as a stream transformation
        return new Transform({
            objectMode: true,
            transform(file, _, callback) {
                if (file.isBuffer()) {
                    if (options.verbose) console.info(`minify() » Minifying ${file.path}...`)
                    const minifiedCode = minifyJS.minify(file.contents.toString(), {})
                    file.contents = Buffer.from(minifiedCode.code)
                }
                this.push(file) ; callback()
        }})
    }

    // Validate input arg (output arg can be anything)
    const inputPath = path.resolve(process.cwd(), input)
    if (input && !fs.existsSync(inputPath)) {
        console.error('\nminify() » ERROR: 1st: First argument can only be an existing file or directory.')
        console.info(`\nminify() » ${inputPath} does not exist.`)
        return
    }

    // Find all eligible JavaScript files or arg-passed file
    const { mangle, comment, ...findJSoptions } = options // eslint-disable-line no-unused-vars
    const unminnedJSfiles = input.endsWith('.js') ? [inputPath]
        : minifyJS.findJS(inputPath, findJSoptions)

    // Build array of minification data
    const minifyData = unminnedJSfiles
        .map(jsPath => minifyJS.minify(jsPath, options)) // minify each file
        .filter(minifyResult => !minifyResult.error) // filter out failed minifications

    // Write array data to files in output dir
    minifyData?.forEach(({ code, srcPath }) => {
        const outputDir = path.join(
            path.dirname(srcPath), // path of file to be minified
            ( /so?u?rce?$/.test(path.dirname(srcPath)) ? '../' : '' ) // + '../' if in if in *(src|source)/
          + ( output.endsWith('.js') ? path.dirname(output) // + path from file output
                                     : output || 'min' ) // or path from folder output or min/ if no output passed
        )
        const outputFilename = (
            output.endsWith('.js') && input.endsWith('.js')
                ? path.basename(output).replace(/(\.min)?\.js$/, '')
                : path.basename(srcPath, '.js')
        ) + '.min.js'
        const outputPath = path.join(outputDir, outputFilename)
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })
        fs.writeFileSync(outputPath, code, 'utf8')
    })
}

module.exports = minify
