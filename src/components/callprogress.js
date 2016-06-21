import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import UserVideoControls from './vidControlsUser';
import AdminVideoControls from './vidControlsAdmin';
import {ShareScreenIconSVG, AvatarSVG, DialPadIconSVG, MicrophoneIconSVG, PauseIconSVG, MuteMicrophoneIconSVG, PhoneIconSVG, VideoIconSVG } from './svgIcons';
import Radium from 'radium';

 const propTypes = {
      callData : React.PropTypes.object.isRequired,
      cbDTMF:  React.PropTypes.func,
      cbHangup : React.PropTypes.func,
      cbHold:  React.PropTypes.func,
      cbMute:  React.PropTypes.func,
      cbSetVideoMode: React.PropTypes.func,
      cbShare: React.PropTypes.func,
      cbToggleChat: React.PropTypes.func,
      currLayout: React.PropTypes.array,
      layouts: React.PropTypes.array,
      newMsgCount : React.PropTypes.number,
      userConfStatus : React.PropTypes.object

};

class CallProgress extends VertoBaseComponent {
    constructor(props){
        super(props);
        // TODO ta - should we restart the timer?  If not, need to get props with startTime
        this.state={startTime: Date.now(), timer: 0, status: 'trying'};
        this.padLeft = (s, len, c) =>{
              var c = c || '0';
              while (s.length < len) s = c+s;
              return s;
            };
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

    getCompStyle() {
      return this.props.compStyle;
    }

    getDefaultStyle(styleName) {
      const styles = {
        vidControlStyles: {
          display: 'flex',
          justifyContent: 'center',
          width: '75%',
          maxWidth: '390px'
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
           justifyContent: 'center'
        },

        timerColor: {
          color: '#6C6C6C'
        }
      };

      return (styles[styleName]);
    }

    render() {
      //console.log('<<<<<< CP: ', this.props.callData, this.state );
      const adminControls = this.props.isModerator ?
              (<AdminVideoControls
                  cbPlay={()=>{console.log('Play Clicked');}}
                  cbStop={()=>{console.log('Stop Clicked');}}
                  cbRecord={()=>{console.log('Record Clicked');}}
                  cbStopRecord={()=>{console.log('Stop Record Clicked');}}
                  cbSnapshot={()=>{console.log('Snapshot Clicked');}}
                  cbSetVideoMode={(params)=>{this.props.cbSetVideoMode(params);}}
                  layouts={this.props.layouts}
                  currLayout={this.props.currLayout}
                />
              ) :
              undefined;

      const userControls = (
              <UserVideoControls
                  cbMicMute={()=>{this.props.cbMute(this.props.callData.callId, 'mic');}}
                  cbVideoMute={()=>{this.props.cbMute(this.props.callData.callId, 'video');}}
                  cbScreenShare={this.props.cbShare}
                  cbToggleChat={()=>{console.log('Toggling chat in callProgress?'); this.props.cbToggleChat();}}
                  userConfStatus={this.props.userConfStatus}
                  newMsgCount={this.props.newMsgCount}
              />
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
          <span style={this.getStyle('phoneIconContainer')}
              onClick={()=>{
              //console.log('hangup clicked: ', this.props);
              this.props.cbHangup(this.props.callData.callId);
          }}>
              <PhoneIconSVG svgStyle={this.getStyle('phoneIconStyle')} />
          </span>

        </div>
      );
    }
  }


CallProgress.propTypes = propTypes;

export default Radium(CallProgress);
