// © 2024 Adam Lui & contributors under the MIT license.
// Source: https://code.js-utils.com/generate-ip
// Documentation: https://docs.js-utils.com/generate-ip
// Latest minified release: https://cdn.jsdelivr.net/npm/generate-ip/dist/generate-ip.min.js

// IMPORT secure crypto RNG
let randomInt;
try { // to use Node.js module
    ({ randomInt } = require('crypto'));
} catch (err) { // use browser API or JS method
    const browserCrypto = window.crypto || window.msCrypto;
    randomInt = (min, max) => {
        const randomVal = browserCrypto?.getRandomValues(new Uint32Array(1))[0] / 0xFFFFFFFF || Math.random();
        return Math.floor(randomVal * (max - min)) + min;
    };
}

// Define APIs

const ipv4 = {

    generate: function(options = {}) {

        const docURL = 'https://docs.js-utils.com/generate-ip/#ipv4generateoptions',
              exampleCall = 'ipv4.generate({ verbose: false, qty: 3 })';

        const defaultOptions = {
            verbose: true, // enable logging
            qty: 1         // number of IP addresses to generate
        };

        // Validate/init options
        if (!validateOptions(options, defaultOptions, docURL, exampleCall)) return;
        options = { ...defaultOptions, ...options }; // merge validated options w/ missing default ones

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
        const ipResult = options.qty > 1 ? ips : ips[0];

        // Log/return final result
        if (options.verbose) {
            console.info(
                `ipv4.generate() » IPv4 address${ options.qty > 1 ? 'es' : '' } generated!`);
            if (options.qty == 1) console.info(
                `ipv4.generate() » ${ipResult}`);
            else if (typeof require == 'undefined' || !/cli(?:\.min)?\.js$/.test(require.main.filename)) console.info(
                'ipv4.generate() » Check returned array.' );
        }
        return ipResult;
    },

    validate: function(address, options = {}) {

        const docURL = 'https://docs.js-utils.com/generate-ip/#ipv4validateaddress-options',
              exampleCall = 'ipv4.validate(\'0.0.255.255\', { verbose: false })',
              defaultOptions = { verbose: true /* enable logging */ };

        // Validate address as arg
        if (typeof address != 'string') {
            console.error('ipv4.validate() » ERROR: 1st arg <address> must be a string.');
            console.info('ipv4.validate() » For more help, please visit ' + docURL);
            return;
        }

        // Validate/init options
        if (!validateOptions(options, defaultOptions, docURL, exampleCall)) return;
        options = { ...defaultOptions, ...options }; // merge validated options w/ missing default ones

        // Validate address as IPv4 address
        if (options.verbose) console.info('ipv4.validate() » Validating IPv4 address...');
        const segments = address.split('.');
        const addressIsValid = !( // false if any dq condition matches
                  segments.length != 4 // not 4-segments long
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

        const docURL = 'https://docs.js-utils.com/generate-ip/#ipv6generateoptions',
              exampleCall = 'ipv6.generate({ leadingZeros: true, qty: 5 })';

        const defaultOptions = {
            verbose: true,       // enable logging
            qty: 1,              // number of IP addresses to generate
            leadingZeros: false, // include leading zeros in hex pieces
            doubleColon: true    // replace series of zeros w/ '::'
        };

        // Validate/init options
        if (!validateOptions(options, defaultOptions, docURL, exampleCall)) return;
        options = { ...defaultOptions, ...options }; // merge validated options w/ missing default ones

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
            console.info(options.qty == 1 ? `ipv6.generate() » ${ipResult}`
                                          : 'ipv6.generate() » Check returned array.' );
        }
        return ipResult;
    },

    format: function(ipv6address, options = {}) {

        const docURL = 'https://docs.js-utils.com/generate-ip/#ipv6formatipv6address-options',
              exampleCall = 'ipv6.format(\'0d::ffff:192.1.56.10/96\', '
                          + '{ leadingZeros: true, doubleColon: false })';

        const defaultOptions = {
            verbose: true,       // enable logging
            leadingZeros: false, // include leading zeros in hex pieces
            doubleColon: true    // replace series of zeros w/ '::'
        };

        // Validate address
        if (typeof ipv6address != 'string') {
            console.error('ipv6.format() » ERROR: 1st arg <ipv6address> must be a string.');
            console.info('ipv6.format() » For more help, please visit ' + docURL);
            return;
        }
        if (!this.validate(ipv6address, { verbose: false})) {
            console.error(`ipv6.format() » ERROR:  ${ipv6address} is not a valid IPv6 address.`);
            console.info('ipv6.format() » For more help, please visit ' + docURL);
            return;
        }

        // Validate/init options
        if (!validateOptions(options, defaultOptions, docURL, exampleCall)) return;
        options = { ...defaultOptions, ...options }; // merge validated options w/ missing default ones

        // Init formattedAddress
        let formattedAddress = ipv6address;

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
            formattedAddress = formattedAddress.replace('::', `:${zeroSeries}:`);
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
            formattedAddress = ipv6address.replace(/(^|(?<=:))0+(?!:)/g, '$1');
        }

        // Log/return final result
        if (options.verbose) {
            if (formattedAddress != ipv6address) console.info(
                'ipv6.format() » IP formatted successfully!');
            else console.info(
                'ipv6.format() » IP already formatted to specs.');
            console.info(
                `ipv6.format() » ${formattedAddress}`);
        }
        return formattedAddress;
    },

    validate: function(address, options = {}) {

        const docURL = 'https://docs.js-utils.com/generate-ip/#ipv6validateaddress-options',
              exampleCall = 'ipv6.validate(\'0:0:0:0:0:ffff:192.1.56.10/96\', { verbose: false })',
              defaultOptions = { verbose: true /* enable logging */ };

        // Validate address as arg
        if (typeof address != 'string') {
            console.error('ipv6.validate() » ERROR: 1st arg <address> must be a string.');
            console.info('ipv6.validate() » For more help, please visit ' + docURL);
            return;
        }

        // Validate/init options
        if (!validateOptions(options, defaultOptions, docURL, exampleCall)) return;
        options = { ...defaultOptions, ...options }; // merge validated options w/ missing default ones

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
                          && (piece != lastPiece // except last piece
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

// Define INTERNAL validation function

function validateOptions(options, defaultOptions, docURL, exampleCall) {

    // Init option strings/types
    const strDefaultOptions = JSON.stringify(defaultOptions, null, 2)
        .replace(/"([^"]+)":/g, '$1:') // strip quotes from keys
        .replace(/"/g, '\'') // replace double quotes w/ single quotes
        .replace(/\n\s*/g, ' '); // condense to single line
    const strValidOptions = Object.keys(defaultOptions).join(', '),
          booleanOptions = Object.keys(defaultOptions).filter(key => typeof defaultOptions[key] == 'boolean'),
          integerOptions = Object.keys(defaultOptions).filter(key => Number.isInteger(defaultOptions[key]));

    // Init log vars
    let logPrefix = 'validateOptions() » ';
    try { logPrefix = validateOptions.caller?.name + '() » '; } catch (err) {}
    let optionsPos = exampleCall.split(',').findIndex(arg => arg.trim().startsWith('{')) + 1;
    optionsPos += ['st','nd','rd'][optionsPos - 1] || 'th'; // append ordinal suffix

    // Define print functions
    const printValidOptions = () => {
        console.info(`${ logPrefix }Valid options: [ ${strValidOptions} ]`);
        console.info(`${ logPrefix }If omitted, default settings are: ${strDefaultOptions}`);
    };
    const printDocURL = () => {
        console.info(`${ logPrefix }For more help, please visit ${docURL}`); };

    // Validate options
    if (typeof options != 'object') { // validate as obj
        console.error(`${ logPrefix }ERROR: ${
            optionsPos == '0th' ? '[O' : optionsPos + ' arg [o'}ptions] can only be an object of key/values.`);
        console.info(`${ logPrefix }Example valid call: ${exampleCall}`);
        printValidOptions(); printDocURL(); return false;
    }
    for (const key in options) { // validate each key
        if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
            console.error(`${ logPrefix }ERROR: \`${key}\` is an invalid option.`);
            printValidOptions(); printDocURL(); return false;
        } else if (booleanOptions.includes(key) && typeof options[key] != 'boolean') {
            console.error(`${ logPrefix }ERROR: [${key}] option can only be \`true\` or \`false\`.`);
            printDocURL(); return false;
        } else if (integerOptions.includes(key)) {
            options[key] = parseInt(options[key], 10);
            if (isNaN(options[key]) || options[key] < 1) {
                console.error(`${ logPrefix }ERROR: [${key}] option can only be an integer > 0.`);
                printDocURL(); return false;
            }
        }
    }
    return true;
}

// EXPORT APIs
const apiAliases = { ipv4: ['IPV4', 'IPv4', 'ipV4'], ipv6: ['IPV6', 'IPv6', 'ipV6'] };
try { module.exports = { ipv4, ipv6 }; } catch (err) {} // for Node.js
try { window.ipv4 = ipv4; window.ipv6 = ipv6; } catch (err) {} // for Greasemonkey
for (const api in apiAliases) // init/export aliases
    apiAliases[api].forEach(alias => {
        try { module.exports[alias] = module.exports[api]; } catch (err) {} // for Node.js
        try { window[alias] = window[api]; } catch (err) {} // for Greasemonkey
    });
