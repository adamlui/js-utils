#!/usr/bin/env node

// Copies/minifies JSON/JS to dist/

// Import LIBS
const { execSync } = require('child_process'),
        fs = require('fs')

globalThis.app = require('../app.json')

// Copy APP data
fs.rmSync('dist', { recursive: true, force: true })
fs.mkdirSync('dist/data', { recursive: true })
fs.copyFileSync('_locales/en/messages.json', 'dist/data/messages.json')
fs.copyFileSync('app.json', 'dist/data/app.json')
fs.copyFileSync('minify.config.mjs', 'dist/data/minify.config.mjs')

// Minify JS
app.headerComment = `© ${app.copyrightYear} ${app.author} under the ${app.license} license.\\n`
                  + `Source: ${app.urls.src}\\nDocumentation: ${app.urls.docs}`
execSync(`npx minify-js src dist --comment="${app.headerComment}"`, { stdio: 'inherit' })
