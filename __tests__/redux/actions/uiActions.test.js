import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { setLoaded, setLoading, setLoggedIn } from '../../../src/redux/actions/ui.actions';
import {
  IS_LOADED,
  IS_LOADING,
} from '../../../src/redux/actions/types/ui.type';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore({});

describe('Should test logged in', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });
  test('should set logged-in', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        response: { type: 'LOGGED_IN' },
      });
    });

    return store.dispatch(setLoggedIn());
  });
});
describe('LOADERS tests...', () => {
  it('LOADING Should pass', () => {
    const expectedAction = {
      type: IS_LOADING,
    };
    expect(setLoading()).toEqual(expectedAction);
  });
  it('LOADED should pass', () => {
    const expectedAction = {
      type: IS_LOADED,
    };
    expect(setLoaded()).toEqual(expectedAction);
  });
});
