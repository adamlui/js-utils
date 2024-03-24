<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/white/icon32.svg">
            <img height=14 src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/black/icon32.svg">
        </picture>
        &nbsp;हिंदी |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn#readme">简体中文</a> |
        <a href="../zh-tw#readme">繁體中文</a> |
        <a href="../bn#readme">বাংলা</a>
    </h6>
</div>

# > generate-pw

### क्रिप्टोग्राफ़िक रूप से सुरक्षित पासवर्ड यादृच्छिक रूप से उत्पन्न करें।

<a href="#%EF%B8%8F-mit-लाइसेंस"><img height=31 src="https://img.shields.io/badge/License-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/generate-pw-1.2.1"><img height=31 src="https://img.shields.io/badge/Latest_Build-1.2.1-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/generate-pw?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/generate-pw?style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:generate-pw/generate-pw.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Agenerate-pw%2Fgenerate-pw.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilities&color=gold"></a>

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

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

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🔌 एपीआई उपयोग

**generate-pw** को आपके ऐप में ईसीएमएस्क्रिप्ट मॉड्यूल या कॉमनजेएस मॉड्यूल के रूप में आयात किया जा सकता है।

#### ESM:

```js
import * as pw from 'generate-pw';
```

#### CJS:

```js
const pw = require('generate-pw');
```

#

### `generatePassword([options])`

यदि `qty` विकल्प नहीं दिया गया है तो **एक** पासवर्ड जेनरेट करता है, एक स्ट्रिंग लौटाता है:

```js
const password = pw.generatePassword({ length: 11, numbers: true });
console.log(password);
// नमूना आउटपुट: 'bAsZm3mq6Qn'
```

...या **एकाधिक** पासवर्ड यदि `qty` विकल्प दिया गया है, तो स्ट्रिंग्स की एक सरणी लौटाएं:

```js
const passwords = pw.generatePassword({ qty: 5, length: 8, symbols: true });
console.log(passwords);
// नमूना आउटपुट: [ '!zSf@Q.s', '!,HT\\;m=', '?Lq&FV>^', 'gf}Y;}Ne', 'Stsx(GqE' ]
```

**💡 नोट:** यदि कोई विकल्प नहीं चुना जाता है, तो पासवर्ड 8-अक्षर लंबा होगा, जिसमें अपर/लोअर केस अक्षर शामिल होंगे।

