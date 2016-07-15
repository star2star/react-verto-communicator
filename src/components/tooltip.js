import React from 'react';
import { Tooltip, Origin } from 'redux-tooltip';
import VertoBaseComponent from './vertobasecomponent';

const propTypes = {
  auto: React.PropTypes.boolean,
  place: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  msg: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object ]).isRequired,
  within: React.PropTypes.func,
  compStyle: React.PropTypes.object
};

class ToolTip extends VertoBaseComponent {
  constructor(props){
    super(props);
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
export default ToolTip;
// reviewed on 7/14/2016
