const auth = (state, action)=>{

  if (typeof state === 'undefined') {
    //TODO ta Figure out what the default store will look like... it won't
    // be a direct copy of the 'local storage' that Verto originally used...
    // This is just here to get the 'store' started up
    return  { loginSettings :{
                foo: 'bar'
              }
            };
  }

  //TODO ta handle actions type changes to state...
  
  // switch (action.type) {
  //   case 'TOGGLE_USER_MENU':
  //     return {
  //               ...state,
  //               visibleList: !state.visibleList
  //     };
  //   }
};

export { auth };
