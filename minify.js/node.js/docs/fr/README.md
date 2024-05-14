<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://media.minify-js.org/images/icons/earth/white/icon32.svg?d07ee82">
            <img height=14 src="https://media.minify-js.org/images/icons/earth/black/icon32.svg?d07ee82">
        </picture>
        &nbsp;Français |
        <a href="http://github.minify-js.org/tree/main/node.js/#readme">English</a> |
        <a href="http://github.minify-js.org/tree/main/node.js/docs/zh-cn/#readme">简体中文</a> |
        <a href="http://github.minify-js.org/tree/main/node.js/docs/zh-tw/#readme">繁體中文</a> |
        <a href="http://github.minify-js.org/tree/main/node.js/docs/hi/#readme">हिंदी</a> |
        <a href="http://github.minify-js.org/tree/main/node.js/docs/bn/#readme">বাংলা</a> |
        <a href="http://github.minify-js.org/tree/main/node.js/docs/mr/#readme">मराठी</a> |
        <a href="http://github.minify-js.org/tree/main/node.js/docs/pa/#readme">ਪੰਜਾਬੀ</a> |
        <a href="http://github.minify-js.org/tree/main/node.js/docs/de/#readme">Deutsch</a> |
        <a href="http://github.minify-js.org/tree/main/node.js/docs/es/#readme">Español</a>
    </h6>
</div>

# </> minify.js

### Réduisez de manière récursive tous les fichiers JavaScript.

<a href="https://www.npmjs.com/package/@adamlui/minify.js"><img height=31 src="https://img.shields.io/npm/dm/%40adamlui%2Fminify.js?label=T%C3%A9l%C3%A9chargements&logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-licence-mit"><img height=31 src="https://img.shields.io/badge/Licence-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/minify.js/releases/tag/node-v1.7.0"><img height=31 src="https://img.shields.io/badge/Dernière_Version-1.7.0-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/minify.js?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fminify.js?label=Taille%20D%C3%A9ball%C3%A9e&style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_minify.js:node.js/src/minify.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_minify.js%3Anode.js%2Fsrc%2Fminify.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vuln%C3%A9rabilit%C3%A9s&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#programming"><img height=31 src="https://img.shields.io/badge/Mentionné_dans-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://minify-js.org"><img height=31 src="https://img.shields.io/badge/web-minify--js.org-lightgrey?logo=dribbble&logoColor=white&labelColor=464646&style=for-the-badge&label=Toile"></a>

<img src="https://cdn.jsdelivr.net/gh/adamlui/minify.js@3d56890/node.js/media/images/screenshots/cli/minify-js-docs-cmd-output.png">

<br>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

## ⚡ Installation

En tant qu'**utilitaire global**:

```
$ npm install -g @adamlui/minify.js
```

En tant que **dépendance de développeur** (par exemple pour les scripts de build), à partir de la racine de votre projet:

```
$ npm install -D @adamlui/minify.js
```

En tant que **dépendance d'exécution** (par exemple pour la minification à la volée), à partir de la racine de votre projet:

```
$ npm install @adamlui/minify.js
```

<br>

<a href="https://github.com/sponsors/adamlui"><img src="https://media.minify-js.org/images/banners/sponsor/$10/banner1660x260.png?f6118ce"></a>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

## 💻 Utilisation de la ligne de commande

La **commande globale** de base est:

```
$ minify-js
```

**💡 Remarque:** Passez `-n` ou `--dry-run` pour voir uniquement quels fichiers seront traités.

#

Pour spécifier les chemins **d'entrée/sortie**:

```
$ minify-js [chemin_entrée] [chemin_sortie]
```

- `[chemin_entrée]`: Chemin d'accès au fichier JS ou au répertoire contenant les fichiers JS à réduire, par rapport au répertoire de travail actuel.
- `[chemin_sortie]`: Chemin d'accès au fichier ou au répertoire où les fichiers minifiés seront stockés, par rapport à l'emplacement du fichier d'origine (s'il n'est pas fourni, `min/` est utilisé).

**💡 Remarque:** Si des dossiers sont transmis, les fichiers seront traités de manière récursive à moins que `-R` ou `--no-recursion` soit transmis.

#

À utiliser comme **script de package**, dans le `package.json` de votre projet:

```json
  "scripts": {
    "build:js": "<minify-js-cmd>"
  },
```

Remplacez `<minify-js-cmd>` par `minify-js` + arguments facultatifs. Ensuite, `npm run build:js` peut être utilisé pour exécuter la commande.

#

### Exemples de commandes

Réduisez tous les fichiers JavaScript dans le **répertoire actuel** (sorties vers `min/`):

```
$ minify-js
```

Réduisez tous les fichiers JavaScript dans un **répertoire spécifique** (sorties vers `chemin/vers/votre/répertoire/min/`):

```
$ minify-js chemin/vers/votre/répertoire
```

