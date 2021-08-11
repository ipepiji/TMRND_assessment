const Joi = require('joi');

module.exports.validate = (method) => {
    return function (req, res, next) {
        let schema,
            req_value,
            req_type;

        switch (method) {
            case "filter_task": {
                schema = Joi.object().keys({
                    date: Joi.date().required(),
                })
                req_value = req.query;
                req_type = "query";
                break;
            }

            case "create_subtask": {
                schema = Joi.object({
                    date: Joi.date().required(),
                    req_hour: Joi.number().required(),
                    hour: Joi.number().required(),
                    description: Joi.string().min(4).max(50).required(),
                })
                req_value = req.body;
                req_type = "body";
                break;
            }

            case "update_subtask": {
                schema = Joi.object({
                    hour: Joi.number().required(),
                    description: Joi.string().min(4).max(50).required(),
                })
                req_value = req.body;
                req_type = "body";
                break;
            }

            default: {
                break;
            }
        }

        const { error, value } = schema.validate(req_value);

        if (error) {
            res.status(400);
            return next(error);
        }

        if (req_type === "query")
            req.query = value;
        if (req_type === "body")
            req.body = value;

        return next();
    }
}