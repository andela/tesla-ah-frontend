import React from 'react';
import { shallow } from 'enzyme';
import Article from '../../src/components/Article/Article';
import { article } from '../../__mocks__/data';

const props = {
  article: article[0],
};

let component;
describe('One article component tests', () => {
  beforeAll(() => {
    component = shallow(<Article {...props} />);
  });
  test('Should render', () => {
    expect(component).toBeDefined();
  });
});
