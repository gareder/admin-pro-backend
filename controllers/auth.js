const { response } = require("express");
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");


const login = async(req, res = response) => {

  const { email, password } = req.body;

  try {

    // Verify email
    const dbUser = await User.findOne({ email });
    if (!dbUser) {
      return res.status(404).json({
        ok: false,
        msg: 'Invalid credentials Email'
      });
    }

    // Verify PW
    const validPassword = bcryptjs.compareSync(password, dbUser.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Invalidad credentials PW'
      });
    }

    // Generate Token JWT
    const token = await generateJWT(dbUser.id, dbUser.name);
    
    res.json({
      ok: true,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Check with admin'
    });
  }

}

const googleSignIn = async(req, res = response) => {

  const googleToken = req.body.token;

  try {
    
    const { name, email, picture } = await googleVerify(googleToken);
    // Verify if there's an user or not in the DB with the email
    const dbUser = await User.findOne({ email });
    let user;
    if(!dbUser) {
      user = new User({
        name,
        email,
        password: '@@@',
        img: picture,
        google: true,
      });
    } else {
      user = dbUser;
      user.google = true;
    }

    await user.save();

    // Generate Token JWT
    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      token
    });
    
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: 'Invalid token',
    });
  }

}

const renewToken = async(req, res = response) => {

  const id = req.id;
  
  // Generate Token JWT
  const token = await generateJWT(id);

  res.json({
    ok: true,
    token
  });

}

module.exports = {
  login,
  googleSignIn,
  renewToken
}