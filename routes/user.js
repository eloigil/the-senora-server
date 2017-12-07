var express = require('express');
var router = express.Router();

// User model
const User = require('../models/user').User;
//Advice model
const Advice = require('../models/advice').Advice;


/* GET children. */
router.get('/user/children', function (req, res, next) {
    User.find({}).populate('children').exec((err, result) => {
        if (err) {
            next(err);
            return;
        }
        res.json(result);
    });
});

/* POST child. */
router.post('/user/children', function (req, res, next) {
    const {
        name,
        username,
        password
      } = req.body;

    if (!name) {
        return res.unprocessable(req, res, 'Missing mandatory field "name".');
    }
    if (!username) {
        return res.unprocessable(req, res, 'Missing mandatory field "username".');
    }
    if (!password) {
        return res.unprocessable(req, res, 'Missing mandatory field "password".');
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
            const user = req.user;
            user.children.push(result._id);
            user.save((err) => {
                if (err) {
                    return next(err);
                }
                res.json(result);
            })
        });
    });
});

/*DELETE child.*/
router.delete('/user/:childId', (req, res, next) => {
    User.findByIdAndRemove(req.params.childId, (err, result) => {
        if (err) {
            return next(err);
        }
        User.findById(req.user._id, (err, result) => {
            if (err) {
                return next(err);
            }
            result.children.splice(result.children.indexOf(req.params.childId), 1);

            result.save((err) => {
                if (err) {
                    return next(err);
                }
                //Remove advices of children
                // Advice.find({ childId: req.params.childId }, (err, result) => {
                //     if (err) {
                //         return next(err);
                //     }                
                // });
            });
        });
    });
});

module.exports = router;
