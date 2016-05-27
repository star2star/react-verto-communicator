import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import { StatusIconSVG } from './svgIcons';

const propTypes = {
  status: React.PropTypes.oneOf(['connected','disconnected', 'connecting']).isRequired,
  compStyle:   React.PropTypes.object
};

class VCStatus extends VertoBaseComponent {
  constructor(props) {
    super(props);
  }
  
  getCompStyle() {
    return this.props.compStyle;
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
      case 'disconnected':
        fillColor = this.getStyle('disconnectedFill');
        break;
      case 'connecting':
        fillColor = this.getStyle('connectingFill');
        break;
      case 'connected':
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
