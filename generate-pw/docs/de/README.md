<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/white/icon32.svg">
            <img height=14 src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/black/icon32.svg">
        </picture>
        &nbsp;Deutsch |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn#readme">简体中文</a> |
        <a href="../zh-tw#readme">繁體中文</a> |
        <a href="../hi#readme">हिंदी</a> |
        <a href="../bn#readme">বাংলা</a> |
        <a href="../es#readme">Español</a>
    </h6>
</div>

# > generate-pw

### Generieren, stärken und validieren Sie kryptografisch sichere Passwörter nach dem Zufallsprinzip.

<a href="#%EF%B8%8F-mit-lizenz"><img height=31 src="https://img.shields.io/badge/Lizenz-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/generate-pw-1.4.5"><img height=31 src="https://img.shields.io/badge/Neueste_Version-1.4.5-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/generate-pw?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/generate-pw?label=Ausgepackte%20Gr%C3%B6%C3%9Fe&style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://github.com/adamlui/js-utils/blob/generate-pw-1.4.5/generate-pw/dist/generate-pw.min.js"><img height=31 src="https://img.shields.io/github/size/adamlui/js-utils/generate-pw/dist/generate-pw.min.js?branch=generate-pw-1.4.5&label=Minimierte%20Gr%C3%B6%C3%9Fe&logo=databricks&logoColor=white&labelColor=464646&color=ff69b4&style=for-the-badge"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:generate-pw/src/generate-pw.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Agenerate-pw%2Fsrc%2Fgenerate-pw.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Schwachstellen&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#password-managers"><img height=31 src="https://img.shields.io/badge/Erwähnt_in-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 💡 Um

**generate-pw** ist eine leichte, benutzerfreundliche Bibliothek, die es Ihnen ermöglicht, kryptografisch sichere Passwörter nach dem Zufallsprinzip zu generieren, zu stärken und zu validieren.

- **Keine externen Abhängigkeiten –** Nur integrierte Kryptomethoden für sichere Randomisierung
- **Hochgradig anpassbar —** Geben Sie Länge, Menge, zu verwendende Zeichensätze usw. an.
- **Unterstützung für mehrere Umgebungen —** Verwendung in Node.js oder im Webbrowser
- **Befehlszeile verwendbar —** Geben Sie einfach `generate-pw` ein, fertig

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## ⚡ Installation

Als **globales Dienstprogramm**:

```
$ npm install -g generate-pw
```

Als **Laufzeitabhängigkeit** aus Ihrem Projektstammverzeichnis:

```
$ npm install generate-pw
```

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🔌 Importieren der API

### <img height=18 src="https://i.imgur.com/JIeAdsr.png"> Node.js

#### ECMAScript*:

```js
import * as pw from 'generate-pw';
```

#### CommonJS:

```js
const pw = require('generate-pw');
```

###### _*Node.js Version 14 oder höher erforderlich_

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://i.imgur.com/JSEb19A.png"><img width=16 src="https://i.imgur.com/5VPxf9y.png"></picture> Web

#### <> HTML-Skript-Tag:

```html
<script src="https://cdn.jsdelivr.net/npm/generate-pw@1.4.5/dist/generate-pw.min.js"></script>
```

#### ES6:

```js
(async () => {
    await import('https://cdn.jsdelivr.net/npm/generate-pw@1.4.5/dist/generate-pw.min.js');
    // Ihr Code hier...
})();
```

### <img height=17 src="https://raw.githubusercontent.com/KudoAI/chatgpt.js/main/starters/media/images/icons/tampermonkey-icon28.png"><img height=17.5 src="https://raw.githubusercontent.com/KudoAI/chatgpt.js/main/starters/media/images/icons/violentmonkey-icon100.png"> Greasemonkey

```js
...
// @require https://cdn.jsdelivr.net/npm/generate-pw@1.4.5/dist/generate-pw.min.js
// ==/UserScript==

// Ihr Code hier...
```

