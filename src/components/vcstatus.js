import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import { StatusIconSVG } from './svgIcons';
import ToolTip from './tooltip';


const propTypes = {
  status: React.PropTypes.oneOf(['connected','disconnected', 'connecting', 'active']).isRequired,
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
              width: '24px',
              height: '24px'
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
      case 'active':
        fillColor = this.getStyle('connectingFill');
        break;
      case 'connected':
        fillColor = this.getStyle('connectedFill');
        break;
      default:
        fillColor = this.getDefaultStyle('disconnectedFill');
        break;
      }

      //const theMsg="Communication Status: "+this.props.status;

      const theMsg=(<span>
        <span>Communication Status: </span>
        {this.props.status}
        <hr />
        <span style={{backgroundColor: 'green'}}>Hello World</span>
        </span>);

     return (
        <ToolTip name="vcStatus" place="bottom" msg={theMsg}>
          < StatusIconSVG svgStyle = {{...this.getStyle('svgStyle'), ...fillColor}} />
        </ToolTip>
     );
  }
}

VCStatus.propTypes = propTypes;

export default VCStatus;
