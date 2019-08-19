// Root reducer file
import { combineReducers } from 'redux';

import uiReducer from './ui.reducer';
import articleReducer from './articles.reducer';
import authReducer from './auth.reducer';
import loginReducer from './users/login.reducer';
import profileReducer from './authorprofile.reducer';
import resetPasswordReducer from './resetPassword.reducer';
import applyPasswordReducer from './applyPassword.reducer';

export default combineReducers({
  ui: uiReducer,
  article: articleReducer,
  auth: authReducer,
  login: loginReducer,
  author: profileReducer,
  resetPassword: resetPasswordReducer,
  applyPassword: applyPasswordReducer,
});
