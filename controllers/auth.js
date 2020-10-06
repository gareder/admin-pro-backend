const { response } = require("express");
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require("../helpers/jwt");
const { db } = require("../models/user");


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

module.exports = {
  login
}