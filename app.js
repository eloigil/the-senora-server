const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const MongoStore = require('connect-mongo')(session);


const index = require('./routes/index');
const advices = require('./routes/advices');


const app = express();

mongoose.connect('mongodb://localhost/senora-db', { useMongoClient: true });



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(cors());


app.use('/', index);
app.use('/', advices);



// app.use(session({
//   store: new MongoStore({
//     mongooseConnection: mongoose.connection,
//     ttl: 24 * 60 * 60 // 1 day (in seconds)
//   }),
//   secret: 'some-string',
//   resave: true,
//   saveUninitialized: true,
//   cookie: {
//     maxAge: 24 * 60 * 60 * 1000 // (1 day in miliseconds)
//   }
// }));


// catch 404 and error handler

app.use((req, res) => {
  res.status(404);
  res.json({ error: 'error.not-found' });
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only send response if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.json({ error: 'error.unexpected' });
  }
});

module.exports = app;