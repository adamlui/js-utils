#!/usr/bin/env node

// Import LIBS
const { randomInt } = require('crypto'),
      { execSync } = require('child_process');

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

    // Validate options
    for (const key of Object.keys(options))
        if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) return console.error(
            `generatePassword() » ERROR: \`${ key }\` is an invalid option.`
                + `\ngeneratePassword() » Valid options:\n  [ ${Object.keys(defaultOptions).join(', ')} ]`);
    for (const numArgType of ['length', 'qty'])
        if (isNaN(options[numArgType]) || options[numArgType] < 1) return console.error(
            `generatePassword() » ERROR: [${ numArgType }] option must be > 1.`);
    for (const booleanArgType of ['numbers', 'symbols', 'lowercase', 'uppercase', 'strict'])
        if (typeof options[booleanArgType] !== 'boolean') return console.error(
            `generatePassword() » ERROR: [${ booleanArgType }] option can only be \`true\` or \`false\`.`);

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
            password = strictify(password, requiredCharTypes);
        }

        return password;
    }
}

function generatePasswords(qty, options = {}) {

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

    // Validate qty
    qty = parseInt(qty);
    if (isNaN(qty)) return console.error(
        'generatePasswords() » ERROR: First argument [qty] of generatePasswords() must be an integer');

    // Validate options
    for (const key of Object.keys(options))
        if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) return console.error(
            `generatePasswords() » ERROR: \`${ key }\` is an invalid option.`
                + `\ngeneratePassword() » Valid options:\n  [ ${Object.keys(defaultOptions).join(', ')} ]`);
    if (isNaN(options.length) || options.length < 1) return console.error(
        'generatePasswords() » ERROR: [length] options must be > 1.');
    for (const booleanArgType of ['numbers', 'symbols', 'lowercase', 'uppercase', 'strict'])
        if (typeof options[booleanArgType] !== 'boolean') return console.error(
            `generatePasswords() » ERROR: [${ booleanArgType }] option can only be \`true\` or \`false\`.`);

    // Generate/return passwords
    const passwords = [];
    for (let i = 0; i < qty; i++) passwords.push(generatePassword(options));
    return passwords;
}

