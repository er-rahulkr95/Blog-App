const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService();
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");


const postSignup =catchAsync( async(request,response)=>{
    try{
        const userSignup = await AuthServiceInstance.signup(request.body)
        response.status(200).json(userSignup);
    }catch(error) {
        if (error.code === 11000) {
            throw new ApiError(httpStatus.CONFLICT, "User already registered")
        } else {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create new user")
        }
      }
})

const postLogin = catchAsync(async(request,response)=>{
    try{
        const userLogin= await AuthServiceInstance.login(request.body);
        if (userLogin.isLoggedIn) {
            response.status(200).json(userLogin);
          } else {
         throw new ApiError(httpStatus.FORBIDDEN, "Invalid Credentials")
          }
       
    }catch(error){
         throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to login")
    }
})


module.exports = {postSignup, postLogin};