// Route /api/login
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn} = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validator');

const router = Router();

router.post('/', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').notEmpty(),
  fieldValidator
], 
login);

router.post('/google', [
  check('token', 'Token from google is required').notEmpty(),
  fieldValidator
], 
googleSignIn);

module.exports = router;
