import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import ControlItem from './controlItem';
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

    // TODO ta -  get the user status info in object format instead of string
    // Setup up baed on the user status object (this.props.member[4])
    // Setup up based on the user status object
    const micStatus = this.props.member.conferenceStatus.audio.muted ?
            (<ControlItem type="MuteMicrophoneIconSVG" label="UNMUTE"
                compStyle={this.getStyle("controlIconStyle")}
                cbClick={()=>{console.log('UNMUTE Mic');}}
            />) :
            (<ControlItem type="MicrophoneIconSVG" label="MUTE"
                compStyle={this.getStyle("controlIconStyle")}
                cbClick={()=>{console.log('MUTE Mic');}}
            />);

    const videoStatus = this.props.member.conferenceStatus.video.muted ?
            (<ControlItem type="MuteVideoIconSVG" label="UNMUTE"
                compStyle={this.getStyle("controlIconStyle")}
                cbClick={()=>{console.log('UNMUTE Video');}}
            />) :
            (<ControlItem type="VideoIconSVG" label="MUTE"
                compStyle={this.getStyle("controlIconStyle")}
                cbClick={()=>{console.log('MUTE Video');}}
            />);

    return (
      <div style={{display: 'flex', backgroundColor: '#f3f3f3'}}>
        <div style={{display: 'flex', flexDirection: 'column', flex: '1', border:'1px solid #e9e9e9'}}>
          <div className="generalSettings">
            <div style={this.getStyle("headingStyle")}>GENERAL</div>
            <div style={{display: 'flex'}}>
              <ControlItem type="KickIconSVG" label="KICK"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbClick={()=>{console.log('KICK');}}
              />
              <ControlItem type="FullScreenIconSVG" label="FLOOR"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbClick={()=>{console.log('FLOOR');}}
              />
              <ControlItem type="UpArrowIconSVG" label="TRANSFER"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbClick={()=>{console.log('TRANSFER');}}
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
                    cbClick={()=>{console.log('Vol-');}}
                />
                <ControlItem type="VolumeDownIconSVG" label="Gain-"
                    compStyle={this.getStyle("controlIconStyle")}
                    cbClick={()=>{console.log('Gain-');}}
                />
              </div>
              <div className="avLeftCol" style={{display:'flex', flexDirection:'column'}}>
                {videoStatus}
                <ControlItem type="VolumeUpIconSVG" label="Vol+"
                    compStyle={this.getStyle("controlIconStyle")}
                    cbClick={()=>{console.log('Vol+');}}
                />
                <ControlItem type="VolumeUpIconSVG" label="Gain+"
                    compStyle={this.getStyle("controlIconStyle")}
                    cbClick={()=>{console.log('Gain+');}}
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
                cbClick={()=>{console.log('Set');}}
            /><ControlItem type="RemoveIconSVG" label="Reset"
                compStyle={this.getStyle("controlIconStyle")}
                cbClick={()=>{console.log('Reset');}}
            />
          </div>
          <div className="canvasSettings">
            <div style={this.getStyle("headingStyle")}>LAYER POSITION</div>
            <div style={{display: 'flex'}}>
              <ControlItem type="KickIconSVG" label="SET"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbClick={()=>{console.log('Set Layer Position');}}
              />
              <ControlItem type="KickIconSVG" label="NEXT"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbClick={()=>{console.log('Next Layer Position');}}
              />
              <ControlItem type="KickIconSVG" label="PREVIOUS"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbClick={()=>{console.log('Prev Layer Position');}}
              />
            </div>
            <div style={this.getStyle("headingStyle")}>WATCHING CANVAS</div>
            <div style={{display: 'flex'}}>
              <ControlItem type="KickIconSVG" label="SET"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbClick={()=>{console.log('Set Watching Canvas');}}
              />
              <ControlItem type="KickIconSVG" label="NEXT"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbClick={()=>{console.log('Next Watching Canvas');}}
              />
              <ControlItem type="KickIconSVG" label="PREVIOUS"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbClick={()=>{console.log('Prev Watching Canvas');}}
              />
            </div>
            <div style={this.getStyle("headingStyle")}>INPUT CANVAS</div>
            <div style={{display: 'flex'}}>
              <ControlItem type="KickIconSVG" label="SET"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbClick={()=>{console.log('Set Input Canvas');}}
              />
              <ControlItem type="KickIconSVG" label="NEXT"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbClick={()=>{console.log('Next Input Canvas');}}
              />
              <ControlItem type="KickIconSVG" label="PREVIOUS"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbClick={()=>{console.log('Prev Input Canvas');}}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AdminControls.propTypes = propTypes;
