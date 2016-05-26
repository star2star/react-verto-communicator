import { combineReducers } from 'redux';
import { app } from './appbar/reducers.js';
import { auth } from './auth/reducers.js';

export default combineReducers({
  app,
  auth
  });
