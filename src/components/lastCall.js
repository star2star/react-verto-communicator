import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import ToolTip from './tooltip';
import { injectIntl } from 'react-intl'
import { fromJS } from "immutable";


class LastCall extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.call = this.call.bind(this);
    this.state = {};
  }

  static propTypes = {
    lastNumber: React.PropTypes.string,
    labelText: React.PropTypes.string,
    cbClick: React.PropTypes.func,
    compStyle:   React.PropTypes.object,
    ttPosition: React.PropTypes.string
  };

  static filename = "lastCall";
  static displayName = "LastCall";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
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
    const { formatMessage } = this.props.intl;
    let theMsg = formatMessage({"id":"CLICK_DIAL", "defaultMessage":"Click to Dial"});
    let lastcall =  (<div onClick={this.call} style={this.getStyle('container')}>
                          <span style={this.getStyle('lastCallStyle')}>
                            {this.props.labelText}{this.props.lastNumber ? this.props.lastNumber :''}
                          </span>
                        </div>);


    if(this.props.labelText !== "No Call" && this.props.labelText !== "In Call:     "){
      lastcall = <ToolTip name="last call" place={this.props.ttPosition} msg={theMsg} custStyle={{base:{marginTop: '10px'}}}>{lastcall}</ToolTip>;
    }
    //console.log("^^^^^^^^^^^^^^^^^^^^^^^^^", lastcalll);
    return (
      lastcall
    );
  }
}

export default injectIntl(LastCall);
// reviewed on 7/13/2016
