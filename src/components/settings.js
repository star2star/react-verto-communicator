import React from 'react';
import VertoBaseComponent from './vertobasecomponent.js';
import {
SettingsIconSVG,
CaretUpIconSVG,
CaretDownIconSVG } from './svgIcons';
import ToolTip from './tooltip';
import { injectIntl } from 'react-intl';
import { fromJS } from "immutable";


class Settings extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {'dropdownDisplayed': this.props.allowDisplayDetails };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);

    Settings.toggleSettings = this.showMenu;
  }

  static propTypes = {
    cbDeviceList: React.PropTypes.func,
    cbPreviewSet: React.PropTypes.func,
    cbSubmitSetting: React.PropTypes.func,
    cbToggleShowSettings: React.PropTypes.func,
    compStyle : React.PropTypes.object,
    ttPosition: React.PropTypes.string,
    status:  React.PropTypes.oneOf(['connected','disconnected', 'connecting', 'active'])
  };

  static defaultProps = {
    allowDisplayDetails : false,
    cbPreviewSet: ()=>{},
    cbSubmitSetting: ()=>{},
    cbToggleShowSettings: ()=>{},
    status:  'noStatusAvailable'
  };

  static filename = "settings";
  static displayName = "Settings";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  closeMenu(){
    this.props.cbToggleShowSettings(false);
    this.setState({...this.state, dropdownDisplayed: false});
  }

  getDefaultStyle(styleName) {
    const styles = {
      container: {
        display: 'flex'
        // position: 'relative'
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
        height: '16px',
        width: '20px',
        paddingBottom: '3px'
      }
    };

    return (styles[styleName]);
  }

  showMenu() {
    if (this.props.allowDisplayDetails) {
      const newShow = !this.state.dropdownDisplayed;
      this.props.cbToggleShowSettings(newShow);
      this.setState({...this.state, dropdownDisplayed: newShow});
    }
  }

  eventStopPropagations(event){
    //console.log('settttttttttttttttttttt')
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }

  render() {
    const { formatMessage } = this.props.intl;
    let theMsg;
    if(this.props.status == "disconnected"){
      theMsg = formatMessage({"id":"SETTINGS_LOGIN", "defaultMessage":"Login to change settings"});
    }else{
      theMsg = formatMessage({"id":"SETTINGS", "defaultMessage":"settings"});
    }
    // console.log('settings render props: ', this.props.settingsData);
    return (
      <div
          style={this.getStyle("container")}
          onClick={this.eventStopPropagations}
        >
        <span onClick={this.showMenu.bind(this)}  >
          <ToolTip name="settings" place={this.props.ttPosition} msg={theMsg} custStyle={{base: {marginTop:'10px'}}}>
            <SettingsIconSVG svgStyle={{...this.getStyle('icon')}}  />
            {this.state.dropdownDisplayed ?
                <CaretUpIconSVG svgStyle={{...this.getStyle('caret')}} /> :
                <CaretDownIconSVG svgStyle={{...this.getStyle('caret')}} />}
          </ToolTip>
        </span>
      </div>
    );
  }
}

export default injectIntl(Settings, {
        withRef: true
    });
// reviewed on 7/14/2016
