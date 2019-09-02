import * as types from '../../actions/types/chat.type';

const initialState = {
  users: [],
  currentFriend: {},
  messages: [],
  usersPending: false,
  messagesPending: false,
  failed: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_CHAT_USERS:
      return {
        ...state,
        users: payload,
        usersPending: false,
      };
    case types.CHAT_USERS_PENDING:
      return {
        ...state,
        usersPending: true,
      };
    case types.CHAT_MESSAGES_PENDING:
      return {
        ...state,
        messagesPending: true,
      };
    case types.GET_CURRENT_CHAT_USER:
      return {
        ...state,
        currentFriend: payload,
      };
    case types.CURRENT_CHAT_USER_FAIL:
      return {
        ...state,
        failed: true,
      };
    case types.GET_CHAT_MESSAGES:
      return {
        ...state,
        messages: payload,
        messagesPending: false,
      };
    default:
      return state;
  }
};
