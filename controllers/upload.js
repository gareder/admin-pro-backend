const path = require('path');
const fs = require('fs');
const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { uploadImage } = require("../helpers/upload-image");


const fileUpload = async(req, res = response) => {

  const { type, id } = req.params;

  // Validate type
  const validTypes = ['hospitals', 'medics', 'users'];
  if(!validTypes.includes(type)) {
    return res.status(400).json({
      ok: false,
      msg: 'Invalid Type'
    });
  }

  // Validate if there's a file
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: 'No files uploaded'
    });
  }

  // Process img
  const image = req.files.image;
  const splittedName = image.name.split('.'); // myimage.1.2.x.jpg
  const imageExt = splittedName[ splittedName.length - 1 ].toLowerCase();

  // Validate ext
  const validExts = ['jpg', 'png', 'jpeg', 'gif'];
  if(!validExts.includes(imageExt)) {
    return res.status(400).json({
      ok: false,
      msg: 'File extension not supported'
    });
  }

  // Generate an unique name for the image
  const imageName = `${ uuidv4() }.${ imageExt }`;

  // Path for the uploaded file
  const path = `./uploads/${ type }/${ imageName }`;

  // Use the mv() method to place the file somewhere on your server
  image.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: 'Error while moving the uploaded image'
      });
    }

    // Update DB
    uploadImage(type, id, imageName);

    res.json({
      ok: true,
      msg: 'File uploaded',
      imageName
    });

  });

}

const returnImage = (req, res = response) => {

  const { type, img } = req.params;
  const imagePath = path.join(__dirname, `../uploads/${ type }/${ img }`);

  // Default image
  if(fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    const imagePath = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(imagePath);
  }
  
}

module.exports = {
  fileUpload,
  returnImage
}
