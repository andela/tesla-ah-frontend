/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { Signup } from '../../src/components/pages/Signup';

const props = {
  createAccount: jest.fn(),
  ui: { loading: false },
  auth: { signupSuccess: false },
};

const otherProps = {
  ui: { loading: true },
  createAccount: jest.fn(),
  auth: { signupSuccess: false },
};
let signup;
let signupLoading;
describe('Signup Components tests...', () => {
  beforeAll(() => {
    signup = shallow(<Signup {...props} />);
  });

  it('Should render signup component', () => {
    expect(signup).toMatchSnapshot();
  });
  it('Should find one form', () => {
    const form = signup.find('form');
    expect(form.length).toBe(1);
  });
  it('Should give initial state', () => {
    expect(signup.state()).toBeDefined();
  });
  describe('Input simulations tests...', () => {
    it('Type in firstName field', () => {
      const firstName = signup.find('input[name="firstName"]');
      firstName.simulate('change', {
        target: { value: 'Elie' },
      });
      expect(signup.state('firstName')).toEqual('Elie');
    });
    it('Type in lastName field', () => {
      const lastName = signup.find('input[name="lastName"]');
      lastName.simulate('change', {
        target: { value: 'Mugenzi' },
      });
      expect(signup.state('lastName')).toEqual('Mugenzi');
    });
    it('Change the state on email typing', () => {
      const email = signup.find('input[name="email"]');
      email.simulate('change', {
        target: { value: 'elie@me.com' },
      });
      expect(signup.state('email')).toEqual('elie@me.com');
    });
    it('Change the username state on type', () => {
      const username = signup.find('input[name="username"]');
      username.simulate('change', {
        target: { value: 'elie' },
      });
      expect(signup.state('username')).toEqual('elie');
    });
    it('Should type the password and update its state', () => {
      const password = signup.find('input[name="password"]');
      password.simulate('change', {
        target: { value: '123456' },
      });
      expect(signup.state('password')).toEqual('123456');
    });
    it('Should change confirmPassword state', () => {
      const confirm = signup.find('input[name="confirm"]');
      confirm.simulate('change', {
        target: { value: '123456' },
      });
      expect(signup.state('confirmPassword')).toEqual('123456');
    });
    it('Should change DOB state', () => {
      const dob = signup.find('input[name="birthDate"]');
      dob.simulate('change', {
        target: { value: '01/03/1997' },
      });
      expect(signup.state('birthDate')).toEqual('01/03/1997');
    });
    it('Should update Gender to M', () => {
      const gender = signup.find('input[name="gender"]');
      gender.first().simulate('change', {
        target: { value: 'M' },
      });
      expect(signup.state('gender')).toEqual('M');
    });
    it('Should update gender to F', () => {
      const gender = signup.find('input[name="gender"]');
      gender.at(1).simulate('change', {
        target: { value: 'F' },
      });
      expect(signup.state('gender')).toEqual('F');
    });
    it('Should update BIO state', () => {
      const bio = signup.find('textarea');
      bio.simulate('change', {
        target: { value: 'Human being' },
      });
      expect(signup.state('bio')).toEqual('Human being');
    });
  });

  describe('Simulate form submission', () => {
    let instance;
    let submitButton;
    beforeAll(() => {
      instance = signup.instance();
      submitButton = signup.find('button[type="submit"]');
      submitButton.simulate('click');
    });
    it('Should make a remote request to the server', () => {
      instance.forceUpdate();
      signup.update();
      const event = {
        preventDefault: jest.fn(),
      };
      instance.handleSubmit(event);
    });
  });

  describe('Loading now', () => {
    beforeAll(() => {
      signupLoading = shallow(<Signup {...otherProps} />);
    });
    it('Renders successfully', () => {
      expect(signupLoading).toBeDefined();
    });
  });

  describe('On signup success', () => {
    let signUpDone;
    const thoseProps = {
      ui: { loading: false },
      createAccount: jest.fn(),
      auth: { signupSuccess: true },
    };
    beforeAll(() => {
      signUpDone = shallow(<Signup {...thoseProps} />);
    });
    it('Renders successfully', () => {
      expect(signUpDone).toBeDefined();
    });
  });
});
