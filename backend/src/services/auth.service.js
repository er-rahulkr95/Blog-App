const UserService = require("./user.service");
const UserServiceInstance = new UserService();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


class AuthService{
    signup = async(userDetails) =>{
        try{
            const securedPassword = await this.encryptPassword(userDetails.password)
            const userSignup = await UserServiceInstance.register({...userDetails, password:securedPassword});
            return userSignup;
        }catch(error){
            throw error;
        }
    }

    encryptPassword = async(password)=>{
        try{
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password,salt);
            return hashedPassword;
        }catch(error){
            throw error;
        }
    }


    login = async(loginData) => {

        try{
            const userLoggedInDetail = await this.verifyPassword(loginData.username, loginData.password);
            
            if(userLoggedInDetail){
                    const token = await this.generateToken(userLoggedInDetail._id)
                return { isLoggedIn: true, userId: userLoggedInDetail._id, role:userLoggedInDetail.role, jwt:token };

            }else{
                return {isLoggedIn: false};
            }
        }catch(error){
            throw error
        }
    }

    verifyPassword = async(username, password) =>{
        try{    
                const userFromDb = await UserServiceInstance.findByUsername(username);
                const userPasswordFromDb = userFromDb.password;
                const isValidPassword = await bcrypt.compare(password, userPasswordFromDb);
                if(isValidPassword){
                    return userFromDb;
                }else {
                    return null
                }

        }catch(error){
            throw error;
        }
    }

    secret = process.env.SECRET

    generateToken = async(userId)=>{

        try{
            const payload = {userId};
            const options ={expiresIn:"1d"};
            const token = jwt.sign(payload, this.secret, options)
            return token;
        }catch(error){
            throw error;
        }
        
    }

    verifyToken = async (token) =>{
        try{
                const verify = jwt.verify(token,this.secret)
                const userFromDb = await UserServiceInstance.findWithId(verify.userId);
                return userFromDb;
        }catch(error){
            throw error;
        }
    }

    getUserProfile = async(userId) =>{
        try{
                const profileDetails = await UserServiceInstance.findProfile(userId);
                return profileDetails;
        }catch{
            throw error
        }
    }
}



module.exports = AuthService;