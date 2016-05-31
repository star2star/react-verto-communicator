import {doLogOut, doVertoLogin, doMakeCallError } from '../containers/main/action-creators';
import VideoConstants from './VideoConstants';
import md5 from 'md5';

// private stuff
let _callbacks;
let _dispatch;
let _verto;
let _data;
let _loginData;

//class
class VertoService {
  constructor(){
    _data = {};


    _callbacks = {
      onMessage: (verto, dialog, msg, data) => {
        //console.log("in onMessage", data);
          switch (msg) {
              case $.verto.enum.message.pvtEvent:
                  if (data.pvtData) {
                      switch (data.pvtData.action) {

                          case "conference-liveArray-part":
                              //clear conf
                              //clearConfMan();
                              break;
                          case "conference-liveArray-join":
                              //clearConfMan();
                              // start a new conf now
                              confMan = new $.verto.confMan(verto, {
                                  tableID: "#conf_list",
                                  statusID: "#conf_count",
                                  mainModID: "#conf_mod",
                                  displayID: "#conf_display",
                                  dialog: dialog,
                                  hasVid: s2sVerto.checkVideo(),
                                  laData: data.pvtData
                                  });

                              //$("#conf").show();
                              //clear old messages
                              //$("#chatwin").html("");
                              //$("#message").show();

                              chatting_with = data.pvtData.chatID;

                              break;
                      }
                  }
                  break;

              case $.verto.enum.message.info:
                  var body = data.body;

                  var from = data.from_msg_name || data.from;
                  // new messages
                  /*
                  $('#chatwin')
                      .append($('<span class="chatuid" />').text(from + ':'))
                      .append($('<br />'))
                      .append(messageTextToJQ(body))
                      .append($('<br />'));
                  $('#chatwin').animate({"scrollTop": $('#chatwin')[0].scrollHeight}, "fast");
                  */

                  break;

              case $.verto.enum.message.display:
                  //console.log("$.verto.enum.message.display", dialog.params.remote_caller_id_number);
                  var party = dialog.params.remote_caller_id_name + "<" + dialog.params.remote_caller_id_number + ">";
                  //console.log('onMessage display', party, arguments);
                  //tell them who they are talking to
                  //display("Talking to: " + dialog.cidString());
                  break;

              default:
                  //console.log('onMessage: default', arguments);
                  break;
          }
      }, //end onMessage

      onDialogState: (d)=> {
          //adding params since this is what is sent to processor

          d.params.direction = d.direction.name;
          if (d.audioStream.volume)
            d.params.volume =  d.audioStream.volume;
          d.params.event = d.state;
          d.params.caller_id_ext = parseInt(d.params.caller_id_number);
          d.params.remote_caller_id_ext = parseInt(d.params.remote_caller_id_number);

          switch (d.state) {
              case $.verto.enum.state.ringing:
                  // console.log('ringing ... onDialogState display', d, arguments);

                  _activeCalls[d.callID] = d;

                  //console.log('#### s2sVerto.activeCalls.length', s2sVerto.activeCalls.length);
                  //console.log('#### s2sVerto.maxActiveCalls', s2sVerto.maxActiveCalls);

                	if (Object.keys(_activeCalls).length > _maxActiveCalls) {
                		d.hangup();
                	} else {
                		d.params.direction = d.direction.name;
                    // TODO: update parames
                    d.params.caller_id_ext = parseInt(d.params.caller_id_number);

                		//TODO jes inbound call
                		//Processor.starphone('inboundCall', d.params);
                	}

                  break;

          case $.verto.enum.state.trying:
              //jes TODO tell it is ringing
              //display("Calling: " + d.cidString());
              //goto_page("incall");
              //console.log('trying .. calling', d);
              break;

          case $.verto.enum.state.early:
              //console.log('early:', d);
              break;

          case $.verto.enum.state.active:
              //jes TODO tell them we are now talking
              //display("Talking to: " + d.cidString());
              //goto_page("incall");
              //console.log('active ... answered:', d);
              d.params.isHeld = false;
              // ta- added to init isMuted attribute
              d.params.isMuted = false;
              //jes TODO fix for answer/transfer
              //console.log('active call s2sverto: ', d.immediateTransfer, d.immediateTransferURI);
              if (d.immediateTransfer && d.immediateTransferURI) {
              	//code

              	d.transfer(d.immediateTransferURI);
              	delete d.immediateTransfer;
              	delete d.immediateTransferURI;
              } else {
              	//TODO
                //Processor.starphone('answered', d.params);
              }

              break;

          case $.verto.enum.state.hangup:
              //jes TODO tell we are hanging up
              //$("#main_info").html("Call ended with cause: " + d.cause);
              //goto_page("main");
              //console.log('hangup event', d);
              if (_activeCalls[d.callID]) {
                  delete _activeCalls[d.callID];
              } else {
                  //console.log('hangup not found', d, s2sVerto.activeCalls);
              }
              break;

          case $.verto.enum.state.destroy:
              //jes TODO tell we are done now
              //$("#hangup_cause").html("");
              //clearConfMan();
              //jes TODO remove from activeCalls
              //console.log('destroy event', d);



              //TODO
              //Processor.starphone('destroy', d.params);
              break;

          case $.verto.enum.state.held:
              //jes TODO tell the UI we are on HOLD
              //console.log('HELD ....', d);
              d.params.isHeld = true;

              //TODO
              //Processor.starphone('held', d.params);
              break;

          case $.verto.enum.state.requesting:
              //console.log('REQUESTING ....', d);
              _activeCalls[d.callID] = d;
              //jes tom does not want it
              //TODO
              //Processor.starphone('requesting', d.params);
              break;

          default:
              //display("");
              //console.log('default state not handled:', d.state, d);
              break;
          }
      },

      onWSLogin: (v, success) => {
          //console.log('onWSLogin: ', v, success);
          //display("");

          if (success) {
            //console.log('-- SUCCESS ---', v.options, _dispatch);
              _dispatch(doVertoLogin(v.options));
              //TODO
              //Processor.starphone('userLoggedIn', {status: 'loggedin', type: 'ext-change', extensionId: s2sVerto.currentExtensionId, callerId: s2sVerto.callerId, callerName: s2sVerto.callerName, locationId: s2sVerto.locationId });
              //_loggedIn = true;
              // reset our reference to verto
              //_verto = v;
          } else {
              //TODO
              //Processor.starphone('userLoggedIn', {status: 'logginfailure', type: 'ext-change', extensionId: s2sVerto.currentExtensionId, callerId: s2sVerto.callerId, callerName: s2sVerto.callerName, locationId: s2sVerto.locationId });
              //_loggedIn = false;
              //_verto = null;
          }
      },

      onWSClose: (v, success) => {
          //console.log('onWSClose', arguments);
          _dispatch(doLogOut());
          //if (_loggedIn) {
            //var today = new Date();
            //TODO
            //Processor.starphone('userLoggedOut', {status: 'loggedout', type: 'ext-change', extensionId: s2sVerto.currentExtensionId, callerId: s2sVerto.callerId, callerName: s2sVerto.callerName, locationId: s2sVerto.locationId });
            //_loggedIn = false;
            //_verto = null;
          //}

      },

      onEvent: (v, e) => {
          //console.debug("GOT EVENT", v, e);
      },

    };


    this.login = this.login.bind(this);
    this.getOptions = this.getOptions.bind(this);

    VertoService.getInstance = VertoService.getInstance.bind(this);
    VertoService.login = VertoService.login.bind(this);
    VertoService.logout = VertoService.logout.bind(this);
    VertoService.mediaPerm = VertoService.mediaPerm.bind(this);
    VertoService.speedTest = VertoService.speedTest.bind(this);
    VertoService.refreshVideoResolution = VertoService.refreshVideoResolution.bind(this);
    VertoService.updateResolutions = VertoService.updateResolutions.bind(this);

  }


