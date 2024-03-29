// © 2024 Adam Lui & contributors under the MIT license.
// Source: https://github.com/adamlui/js-utils/tree/main/generate-ip
// Latest minified release: https://cdn.jsdelivr.net/npm/generate-ip/dist/generate-ip.min.js
// Documentation: https://github.com/adamlui/js-utils/tree/main/generate-ip#readme

// IMPORT secure crypto RNG
let randomInt;
try { // to use Node.js module
    randomInt = require('crypto').randomInt;
} catch (err) { // use browser API or JS method
    const webCrypto = window.crypto || window.msCrypto;
    randomInt = (min, max) => {
        const randomVal = webCrypto?.getRandomValues(new Uint32Array(1))[0] / 0xFFFFFFFF || Math.random();
        return Math.floor(randomVal * (max - min)) + min;
    };
}

// Define APIs

const ipv4 = {

    generate: function(options = {}) {

        // Init options
        const defaultOptions = {
            verbose: true, // enable logging
            qty: 1         // number of IP addresses to generate
        };
        options = { ...defaultOptions, ...options };

        // Validate options
        for (const key in options) {
            if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
                console.error(
                    `ipv4.generate() » ERROR: \`${ key }\` is an invalid option.`);
                console.error(
                    `ipv4.generate() » Valid options: [ ${ Object.keys(defaultOptions).join(', ') } ]`);
                return;
            }
            else if (['verbose'].includes(key)
                && typeof options[key] !== 'boolean') return console.error(
                    `ipv4.generate() » ERROR: [${ key }] option can only be \`true\` or \`false\`.`);
            else if (['qty'].includes(key)
                && (isNaN(options[key]) || options[key] < 1)) return console.error(
                    `ipv4.generate() » ERROR: [${ key }] option can only be an integer > 0.`);
        }

        // Generate IPv4 address(es)
        if (options.verbose) console.info(
            `ipv4.generate() » Generating IPv4 address${ options.qty > 1 ? 'es' : '' }...`);
        const ips = [];
        if (options.qty > 1) // generate array of [qty] IP strings
            for (let i = 0; i < options.qty; i++)
                ips.push(this.generate({ ...options, qty: 1, verbose: false }));
        else { // generate single IP
            const segments = [];
            for (let i = 0; i < 4; i++) segments.push(randomInt(0, 256));
            ips.push(segments.join('.'));
        }

        // Log/return final result
        const ipResult = options.qty > 1 ? ips : ips[0];
        if (options.verbose) {
            console.info(`ipv4.generate() » IPv4 address${ options.qty > 1 ? 'es' : '' } generated!`);
            console.info(options.qty === 1 ? `ipv4.generate() » ${ ipResult }`
                                           : 'ipv4.generate() » Check returned array.' );
        }
        return ipResult;
    },

    validate: function(address, options = {}) {

        // Init options
        const defaultOptions = {
            verbose: true // enable logging
        };
        options = { ...defaultOptions, ...options };

        // Validate address as arg
        if (typeof address !== 'string') return console.error(
            'ipv4.validate() » ERROR: 1st arg <address> must be a string.');

        // Validate options
        for (const key in options) {
            if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
                console.error(
                    `ipv4.validate() » ERROR: \`${ key }\` is an invalid option.`);
                console.error(
                    `ipv4.validate() » Valid options: [ ${ Object.keys(defaultOptions).join(', ') } ]`);
                return;
            }
            else if (typeof options[key] !== 'boolean')
                return console.error(
                    `ipv4.validate() » ERROR: [${ key }] option can only be set to \`true\` or \`false\`.`);
        }

        // Validate address as IPv4 address
        if (options.verbose) console.info('ipv4.validate() » Validating IPv4 address...');
        const segments = address.split('.');
        const addressIsValid = !( // false if any dq condition matches
                  segments.length !== 4 // not 4-segments long
               || segments.some(segment => // segment invalid
                       !/^\d+$/.test(segment) // for being non-numeric
                    || parseInt(segment, 10) < 0 // or negative
                    || parseInt(segment, 10) > 255 // or > 255
                  )
        );

        // Log/return final result
        if (options.verbose) console.info(
            `ipv4.validate() » IP is ${ !addressIsValid ? 'in' : '' }valid IPv4 address!`);
        return addressIsValid;
    }
};

