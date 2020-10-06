// Route /api/login
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validator');

const router = Router();

router.post('/', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').notEmpty(),
  fieldValidator
], 
login);

module.exports = router;