<br>

**💡 Hinweis:** Um immer die neueste Version zu importieren (in der Produktion nicht empfohlen!), entfernen Sie das Versions-Tag `@1.4.5` aus der jsDelivr-URL: `https://cdn.jsdelivr.net/npm/generate-pw/dist/generate-pw.min.js`

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 📋 API-Nutzung

### `generatePassword([optionen])`

Erzeugt **ein** Passwort, wenn die Option `qty` nicht angegeben ist, und gibt eine Zeichenfolge zurück:

```js
const passwort = pw.generatePassword({ length: 11, numbers: true });
console.log(passwort); // beispielausgabe: 'bAsZm3mq6Qn'
```

...oder **mehrere** Passwörter, wenn die Option `qty` angegeben ist, was ein Array von Zeichenfolgen zurückgibt:

```js
const passwörter = pw.generatePassword({ qty: 5, length: 8, symbols: true });
console.log(passwörter);

/* beispielausgabe:

generatePassword() » Generating passwords...
generatePassword() » Passwords generated!
generatePassword() » Check returned array.
[ '!zSf@Q.s', '!,HT\\;m=', '?Lq&FV>^', 'gf}Y;}Ne', 'Stsx(GqE' ]
*/
```

**💡 Hinweis:** Wenn keine Optionen übergeben werden, sind Passwörter 8 Zeichen lang und bestehen aus Groß-/Kleinbuchstaben.

