// Route /api/users
const { Router } = require('express');
const { check } = require('express-validator');
const { getUser, createUser, updateUser, deleteUser } = require('../controllers/user');
const { fieldValidator } = require('../middlewares/field-validator');
const { validateJWT, validateADMIN_ROLE, validateADMIN_ROLE_or_SameUser } = require('../middlewares/jwt-validator');

const router = Router();

router.get('/', validateJWT, getUser);

router.post('/', [ 
  check('name', 'Name is required').notEmpty(),
  check('password', 'Password is required').notEmpty(),
  check('email', 'Email is required').notEmpty().isEmail(),
  fieldValidator
],
createUser);

router.put('/:id', [
  validateJWT,
  validateADMIN_ROLE_or_SameUser,
  check('name', 'Name is required').notEmpty(),
  check('email', 'Email is required').notEmpty().isEmail(),
  check('role', 'Role is required').notEmpty(),
  fieldValidator
], 
updateUser);

router.delete('/:id', [validateJWT, validateADMIN_ROLE], deleteUser);


module.exports = router;
