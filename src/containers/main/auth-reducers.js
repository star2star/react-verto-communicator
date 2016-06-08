const auth = (state, action)=>{

  if (typeof state === 'undefined') {
    return  { loginSettings :{
                name: 'James',
                email: 'James@james.com',
                user: '1010',
                password: 'Starvert0',
                callerid: 'James',
                hostname: 'verto.star2starglobal.com',
                websocketurl: 'wss://verto.star2starglobal.com:8082'
              },
              sessionInfo: {
              },
              vcStatus: 'disconnected'
            };
  }

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
      return { ...state, showPage: 'loggedIn', vcStatus: 'active', sessionInfo: action.data };
    case 'NO_MEDIA':
      return { ...state, showPage: 'noMedia', vcStatus: 'disconnected' };
    case 'BNS':
      return { ...state, showPage: 'bns', vcStatus: 'disconnected' };
    case 'RESOLUTION_REFRESH':
      return { ...state, showPage: 'resolution_refresh'  };
    case 'RESOLUTION_FAILED':
      return { ...state, showPage: 'resolution_failed'  };
    case 'CALLING':
      return { ...state, showPage: 'call_inprogress' };
    case 'CALLING_ERROR':
      return { ...state, showPage: 'loggedIn', error: action.data };
    case 'CALL_HUNG_UP':
      return { ...state, showPage: 'loggedIn' };
    default:
     return state;
    }
};

export { auth };
