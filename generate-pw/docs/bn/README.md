<a id="top"></a>

<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/js-utils@f2dc346/assets/images/icons/earth/white/icon32.svg">
            <img height=14 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@f2dc346/assets/images/icons/earth/black/icon32.svg">
        </picture>
        &nbsp;বাংলা |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn/#readme">简体中文</a> |
        <a href="../zh-tw/#readme">繁體中文</a> |
        <a href="../hi/#readme">हिंदी</a> |
        <a href="../de/#readme">Deutsch</a> |
        <a href="../es/#readme">Español</a> |
        <a href="../fr/#readme">Français</a>
    </h6>
</div>

# > generate-pw

### এলোমেলোভাবে ক্রিপ্টোগ্রাফিকভাবে সুরক্ষিত পাসওয়ার্ড তৈরি করুন, শক্তিশালী করুন এবং যাচাই করুন।

<a href="https://npmstar.com/compare/generate-pw">
    <img height=31 src="https://img.shields.io/npm/dm/generate-pw?logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%B8%E0%A7%87%E0%A6%A8%E0%A7%8D%E0%A6%B8">
    <img height=31 src="https://img.shields.io/badge/License-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/generate-pw-2.3.1">
    <img height=31 src="https://img.shields.io/badge/Latest_Build-2.3.1-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/generate-pw?activeTab=code">
    <img height=31 src="https://img.shields.io/npm/unpacked-size/generate-pw?style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&selected=adamlui_js-utils%3Agenerate-pw&id=adamlui_js-utils">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Agenerate-pw%2Fsrc%2Fgenerate-pw.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonar&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps/#password-managers">
    <img height=31 src="https://img.shields.io/badge/Mentioned_in-Awesome-ff69b4?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/separators/aqua-gradient.png">

## 💡 সম্পর্কে

**generate-pw** হল একটি হালকা ওজনের, সহজে ব্যবহারযোগ্য লাইব্রেরি যা আপনাকে এলোমেলোভাবে ক্রিপ্টোগ্রাফিকভাবে সুরক্ষিত পাসওয়ার্ড(গুলি) তৈরি করতে, শক্তিশালী করতে এবং যাচাই করতে দেয়।

- **কোন বাহ্যিক নির্ভরতা নেই —** শুধুমাত্র বিল্ট-ইন ক্রিপ্টো পদ্ধতি নিরাপদ র্যান্ডমাইজেশনের জন্য ব্যবহৃত হয়
- **অত্যন্ত কাস্টমাইজযোগ্য —** দৈর্ঘ্য, পরিমাণ, ব্যবহার করার জন্য অক্ষর সেট ইত্যাদি নির্দিষ্ট করুন।
- **মাল্টি-এনভায়রনমেন্ট সাপোর্ট —** Node.js বা ওয়েব ব্রাউজারে ব্যবহার করুন
- **কমান্ড লাইন ব্যবহারযোগ্য —** শুধু টাইপ করুন `generate-pw`, এটাই

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/separators/aqua-gradient.png">

## ⚡ স্থাপন

একটি **গ্লোবাল ইউটিলিটি** হিসেবে:

```
$ npm install -g generate-pw
```

একটি **রানটাইম নির্ভরতা** হিসাবে, আপনার প্রকল্প রুট থেকে:

```
$ npm install generate-pw
```

<br>

<a href="https://github.com/sponsors/adamlui"><img src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/banners/sponsor/$10/banner1660x260.png"></a>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/separators/aqua-gradient.png">

## 🔌 API আমদানি করা হচ্ছে

### <img height=18 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/icons/platforms/node.js/icon25x28.png"> Node.js

#### ECMAScript*:

```js
import pw from 'generate-pw'
```

#### CommonJS:

```js
const pw = require('generate-pw')
```

###### _*Node.js সংস্করণ 14 বা উচ্চতর প্রয়োজন_

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/icons/platforms/web/light/icon25.png"><img width=16 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/icons/platforms/web/dark/icon25.png"></picture> Web

