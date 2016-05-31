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
      return { ...state, showPage: 'call_inprogress', destination: action.data };
    case 'CALLING_ERROR':
      return { ...state, showPage: 'loggedIn', error: action.data };
    default:
     return state;
    }
};

export { auth };
