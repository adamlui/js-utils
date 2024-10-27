<div align="center">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://media.scsstocss.org/images/icons/earth/white/icon32.svg?52b67bc">
            <img height=14 src="https://media.scsstocss.org/images/icons/earth/black/icon32.svg?52b67bc">
        </picture>
        &nbsp;Français |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn#readme">简体中文</a> |
        <a href="../zh-tw#readme">繁體中文</a> |
        <a href="../ja#readme">日本語</a> |
        <a href="../hi#readme">हिंदी</a> |
        <a href="../bn#readme">বাংলা</a> |
        <a href="../mr#readme">मराठी</a> |
        <a href="../pa#readme">ਪੰਜਾਬੀ</a> |
        <a href="../de#readme">Deutsch</a> |
        <a href="../es#readme">Español</a> |
        <a href="../it#readme">Italiano</a> |
        <a href="../nl#readme">Nederlands</a> |
        <a href="../pt#readme">Português</a>
    </h6>
</div>

# { } scss-to-css

### Compilez de manière récursive tous les fichiers SCSS en CSS minifié.

<a href="https://www.npmjs.com/package/@adamlui/scss-to-css"><img height=31 src="https://img.shields.io/npm/dm/%40adamlui%2Fscss-to-css?label=T%C3%A9l%C3%A9chargements&logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-licence-mit"><img height=31 src="https://img.shields.io/badge/Licence-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/scss-to-css-1.10.15"><img height=31 src="https://img.shields.io/badge/Dernière_Version-1.10.15-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/scss-to-css?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fscss-to-css?label=Taille%20D%C3%A9ball%C3%A9e&style=for-the-badge&logo=ebox&logoColor=white&color=blue&labelColor=464646"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_scss-to-css:node.js/src/scss-to-css.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_scss-to-css%3Anode.js%2Fsrc%2Fscss-to-css.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vuln%C3%A9rabilit%C3%A9s&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#conversion"><img height=31 src="https://img.shields.io/badge/Mentionné_dans-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img height=6px width="100%" src="https://media.scsstocss.org/images/separators/gradient-aqua.png?52b67bc">

## ⚡ Installation

En tant qu'**utilitaire global**:

```
$ npm install -g @adamlui/scss-to-css
```

En tant que **dépendance de développeur** (par exemple pour les scripts de build), à partir de la racine de votre projet:

```
$ npm install -D @adamlui/scss-to-css
```

En tant que **dépendance d'exécution** (par exemple pour une compilation à la volée), à partir de la racine de votre projet:

```
$ npm install @adamlui/scss-to-css
```

<br>

<a href="https://github.com/sponsors/adamlui"><img src="https://media.scsstocss.org/images/banners/sponsor/$10/banner1660x260.png?2cba0ae"></a>

<img height=6px width="100%" src="https://media.scsstocss.org/images/separators/gradient-aqua.png?52b67bc">

## 💻 Utilisation de la ligne de commande

La **commande globale** de base est:

```
$ scss-to-css
```

Exemple de sortie:

<img src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@b74edea/node.js/media/images/screenshots/cli/scss-to-css-docs-cmd-output.png">

**📝 Remarque:** Les cartes sources sont également générées par défaut à moins que `-S` ou `--no-source-maps` ne soient transmis.

#

Pour spécifier les chemins **d'entrée/sortie**:   

```
$ scss-to-css [chemin_entrée] [chemin_sortie]
```

- `[chemin_entrée]`: Chemin d'accès au fichier SCSS ou au répertoire contenant les fichiers SCSS à compiler, par rapport au répertoire de travail actuel.
- `[chemin_sortie]`: Chemin d'accès au fichier ou au répertoire où les fichiers de carte CSS + source seront stockés, par rapport à l'emplacement du fichier d'origine (s'il n'est pas fourni, `css/` est utilisé).

**📝 Remarque:** Si des dossiers sont transmis, les fichiers seront traités de manière récursive à moins que `-R` ou `--no-recursion` soit transmis.

#

À utiliser comme **script de package**, dans le `package.json` de votre projet:

```json
  "scripts": {
    "build:css": "<scss-to-css-cmd>"
  },
```

Remplacez `<scss-to-css-cmd>` par `scss-to-css` + arguments facultatifs. Ensuite, `npm run build:css` peut être utilisé pour exécuter la commande.

#

### Exemples de commandes

Compilez tous les fichiers SCSS dans le **répertoire actuel** (sorties vers `css/`):

```
$ scss-to-css
```

Compilez tous les fichiers SCSS dans un **répertoire spécifique** (sorties vers `chemin/vers/votre/répertoire/css/`):

```
$ scss-to-css chemin/vers/votre/répertoire
```

Compilez un **fichier spécifique** (sorties vers `chemin/vers/votre/css/fichier.min.css`):

```
$ scss-to-css chemin/vers/votre/fichier.scss
```

