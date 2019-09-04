/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import likeAndDislikeReducer from '../../../../src/redux/reducers/likeAndDislike.reducer';
import { LIKE_ARTICLE_SUCCESS, LIKE_ARTICLE_FAILURE, GET_ARTICLE_LIKES_SUCCESS, GET_ARTICLE_DISLIKES_SUCCESS, DISLIKE_ARTICLE_SUCCESS, DISLIKE_ARTICLE_FAILURE } from '../../../../src/redux/actions/types/likeAndDislike.type';

describe('Reducer test for like and dislike', () => {
  const initialState = {
    article: {},
    getArticleLikes: {},
    getArticleDislikes: {},
    likes: 1,
    like_article: 0,
  };
  const data = [
    {
      numberOflikes: 1,
    },
  ];

  it('should return like article success', () => {
    const expectedState = {
      ...initialState,
      payload: data,
    };

    const state = likeAndDislikeReducer(initialState,

      ({ type: LIKE_ARTICLE_SUCCESS, payload: data }));

    expect(state.like_article[0].numberOflikes).toBe(1);
  });

  it('it should return like article failure', () => {
    const expectedState = {
      ...initialState,
      payload: data,
    };

    const state = likeAndDislikeReducer(initialState,

      ({ type: LIKE_ARTICLE_FAILURE, payload: data }));

    expect(state.like_article[0].numberOflikes).toBe(1);
  });

  it('it shoudld return get article like success', () => {
    const expectedState = {
      ...initialState,
      payload: data,
    };

    const state = likeAndDislikeReducer(initialState,
      ({ type: GET_ARTICLE_LIKES_SUCCESS, payload: data }));
    expect(state.likes).toBe(1);
  });

  it('should return dislike article success', () => {
    const expectedState = {
      ...initialState,
      payload: data,
    };

    const state = likeAndDislikeReducer(initialState,
      ({ type: DISLIKE_ARTICLE_SUCCESS, payload: data }));
    expect(state.dislike_article[0].numberOflikes).toBe(1);
  });

  it('should return dislike article failure', () => {
    const expectedState = {
      ...initialState,
      payload: data,
    };

    const state = likeAndDislikeReducer(initialState,
      ({ type: DISLIKE_ARTICLE_FAILURE, payload: data }));
    expect(state.dislike_article[0].numberOflikes).toBe(1);
  });

  it('it should return get article dislike success', () => {
    const expectedState = {
      ...initialState,
      payload: data,
    };

    const state = likeAndDislikeReducer(initialState,
      ({ type: GET_ARTICLE_DISLIKES_SUCCESS, payload: data }));
    expect(state.get_article_dislikes[0].numberOflikes).toBe(1);
  });
});
