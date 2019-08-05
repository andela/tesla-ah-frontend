/* eslint-disable no-undef */
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers';

const { NODE_ENV } = process.env;
const middleware = [thunk];
const initialState = {};

export const findByTestAtrr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

export const testStore = (initialStates) => {
  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
  return createStoreWithMiddleware(rootReducer, initialStates);
};

const enableDevTools = NODE_ENV === 'development'
  ? composeWithDevTools(applyMiddleware(...middleware))
  : applyMiddleware(...middleware);

const store = createStore(rootReducer, initialState, enableDevTools);

export default store;
