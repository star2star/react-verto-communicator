const url = require('url');

const auth = (state, action)=>{

  if (typeof state === 'undefined') {

    let lsLoginSettings;

    if (localStorage){
      lsLoginSettings = JSON.parse(localStorage.getItem('loginSettings'));
    }
    const urlStuff = url.parse(location.href);
    const hostname = urlStuff.hostname === 'localhost' ? 'www.star2starglobal.com' : urlStuff.hostname;

    return  { loginSettings :{
                name: '',
                email: '',
                user: '1008',
                password: '1234',
                callerid: '',
                hostname: hostname,
                websocketurl: 'wss://' + hostname +':8082',
                autologin: false,
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
        action.data.autologin = true;
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
          return { ...state, showPage: 'dialing', vcStatus: 'connected' };
      } else {
        return { ...state, showPage: 'call_inprogress' };
      }

    case 'CALLING_ERROR':
      return { ...state, showPage: 'loggedIn', error: action.data, vcStatus: 'active' };
    case 'CALL_HUNG_UP':
      return { ...state, showPage: 'loggedIn', vcStatus: 'active' };
    case 'SPEED_TEST_BEFORE_CALL':
      return { ...state, showPage: 'speed-test' };
    default:
     return state;
    }
};

export { auth };
