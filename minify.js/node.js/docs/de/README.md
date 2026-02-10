<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://assets.minify-js.org/images/icons/earth/white/icon32.svg?v=ad67551">
            <img height=14 src="https://assets.minify-js.org/images/icons/earth/black/icon32.svg?v=ad67551">
        </picture>
        &nbsp;Deutsch |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn#readme">简体中文</a> |
        <a href="../zh-tw#readme">繁體中文</a> |
        <a href="../hi#readme">हिंदी</a> |
        <a href="../bn#readme">বাংলা</a> |
        <a href="../mr#readme">मराठी</a> |
        <a href="../pa#readme">ਪੰਜਾਬੀ</a> |
        <a href="../es#readme">Español</a> |
        <a href="../fr#readme">Français</a>
    </h6>
</div>

<a id="top"></a>

# </> minify.js

### Verklein alle JavaScript-bestanden recursief.

<a href="https://www.npmjs.com/package/@adamlui/minify.js">
    <img height=31 src="https://img.shields.io/npm/dm/%40adamlui%2Fminify.js?label=Herunterladungen&logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-lizenz">
    <img height=31 src="https://img.shields.io/badge/Lizenz-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/minify.js/releases/tag/node-v2.3.0">
    <img height=31 src="https://img.shields.io/badge/Neueste_Version-2.3.0-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/minify.js?activeTab=code">
    <img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fminify.js?label=Ausgepackte%20Gr%C3%B6%C3%9Fe&style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_minify.js:node.js/src/minify.js">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_minify.js%3Anode.js%2Fsrc%2Fminify.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Schwachstellen&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#programming">
    <img height=31 src="https://img.shields.io/badge/Erwähnt_in-Awesome-ff69b4?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img src="https://cdn.jsdelivr.net/gh/adamlui/minify.js@3d56890/node.js/media/images/screenshots/cli/minify-js-docs-cmd-output.png">

<br>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

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

<a href="https://github.com/sponsors/adamlui"><img src="https://assets.minify-js.org/images/banners/sponsor/$10/banner1660x260.png?v=63bbeed"></a>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

## 💻 Verwendung der Befehlszeile

Der grundlegende **globale Befehl** lautet:

```
$ minify-js
```

**📝 Hinweis:** Übergeben Sie `-n` oder `--dry-run`, um nur zu sehen, welche Dateien verarbeitet werden.

#

So geben Sie **Eingabe-/Ausgabepfade** an:

```
$ minify-js [eingabepfad] [ausgabepfad]
```

- `[eingabepfad]`: Pfad zur JS-Datei oder zum Verzeichnis, das die zu minimierenden JS-Dateien enthält, relativ zum aktuellen Arbeitsverzeichnis.
- `[ausgabepfad]`: Pfad zur Datei oder zum Verzeichnis, in dem die minimierten Dateien gespeichert werden sollen, relativ zum Eingabeverzeichnis (falls nicht angegeben, wird „min/“ verwendet).

**📝 Hinweis:** Wenn Ordner übergeben werden, werden Dateien rekursiv verarbeitet, es sei denn, `-R` oder `--no-recursion` wird übergeben.

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

Minimieren Sie alle JavaScript-Dateien in einem **bestimmten Verzeichnis** (Ausgaben in `min/pfad/zu/ihrem/verzeichnis/min/`):

```
$ minify-js pfad/zu/ihrem/verzeichnis
```

Minimieren Sie eine **bestimmte Datei** (Ausgaben an `min/pfad/zu/ihrem/min/datei.min.js`):

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
Boolesche Optionen:
 -n, --dry-run                        Minimieren Sie die Datei(en) nicht wirklich, sondern zeigen Sie nur an, ob sie verarbeitet werden.
 -d, --include-dotfolders             Beziehen Sie Punktordner in die Dateisuche ein.
 -D, --include-dotfiles               Beziehen Sie Punktdateien in die Dateisuche ein.
 -R, --no-recursion                   Deaktivieren Sie die rekursive Dateisuche.
 -M, --no-mangle                      Deaktivieren Sie das Verstümmeln von Namen.
 -X, --no-filename-change             Deaktivieren Sie die Änderung der Dateierweiterung in .min.js
 -i, --rewrite-imports                Aktualisieren Sie die Importpfade von .js auf .min.js
 -c, --copy                           Kopieren Sie minimierten Code in die Zwischenablage, anstatt ihn in eine Datei zu schreiben, wenn eine einzelne Quelldatei verarbeitet wird.
 -r, --relative-output                Die Ausgabedateien werden relativ zu jeder Quelldatei anstatt zum Eingabeverzeichnis gespeichert.
 -q, --quiet                          Unterdrücken Sie alle Protokolle außer Fehlern.

