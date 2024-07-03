const express = require('express');
const router = express.Router();
const compressMiddleware = require('../middlewares/compressPicture.middleware');
const convertPictureMiddleware = require('../middlewares/convertPicture.middleware');
const multiSizePictureMiddleware = require('../middlewares/multiSizePicture.middleware');
 
router.post('/convert', convertPictureMiddleware);
router.post('/compress', compressMiddleware);
router.post('/multi-size', multiSizePictureMiddleware);

module.exports = router;