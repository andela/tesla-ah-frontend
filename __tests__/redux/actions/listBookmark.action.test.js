/* eslint-disable no-unused-vars */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { listBookmarkedArticle, deleteBookmarkedArticle } from '../../../src/redux/actions/bookmark.action';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore({});

describe('Get All bookmarked Articles', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('Bookmark List Test...', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: {
            foundArticles: [],
            count: 1,
          },
        },
      });
    });
    return store.dispatch(listBookmarkedArticle(2)).then(() => {
      expect(store.getActions().length).toEqual(2);
    });
  });
  test('Bookmark list Error...', () => {
    const expected = {
      data: {
        error: {
          message: 'Something went wrong',
        },
      },
    };
    moxios.stubRequest(/.*/, {
      status: 500,
      response: expected,
    });
    return store.dispatch(listBookmarkedArticle()).then(() => {});
  });
  test('Delete Bookmarks Successfully...', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        data: { message: 'Deleted Successfully!', slug: 'slug123' },
      });
    });
    return store.dispatch(deleteBookmarkedArticle(1)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
  test('delete Bookmarks Error...', () => {
    const expected = {
      data: {
        error: {
          message: 'Something went wrong',
        },
      },
    };
    moxios.stubRequest(/.*/, {
      status: 500,
      response: expected,
    });
    return store.dispatch(deleteBookmarkedArticle()).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});
