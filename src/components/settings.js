import React from 'react';
import VertoBaseComponent from './vertobasecomponent.js';
import { FormattedMessage } from 'react-intl';
import SettingsMenuSelect from './settingsMenuSelect.js';
import {
SettingsIconSVG,
CaretUpIconSVG,
CaretDownIconSVG } from './svgIcons';

const propTypes = {
  compStyle : React.PropTypes.object,
  cbToggleShowSettings: React.PropTypes.func.isRequired,
  settingsData: React.PropTypes.object.isRequired
};

const defaultProps = {
  allowDisplayDetails : false
};

class Settings extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {'dropdownDisplayed': this.props.allowDisplayDetails };

    this.showMenu = this.showMenu.bind(this);

    Settings.toggleSettings = this.showMenu;
  }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      container: {
        display: 'flex',
        position: 'relative'
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
      },
      menu: {
        position: 'absolute',
        top: '70px',
        left: '0px',
        width: '100%',
        display: this.state.dropdownDisplayed ? 'flex' : 'none',
        flexDirection: 'row',
        // justifyContent: 'space-around',
        opacity: '.9',
        padding: '20px',
        paddingLeft: '120px',
        // border: '1px solid #ccc',
        backgroundColor: '#0A387F'
      },
      header: {
        display: 'flex',
        justifyContent: 'center',
        color: '#4a4a4a',
        padding: '5px',
        backgroundColor: '#F7F7F7',
        fontFamily: 'sans-serif'
      },
      li: {
        color: '#4a4a4a',
        paddingLeft: '10px',
        paddingRight: '10px',
        fontFamily: 'sans-serif'
      },
      buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      },
      button: {
        padding: '8px 30px',
        border: '0px',
        borderRadius: '2px',
        fontSize: '.9rem',
        fontWeight: '400',
        margin: '25px 1px 10px 1px',
        cursor: 'pointer',
        color: '#0A387F',
        textTransform: 'uppercase'
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

  buildSettingsContainer() {
    console.log('xxxxxxxxxxxx', this.props.settingsData);
    return (
          <div className="menuContainer" style={{...this.getStyle('menu')}}>
            <div>
              <SettingsMenuSelect
                  cbSubmitSetting={(data)=>{console.log('settings submit callback', data);}}
                  options={this.props.settingsData.videoDevices ? this.props.settingsData.videoDevices : []}
                  label="Camera:"
                  selectedOption={{id:"selectedVideo", label:this.props.settingsData.selectedVideo && this.props.settingsData.selectedVideo.label}}
                />
              <SettingsMenuSelect
                  cbSubmitSetting={(data)=>{console.log('settings submit callback', data);}}
                  options={this.props.settingsData.shareDevices ? this.props.settingsData.shareDevices : []}
                  label="Share Device:"
                  selectedOption={{id:"selectedShare", label:this.props.settingsData.selectedShare && this.props.settingsData.selectedShare.label}}
                />
                <SettingsMenuSelect
                    cbSubmitSetting={(data)=>{console.log('settings submit callback', data);}}
                    options={this.props.settingsData.audioDevices ? this.props.settingsData.audioDevices : []}
                    label="Microphone:"
                    selectedOption={{id:"selectedAudio", label:this.props.settingsData.selectedAudio && this.props.settingsData.selectedAudio.label}}
                  />
                  <SettingsMenuSelect
                      cbSubmitSetting={(data)=>{console.log('settings submit callback', data);}}
                      options={this.props.settingsData.speakerDevices ? this.props.settingsData.speakerDevices : []}
                      label="Speaker:"
                      selectedOption={{id:"selectedSpeaker", label:this.props.settingsData.selectedSpeaker && this.props.settingsData.selectedSpeaker.label}}
                    />
                    <SettingsMenuSelect
                        cbSubmitSetting={(data)=>{console.log('settings submit callback', data);}}
                        options={this.props.settingsData.bestFrameRate ? this.props.settingsData.bestFrameRate : []}
                        label="Best Frame Rate:"
                        selectedOption={{id:"selectedBestFrameRate", label:this.props.settingsData.selectedBestFrameRate && this.props.settingsData.selectedBestFrameRate.label}}
                      />
                    <div style={{...this.getStyle('buttonContainer')}}>
                      <button style={{...this.getStyle('button')}}>
                        <FormattedMessage id="PREVIEW_SETTINGS" defaultMessage="Preview Settings"/>
                      </button>
                      <button style={{...this.getStyle('button')}}>
                        <FormattedMessage id="REFRESH_DEVICE_LIST" defaultMessage="Refresh Device List"/>
                      </button>
                    </div>
              </div>
          </div>
    );
  }

  render() {
    const settingsContainer = this.buildSettingsContainer();
    // console.log('settings render props: ', this.props.settingsData);
    return (
      <div>
        <span onClick={this.showMenu.bind(this)}  >
          <SettingsIconSVG svgStyle={{...this.getStyle('icon')}}  />
            {this.state.dropdownDisplayed ?
                <CaretUpIconSVG svgStyle={{...this.getStyle('caret')}} /> :
                <CaretDownIconSVG svgStyle={{...this.getStyle('caret')}} />}
        </span>
          {settingsContainer}
      </div>
    );
  }
}

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;
export default Settings;
