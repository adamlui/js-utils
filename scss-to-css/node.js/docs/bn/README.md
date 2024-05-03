<div align="center">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/js-utils/docs/images/earth-icon/white/icon32.svg">
            <img height=14 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils/docs/images/earth-icon/black/icon32.svg">
        </picture>
        &nbsp;বাংলা |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn#readme">简体中文</a> |
        <a href="../zh-tw#readme">繁體中文</a> |
        <a href="../ja#readme">日本語</a> |
        <a href="../hi#readme">हिंदी</a> |
        <a href="../mr#readme">मराठी</a> |
        <a href="../pa#readme">ਪੰਜਾਬੀ</a> |
        <a href="../de#readme">Deutsch</a> |
        <a href="../es#readme">Español</a> |
        <a href="../fr#readme">Français</a> |
        <a href="../it#readme">Italiano</a> |
        <a href="../nl#readme">Nederlands</a> |
        <a href="../pt#readme">Português</a>
    </h6>
</div>

# { } scss-to-css

### পুনরাবৃত্তভাবে সমস্ত SCSS ফাইল মিনিফাইড  CSS-এ কম্পাইল করুন।

<a href="https://www.npmjs.com/package/@adamlui/scss-to-css"><img height=31 src="https://img.shields.io/npm/dm/%40adamlui%2Fscss-to-css?logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%B8%E0%A7%87%E0%A6%A8%E0%A7%8D%E0%A6%B8"><img height=31 src="https://img.shields.io/badge/License-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/scss-to-css-1.8.4"><img height=31 src="https://img.shields.io/badge/Latest_Build-1.8.4-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/scss-to-css?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fminify.js?style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_scss-to-css:node.js/src/scss-to-css.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_scss-to-css%3Anode.js%2Fsrc%2Fscss-to-css.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#conversion"><img height=31 src="https://img.shields.io/badge/Mentioned_in-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png">

## ⚡ স্থাপন

একটি **গ্লোবাল ইউটিলিটি** হিসেবে:

```
$ npm install -g @adamlui/scss-to-css
```

**বিকাশকারী নির্ভরতা** হিসেবে (যেমন বিল্ড স্ক্রিপ্টের জন্য), আপনার প্রোজেক্ট রুট থেকে:

```
$ npm install -D @adamlui/scss-to-css
```

**রানটাইম নির্ভরতা** হিসেবে (যেমন, অন-দ্য-ফ্লাই সংকলনের জন্য), আপনার প্রোজেক্ট রুট থেকে:

```
$ npm install @adamlui/scss-to-css
```

<br>

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png">

## 💻 কমান্ড লাইন ব্যবহার

মৌলিক **গ্লোবাল কমান্ড** হল:

```
$ scss-to-css
```

নমুনা আউটপুট:

<img src="https://raw.githubusercontent.com/adamlui/scss-to-css/main/node.js/media/images/screenshots/cli-scss-to-css-docs.png">

**💡 দ্রষ্টব্য:** উৎস মানচিত্রগুলিও ডিফল্টরূপে তৈরি করা হয় যদি না `-S` বা `--no-source-maps` পাস না হয়।

#

**ইনপুট/আউটপুট** পাথ নির্দিষ্ট করতে:
   
```
$ scss-to-css [input_path] [output_path]
```

- `[input_path]`: SCSS ফাইল বা ডিরেক্টরির পাথ যেখানে SCSS ফাইল কম্পাইল করা হবে, বর্তমান কার্যকারী ডিরেক্টরির সাথে সম্পর্কিত।
- `[output_path]`: ফাইল বা ডিরেক্টরির পাথ যেখানে CSS + সোর্স ম্যাপ ফাইলগুলি সংরক্ষণ করা হবে, মূল ফাইলের অবস্থানের সাথে সম্পর্কিত (যদি প্রদান না করা হয়, `css/` ব্যবহার করা হয়)।

**💡 দ্রষ্টব্য:** ফোল্ডারগুলি পাস করা হলে, ফাইলগুলি পুনরাবৃত্তিমূলকভাবে প্রক্রিয়া করা হবে যদি না `-R` বা `--no-recursion` পাস না হয়।

#

আপনার প্রোজেক্টের `package.json`-এ **প্যাকেজ স্ক্রিপ্ট** হিসেবে ব্যবহার করতে:

