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
    VertoService.mediaPerm((status)=>{ //permissions
        console.log('^^^^^', status);
        if (!status) {
          dispatch(doNoMedia());
        } else {
          dispatch(doResolutionRefresh());
        }

    });
  }
};

const doResolutionRefresh = () => {
  return dispatch => {
    dispatch(doingResolutionRefresh());
    VertoService.refreshDevices((status) => {
      console.log('doRefresh Resolution: ', status);
      if (status){
        dispatch(doShowLogin());
      } else {
        dispatch(doResolutionFailed());
      }

    });
  }
};

const doSpeedTest = () => {
  return dispatch => {
    dispatch(doingSpeedTest());
    VertoService.speedTest((data)=>{
      console.log('doing speed test : ', data);
      //TODO
      dispatch(doSpeedTestResults(data))
    });
  }
};

const doSpeedTestResults = (data) => {
  const bw = {};
  bw.outgoingBandwidth = data.upKPS ?data.upKPS: undefined ;
  bw.incomingBandwidth = data.downKPS? data.downKPS: undefined;
  bw.vidQual = undefined;

  return {
    "type": "SPEED_TEST",
    "data": bw
  }
};

const doingSpeedTest = () => {
  return {
    "type": "SPEED_TEST_INPROGRESS"
  }
};

const doingResolutionRefresh = () => {
  // rendering login through navigation
  return {
    "type": "RESOLUTION_REFRESH"
  }
};

const doResolutionFailed = () => {
  // rendering login through navigation
  return {
    "type": "RESOLUTION_FAILED"
  }
};

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
  return dispatch => {
    console.log('verto ....', data);
    dispatch(doVertoLoginValid(data));
    dispatch(doSpeedTest());

  }

}

const doVertoLoginValid = (data) => {
  console.log('****', data);
  return {
    "type": "VERTO_LOGIN",
    "data": data
  };
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
