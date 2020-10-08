// Route /api/hospitals
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

router.put('/:id', [], updateMedic);

router.delete('/:id', deleteMedic);


module.exports = router;