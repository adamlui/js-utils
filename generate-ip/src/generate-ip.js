// © 2024 Adam Lui under the MIT license.
// Source: https://github.com/adamlui/js-utils/tree/main/generate-ip
// Latest minified release: https://cdn.jsdelivr.net/npm/generate-ip/dist/generate-ip.min.js

// IMPORT secure crypto RNG
let randomInt;
try { // to use Node.js module
    randomInt = require('crypto').randomInt;
} catch (err) { // use browser API or JS method
    const webCrypto = window.crypto || window.msCrypto;
    randomInt = function(min, max) {
        if (webCrypto) {
            const range = max - min,
                  randomVal = webCrypto.getRandomValues(new Uint32Array(1))[0];
            return Math.floor(randomVal / 0xFFFFFFFF * range) + min;
        } else // use JS method
            return Math.floor(Math.random() * (max - min)) + min;
    };
}

// Define APIs

const ipv4 = {

    generate: function(options = {}) {

        // Init options
        const defaultOptions = { verbose: true };
        options = { ...defaultOptions, ...options };

        // Validate options
        for (const key of Object.keys(options)) {
            if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) return console.error(
                `ipv4.generate() » ERROR: \`${ key }\` is an invalid option.\n`
              + `ipv4.generate() » Valid options: [ ${ Object.keys(defaultOptions).join(', ') } ]`);
            else if (typeof options[key] !== 'boolean') return console.error(
                `ipv4.generate() » ERROR: [${ key }] option can only be set to \`true\` or \`false\`.`);
        }

        // Generate IPv4 address
        if (options.verbose) console.info('ipv4.generate() » Generating IPv4 address...');
        const segments = [];
        for (let i = 0; i < 4; i++) segments.push(randomInt(0, 256));
        const ip = segments.join('.');

        // Log/return final result
        if (options.verbose) console.info(
                'ipv4.generate() » IPv4 address generated!'
          + (typeof require !== 'undefined' && require.main !== module ?
              '\nipv4.generate() » Check returned string.' : '' ));
        return ip;
    },

    validate: function(address, options = {}) {

        // Init options
        const defaultOptions = { verbose: true };
        options = { ...defaultOptions, ...options };

        // Validate address as arg
        if (typeof address !== 'string') return console.error(
            'ipv4.validate() » ERROR: 1st arg <address> must be a string.');

        // Validate options
        for (const key of Object.keys(options)) {
            if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) return console.error(
                `ipv4.validate() » ERROR: \`${ key }\` is an invalid option.\n`
              + `ipv4.validate() » Valid options: [ ${ Object.keys(defaultOptions).join(', ') } ]`);
            else if (typeof options[key] !== 'boolean') return console.error(
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
        const defaultOptions = { verbose: true, leadingZeros: false, doubleColon: true };
        options = { ...defaultOptions, ...options };

        // Validate options
        for (const key in options) {
            if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) return console.error(
                `ipv6.generate() » ERROR: \`${ key }\` is an invalid option.\n`
              + `ipv6.generate() » Valid options: [ ${ Object.keys(defaultOptions).join(', ') } ]`);
            if (typeof options[key] !== 'boolean') return console.error(
                `ipv6.generate() » ERROR: [${ key }] option can only be \`true\` or \`false\`.`);
        }

        // Generate IPv6 address
        if (options.verbose) console.info('ipv6.generate() » Generating IPv6 address...');
        const pieces = [];
        for (let i = 0; i < 8; i++) { // generate 8x 16-bit hex pieces
            let hex = '';
            for (let j = 0; j < 4; j++) // generate 4-char hex piece
                hex += randomInt(0, 16).toString(16);
            pieces.push(hex);
        }
        const ip = this.format(pieces.join(':'), { ...options, verbose: false });

        // Log/return final result
        if (options.verbose) console.info(
                'ipv6.generate() » IPv6 address generated!'
          + (typeof require !== 'undefined' && require.main !== module ?
              '\nipv6.generate() » Check returned string.' : '' ));
        return ip;
    },

    format: function(address, options = {}) {

        // Init options
        const defaultOptions = { verbose: true, leadingZeros: false, doubleColon: true };
        options = { ...defaultOptions, ...options };

        // Validate address
        if (typeof address !== 'string') return console.error(
            'ipv6.format() » ERROR: 1st arg <address> must be a string.');
        if (!this.validate(address, { verbose: false})) return console.error(
            `ipv6.format() » ERROR: \n- ${ address } is not a valid IPv6 address.`);

        // Validate options
        for (const key in options) {
            if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) return console.error(
                `ipv6.format() » ERROR: \`${ key }\` is an invalid option.\n`
              + `ipv6.format() » Valid options: [ ${ Object.keys(defaultOptions).join(', ') } ]`);
            if (typeof options[key] !== 'boolean') return console.error(
                `ipv6.format() » ERROR: [${ key }] option can only be \`true\` or \`false\`.`);
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
                'ipv6.format() » IP formatted successfully!\n'
              + 'ipv6.format() » Check returned string.');
            else console.info(
                'ipv6.format() » IP already formatted to specs.');
        }
        return formattedAddress;
    },

    validate: function(address, options = {}) {

        // Init options
        const defaultOptions = { verbose: true };
        options = { ...defaultOptions, ...options };

        // Validate address as arg
        if (typeof address !== 'string') return console.error(
            'ipv6.validate() » ERROR: 1st arg <address> must be a string.');

        // Validate options
        for (const key in options) {
            if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) return console.error(
                `ipv6.validate() » ERROR: \`${ key }\` is an invalid option.\n`
              + `ipv6.validate() » Valid options: [ ${ Object.keys(defaultOptions).join(', ') } ]`);
            if (typeof options[key] !== 'boolean') return console.error(
                `ipv6.validate() » ERROR: [${ key }] option can only be \`true\` or \`false\`.`);
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
