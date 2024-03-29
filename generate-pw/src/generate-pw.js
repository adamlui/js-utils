// © 2024 Adam Lui & contributors under the MIT license.
// Source: https://github.com/adamlui/js-utils/tree/main/generate-pw
// Documentation: https://github.com/adamlui/js-utils/tree/main/generate-pw#readme

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
        verbose: true,   // enable logging
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

    // Validate options
    const validOptions = Object.keys(defaultOptions).join(', ');
    for (const key in options) {
        if (key == '0') {
            console.error(
                'generatePassword() » ERROR: 1st arg `options` can only be an object of key/values.');
            console.info(
                'generatePassword() » Example: generatePassword({ verbose: false, numbers: true })');
            console.info(
                `generatePassword() » Valid options: [ ${ validOptions } ]`);
            return;
        } else if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
            console.error(
                `generatePassword() » ERROR: \`${ key }\` is an invalid option.`);
            console.info(
                `generatePassword() » Valid options: [ ${ validOptions } ]`);
            return;
        }
        else if (['length', 'qty'].includes(key)) {
            options[key] = parseInt(options[key], 10);
            if (isNaN(options[key]) || options[key] < 1) return console.error(
                `generatePassword() » ERROR: [${ key }] option can only be \`true\` or \`false\`.`);
        } else if (['numbers', 'symbols', 'lowercase', 'uppercase', 'strict'].includes(key))
            if (typeof options[key] !== 'boolean') return console.error(
                `generatePassword() » ERROR: [${ key }] option can only be \`true\` or \`false\`.`);
    }

    if (options.qty > 1) { // generate/return array of [qty] password strings
        const { qty, ...nonQtyOptions } = options;
        return generatePasswords(qty, nonQtyOptions);

    } else { // generate/return single password
        const fromMutliFunc = generatePassword.caller?.name === 'generatePasswords'; // flag to avoid repetitive logs

        // Init password's char set
        if (options.verbose && !fromMutliFunc) console.info('generatePassword() » Initializing character set...');
        let pwCharset = options.charset || ( // use passed [charset], or construct from options
            (options.numbers ? charsets.numbers : '')
              + (options.symbols ? charsets.symbols : '')
              + (options.lowercase ? charsets.lower : '') 
              + (options.uppercase ? charsets.upper : '')
        );
        if (pwCharset === '') // all flags false + no charset passed
            pwCharset = charsets.lower + charsets.upper; // default to upper + lower

        // Exclude passed `exclude` chars
        if (options.exclude) {
            if (options.verbose && !fromMutliFunc) console.info('generatePassword() » Removing excluded characters...');
            pwCharset = pwCharset.replace(new RegExp(`[${ options.exclude }]`, 'g'), '');
        }

        // Generate unstrict password
        if (options.verbose && !fromMutliFunc) console.info('generatePassword() » Generating password...');
        let password = '';
        for (let i = 0; i < options.length; i++) {
            const randomIndex = randomInt(0, pwCharset.length);
            password += pwCharset.charAt(randomIndex);
        }

        // Enforce strict mode if enabled
        if (options.strict) {
            if (options.verbose && !fromMutliFunc) console.info('generatePassword() » Enforcing strict mode...');
            const charTypes = ['number', 'symbol', 'lower', 'upper'],
                  requiredCharTypes = charTypes.filter(charType => options[charType + 's'] || options[charType + 'case']);
            password = strictify(password, requiredCharTypes);
        }

        // Log/return final result
        if (options.verbose && !fromMutliFunc) console.info(
            'generatePassword() » Password generated!');
        if (!require.main.filename.endsWith('cli.js')) console.info(
            'generatePassword() » Check returned string.');
        return password;
    }
}

