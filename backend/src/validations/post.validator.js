const Joi = require("joi");

const commentValidationSchema = Joi.object().keys({
    postedBy: Joi.string().required(),
    commentText: Joi.string().required(),
    created: Joi.date()
});

const postValidationSchema = Joi.object().keys({
  title: Joi.string().required(),
  postedBy: Joi.string(),
  content: Joi.string().required().default(""),
  comments: Joi.array().items(commentValidationSchema).default([]),
  image:Joi.string().min(0)

});

module.exports = { postValidationSchema, commentValidationSchema };
