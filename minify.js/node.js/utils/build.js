#!/usr/bin/env node

// Copies data/JS + minifies API to dist/

// NOTE: Pass --<js|minify> to minify JS only
// NOTE: Pass --data to copy data only
// NOTE: Pass --json to copy JSON only

const { execSync } = require('child_process'),
        file = require('./lib/file'),
        fs = require('fs'),
       _log = require('../src/cli/lib/log')

const pkg = require('../package-data.json')
pkg.version = require('../package.json').version

const script = { args: process.argv.slice(2) }
script.config = {
    dataOnly: script.args.some(arg => /^--?data$/.test(arg)),
    jsOnly: script.args.some(arg => /^--?(?:js|minify)$/.test(arg)),
    jsonOnly: script.args.some(arg => /^--?json$/.test(arg))
}

// Copy data
if (!script.config.jsOnly) {
    const dataOutDir = 'dist/data',
          filenames = { pkgData: 'package-data.json', msgs: 'messages.json', config: 'minify.config.mjs' }
    if (fs.existsSync(dataOutDir)) // clear existing data
        fs.rmSync(dataOutDir, { recursive: true })
    fs.mkdirSync(dataOutDir, { recursive: true })
    file.copy(`../_locales/en/${filenames.msgs}`, `${dataOutDir}/${filenames.msgs}`)
    file.copy(filenames.pkgData, `${dataOutDir}/${filenames.pkgData}`)
    if (!script.config.jsonOnly) file.copy(filenames.config, `${dataOutDir}/${filenames.config}`)
}

// Copy/minify JS
if (!script.config.dataOnly) {
    pkg.apiHeaderComment = `© ${pkg.copyrightYear} ${pkg.author} under the ${pkg.license} license.\\n`
                         + `Source: ${pkg.urls.src}\\nDocumentation: ${pkg.urls.docs}`
    const execOptions = { stdio: 'inherit' }
    if (fs.existsSync('dist'))
        for (const item of fs.readdirSync('dist', { recursive: true }))
            if (!/data(?:[/\\]|$)/.test(item)) fs.rmSync(`dist/${item}`, { recursive: true, force: true })
    execSync(`node src/cli src dist --ignores=cli --comment="${pkg.apiHeaderComment}"`, execOptions)
    execSync(`npx copyfiles -V -e "**/*cache*/**" -u 1 "src/cli/**" dist`, execOptions)
}

_log.success(`${pkg.name} v${pkg.version} build complete!`)
