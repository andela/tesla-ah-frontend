import React from 'react';
import { shallow } from 'enzyme';
import SearchContainer from '../../src/components/common/SearchContainer';

const props = {
  children: [],
  onSubmit: jest.fn(),
};
let container;
describe('Search container tests', () => {
  beforeAll(() => {
    container = shallow(<SearchContainer {...props} />);
  });
  test('Should render without crashing...', () => {
    expect(container).toBeDefined();
  });
});
