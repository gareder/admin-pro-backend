// Route /api/medics
const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/jwt-validator');
const { getMedics, createMedic, updateMedic, deleteMedic } = require('../controllers/medics');


const router = Router();

router.get('/', getMedics);

router.post('/', [
  validateJWT,
  check('name', 'Medic name is required').notEmpty(),
  check('hospital', 'Hospital ID must be valid').isMongoId(),
  fieldValidator
], createMedic);

router.put('/:id', [
  validateJWT,
  check('name', 'Medic name is required').notEmpty(),
  check('hospital', 'Hospital ID must be valid').isMongoId(),
  fieldValidator
], updateMedic);

router.delete('/:id', validateJWT, deleteMedic);


module.exports = router;