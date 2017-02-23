import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import App from '../routes/app'; // for transfer
import ControlItem from './controlItem';
import InputModal from './inputModal';
import { injectIntl } from 'react-intl';
import { fromJS } from "immutable";


class AdminControls extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {};

    this.controlClickMuteMic = this.controlClickMuteMic.bind(this);
    this.controlClickMuteVideo = this.controlClickMuteVideo.bind(this);
    this.controlClickKick = this.controlClickKick.bind(this);
    this.controlClickVideoFloor = this.controlClickVideoFloor.bind(this);
    this.appToggleModalTransfer = this.appToggleModalTransfer.bind(this);
    this.controlClickVolumeDown = this.controlClickVolumeDown.bind(this);
    this.controlClickGainDown = this.controlClickGainDown.bind(this);
    this.controlClickVolumeUp = this.controlClickVolumeUp.bind(this);
    this.controlClickGainUp = this.controlClickGainUp.bind(this);
    this.appToggleModalChat = this.appToggleModalChat.bind(this);
    this.controlClickResetBanner = this.controlClickResetBanner.bind(this);
    this.appToggleLayoutPosition = this.appToggleLayoutPosition.bind(this);
    this.controlClickNextLayer = this.controlClickNextLayer.bind(this);
    this.controlClickPrevLayer = this.controlClickPrevLayer.bind(this);
    this.controlClickTransfer = this.controlClickTransfer.bind(this);
    this.controlClickBanner = this.controlClickBanner.bind(this);
    this.controlClickSetLayer = this.controlClickSetLayer.bind(this);
    this.consoleLogSetWatchingCanvas = this.consoleLogSetWatchingCanvas.bind(this);
    this.consoleLogNextWatchingCanvas = this.consoleLogNextWatchingCanvas.bind(this);
    this.consoleLogPrevWatchingCanvas = this.consoleLogPrevWatchingCanvas.bind(this);
    this.consoleLogSetInputCanvas = this.consoleLogSetInputCanvas.bind(this);
    this.consoleLogNextInputCanvas = this.consoleLogNextInputCanvas.bind(this);
    this.consoleLogPrevInputCanvas = this.consoleLogPrevInputCanvas.bind(this);
  }

  static propTypes = {
    cbControlClick : React.PropTypes.func,
    multCanvas: React.PropTypes.bool,
    member : React.PropTypes.object
  };

  static defaultProps = {
    cbControlClick : ()=>{},
    member : {}
  };

  static filename = "memberAdminControlPanel";
  static displayName = "AdminControls";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  getDefaultStyle(styleName) {
    const styles = {
      controlIconStyle: {
        svgStyle: {
          height: '30px',
          width: '30px',
          fill: 'gray',
          paddingTop: '10px'
        },
        controlStyle: {
          paddingTop: '2px',
          fontSize: '.8rem'
        }
      },
      headingStyle:{
        backgroundColor: '#e9e9e9',
        display: 'flex',
        justifyContent: 'center',
        fontSize: '10px',
        fill: '#444',
        paddingBottom: '5px',
        paddingTop: '5px'
      },

      generalStyle:{
        display: 'flex',
        justifyContent: 'space-around',
        paddingBottom: '10px'
      },

      bannerStyle: {
        paddingBottom: '10px',
        display: 'flex',
        justifyContent: 'space-around'
      },

      bannerContainerStyle: {
        flex: '1',
        border:'1px solid #e9e9e9'
      },

      volumeAndGainStyle: {
        display:'flex',
        flexDirection:'column',
        paddingBottom: '10px'
      },

      multiCanvasStyle:{
        display: 'flex',
        justifyContent: 'space-around',
        paddingBottom: '10px'
      },

      canvasStyle: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingBottom: '10px'
      },

      container: {
        display: 'flex',
        backgroundColor: '#f3f3f3',
        marginTop: '15px'
      },

      column1: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        border:'1px solid #e9e9e9'
      },

      audioVideoStyle: {
        display: 'flex',
        justifyContent: 'space-around'
      }
    };

    return styles[styleName];
  }

  controlClickMuteMic(){
    this.props.cbControlClick("MUTEMIC", [this.props.member.memberId]);
  }

  controlClickMuteVideo(){
    this.props.cbControlClick("MUTEVIDEO", [this.props.member.memberId]);
  }

  controlClickKick(){
    this.props.cbControlClick("KICK", [this.props.member.memberId]);
  }

  controlClickVideoFloor(){
    this.props.cbControlClick("VIDEOFLOOR", [this.props.member.memberId]);
  }

  controlClickTransfer(dest){
      this.props.cbControlClick("TRANSFER", [this.props.member.memberId, dest]);
  }

  appToggleModalTransfer(){
    App.toggleModal((
      <InputModal cbClose={App.toggleModal}
          title={formatMessage({"id":"TITLE_TRANSFER", "defaultMessage":"Transfer Party?"})}
          label={formatMessage({"id":"LABEL_TRANSFER", "defaultMessage":"Destination"})}
          message={formatMessage({"id":"MESSAGE_TRANSFER", "defaultMessage":"To what destination would you like to transfer this call?"})}
          placeholder={formatMessage({"id":"LABEL_TRANSFER", "defaultMessage":"Destination"})}
          cbSubmit={this.controlClickTransfer}
      />));
  }

  controlClickVolumeDown(){
    this.props.cbControlClick("VOLUMEDOWN", [this.props.member.memberId]);
  }

  controlClickGainDown(){
    this.props.cbControlClick("GAINDOWN", [this.props.member.memberId]);
  }

  controlClickVolumeUp(){
    this.props.cbControlClick("VOLUMEUP", [this.props.member.memberId]);
  }

  controlClickGainUp(){
    this.props.cbControlClick("GAINUP", [this.props.member.memberId]);
  }

  controlClickBanner(text){
      this.props.cbControlClick("BANNER", [this.props.member.memberId, text]);
    }

  appToggleModalChat(){
    App.toggleModal((
      <InputModal cbClose={App.toggleModal}
          title={formatMessage({"id":"CHAT_BANNER", "defaultMessage":"Banner "})}
          label={formatMessage({"id":"TITLE_INSERT_BANNER", "defaultMessage":"Please insert the banner text "})}
          placeholder={formatMessage({"id":"CHAT_BANNER", "defaultMessage":"Banner "})}
          cbSubmit={this.controlClickBanner}
      />));
  }

  controlClickResetBanner(){
    this.props.cbControlClick("RESETBANNER", [this.props.member.memberId, 'reset']);
  }

  controlClickSetLayer(value){
      this.props.cbControlClick("SETLAYER", ['vid-layer', this.props.member.memberId, value.toString()]);
    }

  appToggleLayoutPosition(){
      App.toggleModal((
        <InputModal cbClose={App.toggleModal}
            title="Set Layout Position"
            label="Please enter layout position"
            placeholder="Layout position"
            cbSubmit={this.controlClickSetLayer}
        />));
    }

  controlClickNextLayer(){
    this.props.cbControlClick("NEXTLAYER", ['vid-layer', this.props.member.memberId, 'next']);
  }

  controlClickPrevLayer(){
    this.props.cbControlClick("PREVLAYER", ['vid-layer', this.props.member.memberId, 'prev']);
  }

  consoleLogSetWatchingCanvas(){
    console.log('Set Watching Canvas');
  }

  consoleLogNextWatchingCanvas(){
    console.log('Next Watching Canvas');
  }

  consoleLogPrevWatchingCanvas(){
    console.log('Prev Watching Canvas');
  }

  consoleLogSetInputCanvas(){
    console.log('Set Input Canvas');
  }

  consoleLogNextInputCanvas(){
    console.log('Next Input Canvas');
  }

  consoleLogPrevInputCanvas(){
    console.log('Prev Input Canvas');
  }


  render(){
    const { formatMessage } = this.props.intl;

    // TODO - ta - Finish up Transfer component to handle transfer click
    // TODO - ta - Add new component for input of banner text
    // TODO - ta - Add new component to get 'canvasId' when setting layer
    // TODO - ta - Add real callback functions to canvas controls when available

    // Setup up based on the user status object
    const micStatus = this.props.member.conferenceStatus.audio.muted ?
            (<ControlItem type="MuteMicrophoneIconSVG" label={formatMessage({"id":"CHAT_UNMUTE_MIC", "defaultMessage":"Unmute"})}
                compStyle={this.getStyle("controlIconStyle")}
                cbActionClick={this.controlClickMuteMic}
            />) :
            (<ControlItem type="MicrophoneIconSVG" label={formatMessage({"id":"CHAT_MUTE_MIC", "defaultMessage":"Mute"})}
                compStyle={this.getStyle("controlIconStyle")}
                cbActionClick={this.controlClickMuteMic}
            />);

    const videoStatus = this.props.member.conferenceStatus.video.muted ?
            (<ControlItem type="MuteVideoIconSVG" label={formatMessage({"id":"CHAT_UNMUTE_MIC", "defaultMessage":"Unmute"})}
                compStyle={this.getStyle("controlIconStyle")}
                cbActionClick={this.controlClickMuteVideo}
            />) :
            (<ControlItem type="VideoIconSVG" label={formatMessage({"id":"CHAT_MUTE_MIC", "defaultMessage":"Mute"})}
                compStyle={this.getStyle("controlIconStyle")}
                cbActionClick={this.controlClickMuteVideo}
            />);

      // Setup JSX for controls that only appear with multiple canvas
      const multCanvasControls = this.props.multCanvas ?
              (
                <div className="multCanvasControls">
                  <div style={this.getStyle("headingStyle")}>{formatMessage({"id":"WATCHING_CANVAS", "defaultMessage":"Watching Canvas"})}</div>
                  <div style={this.getStyle("multiCanvasStyle")}>
                    <ControlItem type="SetIconSVG" label={formatMessage({"id":"CHAT_SET", "defaultMessage":"Set"})}
                        compStyle={this.getStyle("controlIconStyle")}
                        cbActionClick={this.consoleLogSetWatchingCanvas}
                    />
                    <ControlItem type="NextIconSVG" label={formatMessage({"id":"CHAT_NEXT", "defaultMessage":"Next"})}
                        compStyle={this.getStyle("controlIconStyle")}
                        cbActionClick={this.consoleLogNextWatchingCanvas}
                    />
                    <ControlItem type="PreviousIconSVG" label={formatMessage({"id":"PREVIOUS", "defaultMessage":"Previous"})}
                        compStyle={this.getStyle("controlIconStyle")}
                        cbActionClick={this.consoleLogPrevWatchingCanvas}
                    />
                  </div>
                  <div style={this.getStyle("headingStyle")}>{formatMessage({"id":"INPUT_CANVAS", "defaultMessage":"Input Canvas"})}</div>
                  <div style={this.getStyle("multiCanvasStyle")}>
                    <ControlItem type="SetIconSVG" label={formatMessage({"id":"CHAT_SET", "defaultMessage":"Set"})}
                        compStyle={this.getStyle("controlIconStyle")}
                        cbActionClick={this.consoleLogSetInputCanvas}
                    />
                    <ControlItem type="NextIconSVG" label={formatMessage({"id":"CHAT_NEXT", "defaultMessage":"Next"})}
                        compStyle={this.getStyle("controlIconStyle")}
                        cbActionClick={this.consoleLogNextInputCanvas}
                    />
                    <ControlItem type="PreviousIconSVG" label={formatMessage({"id":"PREVIOUS", "defaultMessage":"Previous"})}
                        compStyle={this.getStyle("controlIconStyle")}
                        cbActionClick={this.consoleLogPrevInputCanvas}
                    />
                  </div>
                </div>
              ) : undefined;

    // Build out the admin control panel
    return (
      <div style={this.getStyle('container')}>
        <div style={this.getStyle('column1')}>
          <div className="generalSettings">
            <div style={this.getStyle("headingStyle")}>{formatMessage({"id":"CHAT_GENERAL", "defaultMessage":"General"})}</div>
            <div style={this.getStyle("generalStyle")}>
              <ControlItem type="KickIconSVG" label={formatMessage({"id":"CHAT_KICK", "defaultMessage":"Kick"})}
                  compStyle={this.getStyle("controlIconStyle")}
                  cbActionClick={this.controlClickKick}
              />
              <ControlItem type="FullScreenIconSVG" label={formatMessage({"id":"CHAT_FLOOR", "defaultMessage":"Floor"})}
                  compStyle={this.getStyle("controlIconStyle")}
                  cbActionClick={this.controlClickVideoFloor}
              />
            <ControlItem type="UpArrowIconSVG" label={formatMessage({"id":"CHAT_TRANSFER", "defaultMessage":"Transfer"})}
                compStyle={this.getStyle("controlIconStyle")}
                cbActionClick={this.appToggleModalTransfer}
              />
            </div>
          </div>
          <div className="audioVideo">
            <div style={this.getStyle("headingStyle")}>{formatMessage({"id":"CHAT_AUDIO_VIDEO", "defaultMessage":"Audio/Video"})}</div>
            <div style={this.getStyle('audioVideoStyle')}>
              <div className="avRightCol" style={this.getStyle('volumeAndGainStyle')}>
                {micStatus}
                <ControlItem type="VolumeDownIconSVG" label={formatMessage({"id":"CHAT_TITLE_VOL_MINUS", "defaultMessage":"VOL-"})}
                    compStyle={this.getStyle("controlIconStyle")}
                    cbActionClick={this.controlClickVolumeDown}
                />
                <ControlItem type="VolumeDownIconSVG" label={formatMessage({"id":"CHAT_TITLE_GAIN_MINUS", "defaultMessage":"GAIN-"})}
                    compStyle={this.getStyle("controlIconStyle")}
                    cbActionClick={this.controlClickGainDown}
                />
              </div>
              <div className="avLeftCol" style={this.getStyle('volumeAndGainStyle')}>
                {videoStatus}
                <ControlItem type="VolumeUpIconSVG" label={formatMessage({"id":"CHAT_TITLE_VOL_PLUS", "defaultMessage":"VOL+"})}
                    compStyle={this.getStyle("controlIconStyle")}
                    cbActionClick={this.controlClickVolumeUp}
                />
                <ControlItem type="VolumeUpIconSVG" label={formatMessage({"id":"CHAT_TITLE_GAIN_PLUS", "defaultMessage":"GAIN+"})}
                    compStyle={this.getStyle("controlIconStyle")}
                    cbActionClick={this.controlClickGainUp}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bannerSettings" style={this.getStyle('bannerContainerStyle')}>
          <div style={this.getStyle("headingStyle")}>{formatMessage({"id":"CHAT_BANNER", "defaultMessage":"Banner"})}</div>
          <div style={this.getStyle("bannerStyle")}>
            <ControlItem type="StatusIconSVG" label={formatMessage({"id":"CHAT_SET", "defaultMessage":"Set"})}
                compStyle={this.getStyle("controlIconStyle")}
                cbActionClick={this.appToggleModalChat}
            />
            <ControlItem type="RemoveIconSVG" label={formatMessage({"id":"CHAT_BANNER", "defaultMessage":"Banner "})}
                compStyle={this.getStyle("controlIconStyle")}
                cbActionClick={this.controlClickResetBanner}
            />
          </div>
          <div className="canvasSettings">
            <div style={this.getStyle("headingStyle")}>{formatMessage({"id":"CHAT_CANVAS", "defaultMessage":"Canvas"})}</div>
            <div style={this.getStyle("canvasStyle")}>
              <ControlItem type="SetIconSVG" label={formatMessage({"id":"CHAT_TITLE_RESET", "defaultMessage":"Reset"})}
                  compStyle={this.getStyle("controlIconStyle")}
                  cbActionClick={this.appToggleLayoutPosition}
              />
              <ControlItem type="NextIconSVG" label={formatMessage({"id":"CHAT_NEXT", "defaultMessage":"Next"})}
                  compStyle={this.getStyle("controlIconStyle")}
                  cbActionClick={this.controlClickNextLayer}
              />
              <ControlItem type="PreviousIconSVG" label={formatMessage({"id":"PREVIOUS", "defaultMessage":"Previous"})}
                  compStyle={this.getStyle("controlIconStyle")}
                  cbActionClick={this.controlClickPrevLayer}
              />
            </div>
            {multCanvasControls}
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(AdminControls);
// reviewed on 7/13/2016
