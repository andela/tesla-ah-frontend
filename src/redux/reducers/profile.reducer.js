import {
  PROFILE_INIT_FAIL,
  GET_CURRENT_USER_SUCCESS,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  SET_PROFILE_UPDATABLE,
  GET_PROFILE,
  GET_PROFILE_FAIL,
  GET_ARTICLE,
  GET_ARTICLE_FAIL,
} from '../actions/types/profile.type';
import updateObject from '../../utils/updateObject';

const initialState = {
  user: null,
  followers: [],
  followersCount: 0,
  following: [],
  followingCount: 0,
  articles: null,
  articlesCount: 0,
  isLoading: false,
  error: false,
  errorMessage: null,
  currentUser: null,
  completed: false,
  updating: false,
  hasArticles: false,
};

const profileInitFail = (state, { error }) => updateObject(state, {
  error: true,
  message: error,
});

const getProfile = (state, { profile }) => updateObject(state, { user: profile });

const getProfileFail = (state, { error }) => updateObject(state, { error: true, errorMessage: `${error}` });

const getArticle = (state, { articles }) => updateObject(state, {
  articles,
  articlesCount: articles.length,
  hasArticles: true,
});

const getArticleFail = (state, { error }) => updateObject(state, { error: true, errorMessage: `${error}` });

const setCurrentUser = (state, { currentUser }) => updateObject(state, {
  currentUser,
  completed: true,
});

const updateProfileStart = state => updateObject(state, { isDoneUpdating: false, updating: true });

const updateProfileFail = state => updateObject(state, { isDoneUpdating: true, updating: false });

const updateProfileSuccess = (state, { user: updatedProfile }) => {
  const user = updateObject(state.user, updatedProfile);
  return updateObject(state, {
    user,
    currentUser: user,
    isDoneUpdating: true,
    updating: false,
  });
};

const setProfileUpdatable = state => updateObject(state, {
  isDoneUpdating: false,
  updating: false,
});

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_INIT_FAIL:
      return profileInitFail(state, payload);
    case GET_CURRENT_USER_SUCCESS:
      return setCurrentUser(state, payload);
    case UPDATE_PROFILE_START:
      return updateProfileStart(state);
    case UPDATE_PROFILE_FAIL:
      return updateProfileFail(state);
    case UPDATE_PROFILE_SUCCESS:
      return updateProfileSuccess(state, payload);
    case SET_PROFILE_UPDATABLE:
      return setProfileUpdatable(state);
    case GET_PROFILE:
      return getProfile(state, payload);
    case GET_PROFILE_FAIL:
      return getProfileFail(state, payload);
    case GET_ARTICLE:
      return getArticle(state, payload);
    case GET_ARTICLE_FAIL:
      return getArticleFail(state, payload);
    default:
      return state;
  }
};

export default reducer;
