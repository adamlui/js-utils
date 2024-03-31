<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/white/icon32.svg">
            <img height=14 src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/black/icon32.svg">
        </picture>
        &nbsp;বাংলা |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn#readme">简体中文</a> |
        <a href="../zh-tw#readme">繁體中文</a> |
        <a href="../hi#readme">हिंदी</a>
    </h6>
</div>

# > generate-pw

### Randomly generate cryptographically-secure passwords.

<a href="#%EF%B8%8F-mit-%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%B8%E0%A7%87%E0%A6%A8%E0%A7%8D%E0%A6%B8"><img height=31 src="https://img.shields.io/badge/License-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/generate-pw-1.4.0"><img height=31 src="https://img.shields.io/badge/Latest_Build-1.4.0-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/generate-pw?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/generate-pw?style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:generate-pw/src/generate-pw.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Agenerate-pw%2Fsrc%2Fgenerate-pw.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

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

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🔌 API আমদানি করা হচ্ছে

### <img height=18 src="https://i.imgur.com/JIeAdsr.png"> Node.js

#### ES module:

```js
import * as pw from 'generate-pw';
```

#### CommonJS:

```js
const pw = require('generate-pw');
```

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://i.imgur.com/JSEb19A.png"><img width=16 src="https://i.imgur.com/5VPxf9y.png"></picture> Web

#### <> HTML স্ক্রিপ্ট ট্যাগ:

```html
<script src="https://cdn.jsdelivr.net/npm/generate-pw@1.4.0/dist/generate-pw.min.js"></script>
```

#### ES6:

```js
(async () => {
    await import('https://cdn.jsdelivr.net/npm/generate-pw@1.4.0/dist/generate-pw.min.js');
    // আপনার কোড এখানে...
})();
```

### <img height=17 src="https://raw.githubusercontent.com/KudoAI/chatgpt.js/main/starters/media/images/icons/tampermonkey-icon28.png"><img height=17.5 src="https://raw.githubusercontent.com/KudoAI/chatgpt.js/main/starters/media/images/icons/violentmonkey-icon100.png"> Greasemonkey

```js
...
// @require https://cdn.jsdelivr.net/npm/generate-pw@1.4.0/dist/generate-pw.min.js
// ==/UserScript==

// আপনার কোড এখানে...
```

<br>

**💡 দ্রষ্টব্য:** সর্বদা সর্বশেষ সংস্করণ আমদানি করতে (উৎপাদনে প্রস্তাবিত নয়!) jsDelivr URL থেকে `@1.4.0` সংস্করণ ট্যাগটি সরান: `https://cdn.jsdelivr.net/npm/generate-pw/dist/generate-pw.min.js`

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 📋 API ব্যবহার

### `generatePassword([options])`

**এক** পাসওয়ার্ড জেনারেট করে যদি `qty` বিকল্প না দেওয়া হয়, একটি স্ট্রিং ফেরত দেয়:

```js
const password = pw.generatePassword({ length: 11, numbers: true });
console.log(password); // নমুনা আউটপুট: 'bAsZm3mq6Qn'
```

...অথবা **একাধিক** পাসওয়ার্ড যদি `qty` বিকল্প দেওয়া হয়, স্ট্রিংগুলির একটি অ্যারে প্রদান করে:

```js
const passwords = pw.generatePassword({ qty: 5, length: 8, symbols: true });
console.log(passwords);
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
const passwords = pw.generatePasswords(5, { length: 3, uppercase: false });
console.log(passwords);
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
const strictPW = pw.strictify('abcdef', ['numbers', 'symbols']);
console.log(strictPW); // নমুনা আউটপুট: 'a!c2ef'
```

**💡 দ্রষ্টব্য:** যদি কোন `requiredCharTypes` অ্যারে পাস না হয়, তাহলে উপলব্ধ সব ধরনের প্রয়োজন হবে।

উপলব্ধ `requiredCharTypes` হল: `['number', 'symbol', 'lower', 'upper']`

