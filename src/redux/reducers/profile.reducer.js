import {
  PROFILE_INIT_START,
  PROFILE_INIT_SUCCESS,
  PROFILE_INIT_FAIL,
  GET_CURRENT_USER_SUCCESS,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  SET_PROFILE_UPDATABLE,
} from '../actions/types/profile.type';
import updateObject from '../../utils/updateObject';

const initialState = {
  user: null,
  followers: null,
  followersCount: 0,
  following: null,
  followingCount: 0,
  articles: null,
  articlesCount: 0,
  isLoading: false,
  error: false,
  errorMessage: null,
  currentUser: null,
  completed: false,
};

const profileInitStart = state => updateObject(state, { isLoading: true });

const profileInitSuccess = (
  state,
  {
    user, followers, following, articles,
  },
) => {
  const profile = {
    user,
    followers,
    following,
    articles,
    followersCount: followers.length,
    followingCount: following.length,
    articlesCount: articles.length,
    isLoading: false,
    error: false,
  };
  return updateObject(state, profile);
};

const profileInitFail = (state, { error }) => updateObject(state, { error: true, message: error });

const setCurrentUser = (state, { currentUser }) => updateObject(
  state, { currentUser, completed: true },
);

const updateProfileStart = state => updateObject(state, { isDoneUpdating: false });

const updateProfileFail = state => updateObject(state, { isDoneUpdating: true });

const updateProfileSuccess = (state, { user: updatedProfile }) => {
  const user = updateObject(state.user, updatedProfile);
  return updateObject(state, { user, isDoneUpdating: true });
};

const setProfileUpdatable = state => updateObject(state, { isDoneUpdating: false });

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_INIT_START:
      return profileInitStart(state);
    case PROFILE_INIT_SUCCESS:
      return profileInitSuccess(state, payload);
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
    default:
      return state;
  }
};

export default reducer;
