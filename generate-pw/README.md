<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/js-utils/docs/images/earth-icon/white/icon32.svg">
            <img height=14 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils/docs/images/earth-icon/black/icon32.svg">
        </picture>
        &nbsp;English |
        <a href="https://github.com/adamlui/js-utils/tree/main/generate-pw/docs/zh-cn#readme">简体中文</a> |
        <a href="https://github.com/adamlui/js-utils/tree/main/generate-pw/docs/zh-tw#readme">繁體中文</a> |
        <a href="https://github.com/adamlui/js-utils/tree/main/generate-pw/docs/hi#readme">हिंदी</a> |
        <a href="https://github.com/adamlui/js-utils/tree/main/generate-pw/docs/bn#readme">বাংলা</a> |
        <a href="https://github.com/adamlui/js-utils/tree/main/generate-pw/docs/de#readme">Deutsch</a> |
        <a href="https://github.com/adamlui/js-utils/tree/main/generate-pw/docs/es#readme">Español</a> |
        <a href="https://github.com/adamlui/js-utils/tree/main/generate-pw/docs/fr#readme">Français</a>
    </h6>
</div>

# > generate-pw

### Randomly generate, strengthen, and validate cryptographically-secure passwords.

<a href="https://www.npmjs.com/package/generate-pw"><img height=31 src="https://img.shields.io/npm/dm/generate-pw?logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-license"><img height=31 src="https://img.shields.io/badge/License-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/generate-pw-1.5.8"><img height=31 src="https://img.shields.io/badge/Latest_Build-1.5.8-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/generate-pw?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/generate-pw?style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://github.com/adamlui/js-utils/blob/generate-pw-1.5.8/generate-pw/dist/generate-pw.min.js"><img height=31 src="https://img.shields.io/github/size/adamlui/js-utils/generate-pw/dist/generate-pw.min.js?branch=generate-pw-1.5.8&label=Minified%20Size&logo=databricks&logoColor=white&labelColor=464646&color=ff69b4&style=for-the-badge"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:generate-pw/src/generate-pw.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Agenerate-pw%2Fsrc%2Fgenerate-pw.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#password-managers"><img height=31 src="https://img.shields.io/badge/Mentioned_in-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<br>

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png?c0192d3">

## 💡 About

**generate-pw** is a lightweight, easy-to-use library that allows you to randomly generate, strengthen & validate cryptographically-secure password(s).

- **No external dependencies —** Only built-in crypto methods used for secure randomization
- **Highly customizable —** Specify length, quantity, charsets to use, etc.
- **Multi-environment support —** Use in Node.js or the web browser
- **Command line usable —** Just type `generate-pw`, that's it

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png?c0192d3">

## ⚡ Installation

As a **global utility**:

```
$ npm install -g generate-pw
```

As a **runtime dependency**, from your project root:

```
$ npm install generate-pw
```

<br>

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png?c0192d3">

## 🔌 Importing the API

### <img height=18 src="https://media.js-utils.com/images/icons/platforms/node.js/icon25x28.png?3e22bae"> Node.js

#### ECMAScript*:

```js
import * as pw from 'generate-pw';
```

#### CommonJS:

```js
const pw = require('generate-pw');
```

###### _*Node.js version 14 or higher required_

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://media.js-utils.com/images/icons/platforms/web/light/icon25.png?3e22bae"><img width=16 src="https://media.js-utils.com/images/icons/platforms/web/dark/icon25.png?3e22bae"></picture> Web

#### <> HTML script tag:

```html
<script src="https://cdn.jsdelivr.net/npm/generate-pw@1.5.8/dist/generate-pw.min.js"></script>
```

#### ES6:

```js
(async () => {
    await import('https://cdn.jsdelivr.net/npm/generate-pw@1.5.8/dist/generate-pw.min.js');
    // Your code here...
})();
```

### <img height=17 src="https://media.js-utils.com/images/icons/platforms/tampermonkey/icon28.png?4fd2fa7"><img height=17.5 src="https://media.js-utils.com/images/icons/platforms/violentmonkey/icon25.png?2fe972c"> Greasemonkey

```js
...
// @require https://cdn.jsdelivr.net/npm/generate-pw@1.5.8/dist/generate-pw.min.js
// ==/UserScript==

// Your code here...
```

<br>

**💡 Note:** To always import the latest version (not recommended in production!) remove the `@1.5.8` version tag from the jsDelivr URL: `https://cdn.jsdelivr.net/npm/generate-pw/dist/generate-pw.min.js`

<br>

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png?c0192d3">

## 📋 API usage

### `generatePassword([options])`

Generates **one** password if `qty` option is not given, returning a string:

```js
const password = pw.generatePassword({ length: 11, numbers: true });
console.log(password); // sample output: 'bAsZm3mq6Qn'
```

...or **multiple** passwords if `qty` option is given, returning an array of strings:

```js
const passwords = pw.generatePassword({ qty: 5, length: 8, symbols: true });
console.log(passwords);

/* sample output:

generatePassword() » Generating passwords...
generatePassword() » Passwords generated!
generatePassword() » Check returned array.
[ '!zSf@Q.s', '!,HT\\;m=', '?Lq&FV>^', 'gf}Y;}Ne', 'Stsx(GqE' ]
*/
```

**💡 Note:** If no options are passed, passwords will be 8-chars long, consisting of upper/lower cased letters.

