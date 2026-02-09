module.exports = {
    pkgVerURL(version) {
        version ||= cli.version ||= require(`./pkg${env.modExt}`).getVer('local') || 'none'
        const pkgName = cli.name.split('/')[1],
              verTag = version == 'none' ? 'latest' : `${pkgName}-${version}`
        return `${cli.urls.jsdelivr}@${verTag}/${pkgName}`
    },

    commitURL(hash = 'latest') { return `${cli.urls.jsdelivr}@${hash}/${cli.name.split('/')[1]}` }
}
