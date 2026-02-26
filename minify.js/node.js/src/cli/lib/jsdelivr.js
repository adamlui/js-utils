module.exports = {

    getPkgVerURL(version) {
        version ||= cli.version ||= require('./pkg').getVer('local') || 'none'
        const verTag = !/^\d+\.\d+\.\d+$/.test(version) ? 'latest' : `node-v${version}`
        return `${cli.urls.jsdelivr}@${verTag}/node.js`
    },

    getCommitURL(hash = 'latest') { return `${cli.urls.jsdelivr}@${hash}` }
}
