/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';

import TextInput from '../../src/components/common/TextInput';

const props = {
  value: '',
  onChange: jest.fn(),
  placeholder: '',
  name: 'text',
  type: 'text',
};
let input;
describe('TextInput TESTS...', () => {
  beforeAll(() => {
    input = shallow(<TextInput {...props} />);
  });
  test('Should render perfectly', () => {
    expect(input).toBeDefined();
  });
});
