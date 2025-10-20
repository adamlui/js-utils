// © 2024–2025 Adam Lui & contributors under the MIT license.
// Source: https://code.generatepw.org
// Documentation: https://docs.generatepw.org
// Latest minified release: https://cdn.jsdelivr.net/npm/generate-pw/dist/generate-pw.min.js

// Init CHARACTER SETS
const charsets = {
    lower: 'abcdefghijklmnopqrstuvwxyz',
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()-_=+[]{}/\\|;:\'",.<>?'
}

// Define API functions

function generatePassword(options = {}) {

    const docURL = 'https://docs.generatepw.org/#generatepasswordoptions',
          exampleCall = 'generatePassword({ verbose: false, numbers: true })'

    const defaultOptions = {
        verbose: true,              // enable logging
        length: 8,                  // length of password
        qty: 1,                     // number of passwords to generate
        charset: '',                // characters to include
        exclude: '',                // characters to exclude
        numbers: false,             // include numberChars
        symbols: false,             // include symbolChars
        lowercase: true,            // include lowercase letters
        uppercase: true,            // include uppercase letters
        excludeSimilarChars: false, // exclude similar chars (e.g. o,0,O,i,l,1,|)
        strict: false               // require at least one char from each enabled set
    }

    // Validate/init options
    if (!validateOptions(options, defaultOptions, docURL, exampleCall)) return
    options = { ...defaultOptions, ...options } // merge validated options w/ missing default ones

    if (options.qty > 1) { // generate/return array of [qty] password strings
        const { qty, ...nonQtyOptions } = options
        return generatePasswords(qty, nonQtyOptions)

    } else { // generate/return single password
        const fromGeneratePasswords = generatePassword.caller?.name == 'generatePasswords' // to avoid repetitive logs

        // Init password's char set
        if (options.verbose && !fromGeneratePasswords)
            console.info('generatePassword() » Initializing character set...')
        let pwCharset = options.charset?.toString() || ( // use passed [charset], or construct from options
            (options.numbers ? charsets.numbers : '')
              + (options.symbols ? charsets.symbols : '')
              + (options.lowercase ? charsets.lower : '')
              + (options.uppercase ? charsets.upper : '')
        )
        if (pwCharset == '') // all flags false + no charset passed
            pwCharset = charsets.lower + charsets.upper // default to upper + lower

        // Exclude passed `exclude` chars
        if (options.exclude) {
            if (options.verbose && !fromGeneratePasswords)
                console.info('generatePassword() » Removing excluded characters...')
            pwCharset = pwCharset.replace(new RegExp(`[${options.exclude}]`, 'g'), '')
        }

        // Exclude similar chars if `excludeSimilarChars` is `true`
        if (options.excludeSimilarChars) {
            if (options.verbose && !fromGeneratePasswords)
                console.info('generatePassword() » Excluding similar characters...')
            pwCharset = pwCharset.replace(/[o0Oil1|]/g, '')
        }

        // Generate unstrict password
        if (options.verbose && !fromGeneratePasswords) console.info('generatePassword() » Generating password...')
        let password = ''
        for (let i = 0 ; i < options.length ; i++) {
            const randomIdx = randomInt(0, pwCharset.length)
            password += pwCharset[randomIdx]
        }

        // Enforce strict mode if enabled
        if (options.strict) {
            if (options.verbose && !fromGeneratePasswords) console.info('generatePassword() » Enforcing strict mode...')
            const charTypes = ['number', 'symbol', 'lower', 'upper']
            const requiredCharTypes = charTypes
                .filter(charType => options[`${charType}s`] || options[`${charType}case`])
            password = strictify(password, requiredCharTypes)
        }

        // Log/return final result
        if (options.verbose && !fromGeneratePasswords) {
                console.info('generatePassword() » Password generated!')
            if (typeof window != 'undefined')
                console.info('generatePassword() » Check returned string.')
        }
        return password
    }
}

function generatePasswords(qty, options = {}) {

    const docURL = 'https://docs.generatepw.org/#generatepasswordsqty-options',
          exampleCall = 'generatePasswords(3, { verbose: false, symbols: true })'

    const defaultOptions = {
        verbose: true,              // enable logging
        length: 8,                  // length of password
        charset: '',                // characters to include
        exclude: '',                // characters to exclude
        numbers: false,             // include numberChars
        symbols: false,             // include symbolChars
        lowercase: true,            // include lowercase letters
        uppercase: true,            // include uppercase letters
        excludeSimilarChars: false, // exclude similar chars (e.g. o,0,O,i,l,1,|)
        strict: false               // require at least one char from each enabled set
    }

    // Validate qty
    qty = parseInt(qty, 10)
    if (isNaN(qty) || qty < 1) {
        console.error('generatePasswords() » ERROR: 1st arg <qty> can only be an integer > 0.')
        console.info('generatePasswords() » For more help, please visit ' + docURL)
        return
    }

    // Validate/init options
    if (!validateOptions(options, defaultOptions, docURL, exampleCall)) return
    options = { ...defaultOptions, ...options } // merge validated options w/ missing default ones

    // Generate passwords
    if (options.verbose) console.info(`generatePasswords() » Generating password${ qty > 1 ? 's' : '' }...`)
    const passwords = []
    for (let i = 0 ; i < qty ; i++) passwords.push(generatePassword(options))

    // Log/return final result
    if (options.verbose) {
            console.info(`generatePasswords() » Password${ qty > 1 ? 's' : '' } generated!`)
        if (typeof window != 'undefined')
            console.info('generatePasswords() » Check returned array.')
    }
    return passwords
}

