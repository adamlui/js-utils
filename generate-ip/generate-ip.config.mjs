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
    qty: 3,          // # of IPs to generate
    ipv6mode: false, // generate IPv6 address(es)
    macMode: false,  // generate MAC address(es)
    quietMode: false // suppress all logging except errors
}
