# <picture><source media="(prefers-color-scheme: dark)" srcset="https://media.geolocatejs.org/images/icons/wire-globe/white/icon32.png?e735b99"><img height=28 src="https://media.geolocatejs.org/images/icons/wire-globe/black/icon32.png?e735b99"></picture> geolocate

### Fetch IP geolocation data from the CLI.

<a href="https://www.npmjs.com/package/@adamlui/geolocate">
    <img height=31 src="https://img.shields.io/npm/dm/@adamlui/geolocate?logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-license">
    <img height=31 src="https://img.shields.io/badge/License-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/geolocate-2.0.10">
    <img height=31 src="https://img.shields.io/badge/Latest_Build-2.0.10-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/geolocate?activeTab=code">
    <img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fgeolocate?style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://github.com/adamlui/js-utils/blob/geolocate-2.0.10/geolocate/dist/geolocate.min.js">
    <img height=31 src="https://img.shields.io/github/size/adamlui/js-utils/geolocate/dist/geolocate.min.js?branch=geolocate-2.0.10&label=Minified%20Size&logo=databricks&logoColor=white&labelColor=464646&color=ff69b4&style=for-the-badge"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:geolocate/src/geolocate.js">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Ageolocate%2Fsrc%2Fgeolocate.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#networking">
    <img height=31 src="https://img.shields.io/badge/Mentioned_in-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<br>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/gradient-aqua.png?v=c0192d3">

## ⚡ Installation

As a **global utility**:

```
$ npm install -g @adamlui/geolocate
```

As a **dev dependency**, from your project root:

```
$ npm install -D @adamlui/geolocate
```

As a **runtime dependency**, from your project root:

```
$ npm install @adamlui/geolocate
```

<br>

<a href="https://github.com/sponsors/adamlui"><img src="https://assets.js-utils.org/images/banners/sponsor/$10/banner1660x260.png?v=09f5d64"></a>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/gradient-aqua.png?v=c0192d3">

## 💻 Command line usage

The basic **global command** is:

```
$ geolocate [ip1] [ip2] [...]
```

Sample output:

<img src="https://media.geolocatejs.org/images/screenshots/cli/geolocate-8.8.8.8-cmd-output.png?7b16322">

**📝 Note:** If no IPv4 address is passed, your own one will be used.

### Command line options

```
Boolean options:
 -q, --quiet                 Suppress all logging except errors.

Info commands:
 -h, --help                  Display help screen.
 -v, --version               Show version number.
```

<br>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/gradient-aqua.png?v=c0192d3">

## 🔌 Importing the API

You can also import **geolocate** into your app to use its main API method.

### <img height=18 src="https://assets.js-utils.org/images/icons/platforms/node.js/icon25x28.png?v=3e22bae"> Node.js

#### ECMAScript*:

```js
import geo from '@adamlui/geolocate';
```

#### CommonJS:

```js
const geo = require('@adamlui/geolocate');
```

###### _*Node.js version 14 or higher required_

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://assets.js-utils.org/images/icons/platforms/web/light/icon25.png?v=3e22bae"><img width=16 src="https://assets.js-utils.org/images/icons/platforms/web/dark/icon25.png?v=3e22bae"></picture> Web

#### <> HTML script tag:

```html
<script src="https://cdn.jsdelivr.net/npm/@adamlui/geolocate@2.0.10/dist/geolocate.min.js"></script>
```

#### ES6:

```js
(async () => {
    await import('https://cdn.jsdelivr.net/npm/@adamlui/geolocate@2.0.10/dist/geolocate.min.js');
    // Your code here...
})();
```

### <img height=17 src="https://assets.js-utils.org/images/icons/platforms/tampermonkey/icon28.png?v=4fd2fa7"><img height=17.5 src="https://assets.js-utils.org/images/icons/platforms/violentmonkey/icon25.png?v=2fe972c"> Greasemonkey

```js
...
// @require https://cdn.jsdelivr.net/npm/@adamlui/geolocate@2.0.10/dist/geolocate.min.js
// ==/UserScript==

// Your code here...
```

<br>

**📝 Note:** To always import the latest version (not recommended in production!) remove the `@2.0.10` version tag from the jsDelivr URL: `https://cdn.jsdelivr.net/npm/@adamlui/geolocate/dist/geolocate.min.js`

<br>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/gradient-aqua.png?v=c0192d3">

## 📋 API usage

### `locate([ips, options])`

💡 Asynchronous method to fetch geolocation data for each `ip` passed in an array, returned as an array of data objects.

Example:

```js
const geo = require('@adamlui/geolocate');

// Using await syntax
(async () => {
    const location = await geo.locate('8.8.8.8');
    console.log(location);
})();

// Using .then() syntax
geo.locate('8.8.8.8').then(location => {
    console.log(location);
});

/* outputs:
[{
  ip: '8.8.8.8',
  country: 'United States',
  countryCode: 'US',
  region: 'VA',
  regionName: 'Virginia',
  city: 'Ashburn',
  zip: '20149',
  lat: 39.03,
  lon: -77.5,
  timezone: 'America/New_York',
  isp: 'Google LLC'
}]
*/
```

**📝 Note:** If no IPv4 address is passed, your own one will be used.

Available options (passed as object properties):

Name      | Type    | Description                       | Default Value
----------|---------|-----------------------------------|---------------
`verbose` | Boolean | Show logging in console/terminal. | `true`

<br>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/gradient-aqua.png?v=c0192d3">

## 🏛️ MIT License

**Copyright © 2024–2025 [Adam Lui](https://github.com/adamlui).**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

<br>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/gradient-aqua.png?v=c0192d3">

## 🛠️ Related utilities

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://media.generate-ip.org/images/icons/node-graph/white/icon55x49.png?b4eb06e"><img height=21 src="https://media.generate-ip.org/images/icons/node-graph/black/icon55x49.png?b4eb06e"></picture> [generate-ip](https://js-utils.org/generate-ip) &nbsp;<a href="https://github.com/toolleeo/cli-apps#networking"><img height=18 src="https://assets.js-utils.org/images/badges/awesome/badge.svg?v=7b16322"></a>

> Randomly generate, format, and validate IPv4 + IPv6 + MAC addresses.
<br>[Install](https://docs.generate-ip.org/#-installation) /
[Readme](https://docs.generate-ip.org/#readme) /
[API usage](https://docs.generate-ip.org/#-api-usage) /
[CLI usage](https://docs.generate-ip.org/#-command-line-usage) /
[Discuss](https://github.js-utils.org/discussions)

### [🔒 generate-pw](../generate-pw) &nbsp;<a href="https://github.com/toolleeo/cli-apps#password-managers"><img height=18 src="https://assets.js-utils.org/images/badges/awesome/badge.svg?v=7b16322"></a>

> Randomly generate, strengthen, and validate cryptographically-secure passwords.
<br>[Install](https://docs.generatepw.org/#-installation) /
[Readme](https://docs.generatepw.org/#readme) /
[API usage](https://docs.generatepw.org/#-api-usage) /
[CLI usage](https://docs.generatepw.org/#-command-line-usage) /
[Discuss](https://github.js-utils.org/discussions)

<br>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/gradient-aqua.png?v=c0192d3">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://assets.js-utils.org/images/icons/home/white/icon32x27.png?v=e735b99"><img height=13 src="https://assets.js-utils.org/images/icons/home/dark-gray/icon32x27.png?v=e735b99"></picture> <a href="https://js-utils.org">**More JavaScript utilities**</a> /
<a href="https://github.js-utils.org/discussions">Discuss</a> /
<a href="#-geolocate">Back to top ↑</a>
