const express = require('express');
const router = express.Router();
const response = require('../helpers/response');

// Advice model
const Advice = require('../models/advice').Advice;

/* GET advises for each child. */
router.get('/advices/:childId', function (req, res, next) {
  Advice.find({ childId: req.params.childId }, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    response.data(req, res, result);
  });
});

/* GET favorite advices. */
router.get('/advices/:childId/favorites', function (req, res, next) {
  Advice.find({ childId: req.params.childId, favorite: true }, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    response.data(req, res, result);
  });
});

/* PUT advice. */
router.put('/advices/:id', function (req, res, next) {
  Advice.findById(req.params.id, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    result.favorite = !result.favorite;
    result.save((err, data) => {
      if (err) {
        next(err);
        return;
      }
      response.data(req, res, data);
    });
  });
});

/* POST new advice */
router.post('/advice', (req, res, next) => {
  const {
    title,
    voice,
    text,
    childId
  } = req.body;

  if (!title) {
    return response.unprocessable(req, res, 'Missing mandatory field "title".');
  }
  if (!voice) {
    return response.unprocessable(req, res, 'Missing mandatory field "voice".');
  }
  if (!text) {
    return response.unprocessable(req, res, 'Missing mandatory field "text".');
  }
  if (!childId) {
    return response.unprocessable(req, res, 'Select a child');
  }
  const newAdvice = Advice({
    title,
    voice,
    text,
    childId
  });

  newAdvice.save((err) => {
    if (err) {
      return next(err);
    }

    response.data(req, res, newAdvice);
  });
});

module.exports = router;
