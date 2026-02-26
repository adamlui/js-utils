module.exports = {

    getPkgVerURL(version) {
        version ||= cli.version ||= require('./pkg').getVer('local') || 'none'
        const verTag = !/^\d+\.\d+\.\d+$/.test(version) ? 'latest' : `${cli.name}-${version}`
        return `${cli.urls.jsdelivr}@${verTag}/${cli.name}`
    },

    getCommitURL(hash = 'latest') { return `${cli.urls.jsdelivr}@${hash}/${cli.name}` }
}
