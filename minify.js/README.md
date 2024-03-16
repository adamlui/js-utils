<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/white/icon32.svg">
            <img height=14 src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/black/icon32.svg">
        </picture>
        &nbsp;English |
        <a href="https://github.com/adamlui/js-utils/tree/main/minify.js/docs/zh-cn#readme">简体中文</a> |
        <a href="https://github.com/adamlui/js-utils/tree/main/minify.js/docs/zh-tw#readme">繁體中文</a> |
        <a href="https://github.com/adamlui/js-utils/tree/main/minify.js/docs/hi#readme">हिंदी</a> |
        <a href="https://github.com/adamlui/js-utils/tree/main/minify.js/docs/bn#readme">বাংলা</a> |
        <a href="https://github.com/adamlui/js-utils/tree/main/minify.js/docs/mr#readme">मराठी</a> |
        <a href="https://github.com/adamlui/js-utils/tree/main/minify.js/docs/pa#readme">ਪੰਜਾਬੀ</a>
    </h6>
</div>

# </> minify.js

### Recursively minify all JavaScript files.

<a href="https://www.npmjs.com/package/@adamlui/minify.js"><img height=31 src="https://img.shields.io/npm/dt/%40adamlui%2Fminify.js?logo=npm&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-license"><img height=31 src="https://img.shields.io/badge/License-MIT-red.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/minify.js?activeTab=versions"><img height=31 src="https://img.shields.io/badge/Latest_Build-1.4.2-fc7811.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/minify.js?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fminify.js?style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:minify.js/minify.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Aminify.js%2Fminify.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>

<img src="https://github.com/adamlui/js-utils/blob/main/minify.js/media/images/minify.js-docs-demo.png">

<br>

<img height=8px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## ⚡ Installation

As a **global utility**:

```
npm install -g @adamlui/minify.js
```

As a **dev dependency** (e.g. for build scripts), from your project root:

```
npm install -D @adamlui/minify.js
```

As a **runtime dependency** (e.g. for on-the-fly minification), from your project root:

```
npm install @adamlui/minify.js
```

## 💻 Command line usage

The basic **global command** is:

```
minify-js
```

**💡 Note:** Pass `-n` or `--dry-run` to only see what files will be processed.

#

To specify **input/output** paths:
   
```
minify-js [input_path] [output_path]
```

- `[input_path]`: Path to JS file or directory containing JS files to be minified, relative to the current working directory.
- `[output_path]`: Path to file or directory where minified files will be stored, relative to original file location (if not provided, `min/` is used).

**💡 Note:** If folders are passed, files will be processed recursively unless `-R` or `--no-recursion` is passed.

#

To use as a **package script**, in your project's `package.json`:

```json
  "scripts": {
    "build:js": "<minify-js-cmd>"
  },
```

Replace `<minify-js-cmd>` with `minify-js` + optional args. Then, `npm run build:js` can be used to run the command.
<br><br>

### Example commands

Minify all JavaScript files in the **current directory** (outputs to `min/`):

```
minify-js
```

Minify all JavaScript files in a **specific directory** (outputs to `path/to/your/directory/min/`):

```
minify-js path/to/your/directory
```

Minify a **specific file** (outputs to `path/to/your/min/file.min.js`):

```
minify-js path/to/your/file.js
```

Specify both **input and output** directories (outputs to `output_folder/`):

```
minify-js input_folder output_folder
```

### Command line options

```
Config options:
 -n, --dry-run               Don't actually minify the file(s), just show
                             if they will be processed.
 -d, --include-dotfolders    Include dotfolders in file search.
 -D, --include-dotfiles      Include dotfiles in file search.
 -R, --no-recursion          Disable recursive file searching.
 -M, --no-mangle             Disable mangling names.
 -q, --quiet                 Suppress all logging except errors.

Info commands:
 -h, --help                  Display help screen.
 -v, --version               Show version number.
```

## 🔌 API reference

You can also import **minify.js** into your app to use its API methods, both as an ECMAScript module or a CommonJS module.

#### ESM:

```js
import * as minifyJS from '@adamlui/minify.js';
```

#### CJS:

```js
const minifyJS = require('@adamlui/minify.js');
```

### minify(input, options)

This function minifies JavaScript code based on the string input supplied.

If **source code** is passed, it is directly minified, then an object containing `srcPath` + `code` + `error` is returned:

```js
const srcCode = 'function add(first, second) { return first + second; }',
      minifyResult = minifyJS.minify(srcCode);
console.log(minifyResult.error); // runtime error, or `undefined` if no error
console.log(minifyResult.code);  // minified output: function add(n,d){return n+d}
```

If a **file path** is passed, the file's code is loaded then minified, returning an object like above.

If a **directory path** is passed, JavaScript files are searched for (recursively by default), each one's code is loaded then minified, then an array of objects containing `srcPath` + `code` + `error` is returned:

```js
const results = minifyJS.minify('.');
results.forEach(result =>
    console.log(result.srcPath)); // paths to JS files in working directory + all nested directories
console.log(results[1].code);     // minified code of 2nd JS file if found, or `undefined` if not found
```

Options are boolean, passed as object properties. For example:

```js
minifyJS.minify(input, { dotFiles: true });
// returns data object where dotfiles are also processed if `input` is a path
```

Possible parameters (and their default settings) are:

```
 recursive (true)     Recursively search for nested files if dir path
                      passed.
 verbose (true)       Show logging in console/terminal.
 dotFolders (false)   Include dotfolders in file search.
 dotFiles (false)     Include dotfiles in file search.
 mangle (true)        Shorten variable names (typically to one character).
```

### findJS(searchDir, options)

This function searches for all unminified JavaScript files within the `searchDir` string passed (useful for discovering what files [`minify()`](#minifyinput-options) will process) and returns an array containing their filepaths.

Options are boolean, passed as object properties. For example:

```js
minifyJS.findJS(searchDir, { recursive: false });
// returns array containing filepaths to unminified JS files in exactly `searchDir`
```

Possible parameters (and their default settings) are:

```
 recursive (true)     Recursively search for nested files if dir path
                      passed.
 verbose (true)       Show logging in console/terminal.
 dotFolders (false)   Include dotfolders in file search.
 dotFiles (false)     Include dotfiles in file search.
```

<br>

## 💖 Support

Please consider [giving a GitHub ⭐](https://github.com/adamlui/js-utils) if this helped you!
<br><br>

## 🏛️ MIT License

**Copyright © 2023–2024 [Adam Lui](https://github.com/adamlui) & contributors**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

<a href="https://github.com/adamlui/js-utils">**Home**</a> /
<a href="https://github.com/adamlui/js-utils/discussions">Discuss</a> /
<a href="#-minifyjs">Back to top ↑</a>
