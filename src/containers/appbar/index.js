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


class AppBar extends VertoBaseComponent {
  constructor(props) {
    super(props);

    this.state={showSettings: false };
  }

  componentWillMount() {
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
            order: '0',
            backgroundColor: '#0544a4',
            width: '100%',
            color: '#FFFFFF',
            height: '70px'
          },
          appNameStyles: {
            alignText: 'center',
            fontSize: '1.2rem',
            marginLeft: '20px'
          },
          appControlStyles: {
            display: 'flex',
            marginRight: '10px',
            justifyContent: 'space-around'
          },
          lastCallStyles: {
            marginRight: '15px'
          },
          settingsStyles: {
            opacity: '.9',
            backgroundColor: '#0A387F',
            color: '#FFFFFF'
          }
        };

    return (styles[styleName]);
  }

  settings(displaySettings) {
    //console.log('toggle settings', displaySettings);
    this.setState({ ...this.state, showSettings: displaySettings });
  }

  getSettingsMenu(){
    let rSettings;

    if (this.state.showSettings) {
      rSettings = (
        <div style={this.getStyle('settingsStyles')}>
          settings here
        </div>
      );
    }
    //console.log('aaaa', rSettings, this.state.showSettings );

    return rSettings;
  }
  render() {
    //console.log('#### window theme style', window.theme);
    //console.log('this.props.settings', this.props.settings);
    //console.log('this.props.bandwidthInfo', this.props.bandwidthInfo);

    const appName = WhiteLabel.get('appName');

    // only show network status if we have speed data ....
    let nsIndicator;
    if (this.props.bandwidthInfo.outgoingBandwidth && this.props.bandwidthInfo.incomingBandwidth) {
      const vidQual = this.props.bandwidthInfo.vidQual ? this.props.bandwidthInfo.vidQual : '';
      nsIndicator = (
        <NetworkStatusIndicator compStyle={{container:{marginRight: '20px'}}}
            networkData={{upkpbs: this.props.bandwidthInfo.outgoingBandwidth,
                          downkpbs: this.props.bandwidthInfo.incomingBandwidth,
                          vidQual: vidQual}}
          />
      );
    }

    // only show the 'Last Call' info if there is call history to retrieve it from
    // TODO - Check for call history in store and get the most recent one to build
    // the string
    let lastCall;
    if (true) {
      lastCall = (
        <div  className="lastCall" style={this.getStyle('lastCallStyles')}>
          Last Call: (941) 867-5309
        </div>
      );
    }

    // settings here
    const settingsMenu = this.getSettingsMenu();

    return (
      <div style={{position: "absolute", left: "0px", right: "0px", top: "0px"}}>
        <div className="appbar" style={this.getStyle('appbarStyles')}>
          <span className="appName" style={this.getStyle("appNameStyles")}>{appName}</span>

          <span className="appControls" style={this.getStyle('appControlStyles')}>
            {nsIndicator}
            <VCStatus status = {this.props.vcStatus} compStyle={{svgStyle:{marginRight: '20px'}}}/>
            {lastCall}
            <div style={{marginRight: '20px'}}>
              <Settings  allowDisplayDetails={this.props.vcStatus != 'disconnected'} cbClick={this.settings.bind(this)}
                data={this.props.settings} />
            </div>
            <div style={{marginRight: '20px'}}>
              <UserMenu allowDisplayDetails={this.props.vcStatus != 'disconnected'} >
                <MenuItem label="Open New Window" cbAction={()=>{
                  window.open(location.href);
                }} />
                <MenuItem label="Change Login Information" cbAction={()=>{
                  this.props.dispatch(doSubmitLogOut());
                }} />
                <MenuItem label="Logout" cbAction={()=>{
                  this.props.dispatch(doSubmitLogOut());
                }} />
              </UserMenu>

            </div>
            <div style={{marginRight: '20px'}}>
              <TagMenu allowDisplayDetails="true" >
                <MenuItem label="About" cbAction={()=>{

                  App.toggleModal((<About />));
                }} />
                <MenuItem label="Contributors" cbAction={()=>{

                  App.toggleModal((<Contributors />));
                }} />
                <MenuItem label="Help" cbAction={()=>{
                  window.open('https://freeswitch.org/confluence/display/FREESWITCH/Verto+Communicator');
                }} />
              </TagMenu>
            </div>
          </span>
        </div>
        {settingsMenu}
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
})(Radium(AppBar));
