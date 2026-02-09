module.exports = {
    pkgVerURL(version) {
        version ||= cli.version ||= require(`./pkg${env.modExt}`).getVer('local') || 'none'
        const verTag = version == 'none' ? 'latest' : `v${version}`
        return `${cli.urls.jsdelivr}@${verTag}`
    },

    commitURL(hash = 'latest') {
        return `${cli.urls.jsdelivr}@${hash}` }
}