উপলব্ধ বিকল্প (অবজেক্ট বৈশিষ্ট্য হিসাবে পাস):

নাম       | টাইপ   | বর্ণনা                        | ডিফল্ট মান
----------|--------|-----------------------------|------------
`verbose` | বুলিয়ান | কনসোল/টার্মিনালে লগইন দেখান। | `true`

#

### `validateStrength(password[, options])`

একটি পাসওয়ার্ডের শক্তি যাচাই করে, এতে থাকা একটি বস্তু ফিরিয়ে দেয়:
- `strengthScore` (0–100)
- `recommendations` অ্যারে
- `isGood` বুলিয়ান (`true` যদি `strengthScore` >= 80) 

উদাহরণ:

```js
const pwStrength = pw.validateStrength('Aa?idsE');
console.log(pwStrength);

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
`verbose` | বুলিয়ান | কনসোল/টার্মিনালে লগইন দেখান। | `true`

#

### `generate*()` ফাংশনের জন্য উপলব্ধ বিকল্প

প্রতিটি `generate*()` ফাংশনের জন্য বিকল্প অবজেক্টে এর যেকোনো একটি পাস করা যেতে পারে:

নাম         | টাইপ    | বর্ণনা                                                                   | ডিফল্ট মান
------------|---------|------------------------------------------------------------------------|------------
`verbose`   | বুলিয়ান  | কনসোল/টার্মিনালে লগইন খান।                                              | `true`
`length`    | পূর্ণসংখ্যা | পাসওয়ার্ডের দৈর্ঘ্য(গুলি)।                                                   | `8`
`qty`*      | পূর্ণসংখ্যা | তৈরি করার জন্য পাসওয়ার্ডের সংখ্যা।                                         | `1`
`charset`   | স্ট্রিং     | পাসওয়ার্ডে অক্ষর অন্তর্ভুক্ত করতে হবে।                                       | `''`
`exclude`   | স্ট্রিং     | পাসওয়ার্ড(গুলি) থেকে বাদ দেওয়া অক্ষর।                                     | `''`
`numbers`   | বুলিয়ান  | পাসওয়ার্ডে নম্বরগুলিকে অনুমতি দিন।                                         | `false`
`symbols`   | বুলিয়ান  | পাসওয়ার্ডে চিহ্নের অনুমতি দিন।                                              | `false`
`lowercase` | বুলিয়ান  | পাসওয়ার্ডে ছোট হাতের অক্ষরের অনুমতি দিন।                                  | `true`
`uppercase` | বুলিয়ান  | পাসওয়ার্ডে বড় হাতের অক্ষরের অনুমতি দিন।                                   | `true`
`strict`    | বুলিয়ান  | পাসওয়ার্ডে সেট করা প্রতিটি অনুমোদিত অক্ষর থেকে কমপক্ষে একটি অক্ষর প্রয়োজন। | `false`

##### _*শুধুমাত্র [`generatePassword([options])`](#generatepasswordoptions) এ উপলব্ধ যেহেতু [`generatePasswords(qty[, options])`](#generatepasswordsqty-options) একটি `qty` আর্গুমেন্ট নেয়_

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 💻 কমান্ড লাইন ব্যবহার

যখন ইনস্টল করা হয় [বিশ্বব্যাপী](#-%E0%A6%B8%E0%A7%8D%E0%A6%A5%E0%A6%BE%E0%A6%AA%E0%A6%A8), **generate-pw** কমান্ড লাইন থেকেও ব্যবহার করা যেতে পারে। মৌলিক কমান্ড হল:

```
$ generate-pw
```

**💡 দ্রষ্টব্য:** নিরাপত্তার কারণে, তৈরি করা পাসওয়ার্ড(গুলি) ক্লিপবোর্ডে সংরক্ষণ করা হয়।

#

### কমান্ড লাইন বিকল্প

```
পরামিতি বিকল্প:
 --length=n                  n দৈর্ঘ্যের পাসওয়ার্ড(গুলি) তৈরি করুন।
 --qty=n                     n পাসওয়ার্ড(গুলি) তৈরি করুন।
 --charset=chars             পাসওয়ার্ড(গুলি)তে শুধুমাত্র chars অন্তর্ভুক্ত করুন।
 --exclude=chars             পাসওয়ার্ড(গুলি) থেকে chars বাদ দিন।

