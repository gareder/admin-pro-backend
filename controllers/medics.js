const { response } = require('express');
const Medic = require('../models/medic');

const getMedics = async(req, res = response) => {

  const medics = await Medic.find().populate('user', ['name', 'img']).populate('hospital', ['name', 'img']);

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

const updateMedic = async(req, res = response) => {
  // Medic ID
  const { id } = req.params;
  // User ID
  const uid = req.id;

  try {

    const dbMedic = await Medic.findById(id);
    if(!dbMedic) {
      return res.status(404).json({
        ok: false,
        msg: 'No medic found'
      });
    }
  
    const medicChanges = { ...req.body, user: uid };
    const updatedMedic = await Medic.findByIdAndUpdate(id, medicChanges, { new: true });
    
    res.json({
      ok: true,
      updatedMedic
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Chck with admin'
    });
  }

}

const deleteMedic = async(req, res = response) => {

  // Medic ID
  const { id } = req.params;

  try {

    const dbMedic = await Medic.findById(id);
    if(!dbMedic) {
      return res.status(404).json({
        ok: false,
        msg: 'No medic found'
      });
    }
  
    await Medic.findByIdAndDelete(id)
    
    res.json({
      ok: true
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Chck with admin'
    });
  }
}

const getMedic = async(req, res = response) => {

  const id = req.params.id;

  try {

    const medic = await Medic.findById(id).populate('user', ['name', 'img']).populate('hospital', ['name', 'img']);

    res.json({
      ok: true,
      medic
    });
    
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: 'Check with admin'
    });
  }


}

module.exports = {
  getMedics,
  createMedic,
  updateMedic,
  deleteMedic,
  getMedic
}
