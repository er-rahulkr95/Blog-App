const router = require("express").Router();
const {postSignup, postLogin, postLogout,userProfile} = require("../controllers")
const {userValidationSchema,loginBodyValidationSchema} = require("../validations");
const {validateSchema,isAuthenticated,checkUserExistsInDB} = require("../middlewares")


const validateNewUser = validateSchema(userValidationSchema);
const validateLogin = validateSchema(loginBodyValidationSchema);


router.post("/signup",validateNewUser,postSignup)
router.post("/login",validateLogin,checkUserExistsInDB, postLogin)
router.get("/logout",postLogout)
router.get("/me",isAuthenticated,userProfile)
module.exports = router;