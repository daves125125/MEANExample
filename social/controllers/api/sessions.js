var jwt = require('jwt-simple');
var bcrypt = require('bcrypt-nodejs');

var router = require('express').Router();
var config = require('../../config');
var User = require('../../models/user');

router.post('/api/sessions', function (req, res, next) {

    User.findOne({username: req.body.username})
        .select('password').select('username')
        .exec(function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.sendStatus(401);
            }
            bcrypt.compare(req.body.password, user.password, function (err, valid) {
                if (err) {
                    return next(err);
                }
                if (!valid) {
                    return res.sendStatus(401);
                }
                var token = jwt.encode({username: user.username}, config.secretKey);
                res.send(token);
            });
        });
});


module.exports = router;