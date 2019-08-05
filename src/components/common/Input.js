/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */

import React from 'react';
import { capitalize } from 'lodash';

import '../../assets/scss/components/Input.scss';

const Input = (props) => {
  const {
    invalid,
    shouldValidate,
    touched,
    inputtype,
    changed,
    elementConfig,
    value,
    formLabel,
    errorMessage,
  } = props;
  let inputElement = null;
  let validationHelper = null;
  const inputClasses = ['form-control input'];

  if (invalid && shouldValidate && touched) {
    inputClasses.push('error');
    validationHelper = (
      <small id="emailHelp" className="form-text text-muted error">
        {`${capitalize(formLabel)} ${errorMessage}`}
      </small>
    );
  }

  if (!invalid && shouldValidate && touched) {
    inputClasses.push('pass');
    validationHelper = (
      <small
        id="emailHelp"
        className="form-text text-muted pass"
        style={{ marginLeft: '5px' }}
      >
        <i className="fas fa-check" />
      </small>
    );
  }

  switch (inputtype) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          onChange={changed}
          {...elementConfig}
          value={value}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          onChange={changed}
          {...elementConfig}
          value={value}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          onChange={changed}
          value={value}
        >
          {elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          onChange={changed}
          {...elementConfig}
          value={value}
        />
      );
  }

  return (
    <div className="form-group d-flex flex-column align-items-start">
      <label htmlFor="exampleInputPassword1">{capitalize(formLabel)}</label>
      {inputElement}
      {validationHelper}
    </div>
  );
};

export default Input;