```json
  "scripts": {
    "build:css": "<scss-to-css-cmd>"
  },
```

`<scss-to-css-cmd>` কে `scss-to-css` + ঐচ্ছিক প্যারামিটার দিয়ে প্রতিস্থাপন করুন। তারপর, কমান্ড চালানোর জন্য `npm run build:css` ব্যবহার করা যেতে পারে।

#

### উদাহরণ কমান্ড

**বর্তমান ডিরেক্টরি**-এ সমস্ত SCSS ফাইল কম্পাইল করুন (`css/`-এ আউটপুট):

```
$ scss-to-css
```

একটি **নির্দিষ্ট ডিরেক্টরি**-এ সমস্ত SCSS ফাইল কম্পাইল করুন (`path/to/your/directory/css/`-এ আউটপুট):

```
$ scss-to-css path/to/your/directory
```

একটি **নির্দিষ্ট ফাইল** কম্পাইল করুন (`path/to/your/css/file.min.css`-এ আউটপুট):

```
$ scss-to-css path/to/your/file.scss
```

উভয় **ইনপুট এবং আউটপুট** ডিরেক্টরি নির্দিষ্ট করুন (`output_folder/`-এ আউটপুট):

```
$ scss-to-css input_folder output_folder
```

**💡 দ্রষ্টব্য:** আউটপুট CSS ছোট করা হয় যদি না `-M` বা `--no-minify` পাস না হয়।

#

### কমান্ড লাইন বিকল্প

```
কনফিগার অপশন:
 -n, --dry-run               আসলে ফাইল(গুলি) ছোট করবেন না, সেগুলি প্রক্রিয়া করা হবে কিনা তা দেখান৷
 -d, --include-dotfolders    ফাইল অনুসন্ধানে ডটফোল্ডার অন্তর্ভুক্ত করুন।
 -S, --no-source-maps        উৎস মানচিত্র তৈরি হওয়া থেকে আটকান।
 -M, --no-minify             আউটপুট CSS-এর মিনফিকেশন অক্ষম করুন।
 -R, --no-recursion          পুনরাবৃত্ত ফাইল অনুসন্ধান অক্ষম করুন।
 -q, --quiet                 ত্রুটি ছাড়া সব লগিং দমন করুন।

তথ্য কমান্ড:
 -h, --help                  সাহায্য স্ক্রীন প্রদর্শন করুন।
 -v, --version               সংস্করণ নম্বর দেখান।
```

<br>

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png">

## 🔌 API ব্যবহার

আপনি ECMAScript মডিউল বা CommonJS মডিউল উভয় হিসাবে, এর API পদ্ধতিগুলি ব্যবহার করতে আপনার অ্যাপে **scss-to-css** আমদানি করতে পারেন।

#### ECMAScript*:

```js
import * as scssToCSS from '@adamlui/scss-to-css';
```

#### CJS:

```js
const scssToCSS = require('@adamlui/scss-to-css');
```

###### _*Node.js সংস্করণ 14 বা উচ্চতর প্রয়োজন_

#

### `compile(input[, options])`

সরবরাহকৃত স্ট্রিং ইনপুটের উপর ভিত্তি করে SCSS কম্পাইল করে।

যদি **সোর্স কোড** পাস করা হয়, এটি সরাসরি কম্পাইল করা হয়, তারপর `srcPath` + `code` + `srcMap` + `error` সম্বলিত একটি বস্তু ফেরত দেওয়া হয়:

```js
const srcCode = 'h1 { font-size: 40px ; code { font-face: Roboto Mono }}',
      compileResult = scssToCSS.compile(srcCode);

console.log(compileResult.error); // আউটপুট রানটাইম ত্রুটি, বা `undefined` যদি কোনো ত্রুটি না থাকে
console.log(compileResult.code);  // আউটপুট মিনিফাইড CSS: 'h1{font-size:40px}h1 code{font-face:Roboto Mono}'
```

যদি একটি **ফাইল পাথ** পাস করা হয়, তাহলে ফাইলের কোডটি লোড হয় তারপর CSS-এ কম্পাইল করা হয়, উপরের মত একটি বস্তু ফিরিয়ে দেয়।

