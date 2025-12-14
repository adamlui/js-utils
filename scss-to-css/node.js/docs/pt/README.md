<div align="center">
    <h6>
        <picture>
            <source type="image/svg+xml" media="(prefers-color-scheme: dark)" srcset="https://assets.scsstocss.org/images/icons/earth/white/icon32.svg?v=7e4a141">
            <img height=14 src="https://assets.scsstocss.org/images/icons/earth/black/icon32.svg?v=7e4a141">
        </picture>
        &nbsp;Português |
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
        <a href="../fr#readme">Français</a> |
        <a href="../it#readme">Italiano</a> |
        <a href="../nl#readme">Nederlands</a>
    </h6>
</div>

# { } scss-to-css

### Compile recursivamente todos os arquivos SCSS em CSS reduzido.

<a href="https://www.npmjs.com/package/@adamlui/scss-to-css">
    <img height=31 src="https://img.shields.io/npm/dm/%40adamlui%2Fscss-to-css?label=Transfer%C3%AAncias&logo=npm&color=af68ff&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="#%EF%B8%8F-licen%C3%A7a-mit">
    <img height=31 src="https://img.shields.io/badge/Licença-MIT-fc4f2d.svg?logo=internetarchive&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://github.com/adamlui/js-utils/releases/tag/scss-to-css-1.10.46">
    <img height=31 src="https://img.shields.io/badge/Versão_Mais_Recente-1.10.46-44cc11.svg?logo=icinga&logoColor=white&labelColor=464646&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@adamlui/scss-to-css?activeTab=code">
    <img height=31 src="https://img.shields.io/npm/unpacked-size/%40adamlui%2Fscss-to-css?label=Tamanho%20Descompactado&style=for-the-badge&logo=ebox&logoColor=white&color=blue&labelColor=464646"></a>
<a href="https://sonarcloud.io/component_measures?metric=new_vulnerabilities&id=adamlui_scss-to-css:node.js/src/scss-to-css.js">
    <img height=31 src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsonarcloud.io%2Fapi%2Fmeasures%2Fcomponent%3Fcomponent%3Dadamlui_scss-to-css%3Anode.js%2Fsrc%2Fscss-to-css.js%26metricKeys%3Dvulnerabilities&query=%24.component.measures.0.value&style=for-the-badge&logo=sonarcloud&logoColor=white&labelColor=464646&label=Vulnerabilidades&color=gold"></a>
<a href="https://github.com/toolleeo/cli-apps#conversion">
    <img height=31 src="https://img.shields.io/badge/Mencionado_em-Awesome-c4a2bd?logo=awesomelists&logoColor=white&labelColor=464646&style=for-the-badge"></a>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## ⚡ Instalação

Como um **utilitário global**:

```
$ npm install -g @adamlui/scss-to-css
```

Como uma **dependência do desenvolvedor** (por exemplo, para scripts de construção), na raiz do seu projeto:

```
$ npm install -D @adamlui/scss-to-css
```

Como uma **dependência de tempo de execução** (por exemplo, para compilação on-the-fly), na raiz do seu projeto:

```
$ npm install @adamlui/scss-to-css
```

<br>

<a href="https://github.com/sponsors/adamlui"><img src="https://assets.scsstocss.org/images/banners/sponsor/$10/banner1660x260.png?v=f3129dd"></a>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 💻 Uso de linha de comando

O **comando global** básico é:

```
$ scss-to-css
```

Exemplo de saída:

<img src="https://cdn.jsdelivr.net/gh/adamlui/scss-to-css@b74edea/node.js/media/images/screenshots/cli/scss-to-css-docs-cmd-output.png">

**📝 Nota:** Os mapas de origem também são gerados por padrão, a menos que `-S` ou `--no-source-maps` sejam passados.

#

Para especificar caminhos de **entrada/saída**:

```
$ scss-to-css [caminho_de_entrada] [caminho_de_saída]
```

- `[caminho_de_entrada]`: Caminho para o arquivo SCSS ou diretório que contém os arquivos SCSS a serem compilados, relativo ao diretório de trabalho atual.
- `[caminho_de_saída]`: Caminho para o arquivo ou diretório onde os arquivos de mapa de origem CSS + serão armazenados, relativo ao local do arquivo original (se não for fornecido, `css/` será usado).

**📝 Nota:** Se as pastas forem passadas, os arquivos serão processados recursivamente, a menos que `-R` ou `--no-recursion` seja passado.

#

Para usar como um **script de pacote**, no `package.json` do seu projeto:

```json
  "scripts": {
    "build:css": "<scss-to-css-cmd>"
  },
```

Substitua `<scss-to-css-cmd>` por `scss-to-css` + argumentos opcionais. Então, `npm run build:css` pode ser usado para executar o comando.

#

### Comandos de exemplo

Compile todos os arquivos SCSS no **diretório atual** (saída para `css/`):

