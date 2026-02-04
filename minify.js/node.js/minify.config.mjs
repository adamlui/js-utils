/**
 * minify.config.mjs
 *
 * Optional config file for the minify-js CLI.
 * Copy this file to your project root to set default options.
 * CLI arguments always override these values.
 *
 * Docs: https://github.com/adamlui/minify.js/tree/main/node.js/#-command-line-usage
 */

export default {

    // Info options
    dryRun: false,            // don't actually minify the file(s), just show if they will be processed
    quietMode: false,         // suppress all logging except errors

    // Input options
    includeDotFolders: false, // include dotfolders in file search
    includeDotFiles: false,   // include dotfiles in file search
    noRecursion: false,       // disable recursive file searching
    ignores: '',              // files/dirs to exclude from minification

    // Output options
    noMangle: false,          // disable mangling names
    noFilenameChange: false,  // disable changing file extension to .min.js
    rewriteImports: false,    // update import paths from .js to .min.js
    copy: false,              // copy minified code to clipboard instead of write to file if single file processed
    relativeOutput: false,    // output files relative to each src file instead of to input root
    comment: ''               // header comment to prepend to minified code
}
