import React from 'react';
import { shallow } from 'enzyme';
import { article } from '../../__mocks__/data';
import { Tags, mapStateToProps } from '../../src/components/pages/ArticleTags';

const state = {
  articleTags: {
    results: [],
  },
  search: {
    results: [],
  },
};

const props = {
  searchArticles: jest.fn(),
  articleTags: {
    results: [],
  },
  searchResults: [...article],
  pending: true,
};
let tagByArticle;
describe('< Articles By Tags />', () => {
  test('Should display all article in a specific tag', () => {
    tagByArticle = shallow(<Tags {...props} />);
    expect(tagByArticle).toHaveLength(1);
  });
  test('Should display all article in a specific tag', () => {
    tagByArticle = shallow(<Tags {...{ ...props, pending: false }} />);
    expect(tagByArticle).toHaveLength(1);
  });
  test('Should map states to props...', () => {
    mapStateToProps(state);
    expect(mapStateToProps).toBeDefined();
  });
});
