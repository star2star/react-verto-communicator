import React from 'react';
import VertoBaseComponent from './vertobase';
import { StatusIconSVG } from './svgIcons';

const propTypes = {
  status: React.PropTypes.oneOf(['Connected','Disconnected', 'Connecting']).isRequired,
  Style:   React.PropTypes.object
};
class VCStatus extends VertoBaseComponent {
  constructor(props) {
    super(props);
  }
  getDefaultStyle(styleName) {
      const styles = {
            svgStyle: {
              width: '25px',
              height: '25px'
            },
            disconnectedFill: {
              fill: "#F45A5A"
            },
            connectingFill: {
              fill: "#F7D965"
            },
            connectedFill: {
              fill: "#4ACF55"
      }
  };
      return (styles[styleName]);
  }
  render() {
    let fillColor;
    switch (this.props.status) {
      case 'Disconnected':
        fillColor = this.getStyle('disconnectedFill');
        break;
      case 'Connecting':
        fillColor = this.getStyle('connectingFill');
        break;
      case 'Connected':
        fillColor = this.getStyle('connectedFill');
        break;
      default:
        fillColor = this.getDefaultStyle('disconnectedFill');
        break;
      }

     return (< StatusIconSVG svgStyle = {{...this.getStyle('svgStyle'), ...fillColor}} />);
  }
}

VCStatus.propTypes = propTypes;

export default VCStatus;
