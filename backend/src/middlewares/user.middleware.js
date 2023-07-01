const UserService = require("../services/user.service");
const UserServiceInstance = new UserService();
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");


const checkUserExistsInDB = catchAsync(async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserServiceInstance.findByEmail(email);
    if (!user)
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
    else {
      next();
    }
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Could not find user"
    );
    }
});

module.exports = {checkUserExistsInDB };
