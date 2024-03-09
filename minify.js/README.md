<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/white/icon32.svg">
            <img height=14 src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/black/icon32.svg">
        </picture>
        &nbsp;English |
        <a href="https://github.com/adamlui/js-utils/tree/main/minify.js/docs/zh-cn#readme">简体中文</a> |
        <a href="https://github.com/adamlui/js-utils/tree/main/minify.js/docs/zh-tw#readme">繁體中文</a>
    </h6>
</div>

# </> minify.js 

### Recursively minify all JavaScript files.

<a href="https://www.npmjs.com/package/@adamlui/minify.js"><img height=31 src="https://img.shields.io/npm/dt/%40adamlui%2Fminify.js?logo=npm&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-license"><img height=31 src="https://img.shields.io/badge/License-MIT-red.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/minify.js?activeTab=versions"><img height=31 src="https://img.shields.io/badge/Latest_Build-1.2.4-fc7811.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
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

As a **dev dependency**, from your project root:

```
npm install -D @adamlui/minify.js
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

**💡 Note:** If folders are passed, files will be processed recursively.

#

To use as a **package script**, in your project's `package.json`:

```json
  "scripts": {
    "build:js": "<minify-js-cmd>"
  },
```

Replace `<minify-js-cmd>` with `minify-js` + optional args. Then, `npm run build:js` can be used to run the command.
<br><br>

### Command line options

```
Config options:
 -n, --dry-run               Don't actually minify the file(s), just show
                             if they will be processed.
 -d, --include-dotfolders    Include dotfolders in file search.
 -D, --include-dotfiles      Include dotfiles in file search.
 -q, --quiet                 Suppress all logging except errors.

Info commands:
 -h, --help                  Display help screen.
 -v, --version               Show version number.
```

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

## 🔌 API Reference

You can load **minify.js** in your app like this:

```js
const minifyJS = require('@adamlui/minify.js');
```

There is a single high level function, `minify(input, options)`, which will perform all minification/recursion phases in a configurable manner that adapts to the string input.

### minify(options)

Options are boolean (set to `true` by default) passed as object properties e.g. `minifyJS.minify(input, { option: true })`:

```
 recursive                   Recursively search for nested files if dir path passed.
 verbose                     Show logging in console/terminal.
```

### minify(input)

Input is a string that represents either source code or a path.

If **source code** is passed, it is directly minified, then an object containing `srcPath` + `code` + `error` is returned:

```js
const srcCode = 'function add(first, second) { return first + second; }',
      result = minifyJS.minify(srcCode);
console.log(result.error); // runtime error, or `undefined` if no error
console.log(result.code);  // minified output: function add(n,d){return n+d}
```

If a **file path** is passed, the file's code is loaded then minified, returning an object like above.

If a **directory path** is passed, JavaScript files are searched for (recursively by default), each is minified, then an array of objects containing `srcPath` + `code` + `error` is returned:

```js
const recursiveResults = minifyJS.minify('.');
recursiveResults.forEach(result =>
    console.log(result.srcPath) // JS files in all sub-directories
);

const nonRecursiveResults = minifyJS.minify('.', { recursive: false });
nonRecursiveResults.forEach(result =>
    console.log(result.srcPath) // JS files in working directory only
);
```

<br>

## 💖 Support

Please consider [giving a GitHub ⭐](https://github.com/adamlui/js-utils) if this helped you!
<br><br>

## 🏛️ MIT License

**Copyright (c) 2023–2024 [Adam Lui](https://github.com/adamlui)**

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

<a href="https://github.com/adamlui/js-utils">**Home**</a> /
<a href="https://github.com/adamlui/js-utils/discussions">Discuss</a> /
<a href="#-minifyjs">Back to top ↑</a>
