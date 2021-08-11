const User = require('./user.model');
const Task = require('./task.model');
const Subtask = require('./subtask.model');

User.hasMany(Task, {
    foreignKey: 'user_id',
    as: 'task'
});

Task.hasMany(Subtask, {
    foreignKey: 'task_id',
    as: 'subtask'
});


Task.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'task'
});

Subtask.belongsTo(Task, {
    foreignKey: 'task_id',
    as: 'task'
});