/**
 * scss-to-css.config.mjs
 *
 * Optional config file for the scss-to-css CLI.
 * Copy this file to your project root to set default options.
 * CLI arguments always override these values.
 *
 * Docs: https://github.com/adamlui/scss-to-css/#-command-line-usage
 */

export default {

    // Info options
    dryRun: false,            // don't actually minify the file(s), just show if they will be processed
    quietMode: false,         // suppress all logging except errors

    // Input options
    includeDotFolders: false, // include dotfolders in file search
    noRecursion: false,       // disable recursive file searching
    ignores: '',              // files/dirs to exclude from minification

    // Output options
    noSourceMaps: false,      // prevent source maps from being generated
    noMinify: false,          // disable minification of output CSS
    relativeOutput: false,    // output files relative to each src file instead of to input root
    copy: false,              // copy compiled CSS to clipboard instead of write to file if single file processed
    comment: ''               // header comment to prepend to minified code
}
