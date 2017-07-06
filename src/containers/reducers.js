import { combineReducers } from 'redux';
import { reducer as tooltip } from 'redux-tooltip';
import { app } from './appbar/reducers';
import { auth } from './main/auth-reducers';
import { callInfo } from './main/callInfo-reducer';


export default combineReducers({
  app,
  auth,
  callInfo,
  tooltip,
});
