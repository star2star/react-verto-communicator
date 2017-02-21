import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import { fromJS } from "immutable";



class Badge extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {};
  }

  static propTypes = {
    compStyle: React.PropTypes.object,
    cbClick : React.PropTypes.func,
    count : React.PropTypes.number
  };

  static filename = "badge";
  static displayName = "Badge";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  getDefaultStyle(styleName) {
    const styles = {
      badgeStyles: {
        zIndex: '3',
        margin: '5px',
        backgroundColor: '#D0021B',
        borderRadius: '75px',
        padding: '4px 8px',
        color: '#fff ',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif'
        }
    };

    return styles[styleName];
  }

  render(){
    return(
        <a onClick={this.props.cbClick}>
        <span style={this.getStyle("badgeStyles")} >
          {this.props.count}
        </span>
        </a>
      );
  }
}

export default Badge;
