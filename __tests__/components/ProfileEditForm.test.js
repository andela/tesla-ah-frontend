/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import {
  ProfileEditForm,
  mapDispatchToProps,
  mapStateToProps,
} from '../../src/components/forms/ProfileEditForm';
import { profile, profileUpdateForm } from '../mockData';

const renderProfileEditForm = (args) => {
  const defaultProps = {
    user: {},
    onUpdateProfile: jest.fn(),
    onInitProfile: jest.fn(),
    history: {
      replace: jest.fn(),
    },
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
    wrapper.setState({ profileUpdateForm });
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

  it('should render loading icon while form is updating', () => {
    const wrapper = renderProfileEditForm({
      profile: {
        user: {
          username: 'deschants',
        },
        updating: true,
        isDoneUpdating: true,
      },
      user: { ...profile.currentUser },
    });
    wrapper.instance().dismissModal.current = {
      ...wrapper.instance().dismissModal.current,
      click: jest.fn(),
    };
    wrapper.instance().updateProfilePath();
    const e = {
      target: {
        files: {
          file: {},
        },
      },
      preventDefault: jest.fn(),
    };
    wrapper.instance().handleInputChange(e, 'avatar');
    wrapper.instance().updateHandler(e);
    expect(wrapper.find('.fas.fa-spinner.fa-2x.fa-spin').length).toBe(1);
  });

  it('should map dispatch and state to props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onUpdateProfile(profile.user.id, {});
    mapDispatchToProps(dispatch).onSetUpdatable();
    expect(mapDispatchToProps).toBe(mapDispatchToProps);
    mapStateToProps({ profile: { ...profile } });
  });
});
