// Root reducer file
import { combineReducers } from 'redux';

import uiReducer from './ui.reducer';
import articleReducer from './articles.reducer';
import authReducer from './auth.reducer';
import profileReducer from './profile.reducer';

export default combineReducers({
  ui: uiReducer,
  article: articleReducer,
  auth: authReducer,
  profile: profileReducer,
});
