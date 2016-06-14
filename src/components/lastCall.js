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
            lastCallStyle: {
              paddingLeft: '10px',
              paddingRight: '20px'
            },
            container: {
              cursor: (this.props.cbClick ? 'pointer':'auto')
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



     return (<div onClick={this.call} style={this.getStyle('container')}>
              <span>{this.props.labelText}</span>
                <span style={this.getStyle('lastCallStyle')}>{this.props.lastNumber? this.props.lastNumber :''}</span>
             </div>);
  }
}

LastCall.propTypes = propTypes;

export default LastCall;
