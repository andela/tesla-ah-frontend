import searchReducer from '../../../../src/redux/reducers/article/search.reducer';
import * as types from '../../../../src/redux/actions/types/article.type';

const initialState = {
  results: [],
  failed: false,
  pending: false,
  cleared: true,
  message: '',
  done: false,
};

const data = [
  {
    id: 1,
    slug: 'one',
    description: 'This is the first article',
  },
];

describe('SEARCH reducer tests...', () => {
  test('Should return initial state', () => {
    const state = searchReducer(initialState, {});
    expect(state).toEqual(initialState);
  });
  test('When Search is done', () => {
    const expectedState = {
      ...initialState,
      results: data,
      cleared: false,
      pending: false,
      done: true,
    };
    const state = searchReducer(initialState, ({ type: types.SEARCH_DONE, payload: data }));
    expect(state).toEqual(expectedState);
  });
  test('Reinitialize the reducer', () => {
    const state = searchReducer(initialState, { type: types.SEARCH_CLEAR, payload: null });
    expect(state).toEqual(initialState);
  });
  test('In case the search failed', () => {
    const expectedState = {
      ...initialState,
      pending: false,
      failed: true,
      message: 'Request failed',
    };
    const state = searchReducer(initialState, { type: types.SEARCH_FAILED, payload: 'Request failed' });
    expect(state).toEqual(expectedState);
  });
  test('The search request is pending', () => {
    const expectedState = {
      ...initialState,
      pending: true,
    };
    const state = searchReducer(initialState, { type: types.SEARCH_PENDING, payload: null });
    expect(state).toEqual(expectedState);
  });
});
