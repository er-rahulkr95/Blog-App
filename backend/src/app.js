const express = require("express");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const morgan = require("morgan");
const { errorHandler } = require("./middlewares/error.middleware");
const ApiError = require("./utils/ApiError");
const cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

const app = express();

const authRoutes = require("./routes/auth.routes")
const postRoutes = require("./routes/post.routes")

const configurePassport = require("./config/passport");
const passport = require("passport");



app.use(morgan('dev'));

configurePassport(passport);

// // parse json request body
// app.use(express.json({limit: '50mb'}));

// // parse urlencoded request body
// app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
  limit: "5mb",
  extended: true
}));

// gzip compression
app.use(compression());

// cookie parser
app.use(cookieParser());

const corsConfig = {
    origin: true,
    credentials: true,
  };

// enable cors
app.use(cors(corsConfig));
app.options("*", cors());

//auth routes for register and login
app.use("/auth",authRoutes);
app.use("/post",postRoutes)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// handle error
app.use(errorHandler);

module.exports = app;