Parameteroptionen:
 --ignores="dir/,file1.js,file2.js"   Dateien/Verzeichnisse, die von der Minimierung ausgeschlossen werden sollen.
 --comment="kommentar"                Kopfzeilenkommentar dem minimierten Code voranstellen. Mit '\n' zeilenweise trennen.
 --ui-lang="code"                     ISO 639-1-Code der Sprache, in der die Benutzeroberfläche angezeigt werden soll.
 --config="path/to/file"              Benutzerdefinierte Konfigurationsdatei laden.

Befehle:
     --init                           Konfigurationsdatei erstellen (im Projektstammverzeichnis).
 -h, --help                           Hilfebildschirm anzeigen.
 -v, --version                        Versionsnummer anzeigen.
```

#

### Konfigurationsdatei

**minify.js** kann mithilfe einer Datei namens `minify.config.mjs` oder `minify.config.js` im Projektstammverzeichnis angepasst werden.

Beispiel für Standardeinstellungen:

```js
export default {
    dryRun: false,            // Die Datei(en) nicht tatsächlich minimieren, sondern nur anzeigen, ob sie verarbeitet werden
    includeDotFolders: false, // Punktordner in die Dateisuche einbeziehen
    includeDotFiles: false,   // Punktdateien in die Dateisuche einbeziehen
    noRecursion: false,       // Rekursive Dateisuche deaktivieren
    noMangle: false,          // Namensverschleierung deaktivieren
    noFilenameChange: false,  // Ändern der Dateierweiterung in .min.js deaktivieren
    rewriteImports: false,    // Importpfade von .js in .min.js aktualisieren
    copy: false,              // Minimierten Code in die Zwischenablage kopieren, anstatt in eine Datei zu schreiben (bei Verarbeitung einer einzelnen Datei)
    relativeOutput: false,    // Ausgabedateien relativ zur jeweiligen Quelldatei ausgeben, anstatt zum Eingabestammverzeichnis
    quietMode: false,         // Alle Protokollmeldungen außer Fehlern unterdrücken
    ignores: '',              // Zu minimierende Dateien/Verzeichnisse ausschließen
    comment: ''               // Kopfzeilenkommentar, der dem minimierten Code vorangestellt wird
}
```

💡 Führen Sie `minify-js init` aus, um eine Vorlage für die `minify.config.mjs` in Ihrem Projektstammverzeichnis zu erstellen.

<br>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

## 🔌 API-Nutzung

Sie können auch **minify.js** in Ihre App importieren, um deren API-Methoden zu verwenden, sowohl als ECMAScript-Modul als auch als CommonJS-Modul.

#### ESM*:

```js
import minifyJS from '@adamlui/minify.js'
```

#### CJS:

```js
const minifyJS = require('@adamlui/minify.js')
```

###### _*Node.js Version 14 oder höher erforderlich_

#

### `minify(eingang[, optionen])`

💡 Minimiert JavaScript-Code basierend auf der bereitgestellten Zeichenfolgeneingabe.

Wenn **Quellcode** übergeben wird, wird dieser direkt minimiert, dann wird ein Objekt zurückgegeben, das `srcPath` + `code` + `error` enthält:

```js
const srcCode = 'function add(first, second) { return first + second }',
      minErgebnis = minifyJS.minify(srcCode)

