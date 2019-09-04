/* eslint-disable object-curly-newline */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { likeArticle, dislikeArticle, getArticleLikes, getArticleDislikes } from '../../../src/redux/actions/article.actions';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore({});

describe('test action for like and dislike an article', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('should get number of likes of the article', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: { numberOfLikes: 1, count: 1 },
        },
      });
    });
    return store.dispatch(getArticleLikes(1)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
  test('should like an article', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: { numberOfLikes: 1, count: 1 },
        },
      });
    });
    return store.dispatch(likeArticle(1)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
  test('should dislike article', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: { numberOfLikes: 1 },
        },
      });
    });
    return store.dispatch(dislikeArticle(1)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
  test('should get number of dislikes article', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: { numberOfLikes: 1 },
        },
      });
    });
    return store.dispatch(getArticleDislikes(1)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
  test('should get error when you already liked an article', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 403,
        response: {
          data: 'you are already liked this article',
        },
      });
    });
    return store.dispatch(likeArticle(1)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
  test('should get error when you already disliked an article', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 403,
        response: {
          data: 'you are already disliked this article',
        },
      });
    });
    return store.dispatch(dislikeArticle(1)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});
