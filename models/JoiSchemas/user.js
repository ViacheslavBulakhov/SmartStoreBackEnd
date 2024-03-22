const Joi = require('joi');

const numberRegexp = /^\+?[0-9]{8,15}$/;

const registerSchema = Joi.object({
  number: Joi.string().pattern(numberRegexp).required(),
  password: Joi.string().min(6).required(),
});

const logInSchema = Joi.object({
  number: Joi.string().pattern(numberRegexp).required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  registerSchema,
  logInSchema,
};
