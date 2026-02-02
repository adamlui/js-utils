#!/usr/bin/env node

// Copies JSON + minifies JS to dist/

// NOTE: Pass --data to copy data only
// NOTE: Pass --<js|minify> to minify JS only

const { execSync } = require('child_process'),
        fs = require('fs'),
        args = process.argv.slice(2)

globalThis.app = require('../app.json')
app.config = {
    dataOnly: args.some(arg => /^--?data$/.test(arg)),
    jsOnly: args.some(arg => /^--?(?:js|minify)$/.test(arg))
}

// Copy APP data
if (!app.config.jsOnly) {
    fs.rmSync('dist', { recursive: true, force: true })
    fs.mkdirSync('dist/data', { recursive: true })
    fs.copyFileSync('app.json', 'dist/data/app.json')
    fs.copyFileSync('scss-to-css.config.mjs', 'dist/data/scss-to-css.config.mjs')
}

// Minify JS
if (!app.config.dataOnly) {
    app.headerComment = `© ${app.copyrightYear} ${app.author} under the ${app.license} license.\\n`
                      + `Source: ${app.urls.src}\\nDocumentation: ${app.urls.docs}`
    execSync(`npx minify-js src dist --comment="${app.headerComment}"`, { stdio: 'inherit' })
}
