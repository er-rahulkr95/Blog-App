const router = require("express").Router();
const {postSignup, postLogin, postLogout,userProfile} = require("../controllers/auth.controller")
const { userValidationSchema } = require("../validations/user.validator");
const { validateSchema,isAuthenticated } = require("../middlewares/validate.middleware");
const { loginBodyValidationSchema } = require("../validations/auth.validator");
const {fetchUserNameInCollection} = require("../middlewares/user.middleware")


const validateNewUser = validateSchema(userValidationSchema);
const validateLogin = validateSchema(loginBodyValidationSchema);


router.post("/signup",validateNewUser,postSignup)
router.post("/login",validateLogin,fetchUserNameInCollection, postLogin)
router.get("/logout",postLogout)
router.get("/me",isAuthenticated,userProfile)
module.exports = router;