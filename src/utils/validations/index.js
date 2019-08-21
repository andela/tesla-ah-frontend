import Joi from 'joi-browser';
import signupSchema from './schema';
import loginSchema from './loginSchema';

export default (inputs, schema) => {
  const errors = {};
  const validateSchemas = {
    signup: signupSchema,
    login: loginSchema,
  };

  const { error } = Joi.validate(inputs, validateSchemas[schema], {
    abortEarly: false,
  });
  if (error && typeof error === 'object' && Object.keys(error).length) {
    error.details.forEach((err) => {
      errors[err.path[0]] = err.context.label;
    });
  }
  return errors;
};
