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
        <a href="../mr#readme">मराठी</a> |
        <a href="../pa#readme">ਪੰਜਾਬੀ</a>
    </h6>
</div>

# </> minify.js

### Verklein alle JavaScript-bestanden recursief.

<a href="https://www.npmjs.com/package/@adamlui/minify.js"><img height=31 src="https://img.shields.io/npm/dt/%40adamlui%2Fminify.js?label=Herunterladungen&logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-lizenz"><img height=31 src="https://img.shields.io/badge/Lizenz-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/minify.js-1.4.7"><img height=31 src="https://img.shields.io/badge/Neueste_Version-1.4.7-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/minify.js?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fminify.js?label=Ausgepackte%20Gr%C3%B6%C3%9Fe&style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:minify.js/minify.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Aminify.js%2Fminify.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Schwachstellen&color=gold"></a>

<img src="https://github.com/adamlui/js-utils/blob/main/minify.js/media/images/minify.js-docs-demo.png">

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## ⚡ Installation

Als **globales Dienstprogramm**:

```
$ npm install -g @adamlui/minify.js
```

Als **Entwicklerabhängigkeit** (z.B. für Build-Skripte) aus Ihrem Projektstammverzeichnis:

```
$ npm install -D @adamlui/minify.js
```

Als **Entwicklerabhängigkeit** (z.B. für Build-Skripte) aus Ihrem Projektstammverzeichnis:

```
$ npm install @adamlui/minify.js
```

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 💻 Verwendung der Befehlszeile

Der grundlegende **globale Befehl** lautet:

```
$ minify-js
```

**💡 Hinweis:** Übergeben Sie `-n` oder `--dry-run`, um nur zu sehen, welche Dateien verarbeitet werden.

#

So geben Sie **Eingabe-/Ausgabepfade** an:

```
$ minify-js [eingabepfad] [ausgabepfad]
```

