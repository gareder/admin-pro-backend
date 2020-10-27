const jwt = require("jsonwebtoken");
const User = require('../models/user');


const validateJWT = (req, res, next) => {

  // Read token
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No token'
    });
  }

  try {

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.id = id;
    next();
    
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Invalid token'
    });
  }
}

const validateADMIN_ROLE = async(req, res, next) => {

  const id = req.id;

  try {

    const dbUser = await User.findById(id);

    if (!dbUser) {
      return res.status(404).json({
        ok: false,
        msg: 'No user found'
      });
    }

    if (dbUser.role !== 'ADMIN_ROLE') {
      return res.status(403).json({
        ok: false,
        msg: 'Unauthorized'
      });
    }

    next();
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Check with the system administrator'
    });
  }

}

const validateADMIN_ROLE_or_SameUser = async(req, res, next) => {

  const id = req.id;
  // Getting the id of the user you'd like to modify
  const paramsId = req.params.id;

  try {

    const dbUser = await User.findById(id);

    if (!dbUser) {
      return res.status(404).json({
        ok: false,
        msg: 'No user found'
      });
    }

    if (dbUser.role === 'ADMIN_ROLE' || id === paramsId) {
     
      next();

    } else {

      return res.status(403).json({
        ok: false,
        msg: 'Unauthorized'
      });

    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Check with the system administrator'
    });
  }

}

module.exports = {
  validateJWT,
  validateADMIN_ROLE,
  validateADMIN_ROLE_or_SameUser
}
