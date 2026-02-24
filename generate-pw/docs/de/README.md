<a id="top"></a>

<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://assets.js-utils.org/images/icons/earth/white/icon32.svg?v=7c33be0">
            <img height=14 src="https://assets.js-utils.org/images/icons/earth/black/icon32.svg?v=7c33be0">
        </picture>
        &nbsp;Deutsch |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn#readme">简体中文</a> |
        <a href="../zh-tw#readme">繁體中文</a> |
        <a href="../hi#readme">हिंदी</a> |
        <a href="../bn#readme">বাংলা</a> |
        <a href="../es#readme">Español</a> |
        <a href="../fr#readme">Français</a>
    </h6>
</div>

# > generate-pw

### Generieren, stärken und validieren Sie kryptografisch sichere Passwörter nach dem Zufallsprinzip.

<a href="https://www.npmjs.com/package/generate-pw">
    <img height=31 src="https://img.shields.io/npm/dm/generate-pw?label=Herunterladungen&logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-lizenz">
    <img height=31 src="https://img.shields.io/badge/Lizenz-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/generate-pw-2.1.2">
    <img height=31 src="https://img.shields.io/badge/Neueste_Version-2.1.2-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/generate-pw?activeTab=code">
    <img height=31 src="https://img.shields.io/npm/unpacked-size/generate-pw?label=Ausgepackte%20Gr%C3%B6%C3%9Fe&style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="#">
    <img height=31 src="https://img.shields.io/bundlejs/size/generate-pw%402.1.2?label=Minimierte%20Gr%C3%B6%C3%9Fe&logo=databricks&logoColor=white&labelColor=464646&color=ff69b4&style=for-the-badge"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:generate-pw/src/generate-pw.js">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Agenerate-pw%2Fsrc%2Fgenerate-pw.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Schwachstellen&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#password-managers">
    <img height=31 src="https://img.shields.io/badge/Erwähnt_in-Awesome-ff69b4?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<br>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/aqua-gradient.png?v=0d36e26">

## 💡 Um

**generate-pw** ist eine leichte, benutzerfreundliche Bibliothek, die es Ihnen ermöglicht, kryptografisch sichere Passwörter nach dem Zufallsprinzip zu generieren, zu stärken und zu validieren.

- **Keine externen Abhängigkeiten –** Nur integrierte Kryptomethoden für sichere Randomisierung
- **Hochgradig anpassbar —** Geben Sie Länge, Menge, zu verwendende Zeichensätze usw. an.
- **Unterstützung für mehrere Umgebungen —** Verwendung in Node.js oder im Webbrowser
- **Befehlszeile verwendbar —** Geben Sie einfach `generate-pw` ein, fertig

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/aqua-gradient.png?v=0d36e26">

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

<a href="https://github.com/sponsors/adamlui"><img src="https://assets.js-utils.org/images/banners/sponsor/$10/banner1660x260.png?v=0d36e26"></a>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/aqua-gradient.png?v=0d36e26">

## 🔌 Importieren der API

### <img height=18 src="https://assets.js-utils.org/images/icons/platforms/node.js/icon25x28.png?v=0d36e26"> Node.js

#### ECMAScript*:

```js
import pw from 'generate-pw'
```

#### CommonJS:

```js
const pw = require('generate-pw')
```

###### _*Node.js Version 14 oder höher erforderlich_

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://assets.js-utils.org/images/icons/platforms/web/light/icon25.png?v=0d36e26"><img width=16 src="https://assets.js-utils.org/images/icons/platforms/web/dark/icon25.png?v=0d36e26"></picture> Web

#### <> HTML-Skript-Tag:

```html
<script src="https://cdn.jsdelivr.net/npm/generate-pw@2.1.2/dist/generate-pw.min.js"></script>
```

#### ES6:

```js
(async () => {
    await import('https://cdn.jsdelivr.net/npm/generate-pw@2.1.2/dist/generate-pw.min.js')
    // Ihr Code hier...
})()
```

