const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');

require('dotenv').config();
const configurePassport = require('./helpers/passport');
const index = require('./routes/index');
const advices = require('./routes/advices');
const user = require('./routes/user');
const auth = require('./routes/auth');

const app = express();

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

app.use(cors({
  credentials: true,
  origin: [process.env.CLIENT_URL]
}));

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day (in seconds)
  }),
  secret: 'some-string',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // (1 day in miliseconds)
  }
}));

const passport = configurePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// routes

app.use('/', index);
app.use('/', advices);
app.use('/', user);
app.use('/auth', auth);

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
