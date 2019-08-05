/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import Terms from '../../src/components/pages/Terms';

let terms;
describe('Terms and conditions tests...', () => {
  beforeAll(() => {
    terms = shallow(<Terms />);
  });

  test('It should render', () => {
    expect(terms).toBeDefined();
  });
});
