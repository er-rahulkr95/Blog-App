const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService();

const postSignup = async(request,response)=>{
    try{
        const userSignup = await AuthServiceInstance.signup(request.body)
        response.status(200).json(userSignup);
    }catch(error) {
        if (error.code === 11000) {
            response.status(409).json({
            message: "Failed to create new user",
            reason: "User already registered",
          });
        } else {
            response.status(500).json({ message: "Failed to create new user", error });
        }
      }
}

const postLogin = async(request,response)=>{
    try{
        const userLogin= await AuthServiceInstance.login(request.body);
        if (userLogin.isLoggedIn) {
            response.cookie("token", userLogin.jwt,{
                maxAge:24*60*60*1000,
                httpOnly:true,
            })
            response.status(200).json(userLogin);
          } else {
            response.status(403).json({ message: "Invalid Credentials" });
          }
       
    }catch(error){
        response.status(500).json({ message: "Failed to login", error });
    }
}

const postLogout = (request,response,next) =>{
        response.clearCookie(('token'));
        response.status(200).json({
            success: true,
            message: "Logged Out Successfully"
        })
}

const userProfile = async (request, response, next) => {
    try{
        const profile = await AuthServiceInstance.getUserProfile(request.user.id);
        response.status(200).json(profile)
    }catch(error){
        response.status(500).json({ message: "Cannot get user profile", error });
    }
}

module.exports = {postSignup, postLogin, postLogout,userProfile};