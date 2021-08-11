const passport = require("passport");

const errors = require('../../utils/errors');

module.exports.authenticate = function (req, res, next) {
    passport.authenticate("jwt", { session: false }, function (error, jwtPayload) {
        if (!jwtPayload) {
            res.status(401);
            const error = new Error(errors.unauthorized);
            return next(error);
        }
        req.user = jwtPayload;
        return next();
    })(req, res, next);
}