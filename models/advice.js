const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const adviceSchema = new Schema({
    title: String,
    voice: String,
    text: String,
    childId: {
        type: ObjectId,
        ref: 'User'
    },
    favorite: Boolean
});

const Advice = mongoose.model('Advice', adviceSchema);

module.exports = {
    Advice
};