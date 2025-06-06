<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://assets.js-utils.org/images/icons/earth/white/icon32.svg?v=7c33be0">
            <img height=14 src="https://assets.js-utils.org/images/icons/earth/black/icon32.svg?v=7c33be0">
        </picture>
        &nbsp;हिंदी |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn#readme">简体中文</a> |
        <a href="../zh-tw#readme">繁體中文</a> |
        <a href="../bn#readme">বাংলা</a> |
        <a href="../de#readme">Deutsch</a> |
        <a href="../es#readme">Español</a> |
        <a href="../fr#readme">Français</a>
    </h6>
</div>

# > generate-pw

### क्रिप्टोग्राफ़िक रूप से सुरक्षित पासवर्ड को बेतरतीब ढंग से उत्पन्न, मजबूत और मान्य करें।

<a href="https://www.npmjs.com/package/generate-pw">
    <img height=31 src="https://img.shields.io/npm/dm/generate-pw?logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-लाइसेंस">
    <img height=31 src="https://img.shields.io/badge/License-MIT-fc4f2d.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/generate-pw-1.5.12">
    <img height=31 src="https://img.shields.io/badge/Latest_Build-1.5.12-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/generate-pw?activeTab=code">
    <img height=31 src="https://img.shields.io/npm/unpacked-size/generate-pw?style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://github.com/adamlui/js-utils/blob/generate-pw-1.5.12/generate-pw/dist/generate-pw.min.js">
    <img height=31 src="https://img.shields.io/github/size/adamlui/js-utils/generate-pw/dist/generate-pw.min.js?branch=generate-pw-1.5.12&label=Minified%20Size&logo=databricks&logoColor=white&labelColor=464646&color=ff69b4&style=for-the-badge"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:generate-pw/src/generate-pw.js">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Agenerate-pw%2Fsrc%2Fgenerate-pw.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#password-managers">
    <img height=31 src="https://img.shields.io/badge/Mentioned_in-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<br>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/aqua-gradient.png?v=0d36e26">

## 💡के बारे में

**generate-pw** एक हल्की, उपयोग में आसान लाइब्रेरी है जो आपको क्रिप्टोग्राफ़िक रूप से सुरक्षित पासवर्ड को यादृच्छिक रूप से उत्पन्न करने, मजबूत करने और मान्य करने की अनुमति देती है।

- **कोई बाहरी निर्भरता नहीं -** सुरक्षित रैंडमाइजेशन के लिए केवल अंतर्निहित क्रिप्टो तरीकों का उपयोग किया जाता है
- **अत्यधिक अनुकूलन योग्य -** लंबाई, मात्रा, उपयोग करने के लिए वर्णसेट आदि निर्दिष्ट करें।
- **बहु-पर्यावरण समर्थन -** Node.js या वेब ब्राउज़र में उपयोग करें
- **कमांड लाइन प्रयोग करने योग्य -** बस `generate-pw` टाइप करें, बस इतना ही

## ⚡ इंस्टालेशन

**वैश्विक उपयोगिता** के रूप में:

```
$ npm install -g generate-pw
```

**रनटाइम निर्भरता** के रूप में (उदाहरण के लिए ऑन-द-फ्लाई मिनिमाइजेशन के लिए), आपके प्रोजेक्ट रूट से:

```
$ npm install generate-pw
```

<br>

<a href="https://github.com/sponsors/adamlui"><img src="https://assets.js-utils.org/images/banners/sponsor/$10/banner1660x260.png?v=0d36e26"></a>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/aqua-gradient.png?v=0d36e26">

## 🔌 API को आयात करना

### <img height=18 src="https://assets.js-utils.org/images/icons/platforms/node.js/icon25x28.png?v=0d36e26"> Node.js

#### ECMAScript*:

```js
import pw from 'generate-pw';
```

#### CommonJS:

```js
const pw = require('generate-pw');
```

###### _*Node.js संस्करण 14 या उच्चतर आवश्यक_

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://assets.js-utils.org/images/icons/platforms/web/light/icon25.png?v=0d36e26"><img width=16 src="https://assets.js-utils.org/images/icons/platforms/web/dark/icon25.png?v=0d36e26"></picture> Web

#### <> HTML स्क्रिप्ट टैग:

```html
<script src="https://cdn.jsdelivr.net/npm/generate-pw@1.5.12/dist/generate-pw.min.js"></script>
```

#### ES6:

```js
(async () => {
    await import('https://cdn.jsdelivr.net/npm/generate-pw@1.5.12/dist/generate-pw.min.js');
    // आपका कोड यहाँ...
})();
```

