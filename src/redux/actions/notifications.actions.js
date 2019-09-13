import axios from 'axios';
import io from 'socket.io-client';
import { BACKEND_URL, REMOTE_SOCKET_SERVER } from '../../utils/constants';
import {
  READ_NOTIFICATION,
  GET_UNREAD_NOTIFICATIONS,
  GET_NOTIFICATIONS,

} from './types/notifications.type';
import store from '../store/index';

export const readNotification = id => async (dispatch) => {
  const username = sessionStorage.getItem('username');
  const token = sessionStorage.getItem('token');
  const { data } = await axios.get(`${BACKEND_URL}/api/profiles/${username}/notifications/${id}`, {
    headers: {
      token,
    },
  });
  dispatch({
    type: READ_NOTIFICATION,
    payload: data,
  });
};
export const getUnreadNotifications = () => async (dispatch) => {
  const username = sessionStorage.getItem('username');
  const token = sessionStorage.getItem('token');
  const { data } = await axios.get(`${BACKEND_URL}/api/profiles/${username}/notifications`, {
    headers: {
      token,
    },
  });
  dispatch({
    type: GET_UNREAD_NOTIFICATIONS,
    payload: data.data.unreadNotifications,
  });
};
const socket = io(`${REMOTE_SOCKET_SERVER}`);
/* istanbul ignore next */
socket.on('new_message', data => store.dispatch({
  type: GET_NOTIFICATIONS,
  payload: data.message,
}));