const ipv6 = {

    generate: function(options = {}) {

        // Init options
        const defaultOptions = {
            verbose: true,       // enable logging
            qty: 1,              // number of IP addresses to generate
            leadingZeros: false, // include leading zeros in hex pieces
            doubleColon: true    // replace series of zeros w/ '::'
        };
        options = { ...defaultOptions, ...options };

        // Validate options
        for (const key in options) {
            if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
                console.error(
                    `ipv6.generate() » ERROR: \`${ key }\` is an invalid option.`);
                console.info(
                    `ipv6.generate() » Valid options: [ ${ Object.keys(defaultOptions).join(', ') } ]`);
                return;
            } else if (['verbose', 'leadingZeros', 'doubleColon'].includes(key)
                && typeof options[key] !== 'boolean') return console.error(
                    `ipv6.generate() » ERROR: [${ key }] option can only be \`true\` or \`false\`.`);
            else if (['qty'].includes(key)
                && (isNaN(options[key]) || options[key] < 1)) return console.error(
                    `ipv6.generate() » ERROR: [${ key }] option can only be an integer > 0.`);
        }

        // Generate IPv6 address(es)
        if (options.verbose) console.info(
            `ipv6.generate() » Generating IPv6 address${ options.qty > 1 ? 'es' : '' }...`);
        const ips = [];
        if (options.qty > 1) // generate array of [qty] IP strings
            for (let i = 0; i < options.qty; i++)
                ips.push(this.generate({ ...options, qty: 1, verbose: false }));
        else { // generate single IP
            const pieces = [], { qty, ...nonQtyOptions } = options; // eslint-disable-line no-unused-vars
            for (let i = 0; i < 8; i++) { // generate 8x 16-bit hex pieces
                let hex = '';
                for (let j = 0; j < 4; j++) // generate 4-char hex piece
                    hex += randomInt(0, 16).toString(16);
                pieces.push(hex);
            }
            ips.push(this.format(pieces.join(':'), { ...nonQtyOptions, verbose: false }));
        }

        // Log/return final result
        const ipResult = options.qty > 1 ? ips : ips[0];
        if (options.verbose) {
            console.info(`ipv6.generate() » IPv6 address${ options.qty > 1 ? 'es' : '' } generated!`);
            console.info(options.qty === 1 ? `ipv6.generate() » ${ ipResult }`
                                           : 'ipv6.generate() » Check returned array.' );
        }
        return ipResult;
    },

    format: function(address, options = {}) {

        // Init options
        const defaultOptions = {
            verbose: true,       // enable logging
            leadingZeros: false, // include leading zeros in hex pieces
            doubleColon: true    // replace series of zeros w/ '::'
        };
        options = { ...defaultOptions, ...options };

        // Validate address
        if (typeof address !== 'string') return console.error(
            'ipv6.format() » ERROR: 1st arg <address> must be a string.');
        if (!this.validate(address, { verbose: false})) return console.error(
            `ipv6.format() » ERROR:  ${ address } is not a valid IPv6 address.`);

        // Validate options
        for (const key in options) {
            if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
                console.error(
                    `ipv6.format() » ERROR: \`${ key }\` is an invalid option.`);
                console.error(
                    `ipv6.format() » Valid options: [ ${ Object.keys(defaultOptions).join(', ') } ]`);
                return;
            }
            if (typeof options[key] !== 'boolean')
                return console.error(
                    `ipv6.format() » ERROR: [${ key }] option can only be set to \`true\` or \`false\`.`);
        }

        // Init formattedAddress
        let formattedAddress = address;

        // Handle double colons
        if (options.doubleColon) { // replace zero series w/ '::'
            if (options.verbose) console.info(
                'ipv6.format() » Replacing zero series w/ \'::\'...');
            formattedAddress = formattedAddress.replace(/:(?:0+:)+/, '::');
        } else { // expand '::' into zero series
            if (options.verbose) console.info(
                'ipv6.format() » Expanding \'::\' into zero series...');
            const totalPieces = formattedAddress.split(':').filter(Boolean).length,
                  zeroSegment = options.leadingZeros ? '0000' : '0',
                  zeroSeries = Array(8 - totalPieces).fill(zeroSegment).join(':');
            formattedAddress = formattedAddress.replace('::', `:${ zeroSeries }:`);
        }

        // Handle leading zeros
        if (options.leadingZeros) { // add leading zeros
            if (options.verbose) console.info(
                'ipv6.format() » Adding leading zeros...');
            const pieces = formattedAddress.split(':');
            for (let i = 0; i < pieces.length; i++)
                while (pieces[i].length < 4) pieces[i] = '0' + pieces[i];
            formattedAddress = pieces.join(':');
        } else { // strip leading zeros
            if (options.verbose) console.info(
                'ipv6.format() » Stripping leading zeros...');
            formattedAddress = address.replace(/(^|(?<=:))0+(?!:)/g, '$1');
        }

        // Log/return final result
        if (options.verbose) {
            if (formattedAddress !== address) console.info(
                'ipv6.format() » IP formatted successfully!');
            else console.info(
                'ipv6.format() » IP already formatted to specs.');
            console.info(
                `ipv6.format() » ${ formattedAddress }`);
        }
        return formattedAddress;
    },

    validate: function(address, options = {}) {

        // Init options
        const defaultOptions = {
            verbose: true // enable logging
        };
        options = { ...defaultOptions, ...options };

        // Validate address as arg
        if (typeof address !== 'string') return console.error(
            'ipv6.validate() » ERROR: 1st arg <address> must be a string.');

        // Validate options
        for (const key in options) {
            if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
                console.error(
                    `ipv6.validate() » ERROR: \`${ key }\` is an invalid option.`);
                console.error(
                    `ipv6.validate() » Valid options: [ ${ Object.keys(defaultOptions).join(', ') } ]`);
                return;
            }
            if (typeof options[key] !== 'boolean')
                return console.error(
                    `ipv6.validate() » ERROR: [${ key }] option can only be set to \`true\` or \`false\`.`);
        }

        // Validate address as IPv6 address
        if (options.verbose) console.info(
            'ipv6.validate() » Validating IPv6 address...');
        const pieces = address.split(/::?/),
              lastPiece = pieces[pieces.length - 1];
        const addressIsValid = !( // false if any dq condition matches
                  address.includes('::') && address.split('::').length > 2 // 2+ '::'
               || /:{3,}/g.test(address) // 3+ consecutive ':'
               || pieces.length < 2 || pieces.length > 8 // 1 or 9+ hex pieces
               || pieces.some(piece => // hex piece invalid
                      !/^[\dA-Fa-f]{1,4}$/.test(piece) // for not being 1-4 valid chars
                          && (piece !== lastPiece // except last piece
                              || !ipv4.validate( // where IPv4-mapping appended invalid address
                                      lastPiece.replace( // determined by stripping valid length suffixes first
                                          /\/(?:0|(?:[1-2]?\d)|32|96)$/, ''), { verbose: false }
                  )))
        );

        // Log/return final result
        if (options.verbose) console.info(
            `ipv6.validate() » IP is ${ !addressIsValid ? 'in' : '' }valid IPv6 address!`);
        return addressIsValid;
    }
};

// EXPORT APIs
try { module.exports = { ipv4, ipv6 }; } catch (err) {} // for Node.js
try { window.ipv4 = ipv4; window.ipv6 = ipv6; } catch (err) {} // for Greasemonkey
