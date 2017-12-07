var express = require('express');
var router = express.Router();

// Advice model
const Advice = require('../models/advice').Advice;
// User model
// const User = require('../models/user').User;


/* GET advises for each child. */
router.get('/advices/:childId', function (req, res, next) {
    Advice.find({ childID: req.params.childId }, (err, result) => {
        if (err) {
            next(err);
            return;
        }
        res.json(result);
    });
});

/* GET favorite advices. */
router.get('/advices/:childId/favorites', function (req, res, next) {
    Advice.find({ childID: req.params.childId, favorite: true }, (err, result) => {
        if (err) {
            next(err);
            return;
        }
        res.json(result);
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
            res.json(data)
        });

    });
});

/*POST new advice*/
router.post('/advices', (req, res, next) => {
    const {
        title,
        voice,
        text,
        parentID,
        childID,
        favorite
      } = req.body;


    if (!title) {
        return res.unprocessable(req, res, 'Missing mandatory field "title".');
    }
    if (!voice) {
        return res.unprocessable(req, res, 'Missing mandatory field "voice".');
    }
    if (!text) {
        return res.unprocessable(req, res, 'Missing mandatory field "text".');
    }
    if (!childID) {
        return res.unprocessable(req, res, 'Select a child');
    }
    res.json(res);
});


module.exports = router;