যদি একটি **ডিরেক্টরি পাথ** পাস করা হয়, SCSS ফাইলগুলি অনুসন্ধান করা হয় (পুনরাবৃত্তভাবে ডিফল্টভাবে), প্রতিটির কোড লোড করা হয় তারপর কম্পাইল করা হয়, তারপর `srcPath` + `code` + `srcMap` + `error` ধারণকারী বস্তুর একটি অ্যারে ফেরত দেওয়া হয়:

```js
// কর্মরত ডিরেক্টরি + সমস্ত নেস্টেড ডিরেক্টরিতে SCSS ফাইলের পাথ আউটপুট করে
const compileResults = scssToCSS.compile('.');
compileResults.forEach(result => console.log(result.srcPath));

// পাওয়া গেলে দ্বিতীয় SCSS ফাইল থেকে CSS কম্পাইল করা আউটপুট, বা না পাওয়া গেলে `undefined`
console.log(compileResults[1].code);
```

বিকল্পগুলি হল বুলিয়ান, অবজেক্টের বৈশিষ্ট্য হিসাবে পাস করা হয়েছে৷ উদাহরণ স্বরূপ:

```js
// ডেটা অবজেক্টের অ্যারে প্রদান করে যেখানে `.কোড` অমিনিফাইড CSS কোড
scssToCSS.compile(inputDir, { minify: false });
```

উপলব্ধ প্যারামিটার (এবং তাদের ডিফল্ট সেটিংস) হল:

নাম          | বর্ণনা                                                                     | ডিফল্ট মান
-------------|--------------------------------------------------------------------------|------------
`recursive`  | ডিরেক্টরি পাথ পাস হলে নেস্টেড ফাইলগুলির জন্য পুনরাবৃত্তিমূলকভাবে অনুসন্ধান করুন। | `true`
`verbose`    | কনসোল/টার্মিনালে লগইন দেখান।                                              | `true`
`dotFolders` | ফাইল অনুসন্ধানে ডটফোল্ডার অন্তর্ভুক্ত করুন।                                    | `false`
`minify`     | আউটপুট CSS ছোট করুন।                                                   | `true`
`sourceMaps` | CSS সোর্স ম্যাপ তৈরি করুন।                                                  | `true`

#

### `findSCSS(searchDir[, options])`

