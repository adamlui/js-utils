#!/usr/bin/env node

/* ========================================================
Script:       img-to-webp.js
Version:      2025.4.5
Description:  Compress all JPG/PNG images in a directory to WEBPs
Author:       Adam Lui
License:      MIT
Homepage:     https://js-utils.org/img-to-webp
========================================================= */

(async () => {

    // Import libs
    const fs = require('fs').promises, path = require('path'), glob = require('glob'),
         [imagemin, webp] = await Promise.all([import('imagemin'), import('imagemin-webp')])

    // Init config
    const inputDir = '../media/images',
          overwriteExisting = false // whether to overwrite existing WEBPs

    // Check if `inputDir` exists
    try { await fs.access(inputDir) }
    catch (err) { return console.error(`Input directory '${inputDir}' not found.`) }

    // Get all PNG/JPG files from `inputDir`
    const pngFiles = glob.sync(path.join(inputDir, '**/*.png'), { nodir: true }),
          jpgFiles = glob.sync(path.join(inputDir, '**/*.{ jpg, jpeg }'), { nodir: true })

    // Process PNG images
    const pngOptions = { extension: '.webp', qualityOptions: { lossless: true }, type: 'PNG' }
    const { compressedCount: compressedPNGCount, skippedCount: skippedPNGCount } = (
        await processImages(pngFiles, pngOptions))

    // Process JPG images
    const jpgOptions = { extension: '.webp', qualityOptions: { quality: 65 }, type: 'JPG' }
    const { compressedCount: compressedJPGCount, skippedCount: skippedJPGCount } = (
        await processImages(jpgFiles, jpgOptions))

    // Final log
    console.log('\n-----------------------')
    console.log('Total images detected:  '
        + `${ pngFiles.length + jpgFiles.length } (${ pngFiles.length } PNG, ${ jpgFiles.length } JPG)`)
    console.log('Images compressed:      '
        + `${ compressedPNGCount + compressedJPGCount } (${ compressedPNGCount } PNG, ${ compressedJPGCount } JPG)`)
    console.log('Images skipped:         '
        + `${ skippedPNGCount + skippedJPGCount } (${ skippedPNGCount } PNG, ${ skippedJPGCount } JPG)`)

    // Define FUNCTIONS

    async function fileExists(file) {
        try { return await fs.access(file) || true }
        catch (err) { return false }
    }

    async function processImages(files, options) {
        const { extension, qualityOptions, type } = options
        let compressedCount = 0, skippedCount = 0
        await Promise.all(files.map(async (file) => {
            const outputFileName = file.replace(/\.[^.]+$/, extension)

            // Skip conversion if `overwriteExisting` is `false`
            if (!overwriteExisting && await fileExists(outputFileName)) {
                console.log(`Skipping ${type} conversion: WebP image already exists for ${file}`)
                skippedCount++ ; return
            }

            // Compress image, output WebP file
            await imagemin.default([file], {
                destination: path.dirname(outputFileName),
                plugins: [webp.default(qualityOptions)]
            })
            compressedCount++
            console.log(`${type} processed: ${file} => ${outputFileName}`)

        }))
        return { compressedCount, skippedCount }
    }

})()
