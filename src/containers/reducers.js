import { combineReducers } from 'redux';
import { app } from './appbar/reducers';
import { auth } from './main/auth-reducers';
import { callInfo } from './main/callInfo-reducer';

export default combineReducers({
  app,
  auth,
  callInfo

  });
