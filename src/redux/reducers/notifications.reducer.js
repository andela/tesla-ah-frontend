import {
  GET_UNREAD_NOTIFICATIONS,
  READ_NOTIFICATION,
  GET_NOTIFICATIONS,
} from '../actions/types/notifications.type';

const initialState = {
  notifications: [],
  areNotificationsUpdated: false,
  socketIO: null,
};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      /* istanbul ignore next */
      return {
        ...state,
        socketIO: action.payload,
      };
    case GET_UNREAD_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
        areNotificationsUpdated: true,
        socketIO: null,
      };
    case READ_NOTIFICATION:
      return {
        ...state,
        notification: action.payload.data.message,
        areNotificationsUpdated: true,
      };
    default:
      return state;
  }
};
export default notificationsReducer;
