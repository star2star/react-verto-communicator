import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import UserVideoControls from './vidControlsUser';
import AdminVideoControls from './vidControlsAdmin';
import { PhoneIconSVG } from './svgIcons';
import Radium from 'radium';
import { fromJS } from "immutable";


class CallProgress extends VertoBaseComponent {
    constructor(props){
        super(props);

        this.state={startTime: Date.now(), timer: 0, status: 'trying'};
        this.padLeft = (s, len, cIn) =>{
              var c = cIn || '0';
              while (s.length < len) s = c+s;
              return s;
            };

        this.consolePlay = this.consolePlay.bind(this);
        this.consoleStop = this.consoleStop.bind(this);
        this.consoleRecord = this.consoleRecord.bind(this);
        this.consoleStop = this.consoleStop.bind(this);
        this.muteMic = this.muteMic.bind(this);
        this.muteVideo = this.muteVideo.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
        this.hangUp = this.hangUp.bind(this);
    }

    static propTypes = {
         callData : React.PropTypes.object,
         cbDTMF:  React.PropTypes.func,
         cbHangup : React.PropTypes.func,
         cbHold:  React.PropTypes.func,
         cbMute:  React.PropTypes.func,
         cbSetVideoMode: React.PropTypes.func,
         cbShare: React.PropTypes.func,
         cbSnapshot: React.PropTypes.func, // not currently supported
         cbToggleChat: React.PropTypes.func,
         currLayout: React.PropTypes.array,
         layouts: React.PropTypes.array,
         newMsgCount : React.PropTypes.number,
         userConfStatus : React.PropTypes.object
   };

   static defaultProps = {
        callData : {}
  };

  static filename = "callprogress";
  static displayName = "CallProgress";

    shouldComponentUpdate(nextProps, nextState) {
      return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
    }

    componentWillReceiveProps(nextProp){
      //console.log('&&&&', nextProp);
      if (this.state.status != nextProp.callData.status ) {
        //console.log('------- changing ', nextProp.callData.status );
        this.interval = setInterval(()=>{
          const xTimer = Date.now() - this.state.startTime;
          //console.log('xXXXXX', xTimer);
          const hours = Math.floor(xTimer / (1000 * 60 * 60));
          const minutes = Math.floor( (xTimer - (hours * 1000 * 60 * 60))  / (1000* 60));
          const seconds = Math.floor( (xTimer - (hours * 1000 * 60 * 60) - (minutes * 1000 * 60 ))  / 1000);
          //console.log('xxxTIMER: ', xTimer, hours, minutes, seconds);
          const yTimer = this.padLeft(hours+"", 2)+':'+ this.padLeft(minutes+"", 2)+':'+ this.padLeft(seconds+"", 2);
          this.setState({ ...this.state, timer: yTimer });
        }, 1000);

        this.setState({ ...this.state, status: nextProp.callData.status, startTime: Date.now()});
      }
    }

    componentWillUnmount(){
      if (this.interval) {
        //console.log('clearing: ', this.interval);
        clearInterval(this.interval);
      }
    }



    getDefaultStyle(styleName) {
      const styles = {
        vidControlStyles: {
          display: 'flex',
          justifyContent: 'center',
          width: '75%',
          maxWidth: '780px'
        },

        controlBarStyle: {
          display:'flex',
          backgroundColor: '#333',
          height: '70px',
          justifyContent: 'space-around',
          alignItems: 'center'
        },

        statusStyle: {
          display:"flex",
          justifyContent: 'center',
          color: '#ddd',
          wrap: 'auto',
          overflow: 'auto',
          '@media (max-width: 991px)': {
            flexDirection: 'column'
          }
        },

        destinationStyle: {
          paddingRight: '10px'
        },

        phoneIconStyle: {
          width: "20px",
          height: "20px",
          fill: "white",
          backgroundColor: '#f00',
          padding: '5px',
          borderRadius: '50%'
        },

        phoneIconContainer: {
          display:'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          cursor: 'pointer'
        },

        timerColor: {
          color: '#6C6C6C'
        },

        controlStyleUser: {
          width: '50%'
        },

        controlStyleAdmin: {
          width: '50%',
          borderRightWidth: '1px',
          borderRightColor: '#474747',
          borderRightStyle: 'solid'
        }
      };

      return (styles[styleName]);
    }

    consolePlay(){console.log('Play Clicked');}

    consoleStop(){console.log('Stop Clicked');}

    consoleRecord(){console.log('Record Clicked');}

    consoleStop(){console.log('Stop Record Clicked');}

    muteMic(){this.props.cbMute(this.props.callData.callId, 'mic');}

    muteVideo(){this.props.cbMute(this.props.callData.callId, 'video');}

    toggleChat(){console.log('Toggling chat in callProgress?'); this.props.cbToggleChat();}

    hangUp(){this.props.cbHangup(this.props.callData.callId);}



    render() {
      //console.log('<<<<<< CP: ', this.props.callData, this.state );
      const adminControls = this.props.isModerator ?
              (<div style={this.getStyle('controlStyleAdmin')}>
                <AdminVideoControls
                    cbPlay={this.consolePlay}
                    cbStop={this.consoleStop}
                    cbRecord={this.consoleRecord}
                    cbStopRecord={this.consoleStop}
                    cbSnapshot={this.props.cbSnapshot}
                    cbSetVideoMode={this.props.cbSetVideoMode}
                    layouts={this.props.layouts}
                    currLayout={this.props.currLayout}
                />
              </div>
              ) :
              undefined;

      const userControls = (
            <div style={this.getStyle('controlStyleUser')}>
              <UserVideoControls
                  cbMicMute={this.muteMic}
                  cbVideoMute={this.muteVideo}
                  cbScreenShare={this.props.cbShare}
                  cbToggleChat={this.toggleChat}
                  userConfStatus={this.props.userConfStatus}
                  newMsgCount={this.props.newMsgCount}
              />
            </div>
            );

      return (
        <div style={this.getStyle('controlBarStyle')}>
            <div style={this.getStyle("statusStyle")} >
              <div style={this.getStyle('destinationStyle')} >{this.props.callData.destination}</div>
              <div style={this.getStyle('timerColor')}>{this.state.status == 'active'? this.state.timer: 'Connecting ...'}</div>
            </div>
          <div className="vidControls" style={this.getStyle("vidControlStyles")}>
              {adminControls}
              {userControls}
          </div>
          <span
              style={this.getStyle('phoneIconContainer')}
              onClick={this.hangUp}
              >
              <PhoneIconSVG svgStyle={this.getStyle('phoneIconStyle')} />
          </span>

        </div>
      );
    }
  }

export default Radium(CallProgress);
// reviewed 7/13/2016
