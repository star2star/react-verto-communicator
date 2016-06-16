import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import App from './app'; // for transfer
import ControlItem from './controlItem';
import InputModal from './inputModal';
import { FormattedMessage, injectIntl } from 'react-intl';
// import {
//   KickIconSVG,  // kick
//   FullScreenIconSVG, // floor
//   UpArrowIconSVG,  // transfer
//   MicrophoneIconSVG,  // mic
//   MuteMicrophoneIconSVG, // mic
//   VideoIconSVG,  // video
//   MuteVideoIconSVG, //video
//   VolumeUpIconSVG, // vol/gain
//   VolumeDownIconSVG, // vol/gain
//   StatusIconSVG,  // set
//   RemoveIconSVG // reset
//   } from './svgIcons';

const propTypes = {
  cbControlClick : React.PropTypes.func.isRequired,
  multCanvas: React.PropTypes.bool,
  member : React.PropTypes.object.isRequired

};

export default class AdminControls extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {};
  }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      controlIconStyle: {
        svgStyle: {
          height: '30px',
          width: '30px',
          fill: 'gray',
          paddingTop: '10px'
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
        flexDirection:'column'
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
        backgroundColor: '#f3f3f3'
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

    let styleReturn = styles[styleName];
      if(this.props.style && this.props.style[styleName]) {
        styleReturn = {...styleReturn, ...this.props.style[styleName]};
      }
    return styleReturn;
  }

  render(){
    const { formatMessage } = this.props.intl;
    //this.props.multCanvas == true;
    //console.log('&&&&&& member object', this.props.member);

    // TODO - ta - Finish up Transfer component to handle transfer click
    // TODO - ta - INternationalize strings in headings
    // TODO - ta - Add new component for input of banner text
    // TODO - ta - Add new component to get 'canvasId' when setting layer
    // TODO - ta - Add real callback functions to canvas controls when available


    // Setup up based on the user status object
    const micStatus = this.props.member.conferenceStatus.audio.muted ?
            (<ControlItem type="MuteMicrophoneIconSVG" label={formatMessage({"id":"CHAT_UNMUTE_MIC", "defaultMessage":"Unmute"})}
                compStyle={this.getStyle("controlIconStyle")}
                cbActionClick={()=>{this.props.cbControlClick("MUTEMIC", [this.props.member.memberId]);}}
            />) :
            (<ControlItem type="MicrophoneIconSVG" label={formatMessage({"id":"CHAT_MUTE_MIC", "defaultMessage":"Mute"})}
                compStyle={this.getStyle("controlIconStyle")}
                cbActionClick={()=>{this.props.cbControlClick("MUTEMIC", [this.props.member.memberId]);}}
            />);

    const videoStatus = this.props.member.conferenceStatus.video.muted ?
            (<ControlItem type="MuteVideoIconSVG" label={formatMessage({"id":"CHAT_UNMUTE_MIC", "defaultMessage":"Unmute"})}
                compStyle={this.getStyle("controlIconStyle")}
                cbActionClick={()=>{this.props.cbControlClick("MUTEVIDEO", [this.props.member.memberId]);}}
            />) :
            (<ControlItem type="VideoIconSVG" label={formatMessage({"id":"CHAT_MUTE_MIC", "defaultMessage":"Mute"})}
                compStyle={this.getStyle("controlIconStyle")}
                cbActionClick={()=>{this.props.cbControlClick("MUTEVIDEO", [this.props.member.memberId]);}}
            />);


      // Setup JSX for controls that only appear with multiple canvas
      const multCanvasControls = this.props.multCanvas ?
              (
                <div className="multCanvasControls">
                  <div style={this.getStyle("headingStyle")}>{formatMessage({"id":"WATCHING_CANVAS", "defaultMessage":"Watching Canvas"})}</div>
                  <div style={this.getStyle("multiCanvasStyle")}>
                    <ControlItem type="SetIconSVG" label={formatMessage({"id":"CHAT_SET", "defaultMessage":"Set"})}
                        compStyle={this.getStyle("controlIconStyle")}
                        cbActionClick={()=>{console.log('Set Watching Canvas');}}
                    />
                    <ControlItem type="NextIconSVG" label={formatMessage({"id":"CHAT_NEXT", "defaultMessage":"Next"})}
                        compStyle={this.getStyle("controlIconStyle")}
                        cbActionClick={()=>{console.log('Next Watching Canvas');}}
                    />
                    <ControlItem type="PreviousIconSVG" label="PREVIOUS"
                        compStyle={this.getStyle("controlIconStyle")}
                        cbActionClick={()=>{console.log('Prev Watching Canvas');}}
                    />
                  </div>
                  <div style={this.getStyle("headingStyle")}>{formatMessage({"id":"INPUT_CANVAS", "defaultMessage":"Input Canvas"})}</div>
                  <div style={this.getStyle("multiCanvasStyle")}>
                    <ControlItem type="SetIconSVG" label={formatMessage({"id":"CHAT_SET", "defaultMessage":"Set"})}
                        compStyle={this.getStyle("controlIconStyle")}
                        cbActionClick={()=>{console.log('Set Input Canvas');}}
                    />
                    <ControlItem type="NextIconSVG" label={formatMessage({"id":"CHAT_NEXT", "defaultMessage":"Next"})}
                        compStyle={this.getStyle("controlIconStyle")}
                        cbActionClick={()=>{console.log('Next Input Canvas');}}
                    />
                    <ControlItem type="PreviousIconSVG" label="PREVIOUS"
                        compStyle={this.getStyle("controlIconStyle")}
                        cbActionClick={()=>{console.log('Prev Input Canvas');}}
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
                  cbActionClick={()=>{this.props.cbControlClick("KICK", [this.props.member.memberId]);}}
              />
              <ControlItem type="FullScreenIconSVG" label={formatMessage({"id":"CHAT_FLOOR", "defaultMessage":"Floor"})}
                  compStyle={this.getStyle("controlIconStyle")}
                  cbActionClick={()=>{this.props.cbControlClick("VIDEOFLOOR", [this.props.member.memberId]);}}
              />
              <ControlItem type="UpArrowIconSVG" label="TRANSFER"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbActionClick={()=>{
                    App.toggleModal((
                      <InputModal cbClose={App.toggleModal}
                          title={formatMessage({"id":"TITLE_TRANSFER", "defaultMessage":"Transfer Party?"})}
                          label={formatMessage({"id":"LABEL_TRANSFER", "defaultMessage":"Destination"})}
                          message={formatMessage({"id":"MESSAGE_TRANSFER", "defaultMessage":"To what destination would you like to transfer this call?"})}
                          placeholder={formatMessage({"id":"LABEL_TRANSFER", "defaultMessage":"Destination"})}
                          cbSubmit={(dest)=>{
                              this.props.cbControlClick("TRANSFER", [this.props.member.memberId, dest]);

                          }}
                      />));
                  }}
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
                    cbActionClick={()=>{this.props.cbControlClick("VOLUMEDOWN", [this.props.member.memberId]);}}
                />
                <ControlItem type="VolumeDownIconSVG" label={formatMessage({"id":"CHAT_TITLE_GAIN_MINUS", "defaultMessage":"GAIN-"})}
                    compStyle={this.getStyle("controlIconStyle")}
                    cbActionClick={()=>{this.props.cbControlClick("GAINDOWN", [this.props.member.memberId]);}}
                />
              </div>
              <div className="avLeftCol" style={this.getStyle('volumeAndGainStyle')}>
                {videoStatus}
                <ControlItem type="VolumeUpIconSVG" label={formatMessage({"id":"CHAT_TITLE_VOL_PLUS", "defaultMessage":"VOL+"})}
                    compStyle={this.getStyle("controlIconStyle")}
                    cbActionClick={()=>{this.props.cbControlClick("VOLUMEUP", [this.props.member.memberId]);}}
                />
                <ControlItem type="VolumeUpIconSVG" label={formatMessage({"id":"CHAT_TITLE_GAIN_PLUS", "defaultMessage":"GAIN+"})}
                    compStyle={this.getStyle("controlIconStyle")}
                    cbActionClick={()=>{this.props.cbControlClick("GAINUP", [this.props.member.memberId]);}}
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
                cbActionClick={()=>{
                  App.toggleModal((
                    <InputModal cbClose={App.toggleModal}
                        title={formatMessage({"id":"CHAT_BANNER", "defaultMessage":"Banner "})}
                        label={formatMessage({"id":"TITLE_INSERT_BANNER", "defaultMessage":"Please insert the banner text "})}
                        placeholder={formatMessage({"id":"CHAT_BANNER", "defaultMessage":"Banner "})}
                        cbSubmit={(text)=>{
                            this.props.cbControlClick("BANNER", [this.props.member.memberId, text]);
                          }
                        }
                    />));
                }
              }
            />
            <ControlItem type="RemoveIconSVG" label={formatMessage({"id":"CHAT_BANNER", "defaultMessage":"Banner "})}
                compStyle={this.getStyle("controlIconStyle")}
                cbActionClick={()=>{this.props.cbControlClick("RESETBANNER", [this.props.member.memberId, 'reset']);}}
            />
          </div>
          <div className="canvasSettings">
            <div style={this.getStyle("headingStyle")}>{formatMessage({"id":"CHAT_CANVAS", "defaultMessage":"Canvas"})}</div>
            <div style={this.getStyle("canvasStyle")}>
              <ControlItem type="SetIconSVG" label={formatMessage({"id":"CHAT_TITLE_RESET", "defaultMessage":"Reset"})}
                  compStyle={this.getStyle("controlIconStyle")}
                  cbActionClick={()=>{
                    App.toggleModal((
                      <InputModal cbClose={App.toggleModal}
                          title="Set Layout Position"
                          label="Please enter layout position"
                          placeholder="Layout position"
                          cbSubmit={(value)=>{
                              this.props.cbControlClick("SETLAYER", ['vid-layer', this.props.member.memberId, value.toString()]);
                            }
                          }
                      />));
                  }}
              />
              <ControlItem type="NextIconSVG" label={formatMessage({"id":"CHAT_NEXT", "defaultMessage":"Next"})}
                  compStyle={this.getStyle("controlIconStyle")}
                  cbActionClick={()=>{this.props.cbControlClick("NEXTLAYER", ['vid-layer', this.props.member.memberId, 'next']);}}
              />
              <ControlItem type="PreviousIconSVG" label="PREVIOUS"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbActionClick={()=>{this.props.cbControlClick("PREVLAYER", ['vid-layer', this.props.member.memberId, 'prev']);}}
              />
            </div>
            {multCanvasControls}
          </div>
        </div>
      </div>
    );
  }
}

AdminControls.propTypes = propTypes;
export default injectIntl(AdminControls);
