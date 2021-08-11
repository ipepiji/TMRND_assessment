const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../database/models/user.model');
require('../database/models/relationships');
const errors = require('../utils/errors');

module.exports.register = function (req, res, next) {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));
    User.findOrCreate({
        where: {
            username
        },
        defaults: {
            username,
            password: hashedPassword,
        },
    }).then((user) => {
        if (!user || user.length === 0 || !user[1]) {
            res.status(400);
            let errMsg = null;
            if (username === user[0].username)
                errMsg = errors.usernameExist;

            const error = new Error(errMsg);
            return next(error);
        }

        return res.status(201).json(user[0]);
    }).catch((error) => {
        res.status(500);
        return next(error);
    });
}

module.exports.login = function (req, res, next) {
    const { username, password } = req.body;
    User.findOne({
        where: {
            username
        },
    }).then((user) => {
        if (!user || user.length === 0 || user[0] === 0) {
            res.status(400);
            const error = new Error(errors.usernameNotExist);
            return next(error);
        }

        bcrypt.compare(password, user.password)
            .then((result) => {
                if (!result) {
                    res.status(400);
                    const error = new Error(errors.invalidPassword);
                    return next(error);
                }

                const payload = {
                    id: user.id,
                    username: user.username,
                    iat: Math.floor(Date.now() / 1000)
                };

                const expiry = {
                    expiresIn: (60 * 60) * 24 * 7   // 1 week
                };

                jwt.sign(payload, process.env.JWT_SECRET, expiry, (error, token) => {
                    if (error)
                        return next(error);

                    return res.status(200).json({
                        token
                    });
                });
            })
            .catch((error) => {
                res.status(500);
                return next(error);
            });
    }).catch((error) => {
        res.status(500);
        return next(error);
    });
}
