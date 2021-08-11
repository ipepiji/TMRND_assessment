const Sequelize = require("sequelize");
const sequelize = require("../index");

const User = sequelize.define("user", {
    id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false,
    },
    password: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    timestamps: true
});

module.exports = User;