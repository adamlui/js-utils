module.exports = {

    pkgVerURL(version) {
        version ||= cli.version ||= require(`./pkg${env.modExt}`).getVer('local') || 'none'
        const verTag = version == 'none' ? 'latest' : `${cli.name}-${version}`
        return `${cli.urls.jsdelivr}@${verTag}/${cli.name}`
    },

    commitURL(hash = 'latest') { return `${cli.urls.jsdelivr}@${hash}/${cli.name}` }
}
