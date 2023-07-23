const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please fill in your name'],
    },
    lastName: String,
    email: {
      type: String,
      match: [/.+\@.+\..+/, 'This email is not valid'],
      unique: true,
      required: [true, 'Please fill in your email'],
    },
    password: {
      type: String,
      required: [true, 'Please fill in your password'],
    },
    role: {
      type: String,
      default: 'user',
    },
    punctuation: Number,
    confirmed: {
      type: Boolean,
      default: false,
    },
    tokens: [],
  },
  { timestamps: true }
);

UserSchema.statics.findById = async function (id) {
  const user = await this.findOne({ _id: id });
  return user;
};

UserSchema.methods.toJSON = function () {
  const user = this._doc;
  delete user.tokens;
  delete user.password;
  return user;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
