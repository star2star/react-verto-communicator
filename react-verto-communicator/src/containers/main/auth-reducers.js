const auth = (state, action)=>{

  if (typeof state === 'undefined') {

    let lsLoginSettings;

    if (localStorage){
      lsLoginSettings = JSON.parse(localStorage.getItem('loginSettings'));
    }
    return  { loginSettings :{
                name: 'James',
                email: 'James@james.com',
                user: '1010',
                password: 'Starvert0',
                callerid: 'James',
                hostname: 'www.star2starglobal.com',
                websocketurl: 'wss://www.star2starglobal.com:8082',
                ...lsLoginSettings
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
        return { ...state, showPage: 'logout', vcStatus: 'disconnected' };
    case 'AUTH_SUBMIT_LOGIN':
      if (localStorage) {
        //save it
        localStorage.setItem('loginSettings', JSON.stringify(action.data))
      }
      return { ...state, showPage: 'logout', vcStatus: 'connecting', loginSettings: action.data };
    case "LOGIN_FAILED":
      return { ...state, showPage: 'logout', vcStatus: 'disconnected' };
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
      if (action.data.status === 'trying') {
          return { ...state, showPage: 'dialing' };
      } else {
        return { ...state, showPage: 'call_inprogress' };
      }

    case 'CALLING_ERROR':
      return { ...state, showPage: 'loggedIn', error: action.data };
    case 'CALL_HUNG_UP':
      return { ...state, showPage: 'loggedIn' };
    default:
     return state;
    }
};

export { auth };