Spécifiez les répertoires **saisir et sortir** (sorties vers `dossier_sortie/`):

```
$ scss-to-css dossier_entrée dossier_sortie
```

**📝 Remarque:** Le CSS de sortie est réduit à moins que `-M` ou `--no-minify` soit transmis.

#

### Options de ligne de commande

```
Options booléennes:
 -n, --dry-run                            Ne compilez pas réellement le(s) fichier(s), montrez simplement s'ils seront traités.
 -d, --include-dotfolders                 Incluez les dossiers cachés dans la recherche de fichiers.
 -S, --no-source-maps                     Empêcher la génération de mappages sources.
 -M, --no-minify                          Désactivez la minification du CSS de sortie.
 -R, --no-recursion                       Désactivez la recherche récursive de fichiers.
 -c, --copy                               Copiez le CSS compilé dans le presse-papiers au lieu d'écrire dans un fichier si un fichier source unique est traité.
 -q, --quiet                              Supprime toute la journalisation, à l'exception des erreurs.

Options des paramètres:
 --ignore-files="file1.scss,file2.scss"   Fichiers à exclure de la compilation.
 --comment="comment"                      Ajoutez le commentaire d’en-tête au CSS compilé. Séparez par ligne en utilisant '\n'.

Commandes d'informations:
 -h, --help                               Afficher l'écran d'aide.
 -v, --version                            Afficher le numéro de version.
```

<br>

<img height=6px width="100%" src="https://media.scsstocss.org/images/separators/gradient-aqua.png?52b67bc">

## 🔌 Utilisation de l'API

Vous pouvez également importer **scss-to-css** dans votre application pour utiliser ses méthodes API, à la fois en tant que module ECMAScript ou CommonJS.

#### ECMAScript*:

```js
import scssToCSS from '@adamlui/scss-to-css';
```

#### CJS:

```js
const scssToCSS = require('@adamlui/scss-to-css');
```

###### _*Node.js version 14 ou supérieure requise_

#

### `compile(entrée[, options])`

💡 Compile SCSS en fonction de l'entrée de chaîne fournie.

Si le **code source** est passé, il est directement compilé, puis un objet contenant `srcPath` + `code` + `srcMap` + `error` est renvoyé:

```js
const codeSrc = 'h1 { font-size: 40px ; code { font-face: Roboto Mono }}',
      résultatCompilation = scssToCSS.compile(codeSrc);

console.log(résultatCompilation.error); // génère une erreur d'exécution, ou `undefined` si aucune erreur
console.log(résultatCompilation.code);  // génère du CSS minifié: 'h1{font-size:40px}h1 code{font-face:Roboto Mono}'
```

Si un **chemin de fichier** est transmis, le code du fichier est chargé puis compilé en CSS, renvoyant un objet comme ci-dessus.

Si un **chemin de répertoire** est passé, les fichiers SCSS sont recherchés (de manière récursive par défaut), le code de chacun est chargé puis compilé, puis un tableau d'objets contenant `srcPath` + `code` + `srcMap` + `error` est renvoyé:

```js
// Affiche les chemins d'accès aux fichiers SCSS dans le répertoire de travail + tous les répertoires imbriqués
const résultatsCompilation = scssToCSS.compile('.');
résultatsCompilation.forEach(résultat => console.log(résultat.srcPath));

// Sorties CSS compilées à partir du 2ème fichier SCSS s'il est trouvé, ou `undefined` s'il n'est pas trouvé
console.log(résultatsCompilation[1].code);
```

Les options sont booléennes, transmises en tant que propriétés d'objet. Par exemple:

```js
// Renvoie un tableau d'objets de données où `.code` contient du CSS non minifié
scssToCSS.compile(répEntrée, { minify: false });
```

Les paramètres disponibles (et leurs paramètres par défaut) sont:

Nom           | Taper   | Description                                                                              | Valeur par défaut
--------------|---------|------------------------------------------------------------------------------------------|-------------------
`recursive`   | Booléen | Rechercher récursivement les fichiers imbriqués si le chemin du répertoire est transmis. | `true`
`verbose`     | Booléen | Afficher la connexion dans la console/terminal.                                          | `true`
`dotFolders`  | Booléen | Inclure les dossiers cachés dans la recherche de fichiers.                               | `false`
`minify`      | Booléen | Réduire la sortie CSS.                                                                   | `true`
`sourceMaps`  | Booléen | Générer des cartes sources CSS.                                                          | `true`
`ignoreFiles` | Tableau | Fichiers (par nom) à exclure de la compilation.                                          | `[]`
`comment`     | Chaîne  | Commentaire d’en-tête à ajouter au CSS compilé. Séparez par ligne en utilisant '\n'.     | `''`

#

### `findSCSS(repRecherche[, options])`

