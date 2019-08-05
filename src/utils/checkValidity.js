import { trim } from 'lodash';

const checkValidity = (value, rules) => {
  let isValid = true;
  let errorMessage;

  if (!rules) {
    errorMessage = null;
    return true;
  }

  if (rules.required) {
    errorMessage = 'is required';
    isValid = trim(value) !== '' && isValid;
  }

  if (rules.minLength) {
    errorMessage = `should have a minimum length of ${rules.minLength}`;
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    errorMessage = `should have a maximum length of ${rules.maxLength}`;
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    errorMessage = 'is not valid';
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    errorMessage = 'is not a number';
    isValid = pattern.test(value) && isValid;
  }

  return { isValid, errorMessage };
};

export default checkValidity;
