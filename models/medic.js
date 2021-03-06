const { Schema, model } = require('mongoose');

const MedicSchema = Schema({

  name: { type: String, required: true },
  img: { type: String },
  status: { type: Number, required: true, default: 1 },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  hospital: { type: Schema.Types.ObjectId, ref: 'Hospital', required: true }

});

// If we want to change the _id field to uid
MedicSchema.method('toJSON', function() {
  const { __v, ...object } = this.toObject();
  // {__v, _id}
  // object.uid = _id;
  return object;
});

module.exports = model('Medic', MedicSchema);
