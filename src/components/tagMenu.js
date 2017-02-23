import React from 'react';
import VertoBaseComponent from './vertobasecomponent.js';
import {
TagIconSVG,
CaretUpIconSVG,
CaretDownIconSVG } from './svgIcons';
import ToolTip from './tooltip';
import { injectIntl } from 'react-intl'
import { fromJS } from "immutable";



class TagMenu extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {'dropdownDisplayed': false};

    this.toggleMenu = this.toggleMenu.bind(this);
    TagMenu.closeMenu = this.closeMenu.bind(this);
    this.eventStopPropagations = this.eventStopPropagations.bind(this);
  }

  static propTypes = {
    cbClick : React.PropTypes.func,
    compStyle : React.PropTypes.object,
    ttPosition: React.PropTypes.string
  };

  static defaultProps = {
    allowDisplayDetails : false,
    ttPosition: 'notAvailable'
  };

  static filename = "tagMenu";
  static displayName = "TagMenu";

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
        height: '24px',
        width: '24px',
        cursor: 'pointer'
      },
      caret: {
        fill: '#fff',
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

    let theMsg = formatMessage({"id":"MENU_INFO", "defaultMessage":"Click to Dial"});
    return (
      <div onClick={this.eventStopPropagations}>
        <span onClick={this.toggleMenu}  style={this.getStyle("container")}>
        <ToolTip name="info" place={this.props.ttPosition} msg={theMsg} auto={false} custStyle={{base:{marginTop: '10px'}}}>
          <TagIconSVG svgStyle={{...this.getStyle('icon'), fill: 'white'}}  />
            {this.state.dropdownDisplayed ?
                <CaretUpIconSVG svgStyle={{...this.getStyle('caret'), fill: 'white'}} /> :
                <CaretDownIconSVG svgStyle={{...this.getStyle('caret'), fill: 'white'}} />}
        </ToolTip>
            {menuContainer}
        </span>
      </div>
    );
  }
}


export default injectIntl(TagMenu, {
        withRef: true
    });
// reviewed on 7/14/2016
