import React from 'react';
import VertoBaseComponent from './vertobasecomponent';


const propTypes = {
  lastNumber: React.PropTypes.string,
  labelText: React.PropTypes.string,
  cbClick: React.PropTypes.func,
  compStyle:   React.PropTypes.object
};

class LastCall extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.call = this.call.bind(this);
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

  call() {
    if (this.props.cbClick) {
      this.props.cbClick(this.props.lastNumber);
    }
  }

  render() {
     return (<div onClick={this.call}>
              <span>{this.props.labelText}</span>
                <span>{this.props.lastNumber? this.props.lastNumber :''}</span>
             </div>);
  }
}

LastCall.propTypes = propTypes;

export default LastCall;
