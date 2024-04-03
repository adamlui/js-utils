#!/usr/bin/env node

(async () => {

    // Import LIBS
    const geo = require(__dirname.match(/src/) ? './geolocate' : './geolocate.min'),
          { ipv4 } = require('generate-ip'),
          { execSync } = require('child_process'); // for cross-platform copying

    // Init UI colors
    const nc = '\x1b[0m',    // no color
          br = '\x1b[1;91m', // bright red
          by = '\x1b[1;33m'; // bright yellow

    // Load settings from ARGS
    const config = {};
    const argRegex = {
        flags: { 'quietMode': /^--?q(?:uiet)?(?:-?mode)?$/ },
        infoCmds: {
            'help': /^--?h(?:elp)?$/,
            'version': /^--?ve?r?s?i?o?n?$/
        }
    };
    process.argv.forEach(arg => {
        if (!arg.startsWith('-')) return;
        const matchedFlag = Object.keys(argRegex.flags).find(flag => argRegex.flags[flag].test(arg)),
              matchedInfoCmd = Object.keys(argRegex.infoCmds).find(cmd => argRegex.infoCmds[cmd].test(arg));
        if (matchedFlag) config[matchedFlag] = true;
        else if (!matchedInfoCmd) {
            console.error(`\n${br}ERROR: Arg [${ arg }] not recognized.${nc}`);
            console.info(`\n${by}Valid arguments are below.${nc}`);
            printHelpSections(['flags', 'infoCmds']);
            process.exit(1);
    }});

    // Show HELP screen if -h or --help passed
    if (process.argv.some(arg => argRegex.infoCmds.help.test(arg))) printHelpSections();

    // Show VERSION number if -v or --version passed
    else if (process.argv.some(arg => argRegex.infoCmds.version.test(arg)))
        console.info('v' + require('./package.json').version);

    else { // run MAIN routine

        // Validate IP args
        const args = process.argv.slice(2), validIPs = [];
        for (let i = 0; i < args.length; i++) {
            if (!args[i].startsWith('-')) {
                if (ipv4.validate(args[i], { verbose: false })) validIPs.push(args[i]);
                else {
                    const ordSuffix = i == 0 ? 'st' : i == 1 ? 'nd' : 'th';
                    console.error(`ERROR: ${ i + 1 + ordSuffix } arg '${args[i]}' is not a valid IPv4 address.`);
                    console.info('Type \'geolocate --help\' for help.');
                    process.exit(1);
        }}}
        if (validIPs.length == 0) // no IP arg passed
            validIPs.push(await geo.getOwnIP()); // use own IP

        // Fetch/store/log geolocation data
        validIPs.forEach(ip => printIfNotQuiet(`Fetching geolocation data for ${ip}...`));
        const geoResults = [];
        for (const ip of validIPs) geoResults.push(await geo.locate(ip));
        if (geoResults.length == 1) printIfNotQuiet(geoResults[0]);

        // Copy to clipboard
        printIfNotQuiet('Copying to clipboard...');
        copyToClipboard(JSON.stringify(geoResults));
    }

    // Define FUNCTIONS

    function printHelpSections(includeSections = ['cmdFormat', 'flags', 'infoCmds']) {
        const helpSections = {
            'cmdFormat': [
                `\n${by}geolocate [ip] [options|commands]${nc}`
            ],
            'flags': [
                '\nBoolean options:',
                ' -q, --quiet                 Suppress all logging except errors.'
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

    function printIfNotQuiet(msg) { if (!config.quietMode) console.info(msg); }

    function copyToClipboard(data) {
        data = data.replace(/\s+$/, '').replace(/"/g, '""');
        if (process.platform === 'darwin') // macOS
            execSync(`printf "${ data }" | pbcopy`);
        else if (process.platform === 'linux')
            execSync(`printf "${ data }" | xclip -selection clipboard`);
        else if (process.platform === 'win32')
            execSync(`Set-Clipboard -Value "${ data }"`, { shell: 'powershell' });
    }

})();