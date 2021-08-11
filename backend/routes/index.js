const express = require("express");
const router = express.Router();

const authAPI = require("./auth.route");
const userApi = require("./user.route");
const { auth } = require('../middlewares');

router.use("/auth", authAPI);
router.use("/user", auth.authenticate, userApi);

module.exports = router;