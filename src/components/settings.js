import React from 'react';
import VertoBaseComponent from './vertobasecomponent.js';
import { FormattedMessage } from 'react-intl';
import SettingsMenuSelect from './settingsMenuSelect.js';
import SettingsCheckbox from './settingsCheckbox.js';
import {
SettingsIconSVG,
CaretUpIconSVG,
CaretDownIconSVG } from './svgIcons';

const propTypes = {
  cbDeviceList: React.PropTypes.func,
  cbPreviewSet: React.PropTypes.func,
  cbSubmitSetting: React.PropTypes.func.isRequired,
  cbToggleShowSettings: React.PropTypes.func.isRequired,
  compStyle : React.PropTypes.object,
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
      },
      menu: {
        position: 'absolute',
        top: '70px',
        left: '0px',
        width: '100%',
        display: this.state.dropdownDisplayed ? 'flex' : 'none',
        flexDirection: 'row',
        alignContent: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        opacity: '.9',
        paddingBottom: '20px',
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
        flexDirection: 'column'
      },
      column1: {
        display: 'flex',
        flexDirection: 'column'
      },
      column2: {
        marginTop:'10px',
        display: 'flex',
        flexDirection: 'column'
      },
      column3: {
        marginTop:'10px',
        display: 'flex',
        flexDirection: 'column'
      },
      headerLabel: {
        fontWeight: 'bold',
        marginTop:'10px',
        marginBottom: '5px'
        //paddingLeft:'5px'
      },
      button: {
        padding: '8px 30px',
        border: '0px',
        borderRadius: '3px',
        fontSize: '.9rem',
        fontWeight: '400',
        margin: '25px 1px 10px 1px',
        cursor: 'pointer',
        backgroundColor: '#FFF',
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

  submitPreview() {
    //console.log('Preview Settings Clicked');
    this.props.cbPreviewSet();
  }

  submitRefresh() {
    console.log('Refresh Device List Clicked');
    //this.props.cbDeviceList();
  }

  submitSpeedCheck(){
    console.log('Check Network Speed Clicked');
    //this.props.cbNetSpeed();
  }

  buildSettingsContainer() {
    // console.log('xxxxxxxxxxxx', this.props.settingsData);
    return (
      <div
          className="menuContainer"
          style={{...this.getStyle('menu')}}
      >
        <div
            className="column1"
            style={{...this.getStyle('column1')}}
        >
          <SettingsMenuSelect
              cbSubmitSetting={this.props.cbSubmitSetting}
              options={this.props.settingsData.videoDevices ? this.props.settingsData.videoDevices : []}
              label="Camera:"
              selectedOption={{id:"selectedVideo", data:this.props.settingsData.selectedVideo}}
          />
          <SettingsMenuSelect
              cbSubmitSetting={this.props.cbSubmitSetting}
              options={this.props.settingsData.shareDevices ? this.props.settingsData.shareDevices : []}
              label="Share Device:"
              selectedOption={{id:"selectedShare", data:this.props.settingsData.selectedShare}}
          />
          <SettingsMenuSelect
              cbSubmitSetting={this.props.cbSubmitSetting}
              options={this.props.settingsData.audioDevices ? this.props.settingsData.audioDevices : []}
              label="Microphone:"
              selectedOption={{id:"selectedAudio", data:this.props.settingsData.selectedAudio}}
          />
          <SettingsMenuSelect
              cbSubmitSetting={this.props.cbSubmitSetting}
              options={this.props.settingsData.speakerDevices ? this.props.settingsData.speakerDevices : []}
              label="Speaker:"
              selectedOption={{id:"selectedSpeaker", data:this.props.settingsData.selectedSpeaker}}
          />
          <SettingsMenuSelect
              cbSubmitSetting={this.props.cbSubmitSetting}
              options={this.props.settingsData.bestFrameRate ? this.props.settingsData.bestFrameRate : []}
              label="Best Frame Rate:"
              selectedOption={{id:"selectedBestFrameRate", data:this.props.settingsData.selectedBestFrameRate}}
          />
          <div className="buttonContainer" style={{...this.getStyle('buttonContainer')}}>
            <button
                style={{...this.getStyle('button')}}
                onClick={this.submitPreview.bind(this)}
            >
              <FormattedMessage
                  id="PREVIEW_SETTINGS"
                  defaultMessage="Preview Settings"
              />
            </button>
            <button
                style={{...this.getStyle('button')}}
                onClick={this.submitRefresh.bind(this)}
            >
              <FormattedMessage
                  id="REFRESH_DEVICE_LIST"
                  defaultMessage="Refresh Device List"
              />
            </button>
          </div>
        </div>
        <div
            className="column2"
            style={{...this.getStyle('column2')}}
        >
          <span style={{...this.getStyle('headerLabel')}}>
            <FormattedMessage
                id="GENERAL_SETTINGS"
                defaultMessage= "General settings:"
          />
          </span>
          <SettingsCheckbox
              cbSubmitSetting={this.props.cbSubmitSetting}
              label="Use Video"
              checkedOption={{name:'useVideo', value:this.props.settingsData.useVideo}}
          />
          <SettingsCheckbox
              cbSubmitSetting={this.props.cbSubmitSetting}
              label="Stereo Audio"
              checkedOption={{name:'useStereo', value:this.props.settingsData.useStereo}}
          />
          <SettingsCheckbox
              cbSubmitSetting={this.props.cbSubmitSetting}
              label="Use STUN"
              checkedOption={{name:'useSTUN', value:this.props.settingsData.useSTUN}}
          />
          <SettingsCheckbox
              cbSubmitSetting={this.props.cbSubmitSetting}
              label="Scale Remote Video to Match Camera Resolution"
              checkedOption={{name:'mirrorInput', value:this.props.settingsData.mirrorInput}}
          />
          <SettingsCheckbox
              cbSubmitSetting={this.props.cbSubmitSetting}
              label="Ask Before Recovering a Call"
              checkedOption={{name:'askRecoverCall', value:this.props.settingsData.askRecoverCall}}
          />
          <SettingsMenuSelect
              cbSubmitSetting={this.props.cbSubmitSetting}
              options={this.props.settingsData.languages ? this.props.settingsData.languages : []}
              label="Language:"
              selectedOption={{id:"language", data:this.props.settingsData.language}}
          />
          <span style={{...this.getStyle('headerLabel')}}>
            <FormattedMessage
                id="AUDIO_SETTINGS"
                defaultMessage= "Audio settings:"
            />
          </span>
          <SettingsCheckbox
              cbSubmitSetting={this.props.cbSubmitSetting}
              label="Echo Cancellation"
              checkedOption={{name:'googEchoCancellation', value:this.props.settingsData.googEchoCancellation}}
          />
          <SettingsCheckbox
              cbSubmitSetting={this.props.cbSubmitSetting}
              label="Noise Suppression"
              checkedOption={{name:'googNoiseSuppression', value:this.props.settingsData.googNoiseSuppression}}
          />
          <SettingsCheckbox
              cbSubmitSetting={this.props.cbSubmitSetting}
              label="Highpass Filter"
              checkedOption={{name:'googHighpassFilter', value:this.props.settingsData.googHighpassFilter}}
          />
        </div>
        <div
            className="column3"
            style={{...this.getStyle('column3')}}
        >
          <span style={{...this.getStyle('headerLabel')}}>
            <FormattedMessage
                id="VIDEO_SETTINGS"
                defaultMessage= "Video settings:"
            />
          </span>
          <SettingsCheckbox
              cbSubmitSetting={this.props.cbSubmitSetting}
              label="Automatically determine speed and resolution settings"
              checkedOption={{name:'autoBand', value:this.props.settingsData.autoBand}}
          />
          <SettingsCheckbox
              cbSubmitSetting={this.props.cbSubmitSetting}
              label="Recheck Bandwidth Before Each Outgoing Call"
              checkedOption={{name:'testSpeedJoin', value:this.props.settingsData.testSpeedJoin}}
          />
          <div
              className="buttonContainer"
              style={{...this.getStyle('buttonContainer')}}
          >
            <button
                style={{...this.getStyle('button')}}
                onClick={this.submitSpeedCheck.bind(this)}
            >
              <FormattedMessage
                  id="CHECK_NETWORK_SPEED"
                  defaultMessage="Check Network Speed"
              />
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
