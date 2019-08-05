/* eslint-disable no-undef */
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { getArticles, getOneArticle } from '../../src/redux/actions/article.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('FETCH ARTICLES action', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });
  it('Fetch GET_ARTICLES when the articles found', () => {
    store.dispatch(getArticles());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('Fetch GET_ARTICLE when the article found', () => {
    store.dispatch(getOneArticle('this-text-is-copied-from-igihe-1ff4jyyfya'));
    expect(store.getActions()).toMatchSnapshot();
  });
});
