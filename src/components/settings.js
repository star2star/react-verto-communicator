import React from 'react';
import VertoBaseComponent from './vertobasecomponent.js';
import {
SettingsIconSVG,
CaretUpIconSVG,
CaretDownIconSVG } from './svgIcons';
import ToolTip from './tooltip';
import { FormattedMessage, injectIntl } from 'react-intl';

const propTypes = {
  cbDeviceList: React.PropTypes.func,
  cbPreviewSet: React.PropTypes.func.isRequired,
  cbSubmitSetting: React.PropTypes.func.isRequired,
  cbToggleShowSettings: React.PropTypes.func.isRequired,
  compStyle : React.PropTypes.object,
  ttPosition: React.PropTypes.string,
  status:  React.PropTypes.oneOf(['connected','disconnected', 'connecting', 'active']).isRequired
};

const defaultProps = {
  allowDisplayDetails : false
};

class Settings extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {'dropdownDisplayed': this.props.allowDisplayDetails };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);

    Settings.toggleSettings = this.showMenu;
  }

  getCompStyle() {
    return this.props.compStyle;
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

  render() {
    const { formatMessage } = this.props.intl;
    if(this.props.status == "disconnected"){
      var theMsg = formatMessage({"id":"SETTINGS_LOGIN", "defaultMessage":"Login to change settings"});
    }else{
      var theMsg = formatMessage({"id":"SETTINGS", "defaultMessage":"settings"});
    }
    // console.log('settings render props: ', this.props.settingsData);
    return (

      <div  style={this.getStyle("container")}>
        <span onClick={this.showMenu.bind(this)}  >
          <ToolTip name="settings" place={this.props.ttPosition} msg={theMsg} >
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

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;
export default injectIntl(Settings, {
        withRef: true
    });
