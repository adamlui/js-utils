// © 2024–2026 Adam Lui & contributors under the MIT license.
// Source: https://github.com/adamlui/js-utils/tree/main/generate-ip/src
// Documentation: https://github.com/adamlui/js-utils/tree/main/generate-ip/docs
// Latest minified release: https://cdn.jsdelivr.net/npm/generate-ip/dist/generate-ip.min.js

Object.assign(globalThis.api ??= {}, {
    name: 'generate-ip',
    aliases: {
        ipv4: ['ipV4', 'IPv4', 'IPV4', 'Ipv4', 'IpV4', 'ip', 'IP', 'Ip'],
        ipv6: ['ipV6', 'IPv6', 'IPV6', 'Ipv6', 'IpV6'],
        mac: ['MAC', 'Mac', 'ethernet', 'Ethernet']
    }
})

const ipv4 = {

    generate(options = {}) {

        const docURL = 'https://github.com/adamlui/js-utils/tree/main/generate-ip/docs/#ipv4generateoptions',
              exampleCall = 'ipv4.generate({ verbose: false, qty: 3 })'

        const defaultOptions = {
            verbose: true, // enable logging
            qty: 1         // number of IP addresses to generate
        }

        log.prefix = 'ipv4.generate()'

        // Validate/init options
        if (!validateOptions({ options, defaultOptions, helpURL: docURL, exampleCall })) return
        options = { ...defaultOptions, ...options } // merge validated options w/ missing default ones

        // Generate IPv4 address(es)
        if (options.verbose) log.info(`Generating IPv4 address${ options.qty > 1 ? 'es' : '' }...`)
        const ips = []
        if (options.qty > 1) // generate array of [qty] IP strings
            for (let i = 0 ; i < options.qty ; i++)
                ips.push(this.generate({ ...options, qty: 1, verbose: false }))
        else { // generate single IP
            const segments = []
            for (let i = 0 ; i < 4 ; i++) segments.push(random.int(0, 256))
            ips.push(segments.join('.'))
        }
        const ipResult = options.qty > 1 ? ips : ips[0]

        // Log/return final result
        if (options.verbose) {
            log.info(`IPv4 address${ options.qty > 1 ? 'es' : '' } generated!`)
            log.info(options.qty == 1 ? ipResult : ipResult.join(', '))
        }
        return ipResult
    },

    validate(address, options = {}) {

        const docURL = 'https://github.com/adamlui/js-utils/tree/main/generate-ip/docs/#ipv4validateaddress-options',
              exampleCall = `ipv4.validate('0.0.255.255', { verbose: false })`,
              defaultOptions = { verbose: true /* enable logging */ }

        log.prefix = 'ipv4.validate()'

        // Validate address as arg
        if (typeof address != 'string') {
            log.error('1st arg <address> must be a string.')
            return log.helpURL(docURL)
        }

        // Validate/init options
        if (!validateOptions({ options, defaultOptions, helpURL: docURL, exampleCall })) return
        options = { ...defaultOptions, ...options } // merge validated options w/ missing default ones

        // Validate address as IPv4 address
        if (options.verbose) log.info(`Validating ${address}...`)
        const segments = address.split('.')
        const isValidIPv4 = !( // false if any dq condition matches
                  segments.length != 4 // not 4-segments long
               || segments.some(segment => // segment invalid
                       !/^\d+$/.test(segment) // for being non-numeric
                    || parseInt(segment, 10) < 0 // or negative
                    || parseInt(segment, 10) > 255 // or > 255
                  )
        )

        // Log/return final result
        if (options.verbose) log.info(`IP is ${ isValidIPv4 ? '' : 'in' }valid IPv4 address!`)
        return isValidIPv4
    }
}