console.log(minErgebnis.error) // gibt einen Laufzeitfehler oder `undefined` aus, wenn kein Fehler vorliegt
console.log(minErgebnis.code)  // gibt minimiertes JS aus: 'function add(n,d){return n+d}'
```

Wenn ein **Dateipfad** übergeben wird, wird der Code der Datei geladen und dann minimiert, wodurch ein Objekt wie oben zurückgegeben wird.

Wenn ein **Verzeichnispfad** übergeben wird, wird nach JavaScript-Dateien gesucht (standardmäßig rekursiv), der Code jeder Datei wird geladen und dann minimiert, dann wird ein Array von Objekten zurückgegeben, die `srcPath` + `code` + `error` enthalten:

```js
// Gibt Pfade zu Quell-JS-Dateien im Arbeitsverzeichnis + allen verschachtelten Verzeichnissen aus
const minErgebnisse = minifyJS.minify('.')
minErgebnisse.forEach(ergebnis => console.log(ergebnis.srcPath))

// Gibt minimierten Code der zweiten JS-Datei aus, wenn er gefunden wird, oder `undefined`, wenn er nicht gefunden wird
console.log(minErgebnisse[1].code)
```

Optionen sind boolesche Werte und werden als Objekteigenschaften übergeben. Zum Beispiel:

```js
// Gibt ein Array von Datenobjekten zurück, in denen auch Punktdateien verarbeitet werden, wenn `eingang` ein Pfad ist
minifyJS.minify(eingang, { dotFiles: true })
```

Verfügbare Parameter (und ihre Standardeinstellungen) sind:

Name             | Typ             | Beschreibung                                                                                      | Standardwert
-----------------|-----------------|------------------------------------------------------------------------------------------------ ---|--------------
`recursive`      | Boolescher Wert | Rekursive Suche nach verschachtelten Dateien, wenn der Verzeichnispfad übergeben wird.            | `true`
`verbose`        | Boolescher Wert | Anmeldung in Konsole/Terminal anzeigen.                                                           | `true`
`dotFolders`     | Boolescher Wert | Beziehen Sie Punktordner in die Dateisuche ein.                                                   | `false`
`dotFiles`       | Boolescher Wert | Beziehen Sie Punktdateien in die Dateisuche ein.                                                  | `false`
`mangle`         | Boolescher Wert | Variablennamen kürzen (normalerweise auf ein Zeichen).                                            | `true`
`rewriteImports` | Boolescher Wert | Importpfade von .js auf .min.js aktualisieren.                                                    | `false`
`relativeOutput` | Boolescher Wert | Die Ausgabedateien werden relativ zu jeder Quelldatei anstatt zum Eingabeverzeichnis gespeichert. | `false`
`ignores`        | Array           | Dateien/Verzeichnisse, die von der Minimierung ausgeschlossen werden sollen.                      | `[]`
`comment`        | Zeichenfolge    | Header-Kommentar, der dem minimierten Code vorangestellt wird. Mit „\n“ zeilenweise trennen.      | `''`

#

### `findJS(suchverzeichnis[, optionen])`

💡 Sucht nach allen nicht minimierten JavaScript-Dateien innerhalb der übergebenen Zeichenfolge `suchverzeichnis` (nützlich, um herauszufinden, welche Dateien [`minify()`](#minifyeingang-optionen) verarbeiten werden) und gibt ein Array mit ihren Dateipfaden zurück.

Optionen sind boolesche Werte und werden als Objekteigenschaften übergeben. Zum Beispiel:

```js
// Suche nach nicht minimierten JS-Dateien genau in assets/js
const suchergEbnisse = minifyJS.findJS('assets/js', { recursive: false })
console.log(suchergEbnisse)

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

Name          | Typ             | Beschreibung                                                                    | Standardwert
--------------|-----------------|---------------------------------------------------------------------------------|--------------
`recursive`   | Boolescher Wert | Rekursive Suche nach verschachtelten Dateien im übergebenen searchDir.          | `true`
`verbose`     | Boolescher Wert | Anmeldung in Konsole/Terminal anzeigen.                                         | `true`
`dotFolders`  | Boolescher Wert | Beziehen Sie Punktordner in die Dateisuche ein.                                 | `false`
`dotFiles`    | Boolescher Wert | Beziehen Sie Punktdateien in die Dateisuche ein.                                | `false`
`ignores`     | Array           | Dateien/Verzeichnisse, die von der Minimierung ausgeschlossen werden sollen.    | `[]`