#### <> HTML স্ক্রিপ্ট ট্যাগ:

```html
<script src="https://cdn.jsdelivr.net/npm/generate-pw@2.3.1/dist/generate-pw.min.js"></script>
```

#### ES6:

```js
(async () => {
    await import('https://cdn.jsdelivr.net/npm/generate-pw@2.3.1/dist/generate-pw.min.js')
    // আপনার কোড এখানে...
})()
```

### <img height=17 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/icons/platforms/tampermonkey/icon28.png"><img height=17.5 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/icons/platforms/violentmonkey/icon25.png"> Greasemonkey

```js
...
// @require https://cdn.jsdelivr.net/npm/generate-pw@2.3.1/dist/generate-pw.min.js
// ==/UserScript==

// আপনার কোড এখানে...
```

<br>

**💡 দ্রষ্টব্য:** সর্বদা সর্বশেষ সংস্করণ আমদানি করতে (উৎপাদনে প্রস্তাবিত নয়!) jsDelivr URL থেকে `@2.3.1` সংস্করণ ট্যাগটি সরান: `https://cdn.jsdelivr.net/npm/generate-pw/dist/generate-pw.min.js`

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/separators/aqua-gradient.png">

## 📋 API ব্যবহার

### `generatePassword([options])`

**এক** পাসওয়ার্ড জেনারেট করে যদি `qty` বিকল্প না দেওয়া হয়, একটি স্ট্রিং ফেরত দেয়:

```js
const password = pw.generatePassword({ length: 11, numbers: true })
console.log(password) // নমুনা আউটপুট: 'bAsZm3mq6Qn'
```

...অথবা **একাধিক** পাসওয়ার্ড যদি `qty` বিকল্প দেওয়া হয়, স্ট্রিংগুলির একটি অ্যারে প্রদান করে:

```js
const passwords = pw.generatePassword({ qty: 5, length: 8, symbols: true })
console.log(passwords)
/* নমুনা আউটপুট:

generatePassword() » Generating passwords...
generatePassword() » Passwords generated!
generatePassword() » Check returned array.
[ '!zSf@Q.s', '!,HT\\;m=', '?Lq&FV>^', 'gf}Y;}Ne', 'Stsx(GqE' ]
*/
```

**💡 দ্রষ্টব্য:** যদি কোন বিকল্প পাস না করা হয়, পাসওয়ার্ডগুলি 8-অক্ষরের দীর্ঘ, বড়/লোয়ার হাতের অক্ষর সমন্বিত হবে।

