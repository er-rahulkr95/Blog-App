const express = require("express");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const morgan = require("morgan")
const { errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const cookieParser = require('cookie-parser');
const app = express();


app.use(morgan('dev'));

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// cookie parser
app.use(cookieParser());

// enable cors
app.use(cors());
app.options("*", cors());




// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// handle error
app.use(errorHandler);

module.exports = app;