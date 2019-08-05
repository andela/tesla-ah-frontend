/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import Fab from '../../src/components/widgets/Fab';

const renderFab = args => {
  const defaultProps = {
    articles: jest.fn(),
    followers: jest.fn(),
    following: jest.fn(),
  };
  const props = { ...defaultProps, ...args };

  return shallow(<Fab {...props} />);
};

it('renders Fab with all actions', () => {
  const wrapper = renderFab();
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('Fab').length).toBe(1);
});
