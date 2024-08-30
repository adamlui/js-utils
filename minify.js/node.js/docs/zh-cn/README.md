<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://media.minify-js.org/images/icons/earth/white/icon32.svg?d07ee82">
            <img height=14 src="https://media.minify-js.org/images/icons/earth/black/icon32.svg?d07ee82">
        </picture>
        &nbsp;简体中文 |
        <a href="../..#readme">English</a> |
        <a href="../zh-tw#readme">繁體中文</a> |
        <a href="../hi#readme">हिंदी</a> |
        <a href="../bn#readme">বাংলা</a> |
        <a href="../mr#readme">मराठी</a> |
        <a href="../pa#readme">ਪੰਜਾਬੀ</a> |
        <a href="../de#readme">Deutsch</a> |
        <a href="../es#readme">Español</a> |
        <a href="../fr#readme">Français</a>
    </h6>
</div>

# </> minify.js

### 递归地缩小所有 JavaScript 文件。

<a href="https://www.npmjs.com/package/@adamlui/minify.js"><img height=31 src="https://img.shields.io/npm/dm/%40adamlui%2Fminify.js?label=%E4%B8%8B%E8%BD%BD&logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-%E8%AE%B8%E5%8F%AF%E8%AF%81"><img height=31 src="https://img.shields.io/badge/许可证-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/minify.js/releases/tag/node-v1.8.5"><img height=31 src="https://img.shields.io/badge/最新版本-1.8.5-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/minify.js?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fminify.js?label=%E6%8B%86%E5%B0%81%E5%B0%BA%E5%AF%B8&style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_minify.js:node.js/src/minify.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_minify.js%3Anode.js%2Fsrc%2Fminify.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#programming"><img height=31 src="https://img.shields.io/badge/中提到-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://minify-js.org"><img height=31 src="https://img.shields.io/badge/网络-minify--js.org-lightgrey?logo=dribbble&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img src="https://cdn.jsdelivr.net/gh/adamlui/minify.js@3d56890/node.js/media/images/screenshots/cli/minify-js-docs-cmd-output.png">

<br>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

## ⚡ 如何安装

作为**全局实用程序**：

```
$ npm install -g @adamlui/minify.js
```

作为**开发人员依赖**（例如，对于构建脚本），从项目根目录：

```
$ npm install -D @adamlui/minify.js
```

作为**运行时依赖**（例如，用于动态缩小），从项目根目录：

```
$ npm install @adamlui/minify.js
```

<br>

<a href="https://github.com/sponsors/adamlui"><img src="https://media.minify-js.org/images/banners/sponsor/$10/banner1660x260.png?f6118ce"></a>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

## 💻 命令行使用

基本的**全局命令**是：

```
$ minify-js
```

**📝 注意:** 通过 `-n` 或 `--dry-run` 来仅查看将处理哪些文件。

#

指定**输入/输出**路径：
   
```
$ minify-js [input_path] [output_path]
```

- `[input_path]`: 相对于当前工作目录的 JS 文件或包含要缩小的 JS 文件的目录的路径。
- `[output_path]`: 将存储缩小文件的文件或目录的路径，相对于原始文件位置（如果未提供，则使用 `min/`）。

**📝 注意:** 如果传递文件夹，文件将被递归处理，除非传递 `-R` 或 `--no-recursion`。

#

要用作 **包脚本**，请在项目的 `package.json` 中：

```json
  "scripts": {
    "build:js": "<minify-js-cmd>"
  },
```

将 `<minify-js-cmd>` 替换为 `minify-js` + 可选参数。 然后，可以使用 `npm run build:js` 来运行该命令。

#

### 命令示例

缩小**当前目录**中的所有 JavaScript 文件（输出到 `min/`）：

```
$ minify-js
```

缩小**特定目录**中的所有 JavaScript 文件（输出到 `path/to/your/directory/min/`）：

```
$ minify-js path/to/your/directory
```

