# > generate-ip

### Randomly generate IPv4 and IPv6 addresses.

<a href="#%EF%B8%8F-mit-license"><img height=31 src="https://img.shields.io/badge/License-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/generate-ip-2.0.0"><img height=31 src="https://img.shields.io/badge/Latest_Build-2.0.0-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/generate-ip?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/generate-ip?style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:generate-ip/generate-ip.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Agenerate-ip%2Fgenerate-ip.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

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

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🔌 API usage

**generate-ip** provides the [**`ipv4`**](#ipv4-methods) and [**`ipv6`**](#ipv6-methods) APIs that can be imported into your app as ECMAScript modules or CommonJS modules.

#### ESM:

```js
import { ipv4, ipv6 } from 'generate-ip';
```

#### CJS:

```js
const { ipv4, ipv6 } = require('generate-ip');
```

#

### `ipv4` methods

Use the `ipv4` methods to [**generate**](#ipv4generateoptions) and [**validate**](#ipv4validateaddress-options) IPv4 addresses.

#

#### `ipv4.generate([options])`

Generates **one** IPv4 address:

```js
const ip = ipv4.generate();
console.log(ip); // sample output: 36.42.224.208
```

Available options (passed as object properties):

Name        | Type    | Description                                                                    | Default Value
------------|---------|--------------------------------------------------------------------------------|---------------
`verbose`   | Boolean | Show logging in console/terminal.                                              | `true`

#

#### `ipv4.validate(address[, options])`

Checks if given `address` is a valid IPv4 address:

```js
const ipIsValid = ipv4.validate('36.42.224.208');
console.log(ipIsValid); // outputs `true`
```

Available options (passed as object properties):

Name        | Type    | Description                                                                    | Default Value
------------|---------|--------------------------------------------------------------------------------|---------------
`verbose`   | Boolean | Show logging in console/terminal.                                              | `true`

#

### `ipv6` methods

Use the `ipv6` methods to [**generate**](#ipv6generateoptions), [**format**](#ipv6formatipv6address-options), and [**validate**](#ipv6validateaddress-options) IPv6 addresses.

#

#### `ipv6.generate([options])`

Generates **one** IPv6 address, returned as a string:

```js
const ip = ipv6.generate();
console.log(ip); // sample output: 1379:6748:810c:5e16:b6c9:ae2:939f:8f2a
```

Available options (passed as object properties):

Name           | Type    | Description                                                                    | Default Value
---------------|---------|--------------------------------------------------------------------------------|---------------
`verbose`      | Boolean | Show logging in console/terminal.                                              | `true`
`leadingZeros` | Boolean | Include leading zeros in hex pieces.                                           | `false`
`doubleColon`  | Boolean | Replace series of zeros w/ `::`                                                | `true`

#


#### `ipv6.format(ipv6Address[, options])`

Formats an IPv6 address according to `options` passed, returning a string:

```js
const address = '0d::ffff:192.1.56.10/96'
      formattedAddress = ipv6.format(address, { leadingZeros: true, doubleColon: false });

/* outputs:

ipv6.format() » Formatting 0d::ffff:192.1.56.10/96...
ipv6.format() » Expanding '::' into zero series...
ipv6.format() » Adding leading zeros...

000d:0000:0000:0000:0000:0000:ffff:192.1.56.10/96
*/
```

Available options:

Name           | Type    | Description                                                                    | Default Value
---------------|---------|--------------------------------------------------------------------------------|---------------
`verbose`      | Boolean | Show logging in console/terminal.                                              | `true`
`leadingZeros` | Boolean | Include leading zeros in hex pieces.                                           | `false`
`doubleColon`  | Boolean | Replace series of zeros w/ `::`                                                | `true`

#

#### `ipv6.validate(address[, options])`

Checks if given `address` is a valid IPv6 address:

```js
const address = '0:0:0:0:0:ffff:192.1.56.10/96',
      ipIsValid = ipv6.validate(address);
console.log(ipIsValid);

/* outputs:

ipv6.validate() » Validating 0:0:0:0:0:ffff:192.1.56.10/96...
ipv6.validate() » IP is valid IPv6 address!
true
*/
```

Available options (passed as object properties):

Name        | Type    | Description                                                                    | Default Value
------------|---------|--------------------------------------------------------------------------------|---------------
`verbose`   | Boolean | Show logging in console/terminal.                                              | `true`

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 💻 Command line usage

When installed [globally](#-installation), **generate-ip** can also be used from the command line. The basic command is:

```
$ generate-ip
```

Generated IP is logged to the console + copied to the clipboard.

#

### Command line options

```
Info commands:
 -h, --help                  Display help screen.
 -v, --version               Show version number.
```

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🏛️ MIT License

**Copyright © 2024 [Adam Lui](https://github.com/adamlui)**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

<a href="https://github.com/adamlui/js-utils">**Home**</a> /
<a href="https://github.com/adamlui/js-utils/discussions">Discuss</a> /
<a href="#-generate-ip">Back to top ↑</a>
