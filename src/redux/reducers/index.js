import { combineReducers } from 'redux';
import uiReducer from './ui.reducer';
import articleReducer from './articles.reducer';
import authReducer from './auth.reducer';
import loginReducer from './users/login.reducer';
import resetPasswordReducer from './resetPassword.reducer';
import applyPasswordReducer from './applyPassword.reducer';
import author from './authorprofile.reducer';
import profileReducer from './profile.reducer';
import bookmarkedArticles from './bookmarks.reducer';

export default combineReducers({
  ui: uiReducer,
  article: articleReducer,
  auth: authReducer,
  login: loginReducer,
  resetPassword: resetPasswordReducer,
  applyPassword: applyPasswordReducer,
  author,
  profile: profileReducer,
  bookmarkedArticles,
});