### <img height=17 src="https://assets.js-utils.org/images/icons/platforms/tampermonkey/icon28.png?v=0d36e26"><img height=17.5 src="https://assets.js-utils.org/images/icons/platforms/violentmonkey/icon25.png?v=0d36e26"> Greasemonkey

```js
...
// @require https://cdn.jsdelivr.net/npm/generate-pw@2.1.2/dist/generate-pw.min.js
// ==/UserScript==

// Ihr Code hier...
```

<br>

**💡 Hinweis:** Um immer die neueste Version zu importieren (in der Produktion nicht empfohlen!), entfernen Sie das Versions-Tag `@2.1.2` aus der jsDelivr-URL: `https://cdn.jsdelivr.net/npm/generate-pw/dist/generate-pw.min.js`

<br>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/aqua-gradient.png?v=0d36e26">

## 📋 API-Nutzung

### `generatePassword([optionen])`

Erzeugt **ein** Passwort, wenn die Option `qty` nicht angegeben ist, und gibt eine Zeichenfolge zurück:

```js
const passwort = pw.generatePassword({ length: 11, numbers: true })
console.log(passwort) // beispielausgabe: 'bAsZm3mq6Qn'
```

...oder **mehrere** Passwörter, wenn die Option `qty` angegeben ist, was ein Array von Zeichenfolgen zurückgibt:

```js
const passwörter = pw.generatePassword({ qty: 5, length: 8, symbols: true })
console.log(passwörter)

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
const passwörter = pw.generatePasswords(5, { length: 3, uppercase: false })
console.log(passwörter)

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
const striktPW = pw.strictify('abcdef', ['numbers', 'symbols'])
console.log(striktPW) // beispielausgabe: 'a!c2ef'
```

**💡 Hinweis:** Wenn kein Array `erfZeichentypen` übergeben wird, sind alle verfügbaren Typen erforderlich.

Verfügbare `erfZeichentypen` sind: `['numbers', 'symbols', 'lower', 'upper']`

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
const pwStärke = pw.validateStrength('Aa?idsE')
console.log(pwStärke)

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
`qty`                 | Ganze Zahl      | Anzahl der zu generierenden Passwörter.                                           | `1`
`strength`            | Zeichenfolge    | `<'weak'\|'basic'\|'strong'>` Stärke-Voreinstellung anwenden.                     | `''`
`charset`             | Zeichenfolge    | In Passwörter aufzunehmende Zeichen.                                              | `''`
`exclude`             | Zeichenfolge    | Von Passwörtern auszuschließende Zeichen.                                         | `''`
`numbers`             | Boolescher Wert | Zahlen in Passwörtern zulassen.                                                   | `false`
`symbols`             | Boolescher Wert | Erlaube Symbole in Passwörtern.                                                   | `false`
`lowercase`           | Boolescher Wert | Erlauben Sie Kleinbuchstaben in Passwörtern.                                      | `true`
`uppercase`           | Boolescher Wert | Erlauben Sie Großbuchstaben in Passwörtern.                                       | `true`
`similarChars`        | Boolescher Wert | Verwenden Sie ähnliche Zeichen (z. B. o, 0, O, i, l, 1, |) in den Passwörtern.    | `false`
`strict`              | Boolescher Wert | Erfordern mindestens ein Zeichen aus jedem zulässigen Zeichensatz in Passwörtern. | `true`
`entropy`             | Boolescher Wert | Berechnen/protokollieren Sie die geschätzte Entropie.                             | `true`

##### _*Nur verfügbar in [`generatePassword([optionen])`](#generatepasswordoptionen), da [`generatePasswords(qty[, optionen])`](#generatepasswordsqty-optionen) ein `qty`-Argument annimmt_

<br>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/aqua-gradient.png?v=0d36e26">

## 💻 Verwendung der Befehlszeile

