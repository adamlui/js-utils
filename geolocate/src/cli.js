#!/usr/bin/env node

const pkgName = '@adamlui/geolocate',
      docURL = 'https://docs.js-utils.com/geolocate/#-command-line-usage';

// © 2024 Adam Lui under the MIT license.
// Source: https://code.js-utils.com/geolocate

(async () => {

    // Import LIBS
    const geo = require(__dirname.match(/src/) ? './geolocate' : './geolocate.min'),
          fs = require('fs'), path = require('path'),
          { execSync } = require('child_process'); // for --version cmd + cross-platform copying

    // Init UI colors
    const nc = '\x1b[0m',    // no color
          br = '\x1b[1;91m', // bright red
          by = '\x1b[1;33m', // bright yellow
          bw = '\x1b[1;97m'; // bright white

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
            console.error(`\n${br}ERROR: Arg [${arg}] not recognized.${nc}`);
            console.info(`\n${by}Valid arguments are below.${nc}`);
            printHelpSections(['flags', 'infoCmds']);
            printHelpCmdAndDocURL(); process.exit(1);
    }});

    // Show HELP screen if -h or --help passed
    if (process.argv.some(arg => argRegex.infoCmds.help.test(arg))) printHelpSections();

    // Show VERSION number if -v or --version passed
    else if (process.argv.some(arg => argRegex.infoCmds.version.test(arg))) {
        const globalVer = execSync(`npm view ${pkgName} version`).toString().trim() || 'none';
        let localVer, currentDir = process.cwd();
        while (currentDir != '/') {
            const localManifestPath = path.join(currentDir, 'package.json');
            if (fs.existsSync(localManifestPath)) {
                const localManifest = require(localManifestPath);
                localVer = ( localManifest.dependencies?.[pkgName]
                          || localManifest.devDependencies?.[pkgName]
                )?.match(/(\d+\.\d+\.\d+)/)[0] || 'none';
                break;
            }
            currentDir = path.dirname(currentDir);
        }
        console.info(`\nGlobal version: ${globalVer}`);
        console.info(`Local version: ${localVer}`);

    } else { // run MAIN routine

        // Load IP arg(s) into [validIPs]
        const args = process.argv.slice(2), validIPs = [];
        for (const arg of args) if (!arg.startsWith('-')) {
            const ip = arg.replace(/\[|\]/g, ''); // strip surrounding '[]' in case copied from docs
            validIPs.push(ip);
        }

        // Fetch/store geolocation data
        const geoResults = await geo.locate(validIPs, { verbose: !config.quietMode });
        if (!geoResults) process.exit(1);

        // Log single result
        if (!config.quietMode && geoResults.length == 1) {
            console.info(`\nIP: ${bw + geoResults[0].ip + nc}`);
            console.info(`Country: ${bw + geoResults[0].country + nc}`);
            console.info(`Region: ${bw + geoResults[0].regionName + nc}`);
            console.info(`City: ${bw + geoResults[0].city + nc}`);
            console.info(`Latitude: ${bw + geoResults[0].lat + nc}`);
            console.info(`Longitude: ${bw + geoResults[0].lon + nc}`);
            console.info(`ISP: ${bw + geoResults[0].isp + nc}`);
        }

        // Copy to clipboard
        printIfNotQuiet('\nCopying to clipboard...');
        copyToClipboard(JSON.stringify(geoResults));
    }

    // Define FUNCTIONS

    function printHelpSections(includeSections = ['cmdFormat', 'flags', 'infoCmds']) {
        const helpSections = {
            'cmdFormat': [
                `\n${by}geolocate [ip1] [ip2] [...] [options|commands]${nc}`
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
                const lineLength = terminalWidth - ( lines.length == 0 ? 0 : indentation );
                if (currentLine.length + word.length > lineLength) { // cap/store it
                    lines.push(lines.length == 0 ? currentLine : currentLine.trimStart());
                    currentLine = '';
                }
                currentLine += word;
            });
            lines.push(lines.length == 0 ? currentLine : currentLine.trimStart());

            // Print formatted msg
            lines.forEach((line, index) => console.info(
                index == 0 ? line // print 1st line unindented
                    : ' '.repeat(indentation) + line // print subsequent lines indented
            ));
        }
    }

    function printHelpCmdAndDocURL() {
        console.info(`\n${by}For more help, type 'minify-js --help' or visit\n${ docURL + nc }`); }

    function printIfNotQuiet(msg) { if (!config.quietMode) console.info(msg); }

    function copyToClipboard(data) {
        data = data.replace(/\s+$/, '').replace(/"/g, '""');
        if (process.platform == 'darwin') // macOS
            execSync(`printf "${data}" | pbcopy`);
        else if (process.platform == 'linux')
            execSync(`printf "${data}" | xclip -selection clipboard`);
        else if (process.platform == 'win32')
            execSync(`Set-Clipboard -Value "${data}"`, { shell: 'powershell' });
    }

})();
