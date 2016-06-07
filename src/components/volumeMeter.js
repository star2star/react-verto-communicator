import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import { MicrophoneIconSVG } from './svgIcons';



const propTypes = {
  compStyle: React.PropTypes.object,
  volumeLevel: React.PropTypes.number.isRequired
};
class VolumeMeter extends VertoBaseComponent{
  constructor(props) {
    super(props);
  }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      volMeterStyles: {
        display: 'flex',
        flexDirection: 'column'
      },
      segmentOffStyle: {
        border: 'solid 1px #ccc',
        borderRadius: '3px',
        height: '5px',
        width: '20px'
      },
      segmentOnStyle: {
        border: 'solid 1px #ccc',
        borderRadius: '3px',
        height: '5px',
        width: '20px',
        backgroundColor: '#ccc'
      },
      svgMicStyle: {
          width: '20px',
          height: '20px',
          fill: '#ccc'

      }
    };

    return (styles[styleName]);
  }

  render() {
    let volSegArray = [5,4,3,2,1];
    volSegArray = volSegArray.map((segment)=>{
      if (this.props.volumeLevel > (segment-1) * 20 +1) {
        return (
          <div className="volSegment" key={segment} style={this.getStyle("segmentOnStyle")}></div>
        );
      } else {
        return (
          <div className="volSegment" key={segment} style={this.getStyle("segmentOffStyle")}></div>
        );
      }
    });

    return (
      <div className="volMeter" style={this.getStyle("volMeterStyles")}>
        {volSegArray}
        <MicrophoneIconSVG svgStyle={this.getStyle("svgMicStyle")} />
      </div>

    );
  }
}

VolumeMeter.propTypes = propTypes;

export default VolumeMeter;