缩小**特定文件**（输出到 `path/to/your/min/file.min.js`）：

```
$ minify-js path/to/your/file.js
```

指定**输入和输出**目录（输出到 `output_folder/`）：

```
$ minify-js input_folder output_folder
```

#

### 命令行选项

```
布尔选项：
 -n, --dry-run                        实际上并不缩小文件，只是显示它们是否会被处理。
 -d, --include-dotfolders             在文件搜索中包括点文件夹。
 -D, --include-dotfiles               在文件搜索中包含点文件。
 -R, --no-recursion                   禁用递归文件搜索。
 -M, --no-mangle                      禁用修改名称。
 -X, --no-filename-change             禁止将文件扩展名更改为 .min.js
 -c, --copy                           如果处理单个源文件，则将缩小的代码复制到剪贴板而不是写入文件。
 -q, --quiet                          禁止除错误之外的所有日志记录。

参数选项：
 --ignore-files="file1.js,file2.js"   要从缩小中排除的文件。
 --comment="comment"                  将标题注释添加到缩小的代码中。使用 '\n' 按行分隔。

信息命令：
 -h, --help                           显示帮助屏幕。
 -v, --version                        显示版本号。
```

<br>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

## 🔌 API 使用

您还可以将 **minify.js** 导入您的应用程序以使用其 API 方法，无论是作为 ECMAScript 模块还是 CommonJS 模块。

#### ESM*:

```js
import minifyJS from '@adamlui/minify.js';
```

#### CJS:

```js
const minifyJS = require('@adamlui/minify.js');
```

###### _*需要 Node.js 版本 14 或更高版本_

#

### `minify(input[, options])`

💡 根据提供的字符串输入缩小 JavaScript 代码。

如果传入**源代码**，则直接缩小，然后返回一个包含 `srcPath` + `code` + `error` 的对象：

```js
const srcCode = 'function add(first, second) { return first + second; }',
      minifyResult = minifyJS.minify(srcCode);

console.log(minifyResult.error); // 输出运行时错误，如果没有错误则输出 `undefined`
console.log(minifyResult.code);  // 输出缩小的 JS：'function add(n,d){return n+d}'
```

如果传递了**文件路径**，则加载文件的代码然后缩小，返回一个像上面一样的对象。

如果传递**目录路径**，则会搜索 JavaScript 文件（默认情况下递归），加载每个代码并缩小，然后返回包含 `srcPath` + `code` + `error` 的对象数组：

```js
// 输出工作目录+所有嵌套目录下 JS 文件的源路径
const minifyResults = minifyJS.minify('.');
minifyResults.forEach(result => console.log(result.srcPath));

// 如果找到，则输出第二个 JS 文件的精简代码，如果未找到，则输出 `undefined`
console.log(minifyResults[1].code);
```

选项是布尔值，作为对象属性传递。 例如：

```js
// 返回数据对象数组，如果 `input` 是路径，则也会处理点文件
minifyJS.minify(input, { dotFiles: true });
```

可用参数（及其默认设置）有：

姓名          | 类型   | 描述                                           | 默认值
--------------|-------|------------------------------------------------|--------
`recursive`   | 布尔值 | 如果传递目录路径，则递归搜索嵌套文件。            | `true`
`verbose`     | 布尔值 | 在控制台/终端中显示日志记录。                    | `true`
`dotFolders`  | 布尔值 | 在文件搜索中包括点文件夹。                       | `false`
`dotFiles`    | 布尔值 | 在文件搜索中包含点文件。                         | `false`
`mangle`      | 布尔值 | 缩短变量名称（通常为一个字符）。                  | `true`
`ignoreFiles` | 大批   | 要从缩小中排除的文件（按名称）。                  | `[]`
`comment`     | 细绳   | 添加到缩小代码之前的标头注释。使用 '\n' 按行分隔。 | `''`

#

### `findJS(searchDir[, options])`

