/* eslint-disable no-undef */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
  createAccount,
  verifyAccount,
  loggOut,
} from '../../../src/redux/actions/auth.actions';
import SessionStorage from '../../../__mocks__/sessionStorageMock';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const store = mockStore({});
let storage;
describe('Signup and verify account tests...', () => {
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
  test('It will throw errors', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          error: 'Invalid request',
          data: {
            message: 'We dont do that here',
          },
        },
        data: {
          message: 'we dont do that here',
        },
      });
    });

    return store.dispatch(createAccount({})).then(() => {
      expect(store.getActions().length).toEqual(2);
    });
  });
  test('Should verify an account', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 202,
        message: 'You are now verified',
      });
    });
    const token = 'dhdhdhdhdhd';
    return store.dispatch(verifyAccount(token)).then(() => {
      expect(store.getActions().length).toEqual(4);
    });
  });
  test('Should not be able to verify an account', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        error: 'Invalid request',
      });
    });
    return store.dispatch(verifyAccount('1234')).then(() => {
      expect(store.getActions().length).toEqual(3);
    });
  });
  test('should be able to log out', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        message: ' you are now logged out',
      });
    });
    return store.dispatch(loggOut()).then(() => {
    });
  });
});
