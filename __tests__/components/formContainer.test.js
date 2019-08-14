/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import FormContainer from '../../src/components/common/FormContainer';

const props = {
  onSubmit: jest.fn(),
};

let form;

describe('Form TESTS', () => {
  beforeAll(() => {
    form = shallow(<FormContainer {...props} />);
  });

  test('Should render perfectly', () => {
    expect(form).toBeDefined();
  });
});
