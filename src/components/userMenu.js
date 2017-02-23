import React from 'react';
import VertoBaseComponent from './vertobasecomponent.js';
import {
AvatarSVG,
CaretUpIconSVG,
CaretDownIconSVG } from './svgIcons';
import ToolTip from './tooltip';
import { injectIntl } from 'react-intl';
import { fromJS } from "immutable";


class UserMenu extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {'dropdownDisplayed': false};

    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.eventStopPropagations = this.eventStopPropagations.bind(this);
  }

  static propTypes = {
    cbClick: React.PropTypes.func,
    compStyle : React.PropTypes.object,
    ttPosition: React.PropTypes.string,
    status:  React.PropTypes.oneOf(['connected','disconnected', 'connecting', 'active'])
  };

  static defaultProps = {
    allowDisplayDetails : false,
    status: 'noStatus'
  };

  static filename = "userMenu";
  static displayName = "UserMenu";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  getDefaultStyle(styleName) {
    const styles = {
      container: {
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        zIndex: '1'
      },
      icon: {
        fill: this.props.allowDisplayDetails ? '#fff' : '#ccc',
        height: '24px',
        width: '24px',
        cursor: 'pointer'
      },
      caret: {
        fill: this.props.allowDisplayDetails ? '#fff' : '#ccc',
        flexGrow: 1,
        cursor: 'pointer',
        height: '16px',
        width: '20px',
        paddingBottom: '3px'
      },
      menu: {
        position: 'absolute',
        fontSize: '14px',
        right: '0px',
        top: '40px',
        minWidth: '160px',
        padding: '5px 0',
        margin: '2px 0 0',
        display: this.state.dropdownDisplayed ? 'flex' : 'none',
        flexDirection: 'column',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
        boxShadow: '0 2px 5px 0 rgba(0,0,0,.25)'
      }
    };
    return (styles[styleName]);
  }

  toggleMenu() {
    if (this.props.allowDisplayDetails) {
      this.props.cbClick();
      this.setState({...this.state, dropdownDisplayed: !this.state.dropdownDisplayed});
    }
  }

  closeMenu() {
    if (this.props.allowDisplayDetails) {
      this.setState({...this.state, dropdownDisplayed: false});
    }
  }

  eventStopPropagations(event){
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }

  render() {
    const { formatMessage } = this.props.intl;
    const menuContainer = (
      <div className="menuContainer" style={this.getStyle('menu')} >
        {this.props.children}
      </div>
    );

    let theMsg;
    if(this.props.status == "disconnected"){
      theMsg = formatMessage({"id":"SETTINGS_USER_LOGIN", "defaultMessage":"login to change user settings"});
    }else{
      theMsg = formatMessage({"id":"SETTINGS_USER", "defaultMessage":"Disconnected"});
    }
    //nClick={this.toggleMenu.bind(this)}
    return (
      <div onClick={this.eventStopPropagations}>
        <span onClick={this.toggleMenu.bind(this)}  style={this.getStyle("container")} >
          <ToolTip name="user" place={this.props.ttPosition} msg={theMsg} custStyle={{base:{marginTop: '10px'}}} >
            <AvatarSVG svgStyle={{...this.getStyle('icon')}}  />
              {this.state.dropdownDisplayed ?
                  <CaretUpIconSVG svgStyle={{...this.getStyle('caret')}} /> :
                  <CaretDownIconSVG svgStyle={{...this.getStyle('caret')}} />}
          </ToolTip>
          {menuContainer}
        </span>
      </div>
    );
  }
}

export default  injectIntl(UserMenu,{
        withRef: true
    });
// reviewed on 7/14/2016
