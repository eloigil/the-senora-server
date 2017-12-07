var express = require('express');
var router = express.Router();

// Advice model
const Advice = require('../models/advice').Advice;
// User model
// const User = require('../models/user').User;

/* GET all advices. */
router.get('/advices', function (req, res, next) {
    Advice.find({}, (err, result) => {
        if (err) {
            next(err);
            return;
        }
        res.json(result);
    });
});

/* GET favorite advices. */
router.get('/advices/favorites', function (req, res, next) {
    Advice.find('favorite': 'true'){}, (err, result) => {
        if (err) {
            next(err);
            return;
        }
        res.json(result);
    });
});

/* GET advises for each child. */
router.get('/advices/child/:id', function (req, res, next) {
    Advice.find('childID': 'true'){}, (err, result) => {
        if (err) {
            next(err);
            return;
        }
        res.json(result);
    });
});

/* PUT advice. */
router.put('/advices/:id', function (req, res, next) {
    findByIdAndUpdate()
});

module.exports = router;
