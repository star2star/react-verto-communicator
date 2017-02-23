import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import ListSelect from './list-select';
import ControlItem from './controlItem';
import ToolTip from './tooltip';
import { injectIntl } from 'react-intl';
import { fromJS } from "immutable";


class AdminVideoControls extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {showLayoutList: false};

    this.handleShowLayoutList = this.handleShowLayoutList.bind(this);
    this.setVideoModeShowLayoutList = this.setVideoModeShowLayoutList.bind(this);
  }

  static propTypes = {
    cbPlay : React.PropTypes.func,
    cbStop : React.PropTypes.func,
    cbRecord : React.PropTypes.func,
    cbStopRecord : React.PropTypes.func,
    cbSnapshot : React.PropTypes.func, // not currently supported
    cbSetVideoMode : React.PropTypes.func,
    currLayout: React.PropTypes.array,
    layouts: React.PropTypes.array
  };

  static defaultProps = {
    cbPlay : ()=>{},
    cbStop : ()=>{},
    cbRecord : ()=>{},
    cbStopRecord : ()=>{},
    cbSetVideoMode : ()=>{}
  };

  static filename = "vidControlsAdmin";
  static displayName = "AdminVideoControls";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
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
      layoutContainerStyle: {
        position: 'absolute',
        bottom: '10px',
        border: '1px solid #686868',
        borderRadius: '5px',
        maxHeight: '200px',
        overflowX: 'auto',
        backgroundColor: '#fff',
        //width: '210px', //TODO -ta content should push width, but it's overflowing.... need to look into
        fontSize: '12px'
      },
      adminControlsStyle: {
        display: 'flex',
        justifyContent: 'space-around',
        flex: '1'
      }
    };

    return styles[styleName];
  }

  handleShowLayoutList() {
    this.setState({...this.state, showLayoutList: !this.state.showLayoutList});
  }

  setVideoModeShowLayoutList(layoutIndex){
    // function expects an array of params...
    this.props.cbSetVideoMode([this.props.layouts[layoutIndex]]);
    this.setState({...this.state, showLayoutList: false});
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
    // Recording not in this version....

    let layoutList;
    if (this.props.layouts && this.props.currLayout) {
      layoutList = (
        <ListSelect items={this.props.layouts}
            selected={[this.props.layouts.indexOf(this.props.currLayout[0].layoutName)]}
            cbChange={this.setVideoModeShowLayoutList}
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
    const { formatMessage } = this.props.intl;
    const playMsg = formatMessage({"id":"MESSAGE_PLAY", "defaultMessage":"Play"});
    const stopMsg = formatMessage({"id":"MESSAGE_STOP", "defaultMessage":"Stop"});
    const recMsg = formatMessage({"id":"MESSAGE_RECORD", "defaultMessage":"Record"});
    const stoprecMsg = formatMessage({"id":"MESSAGE_STOP_RECORD", "defaultMessage":"Stop Record"});
    const snapMsg = formatMessage({"id":"MESSAGE_SNAPSHOT", "defaultMessage":"Snapshot"});
    const modeMsg = formatMessage({"id":"MESSAGE_VIDEO_MODE", "defaultMessage":"Video Mode"});
    return (
      <div style={this.getStyle('adminControlsStyle')}>
        <ToolTip name="play" place='top' msg={playMsg}>
          <ControlItem type="PlayIconSVG"
              compStyle={this.getStyle("controlIconStyle")}
              cbActionClick={this.props.cbPlay}
          />
        </ToolTip>
        <ToolTip name="stop" place='top' msg={stopMsg}>
          <ControlItem type="StopIconSVG"
              compStyle={this.getStyle("controlIconStyle")}
              cbActionClick={this.props.cbStop}
          />
        </ToolTip>
        <ToolTip name="record" place='top' msg={recMsg}>
          <ControlItem type="StatusIconSVG"
              compStyle={this.getStyle("controlIconStyle")}
              cbActionClick={this.props.cbRecord}
          />
        </ToolTip>
        <ToolTip name="stoprecord" place='top' msg={stoprecMsg}>
          <ControlItem type="RoswellSVG"
              compStyle={this.getStyle("controlIconStyle")}
              cbActionClick={this.props.cbStopRecord}
          />
        </ToolTip>
        <ToolTip name="snapshot" place='top' msg={snapMsg}>
          <ControlItem type="SnapshotIconSVG"
              compStyle={this.getStyle("controlIconStyle")}
              cbActionClick={this.props.cbSnapshot}
          />
        </ToolTip>
        <ToolTip name="videomode" place='top' msg={modeMsg}>
          <ControlItem type="VideoModeIconSVG"
              compStyle={this.getStyle("controlIconStyle")}
              cbActionClick={this.handleShowLayoutList}
          />
        </ToolTip>
        {layoutContainer}

      </div>
    );
  }
}


export default injectIntl(AdminVideoControls);
// reviewed on 7/14/2016
