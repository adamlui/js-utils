<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://assets.minify-js.org/images/icons/earth/white/icon32.svg?v=ad67551">
            <img height=14 src="https://assets.minify-js.org/images/icons/earth/black/icon32.svg?v=ad67551">
        </picture>
        &nbsp;Français |
        <a href="../../#readme">English</a> |
        <a href="../zh-cn/#readme">简体中文</a> |
        <a href="../zh-tw/#readme">繁體中文</a> |
        <a href="../hi/#readme">हिंदी</a> |
        <a href="../bn/#readme">বাংলা</a> |
        <a href="../mr/#readme">मराठी</a> |
        <a href="../pa/#readme">ਪੰਜਾਬੀ</a> |
        <a href="../de/#readme">Deutsch</a> |
        <a href="../es/#readme">Español</a>
    </h6>
</div>

<a id="top"></a>

# </> minify.js

### Réduisez de manière récursive tous les fichiers JavaScript.

<a href="https://npmstar.com/compare/@adamlui%2Fminify.js">
    <img height=31 src="https://img.shields.io/npm/dm/%40adamlui%2Fminify.js?label=T%C3%A9l%C3%A9chargements&logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-licence-mit">
    <img height=31 src="https://img.shields.io/badge/Licence-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/minify.js/releases/tag/node-v2.5.1">
    <img height=31 src="https://img.shields.io/badge/Dernière_Version-2.5.1-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/minify.js?activeTab=code">
    <img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fminify.js?label=Taille%20D%C3%A9ball%C3%A9e&style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue"></a>
<a href="https://sonarcloud.io/component_measures?metric=vulnerabilities&selected=adamlui_js-utils%3Aminify.js%2Fnode.js&id=adamlui_js-utils">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_minify.js%3Anode.js%2Fsrc%2Fminify.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonar&logoColor=white&labelColor=464646&label=Vuln%C3%A9rabilit%C3%A9s&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps/#programming">
    <img height=31 src="https://img.shields.io/badge/Mentionné_dans-Awesome-ff69b4?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img src="https://cdn.jsdelivr.net/gh/adamlui/minify.js@b8f432a/node.js/assets/images/screenshots/cli/minify-js-docs-cmd-output.png">

<br>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

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

<a href="https://github.com/sponsors/adamlui"><img src="https://assets.minify-js.org/images/banners/sponsor/$10/banner1660x260.png?v=63bbeed"></a>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

## 💻 Utilisation de la ligne de commande

La **commande globale** de base est:

```
$ minify-js
```

**📝 Remarque:** Passez `-n` ou `--dry-run` pour voir uniquement quels fichiers seront traités.

#

Pour spécifier les chemins **d'entrée/sortie**:

```
$ minify-js [chemin_entrée] [chemin_sortie]
```

- `[chemin_entrée]`: Chemin d'accès au fichier JS ou au répertoire contenant les fichiers JS à réduire, par rapport au répertoire de travail actuel.
- `[chemin_sortie]`: Chemin d'accès au fichier ou au répertoire où seront stockés les fichiers minifiés, relatif au répertoire source (si non spécifié, le répertoire `min/` est utilisé).

**📝 Remarque:** Si des dossiers sont transmis, les fichiers seront traités de manière récursive à moins que `-R` ou `--no-recursion` soit transmis.

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

Réduisez tous les fichiers JavaScript dans un **répertoire spécifique** (sorties vers `min/chemin/vers/votre/répertoire/`):

```
$ minify-js chemin/vers/votre/répertoire
```

Réduire un **fichier spécifique** (sorties vers `min/chemin/vers/votre/fichier.min.js`):

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
 -X, --no-filename-change             Désactivez la modification de l'extension de fichier en .min.js
 -i, --rewrite-imports                Mettre à jour les chemins d'importation de .js à .min.js
 -c, --copy                           Copiez le code minifié dans le presse-papiers au lieu d'écrire dans un fichier si un fichier source unique est traité.
 -r, --relative-output                Les fichiers de sortie sont créés par rapport à chaque fichier source, et non par rapport au répertoire source principal.
 -q, --quiet                          Supprime toute la journalisation, à l'exception des erreurs.

Options des paramètres:
 --ignores="dir/,file1.js,file2.js"   Fichiers/répertoires à exclure de la minification.
 --comment="commentaire"              Ajoutez le commentaire d’en-tête au code minifié. Séparez par ligne en utilisant '\n'.
 --ui-lang="code"                     Code ISO 639-1 de la langue dans laquelle afficher l'interface utilisateur.
 --config="path/to/file"              Charger le fichier de configuration personnalisé.

