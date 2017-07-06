import VertoService from '../../js/vertoService';
import { browserHistory } from 'react-router';

// validation steps include
const doValidation = (step = 1) => (dispatch) => {
  switch (step) {
    case 1:
      browserHistory.push('/app/splash/browser'); // this is working
        // console.log('CHECKING BROWSER');
      dispatch(doingValidation(step, 'browser', 4));
      return dispatch(doBrowserCheck());
    case 2:
      browserHistory.push('/app/splash/media'); // this is working
        // console.log('CHECKING MEDIA');
      dispatch(doingValidation(step, 'media', 4));
      return dispatch(doMediaCheck());
    case 3:
      browserHistory.push('/app/splash/resolution'); // this is working
        // console.log('RESOLUTION');
      dispatch(doingValidation(step, 'resolution', 4));
      return dispatch(doResolutionRefresh());
    case 4:
      browserHistory.push('/app/splash/login'); // this is working
        // console.log('LOGIN');
      dispatch(doingValidation(step, 'login', 4));
      return dispatch(doShowLogin());
  }
};

const doingValidation = (step, title, number, errorObject) => ({
  type: 'VALIDATION',
  data: {
    current: step,
    title,
    number,
    errorObject,
  },
});

// browser
const doBrowserCheck = () => (dispatch) => {
  navigator.getUserMedia =
      navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    // console.log('CHECKING FOR SUPPORTED BROWSER');
  if (!navigator.getUserMedia) {
    browserHistory.push('/app/splash/bns'); // this is working
    dispatch({
      type: 'BNS',
    });
  } else {
    dispatch(doValidation(2));
  }
};

// media permissions
const doMediaCheck = () => (dispatch) => {
  VertoService.mediaPerm((status) => {
      // permissions
      // console.log('^^^^^', status);
      // console.log('CHECKING FOR MEDIA');
    if (!status) {
      browserHistory.push('/app/splash/noMedia'); // this is working
      dispatch({
        type: 'NO_MEDIA',
      });
    } else {
      dispatch(doValidation(3));
    }
  });
};

// resolution
const doResolutionRefresh = (skipValidation = false, refresh) => {
  // console.log(this..app.settings.isRefreshing);
  if (!refresh) {
    return (dispatch) => {
      dispatch(doingResolutionRefresh());
      VertoService.refreshDevices((status) => {
        // console.log('doRefresh Resolution: ', status);
        if (status) {
          const resolutionInstanceData = VertoService.getInstanceData();
          // console.log('------^^^^^^______', resolutionInstanceData);
          dispatch(doUpdateSettings(resolutionInstanceData));
          if (!skipValidation) {
            dispatch(doValidation(4));
          }
        } else {
          browserHistory.push('/app/splash/resolution_failed'); // this is working
          dispatch({
            type: 'RESOLUTION_FAILED',
          });
        }
      });
    };
  }
};

const doSpeedTest = () => (dispatch) => {
  dispatch(doingSpeedTest());
  VertoService.speedTest((data) => {
      // console.log('doing speed test : ', data);
      // TODO
    dispatch(doSpeedTestResults(data));
  });
};

const doSpeedTestResults = (data) => {
  const bw = {};
  bw.outgoingBandwidth = data.upKPS ? data.upKPS : undefined;
  bw.incomingBandwidth = data.downKPS ? data.downKPS : undefined;
  bw.vidQual = data.vidQual ? data.vidQual.label : undefined;
  // console.log('BBBSSSWWWW:', bw);
  return {
    type: 'SPEED_TEST',
    data: bw,
    videoQuality: VertoService.getInstanceData().videoQuality,
  };
};

const doingSpeedTest = () => ({
  type: 'SPEED_TEST_INPROGRESS',
});

const doingResolutionRefresh = () =>
  // rendering login through navigation
   (dispatch) => {
     browserHistory.push('/app/resolutionRefresh');
     dispatch({
       type: 'RESOLUTION_REFRESH',
     });
   };

const doingDeviceRefresh = () =>
  // rendering login through navigation
   ({
     type: 'DEVICE_REFRESH',
   });
// LOGIN
const doShowLogin = () => (dispatch, getState) => {
  try {
    const state = getState();
    if (state.auth.loginSettings.autologin) {
      dispatch(doSubmitLogin(state.auth.loginSettings));
    } else {
      browserHistory.push('/app/login');
      dispatch({
        type: 'SHOW_LOGIN',
      });
    }
  } catch (e) {
    console.log('eeee', e);
  }
    // dispatch(doingSpeedTest());
    // VertoService.speedTest((data)=>{
    //   //console.log('doing speed test : ', data);
    //   //TODO
    //   dispatch(doSpeedTestResults(data))
    // });
};
// called by click
const doSubmitLogin = data => (dispatch) => {
    // fix callerid here
    // console.log('>>>>>>>>', data);
  if (!data.callerid || data.callerid.length == 0) {
    data.callerid = data.user;
  }
    // dispatching so we change from not authorized to pending
  dispatch(doingLogin(data));
  browserHistory.push('/app/loggedIn'); // this seems to be working
    // Thunk here
  VertoService.getInstance().login(data);
    // dispatch(doVertoLogin(data)); // this sent the WS request
};
// verto login callback
const doVertoLogin = (success, data) => (dispatch) => {
    // console.log('verto ....', data);
  if (success) {
    browserHistory.push('/app/loggedIn');
    dispatch(doVertoLoginValid(data));
    dispatch(doSpeedTest());
  } else {
    browserHistory.push('/app/login');
    dispatch({
      type: 'LOGIN_FAILED',
    });
  }
};

