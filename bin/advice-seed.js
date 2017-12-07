const Advice = require('../models/advice').Advice;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/senora-db', { useMongoClient: true });
const advices = [{
    id: 11,
    title: 'bed',
    voice: 'go to bed',
    text: 'go to bed',
    parentID: 1,
    childID: 2,
    favorite: true
},
{
    id: 12,
    title: 'shower',
    voice: 'go to shower',
    text: 'go to shower',
    parentID: 1,
    childID: 2,
    favorite: false
},
];
Advice.create(advices, (err, advices) => {
    if (err) {
        throw (err);
    }
    console.log('Success', advices);
    mongoose.connection.close();
});