function strictify(password, requiredCharTypes = ['number', 'symbol', 'lower', 'upper'], options = {}) {

    const docURL = 'https://docs.generatepw.org/#strictifypassword-requiredchartypes-options',
          exampleCall = `strictify('pa55word', ['symbol', 'upper'], { verbose: false })`,
          defaultOptions = { verbose: true /* enable logging */ }

    // Validate password
    if (typeof password != 'string') {
        console.error('strictify() » ERROR: 1st arg <password> must be a string.')
        console.info('strictify() » For more help, please visit ' + docURL)
        return
    }

    // Validate requiredCharTypes
    const validCharTypes = ['number', 'symbol', 'lower', 'upper']
    if (!Array.isArray(requiredCharTypes)) // convert string to array
        requiredCharTypes = [requiredCharTypes]
    for (const charType of requiredCharTypes) {
        if (!validCharTypes.includes(charType)) {
            console.error(`strictify() » ERROR: 2nd arg \`${charType}\` is an invalid character type.`)
            console.info(`strictify() » Valid character types: [ '${ validCharTypes.join('\', \'')}' ]`)
            console.info('strictify() » Pass one as a string or more as an array, or all types will be required.')
            console.info('strictify() » For more help, please visit ' + docURL)
            return
    }}

    // Validate/init options
    if (!validateOptions(options, defaultOptions, docURL, exampleCall)) return
    options = { ...defaultOptions, ...options } // merge validated options w/ missing default ones

    // Init mod flags + untouchable positions
    const hasFlags = {}, untouchablePositions = []
    requiredCharTypes.forEach(charType => hasFlags[charType] = false)
    for (let i = 0 ; i < password.length ; i++)
        for (const charType of requiredCharTypes)
            if ((charsets[charType] || charsets[charType + 's']).includes(password[i])) {
                hasFlags[charType] = true ; untouchablePositions.push(i) }

    // Modify password if unstrict
    if (options.verbose) console.info('strictify() » Strictifying password...')
    const maxReplacements = Math.min(password.length, requiredCharTypes.length)
    let replacementCnt = 0, strictPW = password
    for (const charType of requiredCharTypes) {
        if (replacementCnt < maxReplacements) {
            if (!hasFlags[charType]) {
                let replacementPos
                do replacementPos = randomInt(0, password.length) // pick random pos
                while (untouchablePositions.includes(replacementPos)) // check if pos already replaced
                untouchablePositions.push(replacementPos) // track new replacement pos
                const replacementCharSet = charsets[charType] || charsets[charType + 's']
                strictPW = strictPW.substring(0, replacementPos) // perform actual replacement
                         + replacementCharSet[randomInt(0, replacementCharSet.length)]
                         + strictPW.substring(replacementPos + 1)
                replacementCnt++
    }}}

    // Log/return final result
    if (options.verbose) {
        if (replacementCnt > 0) {
            console.info('strictify() » Password is now strict!')
            console.info('strictify() » Check returned string.')
        } else {
            console.info(`strictify() » Password already includes ${requiredCharTypes.join(' + ')} characters!`)
            console.info('strictify() » No modifications made.')
        }
    }
    return strictPW
}

function validateStrength(password, options = {}) {

    const docURL = 'https://docs.generatepw.org/#validatestrengthpassword-options',
          exampleCall = `validateStrength('pa55word', { verbose: false })`,
          strengthCriteria = { minLength: 8, minLower: 1, minUpper: 1, minNumber: 1, minSymbol: 1 },
          defaultOptions = { verbose: true /* enable logging */ }

    // Validate password
    if (typeof password != 'string') {
        console.error('validateStrength() » ERROR: 1st arg <password> must be a string.')
        console.info('validateStrength() » For more help, please visit ' + docURL)
        return
    }

    // Validate/init options
    if (!validateOptions(options, defaultOptions, docURL, exampleCall)) return
    options = { ...defaultOptions, ...options } // merge validated options w/ missing default ones

    if (options.verbose) console.info('validateStrength() » Validating password strength...')

    // Count occurrences of each char type
    const charCnts = { 'lower': 0, 'upper': 0, 'number': 0, 'symbol': 0 }
    for (const char of password)
        for (const charType of Object.keys(charCnts))
            if ((charsets[charType] || charsets[charType + 's']).includes(char))
                charCnts[charType]++

    // Check criteria + add recommendations
    const recommendations = []
    if (password.length < strengthCriteria.minLength)
        recommendations.push(`Make it at least ${strengthCriteria.minLength} characters long.`)
    for (const charType of Object.keys(charCnts))
        if (charCnts[charType] < strengthCriteria['min' + charType[0].toUpperCase() + charType.slice(1)])
            recommendations.push('Include at least one ' + charType
                + `${ ['upper', 'lower'].includes(charType) ? 'case letter' : '' }.`)

    // Calculate strength score based on counts and criteria
    let strengthScore = 0
    strengthScore += ( // +20 for satisfying min length
        password.length >= strengthCriteria.minLength) ? 20 : 0
    for (const charType of Object.keys(charCnts))
        strengthScore += ( // +20 per char type included
            charCnts[charType] >= strengthCriteria['min' + charType[0].toUpperCase() + charType.slice(1)]) ? 20 : 0

    // Log/return final result
    if (options.verbose) {
        console.info('validateStrength() » Password strength validated!')
        console.info('validateStrength() » Check returned object for score/recommendations.')
    }
    return { strengthScore, recommendations, isGood: strengthScore >= 80 }
}

