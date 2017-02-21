import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import ControlItem from './controlItem';
import Badge from './badge';
import ToolTip from './tooltip';
import { injectIntl } from 'react-intl';
import { fromJS } from "immutable";



class UserVideoControls extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {};
    this.handleToggleFullScreen = this.handleToggleFullScreen.bind(this);
    // addEventListener for dblclick to go to full screen moderator
    document.getElementById("webcam").addEventListener('dblclick', this.handleToggleFullScreen);

  }

  static propTypes = {
    cbMicMute : React.PropTypes.func,
    cbVideoMute : React.PropTypes.func,
    cbScreenShare : React.PropTypes.func,
    cbToggleChat : React.PropTypes.func,
    newMsgCount : React.PropTypes.number,
    userConfStatus: React.PropTypes.object
  };

  static defaultProps = {
    cbMicMute : ()=>{},
    cbVideoMute : ()=>{},
    cbScreenShare : ()=>{},
    cbToggleChat : ()=>{}
  };

  static filename = "vidControlsUser";
  static displayName = "UserVideoControls";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  componentWillUnmount() {
    document.getElementById("webcam").removeEventListener('dblclick', this.handleToggleFullScreen);
  }


  getDefaultStyle(styleName) {
    const styles = {
      controlIconStyle: {
        svgStyle: {
          height: '30px',
          fill: 'white',
          width: '30px'
        }
      },
      headingStyle:{
        backgroundColor: '#e9e9e9'
      },

      controlsStyle: {
        display: 'flex',
        justifyContent: 'space-around',
        flex: '1'
      },

      badgePosition: {
        position: 'relative'
      },

      badgeCompStyle: {
        badgeStyles:{
        position: 'absolute',
        top: '-15px',
        left: '10px'
        }
      }
    };

    return styles[styleName];
  }

  handleToggleFullScreen() {
    //console.log('Handle Toggle Full Screen');

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
    const { formatMessage } = this.props.intl;
    // Setup up based on the conference status object
    const unMuteMsg = formatMessage({"id":"CHAT_UNMUTE_MIC", "defaultMessage":"Unmute"});
    const muteMsg = formatMessage({"id":"CHAT_MUTE_MIC", "defaultMessage":"Mute"});
    const fullscreenMsg = formatMessage({"id":"MESSAGE_FULLSCREEN", "defaultMessage":"Toggle Fullscreen"});
    const openCloseMessage = formatMessage({"id":"MESSAGE_OPEN_CLOSE_CHAT", "defaultMessage":"Open/Close Chat"});
    const screenshareMessage = formatMessage({"id":"MESSAGE_SCREENSHARE", "defaultMessage":"Screen Share"});
    const micStatus = this.props.userConfStatus && this.props.userConfStatus.audio.muted ?
            (<ToolTip name="unmutemic" place='top' msg={unMuteMsg}>
              <ControlItem type="MuteMicrophoneIconSVG"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbActionClick={this.props.cbMicMute}
              />
            </ToolTip>) :
            (<ToolTip name="mutemic" place='top' msg={muteMsg}>
              <ControlItem type="MicrophoneIconSVG"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbActionClick={this.props.cbMicMute}
              />
            </ToolTip>);

    const videoStatus = this.props.userConfStatus && this.props.userConfStatus.video.muted ?
            (<ToolTip name="unmutemic" place='top' msg={unMuteMsg}>
              <ControlItem type="MuteVideoIconSVG"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbActionClick={this.props.cbVideoMute}
              />
             </ToolTip>) :
            (<ToolTip name="unmutemic" place='top' msg={muteMsg}>
              <ControlItem type="VideoIconSVG"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbActionClick={this.props.cbVideoMute}
              />
            </ToolTip> );

    const screenStatus = document.webkitIsFullScreen || document.mozFulScreen ?
            (<ToolTip name="fullscreen" place='top' msg={fullscreenMsg}>
              <ControlItem type="RestoreIconSVG"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbActionClick={this.handleToggleFullScreen}
              />
            </ToolTip>) :
            (<ToolTip name="fullscreen" place='top' msg={fullscreenMsg}>
              <ControlItem type="FullScreenIconSVG"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbActionClick={this.handleToggleFullScreen}
              />
            </ToolTip>);

    //console.log('################ New Msg Count', this.props.newMsgCount);

    const badge = this.props.newMsgCount > 0 ?
      (
        <Badge compStyle={this.getStyle('badgeCompStyle')} count={this.props.newMsgCount} cbClick={this.props.cbToggleChat}/>
      ) :
      undefined;

    const chatStatus = (
      <span>
        <span style={this.getStyle('badgePosition')}>{badge}</span>
        <ToolTip name="share" place='top' msg={openCloseMessage}>
          <ControlItem type="ChatIconSVG"
              compStyle={this.getStyle("controlIconStyle")}
              cbActionClick={this.props.cbToggleChat}
          />
        </ToolTip>
      </span>
    );

    // Build out the user controls
    return (
      <div style={this.getStyle('controlsStyle')}>
          {micStatus}
          {videoStatus}

          {screenStatus}
          <ToolTip name="togglechat" place='top' msg={screenshareMessage}>
            <ControlItem type="ShareScreenIconSVG"
                compStyle={this.getStyle("controlIconStyle")}
                cbActionClick={this.props.cbScreenShare}
            />
          </ToolTip>
          {chatStatus}
      </div>
    );
  }
}

export default injectIntl(UserVideoControls);
// reviewed on 7/15/2016
