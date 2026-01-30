#!/usr/bin/env node

// Import LIBS
const { execSync } = require('child_process'),
        fs = require('fs')

globalThis.app = require('../app.json')

// Copy APP data
fs.rmSync('dist', { recursive: true, force: true })
fs.mkdirSync('dist/data', { recursive: true })
fs.copyFileSync('app.json', 'dist/data/app.json')

// Minify JS
const headerComment = `© ${app.copyrightYear} ${'app.author'} under the ${app.license} license.\\n`
                    + `Source: ${app.urls.src}\\nDocumentation: ${app.urls.docs}`
execSync(`minify-js src dist --comment="${JSON.stringify(headerComment)}"`, { stdio: 'inherit' })
