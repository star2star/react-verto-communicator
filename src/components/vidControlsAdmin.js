import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import InputModal from './inputModal';
import ListSelect from './list-select';
import ControlItem from './controlItem';


const propTypes = {
  cbPlay : React.PropTypes.func.isRequired,
  cbStop : React.PropTypes.func.isRequired,
  cbRecord : React.PropTypes.func.isRequired,
  cbStopRecord : React.PropTypes.func.isRequired,
  cbSnapshot : React.PropTypes.func.isRequired,
  cbSetVideoMode : React.PropTypes.func.isRequired,
  currLayout: React.PropTypes.array,
  layouts: React.PropTypes.array
};

export default class AdminVideoControls extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {showLayoutList: false};

    this.handleShowLayoutList = this.handleShowLayoutList.bind(this);
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

      },
      layoutContainerStyle: {
        position: 'absolute',
        bottom: '10px',
        border: '1px solid #686868',
        borderRadius: '5px',
        maxHeight: '200px',
        overflowX: 'auto',
        backgroundColor: '#fff',
        width: '210px', //TODO -ta content should push width, but it's overflowing.... need to look into
        fontSize: '12px'
      }
    };

    let styleReturn = styles[styleName];
      if(this.props.style && this.props.style[styleName]) {
        styleReturn = {...styleReturn, ...this.props.style[styleName]};
      }
    return styleReturn;
  }

  handleShowLayoutList() {
    this.setState({...this.state, showLayoutList: !this.state.showLayoutList});
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

    let layoutList;
    if (this.props.layouts && this.props.currLayout) {
      layoutList = (
        <ListSelect items={this.props.layouts}
            selected={[this.props.layouts.indexOf(this.props.currLayout[0].layoutName)]}
            cbChange={(layoutIndex)=>{
              // function expects an array of params...
              this.props.cbSetVideoMode([this.props.layouts[layoutIndex]]);
              this.setState({...this.state, showLayoutList: false});
            }}
         />
      );
    }

    const layoutContainer = this.state.showLayoutList ? (
              <div className="layouts" style={this.getStyle("layoutContainerStyle")}>
                {layoutList}
              </div>
            ) :
            undefined;

    // Build out the admin control panel
    // TODO ta - add inputmodals to collect file name info where appropriate
    // Do we need to retain file info for calls into VertoServices to stop play/record?
    // Does play button become 'pause' when playing a file?  Can VertoServices resume
    // playing from pause point?
    return (
      <div style={{display: 'flex', position: 'relative'}}>
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
            cbActionClick={this.handleShowLayoutList}
        />
        {layoutContainer}

      </div>
    );
  }
}

AdminVideoControls.propTypes = propTypes;
