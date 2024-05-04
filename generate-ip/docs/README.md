# <picture><source media="(prefers-color-scheme: dark)" srcset="https://media.generate-ip.org/images/icons/node-graph/white/icon55x49.png?b4eb06e"><img height=32 src="https://media.generate-ip.org/images/icons/node-graph/black/icon55x49.png?b4eb06e"></picture> generate-ip

### Randomly generate, format, and validate IPv4 + IPv6 + MAC addresses.

<a href="#%EF%B8%8F-mit-license"><img height=31 src="https://img.shields.io/badge/License-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/generate-ip-2.3.0"><img height=31 src="https://img.shields.io/badge/Latest_Build-2.3.0-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/generate-ip?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/generate-ip?style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://github.com/adamlui/js-utils/blob/generate-ip-2.3.0/generate-ip/dist/generate-ip.min.js"><img height=31 src="https://img.shields.io/github/size/adamlui/js-utils/generate-ip/dist/generate-ip.min.js?branch=generate-ip-2.3.0&label=Minified%20Size&logo=databricks&logoColor=white&labelColor=464646&color=ff69b4&style=for-the-badge"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:generate-ip/src/generate-ip.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Agenerate-ip%2Fsrc%2Fgenerate-ip.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#networking"><img height=31 src="https://img.shields.io/badge/Mentioned_in-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.jsdelivr.com/package/npm/generate-ip?tab=stats"><img height=31 src="https://img.shields.io/jsdelivr/npm/hm/generate-ip?style=for-the-badge&logo=jsdelivr&logoColor=white&label=jsDelivr%20Hits&labelColor=464646&color=49c5d8"></a>

<br>

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png?c0192d3">

## 💡 About

**generate-ip** is a lightweight, easy-to-use library that allows you to randomly generate, format & validate IP address(es).

- **No external dependencies —** Only built-in crypto methods used for secure randomization
- **Multi-protocol support —** IPv4 + IPv6 + MAC addresses supported
- **Multi-environment support —** Use in Node.js or the web browser
- **Command line usable —** Just type `generate-ip`, that's it

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png?c0192d3">

## ⚡ Installation

As a **global utility**:

```
$ npm install -g generate-ip
```

As a **dev dependency**, from your project root:

```
$ npm install -D generate-ip
```

As a **runtime dependency**, from your project root:

```
$ npm install generate-ip
```

<br>

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png?c0192d3">

## 🔌 Importing the APIs

### <img height=18 src="https://media.js-utils.com/images/icons/platforms/node.js/icon25x28.png?3e22bae"> Node.js

#### ECMAScript*:

```js
import { ipv4, ipv6, mac } from 'generate-ip';
```

#### CommonJS:

```js
const { ipv4, ipv6, mac } = require('generate-ip');
```

###### _*Node.js version 14 or higher required_

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://media.js-utils.com/images/icons/platforms/web/light/icon25.png?3e22bae"><img width=16 src="https://media.js-utils.com/images/icons/platforms/web/dark/icon25.png?3e22bae"></picture> Web

#### <> HTML script tag:

```html
<script src="https://cdn.jsdelivr.net/npm/generate-ip@2.3.0/dist/generate-ip.min.js"></script>
```

#### ES6:

```js
(async () => {
    await import('https://cdn.jsdelivr.net/npm/generate-ip@2.3.0/dist/generate-ip.min.js');
    // Your code here...
})();
```

### <img height=17 src="https://media.js-utils.com/images/icons/platforms/tampermonkey/icon28.png?4fd2fa7"><img height=17.5 src="https://media.js-utils.com/images/icons/platforms/violentmonkey/icon25.png?2fe972c"> Greasemonkey

```js
...
// @require https://cdn.jsdelivr.net/npm/generate-ip@2.3.0/dist/generate-ip.min.js
// ==/UserScript==

// Your code here...
```

<br>

📝 **Note:** To always import the latest version (not recommended in production!) remove the `@2.3.0` version tag from the jsDelivr URL: `https://cdn.jsdelivr.net/npm/generate-ip/dist/generate-ip.min.js`

<br>

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png?c0192d3">

## 📋 API usage

### `ipv4` methods

