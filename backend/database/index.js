const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.NODE_ENV === "production" ? process.env.DB_DATABASE : process.env.NODE_ENV === "test" ? process.env.DB_DATABASE_TEST : process.env.DB_DATABASE_DEV,
    process.env.NODE_ENV === "production" ? process.env.DB_USERNAME : process.env.NODE_ENV === "test" ? process.env.DB_USERNAME_TEST : process.env.DB_USERNAME_DEV,
    process.env.NODE_ENV === "production" ? process.env.DB_PASSWORD : process.env.NODE_ENV === "test" ? process.env.DB_PASSWORD_TEST : process.env.DB_PASSWORD_DEV,
    {
        host: process.env.NODE_ENV === "production" ? process.env.DB_HOST : process.env.NODE_ENV === "test" ? process.env.DB_HOST_TEST : process.env.DB_HOST_DEV,
        dialect: process.env.NODE_ENV === "production" ? process.env.DB_TYPE : process.env.NODE_ENV === "test" ? process.env.DB_TYPE_TEST : process.env.DB_TYPE_DEV,
        logging: false,
        define: {
            freezeTableName: true
        }
    }
);

sequelize.sync();

module.exports = sequelize;

module.exports.connect = async function (req, res, next) {
    try {
        await sequelize.authenticate();
        return "success";
    } catch (error) {
        return error;
    }
}