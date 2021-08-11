const Joi = require('joi');

module.exports.validate = (method) => {
    return function (req, res, next) {
        let schema;

        switch (method) {
            case "register": {
                schema = Joi.object({
                    username: Joi.string().alphanum().min(4).max(20).required(),
                    password: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{3,30}$")).required(),
                    repeat_password: Joi.ref("password"),
                })
                    .with("password", "repeat_password");
                break;
            }

            case "login": {
                schema = Joi.object({
                    username: Joi.string().alphanum().min(4).max(20).required(),
                    password: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{3,30}$")).required()
                })
                break;
            }

            default: {
                break;
            }
        }

        const { error, value } = schema.validate(req.body)

        if (error) {
            res.status(400);
            return next(error);
        }

        req.body = value;
        return next();
    }
}