#!/usr/bin/env node

const fs = require('fs'),
      file = require('./lib/file'),
     _log = require('./lib/log')

const pkg = require('../package.json')

if (fs.existsSync('dist')) fs.rmSync('dist', { recursive: true, force: true })
fs.mkdirSync('dist', { recursive: true })
file.copy('src/index.js', 'dist/index.js')
file.copy('project-markers.json', 'dist/project-markers.json')
console.info(
     `Minifying ${_log.colors.bo}project-markers.json${_log.colors.nc} to ${
         _log.colors.by}dist/project-markers.min.json${_log.colors.nc}...`
)
fs.writeFileSync('dist/project-markers.min.json', JSON.stringify(JSON.parse(fs.readFileSync('project-markers.json', 'utf8'))))

_log.success(`${pkg.name} v${pkg.version} build complete!`)
