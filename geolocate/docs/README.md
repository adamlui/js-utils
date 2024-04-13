# <picture><source media="(prefers-color-scheme: dark)" srcset="https://github.com/adamlui/js-utils/blob/main/geolocate/media/images/icons/wire-globe/white/icon32.png"><img height=28 src="https://github.com/adamlui/js-utils/blob/main/geolocate/media/images/icons/wire-globe/black/icon32.png"></picture> geolocate

### Fetch IP geolocation data from the CLI.

<a href="https://github.com/adamlui/js-utils/releases/tag/geolocate-1.0.4"><img height=31 src="https://img.shields.io/badge/Latest_Build-1.0.4-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/geolocate?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fgeolocate?style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://github.com/adamlui/js-utils/blob/geolocate-1.0.4/geolocate/dist/geolocate.min.js"><img height=31 src="https://img.shields.io/github/size/adamlui/js-utils/geolocate/dist/geolocate.min.js?branch=geolocate-1.0.4&label=Minified%20Size&logo=databricks&logoColor=white&labelColor=464646&color=ff69b4&style=for-the-badge"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:geolocate/src/geolocate.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Ageolocate%2Fsrc%2Fgeolocate.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

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

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 💻 Command line usage

The basic **global command** is:

```
$ geolocate [ip]
```

Sample output:

<img src="https://github.com/adamlui/js-utils/blob/main/geolocate/media/images/screenshots/cli-geolocate-8.8.8.8.jpg">

**💡 Note:** If no IPv4 address is passed, your own one will be used.

### Command line options

```
Boolean options:
 -q, --quiet                 Suppress all logging except errors.

Info commands:
 -h, --help                  Display help screen.
 -v, --version               Show version number.
```

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🔌 Importing the API

You can also import **geolocate** into your app to use its main API method.

### <img height=18 src="https://i.imgur.com/JIeAdsr.png"> Node.js

#### ECMAScript*:

```js
import * as geo from '@adamlui/geolocate';
```

#### CommonJS:

```js
const geo = require('@adamlui/geolocate');
```

###### _*Node.js version 14 or higher required_

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://i.imgur.com/JSEb19A.png"><img width=16 src="https://i.imgur.com/5VPxf9y.png"></picture> Web

#### <> HTML script tag:

```html
<script src="https://cdn.jsdelivr.net/npm/@adamlui/geolocate@1.0.4/dist/geolocate.min.js"></script>
```

#### ES6:

```js
(async () => {
    await import('https://cdn.jsdelivr.net/npm/@adamlui/geolocate@1.0.4/dist/geolocate.min.js');
    // Your code here...
})();
```

### <img height=17 src="https://raw.githubusercontent.com/KudoAI/chatgpt.js/main/starters/media/images/icons/tampermonkey-icon28.png"><img height=17.5 src="https://raw.githubusercontent.com/KudoAI/chatgpt.js/main/starters/media/images/icons/violentmonkey-icon100.png"> Greasemonkey

```js
...
// @require https://cdn.jsdelivr.net/npm/@adamlui/geolocate@1.0.4/dist/geolocate.min.js
// ==/UserScript==

// Your code here...
```

<br>

📝 **Note:** To always import the latest version (not recommended in production!) remove the `@1.0.4` version tag from the jsDelivr URL: `https://cdn.jsdelivr.net/npm/@adamlui/geolocate/dist/geolocate.min.js`

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 📋 API usage

### `locate([ip])`

Asynchronous method to fetch geolocation data for the `ip` passed, returned as an object:

```js
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
{
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
}
*/
```

**💡 Note:** If no `ip` is supplied, your own one will be used.

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🏛️ MIT License

**Copyright © 2023 [Adam Lui](https://github.com/adamlui).**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🛠️ Related utilities

### <img height=21px src="https://i.imgur.com/kvf7fXm.png"> [generate-ip](https://js-utils.com/generate-ip) <a href="https://github.com/toolleeo/cli-apps#networking"><img height=18 src="https://awesome.re/mentioned-badge.svg"></a>

> Randomly generate, format, and validate IPv4/IPv6 addresses.
<br>[Install](https://github.com/adamlui/js-utils/tree/main/generate-ip#-installation) /
[Readme](https://github.com/adamlui/js-utils/tree/main/generate-ip#readme) /
[API usage](https://github.com/adamlui/js-utils/tree/main/generate-ip#-api-usage) /
[CLI usage](https://github.com/adamlui/js-utils/tree/main/generate-ip#-command-line-usage) /
[Discuss](https://js-utils.com/discussions)

### [🔒 generate-pw](../generate-pw)

> Randomly generate, strengthen, and validate cryptographically-secure passwords.
<br>[Install](https://github.com/adamlui/js-utils/tree/main/generate-pw#-installation) /
[Readme](https://github.com/adamlui/js-utils/tree/main/generate-pw#readme) /
[API usage](https://github.com/adamlui/js-utils/tree/main/generate-pw#-api-usage) /
[CLI usage](https://github.com/adamlui/js-utils/tree/main/generate-pw#-command-line-usage) /
[Discuss](https://js-utils.com/discussions)

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/media/images/icons/home/white/icon32x27.png"><img height=13 src="https://raw.githubusercontent.com/adamlui/js-utils/main/media/images/icons/home/dark-gray/icon32x27.png"></picture> <a href="https://js-utils.com">**More JavaScript utilities**</a> /
<a href="https://js-utils.com/discussions">Discuss</a> /
<a href="#-geolocate">Back to top ↑</a>
