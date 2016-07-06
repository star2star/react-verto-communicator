import React from 'react';
import { Tooltip, Origin } from 'redux-tooltip';
import VertoBaseComponent from './vertobasecomponent';
//import { FormattedMessage } from 'react-intl';

const propTypes = {
  place: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  msg: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object ]).isRequired,
  within: React.PropTypes.func,
  compStyle: React.PropTypes.object
};

export default class ToolTip extends VertoBaseComponent {
  constructor(props){
    super(props);
  }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
    };

    return styles[styleName];
  }

  render(){
    return(
      <span>
        <Origin name={this.props.name} auto={this.props.auto}>
          {this.props.children}
        </Origin>
        <Tooltip name={this.props.name} place={this.props.place} within={this.props.within} auto={this.props.auto} custStyle={this.props.custStyle}>
          {this.props.msg}
        </Tooltip>
     </span>
    );}
}

ToolTip.propTypes = propTypes;
