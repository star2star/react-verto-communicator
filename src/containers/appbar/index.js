import React from 'react';
import VertoBaseComponent from '../../components/vertobase';
import Radium from 'radium';
import { connect } from 'react-redux';
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
          }
        };

    return (styles[styleName]);
  }

  render() {
    //console.log('#### window theme style', window.theme);
    //console.log('this.props.settings', this.props.settings);
    //console.log('this.props.bandwidthInfo', this.props.bandwidthInfo);

    return (
      <div>
        <div className="appbar" style={this.getStyle('appbarStyles')}>
          <VCStatus status="Connecting" />
          <NetworkStatusIndicator
              conn={{upkpbs: 2000, downkpbs: 1000, vidQual: 'Fantastic'}}
          />
        </div>
      </div>
    );
  }
}

export default Radium(AppBar);

export default connect((state)=>{
  console.log('----STORE in appbar ----', state);
  return ({
    settings: state.app.settings,
    bandwidthInfo: state.app.bandwidthInfo
  });
})(Radium(AppBar));
