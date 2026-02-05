const log = require(`./log${ env.devMode ? '' : '.min' }.js`)

module.exports = {
    getVer(type = 'any') { // or <'global'|'local'>
        log.prefix = 'pkg.getVer()'
        let pkgVer
        if (['any', 'global'].includes(type)) // get global ver
            try {
                pkgVer = require('child_process').execSync(
                    `npm view ${JSON.stringify(cli.name)} version`
                ).toString().trim() }
            catch (err) { log.warn(`Failed to fetch global version: ${err.message}`) }
        if (type == 'any' && !pkgVer || type == 'local')
            try { // get local ver
                const localManifestPath =require('path').resolve(
                    process.cwd(), 'node_modules', cli.name, 'package.json')
                if (require('fs').existsSync(localManifestPath))
                    pkgVer = require(localManifestPath).version
            } catch (err) { log.warn(`${cli.msgs.error_readingLocalPkgVer}:`, err.message) }
        return pkgVer
    }
}
