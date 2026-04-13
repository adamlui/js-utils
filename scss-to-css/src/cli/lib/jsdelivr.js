module.exports = {

    getPkgVerURL(version) {
        version ||= cli.version ||= require('./pkg').getVer('local') || 'none'
        const verTag = !/^\d+\.\d+\.\d+$/.test(version) ? 'latest' : `v${version}`
        return `${cli.urls.jsdelivr}@${verTag}`
    },

    getCommitURL(hash = 'latest') { return `${cli.urls.jsdelivr}@${hash}` }
}