<br>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

## 🏛️ MIT-Lizenz

**Urheberrechte © 2023–2026 [Adam Lui](https://github.com/adamlui) und Mitwirkende**

Hiermit wird jeder Person, die eine Kopie dieser Software und der zugehörigen Dokumentationsdateien (die „Software“) erhält, kostenlos die Erlaubnis erteilt, mit der Software ohne Einschränkung zu handeln, einschließlich und ohne Einschränkung der Rechte zur Nutzung, zum Kopieren, Ändern und Zusammenführen , Kopien der Software zu veröffentlichen, zu verteilen, unterzulizenzieren und/oder zu verkaufen und Personen, denen die Software zur Verfügung gestellt wird, dies zu gestatten, vorbehaltlich der folgenden Bedingungen:

Der obige Urheberrechtshinweis und dieser Genehmigungshinweis müssen in allen Kopien oder wesentlichen Teilen der Software enthalten sein.

DIE SOFTWARE WIRD „WIE BESEHEN“ ZUR VERFÜGUNG GESTELLT, OHNE JEGLICHE AUSDRÜCKLICHE ODER STILLSCHWEIGENDE GEWÄHRLEISTUNG, EINSCHLIESSLICH, ABER NICHT BESCHRÄNKT AUF DIE GEWÄHRLEISTUNG DER MARKTGÄNGIGKEIT, EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND NICHTVERLETZUNG. IN KEINEM FALL SIND DIE AUTOREN ODER URHEBERRECHTSINHABER HAFTBAR FÜR JEGLICHE ANSPRÜCHE, SCHÄDEN ODER ANDERE HAFTUNG, WEDER AUS EINER VERTRAGLICHEN HANDLUNG, AUS HANDLUNG ODER ANDERWEITIG, DIE SICH AUS, AUS ODER IN ZUSAMMENHANG MIT DER SOFTWARE ODER DER NUTZUNG ODER ANDEREN HANDELN IN DER SOFTWARE ERGEBEN SOFTWARE.

<br>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

## 🛠️ Verwandte Dienstprogramme

### [</> minify.js (Gulp)](https://github.com/adamlui/minify.js/tree/main/gulp/) &nbsp;<a href="https://github.com/toolleeo/cli-apps#programming"><img height=18 src="https://assets.minify-js.org/images/badges/awesome/badge.svg?v=63bbeed"></a>

> Gulp-Plug-in zur rekursiven Minimierung aller JavaScript-Dateien.
<br>[Installieren](https://github.com/adamlui/minify.js/tree/main/gulp/#-installation) /
[Liesmich](https://github.com/adamlui/minify.js/tree/main/gulp/#readme) /
[Diskutieren](https://github.com/adamlui/minify.js/discussions)

### [{ } scss-to-css](https://scsstocss.org) &nbsp;<a href="https://github.com/toolleeo/cli-apps#conversion"><img height=18 src="https://assets.minify-js.org/images/badges/awesome/badge.svg?v=63bbeed"></a>

> Kompilieren Sie alle SCSS-Dateien rekursiv in minimiertes CSS.
<br>[Installieren](https://node.scsstocss.org/#-installation) /
[Liesmich](https://node.scsstocss.org/#readme) /
[CLI-Nutzung](https://node.scsstocss.org/#-command-line-usage) /
[API-Nutzung](https://node.scsstocss.org/#-api-usage) /
[Diskutieren](https://github.com/adamlui/scss-to-css/discussions)

<br>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://assets.minify-js.org/images/icons/home/white/icon32x27.png?v=ad67551"><img height=13 src="https://assets.minify-js.org/images/icons/home/dark-gray/icon32x27.png?v=ad67551"></picture> <a href="https://js-utils.org">**Weitere JavaScript-Dienstprogramme**</a> /
<a href="https://github.com/adamlui/minify.js/discussions">Diskutieren</a> /
<a href="#top">Zurück nach oben ↑</a>
