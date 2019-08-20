/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-undef */
import { bookmarkk } from '../../../__mocks__/data';
import getArticleReducer from '../../../src/redux/reducers/articles.reducer';
import { GET_BOOKMARK, BOOKMARK } from '../../../src/redux/actions/types/article.type';


describe('Reducer test bookmarking', () => {
  const initialState5 = {
  };
  it('should return an object reducer', () => {
    const expectedState = {
      ...initialState5,
      Bookmarks: bookmarkk,
    };
    const state = getArticleReducer(initialState5, ({ type: GET_BOOKMARK, payload: bookmarkk }));
    expect(state[0]).toBe(expectedState[0]);
  });
  it('should return an object', () => {
    const expectedState = {
      ...initialState5,
      Bookmarks: bookmarkk,
    };

    const state = getArticleReducer(initialState5, ({ type: BOOKMARK, payload: bookmarkk[0] }));
    expect(state[0]).toBe(expectedState[0]);
  });
});