```
$ scss-to-css
```

Compile todos os arquivos SCSS em um **diretório específico** (saída para `caminho/para/seu/diretório/css/`):

```
$ scss-to-css caminho/para/seu/diretório
```

Compile um **arquivo específico** (saída para `caminho/para/seu/css/arquivo.min.css`):

```
$ scss-to-css caminho/para/seu/arquivo.scss
```

Especifique os diretórios **input e output** (saídas para `pasta_de_saída/`):

```
$ scss-to-css pasta_de_entrada pasta_de_saída
```

**📝 Nota:** O CSS de saída é reduzido, a menos que `-M` ou `--no-minify` seja passado.

#

### Opções de linha de comando

```
Opções booleanas:
 -n, --dry-run                            Na verdade, não compile o(s) arquivo(s), apenas mostre se eles serão processados.
 -d, --include-dotfolders                 Incluir dotfolders na pesquisa de arquivos.
 -S, --no-source-maps                     Impedir que mapas de origem sejam gerados.
 -M, --no-minify                          Desative a minificação do CSS de saída.
 -R, --no-recursion                       Desative a pesquisa recursiva de arquivos.
 -c, --copy                               Copie o CSS compilado para a área de transferência em vez de gravar no arquivo se um único arquivo de origem for processado.
 -q, --quiet                              Suprima todos os registros, exceto erros.

Opções de parâmetros:
 --ignore-files="file1.scss,file2.scss"   Arquivos a serem excluídos da compilação.
 --comment="comment"                      Anexe o comentário do cabeçalho ao CSS compilado. Separe por linha usando '\n'.

Comandos de informação:
 -h, --help                               Exibir tela de ajuda.
 -v, --version                            Mostrar número da versão.
```

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 🔌 Uso de API

Você também pode importar **scss-to-css** para seu aplicativo para usar seus métodos de API, tanto como um módulo ECMAScript quanto como um módulo CommonJS.

#### ECMAScript*:

```js
import scssToCSS from '@adamlui/scss-to-css';
```

###### _*É necessário Node.js versão 14 ou superior_

#### CJS:

```js
const scssToCSS = require('@adamlui/scss-to-css');
```

#

### `compile(input[, options])`

💡 Compila SCSS com base na entrada de string fornecida.

Se **código fonte** for passado, ele será compilado diretamente, então um objeto contendo `srcPath` + `code` + `srcMap` + `error` será retornado:

```js
const códigoFnt = 'h1 { font-size: 40px ; code { font-face: Roboto Mono }}',
      compilarResultado = scssToCSS.compile(códigoFnt);

console.log(compilarResultado.error); // gera erro de tempo de execução ou `undefined` se não houver erro
console.log(compilarResultado.code);  // gera CSS minificado: 'h1{font-size:40px}h1 code{font-face:Roboto Mono}'
```

Se um **caminho do arquivo** for passado, o código do arquivo é carregado e então compilado em CSS, retornando um objeto como acima.

Se um **caminho de diretório** for passado, os arquivos SCSS serão procurados (recursivamente por padrão), o código de cada um será carregado e compilado, então um array de objetos contendo `srcPath` + `code` + `srcMap` + `error` será retornado:

```js
// Gera caminhos para arquivos SCSS no diretório de trabalho + todos os diretórios aninhados
const compilarResultados = scssToCSS.compile('.');
compilarResultados.forEach(resultado => console.log(resultado.srcPath));

// Produz CSS compilado do segundo arquivo SCSS, se encontrado, ou `undefined` se não for encontrado
console.log(compilarResultados[1].code);
```

As opções são booleanas, passadas como propriedades do objeto. Por exemplo:

```js
// Retorna uma matriz de objetos de dados onde `.code` contém CSS não minificado
scssToCSS.compile(dirEntrada, { minify: false });
```

Os parâmetros disponíveis (e suas configurações padrão) são:

Nome          | Tipo      | Descrição                                                                             | Valor padrão
--------------|-----------|---------------------------------------------------------------------------------------|--------------
`recursive`   | Boleano   | Pesquise recursivamente por arquivos aninhados se o caminho do diretório for passado. | `true`
`verbose`     | Boleano   | Mostrar login no console/terminal.                                                    | `true`
`dotFolders`  | Boleano   | Incluir dotfolders na pesquisa de arquivos.                                           | `false`
`minify`      | Boleano   | Minimizar CSS de saída.                                                               | `true`
`sourceMaps`  | Boleano   | Gerar mapas de origem CSS.                                                            | `true`
`ignoreFiles` | Variedade | Arquivos (por nome) a serem excluídos da compilação.                                  | `[]`
`comment`     | Corda     | Comentário de cabeçalho a ser anexado ao CSS compilado. Separe por linha usando '\n'. | `''`

#

### `findSCSS(searchDir[, options])`

