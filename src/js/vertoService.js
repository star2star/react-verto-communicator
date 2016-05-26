let _verto = new WeakMap();
let _activeCalls = {};
const _maxActiveCalls=2;
let _callerName = "";

let _callerId =  "0";
let _confMan = null; //private chat
//let chattingWith = false;
let _useVideo = false;

let _loggedIn = false;

const callbacks = {
  onMessage: function(verto, dialog, msg, data) {
    console.log("in onMessage", data);
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
              console.log("$.verto.enum.message.display", dialog.params.remote_caller_id_number);
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

  onDialogState: function(d) {
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

  onWSLogin: function(v, success) {
      console.log('onWSLogin: ', arguments);
      //display("");

      if (success) {
          //TODO
          //Processor.starphone('userLoggedIn', {status: 'loggedin', type: 'ext-change', extensionId: s2sVerto.currentExtensionId, callerId: s2sVerto.callerId, callerName: s2sVerto.callerName, locationId: s2sVerto.locationId });
          _loggedIn = true;
          // reset our reference to verto
          _verto = v;
      } else {
          //TODO
          //Processor.starphone('userLoggedIn', {status: 'logginfailure', type: 'ext-change', extensionId: s2sVerto.currentExtensionId, callerId: s2sVerto.callerId, callerName: s2sVerto.callerName, locationId: s2sVerto.locationId });
          _loggedIn = false;
          _verto = null;
      }
  },

  onWSClose: function(v, success) {
      console.log('onWSClose', arguments);
      if (_loggedIn) {
        var today = new Date();
        //TODO
        //Processor.starphone('userLoggedOut', {status: 'loggedout', type: 'ext-change', extensionId: s2sVerto.currentExtensionId, callerId: s2sVerto.callerId, callerName: s2sVerto.callerName, locationId: s2sVerto.locationId });
        _loggedIn = false;
        _verto = null;
      }

  },

  onEvent: function(v, e) {
      //console.debug("GOT EVENT", v, e);
  },

};


export default class VertoService {
  constructor(host="localhost") {

    this.checkVideo = () =>{
      return _useVideo;
    };

    this.logout = () => {
  		if (_verto) {
        _verto.logout();
      }
      _activeCalls = {};
  	};

    this.getLoggedInInfo = () => {
  		return {
        type: 'ext-change',
        loggedIn: _loggedIn,
        callerId: _callerId,
        callerName: _callerName
      };
  	};

    this.login = (data) => {
  		console.log('login called:', data);
      var loggedIn = this.getLoggedInInfo().loggedIn;
      if (_verto && loggedIn ) {
        console.log('already logged in to that extension ');
        return;
      }
      if (Object.keys(_activeCalls).length > 0 ) {
        console.log('on call cannot switch extension ');
        return;
      }

  		if (_verto && loggedIn) {
  			// ok logout
  			//console.log('loging out in login');
  			_verto.logout();
  		}

      //TODO
			//_callerName = myExt.name;
			//_callerId = myExt.ext;

  		_verto = new $.verto({
  				login: myExt.username + "@" + myExt.domain,
  				passwd: myExt.password,
  				socketUrl: "ws://" + myExt.domain + ":8081",
  				tag: "webcam",
  				ringFile: myExt.ringtonePath,
  				videoParams: {
  					"minWidth": "1280",
  					"minHeight": "720"
  				},
          audioParams: {
    				googAutoGainControl: false,
    				googNoiseSuppression: false,
    				googHighpassFilter: false
          },
          iceServers: true
        },_callbacks);

        if (_verto){
          _verto.login();
        };
    };
  }
}
