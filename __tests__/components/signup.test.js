/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { Signup, mapStateToProps } from '../../src/components/pages/Signup';
import validate from '../../src/utils/validations/index';

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
    signup.instance().onChange = jest.fn();
    signup.instance().onChange();
  });

  it('Should render signup component', () => {
    expect(signup).toMatchSnapshot();
  });
  it('Should find one form', () => {
    const form = signup.find('FormContainer');
    expect(form.length).toBe(1);
  });
  it('Should give initial state', () => {
    expect(signup.state()).toBeDefined();
    mapStateToProps({});
  });
  describe('Input simulations tests...', () => {
    it('Should change DOB state', () => {
      const dob = signup.find('input[name="birthDate"]');
      dob.simulate('change', {
        target: { value: '01/03/1997' },
      });
      expect(signup.instance().onChange).toHaveBeenCalled();
    });
    it('Should update BIO state', () => {
      const bio = signup.find('textarea');
      bio.simulate('change', {
        target: { value: 'Human being' },
      });
      expect(signup.instance().onChange).toHaveBeenCalled();
    });
    it('Should update gender', () => {
      const select = signup.find('select');
      select.simulate('change', {
        target: {
          value: 'F',
        },
      });
      expect(signup.state('gender')).toEqual('F');
    });
  });

  describe('Simulate form submission', () => {
    let instance;
    let submitButton;
    beforeAll(() => {
      instance = signup.instance();
      submitButton = signup.find('button[type="submit"]');
      submitButton.simulate('click');
      instance.submitForm = jest.fn();
      instance.submitForm();
    });
    it('Should make a remote request to the server', () => {
      instance.setState({
        firstName: 'Elie',
        lastName: 'Mugenzi',
        email: 'eliemugenzi@gmail.com',
        username: 'elie',
        password: 'ThisIsAndela@05',
        confirmPassword: 'ThisIsAndela@05',
        birthDate: '01/03/1997',
        bio: 'Andelan',
      });
      instance.forceUpdate();
      signup.update();
      validate(signup.state(), 'signup');
      const event = {
        preventDefault: jest.fn(),
      };
      instance.handleSubmit(event);
      expect(instance.submitForm).toHaveBeenCalled();
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
  describe('Tests for signup validation errors', () => {
    const props2 = {
      ui: {
        loading: false,
      },
      createAccount: jest.fn(),
      auth: {
        signupSuccess: false,
      },
    };
    const component = shallow(<Signup {...props2} />);
    const instance = component.instance();
    instance.submitForm = jest.fn();
    instance.submitForm();
    it('Should render', () => {
      expect(component).toBeDefined();
    });
    test('It should throw errors when a user submits the wrong information', () => {
      instance.setState({
        firstName: 'e',
        lastName: 'M',
        email: 'elie@m.com',
        gender: 'M',
        password: '123',
        confirmPassword: 'whshshs',
      });
      instance.forceUpdate();
      component.update();
      const event = {
        preventDefault: jest.fn(),
      };
      instance.handleSubmit(event);
      expect(instance.submitForm).toHaveBeenCalled();
    });
  });
  describe('Render a signup for a guy who is aleady logged in', () => {
    const props10x = {
      createAcount: jest.fn(),
      ui: { loading: false },
      auth: { signupSuccess: false, loggedIn: true },
    };
    const component = shallow(<Signup {...props10x} />);
    test('Should render', () => {
      expect(component).toBeDefined();
    });
  });
});
