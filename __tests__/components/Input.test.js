/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import Input from '../../src/components/common/Input';

const renderInput = (args) => {
  const defaultProps = {
    invalid: '',
    shouldValidate: '',
    inputtype: '',
    changed: jest.fn(),
    elementConfig: {},
    value: '',
    formLabel: '',
    errorMessage: '',
  };
  const props = { ...defaultProps, ...args };

  return shallow(<Input {...props} />);
};

it('renders Input component', () => {
  const wrapper = renderInput();
  expect(wrapper).toMatchSnapshot();
});

describe('Test supported input field types', () => {
  it('renders the input field by default when no inputtype is specified', () => {
    const wrapper = renderInput({ inputtype: '' });
    expect(wrapper.find('input').length).toBe(1);
  });

  it('renders the input field', () => {
    const wrapper = renderInput({ inputtype: 'input' });
    expect(wrapper.find('input').length).toBe(1);
  });

  it('renders the textarea field', () => {
    const wrapper = renderInput({ inputtype: 'textarea' });
    expect(wrapper.find('textarea').length).toBe(1);
  });

  it('renders the select field', () => {
    const options = [
      { value: '', displayValue: 'Pick a gender' },
      { value: 'M', displayValue: 'Male' },
      { value: 'F', displayValue: 'Female' },
    ];
    const wrapper = renderInput({
      inputtype: 'select',
      elementConfig: { options },
    });
    expect(wrapper.find('select').length).toBe(1);
    expect(wrapper.find('option').length).toBe(3);
  });
});

it('should have pass outline if valid', () => {
  const wrapper = renderInput({
    inputtype: 'input',
    invalid: false,
    shouldValidate: true,
    touched: true,
  });
  expect(wrapper.find('small.pass').length).toBe(1);
});

it('should have error outline if invalid', () => {
  const wrapper = renderInput({
    inputtype: 'input',
    invalid: true,
    shouldValidate: true,
    touched: true,
  });
  expect(wrapper.find('small.error').length).toBe(1);
});
