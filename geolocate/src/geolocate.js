// © 2024 Adam Lui under the MIT license.
// Source: https://github.js-utils.com/tree/main/geolocate/src
// Documentation: https://github.js-utils.com/tree/main/geolocate/docs
// Latest minified release: https://cdn.jsdelivr.net/npm/@adamlui/geolocate/dist/geolocate.min.js

// Define API functions

async function geolocate(ip, options = {}) {

    const docURL = 'https://github.com/adamlui/js-utils/tree/main/geolocate#locateip',
          exampleCall = 'geolocate(\'8.8.8.8\', { verbose: false })',
          defaultOptions = { verbose: true /* enable logging */ };

    // Init/validate IP
    ip = ip || await getOwnIP();
    if (options.verbose) console.info(`geolocate() » Validating ${ip}...`);
    let ipIsValid;
    try { // to use Node.js generate-ip for validation
        ipIsValid = require('generate-ip').ipv4.validate;
    } catch (err) { // use jsDelivr's latest copy of generate-ip
        await import('https://cdn.jsdelivr.net/npm/generate-ip/dist/generate-ip.min.js');
        ipIsValid = ipv4.validate; // eslint-disable-line no-undef
    }
    if (ipIsValid && !ipIsValid(ip, { verbose: false })) {
        console.error('geolocate() » ERROR: Invalid IP address passed.');
        console.info('geolocate() » For more help, please visit ' + docURL);
        return;
    }

    // Validate/init options
    if (options.verbose) console.info('geolocate() » Validating options...');
    if (!validateOptions(options, defaultOptions, docURL, exampleCall)) return;
    options = { ...defaultOptions, ...options }; // merge validated options w/ missing default ones

    try { // to fetch/get/return geolocation data
        if (options.verbose) console.info('geolocate() » Fetching geolocation data...');
        let response;
        if (typeof fetch != 'undefined') // web browser
            response = await fetch(`http://ip-api.com/json/${ip}`);
        else if (typeof require == 'function') // Node.js
            response = await require('axios').get(`http://ip-api.com/json/${ip}`);
        else return console.error('geolocate() » ERROR: Environment not supported.');
        const { status, org, as, query, ...filteredData } = await response.json(); // eslint-disable-line no-unused-vars
        if (options.verbose && ( typeof require == 'undefined' || !/cli(?:\.min)?\.js$/.test(require.main.filename) ))
            console.info('geolocate() » Success! Check returned object.');
        return { ip, ...filteredData };
    } catch (err) { console.error('geolocate() »', err); }

    async function getOwnIP() {
        return ( // fetch in browser + Node.js 16+
            fetch('https://ifconfig.me/ip').then(response => response.text()).catch(() =>
            fetch('http://ip-api.com/json/').then(response => response.json()).then(data => data.query))
        .catch(async () => { try { // if failed, exec curl in Node.js <16
                const { exec } = require('child_process'),
                      { promisify } = require('util'), execAsync = promisify(exec),
                      { stdout, stderr } = await execAsync('curl -s ifconfig.me');
                return stderr ? console.error('geolocate() »', stderr) : stdout.trim();
            } catch (err) { console.error('geolocate() »', err); }
        }));
    }
}

// Define INTERNAL validation function

function validateOptions(options, defaultOptions, docURL, exampleCall) {

    // Init option strings/types
    const strDefaultOptions = JSON.stringify(defaultOptions, null, 2)
        .replace(/"([^"]+)":/g, '$1:') // strip quotes from keys
        .replace(/"/g, '\'') // replace double quotes w/ single quotes
        .replace(/\n\s*/g, ' '); // condense to single line
    const strValidOptions = Object.keys(defaultOptions).join(', '),
          booleanOptions = Object.keys(defaultOptions).filter(key => typeof defaultOptions[key] == 'boolean');

    // Define print functions
    const logPrefix = ( validateOptions.caller?.name || 'validateOptions' ) + '() » ';
    const printValidOptions = () => {
        console.info(`${ logPrefix }Valid options: [ ${ strValidOptions } ]`);
        console.info(`${ logPrefix }If omitted, default settings are: ${ strDefaultOptions }`);
    };
    const printDocURL = () => {
        console.info(`${ logPrefix }For more help, please visit ${docURL}`); };

    // Validate options
    if (typeof options != 'object') { // validate as obj
        console.error(`${ logPrefix }ERROR: [options] can only be an object of key/values.`);
        console.info(`${ logPrefix }Example valid call: ${ exampleCall }`);
        printValidOptions(); printDocURL(); return false;
    }
    for (const key in options) { // validate each key
        if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
            console.error(
                `${ logPrefix }ERROR: \`${ key }\` is an invalid option.`);
            printValidOptions(); printDocURL(); return false;
        } else if (booleanOptions.includes(key) && typeof options[key] != 'boolean') {
            console.error(
                `${ logPrefix }ERROR: [${ key }] option can only be \`true\` or \`false\`.`);
            printDocURL(); return false;
        }
    }
    return true;
}

// EXPORT API functions
const apiFunctions = { geolocate, locate: geolocate };
try { module.exports = { ...apiFunctions }; } catch (err) {} // for Node.js
try { window.geo = { ...apiFunctions }; } catch (err) {} // for Greasemonkey