  login(data){
    //console.log('logging in',  data);
    const v = new $.verto(this.getOptions(data), _callbacks );

    //console.log('>>>>>', v);
    _verto.verto =v;
  }


  getOptions(data) {
    const data1 = _data;

    return {
        login: data.user + '@' + data.hostname,
        passwd: data.password,
        socketUrl: data.wsURL,
        tag: "webcam",
        ringFile: null,
        // videoParams: {
        //   "minWidth": "1280",
        //   "minHeight": "720"
        // },
        deviceParams: {
          useCamera: true, //data1.selectedVideo,
          //TODO
          // useSpeak: data1.selectedSpeaker,
          // useMic: data1.selectedAudio,
          onResCheck: VertoService.refreshVideoResolution
        },
        audioParams: {
          googAutoGainControl: true,
          googNoiseSuppression: true,
          googHighpassFilter: true
        },
        iceServers: true,
        loginParams: data
      };
  }

  makeCall(destination, settings) {
    console.log('calling desitnation', destination);
    if (!_verto.verto) {
      const message = "not connected";
      return _dispatch(doMakeCallError({destination, message }));
    }
    // ok make a call
    console.log('DATA & VERTO:', _data, _verto.verto, md5(_verto.verto.options.loginParams.email));
    /*
    const phoneObject = {
      destination_number: destination,
      caller_id_name: _verto.verto.options.loginParams.name,
      caller_id_number: _verto.verto.options.loginParams.callerid ? _verto.verto.options.loginParams.callerid  : _verto.verto.options.loginParams.email ,
      //outgoingBandwidth: storage.data.outgoingBandwidth,
      //incomingBandwidth: storage.data.incomingBandwidth,
      // get from settings
      useVideo: true, // storage.data.useVideo,
      useStereo: true, //storage.data.useStereo,
      useCamera: true, // storage.data.selectedVideo,
      useSpeak: storage.data.selectedSpeaker,
      useMic: storage.data.selectedAudio,
      dedEnc: storage.data.useDedenc,
      mirrorInput: storage.data.mirrorInput,
      userVariables: {
        email :  _verto.verto.options.loginParams.email, //storage.data.email,
        avatar:  "http://gravatar.com/avatar/" + md5(_verto.verto.options.loginParams.email) + ".png?s=600"    // "http://gravatar.com/avatar/" + md5(storage.data.email) + ".png?s=600"
      }
    };

    _verto.verto.newCall()
    */
  }

