import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import {
    AvatarSVG,
    DialPadIconSVG,
    MicrophoneIconSVG,
    PauseIconSVG,
    PhoneIconSVG
  } from './svgIcons';
import { fromJS } from "immutable";


class Dialing extends VertoBaseComponent {
  constructor(props){
      super(props);
      this.state={startTime: Date.now(), timer: 0, status: 'trying'};
      this.padLeft = (s, len, cIn) =>{
            var c = cIn || '0';
            while (s.length < len) s = c+s;
            return s;
          };

      this.micOnClick = this.micOnClick.bind(this);
      this.pauseOnClick = this.pauseOnClick.bind(this);
      this.hangupOnClick = this.hangupOnClick.bind(this);
  }

  static propTypes = {
    callData : React.PropTypes.object,
    cbHangup : React.PropTypes.func,
    cbHold:  React.PropTypes.func,
    cbDTMF:  React.PropTypes.func,
    cbMute:  React.PropTypes.func
  };

  static defaultProps = {
     callData : {}
  };

  static filename = "dialing";
  static displayName = "Dialing";

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

  micOnClick(){
    //console.log('mute Microphone clicked: ', this.props);
    this.props.cbMute(this.props.callData.callId, 'mic');
  }

  pauseOnClick(){
    //console.log('mute Microphone clicked: ', this.props);
    this.props.cbHold(this.props.callData.callId);
  }

  hangupOnClick(){
    //console.log('hangup clicked: ', this.props);
    this.props.cbHangup(this.props.callData.callId);
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

            <span onClick={this.micOnClick}>
              <MicrophoneIconSVG svgStyle={this.getStyle("svgStyle")} />
            </span>
            <span onClick={this.pauseOnClick}>
              <PauseIconSVG svgStyle={this.getStyle("svgStyle")} />
            </span>

            <span onClick={this.hangupOnClick}>
              <PhoneIconSVG svgStyle={{...this.getStyle("svgStyle"), backgroundColor: '#f00', borderRadius: '50%'}} />
            </span>
          </div>
        </div>
      );
    }
  }

export default Dialing;
// reviewed 7/13/2016
