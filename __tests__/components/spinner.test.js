/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../../src/components/widgets/Spinner';

let spinner;
describe('Spinner Tests...', () => {
  beforeAll(() => {
    spinner = shallow(<Spinner />);
  });
  it('Renders correctly', () => {
    expect(spinner).toBeDefined();
  });
});
