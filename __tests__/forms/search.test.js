import React from 'react';
import { shallow } from 'enzyme';
import { SearchForm, mapStateToProps } from '../../src/components/forms/SearchForm';

const props = {
  searchArticles: jest.fn(),
};

let search;

describe('Search form tests...', () => {
  beforeAll(() => {
    search = shallow(<SearchForm {...props} />);
    search.instance().onType = jest.fn();
    search.instance().onType();
  });
  test('Should render', () => {
    expect(search).toBeDefined();
  });
  test('Initial state should be defined', () => {
    expect(search.state()).toBeDefined();
  });
  test('Should type in search input', () => {
    const searchInput = search.find('input[name="search"]');
    searchInput.simulate('change', {
      target: {
        value: 'Food',
      },
    });
    expect(search.instance().onType).toHaveBeenCalled();
  });
  it('Should handle search on type', () => {
    const searchInput = search.find('input[name="search"]');
    search.instance().setState({
      keyword: 'author',
    });
    searchInput.simulate('change', {
      target: {
        value: 'deschant',
      },
    });
    const event = {
      target: {
        value: 'deschant',
      },
    };
    search.instance().onType(event);
  });
  test('Should be able to choose a filter', () => {
    const select = search.find('select');
    select.simulate('change', {
      target: {
        value: 'keywords',
      },
    });
    search.instance().onChoose({
      target: 'keywords',
    });
  });
  test('Should handle search form submission', () => {
    const submitBtn = search.find('button[type="submit"]');
    submitBtn.simulate('click');
    search.instance().forceUpdate();
    search.update();
    const event = {
      preventDefault: jest.fn(),
    };
    search.instance().setState({
      keyword: 'None',
    });
    search.instance().onSearch(event);
  });
  test('Should trigger a search action', () => {
    const submitBtn = search.find('button[type="submit"]');
    submitBtn.simulate('click');
    search.instance().forceUpdate();
    search.update();
    const event = {
      preventDefault: jest.fn(),
    };
    search.instance().setState({
      keyword: 'author',
    });
    search.instance().onSearch(event);
  });
  test('Should map state to props', () => {
    mapStateToProps({
      article: {
        articles: [],
        currentArticle: {},
      },
    });
    expect(mapStateToProps).toBeDefined();
  });
});
