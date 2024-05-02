<div align="right">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/white/icon32.svg">
            <img height=14 src="https://raw.githubusercontent.com/adamlui/js-utils/main/docs/images/earth-icon/black/icon32.svg">
        </picture>
        &nbsp;Français |
        <a href="../..#readme">English</a> |
        <a href="../zh-cn#readme">简体中文</a> |
        <a href="../zh-tw#readme">繁體中文</a> |
        <a href="../hi#readme">हिंदी</a> |
        <a href="../bn#readme">বাংলা</a> |
        <a href="../de#readme">Deutsch</a> |
        <a href="../es#readme">Español</a>
    </h6>
</div>

# > generate-pw

### Générez, renforcez et validez de manière aléatoire des mots de passe cryptographiquement sécurisés.

<a href="https://www.npmjs.com/package/generate-pw"><img height=31 src="https://img.shields.io/npm/dm/generate-pw?label=T%C3%A9l%C3%A9chargements&logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-mit-license"><img height=31 src="https://img.shields.io/badge/Licence-MIT-orange.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/generate-pw-1.5.7"><img height=31 src="https://img.shields.io/badge/Dernière_version-1.5.7-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/generate-pw?activeTab=code"><img height=31 src="https://img.shields.io/npm/unpacked-size/generate-pw?style=for-the-badge&logo=ebox&logoColor=white&labelColor=464646&color=blue&label=Taille%20d%C3%A9ball%C3%A9e"></a>
<a href="https://github.com/adamlui/js-utils/blob/generate-pw-1.5.7/generate-pw/dist/generate-pw.min.js"><img height=31 src="https://img.shields.io/github/size/adamlui/js-utils/generate-pw/dist/generate-pw.min.js?branch=generate-pw-1.5.7&label=Taille%20r%C3%A9duite&logo=databricks&logoColor=white&labelColor=464646&color=ff69b4&style=for-the-badge"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_js-utils:generate-pw/src/generate-pw.js"><img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_js-utils%3Agenerate-pw%2Fsrc%2Fgenerate-pw.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vuln%C3%A9rabilit%C3%A9s&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#password-managers"><img height=31 src="https://img.shields.io/badge/Mentionné_dans-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<br>

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png">

## 💡 À propos

**generate-pw** est une bibliothèque légère et facile à utiliser qui vous permet de générer, renforcer et valider de manière aléatoire des mots de passe cryptographiquement sécurisés.

- **Aucune dépendance externe —** Seules les méthodes de chiffrement intégrées sont utilisées pour une randomisation sécurisée
- **Hautement personnalisable —** Spécifiez la longueur, la quantité, les jeux de caractères à utiliser, etc.
- **Prise en charge multi-environnements —** Utilisation dans Node.js ou dans le navigateur Web
- **Ligne de commande utilisable —** Tapez simplement `generate-pw`, c'est tout

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png">

## ⚡ Installation

En tant qu'**utilitaire global**:

```
$ npm install -g generate-pw
```

En tant que **dépendance d'exécution**, à partir de la racine de votre projet:

```
$ npm install generate-pw
```

<br>

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png">

## 🔌 Importer l'API

### <img height=18 src="https://i.imgur.com/JIeAdsr.png"> Node.js

#### ECMAScript*:

```js
import * as pw from 'generate-pw';
```

#### CommonJS:

```js
const pw = require('generate-pw');
```

###### _*Node.js version 14 ou supérieure requise_

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://i.imgur.com/JSEb19A.png"><img width=16 src="https://i.imgur.com/5VPxf9y.png"></picture> Web

#### <> Balise de script HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/generate-pw@1.5.7/dist/generate-pw.min.js"></script>
```

#### ES6:

```js
(async () => {
    await import('https://cdn.jsdelivr.net/npm/generate-pw@1.5.7/dist/generate-pw.min.js');
    // Votre code ici...
})();
```

### <img height=17 src="https://raw.githubusercontent.com/KudoAI/chatgpt.js/main/starters/media/images/icons/tampermonkey-icon28.png"><img height=17.5 src="https://raw.githubusercontent.com/KudoAI/chatgpt.js/main/starters/media/images/icons/violentmonkey-icon100.png"> Greasemonkey

```js
...
// @require https://cdn.jsdelivr.net/npm/generate-pw@1.5.7/dist/generate-pw.min.js
// ==/UserScript==

// Votre code ici...
```

<br>

**💡 Remarque:** Pour toujours importer la dernière version (non recommandé en production!), supprimez la balise de version `@1.5.7` de l'URL jsDelivr: `https://cdn.jsdelivr.net/npm/generate-pw/dist/generate-pw.min.js`

<br>

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png">

## 📋 Utilisation de l'API

### `generatePassword([options])`

Génère **un** mot de passe si l'option `qty` n'est pas donnée, renvoyant une chaîne:

```js
const motDePasse = pw.generatePassword({ length: 11, numbers: true });
console.log(motDePasse); // exemple de sortie: 'bAsZm3mq6Qn'
```

...ou **plusieurs** mots de passe si l'option `qty` est donnée, renvoyant un tableau de chaînes:

