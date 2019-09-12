import React from 'react';
import { shallow } from 'enzyme';
import ChatForm from '../../src/components/layouts/ChatFormContainer';

const props = {
  onSubmit: jest.fn(),
};

let form;

describe('Chat form container tests', () => {
  beforeAll(() => {
    form = shallow(<ChatForm {...props} />);
  });

  test('It should render without crashing', () => {
    expect(form).toBeDefined();
  });
});