💡 Use the `ipv4` methods to [**generate**](#ipv4generateoptions) and [**validate**](#ipv4validateaddress-options) IPv4 addresses.

#

#### `ipv4.generate([options])`

Generates **one** IPv4 address if `qty` option is not given, returning a string:

```js
const ip = ipv4.generate();
console.log(ip); // sample output: '36.42.224.208'
```

...or **multiple** IPv4 addresses if `qty` option is given, returning an array of strings:

```js
const ips = ipv4.generate({ qty: 3 });
console.log(ips);

/* sample output:

ipv4.generate() » Generating IPv4 addresses...
ipv4.generate() » IPv4 addresses generated!
ipv4.generate() » 194.84.176.172, 192.186.53.120, 50.191.111.87
[ '194.84.176.172', '192.186.53.120', '50.191.111.87' ]
*/
```

Available options:

Name        | Type    | Description                         | Default Value
------------|---------|-------------------------------------|---------------
`verbose`   | Boolean | Show logging in console/terminal.   | `true`
`qty`       | Integer | Number of IP addresses to generate. | `1`

#

#### `ipv4.validate(address[, options])`

Checks if given `address` is a valid IPv4 address:

```js
const ipIsValid = ipv4.validate('36.42.224.208');
console.log(ipIsValid);

/* outputs:

ipv4.validate() » Validating 36.42.224.208...
ipv4.validate() » IP is valid IPv4 address!
true
*/
```

Available options (passed as object properties):

Name        | Type    | Description                       | Default Value
------------|---------|-----------------------------------|---------------
`verbose`   | Boolean | Show logging in console/terminal. | `true`

#

### `ipv6` methods

💡 Use the `ipv6` methods to [**generate**](#ipv6generateoptions), [**format**](#ipv6formatipv6address-options), and [**validate**](#ipv6validateaddress-options) IPv6 addresses.

#

#### `ipv6.generate([options])`

Generates **one** IPv6 address if `qty` option is not given, returning a string:

```js
const ip = ipv6.generate();
console.log(ip); // sample output: '1379:6748:810c:5e16:b6c9:ae2:939f:8f2a'
```

...or **multiple** IPv6 addresses if `qty` option is given, returning an array of strings:

```js
const ips = ipv4.generate({ qty: 5 });
console.log(ips);

/* sample output:

ipv6.generate() » Generating IPv6 addresses...
ipv6.generate() » IPv6 addresses generated!
ipv6.generate() » 8218:19b9:7709:4282:65e1:7ee:319e:32ef, e940:754d:ae46:ae18:94dd:b43c:583:68c2, b570:b4f8:68f:62e2:99cb:ad0f:6237:9d51, 98a7:f4e5:2f4e:8a2d:56bb:dc28:f94a:46a8, ca59:590a:9b6c:ea25:94fa:37d6:9bac:7ff6
[
  '8218:19b9:7709:4282:65e1:7ee:319e:32ef',
  'e940:754d:ae46:ae18:94dd:b43c:583:68c2',
  'b570:b4f8:68f:62e2:99cb:ad0f:6237:9d51',
  '98a7:f4e5:2f4e:8a2d:56bb:dc28:f94a:46a8',
  'ca59:590a:9b6c:ea25:94fa:37d6:9bac:7ff6'
]
*/
```

Available options:

Name           | Type    | Description                          | Default Value
---------------|---------|--------------------------------------|---------------
`verbose`      | Boolean | Show logging in console/terminal.    | `true`
`qty`          | Integer | Number of IP addresses to generate.  | `1`
`leadingZeros` | Boolean | Include leading zeros in hex pieces. | `false`
`doubleColon`  | Boolean | Replace series of zeros w/ `::`      | `true`

#

#### `ipv6.format(ipv6address[, options])`

Formats an IPv6 address according to `options` passed, returning a string:

```js
const ipv6address = '0d::ffff:192.1.56.10/96',
      formattedAddress = ipv6.format(ipv6address, { leadingZeros: true, doubleColon: false });

console.log(formattedAddress);

/* outputs:

ipv6.format() » Expanding '::' into zero series...
ipv6.format() » Adding leading zeros...
ipv6.format() » IP formatted successfully!
ipv6.format() » 000d:0000:0000:0000:0000:0000:ffff:192.1.56.10/96
'000d:0000:0000:0000:0000:0000:ffff:192.1.56.10/96'
*/
```

Available options:

Name           | Type    | Description                          | Default Value
---------------|---------|--------------------------------------|---------------
`verbose`      | Boolean | Show logging in console/terminal.    | `true`
`leadingZeros` | Boolean | Include leading zeros in hex pieces. | `false`
`doubleColon`  | Boolean | Replace series of zeros w/ `::`      | `true`

#

#### `ipv6.validate(address[, options])`

Checks if given `address` is a valid IPv6 address:

```js
const ipIsValid = ipv6.validate('0:0:0:0:0:ffff:192.1.56.10/96');
console.log(ipIsValid);

/* outputs:

ipv6.validate() » Validating 0:0:0:0:0:ffff:192.1.56.10/96...
ipv6.validate() » IP is valid IPv6 address!
true
*/
```

Available options (passed as object properties):

Name        | Type    | Description                       | Default Value
------------|---------|-----------------------------------|---------------
`verbose`   | Boolean | Show logging in console/terminal. | `true`

#

### `mac` methods

💡 Use the `mac` methods to [**generate**](#macgenerateoptions) and [**validate**](#macvalidateaddress-options) MAC addresses.

#

#### `mac.generate([options])`

Generates **one** MAC address if `qty` option is not given, returning a string:

```js
const macAddress = mac.generate();
console.log(macAddress); // sample output: '1d:3a:af:21:b1:8c'
```

...or **multiple** MAC addresses if `qty` option is given, returning an array of strings:

```js
const macAddresses = mac.generate({ qty: 2 });
console.log(macAddresses);

/* sample output:

mac.generate() » Generating MAC addresses...
mac.generate() » MAC addresses generated!
mac.generate() » 1d:3a:af:21:b1:8c, af:fb:6f:b6:1b:8a
[ '1d:3a:af:21:b1:8c', 'af:fb:6f:b6:1b:8a' ]
*/
```

Available options:

Name           | Type    | Description                          | Default Value
---------------|---------|--------------------------------------|---------------
`verbose`      | Boolean | Show logging in console/terminal.    | `true`
`qty`          | Integer | Number of IP addresses to generate.  | `1`

#

#### `mac.validate(address[, options])`

Checks if given `address` is a valid MAC address:

```js
const addressIsValid = mac.validate('1d:3a:af:21:b1:8c');
console.log(addressIsValid);

/* outputs:

mac.validate() » Validating 1d:3a:af:21:b1:8c...
mac.validate() » Address is valid MAC address!
true
*/
```

Available options (passed as object properties):

Name        | Type    | Description                       | Default Value
------------|---------|-----------------------------------|---------------
`verbose`   | Boolean | Show logging in console/terminal. | `true`

<br>

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png?c0192d3">

## 💻 Command line usage

When installed [globally](#-installation), **generate-ip** can also be used from the command line. The basic command is:

```
$ generate-ip
```

Sample output:

<img src="https://media.generate-ip.org/images/screenshots/cli/generate-ip-cmd-output.jpg?07367f4">

📝 **Note:** To generate multiple IP addresses, pass `--qty=n` where `n` is the number of IPs to generate.

#

### Command line options

```
Parameter options:
 --qty=n                     Generate n IP address(es).

Boolean options:
 -q, --quiet                 Suppress all logging except errors.

Info commands:
 -h, --help                  Display help screen.
 -v, --version               Show version number.
```

<br>

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png?c0192d3">

## 🏛️ MIT License

**Copyright © 2024 [Adam Lui](https://github.com/adamlui) & contributors.**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

<br>

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png?c0192d3">

## 🛠️ Related utilities

### [🔒 generate-pw](../generate-pw) <a href="https://github.com/toolleeo/cli-apps#password-managers"><img height=18 src="https://media.js-utils.com/images/badges/awesome/badge.svg?bdf2f44"></a>

> Randomly generate, strengthen, and validate cryptographically-secure passwords.
<br>[Install](https://docs.generatepw.org/#-installation) /
[Readme](https://docs.generatepw.org/#readme) /
[API usage](https://docs.generatepw.org/#-api-usage) /
[CLI usage](https://docs.generatepw.org/#-command-line-usage) /
[Discuss](https://github.js-utils.com/discussions)

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://media.geolocatejs.org/images/icons/wire-globe/white/icon32.png?e735b99"><img height=22 src="https://media.geolocatejs.org/images/icons/wire-globe/black/icon32.png?e735b99"></picture> [geolocate](https://js-utils.com/geolocate)

> Fetch IP geolocation data from the CLI.
<br>[Install](https://docs.geolocatejs.org/#-installation) /
[Readme](https://docs.geolocatejs.org/#readme) /
[CLI usage](https://docs.geolocatejs.org/#-command-line-usage) /
[API usage](https://docs.geolocatejs.org/#-api-usage) /
[Discuss](https://github.js-utils.com/discussions)

<br>

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png?c0192d3">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://media.js-utils.com/images/icons/home/white/icon32x27.png"><img height=13 src="https://media.js-utils.com/images/icons/home/dark-gray/icon32x27.png"></picture> <a href="https://js-utils.com">**More JavaScript utilities**</a> /
<a href="https://github.js-utils.com/discussions">Discuss</a> /
<a href="#-generate-ip">Back to top ↑</a>
