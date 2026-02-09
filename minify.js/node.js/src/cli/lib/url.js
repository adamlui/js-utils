module.exports = {
    createJSDverTag(version) {
        version ||= cli.version ||= require(`./pkg${env.modExt}`).getVer('local') || 'none'
        return version == 'none' ? 'latest' : `node-v${version}`
    }
}
