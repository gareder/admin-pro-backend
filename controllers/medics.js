const { response } = require('express');
const Medic = require('../models/medic');

const getMedics = async(req, res = response) => {

  const medics = await Medic.find().populate('user', 'name').populate('hospital', 'name');

  res.json({
    ok: true,
    medics
  });

}

const createMedic = async(req, res = response) => {

  const id = req.id;
  const medic = new Medic({ user:id, ...req.body});
  

  try {
    const dbMedic = await medic.save();

    res.json({
      ok: true,
      medic: dbMedic
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Check with admin'
    });
  }

}

const updateMedic = (req, res = response) => {

  res.json({
    ok: true,
    msg: 'PUT medic'
  });

}

const deleteMedic = (req, res = response) => {

  res.json({
    ok: true,
    msg: 'DELETE medic'
  });

}

module.exports = {
  getMedics,
  createMedic,
  updateMedic,
  deleteMedic
}
