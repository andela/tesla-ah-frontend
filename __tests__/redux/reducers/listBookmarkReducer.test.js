import * as articleActionType from '../../../src/redux/actions/types/article.type';
import bookmarkReducer from '../../../src/redux/reducers/bookmarks.reducer';
import { article } from '../../../__mocks__/data';

const initialState = {
  list: [...article],
  error: '',
  message: '',
  loading: false,
};

describe('List Bookmarked Article', () => {
  test('GET_BOOKMARKS_PENDING', () => {
    const reducer = bookmarkReducer(initialState, {
      type: articleActionType.GET_BOOKMARKS_PENDING,
      payload: { loading: false },
    });
    expect(reducer.loading).toBeTruthy();
  });
  test('GET_BOOKMARKS', () => {
    const reducer = bookmarkReducer(null, {
      type: articleActionType.GET_BOOKMARKS,
      payload: [article],
    });
    expect(reducer.list).toEqual([article]);
  });
  test('GET_BOOKMARKED_ERROR', () => {
    const reducer = bookmarkReducer(null, {
      type: articleActionType.GET_BOOKMARKED_ERROR,
      payload: 'Something went Wrong!',
    });

    expect(reducer.error).toEqual('Something went Wrong!');
  });
});
describe('Delete Bookmarked Article', () => {
  test('DELETE_BOOKMARKS', () => {
    const reducer = bookmarkReducer(initialState, {
      type: articleActionType.DELETE_BOOKMARKS,
      payload: { message: 'Deleted Successfully!', slug: 'slug123' },
    });
    expect(reducer.message).toEqual('Deleted Successfully!');
  });
  test('DELETE_BOOKMARKS_ERROR', () => {
    const reducer = bookmarkReducer(null, {
      type: articleActionType.DELETE_BOOKMARKS_ERROR,
      payload: 'Something went Wrong!',
    });

    expect(reducer.error).toEqual('Something went Wrong!');
  });
});
