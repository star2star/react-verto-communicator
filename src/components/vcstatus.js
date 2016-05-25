import React from 'react';
import VertoBaseComponent from './vertobase';
import { MenuIconSVG } from './svgIcons';

// TODO: SVG from design
const propTypes = {
  status: React.PropTypes.oneOf(['Connected','Disconnected', 'Connecting']).isRequired,
  Style:   React.PropTypes.object
};
class VCStatus extends VertoBaseComponent {
  constructor(props) {
    super(props);
    console.log('^^^^^^^', this.getClassName());
  }
  getDefaultStyle(styleName) {
      const styles = {
            svgStyle: {
              width: '25px',
              height: '25px'
            },
            disconnectedFill: {
              fill: "red"
            },
            connectingFill: {
              fill: "yellow"
            },
            connectedFill: {
              fill: "green"
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

     return (< MenuIconSVG svgStyle = {{...this.getStyle('svgStyle'), ...fillColor}} />);
  }
}

VCStatus.propTypes = propTypes;

export default VCStatus;
