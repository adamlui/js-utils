<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://assets.minify-js.org/images/icons/earth/white/icon32.svg?v=ad67551">
            <img height=14 src="https://assets.minify-js.org/images/icons/earth/black/icon32.svg?v=ad67551">
        </picture>
        &nbsp;বাংলা |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn#readme">简体中文</a> |
        <a href="../zh-tw#readme">繁體中文</a> |
        <a href="../hi#readme">हिंदी</a> |
        <a href="../mr#readme">मराठी</a> |
        <a href="../pa#readme">ਪੰਜਾਬੀ</a> |
        <a href="../de#readme">Deutsch</a> |
        <a href="../es#readme">Español</a> |
        <a href="../fr#readme">Français</a>
    </h6>
</div>

# </> minify.js

### সব জাভাস্ক্রিপ্ট ফাইল পুনরাবৃত্তিমূলকভাবে ছোট করুন।

<a href="https://www.npmjs.com/package/@adamlui/minify.js">
    <img height=31 src="https://img.shields.io/npm/dm/%40adamlui%2Fminify.js?logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%B8%E0%A7%87%E0%A6%A8%E0%A7%8D%E0%A6%B8">
    <img height=31 src="https://img.shields.io/badge/License-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/minify.js/releases/tag/node-v1.8.5">
    <img height=31 src="https://img.shields.io/badge/Latest_Build-1.8.5-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/minify.js?activeTab=code">
    <img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fminify.js?style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_minify.js:node.js/src/minify.js">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_minify.js%3Anode.js%2Fsrc%2Fminify.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#programming">
    <img height=31 src="https://img.shields.io/badge/Mentioned_in-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://minify-js.org">
    <img height=31 src="https://img.shields.io/badge/web-minify--js.org-lightgrey?logo=dribbble&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img src="https://cdn.jsdelivr.net/gh/adamlui/minify.js@3d56890/node.js/media/images/screenshots/cli/minify-js-docs-cmd-output.png">

<br>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

## ⚡ স্থাপন

একটি **গ্লোবাল ইউটিলিটি** হিসেবে:

```
$ npm install -g @adamlui/minify.js
```

**বিকাশকারী নির্ভরতা** হিসেবে (যেমন বিল্ড স্ক্রিপ্টের জন্য), আপনার প্রোজেক্ট রুট থেকে:

```
$ npm install -D @adamlui/minify.js
```

**রানটাইম নির্ভরতা** হিসেবে (যেমন, অন-দ্য-ফ্লাই মিনিফিকেশনের জন্য), আপনার প্রোজেক্ট রুট থেকে:

```
$ npm install @adamlui/minify.js
```

<br>

<a href="https://github.com/sponsors/adamlui"><img src="https://assets.minify-js.org/images/banners/sponsor/$10/banner1660x260.png?v=f6118ce"></a>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

## 💻 কমান্ড লাইন ব্যবহার

মৌলিক **গ্লোবাল কমান্ড** হল:

```
$ minify-js
```

**📝 দ্রষ্টব্য:** শুধুমাত্র কোন ফাইলগুলি প্রক্রিয়া করা হবে তা দেখতে `-n` বা `--dry-run` পাস করুন।

#

**ইনপুট/আউটপুট** পাথ নির্দিষ্ট করতে:

```
$ minify-js [input_path] [output_path]
```

- `[input_path]`: বর্তমান কার্যকারী ডিরেক্টরির সাথে সম্পর্কিত JS ফাইল বা JS ফাইলগুলিকে সংক্ষিপ্ত করার জন্য ডিরেক্টরির পথ।
- `[output_path]`: ফাইল বা ডিরেক্টরির পাথ যেখানে ছোট ফাইলগুলি সংরক্ষণ করা হবে, মূল ফাইলের অবস্থানের সাথে সম্পর্কিত (যদি প্রদান না করা হয়, `min/` ব্যবহার করা হয়)।

**📝 দ্রষ্টব্য:** ফোল্ডারগুলি পাস করা হলে, ফাইলগুলি পুনরাবৃত্তিমূলকভাবে প্রক্রিয়া করা হবে যদি না `-R` বা `--no-recursion` পাস না হয়।

#

আপনার প্রোজেক্টের `package.json`-এ **প্যাকেজ স্ক্রিপ্ট** হিসেবে ব্যবহার করতে:

```json
  "scripts": {
    "build:js": "<minify-js-cmd>"
  },
```

`<minify-js-cmd>` কে `minify-js` + ঐচ্ছিক প্যারামিটার দিয়ে প্রতিস্থাপন করুন। তারপর, `npm run build:js` কমান্ডটি চালানোর জন্য ব্যবহার করা যেতে পারে।

