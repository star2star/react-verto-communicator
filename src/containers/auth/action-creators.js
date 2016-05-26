import VertoService from '../../js/vertoService';
import { browserHistory } from 'react-router'


const doShowLogin = () => {
  // rendering login through navigation
  browserHistory.push('#/login');
  return {
    "type": "SHOW_LOGIN"
  }
};
const doLogOut = () => {
  return {
    "type": "LOGOUT"
  }
};

const doSubmitLogOut = () =>{
  return dispatch => {
    VertoService.logout(dispatch);
    // dispatching so we change from not authorized to pending
    // Thunk here

  };
};

const doSubmitLogin = (data) => {
  return dispatch => {
    // dispatching so we change from not authorized to pending
    dispatch(doLogin(data));
    // Thunk here
    VertoService.login(dispatch, data);
    //dispatch(doVertoLogin(data)); // this sent the WS request
  };
};

const doVertoLogin = (data) => {
  console.log('vvvvvv', data);
  return {
    "type": "VERTO_LOGIN",
    "data": data
  }
}

const doLogin = (data) => {
  return {
    type: "AUTH_SUBMIT_LOGIN",
    data: data
  }
}


const doGetLoginSettings = (data) => {
  return {
    type: 'AUTH_GET_SETTINGS',
    data: data
  };
};

export { doSubmitLogin, doGetLoginSettings, doShowLogin, doVertoLogin, doSubmitLogOut, doLogOut };
