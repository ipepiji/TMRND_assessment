const express = require('express');
const authRoute = express.Router();

const controller = require('../controllers/auth.controller');
const { validations } = require('../middlewares');

authRoute.route('/register')
    .post(validations.auth.validate('register'), controller.register);

authRoute.route('/login')
    .post(validations.auth.validate('login'), controller.login);

module.exports = authRoute;