import Joi from 'joi-browser';

const names = Joi.string()
  .trim()
  .required()
  .regex(/^[A-Za-z_-]+$/)
  .min(3);
export default Joi.object().keys({
  firstName: names.label(
    'First name must have at least 3 letters and must contain only letters, underscores(_) and hyphens (-)',
  ),
  lastName: names.label(
    'Last name must have at least 3 letters and must contain only letters, underscores(_) and hyphens (-)',
  ),
  username: Joi.string()
    .trim()
    .lowercase()
    .required()
    .regex(/^[a-zA-Z0-9_.-]+$/)
    .min(3)
    .label(
      'Username must have at least 3 letters and must contain only letters, numbers, underscores(_), hyphens (-) and points (.)',
    ),
  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required()
    .label('Email should look like this : example@email.com!'),
  password: Joi.string()
    .trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
    .required()
    .label(
      'Password must be at least 8 letters containing'
        + ' at least a number a Lowercase letter and an Uppercase letter',
    ),
  confirmPassword: Joi.any()
    .required()
    .valid(Joi.ref('password'))
    .label('Password and Confirm Password do not match'),
  bio: Joi.string().optional(),
  birthDate: Joi.string().optional(),
  gender: Joi.string().optional(),
});