Siehe: [Verfügbare Optionen](#verfügbare-optionen-für-generate-funktionen)

#

### `generatePasswords(qty[, optionen])`

Erzeugt **mehrere** Passwörter basierend auf der angegebenen `qty` und gibt ein Array von Zeichenfolgen zurück:

```js
const passwörter = pw.generatePasswords(5, { length: 3, uppercase: false });
console.log(passwörter);

/* beispielausgabe:

generatePasswords() » Generating passwords...
generatePasswords() » Passwords generated!
generatePasswords() » Check returned array.
[ 'yilppxru', 'ckvkyjfp', 'zolcpyfb' ]
*/
```

**💡 Hinweis:** Wenn kein `qty`-Argument übergeben wird, wird nur ein Passwort generiert und als String zurückgegeben.

Siehe: [Verfügbare Optionen](#verfügbare-optionen-für-generate-funktionen)

#

### `strictify(passwort[, erfZeichentypen, optionen])`

Ändert das angegebene `passwort`, um mindestens ein Zeichen jedes übergebenen `erfZeichentypen`-Elements zu verwenden, und gibt eine Zeichenfolge zurück:

```js
const striktPW = pw.strictify('abcdef', ['numbers', 'symbols']);
console.log(striktPW); // beispielausgabe: 'a!c2ef'
```

**💡 Hinweis:** Wenn kein Array `erfZeichentypen` übergeben wird, sind alle verfügbaren Typen erforderlich.

Verfügbare `erfZeichentypen` sind: `['number', 'symbol', 'lower', 'upper']`

Verfügbare Optionen (als Objekteigenschaften übergeben):

Name      | Geben Sie       | ein Beschreibung                         | Standardwert
----------|-----------------|------------------------------------------|--------------
`verbose` | Boolescher Wert | Protokolle in Konsole/Terminal anzeigen. | `true`

#

### `validateStrength(passwort[, optionen])`

Validiert die Stärke eines Passworts und gibt ein Objekt zurück, das Folgendes enthält:
- `strengthScore` (0–100)
- `recommendations` array
- `isGood` Boolescher Wert (`true` wenn `strengthScore` >= 80) 

Beispiel:

```js
const pwStärke = pw.validateStrength('Aa?idsE');
console.log(pwStärke);

/* ausgaben:

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

Verfügbare Optionen (als Objekteigenschaften übergeben):

Name      | Geben Sie       | ein Beschreibung                         | Standardwert
----------|-----------------|------------------------------------------|--------------
`verbose` | Boolescher Wert | Protokolle in Konsole/Terminal anzeigen. | `true`

#

### Verfügbare Optionen für `generate*()`-Funktionen

Jede davon kann für jede `generate*()`-Funktion an das Optionsobjekt übergeben werden:

Name                  | Geben Sie       | ein Beschreibung                                                                  | Standardwert
----------------------|-----------------|-----------------------------------------------------------------------------------|--------------
`verbose`             | Boolescher Wert | Protokolle in Konsole/Terminal anzeigen.                                          | `true`
`length`              | Ganze Zahl      | Länge des/der Passwort(s).                                                        | `8`
`qty`*                | Ganze Zahl      | Anzahl der zu generierenden Passwörter.                                           | `1`
`charset`             | Zeichenfolge    | In Passwörter aufzunehmende Zeichen.                                              | `''`
`exclude`             | Zeichenfolge    | Von Passwörtern auszuschließende Zeichen.                                         | `''`
`numbers`             | Boolescher Wert | Zahlen in Passwörtern zulassen.                                                   | `false`
`symbols`             | Boolescher Wert | Erlaube Symbole in Passwörtern.                                                   | `false`
`lowercase`           | Boolescher Wert | Erlauben Sie Kleinbuchstaben in Passwörtern.                                      | `true`
`uppercase`           | Boolescher Wert | Erlauben Sie Großbuchstaben in Passwörtern.                                       | `true`
`excludeSimilarChars` | Boolescher Wert | Schließen Sie ähnliche Zeichen (z. B. o,0,O,i,l,1,|) in Passwörtern aus.          | `false`
`strict`              | Boolescher Wert | Erfordern mindestens ein Zeichen aus jedem zulässigen Zeichensatz in Passwörtern. | `false`

##### _*Nur verfügbar in [`generatePassword([optionen])`](#generatepasswordoptionen), da [`generatePasswords(qty[, optionen])`](#generatepasswordsqty-optionen) ein `qty`-Argument annimmt_

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 💻 Verwendung der Befehlszeile

Bei [globaler](#-installation) Installation kann **generate-pw** auch über die Befehlszeile verwendet werden. Der Grundbefehl lautet:

```
$ generate-pw
```

**💡 Hinweis:** Aus Sicherheitsgründen werden generierte Passwörter in der Zwischenablage gespeichert.

#

### Befehlszeilenoptionen

```
Parameteroptionen:
 --length=n                  Generieren Sie Passwörter mit der Länge n.
 --qty=n                     Generieren Sie n Passwörter.
 --charset=zeich             Passwörter dürfen nur zeich enthalten.
 --exclude=zeich             Schließen Sie zeich aus Passwörtern aus.

Boolesche Optionen:
 -n, --include-numbers       Zahlen in Passwörtern zulassen.
 -y, --include-symbols       Erlaube Symbole in Passwörtern.
 -L, --no-lowercase          Kleinbuchstaben in Passwörtern nicht zulassen.
 -U, --no-uppercase          Großbuchstaben in Passwörtern nicht zulassen.
 -S, --no-similar            Schließen Sie ähnliche Zeichen in Passwörtern aus.
 -s, --strict                Erfordern mindestens ein Zeichen aus jedem zulässigen Zeichensatz in Passwörtern.
 -q, --quiet                 Unterdrücken Sie alle Protokolle außer Fehlern.

Info-Befehle:
 -h, --help                  Hilfebildschirm anzeigen.
 -v, --version               Versionsnummer anzeigen.
```

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🏛️ MIT-Lizenz

**Urheberrechte © 2024 [Adam Lui](https://github.com/adamlui) und Mitwirkende**

Hiermit wird jeder Person, die eine Kopie dieser Software und der zugehörigen Dokumentationsdateien (die „Software“) erhält, kostenlos die Erlaubnis erteilt, mit der Software ohne Einschränkung zu handeln, einschließlich und ohne Einschränkung der Rechte zur Nutzung, zum Kopieren, Ändern und Zusammenführen , Kopien der Software zu veröffentlichen, zu verteilen, unterzulizenzieren und/oder zu verkaufen und Personen, denen die Software zur Verfügung gestellt wird, dies zu gestatten, vorbehaltlich der folgenden Bedingungen:

Der obige Urheberrechtshinweis und dieser Genehmigungshinweis müssen in allen Kopien oder wesentlichen Teilen der Software enthalten sein.

DIE SOFTWARE WIRD „WIE BESEHEN“ ZUR VERFÜGUNG GESTELLT, OHNE JEGLICHE AUSDRÜCKLICHE ODER STILLSCHWEIGENDE GEWÄHRLEISTUNG, EINSCHLIESSLICH, ABER NICHT BESCHRÄNKT AUF DIE GEWÄHRLEISTUNG DER MARKTGÄNGIGKEIT, EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND NICHTVERLETZUNG. IN KEINEM FALL SIND DIE AUTOREN ODER URHEBERRECHTSINHABER HAFTBAR FÜR JEGLICHE ANSPRÜCHE, SCHÄDEN ODER ANDERE HAFTUNG, WEDER AUS EINER VERTRAGLICHEN HANDLUNG, AUS HANDLUNG ODER ANDERWEITIG, DIE SICH AUS, AUS ODER IN ZUSAMMENHANG MIT DER SOFTWARE ODER DER NUTZUNG ODER ANDEREN HANDELN IN DER SOFTWARE ERGEBEN SOFTWARE.

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🛠️ Verwandte Dienstprogramme

### <img height=21px src="https://i.imgur.com/kvf7fXm.png"> [generate-ip](https://js-utils.com/generate-ip) <a href="https://github.com/toolleeo/cli-apps#networking"><img height=18 src="https://awesome.re/mentioned-badge.svg"></a>

> Generieren, formatieren und validieren Sie IPv4/IPv6-Adressen nach dem Zufallsprinzip.
<br>[Installieren](https://github.com/adamlui/js-utils/tree/main/generate-ip#-installation) /
[Liesmich](https://github.com/adamlui/js-utils/tree/main/generate-ip#readme) /
[API-Nutzung](https://github.com/adamlui/js-utils/tree/main/generate-ip#-api-usage) /
[CLI-Nutzung](https://github.com/adamlui/js-utils/tree/main/generate-ip#-command-line-usage) /
[Diskutieren](https://js-utils.com/discussions)

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/geolocate/media/images/icons/wire-globe/white/icon32.png"><img height=22 src="https://raw.githubusercontent.com/adamlui/js-utils/main/geolocate/media/images/icons/wire-globe/black/icon32.png"></picture> [geolocate](https://js-utils.com/geolocate)

> Rufen Sie IP-Geolocation-Daten von der CLI ab.
<br>[Installieren](https://github.com/adamlui/js-utils/tree/main/geolocate#-installation) /
[Liesmich](https://github.com/adamlui/js-utils/tree/main/geolocate#readme) /
[CLI-Nutzung](https://github.com/adamlui/js-utils/tree/main/geolocate#-command-line-usage) /
[API-Nutzung](https://github.com/adamlui/js-utils/tree/main/geolocate#-api-usage) /
[Diskutieren](https://js-utils.com/discussions)

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/media/images/icons/home/white/icon32x27.png"><img height=13 src="https://raw.githubusercontent.com/adamlui/js-utils/main/media/images/icons/home/dark-gray/icon32x27.png"></picture> <a href="https://js-utils.com">**Weitere JavaScript-Dienstprogramme**</a> /
<a href="https://js-utils.com/discussions">Diskutieren</a> /
<a href="#-generate-pw">Zurück nach oben ↑</a>