### <img height=17 src="https://assets.js-utils.org/images/icons/platforms/tampermonkey/icon28.png?v=0d36e26"><img height=17.5 src="https://assets.js-utils.org/images/icons/platforms/violentmonkey/icon25.png?v=0d36e26"> Greasemonkey

```js
...
// @require https://cdn.jsdelivr.net/npm/generate-pw@1.5.12/dist/generate-pw.min.js
// ==/UserScript==

// आपका कोड यहाँ...
```

<br>

**💡 ध्यान दें:** हमेशा नवीनतम संस्करण आयात करने के लिए (उत्पादन में अनुशंसित नहीं!) jsDelivr URL से `@1.5.12` संस्करण टैग हटा दें: `https://cdn.jsdelivr.net/npm/generate-pw/dist/generate-pw.min.js`

<br>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/aqua-gradient.png?v=0d36e26">

## 📋 एपीआई उपयोग

### `generatePassword([options])`

यदि `qty` विकल्प नहीं दिया गया है तो **एक** पासवर्ड जेनरेट करता है, एक स्ट्रिंग लौटाता है:

```js
const password = pw.generatePassword({ length: 11, numbers: true });
console.log(password); // नमूना आउटपुट: 'bAsZm3mq6Qn'
```

...या **एकाधिक** पासवर्ड यदि `qty` विकल्प दिया गया है, तो स्ट्रिंग्स की एक सरणी लौटाएं:

```js
const passwords = pw.generatePassword({ qty: 5, length: 8, symbols: true });
console.log(passwords);
/* नमूना आउटपुट:

generatePassword() » Generating passwords...
generatePassword() » Passwords generated!
generatePassword() » Check returned array.
[ '!zSf@Q.s', '!,HT\\;m=', '?Lq&FV>^', 'gf}Y;}Ne', 'Stsx(GqE' ]
*/
```

**💡 नोट:** यदि कोई विकल्प नहीं चुना जाता है, तो पासवर्ड 8-अक्षर लंबा होगा, जिसमें अपर/लोअर केस अक्षर शामिल होंगे।

