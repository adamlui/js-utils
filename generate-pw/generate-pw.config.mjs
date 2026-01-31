/**
 * generate-pw.config.mjs
 *
 * Optional config file for the generate-pw CLI.
 * Copy this file to your project root to set default options.
 * CLI arguments always override these values.
 *
 * Docs: https://github.com/adamlui/js-utils/tree/main/generate-pw/#-command-line-usage
 */

export default {
    length: 8,                  // length of passwords to generate
    qty: 1,                     // # of passwords to generate
    charset: '',                // only include chars in password(s)
    exclude: '',                // exclude chars from password(s)
    includeNums: false,         // allow numbers in password(s)
    includeSymbols: false,      // allow symbols in password(s)
    excludeLowerChars: false,   // disallow lowercase letters in password(s)
    excludeUpperChars: false,   // disallow uppercase letters in password(s)
    excludeSimilarChars: false, // exclude similar chars in password(s)
    strictMode: false,          // require 1+ char from each allowed charset in password(s)
    quietMode: false            // suppress all logging except errors
}
