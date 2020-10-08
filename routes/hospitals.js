// Route /api/hospitals
const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/jwt-validator');
const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospital');

const router = Router();

router.get('/', getHospitals);

router.post('/', [
  validateJWT,
  check('name', 'Hospital name is required').notEmpty(),
  fieldValidator
], createHospital);

router.put('/:id', [], updateHospital);

router.delete('/:id', deleteHospital);


module.exports = router;