💡 在传递的 `searchDir` 字符串中搜索所有未缩小的 JavaScript 文件（对于发现 [`minify()`](#minifyinput-options) 将处理哪些文件很有用）并返回包含其文件路径的数组。

选项是布尔值，作为对象属性传递。 例如：

```js
// 在 assets/js 中搜索未缩小的 JavaScript 文件
const searchResults = minifyJS.findJS('assets/js', { recursive: false });
console.log(searchResults);

/* 示例输出：

findJS() » Searching for unminified JS files...
findJS() » Search complete! 2 files found.
findJS() » Check returned array.
[
  'E:\\js\\utils\\minify.js\\assets\\js\\foo.js',
  'E:\\js\\utils\\minify.js\\assets\\js\\bar.js'
]
*/
```

可用参数（及其默认设置）有：

姓名          | 类型   | 描述                                  | 默认值
--------------|-------|---------------------------------------|--------
`recursive`   | 布尔值 | 递归搜索传递的 searchDir 中的嵌套文件。 | `true`
`verbose`     | 布尔值 | 在控制台/终端中显示日志记录。           | `true`
`dotFolders`  | 布尔值 | 在文件搜索中包括点文件夹。              | `false`
`dotFiles`    | 布尔值 | 在文件搜索中包含点文件。                | `false`
`ignoreFiles` | 大批   | 要从搜索结果中排除的文件（按名称）。     | `[]`

<br>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

## 🏛️ MIT 许可证

**版权所有 © 2023–2024 [刘展鹏 (Adam Lui)](https://github.com/adamlui) 和贡献者**

特此免费向任何获得副本的人授予许可本软件和相关文档文件（『软件』），处理在软件中不受限制，包括但不限于权利使用、复制、修改、合并、发布、分发、再许可和/或出售该软件的副本，并允许该软件是提供这样做，但须满足以下条件：

上述版权声明和本许可声明应包含在所有软件的副本或重要部分。

本软件『按原样』提供，不提供任何形式的明示或保证暗示的，包括但不限于适销性保证，适用于特定目的和非侵权。 在任何情况下都不得作者或版权持有人对任何索赔、损害或其他责任，无论是在合同、侵权或其他方面的行为中，由以下原因引起，出于或与软件或使用或其他交易有关软件。

<br>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

## 🛠️ 相关实用程序

### [</> minify.js (Gulp)](https://gulp.minify-js.org) &nbsp;<a href="https://github.com/toolleeo/cli-apps#programming"><img height=18 src="https://media.minify-js.org/images/badges/awesome/badge.svg?b78dcd3"></a>

> Gulp 插件可递归地缩小所有 JavaScript 文件。
<br>[安装](https://gulp.minify-js.org/#-installation) /
[自述文件](https://gulp.minify-js.org/#readme) /
[讨论](https://github.minify-js.org/discussions)

### [{ } scss-to-css](https://github.com/adamlui/scss-to-css) &nbsp;<a href="https://github.com/toolleeo/cli-apps#conversion"><img height=18 src="https://media.minify-js.org/images/badges/awesome/badge.svg?b78dcd3"></a>

> 将所有 SCSS 文件递归编译为缩小的 CSS。
<br>[安装](https://node.scsstocss.org/#-installation) /
[自述文件](https://node.scsstocss.org/#readme) /
[CLI 用法](https://node.scsstocss.org/#-command-line-usage) /
[API 用法](https://node.scsstocss.org/#-api-usage) /
[讨论](https://github.scsstocss.org/discussions)

<br>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://media.minify-js.org/images/icons/home/white/icon32x27.png?d07ee82"><img height=13 src="https://media.minify-js.org/images/icons/home/dark-gray/icon32x27.png?d07ee82"></picture> <a href="https://js-utils.com">**更多 JavaScript 实用程序**</a> /
<a href="https://github.minify-js.org/discussions">讨论</a> /
<a href="#-minifyjs">回到顶部 ↑</a>
