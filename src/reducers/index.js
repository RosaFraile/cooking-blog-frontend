/*
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  state: (state = {}) => state
});

export default rootReducer;
*/
import { combineReducers } from 'redux';

import user from './authReducer';

const rootReducer = combineReducers({
  user
});

export default rootReducer;