Commandes:
     --init                           Créer un fichier de configuration (à la racine du projet).
 -h, --help                           Afficher l'écran d'aide.
 -v, --version                        Afficher le numéro de version.
     --stats                          Afficher les statistiques npm.
     --debug [targetKey]              Afficher les journaux de débogage.
```

#

### Fichier de configuration

**minify.js** peut être personnalisé à l'aide d'un fichier `minify.config.mjs` ou `minify.config.js` placé à la racine de votre projet.

Exemple de valeurs par défaut:

```js
export default {
    dryRun: false,            // Ne pas minifier les fichiers, afficher uniquement ceux qui seront traités
    includeDotFolders: false, // Inclure les dossiers cachés dans la recherche de fichiers
    includeDotFiles: false,   // Inclure les fichiers cachés dans la recherche de fichiers
    noRecursion: false,       // Désactiver la recherche récursive de fichiers
    noMangle: false,          // Désactiver l'obfuscation des noms
    noFilenameChange: false,  // Désactiver le changement d'extension de fichier en .min.js
    rewriteImports: false,    // Mettre à jour les chemins d'importation de .js vers .min.js
    copy: false,              // Copier le code minifié dans le presse-papiers au lieu de l'écrire dans un fichier si un seul fichier est traité
    relativeOutput: false,    // Générer les fichiers de sortie par rapport à chaque fichier source au lieu de la racine d'entrée
    quietMode: false,         // Supprimer tous les messages de journalisation sauf les erreurs
    ignores: '',              // Fichiers/dossiers à exclure de la minification
    comment: ''               // Commentaire d'en-tête à ajouter au code minifié
}
```

💡 Exécutez `minify-js init` pour générer un modèle de fichier `minify.config.mjs` à la racine de votre projet.

<br>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

## 🔌 Utilisation de l'API

Vous pouvez également importer **minify.js** dans votre application pour utiliser ses méthodes API, à la fois en tant que module ECMAScript ou CommonJS.

#### ESM*:

```js
import minifyJS from '@adamlui/minify.js'
```

#### CJS:

```js
const minifyJS = require('@adamlui/minify.js')
```

###### _*Node.js version 14 ou supérieure requise_

#

### `minify(entrée[, options])`

💡 Réduit le code JavaScript en fonction de l'entrée de chaîne fournie.

Si le **code source** est passé, il est directement minifié, puis un objet contenant `srcPath` + `code` + `error` est renvoyé:

```js
const codeSrc = 'function add(first, second) { return first + second }',
      résultatMinifier = minifyJS.minify(codeSrc)

console.log(résultatMinifier.error) // génère une erreur d'exécution, ou `undefined` si aucune erreur
console.log(résultatMinifier.code)  // sorties JS minifiées: 'function add(n,d){return n+d}'
```

Si un **chemin de fichier** est transmis, le code du fichier est chargé puis réduit, renvoyant un objet comme ci-dessus.

Si un **chemin de répertoire** est passé, les fichiers JavaScript sont recherchés (de manière récursive par défaut), le code de chacun est chargé puis minifié, puis un tableau d'objets contenant `srcPath` + `code` + `error` est renvoyé:

```js
// Affiche les chemins d'accès aux fichiers JS sources dans le répertoire de travail + tous les répertoires imbriqués
const résultatsMinifier = minifyJS.minify('.')
résultatsMinifier.forEach(résultat => console.log(résultat.srcPath))

// Produit le code minifié du 2ème fichier JS s'il est trouvé, ou `undefined` s'il n'est pas trouvé
console.log(résultatsMinifier[1].code)
```

Les options sont booléennes, transmises en tant que propriétés d'objet. Par exemple:

```js
// Renvoie un tableau d'objets de données où les fichiers de points sont également traités si `entrée` est un chemin
minifyJS.minify(entrée, { dotFiles: true })
```

Les paramètres disponibles (et leurs paramètres par défaut) sont:

Nom              | Taper   | Description                                                                                                               | Valeur par défaut
-----------------|---------|---------------------------------------------------------------------------------------------------------------------------|-------------------
`recursive`      | Boolean | Rechercher récursivement les fichiers imbriqués si le chemin du répertoire est transmis.                                  | `true`
`verbose`        | Boolean | Afficher la connexion dans la console/terminal.                                                                           | `true`
`dotFolders`     | Boolean | Inclure les dossiers cachés dans la recherche de fichiers.                                                                | `false`
`dotFiles`       | Boolean | Incluez les fichiers cachés dans la recherche de fichiers.                                                                | `false`
`mangle`         | Boolean | Raccourcissez les noms de variables (généralement à un caractère).                                                        | `true`
`rewriteImports` | Boolean | Mettre à jour les chemins d'importation de .js à .min.js                                                                  | `false`
`relativeOutput` | Boolean | Les fichiers de sortie sont créés par rapport à chaque fichier source, et non par rapport au répertoire source principal. | `false`
`ignores`        | Tableau | Fichiers/répertoires à exclure de la minification.                                                                        | `[]`
`comment`        | String  | Commentaire d’en-tête à ajouter au code minifié. Séparez par ligne en utilisant '\n'.                                     | `''`

#

### `findJS(repRecherche[, options])`

💡 Recherche tous les fichiers JavaScript non minifiés dans la chaîne `repRecherche` transmise (utile pour découvrir quels fichiers [`minify()`](#minifyentrée-options) traiteront) et renvoie un tableau contenant leurs chemins de fichiers.

Les options sont booléennes, transmises en tant que propriétés d'objet. Par exemple:

```js
// Rechercher des fichiers JS non minifiés dans exactement assets/js
const resultatsRecherche = minifyJS.findJS('assets/js', { recursive: false })
console.log(resultatsRecherche)

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
`ignores`     | Tableau | Fichiers/répertoires à exclure de la minification.                    | `[]`

