const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../middlewares/auth/passport")(passport);

const controller = require('../controllers/user.controller');
const { validations } = require('../middlewares');

router.route('/task')
    .get(controller.getTasks);

router.route('/task/query')
    .get(validations.user.validate('filter_task'), controller.getTaskByDate);

router.route('/subtask')
    .post(validations.user.validate('create_subtask'), controller.createSubtask)

router.route('/subtask/:id')
    .get(controller.getSubtaskById)
    .put(validations.user.validate('update_subtask'), controller.updateSubtask)
    .delete(controller.deleteSubtask);


module.exports = router;