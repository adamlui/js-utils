# </> minify.js

### Recursively minify all JavaScript files.

<a href="#">
    <img height=31 src="https://img.shields.io/badge/Downloads-2.9K/month-44cc11.svg?logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></img></a>
<a href="#%EF%B8%8F-mit-license">
    <img height=31 src="https://img.shields.io/badge/License-MIT-fc4f2d.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.codefactor.io/repository/github/adamlui/minify.js">
    <img height=31 src="https://img.shields.io/codefactor/grade/github/adamlui/minify.js?label=Code+Quality&logo=codefactor&logoColor=white&labelColor=464646&color=b5fc7b&style=for-the-badge"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_minify.js:node.js/src/minify.js">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_minify.js%3Anode.js%2Fsrc%2Fminify.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#programming">
    <img height=31 src="https://img.shields.io/badge/Mentioned_in-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://minify-js.org">
    <img height=31 src="https://img.shields.io/badge/web-minify--js.org-lightgrey?logo=dribbble&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img src="https://cdn.jsdelivr.net/gh/adamlui/minify.js@3d56890/node.js/media/images/screenshots/cli/minify-js-docs-cmd-output.png">

<br>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

## ⚡ Installation

As a **global utility**:

```
$ npm install -g @adamlui/minify.js
```

As a **dev dependency** (e.g. for build scripts), from your project root:

```
$ npm install -D @adamlui/minify.js
```

As a **runtime dependency** (e.g. for on-the-fly minification), from your project root:

```
$ npm install @adamlui/minify.js
```

<br>

<a href="https://github.com/sponsors/adamlui"><img src="https://assets.minify-js.org/images/banners/sponsor/$10/banner1660x260.png?v=ad67551"></a>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

## 💻 Command line usage

The basic **global command** is:

```
$ minify-js
```

**📝 Note:** Pass `-n` or `--dry-run` to only see what files will be processed.

#

To specify **input/output** paths:
   
```
$ minify-js [input_path] [output_path]
```

- `[input_path]`: Path to JS file or directory containing JS files to be minified, relative to the current working directory.
- `[output_path]`: Path to file or directory where minified files will be stored, relative to original file location (if not provided, `min/` is used).

**📝 Note:** If folders are passed, files will be processed recursively unless `-R` or `--no-recursion` is passed.

#

To use as a **package script**, in your project's `package.json`:

```json
  "scripts": {
    "build:js": "<minify-js-cmd>"
  },
```

Replace `<minify-js-cmd>` with `minify-js` + optional args. Then, `npm run build:js` can be used to run the command.

#

### Example commands

Minify all JavaScript files in the **current directory** (outputs to `min/`):

```
$ minify-js
```

Minify all JavaScript files in a **specific directory** (outputs to `path/to/your/directory/min/`):

```
$ minify-js path/to/your/directory
```

Minify a **specific file** (outputs to `path/to/your/min/file.min.js`):

```
$ minify-js path/to/your/file.js
```

Specify both **input and output** directories (outputs to `output_folder/`):

```
$ minify-js input_folder output_folder
```

#

### Command line options

```
Boolean options:
 -n, --dry-run                        Don't actually minify the file(s), just show if they will be processed.
 -d, --include-dotfolders             Include dotfolders in file search.
 -D, --include-dotfiles               Include dotfiles in file search.
 -R, --no-recursion                   Disable recursive file searching.
 -M, --no-mangle                      Disable mangling names.
 -X, --no-filename-change             Disable changing file extension to .min.js
 -c, --copy                           Copy minified code to clipboard instead of writing to file if single source file is processed.
 -q, --quiet                          Suppress all logging except errors.

Parameter options:
 --ignore-files="file1.js,file2.js"   Files to exclude from minification.
 --comment="comment"                  Prepend header comment to minified code. Separate by line using '\n'.

Info commands:
 -h, --help                           Display help screen.
 -v, --version                        Show version number.
```

<br>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

## 🔌 API usage

You can also import **minify.js** into your app to use its API methods, both as an ECMAScript module or a CommonJS module.

#### ESM*:

```js
import * as minifyJS from '@adamlui/minify.js';
```

#### CJS:

```js
const minifyJS = require('@adamlui/minify.js');
```

###### _*Node.js version 14 or higher required_

#

### `minify(input[, options])`

💡 Minifies JavaScript code based on the string input supplied.

If **source code** is passed, it is directly minified, then an object containing `srcPath` + `code` + `error` is returned:

