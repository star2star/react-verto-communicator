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
import { doSubmitLogOut } from '../main/action-creators';
import App from '../../components/app';
import About from '../../components/about';
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

  // getSettingsMenu(){
  //   let rSettings;
  //
  //   if (this.state.showSettings) {
  //     rSettings = (
  //       <div style={this.getStyle('settingsStyles')}>
  //         <Settings />
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
              <Settings  allowDisplayDetails={this.props.vcStatus != 'disconnected'} cbToggleShowSettings={this.settings.bind(this)}
                  settingsData={this.props.settings} />
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
                <MenuItem label={formatMessage({"id":"TITLE_CONTRIBUTORS", "defaultMessage":"Contributors"})} cbAction={()=>{

                  App.toggleModal((<Contributors />));
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
    vcStatus: state.auth.vcStatus
  });
})(injectIntl(Radium(AppBar)));