পাস করা `searchDir` স্ট্রিং-এর মধ্যে সমস্ত SCSS ফাইলের জন্য অনুসন্ধান করে (কি ফাইলগুলি [`compile()`](#compileinput-options) প্রক্রিয়া করবে তা আবিষ্কার করার জন্য দরকারী) এবং তাদের ফাইলপাথ সমন্বিত একটি অ্যারে প্রদান করে।

বিকল্পগুলি হল বুলিয়ান, অবজেক্টের বৈশিষ্ট্য হিসাবে পাস করা হয়েছে। উদাহরণ স্বরূপ:

```js
// ঠিক assets/scss-এ SCSS ফাইল অনুসন্ধান করুন
const searchResults = scssToCSS.findSCSS('assets/scss', { recursive: false });
console.log(searchResults);

/* নমুনা আউটপুট:

findSCSS() » Searching for SCSS files...
findSCSS() » Search complete! 2 files found.
findSCSS() » Check returned array.
[
  'E:\\js\\utils\\scss-to-css\assets\\scss\\foo.scss',
  'E:\\js\\utils\\scss-to-css\assets\\scss\\bar.scss'
]
*/
```

উপলব্ধ প্যারামিটার (এবং তাদের ডিফল্ট সেটিংস) হল:

নাম          | বর্ণনা                                                         | ডিফল্ট মান
-------------|--------------------------------------------------------------|------------
`recursive`  | searchDir পাস করা নেস্টেড ফাইলগুলির জন্য বারবার অনুসন্ধান করুন। | `true`
`verbose`    | কনসোল/টার্মিনালে লগইন দেখান।                                  | `true`
`dotFolders` | ফাইল অনুসন্ধানে ডটফোল্ডার অন্তর্ভুক্ত করুন।                        | `false`

<br>

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png">

## 🏛️ MIT লাইসেন্স

**কপিরাইট © 2024 [Adam Lui](https://github.com/adamlui) এবং অবদানকারী**

এই সফ্টওয়্যারটির একটি অনুলিপি এবং সংশ্লিষ্ট ডকুমেন্টেশন ফাইল ("সফ্টওয়্যার") প্রাপ্ত যেকোন ব্যক্তিকে এতদ্বারা অনুমতি দেওয়া হচ্ছে, বিনা মূল্যে সফ্টওয়্যার ব্যবহার, অনুলিপি, পরিবর্তন, একত্রীকরণের অধিকার সহ সীমাবদ্ধতা ছাড়াই সফ্টওয়্যারে ডিল করার জন্য। , প্রকাশ, বিতরণ, সাবলাইসেন্স, এবং/অথবা সফ্টওয়্যারের অনুলিপি বিক্রি করে এবং যাদের কাছে সফ্টওয়্যারটি সজ্জিত করা হয়েছে তাদের অনুমতি দিতে, নিম্নলিখিত শর্তাবলী সাপেক্ষে:

উপরের কপিরাইট বিজ্ঞপ্তি এবং এই অনুমতি বিজ্ঞপ্তিটি সফ্টওয়্যারের সমস্ত কপি বা উল্লেখযোগ্য অংশে অন্তর্ভুক্ত করা হবে।

সফ্টওয়্যারটি "যেমন আছে" প্রদান করা হয়, কোনো প্রকারের ওয়্যারেন্টি ছাড়াই, প্রকাশ বা উহ্য, যার মধ্যে রয়েছে কিন্তু কোনো বিশেষ উদ্দেশ্যমূলক কাজের জন্য ব্যবসায়িকতা, উপযুক্ততার ওয়্যারেন্টিগুলির মধ্যে সীমাবদ্ধ নয়৷ কোনও ক্ষেত্রেই লেখক বা কপিরাইট ধারক কোনও দাবি, ক্ষতি বা অন্যান্য দায়দায়িত্বের জন্য দায়বদ্ধ হবেন না, চুক্তির কোনও ক্রিয়াকলাপে, টর্ট বা অন্যথায়, পরবর্তী সময়ে, আমাদের থেকে উদ্ভূত অন্যান্য লেনদেন সফটওয়্যার।

<br>

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png">

## 🛠️ সম্পর্কিত ইউটিলিটি

### [🖼️ img-to-webp](https://imgtowebp.org)

> বারবার WEBP-তে সমস্ত ছবি সংকুচিত করুন।
<br>[ডাউনলোড করুন](https://cdn.jsdelivr.net/gh/adamlui/js-utils/img-to-webp/img-to-webp.js) /
[আলোচনা করা](https://github.js-utils.com/discussions)

### [</> minify.js](https://minify-js.org) <a href="https://github.com/toolleeo/cli-apps#programming"><img height=18 src="https://awesome.re/mentioned-badge.svg"></a>

> সব জাভাস্ক্রিপ্ট ফাইল পুনরাবৃত্তিমূলকভাবে ছোট করুন।
<br>[ইনস্টল করুন](https://minify-js.org/docs/bn#-%E0%A6%B8%E0%A7%8D%E0%A6%A5%E0%A6%BE%E0%A6%AA%E0%A6%A8) /
[রিডমি](https://minify-js.org/docs/bn#readme) /
[CLI ব্যবহার](https://minify-js.org/docs/bn#-%E0%A6%95%E0%A6%AE%E0%A6%BE%E0%A6%A8%E0%A7%8D%E0%A6%A1-%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%A8-%E0%A6%AC%E0%A7%8D%E0%A6%AF%E0%A6%AC%E0%A6%B9%E0%A6%BE%E0%A6%B0) /
[API ব্যবহার](https://minify-js.org/docs/bn#-api-%E0%A6%AC%E0%A7%8D%E0%A6%AF%E0%A6%AC%E0%A6%B9%E0%A6%BE%E0%A6%B0) /
[আলোচনা করা](https://github.js-utils.com/discussions)

<br>

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://media.js-utils.com/images/icons/home/white/icon32x27.png"><img height=13 src="https://media.js-utils.com/images/icons/home/dark-gray/icon32x27.png"></picture> <a href="https://js-utils.com">**আরো জাভাস্ক্রিপ্ট ইউটিলিটি**</a> /
<a href="https://github.scsstocss.org/discussions">আলোচনা করা</a> /
<a href="#--scss-to-css">উপরে ফিরে যাও ↑</a>
