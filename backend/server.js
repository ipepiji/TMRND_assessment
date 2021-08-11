require('dotenv').config();

const express = require('express');
const app = express();
const multer = require('multer');
const helmet = require("helmet");
const cors = require('cors');

const database = require('./database');
const middlewares = require('./middlewares');
const routes = require('./routes');
const errors = require('./utils/errors');

app.use(express.urlencoded({ extended: true }));     // Parsing application/x-www-form-urlencoded
app.use(express.json());                             // Parsing application/json
app.use(multer().array());                           // Parsing formData
app.use(express.static('public'));

app.use(helmet());
app.use(cors());

app.use((req, res, next) => {
    console.info(`${new Date().toISOString()} => ${req.method} ${req.originalUrl}`);
    return next();
});

app.get('/', (req, res, next) => {
    return res.status(200).json({
        status: "success",
        message: "Health Check, OK!"
    });
});

app.get('/connection/db', async (req, res, next) => {
    let conn = await database.connect();
    if (conn === "success")
        return res.status(200).json({
            status: "success",
            message: "Database Connection Check, OK!"
        });
    else {
        const error = new Error(errors.databaseConnectionFail);
        return next(error);
    }
})

database.connect().then(result => {
    if (result === "success")
        console.info("Connection has been established successfully.");
    else
        console.warn("\x1b[31m", "Unable to connect to the database:");

    app.use("/api/v1", routes);

    app.use(middlewares.notFound);
    app.use(middlewares.errorHandler);
})

module.exports = app;