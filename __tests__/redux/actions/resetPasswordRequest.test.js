import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import resetPassword from '../../../src/redux/actions/resetPassword.actions';

const email = 'nimilleer@gmail.com';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const store = mockStore({});
describe('Reset password request', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  it('should send a reset password request', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          data: {
            message: 'A reset link will be sent to <nimilleer@gmail.com> shortly.',
          },
        },
      });
    });
    return store.dispatch(resetPassword(email)).then(() => {
      expect(store.getActions().length).toEqual(3);
    });
  });
  it('should throw an error if the email does not exist', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        data: {
          message: 'User with that email does not exist!',
        },
      });
    });
    return store.dispatch(resetPassword('nim@gmail.com')).then(() => {
      expect(store.getActions().length).toEqual(3);
    });
  });
});