See: [Available options](#available-options-for-generate-functions)

#

### `generatePasswords(qty[, options])`

Generates **multiple** passwords based on `qty` given, returning an array of strings:

```js
const passwords = pw.generatePasswords(5, { length: 3, uppercase: false });
console.log(passwords);

/* sample output:

generatePasswords() » Generating passwords...
generatePasswords() » Passwords generated!
generatePasswords() » Check returned array.
[ 'yilppxru', 'ckvkyjfp', 'zolcpyfb' ]
*/
```

**💡 Note:** If no `qty` arg is passed, just one password will be generated, returned as a string.

See: [Available options](#available-options-for-generate-functions)

#

### `strictify(password[, requiredCharTypes, options])`

Modifies `password` given to use at least one character of each `requiredCharTypes` element passed, returning a string:

```js
const strictPW = pw.strictify('abcdef', ['numbers', 'symbols']);
console.log(strictPW); // sample output: 'a!c2ef'
```

**💡 Note:** If no `requiredCharTypes` array is passed, all available types will be required.

Available `requiredCharTypes` are: `['number', 'symbol', 'lower', 'upper']`

Available options (passed as object properties):

Name      | Type    | Description                       | Default Value
----------|---------|-----------------------------------|---------------
`verbose` | Boolean | Show logging in console/terminal. | `true`

#

### `validateStrength(password[, options])`

Validates the strength of a password, returning an object containing:
- `strengthScore` (0–100)
- `recommendations` array
- `isGood` boolean (`true` if `strengthScore` >= 80) 

Example:

```js
const pwStrength = pw.validateStrength('Aa?idsE');
console.log(pwStrength);

/* outputs:

validateStrength() » Validating password strength...
validateStrength() » Password strength validated!
validateStrength() » Check returned object for score/recommendations.
{
  strengthScore: 60,
  recommendations: [
    'Make it at least 8 characters long.',
    'Include at least one number.'
  ],
  isGood: false
}
*/
```

Available options (passed as object properties):

Name      | Type    | Description                       | Default Value
----------|---------|-----------------------------------|---------------
`verbose` | Boolean | Show logging in console/terminal. | `true`

#

### Available options for `generate*()` functions

Any of these can be passed into the options object for each `generate*()` function:

Name                  | Type    | Description                                                                    | Default Value
----------------------|---------|--------------------------------------------------------------------------------|---------------
`verbose`             | Boolean | Show logging in console/terminal.                                              | `true`
`length`              | Integer | Length of password(s).                                                         | `8`
`qty`*                | Integer | Number of passwords to generate.                                               | `1`
`charset`             | String  | Characters to include in password(s).                                          | `''`
`exclude`             | String  | Characters to exclude from password(s).                                        | `''`
`numbers`             | Boolean | Allow numbers in password(s).                                                  | `false`
`symbols`             | Boolean | Allow symbols in password(s).                                                  | `false`
`lowercase`           | Boolean | Allow lowercase letters in password(s).                                        | `true`
`uppercase`           | Boolean | Allow uppercase letters in password(s).                                        | `true`
`excludeSimilarChars` | Boolean | Exclude similar characters (e.g. o,0,O,i,l,1,\|) in password(s).               | `false`
`strict`              | Boolean | Require at least one character from each allowed character set in password(s). | `false`

##### _*Only available in [`generatePassword([options])`](#generatepasswordoptions) since [`generatePasswords(qty[, options])`](#generatepasswordsqty-options) takes a `qty` argument_

<br>

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png?c0192d3">

## 💻 Command line usage

When installed [globally](#-installation), **generate-pw** can also be used from the command line. The basic command is:

```
$ generate-pw
```

<img src="https://media.generatepw.org/images/screenshots/cli/generate-pw-cmd-output.jpg?66bb9bf">

#

### Command line options

```
Parameter options:
 --length=n                  Generate password(s) of n length.
 --qty=n                     Generate n password(s).
 --charset=chars             Only include chars in password(s).
 --exclude=chars             Exclude chars from password(s).

Boolean options:
 -n, --include-numbers       Allow numbers in password(s).
 -y, --include-symbols       Allow symbols in password(s).
 -L, --no-lowercase          Disallow lowercase letters in password(s).
 -U, --no-uppercase          Disallow uppercase letters in password(s).
 -S, --no-similar            Exclude similar characters in password(s).
 -s, --strict                Require at least one character from each
                             allowed character set in password(s).
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

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://media.generate-ip.org/images/icons/node-graph/white/icon55x49.png?b4eb06e"><img height=21 src="https://media.generate-ip.org/images/icons/node-graph/black/icon55x49.png?b4eb06e"></picture> [generate-ip](https://js-utils.com/generate-ip) <a href="https://github.com/toolleeo/cli-apps#networking"><img height=18 src="https://media.js-utils.com/images/badges/awesome/badge.svg?bdf2f44"></a>

> Randomly generate, format, and validate IPv4 + IPv6 + MAC addresses.
<br>[Install](https://docs.generate-ip.org/#-installation) /
[Readme](https://docs.generate-ip.org/#readme) /
[API usage](https://docs.generate-ip.org/#-api-usage) /
[CLI usage](https://docs.generate-ip.org/#-command-line-usage) /
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

<picture><source media="(prefers-color-scheme: dark)" srcset="https://media.js-utils.com/images/icons/home/white/icon32x27.png?e735b99"><img height=13 src="https://media.js-utils.com/images/icons/home/dark-gray/icon32x27.png?e735b99"></picture> <a href="https://js-utils.com">**More JavaScript utilities**</a> /
<a href="https://github.js-utils.com/discussions">Discuss</a> /
<a href="#-generate-pw">Back to top ↑</a>
