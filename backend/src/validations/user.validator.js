const Joi = require("joi");

const userValidationSchema = Joi.object().keys({
  fullName: Joi.string().min(3).max(50).required(),
  userName: Joi.string().required().max(25),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  password:Joi.string().required().min(8).pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*\d).{8,32}$")).message("Password should have one character, one number and length >=8"),
  role: Joi.string().default("user"),
  image:Joi.string().base64().default("")
});

module.exports = { userValidationSchema };
