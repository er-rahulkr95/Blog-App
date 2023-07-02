const Joi = require("joi");

const userValidationSchema = Joi.object().keys({
  fullName: Joi.string().min(3).max(50).required(),
  userName: Joi.string().required().min(6).max(25),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  password:Joi.string().required().min(8),
  role: Joi.string().default("user"),
});

module.exports = { userValidationSchema };
