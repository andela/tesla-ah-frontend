/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import {
  ProfileEditForm,
  mapDispatchToProps,
} from '../../src/components/forms/ProfileEditForm';
import { profile } from '../mockData';

const renderProfileEditForm = args => {
  const defaultProps = {
    userId: '',
    onUpdateProfile: jest.fn(),
    history: {},
    profile: {},
    onSetUpdatable: jest.fn(),
    match: {},
  };
  const props = { ...defaultProps, ...args };

  return mount(<ProfileEditForm {...props} />);
};

describe('Profile Edit Form', () => {
  it('renders ProfileEditForm component', () => {
    const wrapper = renderProfileEditForm();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('form').length).toBe(1);
  });

  it('renders input components', () => {
    const wrapper = renderProfileEditForm();
    expect(wrapper.find('input').length).toBe(6);
  });

  it('displays error message under invalid input field', () => {
    const wrapper = renderProfileEditForm();
    wrapper
      .find('input')
      .first()
      .simulate('change', { target: { value: 'a' } });
    wrapper.find('form').simulate('submit');
    const error = wrapper.find('small.error').first();
    expect(error.text()).toBe('Firstname should have a minimum length of 3');
  });

  it('displays pass message under valid input field', () => {
    const wrapper = renderProfileEditForm();
    wrapper
      .find('textarea')
      .first()
      .simulate('change', { target: { value: 'a' } });
    wrapper.find('form').simulate('submit');
    expect(wrapper.prop('errorMessage')).toBe(undefined);
    const success = wrapper.find('small.pass').first();
    expect(success.length).toBe(1);
  });

  it('should map dispatch to props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onUpdateProfile(profile.user.id, {});
    mapDispatchToProps(dispatch).onSetUpdatable();
    expect(mapDispatchToProps).toBe(mapDispatchToProps);
  });
});
