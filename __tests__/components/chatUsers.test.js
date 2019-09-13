import React from 'react';
import { shallow } from 'enzyme';
import { Users, mapStateToProps } from '../../src/components/pages/ChatUsers';
import users from '../../__mocks__/users';

const props = {
  users: [],
  pending: false,
  getUsers: jest.fn(),
};
const props2 = {
  users,
  pending: true,
  getUsers: jest.fn(),
};
let chatUsers;
let instance;
describe('Chat users page tests', () => {
  beforeAll(() => {
    chatUsers = shallow(<Users {...props} />);
    instance = chatUsers.instance();
    instance.setState({
      users,
    });
  });
  test('Should render perfectly', () => {
    expect(chatUsers).toBeDefined();
  });
  test('Should receive new props', () => {
    instance.componentWillReceiveProps({ users: [] });
  });
  test('Should render the preloader when the request is pending', () => {
    const chat = shallow(<Users {...props2} />);
    expect(chat).toBeDefined();
  });
  test('Should map state to props', () => {
    mapStateToProps({
      chats: {
        users: [],
        usersPending: false,
      },
    });
    expect(mapStateToProps).toBeDefined();
  });
});
