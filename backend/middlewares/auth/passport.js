const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;

const User = require('../../database/models/user.model');
const errors = require('../../utils/errors');

module.exports = function (passport) {
    passport.use(
        new StrategyJwt(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_SECRET,
            },
            function (jwtPayload, done) {
                const { username } = jwtPayload;
                if (username) {
                    User.findOne({
                        where: {
                            username
                        }
                    }).then((user) => {
                        if (!user || user.length === 0 || user[0] === 0) {
                            const error = new Error(errors.unauthorized);
                            return done(error, false);
                        }

                        return done(null, jwtPayload);
                    }).catch((error) => {
                        return done(error, false);
                    });
                }
                else {
                    const error = new Error(errors.unauthorized);
                    return done(error, false);
                }
            }
        )
    );
}