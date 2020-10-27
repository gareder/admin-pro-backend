// Router api/all/:query


const { Router } = require('express');
const { getAll, getCollection } = require('../controllers/search');
const { validateJWT } = require('../middlewares/jwt-validator');

const router = Router();

router.get('/:query', validateJWT, getAll);

router.get('/collection/:collectiondb/:query', validateJWT, getCollection);

module.exports = router;
