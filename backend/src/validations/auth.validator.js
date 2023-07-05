const Joi = require("joi");


const loginBodyValidationSchema = Joi.object().keys({
  email: Joi.string()
  .required()
  .email({ tlds: { allow: false } }),
    password: Joi.string().required().min(8),
   });
   
 module.exports = { loginBodyValidationSchema };