const doVertoLoginValid = data => ({
  type: 'VERTO_LOGIN',
  data,
});

const doingLogin = data => ({
  type: 'AUTH_SUBMIT_LOGIN',
  data,
});

// logOUT
// called from verto
const doLogOut = () => (dispatch) => {
  browserHistory.push('/app/login'); // this is working

  dispatch({
    type: 'LOGOUT',
  });
};
// called by client actions
const doSubmitLogOut = () => (dispatch) => {
  VertoService.getInstance().logout();
    // dispatching so we change from not authorized to pending
    // Thunk here
};

// making a phone call
const doIncomingCall = dialog => (dispatch) => {
  console.log('incoming call: ');
  console.dir(dialog.callID);
    // dispatch(doAnswer(dialog.callID));

  dispatch({
    type: 'INCOMING_CALL',
    data: dialog,
  });
};

const doMakeCall = (aPhoneNumber, appSettings) => (dispatch) => {
    // console.log('>>>> appSetttings: ', appSettings)
  if (appSettings.settings.testSpeedJoin) {
      // dispatches event so we can change screen layout
      /*
      browserHistory.push('/app/speedTest');
      dispatch({
        "type": "SPEED_TEST_BEFORE_CALL"
      });
      */
      // DOOING SPEED TEST
    VertoService.speedTest((data) => {
        // complete ... dont do anything with data so we will ...
        // NOW MAKE CALL
      const callID = VertoService.getInstance().makeCall(aPhoneNumber, appSettings);
      dispatch(doingMakeCall('trying', aPhoneNumber, callID));
    });
  } else {
    const callID = VertoService.getInstance().makeCall(aPhoneNumber, appSettings);
    dispatch(doingMakeCall('trying', aPhoneNumber, callID));
  }
};

const doShareScreen = appSettings => (dispatch) => {
  VertoService.getInstance().shareScreen(appSettings);
  dispatch({
    type: 'ATTEMPTING_SHARING_SCREEN',
  });
};

const doHangUp = callId => (dispatch) => {
  browserHistory.push('/app/loggedIn'); // this is working
  VertoService.getInstance().hangup(callId);
};

const doHold = callId => (dispatch) => {
  VertoService.getInstance().hold(callId);
};

const doMuteMic = callId => (dispatch) => {
  VertoService.getInstance().muteMic(callId);
};

const doMuteVideo = callId => (dispatch) => {
  VertoService.getInstance().muteVideo(callId);
};

const doSendConfCommand = (cmd, params) => (dispatch) => {
  VertoService.getInstance().sendConferenceCommand(cmd, params);
};

const doConferenceData = confData => ({
  type: 'CONFERENCE_DATA',
  data: confData,
});

const doAnswer = (callId, appSettings) => (dispatch) => {
  VertoService.getInstance().answer(callId, appSettings.useVideo);
};

const doHungUp = dialog => (dispatch) => {
  browserHistory.push('/app/loggedIn'); // this is working
  dispatch({
    type: 'CALL_HUNG_UP',
    data: dialog,
  });
};

const doMakeCallError = aErrorObject => (dispatch) => {
  browserHistory.push('/app/loggedIn'); // this is working
  dispatch({
    type: 'CALLING_ERROR',
    data: aErrorObject,
  });
};

const doingMakeCall = (status, dest, callId, direction) =>
  // console.log('doingMakeCall', dialog);
   (dispatch) => {
     if (status === 'trying') {
       browserHistory.push('/app/dialing'); // this is working
     } else {
       browserHistory.push('/app/callInProgress'); // this is working
     }
     dispatch({
       type: 'CALLING',
       data: { status, destination: dest, callId, direction },
     });
   };

const doCallHeld = callID => ({
  type: 'CALL_HELD',
  data: callID,
});

const doUpdateSettings = aData => ({
  type: 'SETTINGS_UPDATE',
  data: aData,
});

const doSendChat = message => (dispatch) => {
  VertoService.getInstance().sendConferenceChat(message);
  dispatch(doingSendingChat());
};

const doReceiveChat = messageObject => (dispatch) => {
    // console.log('received a chat msssgggg: ', callID, from, message);
  dispatch({
    type: 'RECEIVED_CHAT_MESSAGE',
    data: messageObject,
  });
};

const doingSendingChat = () => ({
  type: 'SENDING_CHAT_MESSAGE',
});

const doClearHistory = () => (dispatch) => {
  dispatch({
    type: 'CLEARING_HISTORY',
  });
};

export {
  doValidation,
  doBrowserCheck,
  doResolutionRefresh,
  doSubmitLogin,
  doShowLogin,
  doVertoLogin,
  doSubmitLogOut,
  doLogOut,
  doMakeCall,
  doMakeCallError,
  doIncomingCall,
  doSpeedTest,
  doShareScreen,
  doingMakeCall,
  doHungUp,
  doHangUp,
  doAnswer,
  doMuteMic,
  doConferenceData,
  doHold,
  doMuteVideo,
  doCallHeld,
  doSendChat,
  doReceiveChat,
  doingSendingChat,
  doSendConfCommand,
  doClearHistory,
};
// reviewed on
