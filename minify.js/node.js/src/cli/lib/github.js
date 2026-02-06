const log = require(`./log${ env.devMode ? '' : '.min' }.js`)

module.exports = {
    async getDirContents({ owner = 'adamlui', repo = 'minify.js', path = '/', type = 'all' }) {
        try {
            const resp = await require(`./data${ env.devMode ? '' : '.min' }.js`)
                .fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`)
            if (!resp.ok) throw new Error('Failed to fetch data')
            return (await resp.json())
                .filter(item => type == 'all' || item.type == type) // <dir|file|all>
                .map(item => item.name)
        } catch (err) {
            log.error(err.message) }
    }
}
