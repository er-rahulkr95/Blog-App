const router = require("express").Router();
const {postSignup, postLogin, postLogout} = require("../controllers")
const {userValidationSchema,loginBodyValidationSchema} = require("../validations");
const {validateSchema,checkUserExistsInDB} = require("../middlewares")


const validateNewUser = validateSchema(userValidationSchema);
const validateLogin = validateSchema(loginBodyValidationSchema);


router.post("/signup",validateNewUser,postSignup)
router.post("/login",validateLogin,checkUserExistsInDB, postLogin)
router.get("/logout",postLogout)
module.exports = router;