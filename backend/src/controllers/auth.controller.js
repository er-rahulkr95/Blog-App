const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService();
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");


const postSignup =catchAsync( async(request,response)=>{
    try{
            // console.log(request.body)
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
            response.cookie("token", userLogin.jwt,{
                maxAge:24*60*60*1000,
                httpOnly:true,
            })
            response.status(200).json(userLogin);
          } else {
         throw new ApiError(httpStatus.FORBIDDEN, "Invalid Credentials")
          }
       
    }catch(error){
         throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to login")
    }
})

const postLogout = (request,response,next) =>{
        response.clearCookie(('token'));
        response.status(200).json({
            success: true,
            message: "Logged Out Successfully"
        })
}

const userProfile = catchAsync(async (request, response, next) => {
    try{
        const profile = await AuthServiceInstance.getUserProfile(request.user.id);
        response.status(200).json(profile)
    }catch(error){
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Cannot get user profile");
    }
})

module.exports = {postSignup, postLogin, postLogout,userProfile};