function generatePasswords(qty, options = {}) {

    // Init options
    const defaultOptions = {
        verbose: true,   // enable logging
        length: 8,       // length of password
        charset: '',     // characters to include
        exclude: '',     // characters to exclude
        numbers: false,  // include numberChars
        symbols: false,  // include symbolChars
        lowercase: true, // include lowercase letters
        uppercase: true, // include uppercase letters
        strict: false    // require at least one char from each enabled set
    };
    options = { ...defaultOptions, ...options };

    // Validate qty
    qty = parseInt(qty, 10);
    if (isNaN(qty) || qty < 1) return console.error(
        'generatePasswords() » ERROR: 1st arg <qty> can only be an integer > 0.');

    // Validate options
    const validOptions = Object.keys(defaultOptions).join(', ');
    for (const key in options) {
        if (key == '0') {
            console.error(
                'generatePasswords() » ERROR: 2nd arg `options` can only be an object of key/values.');
            console.info(
                'generatePasswords() » Example: generatePasswords(3, { verbose: false, symbols: true })');
            console.info(
                `generatePasswords() » Valid options: [ ${ validOptions } ]`);
            return;
        } else if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
            console.error(
                `generatePasswords() » ERROR: \`${ key }\` is an invalid option.`);
            console.info(
                `generatePasswords() » Valid options: [ ${ validOptions } ]`);
            return;
        }
    }
    options.length = parseInt(options.length);
    if (isNaN(options.length) || options.length < 1) return console.error(
            'generatePasswords() » ERROR: [length] option can only be an integer > 0.');
    for (const booleanArgType of ['numbers', 'symbols', 'lowercase', 'uppercase', 'strict'])
        if (typeof options[booleanArgType] !== 'boolean') return console.error(
            `generatePasswords() » ERROR: [${ booleanArgType }] option can only be \`true\` or \`false\`.`);

    // Generate passwords
    if (options.verbose) console.info(`generatePasswords() » Generating password${ qty > 1 ? 's' : '' }...`);
    const passwords = [];
    for (let i = 0; i < qty; i++) passwords.push(generatePassword(options));

    // Log/return final result
    if (options.verbose) console.info(
        `generatePasswords() » Password${ qty > 1 ? 's' : '' } generated!`);
    if (!require.main.filename.endsWith('cli.js')) console.info(
        'generatePasswords() » Check returned array.');
    return passwords;
}

function strictify(password, requiredCharTypes = ['number', 'symbol', 'lower', 'upper'], options = {}) {

    // Init options
    const defaultOptions = {
        verbose: true // enable logging
    };
    options = { ...defaultOptions, ...options };

    // Validate password
    if (typeof password !== 'string') return console.error(
        'strictify() » ERROR: 1st arg <password> must be a string.');

    // Validate requiredCharTypes
    const validCharTypes = ['number', 'symbol', 'lower', 'upper'];
    if (!Array.isArray(requiredCharTypes)) // convert string to array
        requiredCharTypes = [requiredCharTypes];
    for (const charType of requiredCharTypes) {
        if (!validCharTypes.includes(charType)) { 
            console.error(`strictify() » ERROR: 2nd arg \`${ charType }\` is an invalid character type.`);
            console.info(`strictify() » Valid character types: [ ${ validCharTypes.join(', ') } ]`);
            return;
    }}

    // Validate options
    const validOptions = Object.keys(defaultOptions).join(', ');
    for (const key in options) {
        if (key == '0') {
            console.error(
                'strictify() » ERROR: 3nd arg `options` can only be an object of key/values.');
            console.info(
                'strictify() » Example: strictify(\'pa55word\', [\'symbol\', \'upper\'], { verbose: false })');
            console.info(
                `strictify() » Valid options: [ ${ validOptions } ]`);
            return;
        } else if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
            console.error(
                `strictify() » ERROR: \`${ key }\` is an invalid option.`);
            console.info(
                `strictify() » Valid options: [ ${ validOptions } ]`);
            return;
        } else if (typeof options[key] !== 'boolean')
            return console.error(
                `strictify() » ERROR: [${ key }] option can only be set to \`true\` or \`false\`.`);
    }

    // Init mod flags
    const hasFlags = {};
    for (const charType of requiredCharTypes)
        hasFlags['has' + charType.charAt(0).toUpperCase() + charType.slice(1)] = false;
    for (let i = 0; i < password.length; i++)
        for (const charType of requiredCharTypes)
            if ((charsets[charType] || charsets[charType + 's']).includes(password.charAt(i)))
                hasFlags['has' + charType.charAt(0).toUpperCase() + charType.slice(1)] = true;

    // Modify password if unstrict
    if (options.verbose) console.info('strictify() » Strictifying password...');
    const maxReplacements = Math.min(password.length, requiredCharTypes.length),
          replacedPositions = [];
    let replacementCnt = 0, strictPW = password;
    for (const charType of requiredCharTypes) {
        if (replacementCnt < maxReplacements) {
            if (!hasFlags['has' + charType.charAt(0).toUpperCase() + charType.slice(1)]) {
                let replacementPos;
                do replacementPos = randomInt(0, password.length); // pick random pos
                while (replacedPositions.includes(replacementPos)); // check if pos already replaced
                replacedPositions.push(replacementPos); // track new replacement pos
                const replacementCharSet = charsets[charType] || charsets[charType + 's'];
                strictPW = strictPW.substring(0, replacementPos) // perform actual replacement
                         + replacementCharSet.charAt(randomInt(0, replacementCharSet.length))
                         + strictPW.substring(replacementPos + 1);
                replacementCnt++;
    }}}

    // Log/return final result
    if (options.verbose) {
        if (replacementCnt > 0) {
            console.info('strictify() » Password is now strict!');
            console.info('strictify() » Check returned string.');
        } else {
            console.info(`strictify() » Password already includes ${ requiredCharTypes.join(' + ') } characters!\n`);
            console.info('strictify() » No modifications made.');
        }
    }
    return strictPW;
}

