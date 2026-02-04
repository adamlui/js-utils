#!/usr/bin/env node

// Copies data + minifies JS to dist/

// NOTE: Pass --<js|minify> to minify JS only
// NOTE: Pass --data to copy data only
// NOTE: Pass --json to copy JSON only

const args = process.argv.slice(2),
    { execSync } = require('child_process'),
      fs = require('fs')

globalThis.app = require('../app.json')
app.config = {
    dataOnly: args.some(arg => /^--?data$/.test(arg)),
    jsOnly: args.some(arg => /^--?(?:js|minify)$/.test(arg)),
    jsonOnly: args.some(arg => /^--?json$/.test(arg))
}

// Copy data
if (!app.config.jsOnly) {
    const dataOutDir = 'dist/data',
          filenames = { appData: 'app.json', msgs: 'messages.json', config: 'minify.config.mjs' }
    fs.rmSync('dist', { recursive: true, force: true })
    fs.mkdirSync(dataOutDir, { recursive: true })
    fs.copyFileSync(`../_locales/en/${filenames.msgs}`, `${dataOutDir}/${filenames.msgs}`)
    fs.copyFileSync(filenames.appData, `${dataOutDir}/${filenames.appData}`)
    if (!app.config.jsonOnly) fs.copyFileSync(filenames.config, `${dataOutDir}/${filenames.config}`)
}

// Minify JS
if (!app.config.dataOnly) {
    app.headerComment = `© ${app.copyrightYear} ${app.author} under the ${app.license} license.\\n`
                      + `Source: ${app.urls.src}\\nDocumentation: ${app.urls.docs}`
    execSync(`node ../node.js/src/cli src dist --no-mangle --comment="${app.headerComment}"`, { stdio: 'inherit' })
}