function strictify(password, requiredCharTypes = ['number', 'symbol', 'lower', 'upper']) {

    // Init flags
    for (const charType of requiredCharTypes)
        global['has' + charType.charAt(0).toUpperCase() + charType.slice(1)] = false;
    for (let i = 0; i < password.length; i++)
        for (const charType of requiredCharTypes)
            if ((charsets[charType] || charsets[charType + 's']).includes(password.charAt(i)))
                global['has' + charType.charAt(0).toUpperCase() + charType.slice(1)] = true;

    // Modify password if necessary
    const maxReplacements = Math.min(password.length, requiredCharTypes.length),
          replacedPositions = [];
    let replacementCnt = 0, strictPW = password;
    for (const charType of requiredCharTypes) {
        if (replacementCnt < maxReplacements) {
            if (!global['has' + charType.charAt(0).toUpperCase() + charType.slice(1)]) {
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

    return strictPW;
}

function validateStrength(password) {
    const strengthCriteria = { minLength: 8, minLower: 1, minUpper: 1, minNumber: 1, minSymbol: 1 };

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

    return { strengthScore, recommendations, isGood: strengthScore >= 80 };
}

// EXPORT main functions if script was required
if (require.main !== module) module.exports = { generatePassword, generatePasswords, strictify, validateStrength };

else { // run as CLI utility

    // Init UI colors
    const nc = '\x1b[0m',    // no color
          br = '\x1b[1;91m', // bright red
          by = '\x1b[1;33m'; // bright yellow

    // Load settings from ARGS
    const config = {};
    const argRegex = {
        paramOptions: {
            'length': /^--?length/,
            'qty': /^--?qu?a?n?ti?t?y=.*$/,
            'charset': /^--?chars/,
            'excludeChars': /^--?exclude=/
        },
        flags: {
            'includeNums': /^--?(?:n|(?:include-?)?num(?:ber)?s?=?(?:true|1)?)$/,
            'includeSymbols': /^--?(?:s|(?:include-?)?symbols?=?(?:true|1)?)$/,
            'excludeLowerChars': /^--?(?:L|(?:exclude|disable|no)-?lower-?(?:case)?|lower-?(?:case)?=(?:false|0))$/,
            'excludeUpperChars': /^--?(?:U|(?:exclude|disable|no)-?upper-?(?:case)?|upper-?(?:case)?=(?:false|0))$/,
            'strictMode': /^--?s(?:trict)?(?:-?mode)?$/
        },
        cmds: {
            'help': /^--?h(?:elp)?$/,
            'version': /^--?ve?r?s?i?o?n?$/
        }
    };
    process.argv.forEach(arg => {
        if (!arg.startsWith('-')) return;
        const matchedParamOption = Object.keys(argRegex.paramOptions).find(option => argRegex.paramOptions[option].test(arg)),
              matchedFlag = Object.keys(argRegex.flags).find(flag => argRegex.flags[flag].test(arg)),
              matchedCmd = Object.keys(argRegex.cmds).find(cmd => argRegex.cmds[cmd].test(arg));
        if (matchedFlag) config[matchedFlag] = true;
        else if (matchedParamOption) {
            const value = arg.split('=')[1];
            config[matchedParamOption] = parseInt(value) || value;
        } else if (!matchedCmd) {
            console.error(`\n${br}ERROR: Arg [${ arg }] not recognized.${nc}`);
            console.info(`\n${by}Valid arguments are below.${nc}`);
            printHelpSections(['paramOptions', 'booelanOptions', 'infoCmds']);
            process.exit(1);
    }});

    // Show HELP screen if -h or --help passed
    if (process.argv.some(arg => /^--?h(?:elp)?$/.test(arg))) printHelpSections();

    // Show VERSION number if -v or --version passed
    else if (process.argv.some(arg => /^--?ve?r?s?i?o?n?$/.test(arg)))
        console.info('v' + require('./package.json').version);

    else { // run MAIN routine
        for (const numArgType of ['length', 'qty'])
            if (config[numArgType] && (isNaN(config[numArgType]) || config[numArgType] < 1)) {
                console.error(`\n${br}Error: [${ numArgType }] argument must be > 1.${nc}`);
                process.exit(1);
            }
        const funcOptions = {
            length: config.length || 8, qty: config.qty || 1,
            charset: config.charset, exclude: config.excludeChars,
            numbers: !!config.includeNums, symbols: !!config.includeSymbols,
            lowercase: !config.excludeLowerChars, uppercase: !config.excludeUpperChars,
            strict: !!config.strictMode
        };
        const pwResult = generatePassword(funcOptions);
        copyToClipboard(Array.isArray(pwResult) ? pwResult.join('\n') : pwResult);
    }

    function printHelpSections(includeSections = ['cmdFormat', 'paramOptions', 'booelanOptions', 'infoCmds']) {
        const helpSections = {
            'cmdFormat': [
                `\n${by}generate-pw [options|commands]${nc}`
            ],
            'paramOptions': [
                '\nParameter options:',
                ' --length=n                  Generate password(s) of n length.',
                ' --qty=n                     Generate n password(s).',
                ' --charset=chars             Only include chars in password(s).',
                ' --charset=chars             Only include chars in password(s).',
                ' --exclude=chars             Exclude chars from password(s).'
            ],
            'booelanOptions': [
                '\nBoolean options:',
                ' -n, --include-numbers       Allow numbers in password(s).',
                ' -s, --include-symbols       Allow symbols in password(s).',
                ' -L, --no-lowercase          Disallow lowercase letters in password(s).',
                ' -U, --no-uppercase          Disallow uppercase letters in password(s).'
            ],
            'infoCmds': [
                '\nInfo commands:',
                ' -h, --help                  Display help screen.',
                ' -v, --version               Show version number.'
            ]
        };
        includeSections.forEach(section => { // print valid arg elems
            helpSections[section]?.forEach(line => printHelpMsg(line)); });

        function printHelpMsg(msg) { // wrap msg + indent 2nd+ lines (for --help screen)
            const terminalWidth = process.stdout.columns || 80,
                  indentation = 29, lines = [], words = msg.match(/\S+|\s+/g);

            // Split msg into lines of appropriate lengths
            let currentLine = '';
            words.forEach(word => {
                const lineLength = terminalWidth - ( lines.length === 0 ? 0 : indentation );
                if (currentLine.length + word.length > lineLength) { // cap/store it
                    lines.push(lines.length === 0 ? currentLine : currentLine.trimStart());
                    currentLine = '';
                }
                currentLine += word;
            });
            lines.push(lines.length === 0 ? currentLine : currentLine.trimStart());

            // Print formatted msg
            lines.forEach((line, index) => console.info(
                index === 0 ? line // print 1st line unindented
                    : ' '.repeat(indentation) + line // print subsequent lines indented
            ));
        }
    }

    function copyToClipboard(data) {
        data = data.replace(/\s+$/m, '').replace(/"/g, '""');
        if (process.platform === 'darwin') // macOS
            execSync(`printf "${ data }" | pbcopy`);
        else if (process.platform === 'linux')
            execSync(`printf "${ data }" | xclip -selection clipboard`);
        else if (process.platform === 'win32')
            execSync(`Set-Clipboard -Value "${ data }"`, { shell: 'powershell' });
    }
}
