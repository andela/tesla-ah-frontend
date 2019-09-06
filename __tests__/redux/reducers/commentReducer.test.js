import getArticleReducer from '../../../src/redux/reducers/articles.reducer';
import {
  COMMENT_ON_ARTICLE,
  GET_COMMENTS,
  REPLY_COMMENT,
  DELETE_COMMENT,
  GET_COMMENT_LIKES,
  GET_COMMENT_DISLIKES,
  DISLIKE_COMMENT,
  LIKE_COMMENT,
  GET_COMMENT_EDIT_HISTORY,
  EDIT_COMMENT,

} from '../../../src/redux/actions/types/article.type';
import { comments } from '../../../__mocks__/data';

const initialState = {
  articles: [],
  currentArticle: {},
  uploadedImage: {},
  updatedArticle: {},
  myarticles: {},
  deletedArticle: {},
  error: {},
  Boomarks: [],
  boomark: {},
  currentComment: {},
  currentReplyComment: {},
  currentDeletedComment: {},
  currentLikedComment: {},
  commentLikes: {},
  commentDislikes: {},
  currentDisLikedComment: {},
  comments: [],
};

describe('Comment reducer', () => {
  it('Should update state with current comment', () => {
    const state = getArticleReducer(initialState, {
      type: COMMENT_ON_ARTICLE,
      payload: { data: comments.data[0].Comments[0] },
    });
    expect(typeof state).toBe('object');
    expect(state.currentComment.data.comment).toBe('jyhy');
    expect(state.currentComment.data.id).toBe(75);
  });
  it('Should update state with list of commets', () => {
    const state = getArticleReducer(initialState, {
      type: GET_COMMENTS,
      payload: { data: comments.data[0].Comments },
    });
    expect(typeof state).toBe('object');
    expect(state.comments.data.length).toBe(5);
  });
  it('Should update state with current comment reply', () => {
    const state = getArticleReducer(initialState, {
      type: REPLY_COMMENT,
      payload: { data: comments.data[0].Comments[0].Comments[0] },
    });
    expect(typeof state).toBe('object');
    expect(state.currentReplyComment.data.comment).toBe('fhiueiurdf');
    expect(state.currentReplyComment.data.id).toBe(77);
  });
  it('Should update state when comment is deleted', () => {
    const state = getArticleReducer(initialState, {
      type: DELETE_COMMENT,
      payload: { data: { message: 'comment deleted successful' } },
    });
    expect(typeof state).toBe('object');
    expect(state.currentDeletedComment.data.message).toBe('comment deleted successful');
  });
  it('Should update state with comment likes', () => {
    const state = getArticleReducer(initialState, {
      type: GET_COMMENT_LIKES,
      payload: { data: { commentId: 23, likes: 45 } },
    });
    expect(typeof state).toBe('object');
    expect(state.commentLikes.data.commentId).toBe(23);
    expect(state.commentLikes.data.likes).toBe(45);
  });
  it('Should update state with comment dislikes', () => {
    const state = getArticleReducer(initialState, {
      type: GET_COMMENT_DISLIKES,
      payload: { data: { commentId: 23, dislikes: 45 } },
    });
    expect(typeof state).toBe('object');
    expect(state.commentDislikes.data.commentId).toBe(23);
    expect(state.commentDislikes.data.dislikes).toBe(45);
  });
  it('Should update state with current comment likes', () => {
    const state = getArticleReducer(initialState, {
      type: LIKE_COMMENT,
      payload: { data: { message: 'Thanks to like this comment' } },
    });
    expect(typeof state).toBe('object');
    expect(state.currentLikedComment.data.message).toBe('Thanks to like this comment');
  });
  it('Should update state with current comment dislikes', () => {
    const state = getArticleReducer(initialState, {
      type: DISLIKE_COMMENT,
      payload: { data: { message: 'Thanks to dislike this comment' } },
    });
    expect(typeof state).toBe('object');
    expect(state.currentDisLikedComment.data.message).toBe('Thanks to dislike this comment');
  });
  it('Should update state with current comment', () => {
    const state = getArticleReducer(initialState, {
      type: EDIT_COMMENT,
      payload: { data: comments.data[0].Comments[0] },
    });
    expect(typeof state).toBe('object');
    expect(state.currentEditedComment.data.comment).toBe('jyhy');
    expect(state.currentEditedComment.data.id).toBe(75);
  });
  it('Should update state with list of commets edit history', () => {
    const state = getArticleReducer(initialState, {
      type: GET_COMMENT_EDIT_HISTORY,
      payload: { data: comments.data[0].Comments },
    });
    expect(typeof state).toBe('object');
    expect(state.currentCommentEditHistory.data.length).toBe(5);
  });
});
