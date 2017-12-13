const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const adviceSchema = new Schema({
  title: String,
  voice: String,
  text: String,
  childId: String,
  favorite: {
    type: Boolean,
    default: false
  },
  alert: {
    type: Boolean,
    default: false
  }
});

const Advice = mongoose.model('Advice', adviceSchema);

module.exports = {
  Advice
};
