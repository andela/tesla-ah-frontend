/* eslint-disable no-console */
import axios from 'axios';
import { BACKEND_URL } from '../../../utils/constants';
import * as types from '../types/chat.type';
import getUniqueUsers from '../../../utils/uniqueObject';


export const usersPending = () => ({
  type: types.CHAT_USERS_PENDING,
});

export const chatsPending = () => ({
  type: types.CHAT_MESSAGES_PENDING,
});

// eslint-disable-next-line no-unused-vars
export const fetchProfile = username => async (dispatch) => {
  try {
    const { data: response } = await axios.get(`${BACKEND_URL}/api/profiles/${username}`);
    dispatch({
      type: types.GET_CURRENT_CHAT_USER,
      payload: response.profile,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMessages = username => async (dispatch) => {
  dispatch(chatsPending());
  try {
    const { data: response } = await axios.get(`${BACKEND_URL}/api/chats/${username}`, {
      headers: {
        token: sessionStorage.getItem('token'),
      },
    });
    console.log(response);
    dispatch({
      type: types.GET_CHAT_MESSAGES,
      payload: response.messages,
    });
  } catch (error) {
    console.log(error);
  }
};

export default () => async (dispatch) => {
  dispatch(usersPending());
  try {
    const token = sessionStorage.getItem('token');
    const { data: response } = await axios.get(`${BACKEND_URL}/api/chats/users`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        token,
      },
    });
    const meData = response.me;
    /* istanbul ignore next */
    if (response.followers.length) {
      /* istanbul ignore next */
      const availUsers = [];
      /* istanbul ignore next */
      response.followers.forEach((follower) => {
        if (follower.userId === meData.id) {
          availUsers.push({
            ...follower.follower,
            status: 'Followed you',
          });
        } else {
          availUsers.push({
            ...follower.followedUser,
            status: 'Following',
          });
        }
      });
      /* istanbul ignore next */
      dispatch({
        type: types.GET_CHAT_USERS,
        payload: getUniqueUsers(availUsers),
      });
    }
  } catch (error) {
    console.log(error);
  }
};
