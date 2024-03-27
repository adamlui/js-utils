<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/white/icon32.svg">
            <img height=14 src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/black/icon32.svg">
        </picture>
        &nbsp;English |
        <a href="https://github.com/adamlui/js-utils/tree/main/generate-pw/docs/zh-cn#readme">简体中文</a> |
        <a href="https://github.com/adamlui/js-utils/tree/main/generate-pw/docs/zh-tw#readme">繁體中文</a> |
        <a href="https://github.com/adamlui/js-utils/tree/main/generate-pw/docs/hi#readme">हिंदी</a> |
        <a href="https://github.com/adamlui/js-utils/tree/main/generate-pw/docs/bn#readme">বাংলা</a>
    </h6>
</div>

# > generate-pw

### Randomly generate cryptographically-secure passwords.

<a href="#%EF%B8%8F-mit-license"><img height=31 src="https://img.shields.io/badge/License-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/generate-pw-1.3.0"><img height=31 src="https://img.shields.io/badge/Latest_Build-1.3.0-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/generate-pw?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/generate-pw?style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:generate-pw/generate-pw.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Agenerate-pw%2Fgenerate-pw.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

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

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🔌 API usage

**generate-pw** can be imported into your app as an ECMAScript module or a CommonJS module.

#### ESM:

```js
import * as pw from 'generate-pw';
```

#### CJS:

```js
const pw = require('generate-pw');
```

#

### `generatePassword([options])`

Generates **one** password if `qty` option is not given, returning a string:

```js
const password = pw.generatePassword({ length: 11, numbers: true });
console.log(password);

/* sample output:

generatePassword() » Initializing character set...
generatePassword() » Generating password...
generatePassword() » Password generated!
generatePassword() » Check returned string.
'bAsZm3mq6Qn'
*/
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
console.log(strictPW);

/* sample output:

strictify() » Strictifying password...
strictify() » Password is now strict!
strictify() » Check returned string.
a!c2ef
*/
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

Name        | Type    | Description                                                                    | Default Value
------------|---------|--------------------------------------------------------------------------------|---------------
`verbose`   | Boolean | Enable logging.                                                                | `true`
`length`    | Integer | Length of password(s).                                                         | `8`
`qty`*      | Integer | Number of passwords to generate.                                               | `1`
`charset`   | String  | Characters to include in password(s).                                          | `''`
`exclude`   | String  | Characters to exclude from password(s).                                        | `''`
`numbers`   | Boolean | Allow numbers in password(s).                                                  | `false`
`symbols`   | Boolean | Allow symbols in password(s).                                                  | `false`
`lowercase` | Boolean | Allow lowercase letters in password(s).                                        | `true`
`uppercase` | Boolean | Allow uppercase letters in password(s).                                        | `true`
`strict`    | Boolean | Require at least one character from each allowed character set in password(s). | `false`

##### _*Only available in [`generatePassword([options])`](#generatepasswordoptions) since [`generatePasswords(qty[, options])`](#generatepasswordsqty-options) takes a `qty` argument_

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 💻 Command line usage

When installed [globally](#-installation), **generate-pw** can also be used from the command line. The basic command is:

```
$ generate-pw
```

**💡 Note:** For security reasons, generated password(s) are stored in the clipboard.

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
 -s, --include-symbols       Allow symbols in password(s).
 -L, --no-lowercase          Disallow lowercase letters in password(s).
 -U, --no-uppercase          Disallow uppercase letters in password(s).

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
<a href="#-generate-pw">Back to top ↑</a>
