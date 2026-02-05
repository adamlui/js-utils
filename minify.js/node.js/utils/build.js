#!/usr/bin/env node

// Copies data + minifies JS to dist/

// NOTE: Pass --<js|minify> to minify JS only
// NOTE: Pass --data to copy data only
// NOTE: Pass --json to copy JSON only

const args = process.argv.slice(2),
    { execSync } = require('child_process'),
      fs = require('fs')

globalThis.cli = require('../package-data.json')
cli.config = {
    dataOnly: args.some(arg => /^--?data$/.test(arg)),
    jsOnly: args.some(arg => /^--?(?:js|minify)$/.test(arg)),
    jsonOnly: args.some(arg => /^--?json$/.test(arg))
}

// Copy data
if (!cli.config.jsOnly) {
    const dataOutDir = 'dist/data',
          filenames = { appData: 'package-data.json', msgs: 'messages.json', config: 'minify.config.mjs' }
    fs.rmSync('dist', { recursive: true, force: true })
    fs.mkdirSync(dataOutDir, { recursive: true })
    fs.copyFileSync(`../_locales/en/${filenames.msgs}`, `${dataOutDir}/${filenames.msgs}`)
    fs.copyFileSync(filenames.appData, `${dataOutDir}/${filenames.appData}`)
    if (!cli.config.jsonOnly) fs.copyFileSync(filenames.config, `${dataOutDir}/${filenames.config}`)
}

// Minify JS
if (!cli.config.dataOnly) {
    cli.headerComment = `© ${cli.copyrightYear} ${cli.author} under the ${cli.license} license.\\n`
                      + `Source: ${cli.urls.src}\\nDocumentation: ${cli.urls.docs}`
    execSync(`node ../node.js/src/cli src dist --comment="${cli.headerComment}"`, { stdio: 'inherit' })
}