देखना: [उपलब्ध विकल्प](#generate-फ़ंक्शंस-के-लिए-उपलब्ध-विकल्प)

#

### `generatePasswords(qty[, options])`

दिए गए `qty` के आधार पर **एकाधिक** पासवर्ड उत्पन्न करता है, स्ट्रिंग की एक सरणी लौटाता है:

```js
const passwords = pw.generatePasswords(5, { length: 3, uppercase: false });
console.log(passwords);
// नमूना आउटपुट: [ 'yilppxru', 'ckvkyjfp', 'zolcpyfb' ]
```

**💡 नोट:** यदि कोई `qty` तर्क पारित नहीं किया गया है, तो केवल एक पासवर्ड उत्पन्न किया जाएगा, एक स्ट्रिंग के रूप में लौटाया जाएगा।

देखना: [उपलब्ध विकल्प](#generate-फ़ंक्शंस-के-लिए-उपलब्ध-विकल्प)

#

### `strictify(password[, requiredCharTypes])`

प्रत्येक `requiredCharTypes` तत्व के कम से कम एक वर्ण का उपयोग करने के लिए दिए गए `password` को संशोधित करता है, एक स्ट्रिंग लौटाता है:

```js
const password = 'abcdef',
      strictPW = pw.strictify(password, ['numbers', 'symbols']);

console.log(strictPW);
// नमूना आउटपुट: 'a!c2ef'
```

उपलब्ध `requiredCharTypes` हैं: `['number', 'symbol', 'lower', 'upper']`

**💡 नोट:** यदि कोई `requiredCharTypes` सरणी पारित नहीं की गई है, तो सभी उपलब्ध प्रकारों की आवश्यकता होगी।

#

### `validateStrength(password)`

पासवर्ड की ताकत को सत्यापित करता है, एक ऑब्जेक्ट लौटाता है जिसमें:
- `strengthScore` (0–100)
- `recommendations` सरणी
- `isGood` बूलियन (`true` अगर `strengthScore` >= 80) 

उदाहरण:

```js
const password = 'AawiddsE',
      pwStrength = pw.validateStrength(password);

console.log(pwStrength);

/* आउटपुट:

{
  strengthScore: 60,
  recommendations: [ 'Include at least one number.', 'Include at least one symbol.' ],
  isGood: false
}
*/
```

#

### `generate*()` फ़ंक्शंस के लिए उपलब्ध विकल्प

आउटपुट इनमें से किसी को भी प्रत्येक `generate*()` फ़ंक्शन के लिए विकल्प ऑब्जेक्ट में पारित किया जा सकता है:

नाम         | प्रकार   | विवरण                                                          | डिफ़ॉल्ट मान
------------|---------|----------------------------------------------------------------|-------------
`length`    | पूर्णांक | पासवर्ड की लंबाई।                                                  | `8`
`qty`*      | पूर्णांक | उत्पन्न करने के लिए पासवर्ड की संख्या।                                | `1`
`charset`   | स्ट्रिंग  | पासवर्ड में शामिल किये जाने वाले अक्षर।                                | `''`
`exclude`   | स्ट्रिंग  | पासवर्ड से बाहर किये जाने वाले अक्षर।                                 | `''`
`numbers`   | बूलियन | पासवर्ड में नंबरों की अनुमति दें।                                        | `false`
`symbols`   | बूलियन | पासवर्ड में प्रतीकों की अनुमति दें।                                      | `false`
`lowercase` | बूलियन | पासवर्ड में छोटे अक्षरों को अनुमति दें।                                  | `true`
`uppercase` | बूलियन | पासवर्ड में बड़े अक्षरों को अनुमति दें।                                   | `true`
`strict`    | बूलियन | पासवर्ड में प्रत्येक अनुमत वर्ण सेट से कम से कम एक वर्ण की आवश्यकता है। | `false`

##### _*केवल [`generatePassword([options])`](#generatepasswordoptions) में उपलब्ध है क्योंकि [`generatePasswords(qty[, option])`](#generatepasswordsqty-options) एक `qty` तर्क लेता है_

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 💻 कमांड लाइन उपयोग

[वैश्विक स्तर पर](#-%E0%A4%87%E0%A4%82%E0%A4%B8%E0%A5%8D%E0%A4%9F%E0%A4%BE%E0%A4%B2%E0%A5%87%E0%A4%B6%E0%A4%A8) स्थापित होने पर, **generate-pw** का उपयोग कमांड लाइन से भी किया जा सकता है। मूल आदेश है:

```
$ generate-pw
```

**💡 नोट:** सुरक्षा कारणों से, जेनरेट किए गए पासवर्ड क्लिपबोर्ड में संग्रहीत किए जाते हैं।

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
 -s, --include-symbols       पासवर्ड में प्रतीकों की अनुमति दें।
 -L, --no-lowercase          पासवर्ड में छोटे अक्षरों को अनुमति न दें।
 -U, --no-uppercase          पासवर्ड में बड़े अक्षरों को अनुमति न दें।

जानकारी आदेश:
 -h, --help                  सहायता स्क्रीन प्रदर्शित करें।
 -v, --version               संस्करण संख्या दिखाएँ।
```

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

# 🏛️ MIT लाइसेंस

**कॉपीराइट © 2024 [एडम लुई (Adam Lui)](https://github.com/adamlui)**

इसके द्वारा प्रति प्राप्त करने वाले किसी भी व्यक्ति को अनुमति निःशुल्क प्रदान की जाती है इस सॉफ़्टवेयर और संबंधित दस्तावेज़ फ़ाइलों ("सॉफ़्टवेयर") से निपटने के लिए सॉफ़्टवेयर में बिना किसी प्रतिबंध के, जिसमें बिना किसी सीमा के अधिकार शामिल हैं उपयोग करना, प्रतिलिपि बनाना, संशोधित करना, विलय करना, प्रकाशित करना, वितरित करना, उपलाइसेंस देना और/या बेचना सॉफ़्टवेयर की प्रतियां, और उन व्यक्तियों को अनुमति देना जिनके पास सॉफ़्टवेयर है निम्नलिखित शर्तों के अधीन, ऐसा करने के लिए सुसज्जित:

उपरोक्त कॉपीराइट नोटिस और यह अनुमति नोटिस सभी में शामिल होंगे सॉफ़्टवेयर की प्रतियां या पर्याप्त भाग।

सॉफ़्टवेयर "जैसा है" प्रदान किया जाता है, बिना किसी प्रकार की, स्पष्ट या वारंटी के। निहित, व्यापारिकता की वारंटी सहित, लेकिन इन्हीं तक सीमित नहीं, किसी विशेष उद्देश्य के लिए उपयुक्तता और उल्लंघन न होना। किसी भी स्थिति में ऐसा नहीं होगा लेखक या कॉपीराइट धारक किसी भी दावे, क्षति या अन्य के लिए उत्तरदायी होंगे दायित्व, चाहे किसी अनुबंध, अपकृत्य या किसी अन्य प्रकार से उत्पन्न हो, सॉफ़्टवेयर से बाहर या उसके संबंध में या उपयोग या अन्य लेनदेन में सॉफ़्टवेयर।

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

<a href="https://github.com/adamlui/js-utils">**घर**</a> /
<a href="https://github.com/adamlui/js-utils/discussions">चर्चा करना</a> /
<a href="#-generate-pw">वापस शीर्ष पर ↑</a>
