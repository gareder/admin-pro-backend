const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const getUser = async(req, res) => {

  const from = Number(req.query.from) || 0;
  
  // const users = await User.find({}, 'name email role google').skip(from).limit(5);
  // const total = await User.count();
  // Promising the next two so both promises gets executed at the same time to avoid any latency problems
  const [users, total] = await Promise.all([
    User.find({}, 'name email role google img').skip(from).limit(5),
    User.countDocuments()
  ]);
  
  res.json({
    ok: true,
    users,
    id: req.id,
    total
  });

}

const createUser = async(req, res =  response) => {
  
  const { password, email } = req.body;

  try {

    const emailExist = await User.findOne({ email });

    if (emailExist) {
      res.status(400).json({
        ok: false,
        msg: 'The email already exists'
      });
    }
      
    const user = new User(req.body);

    // Crypting password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    // Generate Token JWT
    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      user,
      token
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Unexpecter error'
    });
  }

}

const updateUser = async(req, res =  response) => {
  
  // TODO: Validate token y check if it's the correct user

  const id = req.params.id;

  try {

    const dbUser = await User.findById( id);

    if (!dbUser) {
      return res.status(404).json({
        ok: false,
        msg: 'No user found with the given ID'
      });
    }

    // Updates
    const { password, google, email, ...fields } = req.body;
    
    if (dbUser.email !== email) {

      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          ok: false,
          msg: 'An user exists with the given email'
        });
      }
    }

    if (!dbUser.google) {
      fields.email = email;
    } else if (dbUser.email !== email) {
      return res.status(400).json({
        ok: false,
        msg: `Google users can't change their email`
      });
    }
    

    const updatedUser = await User.findByIdAndUpdate(id, fields, { new: true });

    res.json({
      ok: true,
      user: updatedUser
    });

  } catch (error) {

    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Unexpected error'
    });

  }

}

const deleteUser = async(req, res = response) => {
  
  const id = req.params.id;

  try {

    const dbUser = await User.findById(id);

    if (!dbUser) {
      return res.status(404).json({
        ok: false,
        msg: 'No user found with the given ID'
      });
    }

    await User.findByIdAndDelete(id);
    
    res.json({
      ok: true,
      msg: 'User deleted'
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Unexpected Error'
    });
  }


}

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser
}
