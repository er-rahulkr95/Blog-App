const express = require("express");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const morgan = require("morgan");
const { errorHandler } = require("./middlewares/error.middleware");
const ApiError = require("./utils/ApiError");
const cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require("xss-clean");
const rateLimit = require('express-rate-limit')
const hpp = require('hpp');

const app = express();

const authRoutes = require("./routes/auth.routes")
const postRoutes = require("./routes/post.routes")

const configurePassport = require("./config/passport");
const passport = require("passport");



app.use(morgan('dev'));

configurePassport(passport);



// set security HTTP headers
// app.use(helmet());

// // parse json request body
// app.use(express.json({limit: '50mb'}));

// // parse urlencoded request body
// app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: "15mb" }));
app.use(bodyParser.urlencoded({
  limit: "15mb",
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

// security

// set security HTTP headers
// app.use(helmet());

// prevent sql injection
app.use(mongoSanitize());



// prevent cross-site scripting xss
app.use(xssClean());

// security to limit request to api endpoint per 15 min per IP address
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter);
//HTTP Param Pollution
app.use(hpp());

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