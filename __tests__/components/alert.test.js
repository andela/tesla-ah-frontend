/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import Alert from '../../src/components/common/Alert';

const props = {
  type: 'danger',
};

const warningProps = {
  type: 'warning',
};

const successProps = {
  type: 'success',
};

describe('Alert component test cases', () => {
  const alert = shallow(<Alert {...props} />);
  const warning = shallow(<Alert {...warningProps} />);
  const success = shallow(<Alert {...successProps} />);
  test('It will pass', () => {
    expect(alert).toBeDefined();
  });

  test('Warning will pass', () => {
    expect(warning).toBeDefined();
  });

  test('Success should pass', () => {
    expect(success).toBeDefined();
  });
});
