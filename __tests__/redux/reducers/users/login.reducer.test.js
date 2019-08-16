import * as actionTypes from '../../../../src/redux/actions/types/auth.type';
import authReducer, { initialState } from '../../../../src/redux/reducers/users/login.reducer';

describe('Auth reducer', () => {
  test('LOGIN_PENDING', () => {
    const reducer = authReducer(initialState, {
      type: actionTypes.LOGIN_PENDING,
      payload: { isLogging: false },
    });

    expect(reducer.isAdmin).toBeFalsy();
    expect(reducer.isLogging).toBeTruthy();
    expect(reducer.isAuthenticated).toBeFalsy();
  });

  test('LOGIN_SUCCESS', () => {
    const reducer = authReducer(initialState, {
      type: actionTypes.LOGIN_SUCCESS,
      payload: {
        message: 'welcome Diane',
        isAuthenticated: true,
        isAdmin: false,
        isLogging: true,
      },
    });

    expect(reducer.isAuthenticated).toBeTruthy();
    expect(reducer.isAdmin).toBeFalsy();
    expect(reducer.isLogging).toBeFalsy();
    expect(reducer.message).toEqual('welcome Diane');
  });
  test('LOGIN_ERROR', () => {
    const reducer = authReducer(initialState, {
      type: actionTypes.LOGIN_ERROR,
      payload: 'Bad request!',
    });

    expect(reducer.error).toEqual('Bad request!');
  });
});
