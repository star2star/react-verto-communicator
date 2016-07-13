import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import UserVideoControls from './vidControlsUser';
import AdminVideoControls from './vidControlsAdmin';
import {
    ShareScreenIconSVG,
    AvatarSVG,
    DialPadIconSVG,
    MicrophoneIconSVG,
    PauseIconSVG,
    MuteMicrophoneIconSVG,
    PhoneIconSVG,
    VideoIconSVG
  } from './svgIcons';

 const propTypes = {
   callData : React.PropTypes.object.isRequired,
   cbHangup : React.PropTypes.func,
   cbHold:  React.PropTypes.func,
   cbDTMF:  React.PropTypes.func,
   cbMute:  React.PropTypes.func
};

class Dialing extends VertoBaseComponent {
  constructor(props){
      super(props);
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
        dialingContainer : {
          flexDirection: 'column',
          display: 'flex',
          border: '1px solid #ccc',
          marginTop: '10vh'
        },
        avatarStyle : {
          width: '50px',
          height: '50px',
          fill: 'white',
          backgroundColor: '#333',
          borderRadius: '50%'
        },
        avatarRowStyle : {
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 20px'
        },
        callStatusStyle : {
          flexDirection: 'column',
          display: 'flex'
        },
        iconRowStyle : {
          backgroundColor: "#333",
          flex:'0 0 60px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        },
        svgStyle: {
          width: '20px',
          height: '20px',
          fill: 'white',
          padding: '5px',
          cursor: 'pointer'
        }
    };

    return (styles[styleName]);
  }

  render() {
    //console.log('$@#$$%#@$#%$%$%$%&^%$#%^& ', this.props.callData);
      return (
        <div className="container" style={this.getStyle('dialingContainer')}>
          <div style={this.getStyle('avatarRowStyle')}>
            <AvatarSVG svgStyle={this.getStyle('avatarStyle')}  />
            <div style={this.getStyle('callStatusStyle')}>
              <div>{this.props.callData.destination}</div>
              <div>{this.state.status == 'active'? this.state.timer: 'Connecting ...'}</div>
            </div>
          </div>
          <div style={this.getStyle('iconRowStyle')}>
            <DialPadIconSVG svgStyle={this.getStyle("svgStyle")} />

            <span onClick={()=>{
              //console.log('mute Microphone clicked: ', this.props);
              this.props.cbMute(this.props.callData.callId, 'mic');
            }}>
              <MicrophoneIconSVG svgStyle={this.getStyle("svgStyle")} />
            </span>
            <span onClick={()=>{
              //console.log('mute Microphone clicked: ', this.props);
              this.props.cbHold(this.props.callData.callId);
            }}>
              <PauseIconSVG svgStyle={this.getStyle("svgStyle")} />
            </span>

            <span onClick={()=>{
              //console.log('hangup clicked: ', this.props);
              this.props.cbHangup(this.props.callData.callId);
            }}>
              <PhoneIconSVG svgStyle={{...this.getStyle("svgStyle"), backgroundColor: '#f00', borderRadius: '50%'}} />
            </span>
          </div>
        </div>
      );
    }
  }

Dialing.propTypes = propTypes;

export default Dialing;
