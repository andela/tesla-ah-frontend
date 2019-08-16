/* eslint-disable prefer-promise-reject-errors */
// /* eslint-disable prefer-promise-reject-errors */
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import { socialLogin, loginWithFacebook, loginWithGoogle, loginWithTwitter } from '../../../src/redux/actions/socialLogin';

require('@babel/polyfill');

const mockStore = configureMockStore([thunk]);
const Store = mockStore();

describe('Action socialLogin', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    Store.clearActions();
  });
  it('Should dispatch the action SIGNUP_SUCCESS', () => {
    const accessToken = '45ytopmpowe';
    const provider = {
      username: 'claude',
    };

    const expectedResults = {
      status: 200,
      results: {
        data: {
          user: {
            username: 'claude',
          },
        },
      },
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResults,
      });
    });
    return Store.dispatch(socialLogin(accessToken, provider)).then(() => {
      expect(Store.getActions()).toBeDefined();
    });
  });
  it('should let user login with twitter', () => {
    const expectedResult = {
      token: 'twitterToken',
      username: 'EmyRukundo',
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResult,
      });
    });
    Store.dispatch(loginWithTwitter('twitterToken', 'EmyRukundo'));
    const action = Store.getActions();
    expect(action[0].payload).toEqual(expectedResult);
  });
  it('should let user login with google', () => {
    const expectedResult = {
      token: 'googleToken',
      username: 'Rukundo',
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResult,
      });
    });
    Store.dispatch(loginWithGoogle('googleToken', 'Rukundo'));
    const action = Store.getActions();
    expect(action[0].payload).toEqual(expectedResult);
  });
  it('should let user login with facebook', () => {
    const expectedResult = {
      username: 'Emy',
      token: 'facebookToken',
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResult,
      });
    });
    Store.dispatch(loginWithFacebook('facebookToken', 'Emy'));
    const action = Store.getActions();
    expect(action[0].payload).toEqual(expectedResult);
  });
  it('should fail when error login', () => {
    const expected = {
      data: { message: 'error ' },
    };
    moxios.stubRequest(/.*/, {
      response: expected,
    });
    return Store.dispatch(socialLogin())
      .then(() => {
        const action = Store.getActions();
        expect(action).toBeDefined();
      });
  });
});
