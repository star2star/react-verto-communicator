import VertoService from '../../js/vertoService';

const doBrowserCheck = () => {
  return dispatch => {
    navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    if (!navigator.getUserMedia) {
      dispatch(doBNS());
    } else {
      dispatch(doBrowserValid());
      dispatch(doMediaCheck());
    }

  }
}
const doNoMedia = () => {
  return {
    type: "NO_MEDIA"
  }

}
const doBNS = () => {
  return {
    type: "BNS"
  }
}
const doMediaCheck = () => {
  return dispatch => {
    VertoService.mediaPerm((status)=>{
        console.log('^^^^^', status);
        if (!status) {
          dispatch(doNoMedia());
        } else {
          dispatch(doShowLogin());
        }

    });
  }
}

const doShowLogin = () => {
  // rendering login through navigation
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
const doBrowserValid = () => {
  return {
    "type": "BROWSER_VALID"
  }
}
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

export { doSubmitLogin, doGetLoginSettings, doShowLogin, doVertoLogin, doSubmitLogOut, doLogOut, doBrowserValid, doBrowserCheck };
