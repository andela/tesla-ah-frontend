import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import searchArticles from '../../../../src/redux/actions/article/search.action';
import * as types from '../../../../src/redux/actions/types/article.type';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const store = mockStore({});

describe('Search action tests...', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('Search test CORRECT', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: [],
        },
      });
    });
    return store.dispatch(searchArticles('technology', 'keyword')).then(() => {
      const expectedActions = [
        {
          type: types.SEARCH_CLEAR,
        },
        {
          type: types.SEARCH_PENDING,
        },
        {
          type: types.SEARCH_DONE,
          payload: [],
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  test('Search test WRONG', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          error: 'Not found',
        },
      });
    });
    return store.dispatch(searchArticles('wtfffffff', 'author')).then(() => {
      const expectedActions = [
        {
          type: types.SEARCH_CLEAR,
        },
        {
          type: types.SEARCH_PENDING,
        },
        {
          type: types.SEARCH_FAILED,
          payload: 'Not found',
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
