#!/usr/bin/env node

// Import LIBS
const { randomInt } = require('crypto'), // for secure RNG
      { execSync } = require('child_process'); // for cross-platform CLI copying

// Define MAIN functions

const ipv4 = {
    generate: function(options = {}) {
        const defaultOptions = { verbose: true };
        options = { ...defaultOptions, ...options };
        if (options.verbose) console.info('ipv4.generate() » '
            + 'Generating IPv4 address...');
        const segments = [];
        for (let i = 0; i < 4; i++) segments.push(randomInt(0, 256));
        const ip = segments.join('.');
        if (options.verbose) console.log('\n' + ip);
        return ip;
    },
    validate: function(address, options = {}) {
        const defaultOptions = { verbose: true };
        options = { ...defaultOptions, ...options };
        if (options.verbose) console.info('ipv4.validate() » '
            + `Validating ${ address }...`);
        const segments = address.split('.');
        const addressIsValid = !( // false if any dq condition matches
                  segments.length !== 4 // not 4-segments long
               || segments.some(segment => // segment invalid
                      !/^\d+$/.test(segment) // for being non-numeric
                   || parseInt(segment, 10) < 0 // or negative
                   || parseInt(segment, 10) > 255 ) // or > 255
        );
        if (options.verbose) console.info('ipv4.validate() » '
            + `IP is ${ !addressIsValid ? 'in' : '' }valid IPv4 address!`);
        return addressIsValid;
    }
};

const ipv6 = {
    generate: function(options = {}) {
        const defaultOptions = { verbose: true, leadingZeros: false, doubleColon: true };
        options = { ...defaultOptions, ...options };
        if (options.verbose) console.info('ipv6.generate() » '
            + 'Generating IPv6 address...');
        const pieces = [];
        for (let i = 0; i < 8; i++) { // generate 8x 16-bit hex pieces
            let hex = '';
            for (let j = 0; j < 4; j++) // generate 4-char hex piece
                hex += randomInt(0, 16).toString(16);
            pieces.push(hex);
        }
        const ip = this.format(pieces.join(':'), { ...options, verbose: false });
        if (options.verbose) console.log('\n' + ip);
        return ip;
    },
    format: function(ipv6Address, options = {}) {
        const defaultOptions = { verbose: true, leadingZeros: false, doubleColon: true };
        options = { ...defaultOptions, ...options };

        // Validate ipv6Address
        if (!this.validate(ipv6Address, { verbose: false}))
            return console.error('ipv6.format() » '
                + `ERROR: \n- ${ ipv6Address } is not a valid IPv6 address.`);

        if (options.verbose) console.info(`ipv6.format() » Formatting ${ ipv6Address }...`);
        let formattedAddress = ipv6Address;

        // Handle leading zeros
        if (options.leadingZeros) { // add leading zeros
            if (options.verbose) console.info('ipv6.format() » '
                + 'Adding leading zeros...');
            const pieces = ipv6Address.split(':');
            for (let i = 0; i < pieces.length; i++)
                while (pieces[i].length < 4) pieces[i] = '0' + pieces[i];
            formattedAddress = pieces.join(':');
        } else { // strip leading zeros
            if (options.verbose) console.info('ipv6.format() » '
                + 'Stripping leading zeros...');
            formattedAddress = ipv6Address.replace(/(^|(?<=:))0+(?!:)/g, '$1');
        }

        // Handle double colons
        if (options.doubleColon) { // replace zero series w/ '::'
            if (options.verbose) console.info('ipv6.format() » '
                + 'Replacing zero series w/ \'::\'...');
            formattedAddress = formattedAddress.replace(/:(?:0+:)+/, '::');
        } else { // expand '::' into zero series
            if (options.verbose) console.info('ipv6.format() » '
                + 'Expanding \'::\' into zero series...');
            const totalPieces = formattedAddress.split(':').length,
                  zeroSegment = options.leadingZeros ? '0000' : '0',
                  zeroSeries = Array(8 - totalPieces).fill(zeroSegment).join(':');
            formattedAddress = formattedAddress.replace('::', `:${ zeroSeries }:`);
        }

        if (options.verbose) console.info('\n'
            + ( formattedAddress !== ipv6Address ? `Formatted address: ${ formattedAddress }`
                                                 : 'Address cannot be formatted!' ));
        return formattedAddress;
    }
};

// EXPORT main function objs if script was required
if (require.main !== module) module.exports = { ipv4, ipv6 };

else { // run as CLI utility

    // Init UI colors
    const nc = '\x1b[0m',    // no color
          br = '\x1b[1;91m', // bright red
          by = '\x1b[1;33m', // bright yellow
          bw = '\x1b[1;97m'; // bright white

    // Load settings from ARGS
    const argRegex = {
        infoCmds: {
            'help': /^--?h(?:elp)?$/,
            'version': /^--?ve?r?s?i?o?n?$/
        }
    };
    let matchedArg = false, unrecognizedArg;
    for (const argType of Object.keys(argRegex))
        for (const option of Object.keys(argRegex[argType]))
            if (!matchedArg) process.argv.forEach(arg => {
                if (!arg.startsWith('-')) return;
                if (argRegex[argType][option].test(arg)) {
                    matchedArg = true; unrecognizedArg = undefined;
                } else unrecognizedArg = arg;
    });
    if (unrecognizedArg) {
        console.error(`\n${br}ERROR: Arg [${unrecognizedArg}] not recognized.${nc}`);
        console.info(`\n${by}Valid arguments are below.${nc}`);
        printHelpSections(['infoCmds']);
        process.exit(1);
    }

    // Show HELP screen if -h or --help passed
    if (process.argv.some(arg => /^--?h(?:elp)?$/.test(arg))) printHelpSections();

    // Show VERSION number if -v or --version passed
    else if (process.argv.some(arg => /^--?ve?r?s?i?o?n?$/.test(arg)))
        console.info('v' + require('./package.json').version);

    else { // log/copy RESULT
        const address = ipv4.generate({ verbose: false });
        copyToClipboard(address); console.log(bw + address + nc);
    }

    // Define CLI functions

    function printHelpSections(includeSections = ['cmdFormat', 'formatOptions', 'infoCmds']) {
        const helpSections = {
            'cmdFormat': [
                `\n${by}generate-ip [commands]${nc}`
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
        data = data.replace(/\s+$/, '').replace(/"/g, '""');
        if (process.platform === 'darwin') // macOS
            execSync(`printf "${ data }" | pbcopy`);
        else if (process.platform === 'linux')
            execSync(`printf "${ data }" | xclip -selection clipboard`);
        else if (process.platform === 'win32')
            execSync(`Set-Clipboard -Value "${ data }"`, { shell: 'powershell' });
    }
}
