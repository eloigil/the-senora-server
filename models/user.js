const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['parent', 'child'],
    default: 'parent'
  },
  children: {
    type: [ObjectId],
    ref: 'User'
  }
});

userSchema.methods.asData = function () {
  return {
    name: this.name,
    username: this.username,
    password: this.password

  };
};

const User = mongoose.model('User', userSchema);

module.exports = {
  User
  // this is the same than User:User
};
