const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {

  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log('DB ON!');

  } catch(error) {
    console.log(error);
    throw new Error('Error trying to start the DB');
  }

}

module.exports = {
  dbConnection
}