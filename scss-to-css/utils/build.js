#!/usr/bin/env node

// Copies data/JS + minifies API to dist/

// NOTE: Pass --js to copy JS only
// NOTE: Pass --data to copy data only
// NOTE: Pass --json to copy JSON only

const pkg = require('../package-data.json')
pkg.version = require('../package.json').version

const script = { args: process.argv.slice(2) }
script.config = {
    dataOnly: script.args.some(arg => /^--?data$/.test(arg)),
    jsOnly: script.args.some(arg => /^--?js$/.test(arg)),
    jsonOnly: script.args.some(arg => /^--?json$/.test(arg))
}

const { execSync } = require('child_process'),
        file = require('./lib/file'),
        fs = require('fs'),
       _log = require('../src/cli/lib/log')

// Copy data
if (!script.config.jsOnly) {
    const dataOutDir = 'dist/data',
          filenames = { pkgData: 'package-data.json', msgs: 'messages.json', config: 'scss-to-css.config.mjs' }
    if (fs.existsSync(dataOutDir)) // clear existing data
        fs.rmSync(dataOutDir, { recursive: true })
    fs.mkdirSync(dataOutDir, { recursive: true })
    file.copy(`_locales/en/${filenames.msgs}`, `${dataOutDir}/${filenames.msgs}`)
    file.copy(filenames.pkgData, `${dataOutDir}/${filenames.pkgData}`)
    if (!script.config.jsonOnly) file.copy(filenames.config, `${dataOutDir}/${filenames.config}`)
}

// Copy JS
if (!script.config.dataOnly) {
    const execOptions = { stdio: 'inherit' }
    if (fs.existsSync('dist'))
        for (const item of fs.readdirSync('dist', { recursive: true }))
            if (!/data(?:[/\\]|$)/.test(item)) fs.rmSync(`dist/${item}`, { recursive: true, force: true })
    execSync(`npx copyfiles -V -e "**/*cache*/**" -u 1 "src/**/*" dist`, execOptions)
}

_log.success(`${pkg.name} v${pkg.version} build complete!`)
