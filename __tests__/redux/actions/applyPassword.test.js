import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import applyPassword from '../../../src/redux/actions/applyPassword.actions';
import SessionStorage from '../../../__mocks__/sessionStorageMock';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const store = mockStore({});
let storage;
describe('Apply password actions', () => {
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
  it('Should update the password', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          data: { message: 'Password changed successful' },
        },
      });
      const newpassword = 'Test12345!';
      const token = 'hwlebdfwulwg4yw4gyfgydbwbawhldw-qfnjq';
      return store.dispatch(applyPassword(newpassword, token)).then(() => {
        expect(store.getActions().type).toEqual('PATCH_RESET');
        expect(store.getActions().length).toEqual(4);
      });
    });
  });
  it('Should not update the password if the token is missing', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        error: 'Token is missing',
      });
    });
    const newpassword = 'Hello1234!';
    return store.dispatch(applyPassword(newpassword)).then(() => {
      expect(store.getActions().length).toEqual(4);
    });
  });
  it('should throw an error if the the password is not in the right format', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          error: 'Invalid Password is required and must be at least 8 letters containing'
  + ' at least a number a Lowercase letter and an Uppercase letter',
        },
      });
    });
    const token = 'hwlebdfwulwg4yw4gyfgydbwbawhldw-qfnjq';
    return store.dispatch(applyPassword('Test', token)).then(() => {
      expect(store.getActions().length).toEqual(3);
    });
  });
});
