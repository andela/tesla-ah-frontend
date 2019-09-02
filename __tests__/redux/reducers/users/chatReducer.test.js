import chatReducer from '../../../../src/redux/reducers/users/chat.reducers';
import * as types from '../../../../src/redux/actions/types/chat.type';

const initialState = {
  users: [],
  currentFriend: {},
  messages: [],
  usersPending: false,
  messagesPending: false,
  failed: false,
};

describe('Chat reducer tests', () => {
  test('Should return initial state', () => {
    const state = chatReducer(initialState, {});
    expect(state).toEqual(initialState);
  });
  test('Should update the state when users are fetched', () => {
    const expectedState = {
      ...initialState,
      users: [],
      usersPending: false,
    };

    const state = chatReducer(initialState, {
      type: types.GET_CHAT_USERS,
      payload: [],
    });
    expect(state).toEqual(expectedState);
  });
  test('Should update the state when the action of fetching users is pending', () => {
    const expectedState = {
      ...initialState,
      usersPending: true,
    };
    const state = chatReducer(initialState, {
      type: types.CHAT_USERS_PENDING,
    });
    expect(state).toEqual(expectedState);
  });
  test('Should update the state after the current user is fetched', () => {
    const expectedState = {
      ...initialState,
      currentFriend: {
        name: 'axel',
      },
    };
    const state = chatReducer(initialState, {
      type: types.GET_CURRENT_CHAT_USER,
      payload: {
        name: 'axel',
      },
    });
    expect(state).toEqual(expectedState);
  });
  test('Should update the state if a user is not fetched successfully', () => {
    const expectedState = {
      ...initialState,
      failed: true,
    };
    const state = chatReducer(initialState, {
      type: types.CURRENT_CHAT_USER_FAIL,
      payload: null,
    });
    expect(state).toEqual(expectedState);
  });
  test('Should get messages and update them in reducer', () => {
    const messages = [
      {
        data: 'Hi',
      },
      {
        data: 'Hello',
      },
    ];
    const expectedState = {
      ...initialState,
      messages,
      messagesPending: false,
    };
    const state = chatReducer(initialState, {
      type: types.GET_CHAT_MESSAGES,
      payload: messages,
    });
    expect(state).toEqual(expectedState);
  });
  test('Should update the state if messages are pending', () => {
    const expectedState = {
      ...initialState,
      messagesPending: true,
    };
    const state = chatReducer(initialState, {
      type: types.CHAT_MESSAGES_PENDING,
    });
    expect(state).toEqual(expectedState);
  });
});
