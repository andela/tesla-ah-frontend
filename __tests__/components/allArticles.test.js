/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { AllArticles } from '../../src/components/article/AllArticles';

const props = {
  articles: {
    articles: [],
  },
  getArticles: jest.fn(),
};
describe('Fetch All Articles tests...', () => {
  const allArticles = shallow(<AllArticles {...props} />);
  it('it should render the AllArticles Component', () => {
    expect(allArticles.find('div').exists()).toBe(true);
    expect(allArticles.find('div').at(0).hasClass('container'));
    expect(allArticles).toMatchSnapshot();
  });
});
