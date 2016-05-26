const auth = (state, action)=>{

  if (typeof state === 'undefined') {
    //TODO ta Figure out what the default store will look like... it won't
    // be a direct copy of the 'local storage' that Verto originally used...
    // This is just here to get the 'store' started up
    return  { loginSettings :{
                name: '',
                email: '',
                user: 1008,
                password: '1234',
                callerId: '',
                hostname: 'localhost',
                wsURL: 'wss://locahost:8082'
              },
              sessionActive: false,
              sessionInfo: {
              }
            };
  }

  //TODO ta handle actions type changes to state...

  switch (action.type) {
    case 'AUTH_SUBMIT_LOGIN':
      return {
                ...state
      };
    case 'VERTO_LOGIN':
      return {
                ...state
      };
    default:
     return state;
    }
};

export { auth };