देखना: [उपलब्ध विकल्प](#generate-फ़ंक्शंस-के-लिए-उपलब्ध-विकल्प)

#

### `generatePasswords(qty[, options])`

दिए गए `qty` के आधार पर **एकाधिक** पासवर्ड उत्पन्न करता है, स्ट्रिंग की एक सरणी लौटाता है:

```js
const passwords = pw.generatePasswords(5, { length: 3, uppercase: false });
console.log(passwords);
/* नमूना आउटपुट:

generatePasswords() » Generating passwords...
generatePasswords() » Passwords generated!
generatePasswords() » Check returned array.
[ 'yilppxru', 'ckvkyjfp', 'zolcpyfb' ]
*/
```

**💡 नोट:** यदि कोई `qty` तर्क पारित नहीं किया गया है, तो केवल एक पासवर्ड उत्पन्न किया जाएगा, एक स्ट्रिंग के रूप में लौटाया जाएगा।

देखना: [उपलब्ध विकल्प](#generate-फ़ंक्शंस-के-लिए-उपलब्ध-विकल्प)

#

### `strictify(password[, requiredCharTypes, options])`

प्रत्येक `requiredCharTypes` तत्व के कम से कम एक वर्ण का उपयोग करने के लिए दिए गए `password` को संशोधित करता है, एक स्ट्रिंग लौटाता है:

```js
const strictPW = pw.strictify('abcdef', ['numbers', 'symbols']);
console.log(strictPW); // नमूना आउटपुट: 'a!c2ef'
```

**💡 नोट:** यदि कोई `requiredCharTypes` सरणी पारित नहीं की गई है, तो सभी उपलब्ध प्रकारों की आवश्यकता होगी।

उपलब्ध `requiredCharTypes` हैं: `['number', 'symbol', 'lower', 'upper']`

उपलब्ध विकल्प (ऑब्जेक्ट गुणों के रूप में पारित):

नाम       | प्रकार  | विवरण                     | डिफ़ॉल्ट मान
----------|-------|---------------------------|-----------
`verbose` | बूलियन | कंसोल/टर्मिनल में लॉगिंग दिखाएँ। | `true`

#

### `validateStrength(password[, options])`

पासवर्ड की ताकत को सत्यापित करता है, एक ऑब्जेक्ट लौटाता है जिसमें:
- `strengthScore` (0–100)
- `recommendations` सरणी
- `isGood` बूलियन (`true` अगर `strengthScore` >= 80) 

उदाहरण:

```js
const pwStrength = pw.validateStrength('Aa?idsE');
console.log(pwStrength);

/* आउटपुट:

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

उपलब्ध विकल्प (ऑब्जेक्ट गुणों के रूप में पारित):

नाम       | प्रकार  | विवरण                     | डिफ़ॉल्ट मान
----------|-------|---------------------------|-----------
`verbose` | बूलियन | कंसोल/टर्मिनल में लॉगिंग दिखाएँ। | `true`

#

### `generate*()` फ़ंक्शंस के लिए उपलब्ध विकल्प

आउटपुट इनमें से किसी को भी प्रत्येक `generate*()` फ़ंक्शन के लिए विकल्प ऑब्जेक्ट में पारित किया जा सकता है:

नाम                   | प्रकार  | विवरण                                                       | डिफ़ॉल्ट मान
----------------------|-------|-------------------------------------------------------------|-------------
`verbose`             | बूलियन | कंसोल/टर्मिनल में लॉगिंग दिखाएँ।                                   | `true`
`length`              | पूर्णांक  | पासवर्ड की लंबाई।                                              | `8`
`qty`*                | पूर्णांक  | उत्पन्न करने के लिए पासवर्ड की संख्या।                              | `1`
`charset`             | स्ट्रिंग   | पासवर्ड में शामिल किये जाने वाले अक्षर।                              | `''`
`exclude`             | स्ट्रिंग   | पासवर्ड से बाहर किये जाने वाले अक्षर।                               | `''`
`numbers`             | बूलियन | पासवर्ड में नंबरों की अनुमति दें।                                    | `false`
`symbols`             | बूलियन | पासवर्ड में प्रतीकों की अनुमति दें।                                   | `false`
`lowercase`           | बूलियन | पासवर्ड में छोटे अक्षरों को अनुमति दें।                                | `true`
`uppercase`           | बूलियन | पासवर्ड में बड़े अक्षरों को अनुमति दें।                                | `true`
`excludeSimilarChars` | बूलियन | पासवर्ड में समान अक्षर (उदा. o,0,O,i,l,1,\|) हटा दें।               | `false`
`strict`              | बूलियन | पासवर्ड में प्रत्येक अनुमत वर्ण सेट से कम से कम एक वर्ण की आवश्यकता है। | `false`

##### _*केवल [`generatePassword([options])`](#generatepasswordoptions) में उपलब्ध है क्योंकि [`generatePasswords(qty[, option])`](#generatepasswordsqty-options) एक `qty` तर्क लेता है_

<br>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/aqua-gradient.png?v=0d36e26">

## 💻 कमांड लाइन उपयोग

[वैश्विक स्तर पर](#-%E0%A4%87%E0%A4%82%E0%A4%B8%E0%A5%8D%E0%A4%9F%E0%A4%BE%E0%A4%B2%E0%A5%87%E0%A4%B6%E0%A4%A8) स्थापित होने पर, **generate-pw** का उपयोग कमांड लाइन से भी किया जा सकता है। मूल आदेश है:

```
$ generate-pw
```

<img src="https://media.generatepw.org/images/screenshots/cli/generate-pw-cmd-output.png?0d36e26">

#

### कमांड लाइन विकल्प

```
पैरामीटर विकल्प:
 --length=n                  n लंबाई का पासवर्ड जनरेट करें।
 --qty=n                     n पासवर्ड उत्पन्न करें।
 --charset=chars             पासवर्ड में केवल chars शामिल करें।
 --exclude=chars             पासवर्ड से chars को बाहर निकालें।

बूलियन विकल्प:
 -n, --include-numbers       पासवर्ड में नंबरों की अनुमति दें।
 -y, --include-symbols       पासवर्ड में प्रतीकों की अनुमति दें।
 -L, --no-lowercase          पासवर्ड में छोटे अक्षरों को अनुमति न दें।
 -U, --no-uppercase          पासवर्ड में बड़े अक्षरों को अनुमति न दें।
 -S, --no-similar            पासवर्ड में समान वर्णों को बाहर निकालें।
 -s, --strict                पासवर्ड में सेट किए गए प्रत्येक अनुमत वर्ण में से कम से कम एक वर्ण की आवश्यकता है।
 -q, --quiet                 त्रुटियों को छोड़कर सभी लॉगिंग को रोकें।

जानकारी आदेश:
 -h, --help                  सहायता स्क्रीन प्रदर्शित करें।
 -v, --version               संस्करण संख्या दिखाएँ।
```

<br>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/aqua-gradient.png?v=0d36e26">

# 🏛️ MIT लाइसेंस

**कॉपीराइट © 2024–2025 [एडम लुई (Adam Lui)](https://github.com/adamlui) और योगदानकर्ता**

इसके द्वारा प्रति प्राप्त करने वाले किसी भी व्यक्ति को अनुमति निःशुल्क प्रदान की जाती है इस सॉफ़्टवेयर और संबंधित दस्तावेज़ फ़ाइलों ("सॉफ़्टवेयर") से निपटने के लिए सॉफ़्टवेयर में बिना किसी प्रतिबंध के, जिसमें बिना किसी सीमा के अधिकार शामिल हैं उपयोग करना, प्रतिलिपि बनाना, संशोधित करना, विलय करना, प्रकाशित करना, वितरित करना, उपलाइसेंस देना और/या बेचना सॉफ़्टवेयर की प्रतियां, और उन व्यक्तियों को अनुमति देना जिनके पास सॉफ़्टवेयर है निम्नलिखित शर्तों के अधीन, ऐसा करने के लिए सुसज्जित:

उपरोक्त कॉपीराइट नोटिस और यह अनुमति नोटिस सभी में शामिल होंगे सॉफ़्टवेयर की प्रतियां या पर्याप्त भाग।

सॉफ़्टवेयर "जैसा है" प्रदान किया जाता है, बिना किसी प्रकार की, स्पष्ट या वारंटी के। निहित, व्यापारिकता की वारंटी सहित, लेकिन इन्हीं तक सीमित नहीं, किसी विशेष उद्देश्य के लिए उपयुक्तता और उल्लंघन न होना। किसी भी स्थिति में ऐसा नहीं होगा लेखक या कॉपीराइट धारक किसी भी दावे, क्षति या अन्य के लिए उत्तरदायी होंगे दायित्व, चाहे किसी अनुबंध, अपकृत्य या किसी अन्य प्रकार से उत्पन्न हो, सॉफ़्टवेयर से बाहर या उसके संबंध में या उपयोग या अन्य लेनदेन में सॉफ़्टवेयर।

<br>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/aqua-gradient.png?v=0d36e26">

## 🛠️ संबंधित उपयोगिताएँ

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://media.generate-ip.org/images/icons/node-graph/white/icon55x49.png?b4eb06e"><img height=21 src="https://media.generate-ip.org/images/icons/node-graph/black/icon55x49.png?b4eb06e"></picture> [generate-ip](https://js-utils.org/generate-ip) &nbsp;<a href="https://github.com/toolleeo/cli-apps#networking"><img height=18 src="https://assets.js-utils.org/images/badges/awesome/badge.svg?v=0d36e26"></a>

> IPv4 + IPv6 + MAC पतों को बेतरतीब ढंग से उत्पन्न, प्रारूपित और मान्य करें।
<br>[स्थापित करना](https://docs.generate-ip.org/#-installation) /
[रीडमी](https://docs.generate-ip.org/#readme) /
[एपीआई उपयोग](https://docs.generate-ip.org/#-api-usage) /
[सीएलआई उपयोग](https://docs.generate-ip.org/#-command-line-usage) /
[चर्चा करना](https://github.com/adamlui/js-utils/discussions)

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://media.geolocatejs.org/images/icons/wire-globe/white/icon32.png?0d36e26"><img height=22 src="https://media.geolocatejs.org/images/icons/wire-globe/black/icon32.png?0d36e26"></picture> [geolocate](https://js-utils.org/geolocate) &nbsp;<a href="https://github.com/toolleeo/cli-apps#networking"><img height=18 src="https://assets.js-utils.org/images/badges/awesome/badge.svg?v=0d36e26"></a>

> सीएलआई से आईपी जियोलोकेशन डेटा प्राप्त करें।
<br>[स्थापित करना](https://docs.geolocatejs.org/#-installation) /
[रीडमी](https://docs.geolocatejs.org/#readme) /
[सीएलआई उपयोग](https://docs.geolocatejs.org/#-command-line-usage) /
[एपीआई उपयोग](https://docs.geolocatejs.org/#-api-usage) /
[चर्चा करना](https://github.com/adamlui/js-utils/discussions)

<br>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/aqua-gradient.png?v=0d36e26">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://assets.js-utils.org/images/icons/home/white/icon32x27.png?v=0d36e26"><img height=13 src="https://assets.js-utils.org/images/icons/home/dark-gray/icon32x27.png?v=0d36e26"></picture> <a href="https://js-utils.org">**अधिक जावास्क्रिप्ट उपयोगिताएँ**</a> /
<a href="https://github.com/adamlui/js-utils/discussions">चर्चा करना</a> /
<a href="#-generate-pw">वापस शीर्ष पर ↑</a>
