module.exports = {
    getVer(type = 'any') { // or <'global'|'local'>
        let pkgVer
        if (type != 'global')
            try { // get local ver
                const localManifestPath = require('path').resolve(
                    process.cwd(), 'node_modules', cli.name, 'package.json')
                pkgVer = require(localManifestPath).version
            } catch (err) { log.debug(`${cli.msgs.error_readingLocalPkgVer}: ${err.message}`) }
        if (type == 'global' || type == 'all' && !pkgVer)
            try { // get global ver
                pkgVer = require('child_process').execSync(
                    `npm view ${JSON.stringify(cli.name)} version`
                ).toString().trim()
            } catch (err) { log.debug(`${cli.msgs.error_failedToFetchGlobalVer}: ${err.message}`) }
        return pkgVer
    }
}
