const { colors } = require('../../src/cli/lib/log'),
        fs = require('fs')

module.exports = {
    copy(src, dest) {
        console.info(`Copying ${colors.bo}${src}${colors.nc} to ${colors.by}${dest}${colors.nc}...`)
        fs.copyFileSync(src, dest)
    }
}