💡 Procura todos os arquivos SCSS dentro da string `searchDir` passada (útil para descobrir quais arquivos [`compile()`](#compileinput-options) irão processar) e retorna um array contendo seus caminhos de arquivo.

As opções são booleanas, passadas como propriedades do objeto. Por exemplo:

```js
// Procure por arquivos SCSS exatamente em assets/scss
const searchResults = scssToCSS.findSCSS('assets/scss', { recursive: false });
console.log(searchResults);

/* saída de exemplo:

findSCSS() » Searching for SCSS files...
findSCSS() » Search complete! 2 files found.
findSCSS() » Check returned array.
[
  'E:\\js\\utils\\scss-to-css\assets\\scss\\foo.scss',
  'E:\\js\\utils\\scss-to-css\assets\\scss\\bar.scss'
]
*/
```

Os parâmetros disponíveis (e suas configurações padrão) são:

Nome          | Tipo      | Descrição                                                              | Valor padrão
--------------|-----------|------------------------------------------------------------------------|--------------
`recursive`   | Boleano   | Pesquise recursivamente por arquivos aninhados em sesarchDir aprovado. | `true`
`verbose`     | Boleano   | Mostrar login no console/terminal.                                     | `true`
`dotFolders`  | Boleano   | Incluir dotfolders na pesquisa de arquivos.                            | `false`
`ignoreFiles` | Variedade | Arquivos (por nome) a serem excluídos dos resultados da pesquisa.      | `[]`

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 🏛️ Licença MIT

**Direitos autorais © 2024 [Adam Lui](https://github.com/adamlui) e colaboradores**

É concedida permissão, gratuitamente, a qualquer pessoa que obtenha uma cópia deste software e dos arquivos de documentação associados (o "Software"), para negociar o Software sem restrições, incluindo, sem limitação, os direitos de usar, copiar, modificar, mesclar , publicar, distribuir, sublicenciar e/ou vender cópias do Software e permitir que as pessoas a quem o Software seja fornecido o façam, sujeito às seguintes condições:

O aviso de direitos autorais acima e este aviso de permissão serão incluídos em todas as cópias ou partes substanciais do Software.

O SOFTWARE É FORNECIDO "COMO ESTÁ", SEM GARANTIA DE QUALQUER TIPO, EXPRESSA OU IMPLÍCITA, INCLUINDO, MAS NÃO SE LIMITANDO ÀS GARANTIAS DE COMERCIALIZAÇÃO, ADEQUAÇÃO A UM DETERMINADO FIM E NÃO VIOLAÇÃO. EM NENHUM CASO OS AUTORES OU DETENTORES DE DIREITOS AUTORAIS SERÃO RESPONSÁVEIS POR QUALQUER REIVINDICAÇÃO, DANOS OU OUTRA RESPONSABILIDADE, SEJA EM UMA AÇÃO DE CONTRATO, ATO ILÍCITO OU DE OUTRA FORMA, DECORRENTE DE, OU EM CONEXÃO COM O SOFTWARE OU O USO OU OUTRAS NEGOCIAÇÕES NO PROGRAMAS.

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

## 🛠️ Utilitários relacionados

### [🖼️ img-to-webp](https://github.com/adamlui/js-utils/tree/main/img-to-webp)

> Compacte recursivamente todas as imagens em WEBPs.
<br>[Baixar](https://cdn.jsdelivr.net/gh/adamlui/js-utils/img-to-webp/img-to-webp.js) /
[Discutir](https://github.com/adamlui/js-utils/discussions)

### [</> minify.js](https://minify-js.org) &nbsp;<a href="https://github.com/toolleeo/cli-apps#programming"><img height=18 src="https://assets.scsstocss.org/images/badges/awesome/badge.svg?v=7e4a141"></a>

> Minimize recursivamente todos os arquivos JavaScript.
<br>[Instalar](https://node.minify-js.org/#-installation) /
[Leia-me](https://node.minify-js.org/#readme) /
[Uso da CLI](https://node.minify-js.org/#-command-line-usage) /
[Uso de API](https://node.minify-js.org/#-api-usage) /
[Discutir](https://github.com/adamlui/minify.js/discussions)

<br>

<img height=6px width="100%" src="https://assets.scsstocss.org/images/separators/aqua-gradient.png?v=7e4a141">

<picture><source media="(prefers-color-scheme: dark)" srcset="https://assets.scsstocss.org/images/icons/home/white/icon32x27.png?v=7e4a141"><img height=13 src="https://assets.scsstocss.org/images/icons/home/dark-gray/icon32x27.png?v=7e4a141"></picture> <a href="https://js-utils.org">**Mais utilitários JavaScript**</a> /
<a href="https://github.com/adamlui/scss-to-css/discussions">Discutir</a> /
<a href="#--scss-to-css">De volta ao topo ↑</a>
