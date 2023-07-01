const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService();
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");


// check is user is authenticated
isAuthenticated = catchAsync(async (req, res, next) => {
  const { token } = req.cookies;
  // Make sure token exists
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You must Log In");

  }
  try {
    // Verify token
    req.user = await AuthServiceInstance.verifyToken(token)
    next();

  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You must Log In");

  }
})



const validateSchema = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(422).json(error);
  } else {
    next();
  }
};

module.exports = { validateSchema, isAuthenticated };
