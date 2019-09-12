import React from 'react';
import { shallow } from 'enzyme';
import ChatUser from '../../src/components/items/Chatuser';

const props = {
  data: {
    avatar: 'image.png',
    username: 'elie',
    status: 'Following',
  },
};

const props2 = {
  data: {
    ...props.data,
    avatar: null,
  },
};

let user;

describe('Chat user item tests', () => {
  beforeAll(() => {
    user = shallow(<ChatUser {...props} />);
  });
  test('Component should render', () => {
    expect(user).toBeDefined();
  });
  test('Should render the default avatar', () => {
    const otherUser = shallow(<ChatUser {...props2} />);
    expect(otherUser).toBeDefined();
  });
});
