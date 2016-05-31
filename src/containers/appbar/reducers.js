const app = (state, action)=>{

  if (typeof state === 'undefined') {
    //TODO ta Figure out what the default store will look like... it won't
    // be a direct copy of the 'local storage' that Verto originally used...
    // This is just here to get the 'store' started up
    return  { settings :{
                selectedVideo: null,
                selectedAudio: null,
                selectedShare: null,
                selectedSpeaker: null,
                bestFrameRate: "15",
                useStereo: true,
                useSTUN: true,

                mirrorInput: false, // scale video
                askRecoverCall: false, // ask before recovering
                language: undefined,
                googEchoCancellation: true,
                googNoiseSuppression: true,
                googHighpassFilter: true,
                useDedenc: false, // use dedicated encoder
                autoBand: true,
                testSpeedJoin: true,
                vidQual: undefined,
                outgoingBandwidth: 'default',
                incomingBandwidth: 'default'
              },

              bandwidthInfo: {
                outgoingBandwidth: undefined,
                incomingBandwidth: undefined,
                vidQual: undefined //TODO ta - is this the same value as the 'settings' vidQual?  if so it can be removed
              }
            };
  }

  switch (action.type) {
    case "SPEED_TEST":
      return { ...state, "bandwidthInfo": action.data }
    case "SETTINGS_UPDATE":
      console.log("settings update JES: ", action.data);
      return { ...state, settings: { ...state.settings, ...action.data} };
    default:
      return state;
    }
};

export { app };
