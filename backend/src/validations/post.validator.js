const Joi = require("joi");

const commentValidationSchema = Joi.object().keys({
    postedBy: Joi.string().required(),
    commentText: Joi.string().required().max(500),
    created: Joi.date()
});

const postValidationSchema = Joi.object().keys({
  title: Joi.string().required().max(150),
  postedBy: Joi.string(),
  content: Joi.string().required().default(""),
  comments: Joi.array().items(commentValidationSchema).default([]),
});

module.exports = { postValidationSchema, commentValidationSchema };
