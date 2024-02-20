# { } scss-to-css.js 

### Recursively compile all SCSS files into minified CSS.

<a href="#%EF%B8%8F-mit-license"><img height=31 src="https://img.shields.io/badge/License-MIT-fcde7b.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/scss-to-css"><img height=31 src="https://img.shields.io/badge/Latest_Build-1.2.0-fc7811.svg?logo=npm&logoColor=white&labelColor=464646&style=for-the-badge"></a>

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

**💡 Note:** Source maps are also generated.

#

To specify **input/output** paths:
   
```
scss-to-css <input_path> <output_path>
```

- `<input_path>`: Path to SCSS file or directory containing SCSS files to be compiled, relative to the current working directory. 
- `<output_path>`: Path to file or directory where CSS + sourcemap files will be stored, relative to original file location. (If not provided, `css/` is used.)

**💡 Note:** If folders are passed, files will be processed recursively. To include dot folders, pass `--include-dot-folders`.

#

To use as a **package script**, edit your project's `package.json` like this:

```json
  "scripts": {
    "build:css": "<scss-to-css-cmd>"
  },
```

Replace `<scss-to-css-cmd>` with `scss-to-css` + optional args. Then, `npm run build:css` can be used to run the command.
<br><br>

## 📃 Example commands:

- Compile all SCSS files in the **current directory** (outputs to `css/`):

   ```
   scss-to-css
   ```

- Compile all SCSS files in a **specific directory** (outputs to `path/to/your/directory/css/`):

   ```
   scss-to-css path/to/your/directory
   ```

- Compile a **specific file** (outputs to `path/to/your/css/file.min.css`):

   ```
   scss-to-css path/to/your/file.scss
   ```

- Specify both **input and output** directories (outputs to `output_folder/`):

   ```
   scss-to-css input_folder output_folder
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

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/media/images/separators/aqua.png">

<a href="https://github.com/adamlui/js-utils">**Home**</a> /
<a href="https://github.com/adamlui/js-utils/discussions">Discuss</a> /
<a href="#--scss-to-cssjs">Back to top ↑</a>
