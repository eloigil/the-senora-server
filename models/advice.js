const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adviceSchema = new Schema({
    title: String,
    voice: String,
    text: String,
    parentID: {
        type: ObjectId,
        ref: 'User'
    },
    childID:  {
        type: ObjectId,
        ref: 'User'
    },
    favorite: Boolean
});

const Advice = mongoose.model('Advice', adviceSchema);

module.exports = {
    Advice
};