import React from 'react';
import VertoBaseComponent from '../../components/vertobasecomponent';
import Radium from 'radium';
import { connect } from 'react-redux';
import WhiteLabel from '../../js/whitelabel.js';
//import ReactTooltip from 'react-tooltip';
import VCStatus from '../../components/vcstatus';
import NetworkStatusIndicator from '../../components/nsindicator';
import UserMenu from '../../components/userMenu';
import MenuItem from '../../components/menuItem';
import TagMenu from '../../components/tagMenu';
import Settings from '../../components/settings';
import SettingsCheckbox from '../../components/settingsCheckbox';
import SettingsMenuSelect from '../../components/settingsMenuSelect';
import SettingsPreview from '../../components/settingsPreview';
import { doSpeedTest } from '../main/action-creators';
import { doSubmitLogOut } from '../main/action-creators';
import { doUpdateSetting } from './action-creators';
import App from '../../components/app';
import About from '../../components/about';
import Contributors from '../../components/contributors';
import { MenuIconSVG, ChatIconSVG } from '../../components/svgIcons';
import { injectIntl, FormattedMessage } from 'react-intl';
import LastCall from '../../components/lastCall';
import { doMakeCall } from '../main/action-creators';




// Need to close menu on resize so that if we pass media query limit then
// normal size menu will reappear...
window.onresize=()=>{
  AppBar.closeMenu();
};

