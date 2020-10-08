const { response } = require('express');
const User = require('../models/user');
const Hospital = require('../models/hospital');
const Medic = require('../models/medic');

const getAll = async(req, res = response) => {

  const query = req.params.query;
  const regex = new RegExp(query, 'i');

  const [users, hospitals, medics] = await Promise.all([
    User.find({ name: regex }),
    Hospital.find({ name: regex }),
    Medic.find({ name: regex })
  ]);

  res.json({
    ok: true,
    users,
    hospitals,
    medics
  });
}

const getCollection = async(req, res = response) => {

  const collectiondb = req.params.collectiondb;
  const query = req.params.query;
  const regex = new RegExp(query, 'i');
  let data;

  switch (collectiondb) {
    case 'medics':
      data = await Medic.find({ name: regex }).populate('user', 'name img').populate('hospital', 'name img');
      
      break;
    
    case 'hospitals':
      data = await Hospital.find({ name: regex }).populate('user', 'name img');
      break;
    
    case 'users':
      data = await User.find({ name: regex });
      break;
  
    default:
      return res.status(400).json({
        ok: false,
        msg: 'You have to search for Users/Medics/Hospitals'
      });
  }

  res.json({
    ok: true,
    results: data
  });

}

module.exports = {
  getAll,
  getCollection
}
