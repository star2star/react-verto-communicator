const auth = (state, action)=>{

  if (typeof state === 'undefined') {
    //TODO ta Figure out what the default store will look like... it won't
    // be a direct copy of the 'local storage' that Verto originally used...
    // This is just here to get the 'store' started up
    return  { loginSettings :{
                name: 'James',
                email: 'James@james.com',
                user: 1008,
                password: '1234',
                callerid: 'James',
                hostname: 'verto.star2starglobal.com',
                websocketurl: 'wss://verto.star2starglobal.com:8082'
              },
              sessionActive: false,
              sessionInfo: {
              },
              showLogin: true,
              vcStatus: 'disconnected'
            };
  }

  //TODO ta handle actions type changes to state...

  switch (action.type) {
    case 'VALIDATION':
      return { ...state, showPage: 'splash', splash: action.data };
    case "SHOW_LOGIN":
      return { ...state, showPage: 'login', vcStatus: 'disconnected' };
    case "LOGOUT":
        return { ...state, showPage: 'logout', vcStatus: 'disconnected' }
    case 'AUTH_SUBMIT_LOGIN':
      return { ...state, showPage: 'logout', vcStatus: 'connecting'};
    case 'VERTO_LOGIN':
      return { ...state, showPage: 'loggedIn', sessionInfo: action.data, vcStatus: 'connecting' };
    case 'NO_MEDIA':
      return { ...state, showPage: 'noMedia', vcStatus: 'disconnected' };
    case 'BNS':
      return { ...state, showPage: 'bns', vcStatus: 'disconnected' };
    case 'RESOLUTION_REFRESH':
      return { ...state, showPage: 'resolution_refresh'  };
    case 'RESOLUTION_FAILED':
      return { ...state, showPage: 'resolution_failed'  };
    case 'CALLING':

      const cg= { ...state, showPage: 'call_inprogress', callInfo: action.data };
      //console.log('ccccccc: ', action.data, cg);
      if (cg.incomingCall && cg.incomingCall.callID == action.data.callId){
        // delete
        delete cg.incomingCall;
      }

      return cg;
    case 'CALLING_ERROR':
      const oReturn =  { ...state, showPage: 'loggedIn', error: action.data };
      // remove destination
      delete oReturn.destination;
      return oReturn;
    case "INCOMING_CALL":
      return { ...state, incomingCall: action.data };
    case 'CALL_HUNG_UP':
      if (state.callInfo){
        // check to see if it is the current call
        if (state.callInfo.callId == action.data.callID) {
          // yes it is so
          const chu =  { ...state, showPage: 'loggedIn', lastCall: action.data.destination };
          // remove destination
          delete chu.callInfo;
          return chu;
        }
      }

      if (state.incomingCall) {
        // check incoming
        if (state.incomingCall.callID == action.data.callID) {
          // yes it is so
          const ic =  { ...state };
          // remove destination
          delete ic.incomingCall;
          return ic;
        }
      }

      console.log('aaaaaaahhhhhh bbbbaaadddd', action.data);
      return state;


    default:
     return state;
    }
};

export { auth };
