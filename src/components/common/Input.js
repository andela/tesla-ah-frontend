/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
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
  const inputClasses = ['form-control input-custom'];

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
      if (elementConfig.type === 'file') {
        const inputValue = value.split('\\');
        const fileName = inputValue[inputValue.length - 1];
        inputElement = (
          <React.Fragment>
            <div className="custom-file">
              <input
                className="custom-file-input"
                onChange={changed}
                {...elementConfig}
                aria-describedby="inputGroupFileAddon01"
              />
              <label className={`${inputClasses.join(' ')} custom-file-label`}>{fileName || 'Choose a file'}</label>
            </div>
          </React.Fragment>
        );
        break;
      } else {
        inputElement = (
          <input
            className={inputClasses.join(' ')}
            onChange={changed}
            {...elementConfig}
            value={value}
          />
        );
        break;
      }
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
      <label>{capitalize(formLabel)}</label>
      {inputElement}
      {validationHelper}
    </div>
  );
};

const stringPropType = PropTypes.string;

Input.defaultProps = {
  invalid: false,
  touched: false,
  value: '',
  formLabel: 'Add a label',
  errorMessage: '',
};

Input.propTypes = {
  invalid: PropTypes.bool,
  shouldValidate: PropTypes.instanceOf(Object).isRequired,
  touched: PropTypes.bool,
  inputtype: stringPropType.isRequired,
  changed: PropTypes.func.isRequired,
  elementConfig: PropTypes.instanceOf(Object).isRequired,
  value: stringPropType,
  formLabel: stringPropType,
  errorMessage: stringPropType,
};

export default Input;
