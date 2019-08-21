import reducer from '../../../src/redux/reducers/profile.reducer';
import {
  GET_ARTICLE,
  GET_ARTICLE_FAIL,
  GET_PROFILE,
  GET_PROFILE_FAIL,
  GET_CURRENT_USER_SUCCESS,
  PROFILE_INIT_FAIL,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  SET_PROFILE_UPDATABLE,
} from '../../../src/redux/actions/types/profile.type';

describe('Test profile reducers', () => {
  test('PROFILE_INIT_FAIL reducer', () => {
    const initialState = {
      error: false,
      isLoading: false,
    };
    expect(reducer(initialState, {
      type: PROFILE_INIT_FAIL,
      payload: { error: new Error('Test error') },
    })).toEqual({
      error: true,
      isLoading: false,
      message: new Error('Test error'),
    });
  });

  test('GET_ARTICLE reducer', () => {
    const initialState = {
      articles: null,
      articlesCount: 0,
    };
    expect(reducer(initialState, {
      type: GET_ARTICLE,
      payload: { articles: [], articlesCount: 0 },
    })).toEqual({
      articles: [],
      articlesCount: 0,
      hasArticles: true,
    });
  });

  test('GET_ARTICLE_FAIL reducer', () => {
    const initialState = {
      error: false,
      errorMessage: null,
    };
    expect(reducer(initialState, {
      type: GET_ARTICLE_FAIL,
      payload: { error: 'Error' },
    })).toEqual({
      error: true,
      errorMessage: 'Error',
    });
  });

  test('GET_PROFILE reducer', () => {
    const initialState = {
      user: null,
    };
    expect(reducer(initialState, {
      type: GET_PROFILE,
      payload: { profile: {} },
    })).toEqual({
      user: {},
    });
  });

  test('GET_PROFILE_FAIL reducer', () => {
    const initialState = {
      error: false,
      errorMessage: null,
    };
    expect(reducer(initialState, {
      type: GET_PROFILE_FAIL,
      payload: { error: 'Error' },
    })).toEqual({
      error: true,
      errorMessage: 'Error',
    });
  });

  test('GET_CURRENT_USER_SUCCESS reducer', () => {
    const initialState = {
      currentUser: null,
      completed: false,
    };
    expect(reducer(initialState, {
      type: GET_CURRENT_USER_SUCCESS,
      payload: { currentUser: {} },
    })).toEqual({ currentUser: {}, completed: true });
  });

  test('UPDATE_PROFILE_START reducer', () => {
    const initialState = {
      isDoneUpdating: false,
      updating: false,
    };
    expect(reducer(initialState, { type: UPDATE_PROFILE_START })).toEqual({
      isDoneUpdating: false,
      updating: true,
    });
  });

  test('UPDATE_PROFILE_FAIL reducer', () => {
    const initialState = {
      isDoneUpdating: false,
      updating: false,
    };
    expect(reducer(initialState, { type: UPDATE_PROFILE_FAIL })).toEqual({
      isDoneUpdating: true,
      updating: false,
    });
  });

  test('UPDATE_PROFILE_SUCCESS reducer', () => {
    const initialState = {
      user: {},
      isDoneUpdating: false,
      currentUser: null,
      updating: false,
    };
    expect(reducer(initialState, {
      type: UPDATE_PROFILE_SUCCESS,
      payload: {
        user: { username: 'joe' },
      },
    })).toEqual({
      isDoneUpdating: true,
      user: { username: 'joe' },
      currentUser: { username: 'joe' },
      updating: false,
    });
  });

  test('SET_PROFILE_UPDATABLE reducer', () => {
    const initialState = {
      isDoneUpdating: true,
      updating: false,
    };
    expect(reducer(initialState, {
      type: SET_PROFILE_UPDATABLE,
    })).toEqual({
      isDoneUpdating: false,
      updating: false,
    });
  });
});