💡 Recherche tous les fichiers SCSS dans la chaîne `repRecherche` passée (utile pour découvrir quels fichiers [`compile()`](#compileentrée-options) traiteront) et renvoie un tableau contenant leurs chemins de fichiers.

Les options sont booléennes, transmises en tant que propriétés d'objet. Par exemple:

```js
// Recherche des fichiers SCSS exactement dans assets/scss
const resultatsRecherche = scssToCSS.findSCSS('assets/scss', { recursive: false });
console.log(resultatsRecherche);

/* exemple de sortie:

findSCSS() » Searching for SCSS files...
findSCSS() » Search complete! 2 files found.
findSCSS() » Check returned array.
[
  'E:\\js\\utils\\scss-to-css\assets\\scss\\foo.scss',
  'E:\\js\\utils\\scss-to-css\assets\\scss\\bar.scss'
]
*/
```

Les paramètres disponibles (et leurs paramètres par défaut) sont:

Nom           | Taper   | Description                                                            | Valeur par défaut
--------------|---------|------------------------------------------------------------------------|-------------------
`recursive`   | Booléen | Recherche récursive des fichiers imbriqués dans repRecherche transmis. | `true`
`verbose`     | Booléen | Afficher la connexion dans la console/terminal.                        | `true`
`dotFolders ` | Booléen | Inclure les dossiers cachés dans la recherche de fichiers.             | `false`
`ignoreFiles` | Tableau | Fichiers (par nom) à exclure des résultats de recherche.               | `[]`

<br>

<img height=6px width="100%" src="https://media.scsstocss.org/images/separators/gradient-aqua.png?52b67bc">

## 🏛️ Licence MIT

**Droits d'auteurs © 2024 [Adam Lui](https://github.com/adamlui) et contributeurs**

Autorisation est accordée par la présente, gratuitement, à toute personne obtenant une copie de ce logiciel et des fichiers de documentation associés (le "Logiciel"), de traiter dans le Logiciel sans restriction, y compris sans limitation les droits d'utilisation, de copie, de modification, de fusion, de publication, de distribution, de sous-licence, et/ou de vendre des copies du Logiciel, et de permettre aux personnes à qui le Logiciel est fourni de le faire, sous réserve des conditions suivantes:

La notice de copyright ci-dessus et cette autorisation doivent être incluses dans toutes les copies ou parties substantielles du Logiciel.

LE LOGICIEL EST FOURNI "TEL QUEL", SANS GARANTIE D'AUCUNE SORTE, EXPRESSE OU IMPLICITE, Y COMPRIS MAIS SANS S'Y LIMITER LES GARANTIES DE QUALITÉ MARCHANDE, D'ADAPTATION À UN USAGE PARTICULIER ET D'ABSENCE DE CONTREFAÇON. EN AUCUN CAS, LES AUTEURS OU LES TITULAIRES DU COPYRIGHT NE SERONT RESPONSABLES DE TOUTE RÉCLAMATION, DOMMAGE OU AUTRE RESPONSABILITÉ, QUE CE SOIT DANS UNE ACTION CONTRACTUELLE, DÉLICTUELLE OU AUTRE, DÉCOULANT DE, OU EN RELATION AVEC LE LOGICIEL OU L'UTILISATION OU AUTRES TRANSACTIONS DANS LE LOGICIEL.

<br>

<img height=6px width="100%" src="https://media.scsstocss.org/images/separators/gradient-aqua.png?52b67bc">

## 🛠️ Utilitaires associés

### [🖼️ img-to-webp](https://imgtowebp.org)

> Compressez de manière récursive toutes les images vers des WEBP.
<br>[Télécharger](https://cdn.jsdelivr.net/gh/adamlui/js-utils/img-to-webp/img-to-webp.js) /
[Discuter](https://github.js-utils.com/discussions)

### [</> minify.js](https://minify-js.org) &nbsp;<a href="https://github.com/toolleeo/cli-apps#programming"><img height=18 src="https://media.scsstocss.org/images/badges/awesome/badge.svg?52b67bc"></a>

> Réduisez de manière récursive tous les fichiers JavaScript.
<br>[Installer](https://node.minify-js.org/#-installation) /
[Lisez-moi](https://node.minify-js.org/#readme) /
[Utilisation de la CLI](https://node.minify-js.org/#-command-line-usage) /
[Utilisation de l'API](https://node.minify-js.org/#-api-usage) /
[Discuter](https://github.js-utils.com/discussions)

<br>

<img height=6px width="100%" src="https://media.scsstocss.org/images/separators/gradient-aqua.png?52b67bc">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://media.scsstocss.org/images/icons/home/white/icon32x27.png?52b67bc"><img height=13 src="https://media.scsstocss.org/images/icons/home/dark-gray/icon32x27.png?52b67bc"></picture> <a href="https://js-utils.com">**Plus d'utilitaires JavaScript**</a> /
<a href="https://github.scsstocss.org/discussions">Discuter</a> /
<a href="#--scss-to-css">Retour au sommet ↑</a>
