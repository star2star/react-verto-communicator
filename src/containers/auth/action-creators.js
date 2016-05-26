import VertoService from '../../js/vertoService';

const doSubmitLogin = (data) => {
  return dispatch => {
    // dispatching so we change from not authorized to pending
    dispatch(doLogin(data));
    // Thunk here
    VertoService.getInstance();
    dispatch(doVertoLogin(data)); // this sent the WS request
  };
};

const doVertoLogin = (data) => {
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

export { doSubmitLogin, doGetLoginSettings };
