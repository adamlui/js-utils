/**
 * generate-ip.config.mjs
 *
 * Optional config file for the generate-ip CLI.
 * Copy this file to your project root to set default options.
 * CLI arguments always override these values.
 *
 * Docs: https://github.com/adamlui/js-utils/tree/main/generate-ip/#-command-line-usage
 */

export default {
    mode: 'ipv4',      // <ipv4|ipv6|mac> type of address to generate
    qty: 1,            // # of IPs to generate
    sequential: false, // generate addresses in sequence
    network: null,     // starting network address (required for sequential mode)
    quietMode: false,  // suppress all logging except errors
    uiLang: ''         // ISO 639-1 code of language to display UI in
}
