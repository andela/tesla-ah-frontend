/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { SocialLogin, mapDispatchToProps } from '../../src/components/pages/SocialLogin';

// sinon.stub(window.location, 'replace');
global.window = Object.create(window);
Object.defineProperty(window, 'location', {
  value: {
    replace: jest.fn(),
  },
});

describe('Testing social login', () => {
  let props; let
    wrapper;
  beforeEach(() => {
    props = {
      onSocialLogin: jest.fn(),
    };
    wrapper = shallow(<SocialLogin {...props} />);
  });

  it('should have social login component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should Login with twitter', () => {
    wrapper.find('.button--twitter').simulate('click');
    expect(window.location.replace).toHaveBeenCalled();
  });

  it('Should Login with Facebook', () => {
    wrapper.find('.button--facebook').simulate('click');
    expect(window.location.replace).toHaveBeenCalled();
  });

  it('Should Login with Gooogle', () => {
    wrapper.find('.button--googleplus').simulate('click');
    expect(window.location.replace).toHaveBeenCalled();
  });

  it('should map dispatch to props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSocialLogin();
  });
});
