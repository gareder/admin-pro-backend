const fs = require('fs');
const User = require('../models/user');
const Medic = require('../models/medic');
const Hospital = require('../models/hospital');


//Checking if there's a previous img assigned to the medic, if there's one we'll delete it
const deleteImage = (path) => {
  if(fs.existsSync(path)) {
    // Deleting any previous img
    fs.unlinkSync(path);
  }
}

const uploadImage = async(type, id, imageName) => {

  let oldPath = '';

  switch (type) {
    case 'medics':
      const medic = await Medic.findById(id);
      if(!medic) {
        console.log('No medic found with the given id');
        false; //Means the img was not uploaded
      }

      oldPath = `./uploads/medics/${ medic.img }`;
      deleteImage(oldPath);

      medic.img = imageName;
      await medic.save();
      return true;

      break;
    
      case 'hospitals':
        const hospital = await Hospital.findById(id);
        if(!hospital) {
          console.log('No hospital found with the given id');
          false; //Means the img was not uploaded
        }

        oldPath = `./uploads/hospitals/${ hospital.img }`;
        deleteImage(oldPath);
        
        hospital.img = imageName;
        await hospital.save();
        return true;
      break;
    
      case 'users':
        const user = await User.findById(id);
        if(!user) {
          console.log('No user found with the given id');
          false; //Means the img was not uploaded
        }

        oldPath = `./uploads/users/${ user.img }`;
        deleteImage(oldPath);
        
        user.img = imageName;
        await user.save();
        return true;
      break;
  
    default:
      break;
  }

}

module.exports = {
  uploadImage
}
