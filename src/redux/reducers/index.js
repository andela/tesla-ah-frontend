// Root reducer file
import { combineReducers } from 'redux';

import uiReducer from './ui.reducer';
import articleReducer from './articles.reducer';

export default combineReducers({
  ui: uiReducer,
  article: articleReducer,
});
