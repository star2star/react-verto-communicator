import React from 'react';
import VertoBaseComponent from './vertobasecomponent';


const propTypes = {
  lastNumber: React.PropTypes.string,
  compStyle:   React.PropTypes.object
};

class LastCall extends VertoBaseComponent {
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
     return (<div>
              <span>{this.props.lastNumber? 'Last Call:':'No Calls Yet'}</span>
                <span>{this.props.lastNumber? this.props.lastNumber :''}</span>
             </div>);
  }
}

LastCall.propTypes = propTypes;

export default LastCall;
