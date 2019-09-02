
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import fetchUsers, { getMessages, fetchProfile } from '../../../../src/redux/actions/users/chat.actions';
import SessionStorage from '../../../../__mocks__/sessionStorageMock';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const store = mockStore({});

let storage;
describe('Chat Actions...', () => {
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
  test('Should fetch the users to chat with', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: [],
        },
      });
    });

    return store.dispatch(fetchUsers()).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
  test('Should fetch the messages for a friend', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: [],
        },
      });
    });
    return store.dispatch(getMessages()).then(() => {
      expect(store.getActions().length).toEqual(2);
    });
  });
  test('Should not be able to fetch messages', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: {
          error: 'Unauthorized',
        },
      });
    });
    return store.dispatch(getMessages()).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
  test('Should fetch a profile of a friend', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          profile: {
            username: 'axell',
          },
        },
      });
    });
    return store.dispatch(fetchProfile('axell')).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
  test('Should not fetch a profile', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          error: 'Not found',
        },
      });
    });
    return store.dispatch(fetchProfile('axel380')).then(() => {
      expect(store.getActions().length).toEqual(0);
    });
  });
});
