const validations = require("./validations");
const { notFound, errorHandler } = require("./error_handling");
const auth = require("./auth");

const middlewares = {
    validations,
    notFound,
    errorHandler,
    auth,
}

module.exports = middlewares;