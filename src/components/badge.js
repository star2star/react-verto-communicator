import React from 'react';
import VertoBaseComponent from './vertobasecomponent';

 const propTypes = {
  compStyle: React.PropTypes.object,
  cbClick : React.PropTypes.func,
  count : React.PropTypes.number
};

class Badge extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {};
  }

  getCompStyle() {
    return this.props.compStyle;
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

Badge.propTypes = propTypes;
export default Badge;