- `[eingabepfad]`: Pfad zur JS-Datei oder zum Verzeichnis, das die zu minimierenden JS-Dateien enthält, relativ zum aktuellen Arbeitsverzeichnis.
- `[ausgabepfad]`: Pfad zur Datei oder zum Verzeichnis, in dem minimierte Dateien gespeichert werden, relativ zum ursprünglichen Dateispeicherort (falls nicht angegeben, wird `min/`` verwendet).

**💡 Hinweis:** Wenn Ordner übergeben werden, werden Dateien rekursiv verarbeitet, es sei denn, `-R` oder `--no-recursion` wird übergeben.

#

Zur Verwendung als **Paketskript** in der `package.json` Ihres Projekts:

```json
  "scripts": {
    "build:js": "<minify-js-cmd>"
  },
```

Ersetzen Sie `<minify-js-cmd>` durch `minify-js` + optionale Argumente. Anschließend kann `npm run build:js` verwendet werden, um den Befehl auszuführen.

#

### Beispielbefehle

Minimieren Sie alle JavaScript-Dateien im **aktuellen Verzeichnis** (Ausgaben in `min/`):

```
$ minify-js
```

Minimieren Sie alle JavaScript-Dateien in einem **bestimmten Verzeichnis** (Ausgaben in `pfad/zu/ihrem/verzeichnis/min/`):

```
$ minify-js pfad/zu/ihrem/verzeichnis
```

Minimieren Sie eine **bestimmte Datei** (Ausgaben an `pfad/zu/ihrem/min/datei.min.js`):

```
$ minify-js pfad/zu/ihrem/datei.js
```

Geben Sie sowohl **Eingabe- als auch Ausgabeverzeichnisse** an (Ausgaben in `ausgabeordner/`):

```
$ minify-js eingabeordner ausgabeordner
```

#

### Befehlszeilenoptionen

```
Konfigurationsoptionen:
 -n, --dry-run               Minimieren Sie die Datei(en) nicht wirklich, sondern zeigen Sie nur an, ob sie verarbeitet werden.
 -d, --include-dotfolders    Beziehen Sie Punktordner in die Dateisuche ein.
 -D, --include-dotfiles      Beziehen Sie Punktdateien in die Dateisuche ein.
 -R, --no-recursion          Deaktivieren Sie die rekursive Dateisuche.
 -M, --no-mangle             Deaktivieren Sie das Verstümmeln von Namen.
 -q, --quiet                 Unterdrücken Sie alle Protokolle außer Fehlern.

Info-Befehle:
 -h, --help                  Hilfebildschirm anzeigen.
 -v, --version               Versionsnummer anzeigen.
```

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🔌 API-Nutzung

Sie können auch **minify.js** in Ihre App importieren, um deren API-Methoden zu verwenden, sowohl als ECMAScript-Modul als auch als CommonJS-Modul.

#### ESM:

```js
import * as minifyJS from '@adamlui/minify.js';
```

#### CJS:

```js
const minifyJS = require('@adamlui/minify.js');
```

#

### `minify(eingang[, optionen])`

Minimiert JavaScript-Code basierend auf der bereitgestellten Zeichenfolgeneingabe.

Wenn **Quellcode** übergeben wird, wird dieser direkt minimiert, dann wird ein Objekt zurückgegeben, das `srcPath` + `code` + `error` enthält:

```js
const srcCode = 'function add(first, second) { return first + second; }',
      minErgebnis = minifyJS.minify(srcCode);

console.log(minErgebnis.error); // gibt einen Laufzeitfehler oder `undefined` aus, wenn kein Fehler vorliegt
console.log(minErgebnis.code);  // gibt minimiertes JS aus: function add(n,d){return n+d}
```

Wenn ein **Dateipfad** übergeben wird, wird der Code der Datei geladen und dann minimiert, wodurch ein Objekt wie oben zurückgegeben wird.

Wenn ein **Verzeichnispfad** übergeben wird, wird nach JavaScript-Dateien gesucht (standardmäßig rekursiv), der Code jeder Datei wird geladen und dann minimiert, dann wird ein Array von Objekten zurückgegeben, die `srcPath` + `code` + `error` enthalten:

```js
// Gibt Pfade zu Quell-JS-Dateien im Arbeitsverzeichnis + allen verschachtelten Verzeichnissen aus
const minErgebnisse = minifyJS.minify('.');
minErgebnisse.forEach(ergebnis => console.log(ergebnis.srcPath));

// Gibt minimierten Code der zweiten JS-Datei aus, wenn er gefunden wird, oder `undefined`, wenn er nicht gefunden wird
console.log(minErgebnisse[1].code);
```

Optionen sind boolesche Werte und werden als Objekteigenschaften übergeben. Zum Beispiel:

```js
// Gibt ein Datenobjekt zurück, in dem Punktdateien auch verarbeitet werden, wenn `eingang` ein Pfad ist
minifyJS.minify(eingang, { dotFiles: true });
```

Verfügbare Parameter (und ihre Standardeinstellungen) sind:

Name         | Beschreibung                                                                           | Standardwert
-------------|----------------------------------------------------------------------------------------|--------------
`recursive`  | Rekursive Suche nach verschachtelten Dateien, wenn der Verzeichnispfad übergeben wird. | `true`
`verbose`    | Anmeldung in Konsole/Terminal anzeigen.                                                | `true`
`dotFolders` | Beziehen Sie Punktordner in die Dateisuche ein.                                  | `false`
`dotFiles`   | Beziehen Sie Punktdateien in die Dateisuche ein.                                        | `false`
`mangle`     | Variablennamen kürzen (normalerweise auf ein Zeichen).                                 | `true`

#

### `findJS(suchverzeichnis[, optionen])`

Sucht nach allen nicht minimierten JavaScript-Dateien innerhalb der übergebenen Zeichenfolge `suchverzeichnis` (nützlich, um herauszufinden, welche Dateien [`minify()`](#minifyeingang-optionen) verarbeiten werden) und gibt ein Array mit ihren Dateipfaden zurück.

Optionen sind boolesche Werte und werden als Objekteigenschaften übergeben. Zum Beispiel:

```js
// Suche nach nicht minimierten JS-Dateien genau in assets/js:
const suchergEbnisse = minifyJS.findJS('assets/js', { recursive: false });
console.log(suchergEbnisse);

/* Beispielausgabe:

findJS() » Searching for unminified JS files...
findJS() » Search complete! 2 files found.
findJS() » Check returned array.
[
  'E:\\js\\utils\\minify.js\\assets\\js\\foo.js',
  'E:\\js\\utils\\minify.js\\assets\\js\\bar.js'
]
*/
```

Verfügbare Parameter (und ihre Standardeinstellungen) sind:

Name         | Beschreibung                                                                           | Standardwert
-------------|----------------------------------------------------------------------------------------|--------------
`recursive`  | Rekursive Suche nach verschachtelten Dateien, wenn der Verzeichnispfad übergeben wird. | `true`
`verbose`    | Anmeldung in Konsole/Terminal anzeigen.                                                | `true`
`dotFolders` | Beziehen Sie Punktordner in die Dateisuche ein.                                  | `false`
`dotFiles`   | Beziehen Sie Punktdateien in die Dateisuche ein.                                        | `false`

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

## 🏛️ MIT-Lizenz

**Urheberrechte © 2023–2024 [Adam Lui](https://github.com/adamlui) und Mitwirkende**

Hiermit wird jeder Person, die eine Kopie dieser Software und der zugehörigen Dokumentationsdateien (die „Software“) erhält, kostenlos die Erlaubnis erteilt, mit der Software ohne Einschränkung zu handeln, einschließlich und ohne Einschränkung der Rechte zur Nutzung, zum Kopieren, Ändern und Zusammenführen , Kopien der Software zu veröffentlichen, zu verteilen, unterzulizenzieren und/oder zu verkaufen und Personen, denen die Software zur Verfügung gestellt wird, dies zu gestatten, vorbehaltlich der folgenden Bedingungen:

Der obige Urheberrechtshinweis und dieser Genehmigungshinweis müssen in allen Kopien oder wesentlichen Teilen der Software enthalten sein.

DIE SOFTWARE WIRD „WIE BESEHEN“ ZUR VERFÜGUNG GESTELLT, OHNE JEGLICHE AUSDRÜCKLICHE ODER STILLSCHWEIGENDE GEWÄHRLEISTUNG, EINSCHLIESSLICH, ABER NICHT BESCHRÄNKT AUF DIE GEWÄHRLEISTUNG DER MARKTGÄNGIGKEIT, EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND NICHTVERLETZUNG. IN KEINEM FALL SIND DIE AUTOREN ODER URHEBERRECHTSINHABER HAFTBAR FÜR JEGLICHE ANSPRÜCHE, SCHÄDEN ODER ANDERE HAFTUNG, WEDER AUS EINER VERTRAGLICHEN HANDLUNG, AUS HANDLUNG ODER ANDERWEITIG, DIE SICH AUS, AUS ODER IN ZUSAMMENHANG MIT DER SOFTWARE ODER DER NUTZUNG ODER ANDEREN HANDELN IN DER SOFTWARE ERGEBEN SOFTWARE.

<br>

<img height=6px width="100%" src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/aqua-separator.png">

<a href="https://github.com/adamlui/js-utils">**Heim**</a> /
<a href="https://github.com/adamlui/js-utils/discussions">Diskutieren</a> /
<a href="#-minifyjs">Zurück nach oben ↑</a>
