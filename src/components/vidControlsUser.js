import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import ControlItem from './controlItem';


const propTypes = {
  cbMicMute : React.PropTypes.func.isRequired,
  cbVideoMute : React.PropTypes.func.isRequired,
  cbScreenShare : React.PropTypes.func.isRequired,
  cbToggleChat : React.PropTypes.func.isRequired,
  userConfStatus: React.PropTypes.object

};

export default class UserVideoControls extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {};
    this.handleToggleFullScreen = this.handleToggleFullScreen.bind(this);
  }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      controlIconStyle: {
        svgStyle: {
          height: '20px',
          fill: '#65ac43'
        }
      },
      headingStyle:{
        backgroundColor: '#e9e9e9'

      }
    };

    let styleReturn = styles[styleName];
      if(this.props.style && this.props.style[styleName]) {
        styleReturn = {...styleReturn, ...this.props.style[styleName]};
      }
    return styleReturn;
  }

  handleToggleFullScreen() {
    console.log('Handle Toggle Full Screen');

    const elem = document.getElementById("chatVideoWrapper");
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
      !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  render(){

    // Setup up based on the conference status object
    const micStatus = this.props.userConfStatus.audio.muted ?
            (<ControlItem type="MuteMicrophoneIconSVG"
                compStyle={this.getStyle("controlIconStyle")}
                cbActionClick={this.props.cbMicMute}
            />) :
            (<ControlItem type="MicrophoneIconSVG"
                compStyle={this.getStyle("controlIconStyle")}
                cbActionClick={this.props.cbMicMute}
            />);

    const videoStatus = this.props.userConfStatus.video.muted ?
            (<ControlItem type="MuteVideoIconSVG"
                compStyle={this.getStyle("controlIconStyle")}
                cbActionClick={this.props.cbVideoMute}
            />) :
            (<ControlItem type="VideoIconSVG"
                compStyle={this.getStyle("controlIconStyle")}
                cbActionClick={this.props.cbVideoMute}
            />);

    const screenStatus = document.webkitIsFullScreen || document.mozFulScreen ?
            (<ControlItem type="RestoreIconSVG"
                compStyle={this.getStyle("controlIconStyle")}
                cbActionClick={this.handleToggleFullScreen}
            />) :
            (<ControlItem type="FullScreenIconSVG"
                compStyle={this.getStyle("controlIconStyle")}
                cbActionClick={this.handleToggleFullScreen}
            />);


    // Build out the user controls
    return (
      <div style={{display: 'flex'}}>
        {micStatus}
        {videoStatus}
        {screenStatus}
        <ControlItem type="ShareScreenIconSVG"
            compStyle={this.getStyle("controlIconStyle")}
            cbActionClick={this.props.cbScreenShare}
        />
        <ControlItem type="ChatIconSVG"
            compStyle={this.getStyle("controlIconStyle")}
            cbActionClick={this.props.cbToggleChat}
        />
      </div>
    );
  }
}

UserVideoControls.propTypes = propTypes;