  static getInstance() {
    if (!_verto) {
      _verto = new VertoService();
    }

    return  _verto;
  }

  static login(dispatch, data) {
    //console.log('LOGIN DDDD', data);
    _dispatch = dispatch;
    return VertoService.getInstance().login(data);
  }

  static logout(dispatch) {
    _dispatch = dispatch;
    return _verto.verto.logout();
  }

  static mediaPerm(callback) {
      $.FSRTC.checkPerms(callback, true, true);
  }

  static refreshVideoResolution (resolutions){
    setTimeout(()=>{
      //console.debug('Attempting to refresh video resolutions.');
      let data = _data;
      let v = _verto.verto;
      if (!data){
        //console.log('this shouldnt be blank', data);
        data = {};
      }


      //console.log('VVVVVVV', v)
      if (v) {
        var w = resolutions['bestResSupported'][0];
        var h = resolutions['bestResSupported'][1];

        if (h === 1080) {
          w = 1280;
          h = 720;
        }

        VertoService.updateResolutions(resolutions['validRes'], data);
        v.videoParams({
          minWidth: w,
          minHeight: h,
          maxWidth: w,
          maxHeight: h,
          minFrameRate: 15,
          vertoBestFrameRate: 15 //TOOD Fix this  --- storage.data.bestFrameRate
        });
        data.videoQuality.map((qual) => {
          if (w === qual.width && h === qual.height) {
            //console.log('****', qual);
            data.vidQual = qual;

            // if (storage.data.vidQual !== qual.id || storage.data.vidQual === undefined) {
            //   storage.data.vidQual = qual.id;
            // }
          }

        });

         //console.log('ddddd:', data);
      } else {
        //console.debug('There is no instance of verto.');
      }

    }, 0);
  }

  static updateResolutions (supportedResolutions, data) {
    //console.debug('Attempting to sync supported and available resolutions');

    //var removed = 0;

    //console.debug("VQ length: " + VideoConstants.VIDEO_QUALITY_SOURCE.length);
    //console.debug(supportedResolutions);

    const videoQuality = VideoConstants.VIDEO_QUALITY_SOURCE.filter((resolution)=> {
       return supportedResolutions.filter((res) => {
         //console.log('RES: ', res);
          var width = res[0];
          var height = res[1];

        return (resolution.width == width && resolution.height == height);
      }).length > 0;
    });

    // videoQuality.length = videoQuality.length - removed;
    //console.debug("VQ length 2: " + videoQuality.length);
    data.videoQuality = videoQuality;

    data.vidQual = (videoQuality.length > 0) ? videoQuality[videoQuality.length - 1] : null;
    console.debug('vidQual', data.vidQual);

    return videoQuality;
  }

