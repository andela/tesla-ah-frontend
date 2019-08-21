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
import { profile, jsonUser } from '../mockData';

jest.mock('../../src/components/forms/ProfileEditForm', () => () => (
  <div id="mockProfileEditForm">mockProfileEditForm</div>
));

const renderProfile = (args) => {
  const defaultProps = {
    setCurrentUser: jest.fn(),
    onInitProfile: jest.fn(),
    history: {},
    profile: {},
    match: {
      params: {
        username: 'deschants',
      },
    },
  };
  const props = { ...defaultProps, ...args };

  return mount(<MemoryRouter><Profile {...props} /></MemoryRouter>);
};

describe('Profile Compoment', () => {
  beforeEach(() => {
    localStorage.setItem('user', jsonUser);
  });

  it('renders Profile component without main content', () => {
    const wrapper = renderProfile({
      profile: { ...profile, user: null },
    });
    expect(wrapper.find('Spinner').length).toBe(1);
  });

  it('renders Profile component', () => {
    const wrapper = renderProfile({
      profile: { ...profile },
    });
    wrapper
      .find('#articleBtn')
      .first()
      .simulate('click');
    expect(wrapper.find('#mockProfileEditForm').length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders navigation items', () => {
    const wrapper = renderProfile({
      profile: {
        ...profile,
        user: { avatar: null },
        currentUser: null,
        hasArticles: true,
      },
    });
    wrapper.instance().showArticles = {
      current: {
        click: jest.fn(),
      },
    };
    expect(wrapper.find('.nav-link').length).toBe(3);
    expect(wrapper.find('.content-title').length).toBe(1);
    expect(wrapper.find('Fab').length).toBeGreaterThanOrEqual(1);
    // wrapper.instance().showArticles.current = {
    //   // ...wrapper.instance().showArticles.current,
    //   click: jest.fn(),
    // };
    wrapper.find('#fabArticles > button').simulate('click');
    wrapper.find('Fab#profileFab').first().props().articles();
    wrapper.find('Fab#profileFab').first().props().following();
    wrapper.find('Fab#profileFab').first().props().followers();
  });

  it('should map dispatch to props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onInitProfile(profile.user.username);
    mapDispatchToProps(dispatch).setCurrentUser();
    expect(mapDispatchToProps).toBe(mapDispatchToProps);
  });

  it('should map state to props', () => {
    mapStateToProps({ ...profile });
    expect(mapStateToProps).toBe(mapStateToProps);
  });

  it('should render followers tab', () => {
    const wrapper = renderProfile({ profile: { ...profile } });
    wrapper.find('#followerBtn').simulate('click');
    expect(wrapper
      .find('.content-title > span')
      .first()
      .text()).toEqual('Followers');
  });

  it('should render following tab', () => {
    const wrapper = renderProfile({ profile: { ...profile } });
    wrapper.find('#followingBtn').simulate('click');
    expect(wrapper
      .find('.content-title > span')
      .first()
      .text()).toEqual('Following');
  });
});
