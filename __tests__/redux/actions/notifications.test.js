import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import {
  readNotification, getUnreadNotifications,
} from '../../../src/redux/actions/notifications.actions';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore({});

describe('Notifications Actions', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });
  it('should dispatch GET_UNREAD_NOTIFICATIONS', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: {
            unreadNotifications: [
              {
                id: 122,
                type: 'inapp',
                userId: 43,
                resource: 'articles',
                resourceId: null,
                message: 'Emily Benurugo published a new article.',
                url: null,
                status: 'unread',
                createdAt: '2019-09-04T08:23:08.338Z',
                updatedAt: '2019-09-04T08:23:08.338Z',
              },
            ],
          },
        },
      });
    });
    const actions = store.getActions();
    return store.dispatch(getUnreadNotifications()).then(() => {
      expect(store.getActions().length).toEqual(1);
      expect(actions[0].type).toEqual('GET_UNREAD_NOTIFICATIONS');
      expect(actions[0].payload[0].status).toEqual('unread');
    });
  });
  it('should dispatch READ_NOTIFICATION', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: {
            message: 'Emily Benurugo published a new article.',
          },
        },
      });
    });
    const actions = store.getActions();
    return store.dispatch(readNotification()).then(() => {
      expect(store.getActions().length).toEqual(2);
      expect(actions[1].type).toEqual('READ_NOTIFICATION');
      expect(actions[1].payload.data.message).toEqual('Emily Benurugo published a new article.');
    });
  });
});