const ipv6 = {

    generate(options = {}) {

        const docURL = 'https://github.com/adamlui/js-utils/tree/main/generate-ip/docs/#ipv6generateoptions',
              exampleCall = 'ipv6.generate({ leadingZeros: true, qty: 5 })'

        const defaultOptions = {
            verbose: true,       // enable logging
            qty: 1,              // number of IP addresses to generate
            leadingZeros: false, // include leading zeros in hex pieces
            doubleColon: true    // replace series of zeros w/ '::'
        }

        log.prefix = 'ipv6.generate()'

        // Validate/init options
        if (!validateOptions({ options, defaultOptions, helpURL: docURL, exampleCall })) return
        options = { ...defaultOptions, ...options } // merge validated options w/ missing default ones

        // Generate IPv6 address(es)
        if (options.verbose)
            log.info(`Generating IPv6 address${ options.qty > 1 ? 'es' : '' }...`)
        const ips = []
        if (options.qty > 1) // generate array of [qty] IP strings
            for (let i = 0 ; i < options.qty ; i++)
                ips.push(this.generate({ ...options, qty: 1, verbose: false }))
        else { // generate single IP
            const pieces = [], { qty, ...nonQtyOptions } = options // eslint-disable-line no-unused-vars
            for (let i = 0 ; i < 8 ; i++) // generate 8x 16-bit hex pieces
                pieces.push(random.hex(4))
            ips.push(this.format(pieces.join(':'), { ...nonQtyOptions, verbose: false }))
        }
        const ipResult = options.qty > 1 ? ips : ips[0]

        // Log/return final result
        if (options.verbose) {
            log.info(`IPv6 address${ options.qty > 1 ? 'es' : '' } generated!`)
            log.info(options.qty == 1 ? ipResult : ipResult.join(', '))
        }
        return ipResult
    },

    format(ipv6address, options = {}) {

        const docURL = 'https://github.com/adamlui/js-utils/tree/main/generate-ip/docs/#ipv6formatipv6address-options',
              exampleCall = `ipv6.format('0d::ffff:192.1.56.10/96', { leadingZeros: true, doubleColon: false })`

        const defaultOptions = {
            verbose: true,       // enable logging
            leadingZeros: false, // include leading zeros in hex pieces
            doubleColon: true    // replace series of zeros w/ '::'
        }

        log.prefix = 'ipv6.format()'

        // Validate address
        if (typeof ipv6address != 'string') {
            log.error('1st arg <ipv6address> must be a string.')
            return log.helpURL(docURL)
        }
        if (!this.validate(ipv6address, { verbose: false})) {
            log.error(`${ipv6address} is not a valid IPv6 address.`)
            return log.helpURL(docURL)
        }

        // Validate/init options
        if (!validateOptions({ options, defaultOptions, helpURL: docURL, exampleCall })) return
        options = { ...defaultOptions, ...options } // merge validated options w/ missing default ones

        // Init formattedAddress
        let formattedAddress = ipv6address

        // Handle double colons
        if (options.doubleColon) { // replace zero series w/ '::'
            if (options.verbose) log.info(`Replacing zero series w/ '::'...`)
            formattedAddress = formattedAddress.replace(/:(?:0+:)+/, '::')
        } else { // expand '::' into zero series
            if (options.verbose) log.info(`Expanding '::' into zero series...`)
            const totalPieces = formattedAddress.split(':').filter(Boolean).length,
                  zeroSegment = options.leadingZeros ? '0000' : '0',
                  zeroSeries = Array(8 - totalPieces).fill(zeroSegment).join(':')
            formattedAddress = formattedAddress.replace('::', `:${zeroSeries}:`)
        }

        // Handle leading zeros
        if (options.leadingZeros) { // add leading zeros
            if (options.verbose) log.info('Adding leading zeros...')
            const pieces = formattedAddress.split(':')
            for (let i = 0 ; i < pieces.length ; i++)
                while (pieces[i].length < 4) pieces[i] = '0' + pieces[i]
            formattedAddress = pieces.join(':')
        } else { // strip leading zeros
            if (options.verbose) log.info('Stripping leading zeros...')
            formattedAddress = ipv6address.replace(/(^|(?<=:))0+(?!:)/g, '$1') // eslint-disable-line
        }

        // Log/return final result
        if (options.verbose) {
            if (formattedAddress != ipv6address) log.info('IP formatted successfully!')
            else log.info('IP already formatted to specs.')
            log.info(formattedAddress)
        }
        return formattedAddress
    },

    validate(address, options = {}) {

        const docURL = 'https://github.com/adamlui/js-utils/tree/main/generate-ip/docs/#ipv6validateaddress-options',
              exampleCall = `ipv6.validate('0:0:0:0:0:ffff:192.1.56.10/96', { verbose: false })`,
              defaultOptions = { verbose: true } // enable logging

        log.prefix = 'ipv6.validate()'

        // Validate address as arg
        if (typeof address != 'string') {
            log.error('1st arg <address> must be a string.')
            return log.helpURL(docURL)
        }

        // Validate/init options
        if (!validateOptions({ options, defaultOptions, helpURL: docURL, exampleCall })) return
        options = { ...defaultOptions, ...options } // merge validated options w/ missing default ones

        // Validate address as IPv6 address
        if (options.verbose) log.info(`Validating ${address}...`)
        const pieces = address.split(/::?/),
              lastPiece = pieces[pieces.length -1]
        const isValidIPv6 = !( // false if any dq condition matches
                  address.includes('::') && address.split('::').length > 2 // 2+ '::'
               || /:{3,}/.test(address) // 3+ consecutive ':'
               || pieces.length < 2 || pieces.length > 8 // 1 or 9+ hex pieces
               || pieces.some(piece => // hex piece invalid
                      !/^[\da-f]{1,4}$/i.test(piece) // for not being 1-4 valid chars
                          && (piece != lastPiece // except last piece
                              || !ipv4.validate( // where IPv4-mapping appended invalid address
                                      lastPiece.replace( // determined by stripping valid length suffixes first
                                          /\/(?:12[0-8]|[1-9]?\d)$/, ''), { verbose: false }
                  )))
        )

        // Log/return final result
        if (options.verbose) log.info(`IP is ${ isValidIPv6 ? '' : 'in' }valid IPv6 address!`)
        return isValidIPv6
    }
}