// Define INTERNAL functions

function randomInt(min, max) {
    if (typeof require == 'undefined') { // use browser crypto API || Math.random()
        const browserCrypto = window.crypto || window.msCrypto,
              randomVal = browserCrypto?.getRandomValues(new Uint32Array(1))[0] / 0xFFFFFFFF || Math.random()
        return Math.floor(randomVal * (max - min)) + min
    } else // use Node.js crypto module
        return require('crypto').randomInt(min, max)
}

function validateOptions(options, defaultOptions, docURL, exampleCall) {

    // Init option strings/types
    const strDefaultOptions = JSON.stringify(defaultOptions, undefined, 2)
        .replace(/"([^"]+)":/g, '$1:') // strip quotes from keys
        .replace(/"/g, '\'') // replace double quotes w/ single quotes
        .replace(/\n\s*/g, ' ') // condense to single line
    const strValidOptions = Object.keys(defaultOptions).join(', '),
          booleanOptions = Object.keys(defaultOptions).filter(key => typeof defaultOptions[key] == 'boolean'),
          integerOptions = Object.keys(defaultOptions).filter(key => Number.isInteger(defaultOptions[key]))

    // Init log vars
    const logPrefix = `${ validateOptions.caller?.name || 'validateOptions' }() » `
    let optionsPos = exampleCall.split(',').findIndex(arg => arg.trim().startsWith('{')) + 1
    optionsPos += ['st','nd','rd'][optionsPos - 1] || 'th' // append ordinal suffix

    // Define print functions
    const printValidOptions = () => {
        console.info(`${ logPrefix }Valid options: [ ${strValidOptions} ]`)
        console.info(`${ logPrefix }If omitted, default settings are: ${strDefaultOptions}`)
    }
    const printDocURL = () => {
        console.info(`${ logPrefix }For more help, please visit ${docURL}`) }

    // Validate options
    if (typeof options != 'object') { // validate as obj
        console.error(`${ logPrefix }ERROR: ${
            optionsPos == '0th' ? '[O' : optionsPos + ' arg [o'}ptions] can only be an object of key/values.`)
        console.info(`${ logPrefix }Example valid call: ${exampleCall}`)
        printValidOptions() ; printDocURL() ; return false
    }
    for (const key in options) { // validate each key
        if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
            console.error(`${ logPrefix }ERROR: \`${key}\` is an invalid option.`)
            printValidOptions() ; printDocURL() ; return false
        } else if (booleanOptions.includes(key) && typeof options[key] != 'boolean') {
            console.error(`${ logPrefix }ERROR: [${key}] option can only be \`true\` or \`false\`.`)
            printDocURL() ; return false
        } else if (integerOptions.includes(key)) {
            options[key] = parseInt(options[key], 10)
            if (isNaN(options[key]) || options[key] < 1) {
                console.error(`${ logPrefix }ERROR: [${key}] option can only be an integer > 0.`)
                printDocURL() ; return false
            }
        }
    }
    return true
}

// EXPORT API functions
const gpwAliases = {
    generatePassword: [
        'generate', 'generatepassword', 'generatepw', 'generatePw', 'generatePW',
        'Generate', 'Generatepassword', 'GeneratePassword', 'Generatepw', 'GeneratePw', 'GeneratePW'
    ],
    generatePasswords: [
        'generatepasswords', 'generatepws', 'generatePws', 'generatePWs', 'generatePWS',
        'Generatepasswords', 'GeneratePasswords', 'Generatepws', 'GeneratePws', 'GeneratePWs', 'GeneratePWS'
    ],
    strictify: [ 'Strictify' ],
    validateStrength: [ 'validate', 'Validate', 'validatestrength', 'Validatestrength', 'ValidateStrength' ]
}
const gpwFuncs = { generatePassword, generatePasswords, strictify, validateStrength }
try { module.exports = { ...gpwFuncs }} catch (err) {} // for Node.js
try { window.pw = { ...gpwFuncs }} catch (err) {} // for Greasemonkey
for (const func in gpwAliases) { // init/export aliases
    try { gpwAliases[func].forEach(alias => module.exports[alias] = module.exports[func]) } catch (err) {} // for Node.js
    try { gpwAliases[func].forEach(alias => window.pw[alias] = window.pw[func]) } catch (err) {} // for Greasemonkey
}