Bei [globaler](#-installation) Installation kann **generate-pw** auch über die Befehlszeile verwendet werden. Der Grundbefehl lautet:

```
$ generate-pw
```

<img src="https://media.generatepw.org/images/screenshots/cli/generate-pw-cmd-output.png?0d36e26">

#

### Befehlszeilenoptionen

```
Parameteroptionen:
 --length=n                  Generieren Sie Passwörter mit der Länge n.
 --qty=n                     Generieren Sie n Passwörter.
 --charset=zeich             Passwörter dürfen nur zeich enthalten.
 --exclude=zeich             Schließen Sie zeich aus Passwörtern aus.
 --ui-lang="code"            ISO 639-1-Code der Sprache, in der die Benutzeroberfläche angezeigt werden soll.
 --config="path/to/file"     Benutzerdefinierte Konfigurationsdatei laden.

Boolesche Optionen:
 -w, --weak                  Schwache(s) Passwort(e) generieren.
 -b, --basic                 Passwörter mit mittlerer Stärke generieren.
 -t, --strong                Starke Passwörter generieren.
 -N, --no-numbers            Verwenden Sie keine Zahlen in den Passwörtern.
 -Y, --no-symbols            Verwenden Sie keine Sonderzeichen in den Passwörtern.
 -L, --no-lowercase          Kleinbuchstaben in Passwörtern nicht zulassen.
 -U, --no-uppercase          Großbuchstaben in Passwörtern nicht zulassen.
 -s, --similar-chars         Verwenden Sie ähnliche Zeichen in den Passwörtern.
 -S, --unstrict              Es ist nicht erforderlich, dass Passwörter mindestens ein Zeichen aus jedem zulässigen Zeichensatz enthalten.
 -E, --no-entropy            Berechnen/protokollieren Sie die geschätzte Entropie.
 -q, --quiet                 Unterdrücken Sie alle Protokolle außer Fehlern.

Befehle:
 -i, --init                  Konfigurationsdatei erstellen (im Projektstammverzeichnis).
 -h, --help                  Hilfebildschirm anzeigen.
 -v, --version               Versionsnummer anzeigen.
     --stats                 npm-Statistiken anzeigen.
```

#

### Konfigurationsdatei

**generate-pw** kann mithilfe einer Datei namens `generate-pw.config.mjs` oder `generate-pw.config.js` im Projektstammverzeichnis angepasst werden.

Beispiel für Standardeinstellungen:

```js
export default {
    length: 12,                 // Länge der zu generierenden Passwörter
    qty: 1,                     // Anzahl der zu generierenden Passwörter
    strength: '',               // <'weak'|'basic'|'strong'> Stärke-Voreinstellung anwenden
    charset: '',                // Nur die angegebenen Zeichen in den Passwörtern verwenden
    exclude: '',                // Die angegebenen Zeichen von den Passwörtern ausschließen
    excludeNums: false,         // Zahlen in Passwörtern sind nicht erlaubt
    excludeSymbols: false,      // Symbole in den Passwörtern zulassen
    excludeLowerChars: false,   // Sonderzeichen in Passwörtern sind nicht erlaubt
    excludeUpperChars: false,   // Großbuchstaben in den Passwörtern ausschließen
    similarChars: false,        // Verwenden Sie ähnliche Zeichen in den Passwörtern
    unstrict: false,            // Es ist nicht erforderlich, dass Passwörter mindestens ein Zeichen aus jedem zulässigen Zeichensatz enthalten
    noEntropy: false,           // Geschätzte Entropie berechnen/protokollieren
    quietMode: false            // Alle Protokollmeldungen außer Fehlern unterdrücken
}
```

💡 Führen Sie `generate-pw init` aus, um eine Vorlage für die `generate-pw.config.mjs` in Ihrem Projektstammverzeichnis zu erstellen.

<br>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/aqua-gradient.png?v=0d36e26">

## 🏛️ MIT-Lizenz

**Urheberrechte © 2024–2026 [Adam Lui](https://github.com/adamlui) und Mitwirkende**

Hiermit wird jeder Person, die eine Kopie dieser Software und der zugehörigen Dokumentationsdateien (die „Software“) erhält, kostenlos die Erlaubnis erteilt, mit der Software ohne Einschränkung zu handeln, einschließlich und ohne Einschränkung der Rechte zur Nutzung, zum Kopieren, Ändern und Zusammenführen , Kopien der Software zu veröffentlichen, zu verteilen, unterzulizenzieren und/oder zu verkaufen und Personen, denen die Software zur Verfügung gestellt wird, dies zu gestatten, vorbehaltlich der folgenden Bedingungen:

Der obige Urheberrechtshinweis und dieser Genehmigungshinweis müssen in allen Kopien oder wesentlichen Teilen der Software enthalten sein.

DIE SOFTWARE WIRD „WIE BESEHEN“ ZUR VERFÜGUNG GESTELLT, OHNE JEGLICHE AUSDRÜCKLICHE ODER STILLSCHWEIGENDE GEWÄHRLEISTUNG, EINSCHLIESSLICH, ABER NICHT BESCHRÄNKT AUF DIE GEWÄHRLEISTUNG DER MARKTGÄNGIGKEIT, EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND NICHTVERLETZUNG. IN KEINEM FALL SIND DIE AUTOREN ODER URHEBERRECHTSINHABER HAFTBAR FÜR JEGLICHE ANSPRÜCHE, SCHÄDEN ODER ANDERE HAFTUNG, WEDER AUS EINER VERTRAGLICHEN HANDLUNG, AUS HANDLUNG ODER ANDERWEITIG, DIE SICH AUS, AUS ODER IN ZUSAMMENHANG MIT DER SOFTWARE ODER DER NUTZUNG ODER ANDEREN HANDELN IN DER SOFTWARE ERGEBEN SOFTWARE.

<br>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/aqua-gradient.png?v=0d36e26">

## 🛠️ Verwandte Dienstprogramme

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://media.generate-ip.org/images/icons/node-graph/white/icon55x49.png?b4eb06e"><img height=21 src="https://media.generate-ip.org/images/icons/node-graph/black/icon55x49.png?b4eb06e"></picture> [generate-ip](https://js-utils.org/generate-ip) &nbsp;<a href="https://github.com/toolleeo/cli-apps#networking"><img height=18 src="https://assets.js-utils.org/images/badges/awesome/badge.svg?v=0d36e26"></a>

> Generieren, formatieren und validieren Sie IPv4 + IPv6 + MAC-Adressen nach dem Zufallsprinzip.
<br>[Installieren](https://docs.generate-ip.org/#-installation) /
[Liesmich](https://docs.generate-ip.org/#readme) /
[API-Nutzung](https://docs.generate-ip.org/#-api-usage) /
[CLI-Nutzung](https://docs.generate-ip.org/#-command-line-usage) /
[Diskutieren](https://github.com/adamlui/js-utils/discussions)

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://media.geolocatejs.org/images/icons/wire-globe/white/icon32.png?0d36e26"><img height=22 src="https://media.geolocatejs.org/images/icons/wire-globe/black/icon32.png?0d36e26"></picture> [geolocate](https://js-utils.org/geolocate) &nbsp;<a href="https://github.com/toolleeo/cli-apps#networking"><img height=18 src="https://assets.js-utils.org/images/badges/awesome/badge.svg?v=0d36e26"></a>

> Rufen Sie IP-Geolocation-Daten von der CLI ab.
<br>[Installieren](https://docs.geolocatejs.org/#-installation) /
[Liesmich](https://docs.geolocatejs.org/#readme) /
[CLI-Nutzung](https://docs.geolocatejs.org/#-command-line-usage) /
[API-Nutzung](https://docs.geolocatejs.org/#-api-usage) /
[Diskutieren](https://github.com/adamlui/js-utils/discussions)

<br>

<img height=6px width="100%" src="https://assets.js-utils.org/images/separators/aqua-gradient.png?v=0d36e26">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://assets.js-utils.org/images/icons/home/white/icon32x27.png?v=0d36e26"><img height=13 src="https://assets.js-utils.org/images/icons/home/dark-gray/icon32x27.png?v=0d36e26"></picture> <a href="https://js-utils.org">**Weitere JavaScript-Dienstprogramme**</a> /
<a href="https://github.com/adamlui/js-utils/discussions">Diskutieren</a> /
<a href="#top">Zurück nach oben ↑</a>
