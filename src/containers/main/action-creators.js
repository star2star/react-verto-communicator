import VertoService from '../../js/vertoService';

// validation steps include
const doValidation = (step=1) => {
  return dispatch => {
    switch (step) {
      case 1:
        dispatch(doingValidation(step, 'browser', 4));
        return dispatch(doBrowserCheck());
      case 2:
        dispatch(doingValidation(step, 'media', 4));
        return dispatch(doMediaCheck());
      case 3:
        dispatch(doingValidation(step, 'resolution', 4));
        return dispatch(doResolutionRefresh());
      case 4:
        dispatch(doingValidation(step, 'login', 4));
        return dispatch(doShowLogin());
    }

  }
}

const doingValidation = (step, title, number, errorObject) => {
  return {
    type: "VALIDATION",
    data: {
      current: step,
      title: title,
      number: number,
      errorObject
    }
  }
}

// browser
const doBrowserCheck = () => {
  return dispatch => {
    navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    if (!navigator.getUserMedia) {
      dispatch({
        type: "BNS"
      });
    } else {
      dispatch(doValidation(2));
    }

  }
}

// media permissions
const doMediaCheck = () => {
  return dispatch => {
    VertoService.mediaPerm((status)=>{ //permissions
        //console.log('^^^^^', status);
        if (!status) {
          dispatch({
            type: "NO_MEDIA"
          });
        } else {
          dispatch(doValidation(3));
        }

    });
  }
};

// resolution
const doResolutionRefresh = () => {
  return dispatch => {
    dispatch(doingResolutionRefresh());
    VertoService.refreshDevices((status) => {
      //console.log('doRefresh Resolution: ', status);
      if (status){
        const resolutionInstanceData = VertoService.getInstanceData();
        //console.log('------^^^^^^______', resolutionInstanceData);
        dispatch(doUpdateSettings(resolutionInstanceData));
        dispatch(doValidation(4));
      } else {
        dispatch({
          "type": "RESOLUTION_FAILED"
        });
      }

    });
  }
};

const doSpeedTest = () => {
  return dispatch => {
    dispatch(doingSpeedTest());
    VertoService.speedTest((data)=>{
      //console.log('doing speed test : ', data);
      //TODO
      dispatch(doSpeedTestResults(data))
    });
  }
};

const doSpeedTestResults = (data) => {
  const bw = {};
  bw.outgoingBandwidth = data.upKPS ? data.upKPS : undefined ;
  bw.incomingBandwidth = data.downKPS ? data.downKPS : undefined;
  bw.vidQual = data.vidQual ? data.vidQual.label : undefined;
  //console.log('BBBSSSWWWW:', bw);
  return {
    "type": "SPEED_TEST",
    "data": bw,
    'videoQuality': VertoService.getInstanceData().videoQuality
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
//LOGIN
const doShowLogin = () => {
  return {
    "type": "SHOW_LOGIN"
  }
};
// called by click
const doSubmitLogin = (data) => {
  return dispatch => {
    // dispatching so we change from not authorized to pending
    dispatch(doingLogin(data));
    // Thunk here
    VertoService.getInstance().login( data);
    //dispatch(doVertoLogin(data)); // this sent the WS request
  };
};
// verto login callback
const doVertoLogin = (success, data) => {
  return dispatch => {
    //console.log('verto ....', data);
    if(success){
      dispatch(doVertoLoginValid(data));
      dispatch(doSpeedTest());
    } else {
      dispath({
        type: "LOGIN_FAILED"
      });
    }


  }
}
const doVertoLoginValid = (data) => {
  return {
    "type": "VERTO_LOGIN",
    "data": data
  };
}
const doingLogin = (data) => {
  return {
    type: "AUTH_SUBMIT_LOGIN",
    data: data
  }
}

// logOUT
// called from verto
const doLogOut = () => {
  return {
    "type": "LOGOUT"
  }
};
// called by client actions
const doSubmitLogOut = () =>{
  return dispatch => {
  VertoService.getInstance().logout();
    // dispatching so we change from not authorized to pending
    // Thunk here

  };
};

// making a phone call
const doIncomingCall = (dialog) =>{
  return dispatch => {
    //console.log('incoming call: ', dialog);

    dispatch({
      type: "INCOMING_CALL",
      data: dialog
    });
  }
}
const doMakeCall = (aPhoneNumber, appSettings) => {
  return dispatch => {

    const callID = VertoService.getInstance().makeCall(dispatch, aPhoneNumber, appSettings);
    dispatch(doingMakeCall('trying', aPhoneNumber, callID));
  };
};
const doShareScreen = (appSettings) => {
  return dispatch => {

    VertoService.getInstance().shareScreen(appSettings);
    dispatch({
      "type": "ATTEMPTING_SHARING_SCREEN"
    });
  };
};

const doHangUp = (callId) => {
  return dispatch =>{
    VertoService.getInstance().hangup(callId);
  }
}
const doHold = (callId) => {
  return dispatch =>{
    VertoService.getInstance().hold(callId);
  }
}
const doMuteMic = (callId) => {
  return dispatch =>{
    VertoService.getInstance().muteMic(callId);
  }
}

const doMuteVideo = (callId) => {
  return dispatch =>{
    VertoService.getInstance().muteVideo(callId);
  }
}

const doSendConfCommand = (cmd, params) => {
  return dispatch =>{
    VertoService.getInstance().sendConferenceCommand(cmd, params);
  }
}

const doConferenceData = (confData) =>{
  return {
    "type": "CONFERENCE_DATA",
    "data": confData
  }
}

const doAnswer = (callId) => {
  return dispatch =>{
    VertoService.getInstance().answer(callId);
  }
}
const doHungUp = (dialog) =>{
  return {
    "type": "CALL_HUNG_UP",
    "data": dialog
  }
};
const doMakeCallError = (aErrorObject) =>{
  return {
    "type": "CALLING_ERROR",
    "data": aErrorObject
  }
}
const doingMakeCall = (status, dest, callId, direction) => {
  //console.log('doingMakeCall', dialog);
  return {
    "type": "CALLING",
    "data": {status: status, destination: dest, callId: callId, direction: direction}
  }
};
const doCallHeld = (callID) =>{
  return {
    "type": "CALL_HELD",
    "data": callID
  }
};

const doUpdateSettings = (aData) => {
  return {
    "type": "SETTINGS_UPDATE",
    "data": aData
  }
}
const doSendChat = (message) => {
  return dispatch => {

    VertoService.getInstance().sendConferenceChat(message);
    dispatch(doingSendingChat());
  };
}

const doReceiveChat = (callID, messageObject) => {
  return dispatch =>{
    //console.log('received a chat msssgggg: ', callID, from, message);
    dispatch({
      type: 'RECEIVED_CHAT_MESSAGE',
      data: messageObject
    });
  }
}

const doingSendingChat = () => {
  return {
    type: 'SENDING_CHAT_MESSAGE'
  }
}

const doClearHistory = () => {
  return dispatch =>{
    dispatch({
      type: 'CLEARING_HISTORY'
    });
  };
};

export { doValidation, doBrowserCheck,
  doSubmitLogin, doShowLogin, doVertoLogin, doSubmitLogOut, doLogOut,
  doMakeCall, doMakeCallError, doIncomingCall, doSpeedTest, doShareScreen,
  doingMakeCall, doHungUp, doHangUp, doAnswer, doMuteMic, doConferenceData, doHold, doMuteVideo, doCallHeld,
  doSendChat, doReceiveChat, doingSendingChat,doSendConfCommand, doClearHistory };