Réduire un **fichier spécifique** (sorties vers `chemin/vers/votre/min/fichier.min.js`):

```
$ minify-js chemin/vers/votre/fichier.js
```

Spécifiez les répertoires **input et output** (sorties vers `dossier_sortie/`):

```
$ minify-js dossier_entrée dossier_sortie
```

#

### Options de ligne de commande

```
Options booléennes:
 -n, --dry-run                        Ne réduisez pas réellement le(s) fichier(s), indiquez simplement s'ils seront traités.
 -d, --include-dotfolders             Incluez les dossiers cachés dans la recherche de fichiers.
 -D, --include-dotfiles               Incluez les fichiers cachés dans la recherche de fichiers.
 -R, --no-recursion                   Désactivez la recherche récursive de fichiers.
 -M, --no-mangle                      Désactivez la modification des noms.
 -c, --copy                           Copiez le code minifié dans le presse-papiers au lieu d'écrire dans un fichier si un fichier source unique est traité.
 -q, --quiet                          Supprime toute la journalisation, à l'exception des erreurs.

Options des paramètres:
 --ignore-files="file1.js,file2.js"   Fichiers à exclure de la minification.
 --comment="commentaire"              Ajoutez le commentaire d’en-tête au code minifié. Séparez par ligne en utilisant '\n'.

Commandes d'informations:
 -h, --help                           Afficher l'écran d'aide.
 -v, --version                        Afficher le numéro de version.
```

<br>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

## 🔌 Utilisation de l'API

Vous pouvez également importer **minify.js** dans votre application pour utiliser ses méthodes API, à la fois en tant que module ECMAScript ou CommonJS.

#### ESM*:

```js
import * as minifyJS from '@adamlui/minify.js';
```

#### CJS:

```js
const minifyJS = require('@adamlui/minify.js');
```

###### _*Node.js version 14 ou supérieure requise_

#

### `minify(entrée[, options])`

Réduit le code JavaScript en fonction de l'entrée de chaîne fournie.

Si le **code source** est passé, il est directement minifié, puis un objet contenant `srcPath` + `code` + `error` est renvoyé:

```js
const codeSrc = 'function add(first, second) { return first + second; }',
      résultatMinifier = minifyJS.minify(codeSrc);

console.log(résultatMinifier.error); // génère une erreur d'exécution, ou `undefined` si aucune erreur
console.log(résultatMinifier.code);  // sorties JS minifiées: 'function add(n,d){return n+d}'
```

Si un **chemin de fichier** est transmis, le code du fichier est chargé puis réduit, renvoyant un objet comme ci-dessus.

Si un **chemin de répertoire** est passé, les fichiers JavaScript sont recherchés (de manière récursive par défaut), le code de chacun est chargé puis minifié, puis un tableau d'objets contenant `srcPath` + `code` + `error` est renvoyé:

```js
// Affiche les chemins d'accès aux fichiers JS sources dans le répertoire de travail + tous les répertoires imbriqués
const résultatsMinifier = minifyJS.minify('.');
résultatsMinifier.forEach(résultat => console.log(résultat.srcPath));

// Produit le code minifié du 2ème fichier JS s'il est trouvé, ou `undefined` s'il n'est pas trouvé
console.log(résultatsMinifier[1].code);
```

Les options sont booléennes, transmises en tant que propriétés d'objet. Par exemple:

```js
// Renvoie un tableau d'objets de données où les fichiers de points sont également traités si `entrée` est un chemin
minifyJS.minify(entrée, { dotFiles: true });
```

Les paramètres disponibles (et leurs paramètres par défaut) sont:

Nom           | Taper   | Description                                                                              | Valeur par défaut
--------------|---------|------------------------------------------------------------------------------------------|-------------------
`recursive`   | Boolean | Rechercher récursivement les fichiers imbriqués si le chemin du répertoire est transmis. | `true`
`verbose`     | Boolean | Afficher la connexion dans la console/terminal.                                          | `true`
`dotFolders`  | Boolean | Inclure les dossiers cachés dans la recherche de fichiers.                               | `false`
`dotFiles`    | Boolean | Incluez les fichiers cachés dans la recherche de fichiers.                               | `false`
`mangle`      | Boolean | Raccourcissez les noms de variables (généralement à un caractère).                       | `true`
`ignoreFiles` | Tableau | Fichiers (par nom) à exclure de la minification.                                         | `[]`
`comment`     | String  | Commentaire d’en-tête à ajouter au code minifié. Séparez par ligne en utilisant '\n'.    | `''`

#

### `findJS(repRecherche[, options])`

