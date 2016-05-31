import { combineReducers } from 'redux';
import { app } from './appbar/reducers.js';
import { auth } from './main/reducers.js';

export default combineReducers({
  app,
  auth
  });