দেখা: [উপলব্ধ বিকল্প](#generate-%E0%A6%AB%E0%A6%BE%E0%A6%82%E0%A6%B6%E0%A6%A8%E0%A7%87%E0%A6%B0-%E0%A6%9C%E0%A6%A8%E0%A7%8D%E0%A6%AF-%E0%A6%89%E0%A6%AA%E0%A6%B2%E0%A6%AC%E0%A7%8D%E0%A6%A7-%E0%A6%AC%E0%A6%BF%E0%A6%95%E0%A6%B2%E0%A7%8D%E0%A6%AA)

#

### `generatePasswords(qty[, options])`

প্রদত্ত পরিমাণের উপর ভিত্তি করে **একাধিক** পাসওয়ার্ড তৈরি করে, স্ট্রিংগুলির একটি অ্যারে ফিরিয়ে দেয়:

```js
const passwords = pw.generatePasswords(5, { length: 3, uppercase: false })
console.log(passwords)
/* নমুনা আউটপুট:

generatePasswords() » Generating passwords...
generatePasswords() » Passwords generated!
generatePasswords() » Check returned array.
[ 'yilppxru', 'ckvkyjfp', 'zolcpyfb' ]
*/
```

**💡 দ্রষ্টব্য:** যদি কোন `qty` arg পাস না হয়, শুধুমাত্র একটি পাসওয়ার্ড তৈরি করা হবে, একটি স্ট্রিং হিসাবে ফেরত দেওয়া হবে।

দেখা: [উপলব্ধ বিকল্প](#generate-%E0%A6%AB%E0%A6%BE%E0%A6%82%E0%A6%B6%E0%A6%A8%E0%A7%87%E0%A6%B0-%E0%A6%9C%E0%A6%A8%E0%A7%8D%E0%A6%AF-%E0%A6%89%E0%A6%AA%E0%A6%B2%E0%A6%AC%E0%A7%8D%E0%A6%A7-%E0%A6%AC%E0%A6%BF%E0%A6%95%E0%A6%B2%E0%A7%8D%E0%A6%AA)

#

### `strictify(password[, requiredCharTypes, options])`

পাস করা প্রতিটি `requiredCharTypes` উপাদানের অন্তত একটি অক্ষর ব্যবহার করার জন্য দেওয়া `password` পরিবর্তন করে, একটি স্ট্রিং ফিরিয়ে দেয়:

```js
const strictPW = pw.strictify('abcdef', ['numbers', 'symbols'])
console.log(strictPW) // নমুনা আউটপুট: 'a!c2ef'
```

**💡 দ্রষ্টব্য:** যদি কোন `requiredCharTypes` অ্যারে পাস না হয়, তাহলে উপলব্ধ সব ধরনের প্রয়োজন হবে।

উপলব্ধ `requiredCharTypes` হল: `['numbers', 'symbols', 'lower', 'upper']`

উপলব্ধ বিকল্প (অবজেক্ট বৈশিষ্ট্য হিসাবে পাস):

নাম       | টাইপ   | বর্ণনা                        | ডিফল্ট মান
----------|--------|-----------------------------|------------
`verbose` | বুলিয়ান | কনসোল/টার্মিনালে কনসোল লগিং দেখান। | `true`

#

### `validateStrength(password[, options])`

একটি পাসওয়ার্ডের শক্তি যাচাই করে, এতে থাকা একটি বস্তু ফিরিয়ে দেয়:
- `strengthScore` (0–100)
- `recommendations` অ্যারে
- `isGood` বুলিয়ান (`true` যদি `strengthScore` >= 80) 

উদাহরণ:

```js
const pwStrength = pw.validateStrength('Aa?idsE')
console.log(pwStrength)

/* আউটপুট:

validateStrength() » Validating password strength...
validateStrength() » Password strength validated!
validateStrength() » Check returned object for score/recommendations.
{
  strengthScore: 60,
  recommendations: [
    'Make it at least 8 characters long.',
    'Include at least one number.'
  ],
  isGood: false
}
*/
```

উপলব্ধ বিকল্প (অবজেক্ট বৈশিষ্ট্য হিসাবে পাস):

নাম       | টাইপ   | বর্ণনা                        | ডিফল্ট মান
----------|--------|-----------------------------|------------
`verbose` | বুলিয়ান | কনসোল/টার্মিনালে কনসোল লগিং দেখান। | `true`

#

### `generate*()` ফাংশনের জন্য উপলব্ধ বিকল্প

প্রতিটি `generate*()` ফাংশনের জন্য বিকল্প অবজেক্টে এর যেকোনো একটি পাস করা যেতে পারে:

নাম                   | টাইপ    | বর্ণনা                                                                   | ডিফল্ট মান
----------------------|---------|------------------------------------------------------------------------|------------
`verbose`             | বুলিয়ান  | কনসোল/টার্মিনালে লগইন খান।                                              | `true`
`length`              | পূর্ণসংখ্যা | পাসওয়ার্ডের দৈর্ঘ্য(গুলি)।                                                   | `8`
`qty`                 | পূর্ণসংখ্যা | তৈরি করার জন্য পাসওয়ার্ডের সংখ্যা।                                         | `1`
`strength`            | স্ট্রিং     | `<'weak'\|'basic'\|'strong'>` শক্তির প্রিসেট প্রয়োগ করুন।                  | `''`
`charset`             | স্ট্রিং     | পাসওয়ার্ডে অক্ষর অন্তর্ভুক্ত করতে হবে।                                       | `''`
`exclude`             | স্ট্রিং     | পাসওয়ার্ড(গুলি) থেকে বাদ দেওয়া অক্ষর।                                     | `''`
`numbers`             | বুলিয়ান  | পাসওয়ার্ডে নম্বরগুলিকে অনুমতি দিন।                                         | `false`
`symbols`             | বুলিয়ান  | পাসওয়ার্ডে চিহ্নের অনুমতি দিন।                                              | `false`
`lowercase`           | বুলিয়ান  | পাসওয়ার্ডে ছোট হাতের অক্ষরের অনুমতি দিন।                                  | `true`
`uppercase`           | বুলিয়ান  | পাসওয়ার্ডে বড় হাতের অক্ষরের অনুমতি দিন।                                   | `true`
`similarChars`        | বুলিয়ান  | পাসওয়ার্ডে একই রকম দেখতে অক্ষর (যেমন o,0,O,i,l,1,\|) অন্তর্ভুক্ত করুন।      | `false`
`strict`              | বুলিয়ান  | পাসওয়ার্ডে সেট করা প্রতিটি অনুমোদিত অক্ষর থেকে কমপক্ষে একটি অক্ষর প্রয়োজন। | `true`
`entropy`             | Boolean | অনুমানকৃত এনট্রপি গণনা করুন/লগ করুন।                                    | `true`

##### _*শুধুমাত্র [`generatePassword([options])`](#generatepasswordoptions) এ উপলব্ধ যেহেতু [`generatePasswords(qty[, options])`](#generatepasswordsqty-options) একটি `qty` আর্গুমেন্ট নেয়_

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/separators/aqua-gradient.png">

## 💻 কমান্ড লাইন ব্যবহার

**generate-pw** কমান্ড লাইন থেকে সরাসরি ব্যবহার করা যেতে পারে। মৌলিক কমান্ডটি হল:

```
$ generate-pw
```

<img src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d3424a/generate-pw/assets/images/screenshots/cli/generate-pw-cmd-output.png">

#

### কমান্ড লাইন বিকল্প

```
প্যারামিটার অপশনসমূহ:
 --length=n                  n দৈর্ঘ্যের পাসওয়ার্ড(গুলি) তৈরি করুন।
 --qty=n                     n পাসওয়ার্ড(গুলি) তৈরি করুন।
 --charset=chars             পাসওয়ার্ড(গুলি)তে শুধুমাত্র chars অন্তর্ভুক্ত করুন।
 --exclude=chars             পাসওয়ার্ড(গুলি) থেকে chars বাদ দিন।
 --ui-lang="code"            UI প্রদর্শনের জন্য ISO 639-1 ভাষার কোড।
 --config="path/to/file"     কাস্টম কনফিগারেশন ফাইল লোড করুন।

বুলিয়ান বিকল্প:
 -w, --weak                  দুর্বল পাসওয়ার্ড তৈরি করুন।
 -b, --basic                 সাধারণ শক্তির পাসওয়ার্ড তৈরি করুন।
 -t, --strong                শক্তিশালী পাসওয়ার্ড তৈরি করুন।
 -N, --no-numbers            পাসওয়ার্ডে সংখ্যা ব্যবহার করা যাবে না।
 -Y, --no-symbols            পাসওয়ার্ডে প্রতীক ব্যবহার করা যাবে না।
 -L, --no-lowercase          পাসওয়ার্ডে ছোট হাতের অক্ষর ব্যবহার না করা
 -U, --no-uppercase          পাসওয়ার্ড(গুলি) এ বড় হাতের অক্ষর অনুমোদন না করুন।
 -s, --similar-chars         পাসওয়ার্ডে একই রকম অক্ষর অন্তর্ভুক্ত করুন।
 -S, --unstrict              পাসওয়ার্ডে অনুমোদিত প্রতিটি অক্ষর সেট থেকে অন্তত একটি অক্ষর থাকা আবশ্যক নয়।
 -E, --no-entropy            অনুমানকৃত এনট্রপি গণনা করুন/লগ করুন।
 -q, --quiet                 ত্রুটি ছাড়া সব লগিং দমন করুন।

কমান্ডসমূহ:
 -i, --init                  কনফিগারেশন ফাইল তৈরি করুন (প্রজেক্টের রুটে)।
 -h, --help                  সাহায্য স্ক্রীন প্রদর্শন করুন।
 -v, --version               সংস্করণ নম্বর দেখান।
     --stats                 npm পরিসংখ্যান দেখান।
     --debug [targetKey]     ডিবাগ লগ দেখান।
```

#

### কনফিগারেশন ফাইল

আপনার প্রজেক্ট রুটে রাখা একটি `generate-pw.config.mjs` বা `generate-pw.config.js` ফাইল ব্যবহার করে **generate-pw** কাস্টমাইজ করা যেতে পারে।

ডিফল্ট উদাহরণ:

```js
export default {
    length: 12,                 // জেনারেট করা পাসওয়ার্ডের দৈর্ঘ্য
    qty: 1,                     // জেনারেট করার জন্য পাসওয়ার্ডের সংখ্যা
    strength: '',               // <'weak'|'basic'|'strong'> শক্তির প্রিসেট প্রয়োগ করুন
    charset: '',                // পাসওয়ার্ডে শুধুমাত্র এই অক্ষরগুলো অন্তর্ভুক্ত করুন
    exclude: '',                // পাসওয়ার্ড থেকে এই অক্ষরগুলো বাদ দিন
    excludeNums: false,         // পাসওয়ার্ডে সংখ্যা ব্যবহার করা যাবে ন
    excludeSymbols: false,      // পাসওয়ার্ডে প্রতীক ব্যবহার করা যাবে ন
    excludeLowerChars: false,   // পাসওয়ার্ডে ছোট হাতের অক্ষর ব্যবহারের অনুমতি দেবেন ন
    excludeUpperChars: false,   // পাসওয়ার্ডে বড় হাতের অক্ষর ব্যবহারের অনুমতি দেবেন ন
    similarChars: false,        // পাসওয়ার্ডে একই রকম অক্ষর (যেমন o,0,O,i,l,1,\|) অন্তর্ভুক্ত করুন
    unstrict: false,            // পাসওয়ার্ডে অনুমোদিত প্রতিটি অক্ষর সেট থেকে ১টির বেশি অক্ষর থাকা আবশ্যক নয়
    noEntropy: false,           // আনুমানিক এনট্রপি গণনা/লগ করুন
    quietMode: false            // ত্রুটি ছাড়া অন্য সব লগিং বন্ধ রাখুন
}
```

💡 আপনার প্রজেক্ট রুটে একটি টেমপ্লেট `generate-pw.config.mjs` তৈরি করতে `generate-pw init` কমান্ডটি চালান।

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/separators/aqua-gradient.png">

## 🏛️ MIT লাইসেন্স

**কপিরাইট © 2024–2026 [Adam Lui](https://github.com/adamlui) এবং অবদানকারী**

এই সফ্টওয়্যারটির একটি অনুলিপি এবং সংশ্লিষ্ট ডকুমেন্টেশন ফাইল ("সফ্টওয়্যার") প্রাপ্ত যেকোন ব্যক্তিকে এতদ্বারা অনুমতি দেওয়া হচ্ছে, বিনা মূল্যে সফ্টওয়্যার ব্যবহার, অনুলিপি, পরিবর্তন, একত্রীকরণের অধিকার সহ সীমাবদ্ধতা ছাড়াই সফ্টওয়্যারে ডিল করার জন্য। , প্রকাশ, বিতরণ, সাবলাইসেন্স, এবং/অথবা সফ্টওয়্যারের অনুলিপি বিক্রি করে এবং যাদের কাছে সফ্টওয়্যারটি সজ্জিত করা হয়েছে তাদের অনুমতি দিতে, নিম্নলিখিত শর্তাবলী সাপেক্ষে:

উপরের কপিরাইট বিজ্ঞপ্তি এবং এই অনুমতি বিজ্ঞপ্তিটি সফ্টওয়্যারের সমস্ত কপি বা উল্লেখযোগ্য অংশে অন্তর্ভুক্ত করা হবে।

সফ্টওয়্যারটি "যেমন আছে" প্রদান করা হয়, কোনো প্রকারের ওয়্যারেন্টি ছাড়াই, প্রকাশ বা উহ্য, যার মধ্যে রয়েছে কিন্তু কোনো বিশেষ উদ্দেশ্যমূলক কাজের জন্য ব্যবসায়িকতা, উপযুক্ততার ওয়্যারেন্টিগুলির মধ্যে সীমাবদ্ধ নয়৷ কোনও ক্ষেত্রেই লেখক বা কপিরাইট ধারক কোনও দাবি, ক্ষতি বা অন্যান্য দায়দায়িত্বের জন্য দায়বদ্ধ হবেন না, চুক্তির কোনও ক্রিয়াকলাপে, টর্ট বা অন্যথায়, পরবর্তী সময়ে, আমাদের থেকে উদ্ভূত অন্যান্য লেনদেন সফটওয়্যার।

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/separators/aqua-gradient.png">

## 🛠️ সম্পর্কিত ইউটিলিটি

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/js-utils@5c34563/generate-ip/assets/images/icons/node-graph/white/icon55x49.png"><img height=21 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@5c34563/generate-ip/assets/images/icons/node-graph/black/icon55x49.png"></picture> [generate-ip](https://js-utils.org/generate-ip) &nbsp;<a href="https://github.com/toolleeo/cli-apps/#networking"><img height=18 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/badges/awesome/badge.svg"></a>

> এলোমেলোভাবে IPv4 + IPv6 + MAC ঠিকানাগুলি তৈরি করুন, বিন্যাস করুন এবং যাচাই করুন৷
<br>[ইনস্টল করুন](https://docs.generate-ip.org/#-installation) /
[রিডমি](https://docs.generate-ip.org/#readme) /
[API ব্যবহার](https://docs.generate-ip.org/#-api-usage) /
[CLI ব্যবহার](https://docs.generate-ip.org/#-command-line-usage) /
[আলোচনা করা](https://github.com/adamlui/js-utils/discussions)

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d3424a/geolocate/assets/images/icons/wire-globe/white/icon32.png"><img height=22 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d3424a/geolocate/assets/images/icons/wire-globe/black/icon32.png"></picture> [geolocate](https://js-utils.org/geolocate) &nbsp;<a href="https://github.com/toolleeo/cli-apps/#networking"><img height=18 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/badges/awesome/badge.svg"></a>

> CLI থেকে আইপি জিওলোকেশন ডেটা আনুন।
<br>[ইনস্টল করুন](https://docs.geolocatejs.org/#-installation) /
[রিডমি](https://docs.geolocatejs.org/#readme) /
[CLI ব্যবহার](https://docs.geolocatejs.org/#-command-line-usage) /
[API ব্যবহার](https://docs.geolocatejs.org/#-api-usage) /
[আলোচনা করা](https://github.com/adamlui/js-utils/discussions)

<br>

<img height=6px width="100%" src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/separators/aqua-gradient.png">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/icons/home/white/icon32x27.png"><img height=13 src="https://cdn.jsdelivr.net/gh/adamlui/js-utils@0d36e26/assets/images/icons/home/dark-gray/icon32x27.png"></picture> <a href="https://github.com/adamlui/js-utils/#readme">**আরো জাভাস্ক্রিপ্ট ইউটিলিটি**</a> /
<a href="https://github.com/adamlui/js-utils/discussions">আলোচনা করা</a> /
<a href="#top">উপরে ফিরে যাও ↑</a>
