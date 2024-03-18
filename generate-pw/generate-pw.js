#!/usr/bin/env node

// Import crypto.randomInt() for secure RNG
const { randomInt } = require('crypto');

// Init CHARACTER SETS
const charsets = {
    lower: 'abcdefghijklmnopqrstuvwxyz',
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()-_=+[]{}/\\|;:\'",.<>?'
};

// Define MAIN functions

function generatePassword(options = {}) { 

    // Init options
    const defaultOptions = {
        length: 8,       // length of password
        qty: 1,          // number of passwords to generate
        charset: '',     // characters to include
        exclude: '',     // characters to exclude
        numbers: false,  // include numberChars
        symbols: false,  // include symbolChars
        lowercase: true, // include lowercase letters
        uppercase: true, // include uppercase letters
        strict: false    // require at least one char from each enabled set
    };
    options = { ...defaultOptions, ...options };

    if (options.qty > 1) { // return array of [qty] password strings
        const { qty, ...otherOptions } = options;
        return generatePasswords(qty, otherOptions);

    } else { // return single password string

        // Init password's char set
        let pwCharset = options.charset || ( // use passed [charset], or construct from options
            (options.numbers ? charsets.numbers : '')
              + (options.symbols ? charsets.symbols : '')
              + (options.lowercase ? charsets.lower : '') 
              + (options.uppercase ? charsets.upper : '')
        );
        if (pwCharset === '') // all flags false + no charset passed
            pwCharset = charsets.lower + charsets.upper; // default to upper + lower

        // Exclude passed `exclude` chars
        pwCharset = pwCharset.replace(new RegExp(`[${ options.exclude }]`, 'g'), '');

        // Generate unstrict password
        let password = '';
        for (let i = 0; i < options.length; i++) {
            const randomIndex = randomInt(0, pwCharset.length);
            password += pwCharset.charAt(randomIndex);
        }

        // Enforce strict mode if enabled
        if (options.strict) { 
            const charTypes = ['number', 'symbol', 'lower', 'upper'],
                  requiredCharTypes = charTypes.filter(charType => options[charType + 's'] || options[charType + 'case']);

            // Init flags
            for (const charType of requiredCharTypes)
                global['has' + charType.charAt(0).toUpperCase() + charType.slice(1)] = false;
            for (let i = 0; i < password.length; i++)
                for (const charType of requiredCharTypes)
                    if ((charsets[charType] || charsets[charType + 's']).includes(password.charAt(i)))
                        global['has' + charType.charAt(0).toUpperCase() + charType.slice(1)] = true;

            // Modify password if necessary
            const maxReplacements = Math.min(password.length, requiredCharTypes.length),
                  replacedPositions = []; let replacementCnt = 0;
            for (const charType of requiredCharTypes) {
                if (replacementCnt < maxReplacements) {
                    if (!global['has' + charType.charAt(0).toUpperCase() + charType.slice(1)]) {
                        let replacementPos;
                        do replacementPos = randomInt(0, password.length); // pick random pos
                        while (replacedPositions.includes(replacementPos)); // check if pos already replaced
                        replacedPositions.push(replacementPos); // track new replacement pos
                        const replacementCharSet = charsets[charType] || charsets[charType + 's'];
                        password = password.substring(0, replacementPos) // perform actual replacement
                                 + replacementCharSet.charAt(randomInt(0, replacementCharSet.length))
                                 + password.substring(replacementPos + 1);
                        replacementCnt++;
            }}}
        }

        return password;
    }
}

function generatePasswords(qty, options) {
    qty = parseInt(qty);
    if (isNaN(qty)) return console.error(
        'ERROR: First argument <qty> of generatePasswords() must be an integer');
    const passwords = [];
    for (let i = 0; i < qty; i++) passwords.push(generatePassword(options));
    return passwords;
}

// EXPORT functions if script was required
if (require.main !== module) module.exports = { generatePassword, generatePasswords };

else { // run as CLI tool

    // Init UI colors
    const nc = '\x1b[0m',    // no color
          br = '\x1b[1;91m', // bright red
          bw = '\x1b[1;97m'; // bright white

    // Load settings from ARGS
    const config = { 
        length: parseInt(process.argv.find(arg => /^--?length/.test(arg))?.split('=')[1]) || 8,
        qty: parseInt(process.argv.find(arg => /^--?qu?a?n?ti?t?y=\d+$/.test(arg))?.split('=')[1]) || 1,
        charset: process.argv.find(arg => /^--?chars/.test(arg))?.split('=')[1] || charsets.lower + charsets.upper,
        excludeChars: process.argv.find(arg => /^--?exclude=/.test(arg))?.split('=')[1] || '',
        includeNums: process.argv.some(arg => /^--?(?:n|(?:include-?)?num(?:ber)?s?=?(?:true|1)?)$/.test(arg)),
        includeSymbols: process.argv.some(arg => /^--?(?:s|(?:include-?)?symbols?=?(?:true|1)?)$/.test(arg)),
        excludeLowerChars: process.argv.some(arg =>
            /^--?(?:L|(?:exclude|disable|no)-?lower-?(?:case)?|lower-?(?:case)?=(?:false|0))$/.test(arg)),
        excludeUpperChars: process.argv.some(arg =>
            /^--?(?:U|(?:exclude|disable|no)-?upper-?(?:case)?|upper-?(?:case)?=(?:false|0))$/.test(arg)),
        strictMode: process.argv.some(arg => /^--?s(?:trict)?(?:-?mode)?$/.test(arg))
    };

    // Show VERSION number if -v or --version passed
    if (process.argv.some(arg => /^--?ve?r?s?i?o?n?$/.test(arg))) {
        console.info('v' + require('./package.json').version);

    } else { // run MAIN routine
        for (const numArgType of ['length', 'qty']) {
            if (config[numArgType] < 1) {
                console.error(`\n${br}Error: '${ numArgType }' argument must be 1 or greater.${nc}`);
                process.exit(1);
        }}
        const funcOptions = {
            length: config.length, qty: config.qty, charset: config.charset, exclude: config.excludeChars,
            numbers: config.includeNums, symbols: config.includeSymbols,
            lowercase: !config.excludeLowerChars, uppercase: !config.excludeUpperChars,
            strict: config.strictMode
        };
        const pwResult = generatePassword(funcOptions);
        console.log('\n' + bw + ( Array.isArray(pwResult) ? pwResult.join('\n') : pwResult ) + nc);
    }
}
