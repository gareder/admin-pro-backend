const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitals = async(req, res = response) => {

  const hospitals = await Hospital.find().populate('user', 'name');

  res.json({
    ok: true,
    hospitals
  });

}

const createHospital = async(req, res = response) => {

  const id = req.id;
  const hospital = new Hospital({ user:id, ...req.body});

  try {

    const dbHospital = await hospital.save();

    res.json({
      ok: true,
      hospital: dbHospital
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Check with admin'
    });
  }

}

const updateHospital = (req, res = response) => {

  res.json({
    ok: true,
    msg: 'PUT hospital'
  });

}

const deleteHospital = (req, res = response) => {

  res.json({
    ok: true,
    msg: 'DELETE hospital'
  });

}

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital
}
