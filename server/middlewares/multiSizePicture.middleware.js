const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const archiver = require('archiver');
const fs = require('fs');
const { WritableStreamBuffer } = require('stream-buffers');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 15 * 1024 * 1024, // Limite à 15MB
    }
}).any();

const processImage = async (file, size, quality) => {
    const buffer = await sharp(file.buffer)
        .resize({ width: size, fit: sharp.fit.inside })
        .webp({ quality: quality })
        .toBuffer();
    return buffer;
}

module.exports = (req, res, next) => {
    upload(req, res, async function (err) {
        // verifie si multer a rencontré une erreur lors de l'upload des fichiers
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }

        try {
            if (req.files) {
                const sizes = JSON.parse(req.body.sizes);
                const DESKTOP_SIZE = Number(sizes.desktop);
                const TABLET_SIZE = Number(sizes.tablet);
                const MOBILE_SIZE = Number(sizes.mobile);
                const IMAGE_QUALITY = Number(req.body.quality);

                res.locals.files = await Promise.all(req.files.map(async file => {
                    const desktopImage = await processImage(file, DESKTOP_SIZE, IMAGE_QUALITY);
                    const tabletImage = await processImage(file, TABLET_SIZE, IMAGE_QUALITY);
                    const mobileImage = await processImage(file, MOBILE_SIZE, IMAGE_QUALITY);

                    const baseName = path.parse(file.originalname).name;

                    return {
                        desktop: {
                            buffer: desktopImage,
                            originalname: `desktop-${baseName}.webp`,
                            mimetype: 'image/webp',
                        },
                        tablet: {
                            buffer: tabletImage,
                            originalname: `tablet-${baseName}.webp`,
                            mimetype: 'image/webp'
                        },
                        mobile: {
                            buffer: mobileImage,
                            originalname: `mobile-${baseName}.webp`,
                            mimetype: 'image/webp'
                        }
                    };
                }));

                // Générer le fichier ZIP
                const bufferStream = new WritableStreamBuffer();
                const archive = archiver('zip', { zlib: { level: 9 } });

                archive.on('error', function (err) {
                    throw err;
                });

                archive.pipe(bufferStream);
                res.locals.files.forEach(fileSet => {
                    archive.append(fileSet.desktop.buffer, { name: fileSet.desktop.originalname });
                    archive.append(fileSet.tablet.buffer, { name: fileSet.tablet.originalname });
                    archive.append(fileSet.mobile.buffer, { name: fileSet.mobile.originalname });
                });
                await archive.finalize();

                const zipBuffer = bufferStream.getContents();

                res.status(200).json({
                    files: res.locals.files,
                    zip: {
                        buffer: zipBuffer,
                        originalname: 'images.zip',
                        mimetype: 'application/zip'
                    }
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'An error occurred while processing the image.' });
        }
    });
};