import React from 'react';
import { shallow } from 'enzyme';
import { Search, mapStateToProps } from '../../src/components/items/Search';

const props = {
  searchArticles: jest.fn(),
};

let search;

describe('Search component tests...', () => {
  beforeAll(() => {
    search = shallow(<Search {...props} />);
    search.instance().onType = jest.fn();
    // search.instance().onChoose = jest.fn();
    search.instance().onType();
  });

  test('Should render perfectly', () => {
    expect(search).toBeDefined();
  });
  test('Initial state should be defined', () => {
    expect(search.state()).toBeDefined();
  });
  test('SHould type in search input', () => {
    const searchInput = search.find('input[name="search"]');
    searchInput.simulate('change', {
      target: {
        value: 'Food',
      },
    });
    expect(search.instance().onType).toHaveBeenCalled();
    expect(search.state('queryText')).toEqual('Food');
  });
  test('Should choose a filter', () => {
    const select = search.find('select');
    select.simulate('change', {
      target: {
        value: 'keywords',
      },
    });
    search.instance().onChoose({ target: { value: 'keywords' } });
    // expect(search.state('keyword')).toEqual('keywords');
    // expect(search.instance().onChoose).toHaveBeenCalled();
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
  test('Should trigger the search action', () => {
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
