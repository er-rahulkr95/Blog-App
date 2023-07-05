const router = require("express").Router();
const {postSignup, postLogin} = require("../controllers")
const {userValidationSchema,loginBodyValidationSchema} = require("../validations");
const {validateSchema,checkUserExistsInDB} = require("../middlewares")


const validateNewUser = validateSchema(userValidationSchema);
const validateLogin = validateSchema(loginBodyValidationSchema);


router.post("/signup",validateNewUser,postSignup)
router.post("/login",validateLogin,checkUserExistsInDB, postLogin)

module.exports = router;