  static refreshDevices(callback){
    //console.debug('Attempting to refresh the devices.', $.verto );
    $.verto.refreshDevices((status)=>{
      //console.log('refreshing devices ...... here', status);
      let data = _data;

      if (!data)
        data = {};

      //reset stuff
      data.videoDevices = [{
        id: 'none',
        label: 'No Camera'
      }];
      data.shareDevices = [{
        id: 'screen',
        label: 'Screen'
      }];
      data.audioDevices = [];
      data.speakerDevices = [];

      // if(!storage.data.selectedShare) {
      //   storage.data.selectedShare = data.shareDevices[0]['id'];
      // }

      $.verto.videoDevices.map((device)=>{
        if (!device.label) {
          data.videoDevices.push({
            id: 'Camera ' + device,
            label: 'Camera ' + device
          });
        } else {
          data.videoDevices.push({
            id: device.id,
            label: device.label || device.id
          });
        };
        // // Selecting the first source.
        // if (i == 0 && !storage.data.selectedVideo) {
        //   storage.data.selectedVideo = device.id;
        // }

        if (!device.label) {
          data.shareDevices.push({
            id: 'Share Device ' + device,
            label: 'Share Device ' + device
          });
        } else {
          data.shareDevices.push({
            id: device.id,
            label: device.label || device.id
          });
        };
      });

      $.verto.audioInDevices.map((device)=>{

        // // Selecting the first source.
        // if (i == 0 && !storage.data.selectedAudio) {
        //   storage.data.selectedAudio = device.id;
        // }

        if (!device.label) {
          data.audioDevices.push({
            id: 'Microphone ' + device,
            label: 'Microphone ' + device
          });
        } else {
          data.audioDevices.push({
            id: device.id,
            label: device.label || device.id
          });
        };
      });


      $.verto.audioOutDevices.map((device)=>{

        // // Selecting the first source.
        // if (i == 0 && !storage.data.selectedSpeaker) {
        //   storage.data.selectedSpeaker = device.id;
        // }

        if (!device.label) {
          data.speakerDevices.push({
            id: 'Speaker ' + device,
            label: 'Speaker ' + device
          });
        } else {
          data.speakerDevices.push({
            id: device.id,
            label: device.label || device.id
          });
        };
      });

      console.debug('Devices were refreshed, checking that we have cameras.');

      // Verify if selected devices are valid
      var videoFlag = data.videoDevices.length > 0 ;

      var shareFlag = data.shareDevices.length > 0;

      var audioFlag = data.audioDevices.length > 0;

      var speakerFlag = data.speakerDevices.length > 0;

      // if (!videoFlag) storage.data.selectedVideo = data.videoDevices[0].id;
      // if (!shareFlag) storage.data.selectedShare = data.shareDevices[0].id;
      // if (!audioFlag) storage.data.selectedAudio = data.audioDevices[0].id;
      // if (!speakerFlag && data.speakerDevices.length > 0) storage.data.selectedSpeaker = data.speakerDevices[0].id;

      // This means that we cannot use video!
      if (data.videoDevices.length === 0) {
        //console.log('No camera, disabling video.');
        data.canVideo = false;
        data.videoDevices.push({
          id: 'none',
          label: 'No camera'
        });
      } else {
        data.canVideo = true;
      }

      // put data back on object

      //console.log('DDDDDD', data);
      // when done ... call here
      callback(status);
    });
  }

  static speedTest(callback=()=>{})  {
      const v = _verto.verto;
      if (v){
        //console.log('vvv is good');
        v.rpcClient.speedTest(1024 * 256, (e, data) => {
          const d = _data;
          //console.log('spppppppppp', d, data)
          var upBand = Math.ceil(data.upKPS * .75),
              downBand = Math.ceil(data.downKPS * .75);


          //TODO if auto then do something with it
          // if (storage.data.autoBand) {
          //   storage.data.incomingBandwidth = downBand;
          //   storage.data.outgoingBandwidth = upBand;
          //   storage.data.useDedenc = false;
          //   storage.data.vidQual = 'hd';
          //
          //   if (upBand < 512) {
          //     storage.data.vidQual = 'qvga';
          //   }
          //   else if (upBand < 1024) {
          //     storage.data.vidQual = 'vga';
          //   }
          // }

          const returnData =  { ...data, upBand, downBand  };
          // assign vidQual here since it will need it down stream
          returnData.vidQual = d.vidQual;

          //console.log('^^^^',d, returnData);

          callback(returnData);
        });
      } else {
        //console.log('v is bad');
      }

    }


}

//exporting
export default VertoService;
