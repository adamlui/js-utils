# </> minify.js <picture><source media="(prefers-color-scheme: dark)" srcset="https://media.minify-js.org/images/icons/platforms/gulp/white/icon50x30.svg?010e809"><img height=25 src="https://media.minify-js.org/images/icons/platforms/gulp/red/icon50x30.svg?010e809"></picture>

### Recursively minify all JavaScript files.

<a href="#%EF%B8%8F-mit-license"><img height=31 src="https://img.shields.io/badge/License-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/minify.js/releases/tag/gulp-v1.0.11"><img height=31 src="https://img.shields.io/badge/Latest_Build-1.0.11-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/gulp-minify.js?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/gulp-minify.js?style=for-the-badge&logo=ebox&logoColor=white&color=blue&labelColor=464646"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_minify.js:gulp/src/gulp-minify.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_minify.js%3Agulp%2Fsrc%2Fgulp-minify.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#programming"><img height=31 src="https://img.shields.io/badge/Mentioned_in-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://minify-js.org"><img height=31 src="https://img.shields.io/badge/web-minify--js.org-lightgrey?logo=dribbble&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<br>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

## 💡 About

**minify.js** is a Gulp plug-in to recursively minify JavaScript files.

For a quick start on using Gulp: https://gulpjs.com/docs/en/getting-started/quick-start/

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

## ⚡ Installation

As a **dev dependency**, from your project root:

```
$ npm install -D gulp-minify.js
```

As a **runtime dependency**, from your project root:

```
$ npm install gulp-minify.js
```

<br>

<a href="https://github.com/sponsors/adamlui"><img src="https://media.minify-js.org/images/banners/sponsor/$10/banner1660x260.png?f6118ce"></a>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

## 💻 Usage

Use `minify()` w/ **input/output args** in your `gulpfile.js`:

```js
const gulp = require('gulp'),
      minify = require('gulp-minify.js');

gulp.task('minify', cb => {
    minify('src', 'dist');
    cb();
});
```

#

Use `minify()` w/ **no args**, as part of a stream's transformations in your `gulpfile.js`:
```js
const gulp = require('gulp'),
      minify = require('gulp-minify.js'),
      rename = require('gulp-rename');

gulp.task('minify', () => {    
    return gulp.src('src/**/*.js')
        .pipe(minify()) // use minify() arglessly as a stream transformation
        .pipe(rename({ suffix: '.min' })) // change suffix of minified file
        .pipe(gulp.dest('dist')); // save minified files to the 'dist' directory
});
```

#

**Options** are passed as object properties. For example:

```js
// Minifies all unminified JS directly in 'src' including dotfiles to 'dist'
minify('src', 'dist', { dotFiles: true, recursive: false })
```

Available options are:

Name         | Type    | Desciption                                              | Default value
-------------|---------|---------------------------------------------------------|---------------
`recursive`  | Boolean | Recursively search for nested files if dir path passed. | `true`
`verbose`    | Boolean | Show logging in console/terminal.                       | `true`
`dotFolders` | Boolean | Include dotfolders in file search.                      | `false`
`dotFiles`   | Boolean | Include dotfiles in file search.                        | `false`
`mangle`     | Boolean | Shorten variable names (typically to one character).    | `true`
`comment`    | String  | Header comment to prepend to minified code.             | `''`

<br>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

## 🏛️ MIT License

**Copyright © 2024 [Adam Lui](https://github.com/adamlui).**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

<br>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

## 🛠️ Related utilities

### [</> minify.js (Node.js)](https://node.minify-js.org/#readme) &nbsp;<a href="https://github.com/toolleeo/cli-apps#programming"><img height=18 src="https://media.minify-js.org/images/badges/awesome/badge.svg?b78dcd3"></a>

> Recursively minify all JavaScript files.
<br>[Install](https://node.minify-js.org/#-installation) /
[Readme](https://node.minify-js.org/#readme) /
[CLI usage](https://node.minify-js.org/#-command-line-usage) /
[API usage](https://node.minify-js.org/#-api-usage) /
[Discuss](https://github.minify-js.org/discussions)

### [{ } scss-to-css](https://github.com/adamlui/scss-to-css) &nbsp;<a href="https://github.com/toolleeo/cli-apps#conversion"><img height=18 src="https://media.minify-js.org/images/badges/awesome/badge.svg?b78dcd3"></a>

> Recursively compile all SCSS files into minified CSS.
<br>[Install](https://node.scsstocss.org/#-installation) /
[Readme](https://node.scsstocss.org/#readme) /
[CLI usage](https://node.scsstocss.org/#-command-line-usage) /
[API usage](https://node.scsstocss.org/#-api-usage) /
[Discuss](https://github.scsstocss.org/discussions)

<br>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://media.minify-js.org/images/icons/home/white/icon32x27.png?d07ee82"><img height=13 src="https://media.minify-js.org/images/icons/home/dark-gray/icon32x27.png?d07ee82"></picture> <a href="https://js-utils.com">**More JavaScript utilities**</a> /
<a href="https://github.minify-js.org/discussions">Discuss</a> /
<a href="#-minifyjs">Back to top ↑</a>
