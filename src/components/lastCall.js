import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import ToolTip from './tooltip';


const propTypes = {
  lastNumber: React.PropTypes.string,
  labelText: React.PropTypes.string,
  cbClick: React.PropTypes.func,
  compStyle:   React.PropTypes.object,
  ttPosition: React.PropTypes.string
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
    const theMsg = "Click To Dial";
    let lastcall =  (<div onClick={this.call} style={this.getStyle('container')}>
                          <span style={this.getStyle('lastCallStyle')}>
                            {this.props.labelText}{this.props.lastNumber ? this.props.lastNumber :''}
                          </span>
                        </div>);


    if(this.props.labelText == "No Call" || this.props.labelText == "In Call:     "){

    }else{
      lastcall = <ToolTip name="last call" place={this.props.ttPosition} msg={theMsg}>{lastcall}</ToolTip>;
    }
    //console.log("^^^^^^^^^^^^^^^^^^^^^^^^^", lastcalll);
    return (
      lastcall
    );
  }
}

LastCall.propTypes = propTypes;

export default LastCall;
