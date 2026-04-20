#!/usr/bin/env node

const fs = require('fs'),
      file = require('./lib/file'),
     _log = require('./lib/log')

const pkg = require('../package.json')

if (fs.existsSync('dist')) fs.rmSync('dist', { recursive: true, force: true })
fs.mkdirSync('dist', { recursive: true })
file.copy('src/index.js', 'dist/index.js')
file.copy('prose-languages.json', 'dist/prose-languages.json')
console.info(
     `Minifying ${_log.colors.bo}prose-languages.json${_log.colors.nc} to ${
         _log.colors.by}dist/prose-languages.min.json${_log.colors.nc}...`
)
fs.writeFileSync('dist/prose-languages.min.json', JSON.stringify(JSON.parse(fs.readFileSync('prose-languages.json', 'utf8'))))

_log.success(`${pkg.name} v${pkg.version} build complete!`)
