import getArticleReducer from '../../../src/redux/reducers/articles.reducer';
import {
  UPLOAD_IMAGE,
  UPDATE_ARTICLE,
  RESET_PROPS,
  GET_MY_ARTICLES,
  GET_ARTICLES,
  CREATE_ARTICLE,
  GET_ONE_ARTICLES,
  DELETE_ARTICLE,
  ARTICLE_ERRORS,
} from '../../../src/redux/actions/types/article.type';
import getLoginReducer from '../../../src/redux/reducers/users/login.reducer';
import { article } from '../../../__mocks__/data';
import { getFromEditor } from '../../../src/utils/getArticleItemData';
import resetPasswordReducer from '../../../src/redux/reducers/resetPassword.reducer';
import applyPasswordReducer from '../../../src/redux/reducers/applyPassword.reducer';
import { POST_RESET, PATCH_RESET } from '../../../src/redux/actions/types/resetPassword.type';
import { IS_LOADING, IS_LOADED } from '../../../src/redux/actions/types/ui.type';
import { GET_USER_PROFILE } from '../../../src/redux/actions/types/authorprofile.type';
import getauthorreducer from '../../../src/redux/reducers/authorprofile.reducer';
import getUiReducer from '../../../src/redux/reducers/ui.reducer';
import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR } from '../../../src/redux/actions/types/auth.type';
import { resetProps } from '../../../src/redux/actions/article.actions';

describe('Article reducer', () => {
  const initialState1 = {
    articles: [],
    currentArticle: {},
    uploadedImage: {},
    updatedArticle: {},
  };
  it('Should return an object when image uploaded', () => {
    const articles = getArticleReducer(initialState1, {
      type: UPLOAD_IMAGE,
      payload: { data: { url: 'dededededed' } },
    });
    expect(typeof articles).toBe('object');
    expect(articles.uploadedImage.data.url).toBe('dededededed');
  });
  it('Should return list of articles', () => {
    const articles = getArticleReducer(initialState1, {
      type: GET_MY_ARTICLES,
      payload: {},
    });
    expect(typeof articles).toBe('object');
    expect(articles.articles.length).toBe(0);
  });
  it('Should return an object when article updates successful', () => {
    const articles = getArticleReducer(initialState1, {
      type: UPDATE_ARTICLE,
      payload: { article: article[0] },
    });
    expect(typeof articles).toBe('object');
    expect(articles.updatedArticle.article.id).toBe(16);
    expect(articles.updatedArticle.article.readtime).toBe('2 min');
  });
  it('Should return an object when props are reseted', () => {
    const articles = getArticleReducer(initialState1, {
      type: RESET_PROPS,
      payload: {},
    });
    expect(typeof articles).toBe('object');
  });
  it('Should return an article', () => {
    const articl = JSON.parse(JSON.stringify(article[0]));
    const articl2 = JSON.parse(articl.body);
    const { blocks } = articl2.article.body;
    const finalOb = { article: { body: { blocks } } };
    const art = getFromEditor(finalOb);
    expect(typeof art).toBe('object');
    expect(art.image).toBe('https://res.cloudinary.com/newpoint/image/upload/v1566071168/lksj3nq8aygqcblnnk2v.jpg');
  });
  it('Should return an article', () => {
    const articl = JSON.parse(JSON.stringify(article[3]));
    const articl2 = JSON.parse(articl.body);
    const { blocks } = articl2.article.body;
    const finalOb = { article: { body: { blocks } } };
    const art = getFromEditor(finalOb);
    expect(typeof art).toBe('object');
    expect(art.image).toBe('https://res.cloudinary.com/tesla-ah-media/image/upload/v1565531346/k5jqfj07rverjw5bqqk4.gif');
  });
  const initialStateps = {
    message: '',
    status: '',
  };
  it('Should return an object when password reset is request', () => {
    const obj = resetPasswordReducer(initialStateps, {
      type: POST_RESET,
      payload: {
        data: { message: 'password rest link sent to your email' },
        status: 2,
      },
    });
    expect(typeof obj).toBe('object');
    expect(obj.message).toBe('password rest link sent to your email');
  });
  it('Should return an object when password reseted successful ', () => {
    const obj = applyPasswordReducer(initialStateps, {
      type: PATCH_RESET,
      payload: { data: { message: 'password reseted successful' }, status: 2 },
    });
    expect(typeof obj).toBe('object');
    expect(obj.message).toBe('password reseted successful');
  });
});
describe('Reducer test', () => {
  const initialState1 = {
    articles: [],
    currentArticle: {},
  };
  const initialState2 = {
    loading: false,
  };
  const initialState3 = {
    authorprofile: {},
  };
  it('Should return an object  articles received successful', () => {
    const articles = getArticleReducer(initialState1, {
      type: GET_ARTICLES,
      payload: article,
    });
    expect(typeof articles).toBe('object');
    expect(articles.articles.length).toBe(4);
  });
  it('Should return an object when  article received successful', () => {
    const articles = getArticleReducer(initialState1, {
      type: CREATE_ARTICLE,
      payload: article[0],
    });
    expect(typeof articles).toBe('object');
    expect(articles.currentArticle.id).toBe(16);
  });
  it('Should return an object when article received successful', () => {
    const articles = getArticleReducer(initialState1, {
      type: GET_ONE_ARTICLES,
      payload: article[0],
    });
    expect(typeof articles).toBe('object');
    expect(articles.article.id).toBe(16);
  });
  it('Should return an object when is Loaded', () => {
    const ui = getUiReducer(initialState2, { type: IS_LOADED, payload: {} });
    expect(typeof ui).toBe('object');
  });
  it('Should return an object when is loading', () => {
    const ui = getUiReducer(initialState2, { type: IS_LOADING, payload: {} });
    expect(typeof ui).toBe('object');
  });
  it('Should return a state with userprofile', () => {
    const up = getauthorreducer(initialState3, {
      type: GET_USER_PROFILE,
      payload: {},
    });
    expect(typeof up).toBe('object');
  });
  const initialState4 = {
    loggedIn: false,
    message: null,
    error: null,
    loginRedirectPath: '/',
    isAuthenticated: false,
    isAdmin: false,
    isLogging: false,
    user: JSON.parse(localStorage.user || '{}'),
  };
  it('Should return an object when login return error', () => {
    const login = getLoginReducer(initialState4, {
      type: LOGIN_ERROR,
      payload: {},
    });
    expect(typeof login).toBe('object');
  });
  it('Should return an object when loading pending', () => {
    const login = getLoginReducer(initialState4, {
      type: LOGIN_PENDING,
      payload: {},
    });
    expect(typeof login).toBe('object');
  });
  it('Should return an object when login success', () => {
    const login = getLoginReducer(initialState4, {
      type: LOGIN_SUCCESS,
      payload: {},
    });
    expect(typeof login).toBe('object');
    expect(typeof resetProps()).toBe('object');
  });
  const initialState5 = {
    articles: [],
    currentArticle: {},
    errors: {},
  };
  it('Should return a state with message article delete successful', () => {
    const deleteArticle1 = getArticleReducer(initialState5, {
      type: DELETE_ARTICLE,
      payload: { message: 'article delete successful' },
    });
    expect(typeof deleteArticle1).toBe('object');
    expect(deleteArticle1.deletedArticle.message).toBe('article delete successful');
  });

  it('Should return a state with message article not found ', () => {
    const articleErrors = getArticleReducer(initialState5, {
      type: ARTICLE_ERRORS,
      payload: { message: 'article not found' },
    });
    expect(typeof articleErrors).toBe('object');
    expect(articleErrors.error.message).toBe('article not found');
  });
});
