const { Schema, model } = require('mongoose');

const UserSchema = Schema({

  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  img: { type: String },
  role: { type: String, required: true, default: 'USER_ROLE' },
  google: { type: Boolean, default: false }

});

// If we want to change the _id field to uid
UserSchema.method('toJSON', function() {
  const { __v, password, ...object } = this.toObject();
  // {__v, _id}
  // object.uid = _id;
  return object;
});

module.exports = model('User', UserSchema);
