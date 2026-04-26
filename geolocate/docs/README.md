<a id="top"></a>

# <picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/js-utils@6b0d399/geolocate/assets/images/icons/wire-globe/white/icon32.png"><img height=28 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@6b0d399/geolocate/assets/images/icons/wire-globe/black/icon32.png"></picture> geolocate

### Fetch IP geolocation data from the CLI.

<a href="https://npm-compare.com/@adamlui/geolocate/#timeRange=ALL">
    <img height=31 src="https://img.shields.io/npm/dm/@adamlui/geolocate?logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/geolocate-2.4.4">
    <img height=31 src="https://img.shields.io/badge/Latest_Build-2.4.4-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-license">
    <img height=31 src="https://img.shields.io/badge/License-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/geolocate?activeTab=code">
    <img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fgeolocate?style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://sonarcloud.io/component_measures?metric=vulnerabilities&selected=adamlui_js-utils%3Ageolocate&id=adamlui_js-utils">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Ageolocate%2Fsrc%2Fgeolocate.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonar&logoColor=white&labelColor=464646&label=Vulnerabilities&color=ffef00"></a>
<a href="https://github.com/toolleeo/cli-apps/#networking">
    <img height=31 src="https://img.shields.io/badge/Mentioned_in-Awesome-ff69b4?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@6b0d399/assets/images/separators/aqua-gradient.png">

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

<a href="https://github.com/sponsors/adamlui"><img src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@6b0d399/assets/images/banners/sponsor/$10/banner1660x260.png"></a>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@6b0d399/assets/images/separators/aqua-gradient.png">

## 💻 Command line usage

The basic **global command** is:

```
$ geolocate [ip1] [ip2] [...]
```

Sample output:

<img src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@6b0d399/geolocate/assets/images/screenshots/cli/geolocate-8.8.8.8-cmd-output.png">

**📝 Note:** If no IPv4 address is passed, your own one will be used.

### Command line options

```
Parameter options:
 --ui-lang="code"            ISO 639-1 code of language to display UI in.
 --config="path/to/file"     Load custom config file.

Boolean options:
 -q, --quiet                 Suppress all logging except errors.

Commands:
 -i, --init                  Create config file (in project root).
 -h, --help                  Display help screen.
 -v, --version               Show version number.
     --stats                 Show npm stats.
     --debug [targetKey]     Show debug logs.
```

#

### Configuration file

**generate-ip** can be customized using a `geolocate.config.mjs` or `geolocate.config.js` placed in your project root.

Example defaults:

```js
export default {
    quietMode: false // suppress all logging except errors
}
```

💡 Run `geolocate init` to generate a template `geolocate.config.mjs` in your project root.

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@6b0d399/assets/images/separators/aqua-gradient.png">

## 🔌 Importing the API

#### <a href="#-es-modules-esm"><img height=13 width="auto" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@dbdea4b/assets/images/icons/module-systems/esm/icon32.png"></a> ES Modules (ESM):

```js
import geo from '@adamlui/geolocate'
```

#### <a href="#-commonjs-cjs"><img height=13 width="auto" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@dbdea4b/assets/images/icons/module-systems/cjs/icon32.png"></a> CommonJS (CJS):

```js
const geo = require('@adamlui/geolocate')
```

#### [<img height=14 src="https://cdn.jsdelivr.net/gh/adamlui/ai-web-extensions@c226de5/assets/images/icons/browsers/chrome/icon16.png" title="Chrome">][web-usage][<img height=13.5 src="https://cdn.jsdelivr.net/gh/adamlui/ai-web-extensions@c226de5/assets/images/icons/browsers/edge/icon16.png" title="Edge">][web-usage][<img height=14 src="https://cdn.jsdelivr.net/gh/adamlui/ai-web-extensions@c226de5/assets/images/icons/browsers/firefox/icon16.png" title="Firefox">][web-usage][<img height=14 src="https://cdn.jsdelivr.net/gh/adamlui/ai-web-extensions@c226de5/assets/images/icons/browsers/safari/icon16.png" title="Safari">][web-usage][<img height=13 src="https://cdn.jsdelivr.net/gh/adamlui/ai-web-extensions@c226de5/assets/images/icons/browsers/qq/3d/icon-32x33.png" title="QQ Browser">][web-usage] Web:

[web-usage]: #-web

```html
<script src="https://cdn.jsdelivr.net/npm/@adamlui/geolocate@2/dist/geolocate.min.js"></script>
```

