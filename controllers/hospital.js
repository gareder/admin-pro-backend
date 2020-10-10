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

const updateHospital = async(req, res = response) => {
  //Hospital ID
  const { id } = req.params;
  // User ID
  const uid = req.id;
  try {

    const dbHospital = await Hospital.findById(id);
    if(!dbHospital) {
      return res.status(404).json({
        ok: false,
        msg: 'No hospital found'
      });
    }

    const hospitalChanges = { ...req.body, user: uid }
    const updatedHospital = await Hospital.findByIdAndUpdate(id, hospitalChanges, { new: true });

    res.json({
      ok: true,
      updatedHospital
    });
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Check with admin'
    });
  }


}

const deleteHospital = async(req, res = response) => {

  //Hospital ID
  const { id } = req.params;

  try {

    const dbHospital = await Hospital.findById(id);
    if(!dbHospital) {
      return res.status(404).json({
        ok: false,
        msg: 'No hospital found'
      });
    }

    await Hospital.findByIdAndDelete(id);

    res.json({
      ok: true,
    });
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Check with admin'
    });
  }

}

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital
}