Recherche tous les fichiers JavaScript non minifiés dans la chaîne `repRecherche` transmise (utile pour découvrir quels fichiers [`minify()`](#minifyentrée-options) traiteront) et renvoie un tableau contenant leurs chemins de fichiers.

Les options sont booléennes, transmises en tant que propriétés d'objet. Par exemple:

```js
// Rechercher des fichiers JS non minifiés dans exactement assets/js
const resultatsRecherche = minifyJS.findJS('assets/js', { recursive: false });
console.log(resultatsRecherche);

/* sample output:

findJS() » Searching for unminified JS files...
findJS() » Search complete! 2 files found.
findJS() » Check returned array.
[
  'E:\\js\\utils\\minify.js\\assets\\js\\foo.js',
  'E:\\js\\utils\\minify.js\\assets\\js\\bar.js'
]
*/
```

Les paramètres disponibles (et leurs paramètres par défaut) sont:

Nom           | Taper   | Description                                                           | Valeur par défaut
--------------|---------|-----------------------------------------------------------------------|-------------------
`recursive`   | Boolean | Recherche récursive des fichiers imbriqués dans repRecherche réussie. | `true`
`verbose`     | Boolean | Afficher la connexion dans la console/terminal.                       | `true`
`dotFolders`  | Boolean | Inclure les dossiers cachés dans la recherche de fichiers.            | `false`
`dotFiles`    | Boolean | Incluez les fichiers cachés dans la recherche de fichiers.            | `false`
`ignoreFiles` | Tableau | Fichiers (par nom) à exclure des résultats de recherche.              | `[]`

<br>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

## 🏛️ Licence MIT

**Droits d'auteurs © 2023–2024 [Adam Lui](https://github.com/adamlui) et contributeurs**

Autorisation est accordée par la présente, gratuitement, à toute personne obtenant une copie de ce logiciel et des fichiers de documentation associés (le "Logiciel"), de traiter dans le Logiciel sans restriction, y compris sans limitation les droits d'utilisation, de copie, de modification, de fusion, de publication, de distribution, de sous-licence, et/ou de vendre des copies du Logiciel, et de permettre aux personnes à qui le Logiciel est fourni de le faire, sous réserve des conditions suivantes:

La notice de copyright ci-dessus et cette autorisation doivent être incluses dans toutes les copies ou parties substantielles du Logiciel.

LE LOGICIEL EST FOURNI "TEL QUEL", SANS GARANTIE D'AUCUNE SORTE, EXPRESSE OU IMPLICITE, Y COMPRIS MAIS SANS S'Y LIMITER LES GARANTIES DE QUALITÉ MARCHANDE, D'ADAPTATION À UN USAGE PARTICULIER ET D'ABSENCE DE CONTREFAÇON. EN AUCUN CAS, LES AUTEURS OU LES TITULAIRES DU COPYRIGHT NE SERONT RESPONSABLES DE TOUTE RÉCLAMATION, DOMMAGE OU AUTRE RESPONSABILITÉ, QUE CE SOIT DANS UNE ACTION CONTRACTUELLE, DÉLICTUELLE OU AUTRE, DÉCOULANT DE, OU EN RELATION AVEC LE LOGICIEL OU L'UTILISATION OU AUTRES TRANSACTIONS DANS LE LOGICIEL.

<br>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

## 🛠️ Utilitaires associés

### [</> minify.js (Gulp)](https://gulp.minify-js.org) &nbsp;<a href="https://github.com/toolleeo/cli-apps#programming"><img height=18 src="https://media.minify-js.org/images/badges/awesome/badge.svg?b78dcd3"></a>

> Plug-in Gulp pour réduire de manière récursive tous les fichiers JavaScript.
<br>[Installer](https://gulp.minify-js.org/#-installation) /
[Lisez-moi](https://gulp.minify-js.org/#readme) /
[Discuter](https://github.minify-js.org/discussions)

### [{ } scss-to-css](https://github.com/adamlui/scss-to-css) &nbsp;<a href="https://github.com/toolleeo/cli-apps#conversion"><img height=18 src="https://media.minify-js.org/images/badges/awesome/badge.svg?b78dcd3"></a>

> Compilez de manière récursive tous les fichiers SCSS en CSS minifié.
<br>[Installer](https://node.scsstocss.org/#-installation) /
[Lisez-moi](https://node.scsstocss.org/#readme) /
[Utilisation de la CLI](https://node.scsstocss.org/#-command-line-usage) /
[Utilisation de l'API](https://node.scsstocss.org/#-api-usage) /
[Discuter](https://github.scsstocss.org/discussions)

<br>

<img height=6px width="100%" src="https://media.minify-js.org/images/separators/gradient-aqua.png?8b9ed02">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://media.minify-js.org/images/icons/home/white/icon32x27.png?d07ee82"><img height=13 src="https://media.minify-js.org/images/icons/home/dark-gray/icon32x27.png?d07ee82"></picture> <a href="https://js-utils.com">**Plus d'utilitaires JavaScript**</a> /
<a href="https://github.minify-js.org/discussions">Discuter</a> /
<a href="#-minifyjs">Retour au sommet ↑</a>
