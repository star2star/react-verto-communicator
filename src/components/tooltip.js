import React from 'react';
import { Tooltip, Origin } from 'redux-tooltip';
import VertoBaseComponent from './vertobasecomponent';
import { fromJS } from "immutable";


class ToolTip extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {};
  }

  static propTypes = {
    auto: React.PropTypes.bool,
    place: React.PropTypes.string,
    name: React.PropTypes.string,
    msg: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.object ]),
    within: React.PropTypes.func,
    compStyle: React.PropTypes.object
  };

  static defaultProps = {
    place: 'notAvailable',
    name: 'notAvailable',
    msg: 'notAvailable'
  };

  static filename = "tooltip";
  static displayName = "ToolTip";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  getDefaultStyle(styleName) {
    const styles = {};

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

export default ToolTip;
// reviewed on 7/14/2016
