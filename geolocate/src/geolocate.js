// © 2024–2026 Adam Lui under the MIT license.
// Source: https://github.com/adamlui/js-utils/tree/main/geolocate/src
// Documentation: https://github.com/adamlui/js-utils/tree/main/geolocate/docs/#-command-line-usage
// Latest minified release: https://cdn.jsdelivr.net/npm/@adamlui/geolocate/dist/geolocate.min.js

Object.assign(globalThis.api ??= {}, {
    name: 'geolocate',
    aliases: { geolocate: ['Geolocate', 'geoLocate', 'GeoLocate', 'locate', 'Locate'] }
})

async function geolocate(ips, options = {}) {

    const docURL = 'https://github.com/adamlui/js-utils/tree/main/geolocate/docs/#locateips-options',
          exampleCall = `geolocate('8.8.8.8', { verbose: false })`,
          defaultOptions = { verbose: true /* show logging in console/terminal */ }

    log.prefix = 'geolocate()'

    // Init/validate IP(s)
    ips = [].concat(ips) // normalize to array
    ips[0] ||= await getOwnIP() // fill own IP if none passed
    for (const ip of ips) {
        if (options.verbose) log.info(`Validating ${ip}...`)
        let ipIsValid
        try { // to use Node.js generate-ip for validation
            ipIsValid = require('generate-ip').ipv4.validate
        } catch (err) { // use jsDelivr's latest copy of generate-ip
            await import('https://cdn.jsdelivr.net/npm/generate-ip/dist/generate-ip.min.js')
            ipIsValid = window.ipv4.validate
        }
        if (ipIsValid && !ipIsValid(ip, { verbose: false }))
            return log.error(`${ip} is not a valid IPv4 address.`)
    }

    // Validate/init options
    if (!validateOptions({ options, defaultOptions, helpURL: docURL, exampleCall })) return
    options = { ...defaultOptions, ...options } // merge validated options w/ missing default ones

    try { // to fetch/get/return geolocation data
        const geoData = []
        for (const ip of ips) {
            if (options.verbose) log.info(`Fetching geolocation data for ${ip}...`)
            const resp = await fetchData(`http://ip-api.com/json/${ip}`),
                { status, org, as, query, ...filteredData } = await resp.json() // eslint-disable-line no-unused-vars
            geoData.push({ ip, ...filteredData })
        }
        if (options.verbose && typeof window != 'undefined')
            log.info('Success!', 'Check returned array.')
        return geoData
    } catch (err) {
        log.error(err.message) }
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
            } catch (err) { reject(new Error('Environment not supported.')) }
        })
    else // use fetch() from 2015+ browsers / Node.js v21+
        return fetch(url)
}

async function getOwnIP() {
    return ( // fetch in browser + Node.js 16+
        fetchData('https://ifconfig.me/ip').then(resp => resp.text()).catch(() =>
            fetchData('http://ip-api.com/json/').then(resp => resp.json()).then(data => data.query))
                .catch(async () => {
                    try { // to exec curl in Node.js <16
                        const { exec } = require('child_process'),
                              { promisify } = require('util'), execAsync = promisify(exec),
                              { stdout, stderr } = await execAsync('curl -s ifconfig.me')
                        return stderr ? log.error(stderr) : stdout.trim()
                    } catch (err) { log.error(err.message) }
                })
    )
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
        if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
            log.error(`\`${key}\` is an invalid option.`)
            log.validOptions(defaultOptions) ; log.helpURL(helpURL)
            return false
        } else if (booleanOptions.includes(key) && typeof options[key] != 'boolean') {
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
    prefix: api.name,

    error(...args) { console.error(`${this.prefix} » ERROR:`, ...args) },
    helpURL(url = api.urls?.docs) { this.info('For more help, please visit', url) },
    info(...args) { console.info(`${this.prefix} »`, ...args) },

    validOptions(options) {
        const strValidOptions = Object.keys(options).join(', ')
        const strDefaultOptions = JSON.stringify(options, null, 2)
            .replace(/"([^"]+)":/g, '$1:') // strip quotes from keys
            .replace(/"/g, '\'') // replace double quotes w/ single quotes
            .replace(/\n\s*/g, ' ') // condense to single line
        this.info(`Valid options: [${strValidOptions}]`)
        this.info(`If omitted, default settings are: ${strDefaultOptions}`)
    }
}

try { module.exports = { geolocate }} catch (err) {} // for Node.js
try { window.geo = { geolocate }} catch (err) {} // for browsers
for (const fn in api.aliases) { // export aliases
    try { api.aliases[fn].forEach(alias => module.exports[alias] ??= module.exports[fn]) } catch (err) {} // for Node.js
    try { api.aliases[fn].forEach(alias => window.geo[alias] ??= window.geo[fn]) } catch (err) {} // for browsers
}
