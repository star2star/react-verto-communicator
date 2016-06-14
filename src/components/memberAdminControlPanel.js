import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import App from './app'; // for transfer
import ControlItem from './controlItem';
import InputModal from './inputModal';
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

  render(){
    //console.log('&&&&&& member object', this.props.member);

    // TODO - ta - Finish up Transfer component to handle transfer click
    // TODO - ta - INternationalize strings in headings
    // TODO - ta - Add new component for input of banner text
    // TODO - ta - Add new component to get 'canvasId' when setting layer
    // TODO - ta - Add real callback functions to canvas controls when available


    // Setup up based on the user status object
    const micStatus = this.props.member.conferenceStatus.audio.muted ?
            (<ControlItem type="MuteMicrophoneIconSVG" label="UNMUTE"
                compStyle={this.getStyle("controlIconStyle")}
                cbActionClick={()=>{this.props.cbControlClick("MUTEMIC", [this.props.member.memberId]);}}
            />) :
            (<ControlItem type="MicrophoneIconSVG" label="MUTE"
                compStyle={this.getStyle("controlIconStyle")}
                cbActionClick={()=>{this.props.cbControlClick("MUTEMIC", [this.props.member.memberId]);}}
            />);

    const videoStatus = this.props.member.conferenceStatus.video.muted ?
            (<ControlItem type="MuteVideoIconSVG" label="UNMUTE"
                compStyle={this.getStyle("controlIconStyle")}
                cbActionClick={()=>{this.props.cbControlClick("MUTEVIDEO", [this.props.member.memberId]);}}
            />) :
            (<ControlItem type="VideoIconSVG" label="MUTE"
                compStyle={this.getStyle("controlIconStyle")}
                cbActionClick={()=>{this.props.cbControlClick("MUTEVIDEO", [this.props.member.memberId]);}}
            />);


      // Setup JSX for controls that only appear with multiple canvas
      const multCanvasControls = this.props.multCanvas ?
              (
                <div className="multCanvasControls">
                  <div style={this.getStyle("headingStyle")}>WATCHING CANVAS</div>
                  <div style={{display: 'flex'}}>
                    <ControlItem type="KickIconSVG" label="SET"
                        compStyle={this.getStyle("controlIconStyle")}
                        cbActionClick={()=>{console.log('Set Watching Canvas');}}
                    />
                    <ControlItem type="KickIconSVG" label="NEXT"
                        compStyle={this.getStyle("controlIconStyle")}
                        cbActionClick={()=>{console.log('Next Watching Canvas');}}
                    />
                    <ControlItem type="KickIconSVG" label="PREVIOUS"
                        compStyle={this.getStyle("controlIconStyle")}
                        cbActionClick={()=>{console.log('Prev Watching Canvas');}}
                    />
                  </div>
                  <div style={this.getStyle("headingStyle")}>INPUT CANVAS</div>
                  <div style={{display: 'flex'}}>
                    <ControlItem type="KickIconSVG" label="SET"
                        compStyle={this.getStyle("controlIconStyle")}
                        cbActionClick={()=>{console.log('Set Input Canvas');}}
                    />
                    <ControlItem type="KickIconSVG" label="NEXT"
                        compStyle={this.getStyle("controlIconStyle")}
                        cbActionClick={()=>{console.log('Next Input Canvas');}}
                    />
                    <ControlItem type="KickIconSVG" label="PREVIOUS"
                        compStyle={this.getStyle("controlIconStyle")}
                        cbActionClick={()=>{console.log('Prev Input Canvas');}}
                    />
                  </div>
                </div>
              ) : undefined;

    // Build out the admin control panel
    return (
      <div style={{display: 'flex', backgroundColor: '#f3f3f3'}}>
        <div style={{display: 'flex', flexDirection: 'column', flex: '1', border:'1px solid #e9e9e9'}}>
          <div className="generalSettings">
            <div style={this.getStyle("headingStyle")}>GENERAL</div>
            <div style={{display: 'flex'}}>
              <ControlItem type="KickIconSVG" label="KICK"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbActionClick={()=>{this.props.cbControlClick("KICK", [this.props.member.memberId]);}}
              />
              <ControlItem type="FullScreenIconSVG" label="FLOOR"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbActionClick={()=>{this.props.cbControlClick("VIDEOFLOOR", [this.props.member.memberId]);}}
              />
              <ControlItem type="UpArrowIconSVG" label="TRANSFER"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbActionClick={()=>{
                    App.toggleModal((
                      <InputModal cbClose={App.toggleModal}
                          title="Transfer party?"
                          label="Desintation"
                          message="To what destination would you like to transfer this call?"
                          placeholder="Destination"
                          cbSubmit={(dest)=>{
                              this.props.cbControlClick("TRANSFER", [this.props.member.memberId, dest]);

                          }}
                      />));
                  }}
              />
            </div>
          </div>
          <div className="audioVideo">
            <div style={this.getStyle("headingStyle")}>AUDIO/VIDEO</div>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <div className="avRightCol" style={{display:'flex', flexDirection:'column'}}>
                {micStatus}
                <ControlItem type="VolumeDownIconSVG" label="Vol-"
                    compStyle={this.getStyle("controlIconStyle")}
                    cbActionClick={()=>{this.props.cbControlClick("VOLUMEDOWN", [this.props.member.memberId]);}}
                />
                <ControlItem type="VolumeDownIconSVG" label="Gain-"
                    compStyle={this.getStyle("controlIconStyle")}
                    cbActionClick={()=>{this.props.cbControlClick("GAINDOWN", [this.props.member.memberId]);}}
                />
              </div>
              <div className="avLeftCol" style={{display:'flex', flexDirection:'column'}}>
                {videoStatus}
                <ControlItem type="VolumeUpIconSVG" label="Vol+"
                    compStyle={this.getStyle("controlIconStyle")}
                    cbActionClick={()=>{this.props.cbControlClick("VOLUMEUP", [this.props.member.memberId]);}}
                />
                <ControlItem type="VolumeUpIconSVG" label="Gain+"
                    compStyle={this.getStyle("controlIconStyle")}
                    cbActionClick={()=>{this.props.cbControlClick("GAINUP", [this.props.member.memberId]);}}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bannerSettings" style={{flex: '1', border:'1px solid #e9e9e9'}}>
          <div style={this.getStyle("headingStyle")}>BANNER</div>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <ControlItem type="StatusIconSVG" label="Set"
                compStyle={this.getStyle("controlIconStyle")}
                cbActionClick={()=>{
                  App.toggleModal((
                    <InputModal cbClose={App.toggleModal}
                        title="Banner Text"
                        label="Please insert the banner text"
                        placeholder="Banner Text"
                        cbSubmit={(text)=>{
                            this.props.cbControlClick("BANNER", [this.props.member.memberId, text]);
                          }
                        }
                    />));
                }
              }
            />
            <ControlItem type="RemoveIconSVG" label="Reset"
                compStyle={this.getStyle("controlIconStyle")}
                cbActionClick={()=>{this.props.cbControlClick("RESETBANNER", [this.props.member.memberId]);}}
            />
          </div>
          <div className="canvasSettings">
            <div style={this.getStyle("headingStyle")}>CANVAS</div>
            <div style={{display: 'flex'}}>
              <ControlItem type="KickIconSVG" label="SET"
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
              <ControlItem type="KickIconSVG" label="NEXT"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbActionClick={()=>{this.props.cbControlClick("NEXTLAYER", ['vid-layer', this.props.member.memberId, 'next']);}}
              />
              <ControlItem type="KickIconSVG" label="PREVIOUS"
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
