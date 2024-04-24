const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

const upload = multer({
    storage: multer.memoryStorage(), 
    limits: {
        fileSize: 15 * 1024 * 1024, // Limite à 15MB
    }
}).any();

const processImage = async (file) => {
    const buffer = await sharp(file.buffer)
        .webp({ quality: 100})
        .toBuffer();
    return buffer;
}

module.exports = (req, res) => {
    upload(req, res, async function (err) {
        // verifie si multer a rencontré une erreur lors de l'upload des fichiers
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }

        try {
            if (req.files) {
                res.locals.files = await processImage(req.files[0]);
                const baseName = path.parse(req.files[0].originalname).name;

                res.status(200).json({
                    buffer: res.locals.files,
                    originalname: `${baseName}.webp`,
                    mimetype: 'image/webp',
                });
            } else {
                res.status(400).json({ error: 'No files were uploaded.' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An error occurred while processing the image.' });
        }
    });
}