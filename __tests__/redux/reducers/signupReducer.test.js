/* eslint-disable no-undef */
import authReducer from '../../../src/redux/reducers/auth.reducer';
import {
  LOGGED_IN,
  LOGGED_OUT,
  SIGNUP_SUCCESS,
  VERIFIED,
  VERIFICATION_FAILED,
} from '../../../src/redux/actions/types/auth.type';

const initialState = {
  loggedIn: false,
  verified: false,
  signupSuccess: false,
  verifailed: false,
};

describe('SIGNUP reducer tests...', () => {
  it('Should return initial State', () => {
    const state = authReducer(initialState, {});
    expect(state).toEqual(initialState);
  });
  it('Set loggedin to TRUE', () => {
    const expectedState = {
      ...initialState,
      loggedIn: true,
    };

    const state = authReducer(initialState, { type: LOGGED_IN });
    expect(state).toEqual(expectedState);
  });
  it('Set loggedin to FALSE', () => {
    const expectedState = {
      ...initialState,
      loggedIn: false,
    };

    const state = authReducer(initialState, { type: LOGGED_OUT });
    expect(state).toEqual(expectedState);
  });

  it('Set signup success to TRUE', () => {
    const expectedState = {
      ...initialState,
      signupSuccess: true,
    };
    const state = authReducer(initialState, { type: SIGNUP_SUCCESS });
    expect(state).toEqual(expectedState);
  });

  it('Set VERIFIED to TRUE', () => {
    const expectedState = {
      ...initialState,
      loggedIn: true,
      verified: true,
    };
    const state = authReducer(initialState, { type: VERIFIED });
    expect(state).toEqual(expectedState);
  });

  it('When verification fails', () => {
    const expectedState = {
      ...initialState,
      verifailed: true,
    };
    const state = authReducer(initialState, {
      type: VERIFICATION_FAILED,
    });

    expect(state).toEqual(expectedState);
  });
});
