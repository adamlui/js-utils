# { } scss-to-css.js 

### Recursively compile all SCSS files into minified CSS.

<a href="#%EF%B8%8F-mit-license"><img height=31 src="https://img.shields.io/badge/License-MIT-fcde7b.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/scss-to-css"><img height=31 src="https://img.shields.io/badge/Latest_Build-1.0.1-fc7811.svg?logo=npm&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img height=8px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/media/images/separators/aqua.png">

## ⚡ Installation

As a **global utility**:

```
npm install -g @adamlui/scss-to-css
```

As a **dev dependency**, from your project root:

```
npm install -D @adamlui/scss-to-css
```

## 💻 Usage

The basic **global command** is:

```
scss-to-css
```

Sample output:

<img src="https://github.com/adamlui/js-utils/blob/main/scss-to-css/media/images/sample-output.png">

To specify **input/output** directories:
   
```
scss-to-css <input_path> <output_path>
```

- `<input_path>`: Path to directory containing SCSS files to be compiled, relative to the current working directory. 
- `<output_path>`: Path to directory where CSS/sourcemap files will be stored, relative to original file location. (If not provided, same location is used.)

**💡 Note:** The paths can be either folders or specific files. If folders are passed, files will be processed recursively.<br><br>

To use as a **package script**, edit your project's `package.json` like this:

```json
  "scripts": {
    "build:css": "<scss-to-css-cmd>"
  },
```

Replace `<scss-to-css-cmd>` with `scss-to-css` + optional args. Then, `npm run build:css` can be used to run the command.
<br><br>

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

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/media/images/separators/aqua.png">

<a href="https://github.com/adamlui/js-utils">**Home**</a> /
<a href="https://github.com/adamlui/js-utils/discussions">Discuss</a> /
<a href="#--scss-to-cssjs">Back to top ↑</a>
