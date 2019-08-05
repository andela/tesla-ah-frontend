/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
// eslint-disable-next-line import/no-named-as-default
import {
  Profile,
  mapDispatchToProps,
  mapStateToProps,
} from '../../src/components/pages/Profile';
import { profile } from '../mockData';

jest.mock('../../src/components/forms/ProfileEditForm', () => () => (
  <div id="mockProfileEditForm">mockProfileEditForm</div>
));

const renderProfile = args => {
  const defaultProps = {
    setCurrentUser: jest.fn(),
    initProfile: jest.fn(),
    history: {},
    profile: {},
    match: {
      params: {
        username: 'deschants',
      },
    },
  };
  const props = { ...defaultProps, ...args };

  return mount(
    <MemoryRouter>
      <Profile {...props} />
    </MemoryRouter>,
  );
};

describe('Profile Compoment', () => {
  it('renders Profile component', () => {
    const wrapper = renderProfile({ profile: { ...profile } });
    wrapper
      .find('#articleBtn')
      .first()
      .simulate('click');
    expect(wrapper.find('#mockProfileEditForm').length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders navigation items', () => {
    const wrapper = renderProfile({ profile: { ...profile } });
    expect(wrapper.find('.nav-link').length).toBe(3);
    expect(wrapper.find('.content-title').length).toBe(1);
    expect(wrapper.find('Fab').length).toBeGreaterThanOrEqual(1);
    expect(wrapper.find('AB').length).toBe(4);
  });

  it('should map dispatch to props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).initProfile(profile.user.username);
    mapDispatchToProps(dispatch).setCurrentUser();
    expect(mapDispatchToProps).toBe(mapDispatchToProps);
  });

  it('should map state to props', () => {
    expect(mapStateToProps).toBe(mapStateToProps);
  });

  it('should render followers tab', () => {
    const wrapper = renderProfile({ profile: { ...profile } });
    wrapper.find('#followerBtn').simulate('click');
    expect(
      wrapper
        .find('.content-title > span')
        .first()
        .text(),
    ).toEqual('Followers');
  });

  it('should render following tab', () => {
    const wrapper = renderProfile({ profile: { ...profile } });
    wrapper.find('#followingBtn').simulate('click');
    expect(
      wrapper
        .find('.content-title > span')
        .first()
        .text(),
    ).toEqual('Following');
  });
});
