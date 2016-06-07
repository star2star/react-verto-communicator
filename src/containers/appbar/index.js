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
import SettingsMenuSelect from '../../components/settingsMenuSelect.js';
import SettingsCheckbox from '../../components/settingsCheckbox.js';
import { doSubmitLogOut } from '../main/action-creators';
import App from '../../components/app';
import About from '../../components/about';
import SettingsPreview from '../../components/SettingsPreview';
import Contributors from '../../components/contributors';
import { MenuIconSVG } from '../../components/svgIcons';
import { injectIntl, FormattedMessage } from 'react-intl';



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
          settingsStyles: {
            // opacity: '.9',
            backgroundColor: '#0A387F',
            color: '#FFFFFF',
            display: 'flex'
            // flexDirection: 'row',
            // justifyContent: 'space-around'

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
    //console.log('toggle settings', displaySettings);
    this.setState({ ...this.state, showSettings: displaySettings });
  }

  // buildSettingsContainer() {
  //   // console.log('xxxxxxxxxxxx', this.props.settingsData);
  //   return (
  //         <div
  //             className="menuContainer"
  //             style={{...this.getStyle('menu')}}
  //           >
  //           <div
  //               className="column1"
  //               style={{...this.getStyle('column1')}}
  //             >
  //             <SettingsMenuSelect
  //                 cbSubmitSetting={(data)=>{console.log('settings submit callback', data);}}
  //                 options={this.props.settingsData.videoDevices ? this.props.settingsData.videoDevices : []}
  //                 label="Camera:"
  //                 selectedOption={{id:"selectedVideo", label:this.props.settingsData.selectedVideo && this.props.settingsData.selectedVideo.label}}
  //               />
  //             <SettingsMenuSelect
  //                 cbSubmitSetting={(data)=>{console.log('settings submit callback', data);}}
  //                 options={this.props.settingsData.shareDevices ? this.props.settingsData.shareDevices : []}
  //                 label="Share Device:"
  //                 selectedOption={{id:"selectedShare", label:this.props.settingsData.selectedShare && this.props.settingsData.selectedShare.label}}
  //               />
  //               <SettingsMenuSelect
  //                   cbSubmitSetting={(data)=>{console.log('settings submit callback', data);}}
  //                   options={this.props.settingsData.audioDevices ? this.props.settingsData.audioDevices : []}
  //                   label="Microphone:"
  //                   selectedOption={{id:"selectedAudio", label:this.props.settingsData.selectedAudio && this.props.settingsData.selectedAudio.label}}
  //                 />
  //                 <SettingsMenuSelect
  //                     cbSubmitSetting={(data)=>{console.log('settings submit callback', data);}}
  //                     options={this.props.settingsData.speakerDevices ? this.props.settingsData.speakerDevices : []}
  //                     label="Speaker:"
  //                     selectedOption={{id:"selectedSpeaker", label:this.props.settingsData.selectedSpeaker && this.props.settingsData.selectedSpeaker.label}}
  //                   />
  //                   <SettingsMenuSelect
  //                       cbSubmitSetting={(data)=>{console.log('settings submit callback', data);}}
  //                       options={this.props.settingsData.bestFrameRate ? this.props.settingsData.bestFrameRate : []}
  //                       label="Best Frame Rate:"
  //                       selectedOption={{id:"selectedBestFrameRate", label:this.props.settingsData.selectedBestFrameRate && this.props.settingsData.selectedBestFrameRate.label}}
  //                     />
  //                   <div className="buttonContainer" style={{...this.getStyle('buttonContainer')}}>
  //                     <button
  //                         style={{...this.getStyle('button')}}
  //                         onClick={this.submitPreview.bind(this)}
  //                       >
  //                       <FormattedMessage
  //                           id="PREVIEW_SETTINGS"
  //                           defaultMessage="Preview Settings"
  //                         />
  //                     </button>
  //                     <button
  //                         style={{...this.getStyle('button')}}
  //                         onClick={this.submitRefresh.bind(this)}
  //                       >
  //                       <FormattedMessage
  //                           id="REFRESH_DEVICE_LIST"
  //                           defaultMessage="Refresh Device List"
  //                         />
  //                     </button>
  //                   </div>
  //             </div>
  //             <div
  //                 className="column2"
  //                 style={{...this.getStyle('column2')}}
  //               >
  //               <span style={{...this.getStyle('headerLabel')}}>
  //                 <FormattedMessage
  //                     id="GENERAL_SETTINGS"
  //                     defaultMessage= "General settings:"
  //                   />
  //                 </span>
  //             <SettingsCheckbox
  //                 cbSubmitSetting={(data)=>{console.log('settings submit callback', data);}}
  //                 label="Use Video"
  //               />
  //               <SettingsCheckbox
  //                   cbSubmitSetting={(data)=>{console.log('settings submit callback', data);}}
  //                   label="Stereo Audio"
  //                 />
  //                 <SettingsCheckbox
  //                     cbSubmitSetting={(data)=>{console.log('settings submit callback', data);}}
  //                     label="Use STUN"
  //                   />
  //                   <SettingsCheckbox
  //                       cbSubmitSetting={(data)=>{console.log('settings submit callback', data);}}
  //                       label="Scale Remote Video to Match Camera Resolution"
  //                     />
  //                     <SettingsCheckbox
  //                         cbSubmitSetting={(data)=>{console.log('settings submit callback', data);}}
  //                         label="Ask Before Recovering a Call"
  //                       />
  //               <SettingsMenuSelect
  //                   cbSubmitSetting={(data)=>{console.log('settings submit callback', data);}}
  //                   options={this.props.settingsData.languages ? this.props.settingsData.languages : []}
  //                   label="Language:"
  //                   selectedOption={{id:"language", label:this.props.settingsData.language && this.props.settingsData.language.label}}
  //                 />
  //               <span style={{...this.getStyle('headerLabel')}}>
  //                 <FormattedMessage
  //                     id="AUDIO_SETTINGS"
  //                     defaultMessage= "Audio settings:"
  //                   />
  //                 </span>
  //                 <SettingsCheckbox
  //                     cbSubmitSetting={(data)=>{console.log('settings submit callback', data);}}
  //                     label="Echo Cancellation"
  //                   />
  //                   <SettingsCheckbox
  //                       cbSubmitSetting={(data)=>{console.log('settings submit callback', data);}}
  //                       label="Noise Suppression"
  //                     />
  //                     <SettingsCheckbox
  //                         cbSubmitSetting={(data)=>{console.log('settings submit callback', data);}}
  //                         label="Highpass Filter"
  //                       />
  //             </div>
  //             <div
  //                 className="column3"
  //                 style={{...this.getStyle('column3')}}
  //               >
  //                 <span style={{...this.getStyle('headerLabel')}}>
  //                   <FormattedMessage
  //                       id="VIDEO_SETTINGS"
  //                       defaultMessage= "Video settings:"
  //                     />
  //                   </span>
  //               <SettingsCheckbox
  //                   cbSubmitSetting={(data)=>{console.log('settings submit callback', data);}}
  //                   label="Automatically determine speed and resolution settings"
  //                 />
  //                 <SettingsCheckbox
  //                     cbSubmitSetting={(data)=>{console.log('settings submit callback', data);}}
  //                     label="Recheck Bandwidth Before Each Outgoing Call"
  //                   />
  //                 <div
  //                     className="buttonContainer"
  //                     style={{...this.getStyle('buttonContainer')}}
  //                     >
  //                   <button
  //                       style={{...this.getStyle('button')}}
  //                       onClick={this.submitSpeedCheck.bind(this)}
  //                     >
  //                     <FormattedMessage
  //                         id="CHECK_NETWORK_SPEED"
  //                         defaultMessage="Check Network Speed"
  //                       />
  //                   </button>
  //                 </div>
  //             </div>
  //         </div>
  //   );
  // }

  // getSettingsMenu(){
  //   let rSettings;
  //
  //   if (this.state.showSettings) {
  //     rSettings = (
  //       <div style={this.getStyle('settingsStyles')}>
  //           {settingsContainer}
  //       </div>
  //     );
  //   }
  //   //console.log('aaaa', rSettings, this.state.showSettings );
  //
  //   return rSettings;
  // }
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
      lastCall = (
        <div  className="lastCall" style={this.getStyle('lastCallStyles')}>
          Last Call: (941) 867-5309
        </div>
      );
    }

    // settings here
    //TODO define settings style for alt menu orientation
    // const settingsMenu = this.getSettingsMenu();
    // const settingsContainer = this.buildSettingsContainer();

    return (
      <div style={{position: "absolute", left: "0px", right: "0px", top: "0px"}}>
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
                  cbToggleShowSettings={this.settings.bind(this)}
                  settingsData={this.props.settings}
                  cbPreviewSet={()=>{App.toggleModal((<SettingsPreview settingsData={this.props.settings} cbClose={App.toggleModal}/>));}}
              />
            </div>
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
    contributorsData: state.app.contributors
  });
})(injectIntl(Radium(AppBar)));
