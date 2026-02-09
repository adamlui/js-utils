module.exports = {
    pkgVerURL(version) {
        version ||= cli.version ||= require(`./pkg${env.modExt}`).getVer('local') || 'none'
        const verTag = version == 'none' ? 'latest' : `node-v${version}`
        return `${cli.urls.jsdelivr}@${verTag}/node.js`
    },

    commitURL(hash = 'latest') { return `${cli.urls.jsdelivr}@${hash}` }
}
