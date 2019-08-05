/* eslint-disable no-undef */
import uiReducer from '../../../src/redux/reducers/ui.reducer';
import { IS_LOADING, IS_LOADED } from '../../../src/redux/actions/types/ui.type';

const initialState = {
  loading: false,
};

describe('UI Reducer TESTS...', () => {
  it('Should return initial state', () => {
    const state = uiReducer(initialState, {});
    expect(state).toEqual(initialState);
  });
  it('Should LOAD', () => {
    const expectedState = {
      loading: true,
    };
    const state = uiReducer(initialState, { type: IS_LOADING });
    expect(state).toEqual(expectedState);
  });

  it('Should stop LOADING', () => {
    const expectedState = {
      loading: false,
    };
    const state = uiReducer(initialState, { type: IS_LOADED });
    expect(state).toEqual(expectedState);
  });
});
