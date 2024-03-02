# <> minify.js 

### Recursively minify all JavaScript files.

<a href="https://www.npmjs.com/package/@adamlui/minify.js"><img height=31 src="https://img.shields.io/npm/dt/%40adamlui%2Fminify.js?logo=npm&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-license"><img height=31 src="https://img.shields.io/badge/License-MIT-fcde7b.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/minify.js?activeTab=versions"><img height=31 src="https://img.shields.io/badge/Latest_Build-1.1.2-fc7811.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img src="https://github.com/adamlui/js-utils/blob/main/minify.js/media/images/minify-js-docs-demo.png">

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

## 💻 Usage

The basic **global command** is:

```
minify-js
```

#

To specify **input/output** paths:
   
```
minify-js <input_path> <output_path>
```

- `<input_path>`: Path to JS file or directory containing JS files to be minified, relative to the current working directory. 
- `<output_path>`: Path to file or directory where minified files will be stored, relative to original file location (if not provided, `min/` is used).

**💡 Note:** If folders are passed, files will be processed recursively. To include dotfolders, pass `--include-dotfolders`. To include dotfiles, pass `--include-dotfiles`.

#

To use as a **package script**, edit your project's `package.json` like this:

```json
  "scripts": {
    "build:js": "<minify-js-cmd>"
  },
```

Replace `<minify-js-cmd>` with `minify-js` + optional args. Then, `npm run build:js` can be used to run the command.
<br><br>

## 📃 Example commands:

- Minify all JavaScript files in the **current directory** (outputs to `min/`):

   ```
   minify-js
   ```

- Minify all JavaScript files in a **specific directory** (outputs to `path/to/your/directory/min/`):

   ```
   minify-js path/to/your/directory
   ```

- Minify a **specific file** (outputs to `path/to/your/min/file.min.js`):

   ```
   minify-js path/to/your/file.js
   ```

- Specify both **input and output** directories (outputs to `output_folder/`):

   ```
   minify-js input_folder output_folder
   ```

## 🏛️ MIT License

**Copyright (c) 2024 [Adam Lui](https://github.com/adamlui)**

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