#

### উদাহরণ কমান্ড

**বর্তমান ডিরেক্টরি**-এ সমস্ত জাভাস্ক্রিপ্ট ফাইল ছোট করুন (`min/`-এ আউটপুট):

```
$ minify-js
```

একটি **নির্দিষ্ট ডিরেক্টরি**-এ সমস্ত জাভাস্ক্রিপ্ট ফাইল ছোট করুন (`path/to/your/directory/min/`-তে আউটপুট):

```
$ minify-js path/to/your/directory
```

একটি **নির্দিষ্ট ফাইল** ছোট করুন (`path/to/your/min/file.min.js`-এ আউটপুট):

```
$ minify-js path/to/your/file.js
```

উভয় **ইনপুট এবং আউটপুট** ডিরেক্টরি নির্দিষ্ট করুন (`output_folder/`-এ আউটপুট):

```
$ minify-js input_folder output_folder
```

#

### কমান্ড লাইন বিকল্প

#### কনফিগার অপশন:

```
বুলিয়ান বিকল্প:
 -n, --dry-run                        আসলে ফাইল(গুলি) ছোট করবেন না, সেগুলি প্রক্রিয়া করা হবে কিনা তা দেখান৷
 -d, --include-dotfolders             ফাইল অনুসন্ধানে ডটফোল্ডার অন্তর্ভুক্ত করুন।
 -D, --include-dotfiles               ফাইল অনুসন্ধানে ডটফাইলগুলি অন্তর্ভুক্ত করুন।
 -R, --no-recursion                   পুনরাবৃত্ত ফাইল অনুসন্ধান অক্ষম করুন।
 -M, --no-mangle                      ম্যাঙ্গলিং নাম অক্ষম করুন।
 -X, --no-filename-change             .min.js ফাইল এক্সটেনশন পরিবর্তন অক্ষম করুন।
 -c, --copy                           যদি একক উৎস ফাইল প্রক্রিয়া করা হয় তবে ফাইলে লেখার পরিবর্তে ক্লিপবোর্ডে মিনিফাইড কোড কপি করুন।
 -q, --quiet                          ত্রুটি ছাড়া সব লগিং দমন করুন।

পরামিতি বিকল্প:
 --ignore-files="file1.js,file2.js"   মিনিফিকেশন থেকে বাদ দেওয়ার জন্য ফাইল।
 --comment="comment"                  মিনিফাইড কোডে শিরোনাম মন্তব্য অগ্রিম করুন। '\n' ব্যবহার করে লাইন দ্বারা আলাদা করুন।

তথ্য কমান্ড:
 -h, --help                           সাহায্য স্ক্রীন প্রদর্শন করুন।
 -v, --version                        সংস্করণ নম্বর দেখান।
```

<br>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

## 🔌 API ব্যবহার

আপনি একটি ECMAScript মডিউল বা CommonJS মডিউল উভয় হিসাবে, এর API পদ্ধতিগুলি ব্যবহার করতে আপনার অ্যাপে **minify.js** আমদানি করতে পারেন৷

#### ESM*:

```js
import minifyJS from '@adamlui/minify.js';
```

#### CJS:

```js
const minifyJS = require('@adamlui/minify.js');
```

###### _*Node.js সংস্করণ 14 বা উচ্চতর প্রয়োজন_

#

### `minify(input[, options])`

💡 সরবরাহকৃত স্ট্রিং ইনপুটের উপর ভিত্তি করে জাভাস্ক্রিপ্ট কোড ছোট করে।

যদি **সোর্স কোড** পাস করা হয়, এটি সরাসরি ছোট করা হয়, তারপর `srcPath` + `code` + `error` সমন্বিত একটি বস্তু ফিরে আসে:

```js
const srcCode = 'function add(first, second) { return first + second; }',
      minifyResult = minifyJS.minify(srcCode);

console.log(minifyResult.error); // আউটপুট রানটাইম ত্রুটি, বা `undefined` যদি কোনো ত্রুটি না থাকে
console.log(minifyResult.code);  // আউটপুট ছোট JS: 'function add(n,d){return n+d}'
```

যদি একটি **ফাইল পাথ** পাস করা হয়, তাহলে ফাইলের কোড লোড হয় তারপর ছোট করা হয়, উপরের মত একটি বস্তু ফেরত দেয়।

যদি একটি **ডিরেক্টরি পাথ** পাস করা হয়, জাভাস্ক্রিপ্ট ফাইলগুলি অনুসন্ধান করা হয় (পুনরাবৃত্তভাবে ডিফল্টভাবে), প্রতিটির কোড লোড করা হয় তারপর ছোট করা হয়, তারপর `srcPath` + `code` + `error` ধারণকারী বস্তুর একটি অ্যারে ফেরত দেওয়া হয়:

