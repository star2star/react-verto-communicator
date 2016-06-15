import React from 'react';
import { Tooltip, Origin } from 'redux-tooltip';
import VertoBaseComponent from './vertobasecomponent';
import { FormattedMessage } from 'react-intl';

const propTypes = {
  place: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  msg: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object ]).isRequired,
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

    let styleReturn = styles[styleName];
    if(this.props.style && this.props.style[styleName]) {
      styleReturn = {...styleReturn, ...this.props.style[styleName]};
    }
    return styleReturn;
  }

  render(){
    return(
      <span>
       <Origin name={this.props.name}>
        {this.props.children}
       </Origin>
       <Tooltip name={this.props.name} place={this.props.place}>{this.props.msg}</Tooltip>
     </span>
    );
  }
}

ToolTip.propTypes = propTypes;
