/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import Interests from '../../src/components/widgets/Interests';

const renderInterests = args => {
  const defaultProps = {
    content: '',
  };
  const props = { ...defaultProps, ...args };

  return shallow(<Interests {...props} />);
};

it('renders Interests component', () => {
  const wrapper = renderInterests();
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('div').length).toBeGreaterThanOrEqual(2);
});
