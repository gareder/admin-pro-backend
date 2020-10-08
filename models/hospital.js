const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({

  name: { type: String, required: true },
  img: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }

});

// If we want to change the _id field to uid
HospitalSchema.method('toJSON', function() {
  const { __v, ...object } = this.toObject();
  // {__v, _id}
  // object.uid = _id;
  return object;
});

module.exports = model('Hospital', HospitalSchema);