```js
// ওয়ার্কিং ডিরেক্টরি + সমস্ত নেস্টেড ডিরেক্টরিতে জাভাস্ক্রিপ্ট ফাইলগুলির উত্সের পাথগুলি আউটপুট করে
const minifyResults = minifyJS.minify('.');
minifyResults.forEach(result => console.log(result.srcPath));

// পাওয়া গেলে 2য় JS ফাইলের মিনিফাইড কোড আউটপুট করে, অথবা না পাওয়া গেলে `undefined`
console.log(minifyResults[1].code);
```

বিকল্পগুলি হল বুলিয়ান, অবজেক্টের বৈশিষ্ট্য হিসাবে পাস করা হয়েছে৷ উদাহরণ স্বরূপ:

```js
// ডেটা অবজেক্টের অ্যারে প্রদান করে যেখানে ডটফাইলগুলিও প্রক্রিয়া করা হয় যদি `input` একটি পাথ হয়
minifyJS.minify(input, { dotFiles: true });
```

উপলব্ধ প্যারামিটার (এবং তাদের ডিফল্ট সেটিংস) হল:

নাম           | টাইপ   | বর্ণনা                                                                          | ডিফল্ট মান
--------------|--------|-------------------------------------------------------------------------------|------------
`recursive`   | বুলিয়ান | ডিরেক্টরি পাথ পাস হলে নেস্টেড ফাইলগুলির জন্য পুনরাবৃত্তিমূলকভাবে অনুসন্ধান করুন।      | `true`
`verbose`     | বুলিয়ান | কনসোল/টার্মিনালে লগইন দেখান।                                                   | `true`
`dotFolders`  | বুলিয়ান | ফাইল অনুসন্ধানে ডটফোল্ডার অন্তর্ভুক্ত করুন।                                         | `false`
`dotFiles`    | বুলিয়ান | ফাইল অনুসন্ধানে ডটফাইলগুলি অন্তর্ভুক্ত করুন।                                       | `false`
`mangle`      | বুলিয়ান | পরিবর্তনশীল নাম সংক্ষিপ্ত করুন (সাধারণত একটি অক্ষর পর্যন্ত)।                         | `true`
`ignoreFiles` | অ্যারে  | ফাইল (নাম দ্বারা) মিনিফিকেশন থেকে বাদ দিতে।                                     | `[]`
`comment`     | স্ট্রিং   | মিনিফাইড কোডে প্রিপেন্ড করতে হেডার মন্তব্য। '\n' ব্যবহার করে লাইন দ্বারা আলাদা করুন। | `''`

#

### `findJS(searchDir[, options])`

