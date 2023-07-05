const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const secret = process.env.SECRET;
const UserService = require("../services/user.service");
const UserServiceInstance = new UserService()

/**
 * Not using authentication using cookies because in incognito mode the browser don't allow to set 3rd party cookies 
 * automatically because our frontend and backend is deployed on cross domain, so now using Bearer token for authentication purpose. 
 */
// const cookieExtractor = (req) => {
//     let token = null;
//     if (req && req.cookies)
//     {
//         token = req.cookies['token'];
//     }
//     return token;
// };

const options = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : secret
}

const strategy = new JWTStrategy(options, async(payload, done)=>{
    try{    
        
            const userFromDb = await UserServiceInstance.findWithId(payload.userId)
            done(null,userFromDb);
    }catch(error){
        done(error, null)
    }
})


module.exports = (passport)=>{
    passport.use(strategy);
}