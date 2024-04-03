// © 2024 Adam Lui under the MIT license.
// Source: https://github.com/adamlui/js-utils/tree/main/geolocate
// Documentation: https://github.com/adamlui/js-utils/tree/main/geolocate#readme
// Latest minified release: https://cdn.jsdelivr.net/npm/@adamlui/geolocate/dist/geolocate.min.js

// Define API functions

async function geolocate(ip) {

    // Validate IP
    let ipIsValid;
    try { // to use Node.js module
        ipIsValid = require('generate-ip').ipv4.validate;
    } catch (err) { // use jsDelivr's latest copy of generate-ip
        await import('https://cdn.jsdelivr.net/npm/generate-ip/dist/generate-ip.min.js');
        ipIsValid = ipv4.validate; // eslint-disable-line no-undef
    }
    if (ipIsValid && !ipIsValid(ip, { verbose: false }))
        return console.error('geolocate() » ERROR: Invalid IP address passed.');

    try { // to fetch/get/return geolocation data
        let response;
        if (typeof fetch != 'undefined') // web browser
            response = await fetch(`http://ip-api.com/json/${ip}`);
        else if (typeof require == 'function') // Node.js
            response = await require('axios').get(`http://ip-api.com/json/${ip}`);
        else return console.error('geolocate() » ERROR: Environment not supported.');
        const { status, org, as, query, ...filteredData } = await response.json(); // eslint-disable-line no-unused-vars
        return { ip, ...filteredData };
    } catch (err) { console.error('geolocate() »', err); }
}

async function getOwnIP() {
    return ( // fetch in browser + Node.js 16+
        fetch('https://ifconfig.me/ip').then(response => response.text()).catch(() =>
        fetch('http://ip-api.com/json/').then(response => response.json()).then(data => data.query))
    .catch(async () => { try { // if failed, exec curl in Node.js <16
            const { exec } = require('child_process'),
                  { promisify } = require('util'), execAsync = promisify(exec),
                  { stdout, stderr } = await execAsync('curl -s ifconfig.me');
            return stderr ? console.error('getOwnIP() »', stderr) : stdout.trim();
        } catch (err) { console.error('getOwnIP() »', err); }
    }));
}

// EXPORT API functions
const apiFunctions = { geolocate, locate: geolocate, getOwnIP };
try { module.exports = { ...apiFunctions }; } catch (err) {} // for Node.js
try { window.geo = { ...apiFunctions }; } catch (err) {} // for Greasemonkey
