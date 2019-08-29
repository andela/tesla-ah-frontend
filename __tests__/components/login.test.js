/* eslint-disable no-undef */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import store from '../../src/redux/store';
import LoginComponent, { Login } from '../../src/components/pages/Login';

const props = {
  ui: {
    loading: false,
  },
  login: jest.fn(),
};

let login;

describe('Login Component...', () => {
  beforeAll(() => {
    login = shallow(<Login {...props} />);
    login.setState({ isPageLoading: false });
    login.setProps({ ...props, ui: { ...props.ui, loading: true } });
  });
  it('Should render login component', () => {
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <LoginComponent />
        </MemoryRouter>
      </Provider>,
    );
    expect(component).toHaveLength(1);
  });

  it('Should render login component', () => {
    expect(login).toMatchSnapshot();
  });
  // it('Should find one form', () => {
  //   const form = login.find('form');
  //   expect(form.length).toBe(1);
  // });
  it('Should give initial state', () => {
    expect(login.state()).toBeDefined();
  });

  describe('Input tests...', () => {
    it('should type in the Email', () => {
      const Email = login.find('TextInput[name="email"]');
      Email.simulate('change', {
        target: { value: 'danimahoro75@gmail.com', name: 'email' },
      });
      expect(login.state('email')).toEqual('danimahoro75@gmail.com');
    });
    it('should type in the password', () => {
      const password = login.find('TextInput[name="password"]');
      password.simulate('change', {
        target: { value: 'Esther@123!', name: 'password' },
      });
      expect(login.state('password')).toEqual('Esther@123!');
    });
  });
  describe('submit button test...', () => {
    let instance;
    let submitButton;
    beforeAll(() => {
      instance = login.instance();
      submitButton = login.find('button[type="submit"]');
      submitButton.simulate('click');
    });
    it('should make a request to the server', () => {
      instance.forceUpdate();
      login.update();
      const event = {
        preventDefault: jest.fn(),
      };
      instance.handleSubmit(event);
    });
  });
});
