var jwt = require('jwt-simple');
var bcrypt = require('bcrypt-nodejs');

var router = require('express').Router();
var config = require('../../config');
var User = require('../../models/user');

router.post('/api/users', function (req, res, next) {
    var user = new User({username: req.body.username});
    bcrypt.hash(req.body.password, null, null, function (err, hash) {
        user.password = hash;
        user.save(function (err, user) {
            if (err) {
                throw next(err);
            }
            res.status(201).json(user);
        });
    });
});

router.get('/api/users', function (req, res) {

    var token = req.headers['x-auth'];
    var auth = jwt.decode(token, config.secretKey);

    User.findOne({username: auth.username}, function (err, user) {
        res.json(user);
    })
});

module.exports = router;