বুলিয়ান বিকল্প:
 -n, --include-numbers       পাসওয়ার্ডে নম্বরগুলিকে অনুমতি দিন।
 -s, --include-symbols       পাসওয়ার্ডে চিহ্নের অনুমতি দিন।
 -L, --no-lowercase          পাসওয়ার্ডে ছোট হাতের অক্ষর ব্যবহার না করা
 -U, --no-uppercase          পাসওয়ার্ড(গুলি) এ বড় হাতের অক্ষর অনুমোদন না করুন।
 -s, --strict                পাসওয়ার্ডে সেট করা প্রতিটি অনুমোদিত অক্ষর থেকে কমপক্ষে একটি অক্ষর প্রয়োজন।
 -q, --quiet                 ত্রুটি ছাড়া সব লগিং দমন করুন।

তথ্য কমান্ড:
 -h, --help                  সাহায্য স্ক্রীন প্রদর্শন করুন।
 -v, --version               সংস্করণ নম্বর দেখান।
```

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🏛️ MIT লাইসেন্স

**কপিরাইট © 2024 [Adam Lui](https://github.com/adamlui) এবং অবদানকারী**

এই সফ্টওয়্যারটির একটি অনুলিপি এবং সংশ্লিষ্ট ডকুমেন্টেশন ফাইল ("সফ্টওয়্যার") প্রাপ্ত যেকোন ব্যক্তিকে এতদ্বারা অনুমতি দেওয়া হচ্ছে, বিনা মূল্যে সফ্টওয়্যার ব্যবহার, অনুলিপি, পরিবর্তন, একত্রীকরণের অধিকার সহ সীমাবদ্ধতা ছাড়াই সফ্টওয়্যারে ডিল করার জন্য। , প্রকাশ, বিতরণ, সাবলাইসেন্স, এবং/অথবা সফ্টওয়্যারের অনুলিপি বিক্রি করে এবং যাদের কাছে সফ্টওয়্যারটি সজ্জিত করা হয়েছে তাদের অনুমতি দিতে, নিম্নলিখিত শর্তাবলী সাপেক্ষে:

উপরের কপিরাইট বিজ্ঞপ্তি এবং এই অনুমতি বিজ্ঞপ্তিটি সফ্টওয়্যারের সমস্ত কপি বা উল্লেখযোগ্য অংশে অন্তর্ভুক্ত করা হবে।

সফ্টওয়্যারটি "যেমন আছে" প্রদান করা হয়, কোনো প্রকারের ওয়্যারেন্টি ছাড়াই, প্রকাশ বা উহ্য, যার মধ্যে রয়েছে কিন্তু কোনো বিশেষ উদ্দেশ্যমূলক কাজের জন্য ব্যবসায়িকতা, উপযুক্ততার ওয়্যারেন্টিগুলির মধ্যে সীমাবদ্ধ নয়৷ কোনও ক্ষেত্রেই লেখক বা কপিরাইট ধারক কোনও দাবি, ক্ষতি বা অন্যান্য দায়দায়িত্বের জন্য দায়বদ্ধ হবেন না, চুক্তির কোনও ক্রিয়াকলাপে, টর্ট বা অন্যথায়, পরবর্তী সময়ে, আমাদের থেকে উদ্ভূত অন্যান্য লেনদেন সফটওয়্যার।

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

<a href="https://github.com/adamlui/js-utils">**জাভাস্ক্রিপ্ট ইউটিলিটি**</a> /
<a href="https://github.com/adamlui/js-utils/discussions">আলোচনা করা</a> /
<a href="#-generate-pw">উপরে ফিরে যাও ↑</a>
