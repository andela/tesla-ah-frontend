/* eslint-disable no-unreachable */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-undef */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { getBoomarks, bookmark } from '../../../src/redux/actions/article.actions';
import SessionStorage from '../../../__mocks__/sessionStorageMock';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore({});

let storage;

describe('test for bookmarking article to read  later', () => {
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
  test('should get bookmarks', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: { Bookmark: [], count: 1 },
        },
      });
    });
    return store.dispatch(getBoomarks(1)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
  test('should create bookmark', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: { bookmark: {}, count: 1 },
        },
      });
    });
    return store.dispatch(bookmark(1)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
  test('should not create bookmark when user is not authenticate', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 403,
        response: {
          data: { bookmark: 'error' },
        },
      });
    });
    return store.dispatch(bookmark(1)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});