const mac = {

    generate(options = {}) {
        const docURL = 'https://github.com/adamlui/js-utils/tree/main/generate-ip/docs/#macgenerateoptions',
              exampleCall = 'mac.generate({ verbose: false, qty: 2 })'

        const defaultOptions = {
            verbose: true, // enable logging
            qty: 1         // number of MAC addresses to generate
        }

        log.prefix = 'mac.generate()'

        // Validate/init options
        if (!validateOptions({ options, defaultOptions, helpURL: docURL, exampleCall })) return
        options = { ...defaultOptions, ...options } // merge validated options w/ missing default ones

        // Generate MAC address
        if (options.verbose) log.info(`Generating MAC address${ options.qty > 1 ? 'es' : '' }...`)
        const macAddresses = []
        if (options.qty > 1) // generate array of [qty] MAC address strings
            for (let i = 0 ; i < options.qty ; i++)
                macAddresses.push(this.generate({ ...options, qty: 1, verbose: false }))
        else { // generate single MAC address
            const [prefix, suffix] = Array.from({ length: 2 }, () => {
                const parts = []
                for (let i = 0 ; i < 3 ; i++) parts.push(random.hex(2))
                return parts.join(':')
            })
            macAddresses.push(`${prefix}:${suffix}`)
        }
        const macResult = options.qty > 1 ? macAddresses : macAddresses[0]

        // Log/return final result
        if (options.verbose) {
            log.info(`MAC address${ options.qty > 1 ? 'es' : '' } generated!`)
            log.info(options.qty == 1 ? macResult : macResult.join(', '))
        }
        return macResult
    },

    validate(address, options = {}) {
        const docURL = 'https://github.com/adamlui/js-utils/tree/main/generate-ip/docs/#macvalidateaddress-options',
              exampleCall = `mac.validate('00:1A:2B:3C:4D:5E', { verbose: false })`,
              defaultOptions = { verbose: true /* enable logging */ }

        log.prefix = 'mac.validate()'

        // Validate address as arg
        if (typeof address != 'string') {
            log.error('1st arg <address> must be a string.')
            return log.helpURL(docURL)
        }

        // Validate/init options
        if (!validateOptions({ options, defaultOptions, helpURL: docURL, exampleCall })) return
        options = { ...defaultOptions, ...options } // merge validated options w/ missing default ones

        // Validate address as MAC address
        if (options.verbose) log.info(`Validating ${address}...`)
        const isValidMAC = /^(?:[\da-f]{2}[:-]){5}[\da-f]{2}$/i.test(address)

        // Log/return final result
        if (options.verbose) log.info(`Address is ${ isValidMAC ? '' : 'in' }valid MAC address!`)
        return isValidMAC
    }
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

const random = {
    int(min, max) {
        if (typeof require == 'undefined') { // use browser crypto API || Math.random()
            const browserCrypto = window.crypto || window.msCrypto,
                  randomVal = browserCrypto?.getRandomValues(new Uint32Array(1))[0] / 0xFFFFFFFF || Math.random()
            return Math.floor(randomVal * (max - min)) + min
        } else // use Node.js crypto module
            return require('crypto').randomInt(min, max)
    },

    hex(digits) {
        let hex = ''
        for (let i = 0 ; i < digits ; i++) hex += random.int(0, 16).toString(16)
        return hex
    }
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

api.exports = { ipv4, ipv6, mac }
try { module.exports = { ...api.exports }} catch (err) {} // for Node.js
try { Object.assign(window, api.exports) } catch (err) {} // for browsers
for (const ipAPI in api.aliases) // export aliases
    api.aliases[ipAPI].forEach(alias => {
        try { module.exports[alias] ??= module.exports[ipAPI] } catch (err) {} // for Node.js
        try { window[alias] ??= window[ipAPI] } catch (err) {} // for browsers
    });