class AppBar extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state={showSettings: false, showAltAppControls: false };

    this.handleAltMenuClick = this.handleAltMenuClick.bind(this);
    AppBar.closeMenu = this.handleCloseMenu.bind(this);
  }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
          appbarStyles: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: '#0544a4',
            color: '#FFFFFF',
            height: '70px',
            '@media (max-width: 768px)': {
              justifyContent: 'flex-start'
            }
          },
          appNameStyles: {
            alignText: 'center',
            fontSize: '1.2rem',
            marginLeft: '20px'
          },
          appControlStyles: {
            display: 'flex',
            marginRight: '10px',
            justifyContent: 'space-around',
            alignItems: 'center',

            '@media (max-width: 768px)': { // when less than 768px wide, hide this and show alt menu (hamburger)
              display: 'none'
            }
          },
          nsiCompStyle: {
            container:{
              marginRight: '10px'
            }
          },
          altNsiCompStyle: {
            container:{
              marginBottom: '10px'
            },
            menu: {
              top: '10px',
              right: 'initial',
              left: '48px'
            }
          },
          altUserMenu: {
            menu: {
              top: '10px',
              right: 'initial',
              left: '48px'
            }
          },
          altTagMenu: {
            menu: {
              top: '10px',
              right: 'initial',
              left: '48px'
            }
          },
          vcsCompStyle: {
            svgStyle:{
              marginRight: '20px',
              '@media (max-width: 768px)': { // when less than 768px wide, adjust for column orientation
                  marginBottom: '10px',
                  marginRight: '0px'
                }
            }
          },

          altMenuStyles: {
            display: 'none',
            visbility: 'hidden',
            '@media (max-width: 768px)': { // when less than 768px wide, show this and hide app controls
              display: 'block',
              visibility: 'visible',
              cursor: 'pointer'
            }
          },
          altMenuSvgStyles: {
            height:'24px',
            width: '24px',
            fill: 'white'
          },
          altAppControlStyles: {
            display: 'none',
            '@media (max-width: 768px)': { // when less than 768px wide, show this and hide app controls
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              position: 'absolute',
              top: '70px',
              left: '0px',
              paddingLeft: '5px',
              backgroundColor: '#0544a4'
            }
          },
          lastCallStyles: {
            marginRight: '15px'
          },
          menu: {
            position: 'absolute',
            top: '70px',
            left: '0px',
            right: '0px',
            // minWidth:'375px',
            flex: '1 1 auto',
            display: this.state.showSettings ? 'flex' : 'none',
            flexDirection: 'row',
            alignItems: 'stretch',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            opacity: '.9',
            padding: '60px',
            backgroundColor: '#0A387F',
            maxHeight: '600px',
            overflow: 'auto'

          },
          li: {
            color: '#4a4a4a',
            paddingLeft: '10px',
            paddingRight: '10px',
            fontFamily: 'sans-serif'
          },
          column1: {
            display: 'flex',
            flexDirection: 'column',
            paddingRight: '40px',
            flex: '1'
          },
          column2: {
            paddingTop:'10px',
            display: 'flex',
            flexDirection: 'column',
            paddingRight: '40px',
            flex: '1'
          },
          column3: {
            paddingTop:'10px',
            display: 'flex',
            flexDirection: 'column',
            flex: '1'
          },
          headerLabel: {
            fontWeight: 'bold',
            fontSize: '1.1rem',
            paddingBottom: '5px'
            //paddingLeft:'5px'
          },
          audioheaderLabel: {
            fontWeight: 'bold',
            fontSize: '1.1rem',
            paddingTop: '15px',
            paddingBottom: '5px'
          },
          buttonContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            flex: '1'
          },
          button: {
            padding: '8px 30px',
            border: '0px',
            borderRadius: '3px',
            fontSize: '1rem',
            fontWeight: '400',
            margin: '25px 0px 10px 0px',
            cursor: 'pointer',
            backgroundColor: '#FFF',
            color: '#0A387F',
            textTransform: 'uppercase'
          }
    };

    return (styles[styleName]);
  }

  handleAltMenuClick(){
    console.log('Alt Menu Clicked');
    // close any open 'menus'
    if (this.props.bandwidthInfo.outgoingBandwidth && this.props.bandwidthInfo.incomingBandwidth) {
      NetworkStatusIndicator && NetworkStatusIndicator.closeNetworkStatus();
    }
    UserMenu.closeMenu();
    TagMenu.closeMenu();

    this.setState({...this.state, showAltAppControls: !this.state.showAltAppControls });
  }

  handleCloseMenu(){
    //console.log('Handle Close Menu');
    this.setState({...this.state, showAltAppControls: false });
  }

  settings(displaySettings) {
    // Close any open menus in the appbar
    if (this.props.bandwidthInfo.outgoingBandwidth && this.props.bandwidthInfo.incomingBandwidth) {
      NetworkStatusIndicator && NetworkStatusIndicator.closeNetworkStatus();
    }
    UserMenu.closeMenu();
    TagMenu.closeMenu();

    //console.log('toggle settings', displaySettings);
    this.setState({ ...this.state, showSettings: displaySettings });
  }

  buildSettingsContainer() {
    // console.log('xxxxxxxxxxxx', this.props.settings);
    if (this.props.showSettings) {
      return(undefined);
    } else {
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
                cbSubmitSetting={(setting)=>{ this.props.dispatch(doUpdateSetting(setting));}}
                options={this.props.settings.videoDevices ? this.props.settings.videoDevices : []}
                label="Camera:"
                selectedOption={{id:"selectedVideo", data:this.props.settings.selectedVideo}}
            />
            <SettingsMenuSelect
                cbSubmitSetting={(setting)=>{ this.props.dispatch(doUpdateSetting(setting));}}
                options={this.props.settings.shareDevices ? this.props.settings.shareDevices : []}
                label="Share Device:"
                selectedOption={{id:"selectedShare", data:this.props.settings.selectedShare}}
            />
            <SettingsMenuSelect
                cbSubmitSetting={(setting)=>{ this.props.dispatch(doUpdateSetting(setting));}}
                options={this.props.settings.audioDevices ? this.props.settings.audioDevices : []}
                label="Microphone:"
                selectedOption={{id:"selectedAudio", data:this.props.settings.selectedAudio}}
            />
            <SettingsMenuSelect
                cbSubmitSetting={(setting)=>{ this.props.dispatch(doUpdateSetting(setting));}}
                options={this.props.settings.speakerDevices ? this.props.settings.speakerDevices : []}
                label="Speaker:"
                selectedOption={{id:"selectedSpeaker", data:this.props.settings.selectedSpeaker}}
            />
            <SettingsMenuSelect
                cbSubmitSetting={(setting)=>{ this.props.dispatch(doUpdateSetting(setting));}}
                options={this.props.settings.bestFrameRate ? this.props.settings.bestFrameRate : []}
                label="Best Frame Rate:"
                selectedOption={{id:"selectedBestFrameRate", data:this.props.settings.selectedBestFrameRate}}
            />
            <div className="buttonContainer" style={{...this.getStyle('buttonContainer')}}>
              <button
                  style={{...this.getStyle('button')}}
                  onClick={()=>{App.toggleModal((<SettingsPreview settingsData={this.props.settings} cbClose={App.toggleModal}/>));}}
              >
                <FormattedMessage
                    id="PREVIEW_SETTINGS"
                    defaultMessage="Preview Settings"
                />
              </button>
              <button
                  style={{...this.getStyle('button')}}
                  onClick={()=>{console.log('Refresh Device List Clicked');}}
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
            <div style={{...this.getStyle('headerLabel')}}>
              <FormattedMessage
                  id="GENERAL_SETTINGS"
                  defaultMessage= "General settings:"
            />
        </div>
            <SettingsCheckbox
                cbSubmitSetting={(setting)=>{ this.props.dispatch(doUpdateSetting(setting));}}
                label="Use Video"
                checkedOption={{name:'useVideo', value:this.props.settings.useVideo}}
            />
            <SettingsCheckbox
                cbSubmitSetting={(setting)=>{ this.props.dispatch(doUpdateSetting(setting));}}
                label="Stereo Audio"
                checkedOption={{name:'useStereo', value:this.props.settings.useStereo}}
            />
            <SettingsCheckbox
                cbSubmitSetting={(setting)=>{ this.props.dispatch(doUpdateSetting(setting));}}
                label="Use STUN"
                checkedOption={{name:'useSTUN', value:this.props.settings.useSTUN}}
            />
            <SettingsCheckbox
                cbSubmitSetting={(setting)=>{ this.props.dispatch(doUpdateSetting(setting));}}
                label="Scale Remote Video to Match Camera Resolution"
                checkedOption={{name:'mirrorInput', value:this.props.settings.mirrorInput}}
            />
            <SettingsCheckbox
                cbSubmitSetting={(setting)=>{ this.props.dispatch(doUpdateSetting(setting));}}
                label="Ask Before Recovering a Call"
                checkedOption={{name:'askRecoverCall', value:this.props.settings.askRecoverCall}}
            />
            <SettingsMenuSelect
                cbSubmitSetting={(setting)=>{ this.props.dispatch(doUpdateSetting(setting));}}
                options={this.props.settings.languages ? this.props.settings.languages : []}
                label="Language:"
                selectedOption={{id:"language", data:this.props.settings.language}}
            />
          <div style={{...this.getStyle('audioheaderLabel')}}>
              <FormattedMessage
                  id="AUDIO_SETTINGS"
                  defaultMessage= "Audio settings:"
              />
          </div>
            <SettingsCheckbox
                cbSubmitSetting={(setting)=>{ this.props.dispatch(doUpdateSetting(setting));}}
                label="Echo Cancellation"
                checkedOption={{name:'googEchoCancellation', value:this.props.settings.googEchoCancellation}}
            />
            <SettingsCheckbox
                cbSubmitSetting={(setting)=>{ this.props.dispatch(doUpdateSetting(setting));}}
                label="Noise Suppression"
                checkedOption={{name:'googNoiseSuppression', value:this.props.settings.googNoiseSuppression}}
            />
            <SettingsCheckbox
                cbSubmitSetting={(setting)=>{ this.props.dispatch(doUpdateSetting(setting));}}
                label="Highpass Filter"
                checkedOption={{name:'googHighpassFilter', value:this.props.settings.googHighpassFilter}}
            />
          </div>
          <div
              className="column3"
              style={{...this.getStyle('column3')}}
          >
            <div style={{...this.getStyle('headerLabel')}}>
              <FormattedMessage
                  id="VIDEO_SETTINGS"
                  defaultMessage= "Video settings:"
              />
          </div>
            <SettingsCheckbox
                cbSubmitSetting={(setting)=>{this.props.dispatch(doUpdateSetting(setting));}}
                label="Automatically determine speed and resolution settings"
                checkedOption={{name:'autoBand', value:this.props.settings.autoBand}}
            />
            <SettingsCheckbox
                cbSubmitSetting={(setting)=>{this.props.dispatch(doUpdateSetting(setting));}}
                label="Recheck Bandwidth Before Each Outgoing Call"
                checkedOption={{name:'testSpeedJoin', value:this.props.settings.testSpeedJoin}}
            />
          <div className="buttonContainer" style={{...this.getStyle('buttonContainer')}}>
              <button
                  style={{...this.getStyle('button')}}
                  onClick={()=>{ this.props.dispatch(doSpeedTest());}}
              >
                <FormattedMessage
                    id="CHECK_NETWORK_SPEED"
                    defaultMessage="Check Network Speed"
                />
              </button>
               <div
                   className='networkSpeedDisplay'
               >

                </div>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    //console.log('#### window theme style', window.theme);
    //console.log('this.props.settings', this.props.settings);
    //console.log('this.props.bandwidthInfo', this.props.bandwidthInfo);
    const { formatMessage } = this.props.intl;

    const appName = WhiteLabel.get('appName');


    // showAltAppControls is true, then reset styles for alt menu positions and orientations
    // otherwise leave set it to appControlStyles.

    let acStyles = this.getStyle("appControlStyles");

    if (this.state.showAltAppControls) {
      acStyles =  this.getStyle("altAppControlStyles");
    }

    // only show network status if we have speed data ....
    let nsIndicator;
    if (this.props.bandwidthInfo.outgoingBandwidth && this.props.bandwidthInfo.incomingBandwidth) {
      const vidQual = this.props.bandwidthInfo.vidQual ? this.props.bandwidthInfo.vidQual : '';
      nsIndicator = (
        <NetworkStatusIndicator
            compStyle={this.state.showAltAppControls ? this.getStyle("altNsiCompStyle") : this.getStyle("nsiCompStyle")}
            networkData={{upkpbs: this.props.bandwidthInfo.outgoingBandwidth,
                          downkpbs: this.props.bandwidthInfo.incomingBandwidth,
                          vidQual: vidQual}}
          />
      );
    }

    // only show the 'Last Call' info if there is call history to retrieve it from
    // and if showAltAppControls is false
    // TODO - Check for call history in store and get the most recent one to build
    // the string
    let lastCall;

    if (true && !this.state.showAltAppControls) {
      if (this.props.callInfo.currentCallId) {
        lastCall = (<LastCall labelText= {"In Call:"} lastNumber={this.props.callInfo.lastNumber}  />);
      }else if (this.props.callInfo.lastNumber ) {
        lastCall = (<LastCall labelText= {"Last Call:"} lastNumber={this.props.callInfo.lastNumber}  cbClick={(number)=>{
          this.props.dispatch(doMakeCall(number, this.props.app));
        }} />);
      } else {
        lastCall = (<LastCall labelText= {"No Call"} />);
      }
    }

    // toggle Chat control - only display if there is a conference in session...
    // TODO find out where in store in progress conference is indicated
    let toggleChat;

    if (false) {
      toggleChat = (
        <div  style={!this.state.showAltAppControls ? {marginRight: '20px'}:{marginBottom:'10px'}}
            onClick={()=>{
                  // TODO add dispatch to toggle the slide out of memberlist/chat from right side...
                  console.log('Toggle Chat Clicked in app bar');
                }
        }
        >
          <ChatIconSVG svgStyle={{height: "24px", width: "24px", fill: "#fff"}} />

          </div>
);
    }




    // settings here
    //TODO define settings style for alt menu orientation
    // const settingsMenu = this.getSettingsMenu();
    const settingsContainer = this.buildSettingsContainer();

    return (
      <div style={{position: "absolute", left: "0px", right: "0px", top: "0px", zIndex: "1"}}>
        <div className="appbar" style={this.getStyle('appbarStyles')}>
          <span className="altMenu" style={this.getStyle("altMenuStyles")} onClick={this.handleAltMenuClick}>
            <MenuIconSVG svgStyle={this.getStyle("altMenuSvgStyles")} />
          </span>
          <span className="appName" style={this.getStyle("appNameStyles")}>{appName}</span>

          <span className="appControls" style={acStyles}>
            {nsIndicator}
            <VCStatus status = {this.props.vcStatus} compStyle={!this.state.showAltAppControls ? {svgStyle:{marginRight: '20px'}}:{svgStyle:{marginBottom:'10px'}}}/>

            {lastCall}

            <div style={!this.state.showAltAppControls ? {marginRight: '20px'}:{marginBottom:'10px'}}>
              <Settings  allowDisplayDetails={this.props.vcStatus != 'disconnected'}
                  cbSubmitSetting = {(data)=>{this.props.dispatch(doUpdateSetting(data));}}
                  cbToggleShowSettings={this.settings.bind(this)}
                  settings={this.props.settings}
                  onClick={()=>{this.props.dispatch(doSpeedTest());}}
                  cbPreviewSet={()=>{App.toggleModal((<SettingsPreview settings={this.props.settings} cbClose={App.toggleModal}/>));}}
              />
            </div>

            {toggleChat}

            <div style={!this.state.showAltAppControls ? {marginRight: '20px'}:{marginBottom:'10px'}}>
              <UserMenu allowDisplayDetails={this.props.vcStatus != 'disconnected'} compStyle={this.state.showAltAppControls ? this.getStyle("altUserMenu") : undefined}>
                <MenuItem label={<FormattedMessage id='OPEN_NEW_WINDOW' />}cbAction={()=>{
                  window.open(location.href);
                }} />
                <MenuItem label={<FormattedMessage id='CHANGE_LOGIN_INFO' />} cbAction={()=>{
                  this.props.dispatch(doSubmitLogOut());
                }} />
                <MenuItem label={<FormattedMessage id='LOGOUT' />} cbAction={()=>{
                  this.props.dispatch(doSubmitLogOut());
                }} />
              </UserMenu>

            </div>
            <div style={!this.state.showAltAppControls ? {marginRight: '20px'}:{marginBottom:'10px', position:'relative'}}>
              <TagMenu allowDisplayDetails="true" compStyle={this.state.showAltAppControls ? this.getStyle("altTagMenu") : undefined}>
                <MenuItem label={formatMessage({"id":"ABOUT", "defaultMessage":"About"})} cbAction={()=>{
                  // TODO ta need to pass version and gitRev in to the About component
                  App.toggleModal((<About version="0.2.0" gitRev="xxxxx" cbClose={App.toggleModal}/>));
                }} />
                <MenuItem label={formatMessage({"id":"TITLE_CONTRIBUTORS", "defaultMessage":"Contributors"})}  cbAction={()=>{

                  App.toggleModal((<Contributors contributorsData={this.props.contributorsData} />));
                }} />
                <MenuItem label={formatMessage({"id":"HELP", "defaultMessage":"Help"})} cbAction={()=>{
                  window.open('https://freeswitch.org/confluence/display/FREESWITCH/Verto+Communicator');
                }} />
              </TagMenu>
            </div>
          </span>
          {settingsContainer}
        </div>
      </div>
    );
  }
}

export default connect((state)=>{
  console.log('----STORE in appbar ----', state);
  return ({
    settings: state.app.settings,
    bandwidthInfo: state.app.bandwidthInfo,
    vcStatus: state.auth.vcStatus,
    app: state.app,
    auth: state.auth,
    callInfo: state.callInfo,
    contributorsData: state.app.contributors,
    chatData: state.auth.conferenceCall && state.auth.conferenceCall.messages
  });
})(injectIntl(Radium(AppBar)));
