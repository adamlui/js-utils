// © 2024–2026 Adam Lui under the MIT license.
// Source: https://code.geolocatejs.org
// Documentation: https://docs.geolocatejs.org/#-command-line-usage
// Latest minified release: https://cdn.jsdelivr.net/npm/@adamlui/geolocate/dist/geolocate.min.js

/* global ipv4 */

async function geolocate(ips, options = {}) {

    const docURL = 'https://docs.geolocatejs.org/#locateips-options',
          exampleCall = `geolocate('8.8.8.8', { verbose: false })`,
          defaultOptions = { verbose: true /* enable logging */ },
          logPrefix = 'geolocate() » '

    // Init/validate IP(s)
    ips = Array.isArray(ips) ? ips : [ips] // normalize to array
    ips[0] ||= await getOwnIP() // fill own IP if none passed
    for (const ip of ips) {
        if (options.verbose) console.info(`${logPrefix}Validating ${ip}...`)
        let ipIsValid
        try { // to use Node.js generate-ip for validation
            ipIsValid = require('generate-ip').ipv4.validate
        } catch (err) { // use jsDelivr's latest copy of generate-ip
            await import('https://cdn.jsdelivr.net/npm/generate-ip/dist/generate-ip.min.js')
            ipIsValid = ipv4.validate
        }
        if (ipIsValid && !ipIsValid(ip, { verbose: false }))
            return console.error(`${logPrefix}ERROR: ${ip} is not a valid IPv4 address.`)
    }

    // Validate/init options
    if (!validateOptions(options, defaultOptions, docURL, exampleCall)) return
    options = { ...defaultOptions, ...options } // merge validated options w/ missing default ones

    try { // to fetch/get/return geolocation data
        const geoData = []
        for (const ip of ips) {
            if (options.verbose) console.info(`${logPrefix}Fetching geolocation data for ${ip}...`)
            const response = await fetchData(`http://ip-api.com/json/${ip}`)
            let { status, org, as, query, ...filteredData } = await response.json() // eslint-disable-line no-unused-vars
            filteredData = { ip, ...filteredData } ; geoData.push(filteredData)
        }
        if (options.verbose && typeof window != 'undefined')
            console.info('${logPrefix}Success! Check returned array.')
        return geoData
    } catch (err) { console.error(`${logPrefix}ERROR:`, err.message) }

    async function getOwnIP() {
        return ( // fetch in browser + Node.js 16+
            fetch('https://ifconfig.me/ip').then(response => response.text()).catch(() =>
            fetch('http://ip-api.com/json/').then(response => response.json()).then(data => data.query))
        .catch(async () => { try { // if failed, exec curl in Node.js <16
                const { exec } = require('child_process'),
                      { promisify } = require('util'), execAsync = promisify(exec),
                      { stdout, stderr } = await execAsync('curl -s ifconfig.me')
                return stderr ? console.error(logPrefix, stderr) : stdout.trim()
            } catch (err) { console.error(logPrefix, err) }
        }))
    }
}

function fetchData(url) {
    if (typeof fetch == 'undefined') // polyfill for Node.js < v21
        return new Promise((resolve, reject) => {
            try { // to use http or https module
                const protocol = url.match(/^([^:]+):\/\//)[1]
                if (!/^https?$/.test(protocol)) reject(new Error('Invalid fetchData() URL.'))
                require(protocol).get(url, resp => {
                    let rawData = ''
                    resp.on('data', chunk => rawData += chunk)
                    resp.on('end', () => resolve({ json: () => JSON.parse(rawData) }))
                }).on('error', err => reject(new Error(err.message)))
            } catch (err) { reject(new Error('Environment not supported.'))
        }})
    else // use fetch() from 2015+ browsers / Node.js v21+
        return fetch(url)
}

function validateOptions(options, defaultOptions, docURL, exampleCall) {

    // Init option strings/types
    const strDefaultOptions = JSON.stringify(defaultOptions, undefined, 2)
        .replace(/"([^"]+)":/g, '$1:') // strip quotes from keys
        .replace(/"/g, '\'') // replace double quotes w/ single quotes
        .replace(/\n\s*/g, ' ') // condense to single line
    const strValidOptions = Object.keys(defaultOptions).join(', '),
          booleanOptions = Object.keys(defaultOptions).filter(key => typeof defaultOptions[key] == 'boolean')

    // Init log vars
    const logPrefix = `${ validateOptions.caller?.name || 'validateOptions' }() » `
    let optionsPos = exampleCall.split(',').findIndex(arg => arg.trim().startsWith('{')) +1
    optionsPos += ['st','nd','rd'][optionsPos -1] || 'th' // append ordinal suffix

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
        if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
            console.error(`${logPrefix}ERROR: \`${key}\` is an invalid option.`)
            printValidOptions() ; printDocURL() ; return false
        } else if (booleanOptions.includes(key) && typeof options[key] != 'boolean') {
            console.error(`${logPrefix}ERROR: [${key}] option can only be \`true\` or \`false\`.`)
            printDocURL() ; return false
        }
    }
    return true
}

const geoAliases = { geolocate: ['Geolocate', 'geoLocate', 'GeoLocate', 'locate', 'Locate'] }
try { module.exports = { geolocate }} catch (err) {} // for Node.js
try { window.geo = { geolocate }} catch (err) {} // for browsers
for (const func in geoAliases) { // init/export aliases
    try { geoAliases[func].forEach(alias => module.exports[alias] = module.exports[func]) } catch (err) {} // for Node.js
    try { geoAliases[func].forEach(alias => window.geo[alias] = window.geo[func]) } catch (err) {} // for browsers
}
