import notificationsReducer from '../../../src/redux/reducers/notifications.reducer';
import {
  GET_UNREAD_NOTIFICATIONS,
  READ_NOTIFICATION,
  GET_NOTIFICATIONS,
} from '../../../src/redux/actions/types/notifications.type';

const initialState = {
  areNotificationsUpdated: false,
  isRead: false,
  socketIO: null,
};

describe('Notifications reducer tests...', () => {
  it('Should return initial State', () => {
    const state = notificationsReducer(initialState, {});
    expect(state).toEqual(initialState);
  });
  it('Set update notifications on GET_UNREAD_NOTIFICATIONS', () => {
    const expectedState = {
      ...initialState,
      areNotificationsUpdated: true,
    };

    const state = notificationsReducer(initialState, { type: GET_UNREAD_NOTIFICATIONS });
    expect(state).toEqual(expectedState);
  });
  it('Set update notifications on READ_NOTIFICATION', () => {
    const expectedState = {
      ...initialState,
      notification: 'message',
      areNotificationsUpdated: true,
    };

    const state = notificationsReducer(initialState, {
      type: READ_NOTIFICATION,
      payload: {
        data: { message: 'message' },
      },
    });
    expect(state).toEqual(expectedState);
  });
});
