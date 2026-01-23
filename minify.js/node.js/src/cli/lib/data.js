module.exports = {
    fetch(url) { // instead of fetch() to support Node.js < v21
        return new Promise((resolve, reject) => {
            const protocol = url.match(/^([^:]+):\/\//)[1]
            if (!/^https?$/.test(protocol)) reject(new Error(`${app.msgs.error_invalidURL}.`))
            require(protocol).get(url, resp => {
                let rawData = ''
                resp.on('data', chunk => rawData += chunk)
                resp.on('end', () => resolve({ json: () => JSON.parse(rawData) }))
            }).on('error', reject)
        })
    },

    flatten(json, { type = 'message' } = {}) { // eliminate need to ref nested keys
        const flatObj = {} ; for (const key in json) flatObj[key] =
            typeof json[key] == 'object' && type in json[key] ? json[key][type] : json[key]
        return flatObj
    }
}
