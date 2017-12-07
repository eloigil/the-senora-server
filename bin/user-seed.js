const User = require('../models/user').User;
/*you have to do the .User even though u used the ES6 notation*/
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/senora-db', { useMongoClient: true });
const users = [{
  name: 'eloi',
  username: 'eloi',
  password: 'eloi1234',
  children: [],
  role: 'parent'
},
];
User.create(users, (err, users) => {
  if (err) {
    throw (err);
  }
  console.log('Success', users);
  mongoose.connection.close();
});