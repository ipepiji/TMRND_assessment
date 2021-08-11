const auth = require("./auth.validation");
const user = require("./user.validation");

const validations = {
    auth,
    user
};

module.exports = validations;