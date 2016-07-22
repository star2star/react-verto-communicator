import VideoConstants from '../../js/VideoConstants';
import ContributorService from '../../js/contributorService';

const app = (state, action)=>{

  if (typeof state === 'undefined') {
    let lsSettings;

    if (localStorage){
      lsSettings = JSON.parse(localStorage.getItem('settings'));
      //console.log('sssss: ', lsSettings);
    }
    return  { settings :{
                selectedVideo: null,
                selectedAudio: null,
                selectedShare: null,
                selectedSpeaker: null,
                selectedBestFrameRate: {id: "15", label: "15 FPS"},
                useStereo: true,
                useVideo: true,
                useSTUN: true,

                mirrorInput: false, // scale video
                askRecoverCall: false, // ask before recovering
                language: {id: 'en', label: 'English'},
                languages: [
                     {id: 'en', label: 'English'},
                     {id: 'it', label: 'Italiano'},
                     {id: 'fr', label: 'Français'},
                     {id: 'de', label: 'Deutsch'},
                     {id: 'pt', label: 'Português'},
                     {id: 'pl', label: 'Polski'},
                     {id: 'zh', label: '中國'},
                     {id: 'ru', label: 'Pусский'},
                     {id: 'sv', label: 'Svenska'},
                     {id: 'da', label: 'Dansk'},
                     {id: 'es', label: 'Español'},
                     {id: 'id', label: 'Indonesia'}
                ],
                googEchoCancellation: true,
                googNoiseSuppression: true,
                googHighpassFilter: true,
                useDedenc: false, // use dedicated encoder
                autoBand: true,
                testSpeedJoin: true,
                vidQual: undefined,
                outgoingBandwidth: 'default',
                incomingBandwidth: 'default',
                bandwidth: VideoConstants.BAND_WIDTH,
                bestFrameRate: VideoConstants.FRAME_RATE,
                isRefreshing: false,
                ...lsSettings
              },
              contributors: ContributorService.getInstance().getContributors(),
              bandwidthInfo: {
                outgoingBandwidth: undefined,
                incomingBandwidth: undefined,
                vidQual: undefined //TODO ta - is this the same value as the 'settings' vidQual?  if so it can be removed
              }
            };
  }

  switch (action.type) {
    case 'RESOLUTION_REFRESH':
      return { ...state, settings: { ...state.settings, isRefreshing: true } };
    case 'SPEED_TEST':
      //video quality only is available after login which is speed test time
      return { ...state, 'bandwidthInfo': action.data, settings: { ...state.settings, vidQual: action.data.vidQual, videoQuality: action.videoQuality } };
    case 'SETTINGS_UPDATE':
      //console.log("settings update JES: ", action.data);
      //set isRefreshing to false
      const lSettings1 = { ...state.settings, ...action.data, bandwidth: VideoConstants.BAND_WIDTH, isRefreshing: false};
      if (localStorage) {
        //save it
        localStorage.setItem('settings', JSON.stringify(lSettings1));
      }
      return { ...state, settings: lSettings1 };
    case 'APP_UPDATE_SINGLE_SETTING':
      // update a single setting

      //console.log('******* ***** change setting action.data', action.data);
      const lSettings = {...state.settings, ...action.data };
      if (localStorage) {
        //save it
        localStorage.setItem('settings', JSON.stringify(lSettings));
      }
      return {...state, settings: lSettings };

    default:
      return state;
    }
};

export { app };
