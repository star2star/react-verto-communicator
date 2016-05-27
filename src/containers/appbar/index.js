import React from 'react';
import VertoBaseComponent from '../../components/vertobasecomponent';
import Radium from 'radium';
import { connect } from 'react-redux';
import WhiteLabel from '../../js/whitelabel.js';
//import ReactTooltip from 'react-tooltip';
import VCStatus from '../../components/vcstatus';
import NetworkStatusIndicator from '../../components/nsindicator';

class AppBar extends VertoBaseComponent {
  constructor(props) {
    super(props);

    this.state={};
  }

  componentWillMount() {
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
          }
        };

    return (styles[styleName]);
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
        <NetworkStatusIndicator compStyle={{container:{marginRight: '10px'}}}
            networkData={{upkpbs: this.props.bandwidthInfo.outgoingBandwidth,
                          downkpbs: this.props.bandwidthInfo.incomingBandwidth,
                          vidQual: vidQual}}
          />
      );
    }

    return (
      <div>
        <div className="appbar" style={this.getStyle('appbarStyles')}>
          <span className="appName" style={this.getStyle("appNameStyles")}>{appName}</span>

          <span className="appControls" style={this.getStyle('appControlStyles')}>
            {nsIndicator}
            <VCStatus status = {this.props.vcStatus} />
            <div>Last Call: .....</div>
            <div>S</div>
            <div> U </div>
            <div> A </div>
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
})(Radium(AppBar));
