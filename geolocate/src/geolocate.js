// © 2024 Adam Lui under the MIT license.
// Source: https://code.js-utils.com/geolocate
// Documentation: https://docs.js-utils.com/geolocate
// Latest minified release: https://cdn.jsdelivr.net/npm/@adamlui/geolocate/dist/geolocate.min.js

async function geolocate(ips, options = {}) {

    const docURL = 'https://docs.js-utils.com/geolocate/#locateip',
          exampleCall = 'geolocate(\'8.8.8.8\', { verbose: false })',
          defaultOptions = { verbose: true /* enable logging */ };

    // Init/validate IP(s)
    ips = Array.isArray(ips) ? ips : [ips]; // normalize to array
    ips[0] = ips[0] || await getOwnIP(); // fill own IP if none passed
    for (const ip of ips) {
        if (options.verbose) console.info(`geolocate() » Validating ${ip}...`);
        let ipIsValid;
        try { // to use Node.js generate-ip for validation
            ipIsValid = require('generate-ip').ipv4.validate;
        } catch (err) { // use jsDelivr's latest copy of generate-ip
            await import('https://cdn.jsdelivr.net/npm/generate-ip/dist/generate-ip.min.js');
            ipIsValid = ipv4.validate; // eslint-disable-line no-undef
        }
        if (ipIsValid && !ipIsValid(ip, { verbose: false }))
            return console.error(`geolocate() » ERROR: ${ip} is not a valid IPv4 address.`);
    }

    // Validate/init options
    if (!validateOptions(options, defaultOptions, docURL, exampleCall)) return;
    options = { ...defaultOptions, ...options }; // merge validated options w/ missing default ones

    try { // to fetch/get/return geolocation data
        const geoData = [];
        for (const ip of ips) {
            if (options.verbose) console.info(`geolocate() » Fetching geolocation data for ${ip}...`);
            const response = await fetchData(`http://ip-api.com/json/${ip}`);
            let { status, org, as, query, ...filteredData } = await response.json(); // eslint-disable-line no-unused-vars
            filteredData = { ip, ...filteredData }; geoData.push(filteredData);
        }
        if (options.verbose && (typeof require == 'undefined' || !/cli(?:\.min)?\.js$/.test(require.main.filename)))
            console.info('geolocate() » Success! Check returned array.');
        return geoData;
    } catch (err) { console.error('geolocate() » ERROR:', err.message); }

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

// Define INTERNAL functions

let fetchData;
if (typeof fetch == 'function') // 2015+ browsers + Node.js v21+
    fetchData = fetch;
else { try { // to polyfill for Node.js < v21
    fetchData = url => new Promise((resolve, reject) => {
        const protocol = url.match(/^([^:]+):\/\//)[1];
        if (!/^https?$/.test(protocol)) reject(new Error('Invalid URL.'));
        require(protocol).get(url, res => {
            let rawData = '';
            res.on('data', chunk => rawData += chunk);
            res.on('end', () => resolve({ json: () => JSON.parse(rawData) }));
        }).on('error', reject);
    });
} catch (err) { fetchData = () => Promise.reject(new Error('Environment not supported.')); }}

function validateOptions(options, defaultOptions, docURL, exampleCall) {

    // Init option strings/types
    const strDefaultOptions = JSON.stringify(defaultOptions, null, 2)
        .replace(/"([^"]+)":/g, '$1:') // strip quotes from keys
        .replace(/"/g, '\'') // replace double quotes w/ single quotes
        .replace(/\n\s*/g, ' '); // condense to single line
    const strValidOptions = Object.keys(defaultOptions).join(', '),
          booleanOptions = Object.keys(defaultOptions).filter(key => typeof defaultOptions[key] == 'boolean');

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
        }
    }
    return true;
}

// EXPORT API functions
const apiFunctions = { geolocate, locate: geolocate };
try { module.exports = { ...apiFunctions }; } catch (err) {} // for Node.js
try { window.geo = { ...apiFunctions }; } catch (err) {} // for Greasemonkey