<br>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

## 🏛️ Licence MIT

**Droits d'auteurs © 2023–2026 [Adam Lui](https://github.com/adamlui) et contributeurs**

Autorisation est accordée par la présente, gratuitement, à toute personne obtenant une copie de ce logiciel et des fichiers de documentation associés (le "Logiciel"), de traiter dans le Logiciel sans restriction, y compris sans limitation les droits d'utilisation, de copie, de modification, de fusion, de publication, de distribution, de sous-licence, et/ou de vendre des copies du Logiciel, et de permettre aux personnes à qui le Logiciel est fourni de le faire, sous réserve des conditions suivantes:

La notice de copyright ci-dessus et cette autorisation doivent être incluses dans toutes les copies ou parties substantielles du Logiciel.

LE LOGICIEL EST FOURNI "TEL QUEL", SANS GARANTIE D'AUCUNE SORTE, EXPRESSE OU IMPLICITE, Y COMPRIS MAIS SANS S'Y LIMITER LES GARANTIES DE QUALITÉ MARCHANDE, D'ADAPTATION À UN USAGE PARTICULIER ET D'ABSENCE DE CONTREFAÇON. EN AUCUN CAS, LES AUTEURS OU LES TITULAIRES DU COPYRIGHT NE SERONT RESPONSABLES DE TOUTE RÉCLAMATION, DOMMAGE OU AUTRE RESPONSABILITÉ, QUE CE SOIT DANS UNE ACTION CONTRACTUELLE, DÉLICTUELLE OU AUTRE, DÉCOULANT DE, OU EN RELATION AVEC LE LOGICIEL OU L'UTILISATION OU AUTRES TRANSACTIONS DANS LE LOGICIEL.

<br>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

## 🛠️ Utilitaires associés

### [</> minify.js (Gulp)](https://github.com/adamlui/minify.js/tree/main/gulp/) &nbsp;<a href="https://github.com/toolleeo/cli-apps/#programming"><img height=18 src="https://assets.minify-js.org/images/badges/awesome/badge.svg?v=63bbeed"></a>

> Plug-in Gulp pour réduire de manière récursive tous les fichiers JavaScript.
<br>[Installer](https://github.com/adamlui/minify.js/tree/main/gulp/#-installation) /
[Lisez-moi](https://github.com/adamlui/minify.js/tree/main/gulp/#readme) /
[Discuter](https://github.com/adamlui/minify.js/discussions)

### [{ } scss-to-css](https://scsstocss.org) &nbsp;<a href="https://github.com/toolleeo/cli-apps/#conversion"><img height=18 src="https://assets.minify-js.org/images/badges/awesome/badge.svg?v=63bbeed"></a>

> Compilez de manière récursive tous les fichiers SCSS en CSS minifié.
<br>[Installer](https://node.scsstocss.org/#-installation) /
[Lisez-moi](https://node.scsstocss.org/#readme) /
[Utilisation de la CLI](https://node.scsstocss.org/#-command-line-usage) /
[Utilisation de l'API](https://node.scsstocss.org/#-api-usage) /
[Discuter](https://github.com/adamlui/scss-to-css/discussions)

<br>

<img height=6px width="100%" src="https://assets.minify-js.org/images/separators/aqua-gradient.png?v=ad67551">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://assets.minify-js.org/images/icons/home/white/icon32x27.png?v=ad67551"><img height=13 src="https://assets.minify-js.org/images/icons/home/dark-gray/icon32x27.png?v=ad67551"></picture> <a href="https://github.com/adamlui/js-utils/#readme">**Plus d'utilitaires JavaScript**</a> /
<a href="https://github.com/adamlui/minify.js/discussions">Discuter</a> /
<a href="#top">Retour au sommet ↑</a>
