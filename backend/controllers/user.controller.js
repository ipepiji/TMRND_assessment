const Sequelize = require('sequelize');

const User = require('../database/models/user.model');
const Task = require('../database/models/task.model');
const Subtask = require('../database/models/subtask.model');
require('../database/models/relationships');
const errors = require('../utils/errors');

module.exports.getTasks = function (req, res, next) {
    User.findOne({
        where: {
            username: req.user.username
        },
        include: [{
            model: Task,
            as: "task"
        }]
    }).then((user) => {
        return res.status(200).json({
            status: "success",
            data: user.task
        });
    }).catch((error) => {
        res.status(500);
        return next(error);
    });
}

module.exports.getTaskByDate = function (req, res, next) {
    User.findOne({
        where: {
            username: req.user.username
        },
        include: [{
            model: Task,
            as: "task",
            where: {
                date: req.query.date
            },
            include: [{
                model: Subtask,
                as: "subtask"
            }]
        }]
    }).then((user) => {
        if (!user)
            return res.status(400).json({
                status: "error",
                message: errors.taskNotExist
            });

        return res.status(200).json({
            status: "success",
            data: user.task[0]
        });
    }).catch((error) => {
        res.status(500);
        return next(error);
    });
}

module.exports.getSubtaskById = function (req, res, next) {
    Subtask.findByPk(req.params.id)
        .then((subtask) => {
            if (!subtask)
                return res.status(400).json({
                    status: "error",
                    message: errors.subtaskNotExist
                });

            return res.status(200).json({
                status: "success",
                data: subtask
            });
        }).catch((error) => {
            res.status(500);
            return next(error);
        });
}

module.exports.createSubtask = function (req, res, next) {
    User.findOne({
        where: {
            id: req.user.id
        },
        include: [{
            model: Task,
            as: "task",
            where: {
                date: req.body.date
            }
        }]
    }).then((user) => {
        if (!user) {
            Task.create({
                user_id: req.user.id,
                date: req.body.date,
                hour: req.body.hour,
                req_hour: req.body.req_hour,
                status: req.body.hour >= req.body.req_hour ? "COMPLETE" : "PENDING",
            }).then((task) => {
                Subtask.create({
                    task_id: task.id,
                    hour: req.body.hour,
                    description: req.body.description
                }).then((subtask) => {
                    return res.status(201).json({
                        status: "success",
                        data: subtask
                    });
                }).catch((error) => {
                    res.status(500);
                    return next(error);
                });
            }).catch((error) => {
                res.status(500);
                return next(error);
            });
        } else {
            const { hour } = user.task[0];
            const updated_task = {
                req_hour: req.body.req_hour,
                hour: hour + req.body.hour,
                status: (hour + req.body.hour).toFixed(2) >= req.body.req_hour ? "COMPLETE" : "PENDING",
            };

            Promise.all([
                Task.update(updated_task, {
                    where: {
                        id: user.task[0].id
                    }
                }),
                Subtask.create({
                    task_id: user.task[0].id,
                    hour: req.body.hour,
                    description: req.body.description
                })
            ]).then(([task, subtask]) => {
                return res.status(201).json({
                    status: "success",
                    data: subtask
                });
            }).catch((error) => {
                res.status(500);
                return next(error);
            });

        }
    }).catch((error) => {
        res.status(500);
        return next(error);
    });
}

module.exports.updateSubtask = function (req, res, next) {
    Promise.all([
        User.findOne({
            where: {
                id: req.user.id
            },
            include: [{
                model: Task,
                as: "task",
                include: [{
                    model: Subtask,
                    as: "subtask",
                    where: {
                        id: req.params.id
                    },
                }]
            }]
        }),
        Subtask.update(req.body, {
            where: {
                id: req.params.id
            }
        })
    ]).then(([user, subtask]) => {
        if (subtask[0] === 0)
            return res.status(400).json({
                status: "error",
                message: errors.subtaskNotExist
            });

        const { id, req_hour } = user.task[0];
        User.findOne({
            where: {
                id: req.user.id
            },
            attributes: [],
            include: [{
                model: Task,
                as: "task",
                attributes: [[Sequelize.fn('sum', Sequelize.col('task.subtask.hour')), 'total_hours']],
                where: {
                    id: user.task[0].id
                },
                include: [{
                    model: Subtask,
                    as: "subtask",
                    attributes: [],
                }]
            }],
        }).then((user) => {
            const updated_task = {
                hour: user.task[0].dataValues.total_hours,
                status: user.task[0].dataValues.total_hours.toFixed(2) >= req_hour ? "COMPLETE" : "PENDING",
            };
            Task.update(updated_task, {
                where: {
                    id
                }
            }).then((task) => {
                return res.status(200).json({
                    status: "success",
                    data: req.body
                });
            }).catch((error) => {
                res.status(500);
                return next(error);
            });
        }).catch((error) => {
            res.status(500);
            return next(error);
        });
    }).catch((error) => {
        res.status(500);
        return next(error);
    });
}

module.exports.deleteSubtask = function (req, res, next) {
    Task.findOne({
        include: [{
            model: Subtask,
            as: "subtask",
            where: {
                id: req.params.id
            },
        }]
    }).then((task) => {
        if (!task)
            return res.status(400).json({
                status: "error",
                message: errors.subtaskNotExist
            });

        const updatedTask = {
            hour: task.hour - task.subtask[0].hour,
            status: (task.hour - task.subtask[0].hour).toFixed(2) >= task.req_hour ? "COMPLETE" : "PENDING"
        };

        Promise.all([
            Task.update(updatedTask, {
                where: {
                    id: task.id
                },
            }),
            Subtask.destroy({
                where: {
                    id: req.params.id
                }
            })
        ]).then(([updated_task, subtask]) => {
            return res.status(200).json({
                status: "success",
                message: "deleted"
            });
        }).catch((error) => {
            res.status(500);
            return next(error);
        });
    }).catch((error) => {
        res.status(500);
        return next(error);
    });
}

module.exports.leave = function (req, res, next) {
    User.findOne({
        where: {
            id: req.user.id
        },
        include: [{
            model: Task,
            as: "task",
            where: {
                date: req.body.date
            }
        }]
    }).then((user) => {
        if (!user) {
            Task.create({
                user_id: req.user.id,
                date: req.body.date,
                hour: 0,
                req_hour: req.body.req_hour,
                status: req.body.req_hour === 0 ? "ONLEAVE" : "PENDING"
            }).then((task) => {
                return res.status(201).json({
                    status: "success",
                    data: {
                        req_hour: req.body.req_hour
                    }
                });
            }).catch((error) => {
                res.status(500);
                return next(error);
            });
        } else {
            Task.update({
                req_hour: req.body.req_hour,
                status: req.body.req_hour === 0 ? "ONLEAVE" : user.task[0].hour >= req.body.req_hour ? "COMPLETE" : "PENDING"
            }, {
                where: {
                    id: user.task[0].id
                }
            }).then((task) => {
                return res.status(201).json({
                    status: "success",
                    data: {
                        req_hour: req.body.req_hour
                    }
                });
            }).catch((error) => {
                res.status(500);
                return next(error);
            });

        }
    }).catch((error) => {
        res.status(500);
        return next(error);
    });
}