```js
const srcCode = 'function add(first, second) { return first + second; }',
      minifyResult = minifyJS.minify(srcCode);

console.log(minifyResult.error); // outputs runtime error, or `undefined` if no error
console.log(minifyResult.code);  // outputs minified JS: 'function add(n,d){return n+d}'
```

If a **file path** is passed, the file's code is loaded then minified, returning an object like above.

If a **directory path** is passed, JavaScript files are searched for (recursively by default), each one's code is loaded then minified, then an array of objects containing `srcPath` + `code` + `error` is returned:

```js
// Outputs paths to source JS files in working directory + all nested directories
const minifyResults = minifyJS.minify('.');
minifyResults.forEach(result => console.log(result.srcPath));

// Outputs minified code of 2nd JS file if found, or `undefined` if not found
console.log(minifyResults[1].code);
```

Options are boolean, passed as object properties. For example:

```js
// Returns data object where dotfiles are also processed if `input` is a path
minifyJS.minify(input, { dotFiles: true });
```

Available parameters (and their default settings) are:

Name          | Type    | Desciption                                                               | Default value
--------------|---------|--------------------------------------------------------------------------|---------------
`recursive`   | Boolean | Recursively search for nested files if dir path passed.                  | `true`
`verbose`     | Boolean | Show logging in console/terminal.                                        | `true`
`dotFolders`  | Boolean | Include dotfolders in file search.                                       | `false`
`dotFiles`    | Boolean | Include dotfiles in file search.                                         | `false`
`mangle`      | Boolean | Shorten variable names (typically to one character).                     | `true`
`ignoreFiles` | Array   | Files (by name) to exclude from minification.                            | `[]`
`comment`     | String  | Header comment to prepend to minified code. Separate by line using '\n'. | `''`

#

### `findJS(searchDir[, options])`

💡 Searches for all unminified JavaScript files within the `searchDir` string passed (useful for discovering what files [`minify()`](#minifyinput-options) will process) and returns an array containing their filepaths.

Options are boolean, passed as object properties. For example:

```js
// Search for unminified JS files in exactly assets/js:
const searchResults = minifyJS.findJS('assets/js', { recursive: false });
console.log(searchResults);

/* sample output:

findJS() » Searching for unminified JS files...
findJS() » Search complete! 2 files found.
findJS() » Check returned array.
[
  'E:\\js\\utils\\minify.js\\assets\\js\\foo.js',
  'E:\\js\\utils\\minify.js\\assets\\js\\bar.js'
]
*/
```

Available parameters (and their default settings) are:

Name          | Type    | Desciption                                               | Default value
--------------|---------|----------------------------------------------------------|---------------
`recursive`   | Boolean | Recursively search for nested files in searchDir passed. | `true`
`verbose`     | Boolean | Show logging in console/terminal.                        | `true`
`dotFolders`  | Boolean | Include dotfolders in file search.                       | `false`
`dotFiles`    | Boolean | Include dotfiles in file search.                         | `false`
`ignoreFiles` | Array   | Files (by name) to exclude from search results.          | `[]`

<br>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

## 🏛️ MIT License

**Copyright © 2023–2024 [Adam Lui](https://github.com/adamlui) & contributors.**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

<br>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

## 🛠️ Related utilities

### [🖼️ img-to-webp](https://img-to-webp.org)

> Recursively compress all images to WEBPs.
<br>[Download](https://cdn.jsdelivr.net/gh/adamlui/js-utils/img-to-webp/img-to-webp.js) /
[Discuss](https://github.com/adamlui/js-utils/discussions)

### [{ } scss-to-css](https://scsstocss.org) <a href="https://github.com/toolleeo/cli-apps#conversion"><img height=18 src="https://assets.minify-js.org/images/badges/awesome/badge.svg?v=ad67551"></a>

> Recursively compile all SCSS files into minified CSS.
<br>[Install](https://node.scsstocss.org/#-installation) /
[Readme](https://node.scsstocss.org/#readme) /
[CLI usage](https://node.scsstocss.org/#-command-line-usage) /
[API usage](https://node.scsstocss.org/#-api-usage) /
[Discuss](https://github.com/adamlui/scss-to-css/discussions)

<br>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://assets.minify-js.org/images/icons/home/white/icon32x27.png?v=ad67551"><img height=13 src="https://assets.minify-js.org/images/icons/home/dark-gray/icon32x27.png?v=ad67551"></picture> <a href="https://js-utils.org">**More JavaScript utilities**</a> /
<a href="https://github.com/adamlui/minify.js/discussions">Discuss</a> /
<a href="#-minifyjs">Back to top ↑</a>