```js
const motsDePasse = pw.generatePassword({ qty: 5, length: 8, symbols: true });
console.log(motsDePasse);

/* exemple de sortie:

generatePassword() » Generating passwords...
generatePassword() » Passwords generated!
generatePassword() » Check returned array.
[ '!zSf@Q.s', '!,HT\\;m=', '?Lq&FV>^', 'gf}Y;}Ne', 'Stsx(GqE' ]
*/
```

**💡 Remarque:** Si aucune option n'est transmise, les mots de passe comporteront 8 caractères, composés de lettres majuscules et minuscules.

Voir: [Options disponibles](#options-disponibles-pour-les-fonctions-generate)

#

### `generatePasswords(qty[, options])`

Génère **plusieurs** mots de passe en fonction de la `qty` donnée, renvoyant un tableau de chaînes:

```js
const motsDePasse = pw.generatePasswords(5, { length: 3, uppercase: false });
console.log(motsDePasse);

/* exemple de sortie:

generatePasswords() » Generating passwords...
generatePasswords() » Passwords generated!
generatePasswords() » Check returned array.
[ 'yilppxru', 'ckvkyjfp', 'zolcpyfb' ]
*/
```

**💡 Remarque:** Si aucun argument `qty` n'est transmis, un seul mot de passe sera généré, renvoyé sous forme de chaîne.

Voir: [Options disponibles](#options-disponibles-pour-les-fonctions-generate)

#

### `strictify(motDePasse[, typesCarRequis, options])`

Modifie le `motDePasse` donné pour utiliser au moins un caractère de chaque élément `typesCarRequis` passé, renvoyant une chaîne:

```js
const mdpStrict = pw.strictify('abcdef', ['numbers', 'symbols']);
console.log(mdpStrict); // exemple de sortie: 'a!c2ef'
```

**💡 Remarque:** Si aucun tableau `typesCarRequis` n'est transmis, tous les types disponibles seront requis.

Les `typesCarRequis` disponibles sont: `['number', 'symbol', 'lower', 'upper']`

Options disponibles (passées en propriétés d'objet):

Nom       | Taper   | Description                                     | Valeur par défaut
----------|---------|-------------------------------------------------|-------------------
`verbose` | Booléen | Afficher les journaux dans la console/terminal. | `true`

#

### `validateStrength(motDePasse[, options])`

Valide la force d'un mot de passe, en renvoyant un objet contenant:
- `strengthScore` (0–100)
- `recommendations` tableau
- `isGood` booléen (`true` si `strengthScore` >= 80) 

Exemple:

```js
const fiabilitéMDP = pw.validateStrength('Aa?idsE');
console.log(fiabilitéMDP);

/* sorties:

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

Options disponibles (passées en propriétés d'objet):

Nom       | Taper   | Description                                     | Valeur par défaut
----------|---------|-------------------------------------------------|-------------------
`verbose` | Booléen | Afficher les journaux dans la console/terminal. | `true`

#

### Options disponibles pour les fonctions `generate*()`

N'importe lequel d'entre eux peut être passé dans l'objet options pour chaque fonction `generate*()`:

Nom                   | Taper   | Description                                                                                   | Valeur par défaut
----------------------|---------|-----------------------------------------------------------------------------------------------|-------------------
`verbose`             | Booléen | Afficher les journaux dans la console/terminal.                                               | `true`
`length`              | Entier  | Longueur du ou des mots de passe.                                                             | `8`
`qty`*                | Entier  | Nombre de mots de passe à générer.                                                            | `1`
`charset`             | Chaîne  | Caractères à inclure dans le(s) mot(s) de passe.                                              | `''`
`exclude`             | Chaîne  | Caractères à exclure du(des) mot(s) de passe.                                                 | `''`
`numbers`             | Booléen | Autoriser les chiffres dans les mots de passe.                                                | `false`
`symbols`             | Booléen | Autoriser les symboles dans les mots de passe.                                                | `false`
`lowercase`           | Booléen | Autoriser les lettres minuscules dans les mots de passe.                                      | `true`
`uppercase`           | Booléen | Autoriser les lettres majuscules dans les mots de passe.                                      | `true`
`excludeSimilarChars` | Booléen | Exclure les personnages similaires (e.g. o,0,O,i,l,1,\|) dans le(s) mot(s) de passe.          | `false`
`strict`              | Booléen | Exiger au moins un caractère de chaque jeu de caractères autorisé dans le(s) mot(s) de passe. | `false`

##### _*Uniquement disponible dans [`generatePassword([options])`](#generatepasswordoptions) puisque [`generatePasswords(qty[, options])`](#generatepasswordsqty-options) prend un argument `qty`_

<br>

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png">

## 💻 Utilisation de la ligne de commande

Lorsqu'il est installé [globalement](#-installation), **generate-pw** peut également être utilisé à partir de la ligne de commande. La commande de base est :

```
$ generate-pw
```

<img src="https://raw.githubusercontent.com/adamlui/js-utils/main/generate-pw/media/images/screenshots/cli/generate-pw-output.jpg">

#

### Options de ligne de commande

```
Options des paramètres:
 --length=n                  Générez un ou plusieurs mots de passe de longueur n.
 --qty=n                     Générez n mot(s) de passe.
 --charset=cars              Incluez uniquement des cars dans les mots de passe.
 --exclude=cars              Exclure les cars des mots de passe.

Options booléennes:
 -n, --include-numbers       Autoriser les chiffres dans les mots de passe.
 -y, --include-symbols       Autoriser les symboles dans les mots de passe.
 -L, --no-lowercase          Interdire les lettres minuscules dans les mots de passe.
 -U, --no-uppercase          Interdire les lettres majuscules dans les mots de passe.
 -S, --no-similar            Excluez les caractères similaires dans les mots de passe.
 -s, --strict                Exiger au moins un caractère de chaque jeu de caractères autorisé dans le(s) mot(s) de passe.
 -q, --quiet                 Supprime toute la journalisation, à l'exception des erreurs.

Info commands:
 -h, --help                  Afficher l'écran d'aide.
 -v, --version               Afficher le numéro de version.
```

<br>

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png">

## 🏛️ Licence MIT

**Droits d'auteur © 2024 [Adam Lui](https://github.com/adamlui) et contributeurs**

Autorisation est accordée par la présente, gratuitement, à toute personne obtenant une copie de ce logiciel et des fichiers de documentation associés (le "Logiciel"), de traiter dans le Logiciel sans restriction, y compris sans limitation les droits d'utilisation, de copie, de modification, de fusion, de publication, de distribution, de sous-licence, et/ou de vendre des copies du Logiciel, et de permettre aux personnes à qui le Logiciel est fourni de le faire, sous réserve des conditions suivantes:

La notice de copyright ci-dessus et cette autorisation doivent être incluses dans toutes les copies ou parties substantielles du Logiciel.

LE LOGICIEL EST FOURNI "TEL QUEL", SANS GARANTIE D'AUCUNE SORTE, EXPRESSE OU IMPLICITE, Y COMPRIS MAIS SANS S'Y LIMITER LES GARANTIES DE QUALITÉ MARCHANDE, D'ADAPTATION À UN USAGE PARTICULIER ET D'ABSENCE DE CONTREFAÇON. EN AUCUN CAS, LES AUTEURS OU LES TITULAIRES DU COPYRIGHT NE SERONT RESPONSABLES DE TOUTE RÉCLAMATION, DOMMAGE OU AUTRE RESPONSABILITÉ, QUE CE SOIT DANS UNE ACTION CONTRACTUELLE, DÉLICTUELLE OU AUTRE, DÉCOULANT DE, OU EN RELATION AVEC LE LOGICIEL OU L'UTILISATION OU AUTRES TRANSACTIONS DANS LE LOGICIEL.

<br>

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png">

## 🛠️ Utilitaires associés

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/generate-ip/media/images/icons/node-graph/white/icon55x49.png"><img height=21 src="https://raw.githubusercontent.com/adamlui/js-utils/main/generate-ip/media/images/icons/node-graph/black/icon55x49.png"></picture> [generate-ip](https://js-utils.com/generate-ip) <a href="https://github.com/toolleeo/cli-apps#networking"><img height=18 src="https://awesome.re/mentioned-badge.svg"></a>

> Générez, formatez et validez de manière aléatoire des adresses IPv4/IPv6.
<br>[Installer](https://docs.js-utils.com/generate-ip/#-installation) /
[Lisez-moi](https://docs.js-utils.com/generate-ip/#readme) /
[Utilisation de l'API](https://docs.js-utils.com/generate-ip/#-api-usage) /
[Utilisation de la CLI](https://docs.js-utils.com/generate-ip/#-command-line-usage) /
[Discuter](https://github.js-utils.com/discussions)

### <picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/geolocate/media/images/icons/wire-globe/white/icon32.png"><img height=22 src="https://raw.githubusercontent.com/adamlui/js-utils/main/geolocate/media/images/icons/wire-globe/black/icon32.png"></picture> [geolocate](https://js-utils.com/geolocate)

> Récupérez les données de géolocalisation IP à partir de la CLI.
<br>[Installer](https://docs.js-utils.com/geolocate/#-installation) /
[Lisez-moi](https://docs.js-utils.com/geolocate/#readme) /
[Utilisation de la CLI](https://docs.js-utils.com/geolocate/#-command-line-usage) /
[Utilisation de l'API](https://docs.js-utils.com/geolocate/#-api-usage) /
[Discuter](https://github.js-utils.com/discussions)

<br>

<img height=6px width="100%" src="https://media.js-utils.com/images/separators/gradient-aqua.png">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/adamlui/js-utils/main/media/images/icons/home/white/icon32x27.png"><img height=13 src="https://raw.githubusercontent.com/adamlui/js-utils/main/media/images/icons/home/dark-gray/icon32x27.png"></picture> <a href="https://js-utils.com">**Plus d'utilitaires JavaScript**</a> /
<a href="https://github.js-utils.com/discussions">Discuter</a> /
<a href="#-generate-pw">Retour au sommet ↑</a>
