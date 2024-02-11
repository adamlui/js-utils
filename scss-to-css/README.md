# { } scss-to-css.js 

### Recursively compile all SCSS files into minified CSS.

<a href="#%EF%B8%8F-mit-license"><img height=31 src="https://img.shields.io/badge/License-MIT-fcde7b.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/scss-to-css"><img height=31 src="https://img.shields.io/badge/Latest_Build-1.0.1-fc7811.svg?logo=npm&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img height=10px width="100%" src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png">

## ⚡ Installation

- As a global utility:

   ```
   npm install -g @adamlui/scss-to-css
   ```

- As a dev dependency, from your project root:

   ```
   npm install -D @adamlui/scss-to-css
   ```

## 💻 Usage

### Globally:

Run the following command from a folder to recursively compile all SCSS:

```
scss-to-css
```

Sample output:

![](https://raw.githubusercontent.com/adamlui/js-utils/main/scss-to-css/media/images/sample-output.png)

### Dev dependency:

1. Add build script to project's `package.json`:

    ```json
      "scripts": {
        "build:css": "scss-to-css"
      },
    ```

2. Run script from a folder to recursively compile all SCSS:

    ```
    npm run build:css
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

<img height=6px width="100%" src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png">

<a href="https://github.com/adamlui/js-utils">**Home**</a> /
<a href="https://github.com/adamlui/js-utils/discussions">Discuss</a> /
<a href="#--scss-to-cssjs">Back to top ↑</a>