function validateStrength(password, options = {}) {
    const strengthCriteria = { minLength: 8, minLower: 1, minUpper: 1, minNumber: 1, minSymbol: 1 };

    // Init options
    const defaultOptions = {
        verbose: true // enable logging
    };
    options = { ...defaultOptions, ...options };

    // Validate password
    if (typeof password !== 'string') return console.error(
        'validateStrength() » ERROR: 1st arg <password> must be a string.');

    // Validate options
    const validOptions = Object.keys(defaultOptions).join(', ');
    for (const key in options) {
        if (key == '0') {
            console.error(
                'validateStrength() » ERROR: 2nd arg `options` can only be an object of key/values.');
            console.info(
                'validateStrength() » Example: validateStrength(\'pa55word\', { verbose: false })');
            console.info(
                `validateStrength() » Valid options: [ ${ validOptions } ]`);
            return;
        } else if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
            console.error(
                `validateStrength() » ERROR: \`${ key }\` is an invalid option.`);
            console.info(
                `validateStrength() » Valid options: [ ${ validOptions } ]`);
            return;
        } else if (typeof options[key] !== 'boolean')
            return console.error(
                `validateStrength() » ERROR: [${ key }] option can only be set to \`true\` or \`false\`.`);
    }

    if (options.verbose) console.info('validateStrength() » Validating password strength...');

    // Count occurrences of each char type
    const charCnts = { 'lower': 0, 'upper': 0, 'number': 0, 'symbol': 0 };
    for (const char of password)
        for (const charType of Object.keys(charCnts))
            if ((charsets[charType] || charsets[charType + 's']).includes(char))
                charCnts[charType]++;

    // Check criteria + add recommendations
    const recommendations = [];
    if (password.length < strengthCriteria.minLength)
        recommendations.push(`Make it at least ${ strengthCriteria.minLength } characters long.`);
    for (const charType of Object.keys(charCnts))
        if (charCnts[charType] < strengthCriteria['min' + charType.charAt(0).toUpperCase() + charType.slice(1)])
            recommendations.push('Include at least one ' + charType
                + `${ ['upper', 'lower'].includes(charType) ? 'case letter' : '' }.`);

    // Calculate strength score based on counts and criteria
    let strengthScore = 0;
    strengthScore += ( // +20 for satisfying min length
        password.length >= strengthCriteria.minLength) ? 20 : 0;
    for (const charType of Object.keys(charCnts))
        strengthScore += ( // +20 per char type included
            charCnts[charType] >= strengthCriteria['min' + charType.charAt(0).toUpperCase() + charType.slice(1)]) ? 20 : 0;

    // Log/return final result
    if (options.verbose) {
        console.info('validateStrength() » Password strength validated!');
        console.info('validateStrength() » Check returned object for score/recommendations.');
    }
    return { strengthScore, recommendations, isGood: strengthScore >= 80 };
}

// EXPORT main functions
module.exports = { generatePassword, generatePasswords, strictify, validateStrength };
