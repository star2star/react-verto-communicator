import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import InputModal from './inputModal';
import ControlItem from './controlItem';


const propTypes = {
  cbPlay : React.PropTypes.func.isRequired,
  cbStop : React.PropTypes.func.isRequired,
  cbRecord : React.PropTypes.func.isRequired,
  cbStopRecord : React.PropTypes.func.isRequired,
  cbSnapshot : React.PropTypes.func.isRequired,
  cbSetVideoMode : React.PropTypes.func.isRequired,
  userConfStatus: React.PropTypes.object.isRequired

};

export default class UserVideoControls extends VertoBaseComponent {
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
    // TODO - ta - if we know we are recording, will icon svg be changed?
    // if so, check the state and set it up here like this...
    // const micStatus = this.props.userConfStatus.audio.muted ?
    //         (<ControlItem type="MuteMicrophoneIconSVG"
    //             compStyle={this.getStyle("controlIconStyle")}
    //             cbActionClick={this.props.cbMicMute}
    //         />) :
    //         (<ControlItem type="MicrophoneIconSVG"
    //             compStyle={this.getStyle("controlIconStyle")}
    //             cbActionClick={this.props.cbMicMute}
    //         />);

    // Build out the admin control panel
    return (
      <div style={{display: 'flex'}}>
        <ControlItem type="PlayIconSVG"
            compStyle={this.getStyle("controlIconStyle")}
            cbActionClick={this.props.cbPlay}
        />
        <ControlItem type="StopIconSVG"
            compStyle={this.getStyle("controlIconStyle")}
            cbActionClick={this.props.cbStop}
        />
        <ControlItem type="StatusIconSVG"
            compStyle={this.getStyle("controlIconStyle")}
            cbActionClick={this.props.cbRecord}
        />
        <ControlItem type="RoswellSVG"
            compStyle={this.getStyle("controlIconStyle")}
            cbActionClick={this.props.cbStopRecord}
        />
        <ControlItem type="SnapshotIconSVG"
            compStyle={this.getStyle("controlIconStyle")}
            cbActionClick={this.props.cbSnapshot}
        />
        <ControlItem type="VideoModeIconSVG"
            compStyle={this.getStyle("controlIconStyle")}
            cbActionClick={this.props.cbSetVideoMode}
        />

      </div>
    );
  }
}

UserVideoControls.propTypes = propTypes;
