import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import * as icons from './svgIcons';
import { fromJS } from "immutable";


class ControlItem extends VertoBaseComponent {
  constructor(props){
      super(props);
      this.state = {};
  }

  static propTypes = {
    cbActionClick : React.PropTypes.func,
    description : React.PropTypes.string,
    compStyle : React.PropTypes.object,
    label : React.PropTypes.string,
    type : React.PropTypes.string
  };

  static defaultProps = {
    cbActionClick: ()=>{},
    compStyle : {svgStyle:{fill: '#6b6c6c', height: '24px', width: '24px'}}
  };

  static filename = "controlItem";
  static displayName = "ControlItem";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  getDefaultStyle(styleName) {
    const styles = {
      controlStyle: {
        cursor: 'pointer',
        fontSize: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      svgStyle: {
        height: '20px',
        fill: '#65ac43'
      }
    };

    return styles[styleName];
  }

  render(){
    //variable must begin with capital letter or will NOT render.
    let DynamicIcon;
    if(icons.hasOwnProperty(this.props.type)){
      DynamicIcon = icons[this.props.type];
    }
    // console.log('---->',DynamicIcon);
    return (
      <span className="container" style={this.getStyle("controlStyle")}
          onClick={this.props.cbActionClick}
      >
        <DynamicIcon
            svgStyle={this.getStyle("svgStyle")}
        />
        <span className="label" style={this.getStyle("labelStyle")}>
          {this.props.label}
        </span>
      </span>
    );
  }
}


export default ControlItem;
// reviewed 7/13/2016
