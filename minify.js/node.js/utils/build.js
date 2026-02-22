#!/usr/bin/env node

// Copies data/JS + minifies API to dist/

// NOTE: Pass --<js|minify> to minify JS only
// NOTE: Pass --data to copy data only
// NOTE: Pass --json to copy JSON only

const args = process.argv.slice(2),
    { execSync } = require('child_process'),
      fs = require('fs'),
     _log = require('../src/cli/lib/log')

globalThis.cli = require('../package-data.json')
cli.config = {
    dataOnly: args.some(arg => /^--?data$/.test(arg)),
    jsOnly: args.some(arg => /^--?(?:js|minify)$/.test(arg)),
    jsonOnly: args.some(arg => /^--?json$/.test(arg))
}
cli.version = require('../package.json').version

// Copy data
if (!cli.config.jsOnly) {
    const dataOutDir = 'dist/data',
          filenames = { pkgData: 'package-data.json', msgs: 'messages.json', config: 'minify.config.mjs' }
    if (fs.existsSync(dataOutDir)) // clear existing data
        fs.rmSync(dataOutDir, { recursive: true })
    fs.mkdirSync(dataOutDir, { recursive: true })
    verboseCopy(`../_locales/en/${filenames.msgs}`, `${dataOutDir}/${filenames.msgs}`)
    verboseCopy(filenames.pkgData, `${dataOutDir}/${filenames.pkgData}`)
    if (!cli.config.jsonOnly) verboseCopy(filenames.config, `${dataOutDir}/${filenames.config}`)
}

// Copy/minify JS
if (!cli.config.dataOnly) {
    cli.headerComment = `© ${cli.copyrightYear} ${cli.author} under the ${cli.license} license.\\n`
                      + `Source: ${cli.urls.src}\\nDocumentation: ${cli.urls.docs}`
    const execOptions = { stdio: 'inherit' }
    if (fs.existsSync('dist'))
        for (const item of fs.readdirSync('dist', { recursive: true }))
            if (!/data(?:[/\\]|$)/.test(item)) fs.rmSync(`dist/${item}`, { recursive: true, force: true })
    execSync(`node src/cli src dist --ignores=cli --comment="${cli.headerComment}"`, execOptions)
    execSync(`npx copyfiles -V -e "**/*cache*/**" -u 1 "src/cli/**" dist`, execOptions)
}

_log.success(`${cli.name} v${cli.version} build complete!`)

function verboseCopy(src, dest) {
    console.info(`Copying ${_log.colors.bo}${src}${_log.colors.nc} to ${_log.colors.by}${dest}${_log.colors.nc}...`)
    fs.copyFileSync(src, dest)
}
