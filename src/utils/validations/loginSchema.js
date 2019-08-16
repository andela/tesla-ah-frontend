import Joi from 'joi-browser';

export default Joi.object().keys({
  email: Joi.string()
    .required(),
  password: Joi.string()
    .trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
    .required()
    .label('Password must be at least 8 letters containing'
      + ' at least a number a Lowercase letter and an Uppercase letter'),
});
