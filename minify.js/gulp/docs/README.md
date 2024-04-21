# </> minify.js <picture><source media="(prefers-color-scheme: dark)" srcset="https://media.minify-js.org/images/icons/gulp/white/icon50x30.svg"><img height=25 src="https://media.minify-js.org/images/icons/gulp/red/icon50x30.svg"></picture>

### Recursively minify all JavaScript files.

<a href="#%EF%B8%8F-mit-license"><img height=31 src="https://img.shields.io/badge/License-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/minify.js/releases/tag/gulp-v1.0.4"><img height=31 src="https://img.shields.io/badge/Latest_Build-1.0.4-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/gulp-minify.js?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/gulp-minify.js?style=for-the-badge&logo=ebox&logoColor=white&color=blue&labelColor=464646"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_minify.js:gulp/src/gulp-minify.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_minify.js%3Agulp%2Fsrc%2Fgulp-minify.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#programming"><img height=31 src="https://img.shields.io/badge/Mentioned_in-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://minify-js.org"><img height=31 src="https://img.shields.io/badge/web-minify--js.org-lightgrey?logo=dribbble&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 💡 About

**minify.js** is a Gulp plug-in to recursively minify JavaScript files.

For a quick start on using Gulp: https://gulpjs.com/docs/en/getting-started/quick-start/

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

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

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

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
`comment`    | String  | Comment to prepend to minified code.                    | `''`

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🏛️ MIT License

**Copyright © 2024 [Adam Lui](https://github.com/adamlui)**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🛠️ Related utilities

### [</> minify.js (Node.js)](https://node.minify-js.org/#readme) <a href="https://github.com/toolleeo/cli-apps#programming"><img height=18 src="https://awesome.re/mentioned-badge.svg"></a>

> Recursively minify all JavaScript files.
<br>[Install](https://node.minify-js.org/#-installation) /
[Readme](https://node.minify-js.org/#readme) /
[CLI usage](https://node.minify-js.org/#-command-line-usage) /
[API usage](https://node.minify-js.org/#-api-usage) /
[Discuss](https://github.minify-js.org/discussions)

### [{ } scss-to-css](https://github.com/adamlui/scss-to-css) <a href="https://github.com/toolleeo/cli-apps#conversion"><img height=18 src="https://awesome.re/mentioned-badge.svg"></a>

> Recursively compile all SCSS files into minified CSS.
<br>[Install](https://github.com/adamlui/scss-to-css/#-installation) /
[Readme](https://github.com/adamlui/scss-to-css/#readme) /
[CLI usage](https://github.com/adamlui/scss-to-css/#-command-line-usage) /
[API usage](https://github.com/adamlui/scss-to-css/#-api-usage) /
[Discuss](https://github.com/adamlui/scss-to-css/discussions)

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/media/images/icons/home/white/icon32x27.png"><img height=13 src="https://raw.githubusercontent.com/adamlui/js-utils/main/media/images/icons/home/dark-gray/icon32x27.png"></picture> <a href="https://js-utils.com">**More JavaScript utilities**</a> /
<a href="https://github.minify-js.org/discussions">Discuss</a> /
<a href="#-minifyjs">Back to top ↑</a>
