// © 2024–2026 Adam Lui under the MIT license.
// Source: https://github.com/adamlui/js-utils/tree/main/geolocate/src
// Documentation: https://github.com/adamlui/js-utils/tree/main/geolocate/docs/#-command-line-usage
// Latest minified release: https://cdn.jsdelivr.net/npm/@adamlui/geolocate/dist/geolocate.min.js

Object.assign(globalThis.api ??= {}, {
    name: 'geolocate',
    regex: { geolocate: /^(?:geo)?locate$/i }
})

async function geolocate(ips, options = {}) {

    const docURL = 'https://github.com/adamlui/js-utils/tree/main/geolocate/docs/#locateips-options',
          exampleCall = `geolocate('8.8.8.8', { verbose: false })`,
          defaultOptions = { verbose: true /* show logging in console/terminal */ }

    _log.prefix = 'geolocate()'

    // Init/validate IP(s)
    ips = [].concat(ips) // normalize to array
    ips[0] ||= await getOwnIP() // fill own IP if none passed
    for (const ip of ips) {
        if (options.verbose) _log.info(`Validating ${ip}...`)
        let ipIsValid
        try { // to use Node.js generate-ip for validation
            ipIsValid = require('generate-ip').ipv4.validate
        } catch (err) { // use jsDelivr's latest copy of generate-ip
            await import('https://cdn.jsdelivr.net/npm/generate-ip/dist/generate-ip.min.js')
            ipIsValid = window.ipv4.validate
        }
        if (ipIsValid && !ipIsValid(ip, { verbose: false }))
            return _log.error(`${ip} is not a valid IPv4 address.`)
    }

    // Validate/init options
    if (!_validateOptions({ options, defaultOptions, helpURL: docURL, exampleCall })) return
    options = { ...defaultOptions, ...options } // merge validated options w/ missing default ones

    try { // to fetch/get/return geolocation data
        const geoData = []
        for (const ip of ips) {
            if (options.verbose) _log.info(`Fetching geolocation data for ${ip}...`)
            const resp = await fetchData(`http://ip-api.com/json/${ip}`),
                { status, org, as, query, ...filteredData } = await resp.json() // eslint-disable-line no-unused-vars
            geoData.push({ ip, ...filteredData })
        }
        if (options.verbose && typeof window != 'undefined')
            _log.info('Success!', 'Check returned array.')
        return geoData
    } catch (err) {
        _log.error(err.message) }
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
                    resp.on('end', () => resolve({ json: () => JSON.parse(rawData), text: () => rawData }))
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
                        return stderr ? _log.error(stderr) : stdout.trim()
                    } catch (err) { _log.error(err.message) }
                })
    )
}

function _validateOptions({ options, defaultOptions, helpURL, exampleCall }) {

    // Init option strings/types
    const booleanOptions = Object.keys(defaultOptions).filter(key => typeof defaultOptions[key] == 'boolean'),
          integerOptions = Object.keys(defaultOptions).filter(key => Number.isInteger(defaultOptions[key]))

    // Validate options
    if (typeof options != 'object') { // validate as obj
        let optionsPos = exampleCall.split(',').findIndex(arg => arg.trim().startsWith('{')) +1
        optionsPos += ['st','nd','rd'][optionsPos -1] || 'th' // append ordinal suffix
        _log.error(`${ optionsPos == '0th' ? '[O' : optionsPos + ' arg [o' }ptions] can only be an object of key/vals.`)
        _log.info('Example valid call:', exampleCall)
        _log.validOptions(defaultOptions) ; _log.helpURL(helpURL)
        return false
    }
    for (const key in options) { // validate each key
        if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
            _log.error(`\`${key}\` is an invalid option.`)
            _log.validOptions(defaultOptions) ; _log.helpURL(helpURL)
            return false
        } else if (booleanOptions.includes(key) && typeof options[key] != 'boolean') {
            _log.error(`[${key}] option can only be \`true\` or \`false\`.`)
            _log.helpURL(helpURL)
            return false
        } else if (integerOptions.includes(key)) {
            options[key] = parseInt(options[key], 10)
            if (isNaN(options[key]) || options[key] < 1) {
                _log.error(`[${key}] option can only be an integer > 0.`)
                _log.helpURL(helpURL)
                return false
            }
        }
    }

    return true
}

const _log = {
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

api.exports = new Proxy({ geolocate }, {
    get(target, requestedMethod) {
        for (const [methodName, methodRegex] of Object.entries(api.regex))
            if (methodRegex.test(requestedMethod)) return target[methodName]
    }
})
try { module.exports = api.exports } catch (err) {} // for Node.js
try { Object.assign(window, api.exports) } catch (err) {} // for browsers
