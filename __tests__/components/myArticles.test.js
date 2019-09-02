/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import { MyArticles, mapStateToProps } from '../../src/components/pages/MyArticles';
import { getMyArticles } from '../../src/redux/actions/article.actions';
import { article } from '../../__mocks__/data';
import SessionStorage from '../../__mocks__/sessionStorageMock';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore({});

let storage;

const props1 = {
  articles: {
    data: {
      foundArticles: [article[0], article[1]],
      count: 5,
    },
  },
  history: [],
  getMyArticles: jest.fn(),
  deleteArticle: jest.fn(),
};
const props2 = {
  articles: {},
  history: [],
  getMyArticles: jest.fn(),
  deleteArticle: jest.fn(),
};
const props3 = {
  articles: {
    data: {
      foundArticles: [],
      count: 0,
    },
  },
  history: [],
  getMyArticles: jest.fn(),
  deleteArticle: jest.fn(),
};

describe('Fetch All Articles tests...', () => {
  const allArticles = shallow(<MyArticles {...props1} />);
  const allArticles1 = shallow(<MyArticles {...props2} />);
  const allArticles2 = shallow(<MyArticles {...props3} />);
  it('it should render the AllArticles Component', () => {
    mapStateToProps({ article: { MyArticles: [] }, ui: {}, login: {} });
    expect(allArticles).toMatchSnapshot();
  });
  it('it should render the AllArticles Component', () => {
    allArticles1.instance().changeCurrentPage(1);
    expect(allArticles1).toMatchSnapshot();
  });
  it('it should render the AllArticles Component', () => {
    allArticles2.instance().changeCurrentPage(1);
    expect(allArticles2).toMatchSnapshot();
  });
});

describe('Should get MyArticles', () => {
  beforeEach(() => {
    moxios.install();
    storage = window.sessionStorage;
    window.sessionStorage = new SessionStorage();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
    window.sessionStorage = storage;
  });
  test('should get My Articles', async () => {
    await moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          article: { articles: [], TotalOfArticles: 1 },
        },
      });
    });
    return store.dispatch(getMyArticles()).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});
