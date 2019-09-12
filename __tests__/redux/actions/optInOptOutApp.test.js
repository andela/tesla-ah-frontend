import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import {
  optInApp, optOutApp,
  optInEmail, optOutEmail,
  optedInEmail, optedInApp,
} from '../../../src/redux/actions/optInOptOut.actions';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore({});

describe('Opt In Opt out Actions', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });
  it('should dispatch OPTED_IN_APP', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          message: 'You are now opted-in to in-app notifications',
          data: {
            id: 48,
            userId: 41,
            type: 'inapp',
            updatedAt: '2019-08-26T08:43:14.589Z',
            createdAt: '2019-08-26T08:43:14.589Z',
            resource: null,
            resourceId: null,
          },
        },
      });
    });
    const actions = store.getActions();
    return store.dispatch(optInApp()).then(() => {
      expect(store.getActions().length).toEqual(1);
      expect(actions[0].type).toEqual('OPTED_IN_APP');
      expect(actions[0].payload.message).toEqual('You are now opted-in to in-app notifications');
    });
  });
  it('should dispatch OPTED_OUT_APP', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'You are now opted-out!',
        },
      });
    });
    const actions = store.getActions();
    return store.dispatch(optOutApp()).then(() => {
      expect(store.getActions().length).toEqual(2);
      expect(actions[1].type).toEqual('OPTED_OUT_APP');
      expect(actions[1].payload.message).toEqual('You are now opted-out!');
    });
  });
  it('should dispatch OPTED_IN_EMAIL', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          message: 'You are now opted-in for receiving email notifications',
          data: {
            id: 48,
            userId: 41,
            type: 'inapp',
            updatedAt: '2019-08-26T08:43:14.589Z',
            createdAt: '2019-08-26T08:43:14.589Z',
            resource: null,
            resourceId: null,
          },
        },
      });
    });
    const actions = store.getActions();
    return store.dispatch(optInEmail()).then(() => {
      expect(store.getActions().length).toEqual(3);
      expect(actions[2].type).toEqual('OPTED_IN_EMAIL');
      expect(actions[2].payload.message).toEqual('You are now opted-in for receiving email notifications');
    });
  });
  it('should dispatch OPTED_OUT_EMAIL', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'You are now opted-out!',
        },
      });
    });
    const actions = store.getActions();
    return store.dispatch(optOutEmail()).then(() => {
      expect(store.getActions().length).toEqual(4);
      expect(actions[3].type).toEqual('OPTED_OUT_EMAIL');
      expect(actions[3].payload.message).toEqual('You are now opted-out!');
    });
  });
  it('should dispatch ALREADY_OPTED_IN_APP', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'You are already opted-in!',
        },
      });
    });
    const actions = store.getActions();
    return store.dispatch(optedInApp()).then(() => {
      expect(store.getActions().length).toEqual(5);
      expect(actions[4].type).toEqual('ALREADY_OPTED_IN_APP');
    });
  });
  it('should dispatch ALREADY_OPTED_IN_EMAIL', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'You are already opted-in!',
        },
      });
    });
    const actions = store.getActions();
    return store.dispatch(optedInEmail()).then(() => {
      expect(store.getActions().length).toEqual(6);
      expect(actions[5].type).toEqual('ALREADY_OPTED_IN_EMAIL');
    });
  });
  it('should throw error OPTED_IN_APP', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          message: 'You are already opted-in',
        },
      });
    });
    const actions = store.getActions();
    return store.dispatch(optInApp()).then(() => {
      expect(store.getActions().length).toEqual(6);
      expect(actions[0].type).toEqual('OPTED_IN_APP');
    });
  });
  it('should throw error OPTED_OUT_APP', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          message: 'You are already opted-out',
        },
      });
    });
    const actions = store.getActions();
    return store.dispatch(optOutApp()).then(() => {
      expect(store.getActions().length).toEqual(6);
      expect(actions[1].type).toEqual('OPTED_OUT_APP');
    });
  });
  it('should throw error OPTED_IN_EMAIL', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          message: 'You are already opted-in',
        },
      });
    });
    const actions = store.getActions();
    return store.dispatch(optInEmail()).then(() => {
      expect(store.getActions().length).toEqual(6);
      expect(actions[2].type).toEqual('OPTED_IN_EMAIL');
    });
  });
  it('should throw error OPTED_OUT_EMAIL', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          message: 'You are already opted-out',
        },
      });
    });
    const actions = store.getActions();
    return store.dispatch(optOutEmail()).then(() => {
      expect(store.getActions().length).toEqual(6);
      expect(actions[3].type).toEqual('OPTED_OUT_EMAIL');
    });
  });
});
