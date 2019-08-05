/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import jwt from 'jsonwebtoken';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { login } from '../../../../src/redux/actions/users/login.actions';

const loginData = {
  email: 'danimahoro75@gmail.com',
  password: 'Esther@123!',
};

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore({});

describe('Login should work', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('Login success tests...', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: {
            message: 'User login successfully',
            email: 'danimahoro75@gmail.com',
            token: jwt.sign({ id: 1 }, 'secret', { expiresIn: '1d' }),
          },
        },
      });
    });
    return store.dispatch(login(loginData)).then(() => {
      expect(store.getActions().length).toEqual(3);
    });
  });
  test('login testing data', () => {
    const expected = {
      data: {
        error: {
          message: 'Bad request',
        },
      },
    };
    moxios.stubRequest(/.*/, {
      response: expected,
    });
    return store.dispatch(login()).then(() => {
    });
  });
});
