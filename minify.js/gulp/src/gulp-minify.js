const { Transform } = require('stream'),
      { minify, findJS } = require('@adamlui/minify.js');

function gulpMinify(searchDir, options = {}) {
    return new Transform({
        objectMode: true,
        transform(file, encoding, callback) {
            if (file.isNull()) { // do nothing if no contents
                callback(null, file); return; }
            if (file.isBuffer()) { // minify buffer contents
                const jsFiles = findJS(searchDir, { ...options, recursive: true });
                jsFiles.forEach(jsFile => {
                    const minified = minify(jsFile, options);
                    file.contents = Buffer.from(minified.code);
            });}
            if (file.isStream()) { // error if stream provided
                callback(new Error('gulpMinify() » ERROR: Streaming not supported'));
                return;
            }
            callback(null, file); // pass transformed file along
}});}

module.exports = { gulpMinify };