#### [<img height="13" src="https://cdn.jsdelivr.net/gh/adamlui/userscripts@2793398/assets/images/icons/userscript-managers/tampermonkey/icon28.png" title="Tampermonkey">][greasemonkey-usage][<img height="15" src="https://cdn.jsdelivr.net/gh/adamlui/userscripts@2793398/assets/images/icons/userscript-managers/violentmonkey/icon25.png" title="Violentmonkey">][greasemonkey-usage][<img height="13" src="https://cdn.jsdelivr.net/gh/adamlui/userscripts@2793398/assets/images/icons/userscript-managers/scriptcat/icon32.png" title="ScriptCat">][greasemonkey-usage][<img height="13" src="https://cdn.jsdelivr.net/gh/adamlui/userscripts@2793398/assets/images/icons/userscript-managers/orangemonkey/icon16.png" title="OrangeMonkey">][greasemonkey-usage][<img height="14" src="https://cdn.jsdelivr.net/gh/adamlui/userscripts@2793398/assets/images/icons/userscript-managers/stay/icon32.png" title="Stay">][greasemonkey-usage][<img height="13" src="https://cdn.jsdelivr.net/gh/adamlui/userscripts@2793398/assets/images/icons/userscript-managers/userscripts/icon32.png" title="Userscripts">][greasemonkey-usage] Greasemonkey:

[greasemonkey-usage]: #-greasemonkey-1

```js
...
// @require   https://cdn.jsdelivr.net/npm/@adamlui/geolocate@2/dist/geolocate.min.js
// ==/UserScript==
...
```

<br><a href="https://github.com/sponsors/KudoAI"><img src="https://cdn.jsdelivr.net/gh/adamlui/ai-web-extensions@e53b001/assets/images/banners/sponsor/$10/banner1660x260.png"></a>

<hr>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@6b0d399/assets/images/separators/aqua-gradient.png">

## 📋 API usage

### `locate([ips, options])`

💡 Asynchronous method to fetch geolocation data for each `ip` passed in an array, returned as an array of data objects.

Example:

```js
const geo = require('@adamlui/geolocate')

// Using await syntax
(async () => {
    const location = await geo.locate('8.8.8.8')
    console.log(location)
})()

// Using .then() syntax
geo.locate('8.8.8.8').then(location => {
    console.log(location)
})

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

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@6b0d399/assets/images/separators/aqua-gradient.png">

## 🏛️ MIT License

**Copyright © 2024–2026 [Adam Lui](https://github.com/adamlui).**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@6b0d399/assets/images/separators/aqua-gradient.png">

## 🛠️ Related utilities

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/js-utils@6b0d399/generate-ip/assets/images/icons/node-graph/white/icon55x49.png"><img height=21 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@6b0d399/generate-ip/assets/images/icons/node-graph/black/icon55x49.png"></picture> [generate-ip](https://github.com/adamlui/js-utils/tree/main/generate-ip/#readme) &nbsp;<a href="https://github.com/toolleeo/cli-apps/#networking"><img height=18 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@6b0d399/assets/images/badges/awesome/badge.svg"></a>

> Randomly generate, format, and validate IPv4 + IPv6 + MAC addresses.
<br>[Install](https://github.com/adamlui/js-utils/tree/main/generate-ip/docs/#-installation) /
[Readme](https://github.com/adamlui/js-utils/tree/main/generate-ip/docs/#readme) /
[API usage](https://github.com/adamlui/js-utils/tree/main/generate-ip/docs/#-api-usage) /
[CLI usage](https://github.com/adamlui/js-utils/tree/main/generate-ip/docs/#-command-line-usage) /
[Discuss](https://github.com/adamlui/js-utils/discussions)

### [🔒 generate-pw](https://github.com/adamlui/js-utils/tree/main/generate-pw/#readme) &nbsp;<a href="https://github.com/toolleeo/cli-apps/#password-managers"><img height=18 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@6b0d399/assets/images/badges/awesome/badge.svg"></a>

> Randomly generate, strengthen, and validate cryptographically-secure passwords.
<br>[Install](https://github.com/adamlui/js-utils/tree/main/generate-pw/docs/#-installation) /
[Readme](https://github.com/adamlui/js-utils/tree/main/generate-pw/docs/#readme) /
[API usage](https://github.com/adamlui/js-utils/tree/main/generate-pw/docs/#-api-usage) /
[CLI usage](https://github.com/adamlui/js-utils/tree/main/generate-pw/docs/#-command-line-usage) /
[Discuss](https://github.com/adamlui/js-utils/discussions)

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@6b0d399/assets/images/separators/aqua-gradient.png">

[<picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/js-utils@21bf981/assets/images/icons/home/white/icon32x27.png"><img height=13 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@21bf981/assets/images/icons/home/dark-gray/icon32x27.png"></picture>][js-utils]
[**More JavaScript utilities**][js-utils] /
<a href="https://github.com/adamlui/js-utils/discussions">Discuss</a> /
<a href="https://github.com/adamlui/js-utils/issues">Report bug</a> /
<a href="mailto:security@tidelift.com">Report vulnerability</a> /
<a href="#top">Back to top ↑</a>

[js-utils]: https://github.com/adamlui/js-utils/#readme