💡 পাস করা `searchDir` স্ট্রিং-এর মধ্যে ছোট করা হয়নি এমন সমস্ত JavaScript ফাইলের জন্য অনুসন্ধান করে (কি ফাইলগুলি [`minify()`](#minifyinput-options) প্রক্রিয়া করবে তা আবিষ্কার করার জন্য দরকারী) এবং তাদের ফাইলপথ সমন্বিত একটি অ্যারে প্রদান করে।

বিকল্পগুলি হল বুলিয়ান, অবজেক্টের বৈশিষ্ট্য হিসাবে পাস করা হয়েছে৷ উদাহরণ স্বরূপ:

```js
// অবিন্যস্ত জাভাস্ক্রিপ্ট ফাইলের জন্য ঠিক assets/js-এ অনুসন্ধান করুন
const searchResults = minifyJS.findJS('assets/js', { recursive: false });
console.log(searchResults);

/* নমুনা আউটপুট:

findJS() » Searching for unminified JS files...
findJS() » Search complete! 2 files found.
findJS() » Check returned array.
[
  'E:\\js\\utils\\minify.js\\assets\\js\\foo.js',
  'E:\\js\\utils\\minify.js\\assets\\js\\bar.js'
]
*/
```

উপলব্ধ প্যারামিটার (এবং তাদের ডিফল্ট সেটিংস) হল:

নাম           | টাইপ   | বর্ণনা                                                         | ডিফল্ট মান
--------------|--------|--------------------------------------------------------------|------------
`recursive`   | বুলিয়ান | searchDir পাস করা নেস্টেড ফাইলগুলির জন্য বারবার অনুসন্ধান করুন। | `true`
`verbose`     | বুলিয়ান | কনসোল/টার্মিনালে লগইন দেখান।                                  | `true`
`dotFolders`  | বুলিয়ান | ফাইল অনুসন্ধানে ডটফোল্ডার অন্তর্ভুক্ত করুন।                        | `false`
`dotFiles`    | বুলিয়ান | ফাইল অনুসন্ধানে ডটফাইলগুলি অন্তর্ভুক্ত করুন।                      | `false`
`ignoreFiles` | অ্যারে  | ফাইল (নাম দ্বারা) অনুসন্ধান ফলাফল থেকে বাদ দিতে।                | `[]`

<br>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

## 🏛️ MIT লাইসেন্স

**কপিরাইট © 2023–2025 [Adam Lui](https://github.com/adamlui)**

এই সফ্টওয়্যারটির একটি অনুলিপি এবং সংশ্লিষ্ট ডকুমেন্টেশন ফাইল ("সফ্টওয়্যার") প্রাপ্ত যেকোন ব্যক্তিকে এতদ্বারা অনুমতি দেওয়া হচ্ছে, বিনা মূল্যে সফ্টওয়্যার ব্যবহার, অনুলিপি, পরিবর্তন, একত্রীকরণের অধিকার সহ সীমাবদ্ধতা ছাড়াই সফ্টওয়্যারে ডিল করার জন্য। , প্রকাশ, বিতরণ, সাবলাইসেন্স, এবং/অথবা সফ্টওয়্যারের অনুলিপি বিক্রি করে এবং যাদের কাছে সফ্টওয়্যারটি সজ্জিত করা হয়েছে তাদের অনুমতি দিতে, নিম্নলিখিত শর্তাবলী সাপেক্ষে:

উপরের কপিরাইট বিজ্ঞপ্তি এবং এই অনুমতি বিজ্ঞপ্তিটি সফ্টওয়্যারের সমস্ত কপি বা উল্লেখযোগ্য অংশে অন্তর্ভুক্ত করা হবে।

সফ্টওয়্যারটি "যেমন আছে" প্রদান করা হয়, কোনো প্রকারের ওয়্যারেন্টি ছাড়াই, প্রকাশ বা উহ্য, যার মধ্যে রয়েছে কিন্তু কোনো বিশেষ উদ্দেশ্যমূলক কাজের জন্য ব্যবসায়িকতা, উপযুক্ততার ওয়্যারেন্টিগুলির মধ্যে সীমাবদ্ধ নয়৷ কোনও ক্ষেত্রেই লেখক বা কপিরাইট ধারক কোনও দাবি, ক্ষতি বা অন্যান্য দায়দায়িত্বের জন্য দায়বদ্ধ হবেন না, চুক্তির কোনও ক্রিয়াকলাপে, টর্ট বা অন্যথায়, পরবর্তী সময়ে, আমাদের থেকে উদ্ভূত অন্যান্য লেনদেন সফটওয়্যার।

<br>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

## 🛠️ সম্পর্কিত ইউটিলিটি

### [</> minify.js (Gulp)](https://gulp.minify-js.org) &nbsp;<a href="https://github.com/toolleeo/cli-apps#programming"><img height=18 src="https://assets.minify-js.org/images/badges/awesome/badge.svg?v=b78dcd3"></a>

> সমস্ত জাভাস্ক্রিপ্ট ফাইলকে পুনরাবৃত্তভাবে ছোট করতে Gulp প্লাগ-ইন করুন।
<br>[ইনস্টল করুন](https://gulp.minify-js.org/#-installation) /
[রিডমি](https://gulp.minify-js.org/#readme) /
[আলোচনা করা](https://github.minify-js.org/discussions)

### [{ } scss-to-css](https://github.com/adamlui/scss-to-css) &nbsp;<a href="https://github.com/toolleeo/cli-apps#conversion"><img height=18 src="https://assets.minify-js.org/images/badges/awesome/badge.svg?v=b78dcd3"></a>

> পুনরাবৃত্তভাবে সমস্ত SCSS ফাইল মিনিফাইড CSS-এ কম্পাইল করুন।
<br>[ইনস্টল করুন](https://node.scsstocss.org/#-installation) /
[রিডমি](https://node.scsstocss.org/#readme) /
[CLI ব্যবহার](https://node.scsstocss.org/#-command-line-usage) /
[API ব্যবহার](https://node.scsstocss.org/#-api-usage) /
[আলোচনা করা](https://github.scsstocss.org/discussions)

<br>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://assets.minify-js.org/images/icons/home/white/icon32x27.png?v=ad67551"><img height=13 src="https://assets.minify-js.org/images/icons/home/dark-gray/icon32x27.png?v=ad67551"></picture> <a href="https://js-utils.org">**আরো জাভাস্ক্রিপ্ট ইউটিলিটি**</a> /
<a href="https://github.minify-js.org/discussions">আলোচনা করা</a> /
<a href="#-minifyjs">উপরে ফিরে যাও ↑</a>
