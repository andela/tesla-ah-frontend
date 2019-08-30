/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import FollowCard from '../../src/components/common/FollowCard';
import { users } from '../mockData';

const renderFollowCard = (args) => {
  const defaultProps = {
    avatar: '',
    firstName: '',
    lastName: '',
    username: '',
    noButton: null,
    bio: '',
    isFollowedBack: true,
    followType: 'Followers',
    onUnfollowUser: jest.fn(),
    onFollowUser: jest.fn(),
    isCurrentUser: true,
  };
  const props = { ...defaultProps, ...args };

  return shallow(<FollowCard {...props} />);
};

it('renders FollowCard component', () => {
  const wrapper = renderFollowCard();
  expect(wrapper).toMatchSnapshot();
});

it('renders FollowCard component with follow button', () => {
  const {
    avatar,
    firstName,
    lastName,
    username,
  } = users[0];
  const wrapper = renderFollowCard({
    avatar,
    firstName,
    lastName,
    username,
    isCurrentUser: false,
  });
  expect(wrapper.find('.follow-card--container').length).toBe(1);
  expect(wrapper.find('.btn-custom').length).toBe(0);
});

it('renders FollowCard component without follow button', () => {
  const {
    avatar,
    firstName,
    lastName,
    username,
  } = users[0];
  const wrapper = renderFollowCard({
    avatar,
    firstName,
    lastName,
    username,
    noButton: true,
  });
  expect(wrapper.find('.follow-card--container').length).toBe(1);
  expect(wrapper.find('.btn-custom').length).toBe(1);
});
