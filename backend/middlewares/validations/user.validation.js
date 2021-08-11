const Joi = require('joi');

module.exports.validate = (method) => {
    return function (req, res, next) {
        let schema;

        switch (method) {
            case "create_subtask": {
                schema = Joi.object({
                    date: Joi.date().required(),
                    req_hour: Joi.number().required(),
                    hour: Joi.number().required(),
                    description: Joi.string().min(4).max(50).required(),
                })
                break;
            }

            case "update_subtask": {
                schema = Joi.object({
                    hour: Joi.number().required(),
                    description: Joi.string().min(4).max(50).required(),
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