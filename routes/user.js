const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const response = require('../helpers/response');

// User model
const User = require('../models/user').User;
// Advice model
// const Advice = require('../models/advice').Advice;

/* GET children. */
router.get('/user/children', (req, res, next) => {
  if (!req.user) {
    return response.forbidden(req, res);
  }
  User.find({ _id: req.user.id }).populate('children').exec((err, result) => {
    if (err) {
      next(err);
      return;
    }
    response.data(req, res, result);
  });
});

/* GET child. */
router.get('/user/:id', (req, res, next) => {
  if (!req.user) {
    return response.forbidden(req, res);
  }
  User.findById(req.params.id, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    response.data(req, res, result);
  });
});

/* POST child. */
router.post('/user/child', (req, res, next) => {
  if (!req.user) {
    return response.forbidden(req, res);
  }
  const {
    name,
    username,
    password
  } = req.body;

  if (!name) {
    return response.unprocessable(req, res, 'Missing mandatory field "name".');
  }
  if (!username) {
    return response.unprocessable(req, res, 'Missing mandatory field "username".');
  }
  if (!password) {
    return response.unprocessable(req, res, 'Missing mandatory field "password".');
  }

  User.findOne({
    username
  }, 'username', (err, userExists) => {
    if (err) {
      return next(err);
    }
    if (userExists) {
      return response.unprocessable(req, res, 'Username already in use.');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      name,
      username,
      password: hashPass,
      role: 'child'
    });

    User.create(newUser, (err, result) => {
      if (err) {
        return next(err);
      }
      User.update({ _id: req.user._id }, { $push: { children: result._id } }, (err, updatedResult) => {
        if (err) {
          return next(err);
        }
        response.ok(req, res);
      });
    });
  });
});

/* DELETE child. */
router.delete('/user/:childId', (req, res, next) => {
  if (!req.user) {
    return response.forbidden(req, res);
  }
  User.findByIdAndRemove(req.params.childId, (err, result) => {
    if (err) {
      return next(err);
    } name;
    User.findById(req.user._id, (err, result) => {
      if (err) {
        return next(err);
      }
      result.children.splice(result.children.indexOf(req.params.childId), 1);

      result.save((err) => {
        if (err) {
          return next(err);
        }
        // Remove advices of children
        // Advice.find({ childId: req.params.childId }, (err, result) => {
        //     if (err) {
        //         return next(err);
        //     }
        // });
        // @todo remove advice of children
        // @todo send response to frontend
      });
    });
  });
});

module.exports = router;
