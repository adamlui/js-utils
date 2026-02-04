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

    // Size params
    length: 12,                 // length of passwords to generate
    qty: 1,                     // # of passwords to generate

    // Generator options
    strength: '',               // <'weak'|'basic'|'strong'> apply strength preset
    excludeNums: false,         // disallow numbers in password(s)
    excludeSymbols: false,      // disallow symbols in password(s)
    excludeLowerChars: false,   // disallow lowercase letters in password(s)
    excludeUpperChars: false,   // disallow uppercase letters in password(s)
    similarChars: false,        // include similar chars (e.g. o,0,O,i,l,1,\|) in password(s)
    unstrict: false,            // don't require 1+ char from each allowed charset in password(s)
    charset: '',                // only include chars in password(s)
    exclude: '',                // exclude chars from password(s)

    // Info options
    entropy: false,             // calculate/log estimated entropy
    quietMode: false            // suppress all logging except errors
}
