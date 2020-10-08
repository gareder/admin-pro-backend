// Router api/uploads/

// Route /api/login
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload, returnImage } = require('../controllers/upload');

const { validateJWT } = require('../middlewares/jwt-validator');

const router = Router();

router.use(expressFileUpload());

router.put('/:type/:id', validateJWT, fileUpload);

router.get('/:type/:img', returnImage);


module.exports = router;
