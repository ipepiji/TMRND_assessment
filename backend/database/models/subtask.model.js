const Sequelize = require("sequelize");

const sequelize = require("../index");

const Subtask = sequelize.define("subtask", {
    id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    task_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: 'task',
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    hour: {
        type: Sequelize.DataTypes.DOUBLE(24, 2),
        allowNull: false
    },
    description: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false
    },
}, {
    timestamps: true
});

module.exports = Subtask;