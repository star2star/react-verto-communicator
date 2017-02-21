import React from 'react';
import VertoBaseComponent from './vertobasecomponent.js';
import {
SignalNoneIconSVG,
SignalMediumIconSVG,
SignalFullIconSVG,
SignalLowIconSVG } from './svgIcons';
import { injectIntl } from 'react-intl';
import ToolTip from './tooltip';
import { fromJS } from "immutable";



class NetworkStatusIndicator extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    allowDisplayDetails : React.PropTypes.bool,
    compStyle : React.PropTypes.object,
    networkData : React.PropTypes.object
  };

  static defaultProps = {
    allowDisplayDetails : true
  };

  static filename = "nsIndicator";
  static displayName = "NetworkStatusIndicator";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  getDefaultStyle(styleName) {
    const styles = {
      icon: {
        height: '24px',
        width: '24px'
      },
      header: {
        display: 'flex',
        justifyContent: 'center',
        color: '#4a4a4a',
        fontSize: '1rem',
        fontWeight: '700',
        padding: '5px',
        paddingTop: '10px',
        paddingBottom: '10px',
        margin: '0px',
        borderBottom: '1px solid #ebebeb',
        backgroundColor: '#F7F7F7',
        fontFamily: 'sans-serif',
        borderRadius: '5px 5px 0px 0px'
      },
      li: {
        minWidth: '250px',
        color: '#333',
        fontSize: '.9rem',
        fontWeight: 400,
        fontFamily: 'Helvetica',
        padding: '5px',
        paddingLeft: '15px',
        paddingRight: '15px'
      },
      noInfo: {
        display: 'flex',
        minWidth: '250px',
        color: '#333',
        fontSize: '.9rem',
        fontWeight: 400,
        fontFamily: 'Helvetica',
        padding: '15px',
        justifyContent: 'center'
      }
    };

    return (styles[styleName]);
  }

  render() {
    const { formatMessage } = this.props.intl;

    //console.log('&&&&&&&&&&&&& this.props.networkData', this.props.networkData);

    let bwp = 4;
    const networkData = this.props.networkData;
    if(networkData) {
      if(networkData.upkpbs < 2000) {
        bwp--;
      }
      if(networkData.downkpbs < 2000) {
        bwp--;
      }
    } else {
      bwp=0;
    }

    let icon;
    switch(bwp) {
        case 4:
            icon = (<SignalFullIconSVG svgStyle={{...this.getStyle('icon'), fill: '#4CAF50'}} />);
            break;
        case 3:
            icon = (<SignalMediumIconSVG svgStyle={{...this.getStyle('icon'), fill: 'yellow'}} />);
            break;
        case 0:
            icon = (<SignalNoneIconSVG svgStyle={{...this.getStyle('icon'), fill: '#F45A5A'}} />);
            break;
        default:
            icon = (<SignalLowIconSVG svgStyle={{...this.getStyle('icon'), fill: '#F45A5A'}} />);
    }

    let toolTipMessage;

    if(this.props.networkData) {
      toolTipMessage =(
        <span>
          <div style={this.getStyle('header')} >
              {formatMessage({"id":"BANDWIDTH_INFO", "defaultMessage":"Bandwidth Info"})}
          </div>
          <div
              style={this.getStyle('li')}
          >
            {formatMessage({"id":"BANDWIDTH_INFO_OUTGOING", "defaultMessage":"Bandwidth Info"})} {this.props.networkData.upkpbs}
          </div>
          <div
              style={this.getStyle('li')}
          >
            {formatMessage({"id":"BANDWIDTH_INFO_INCOMING", "defaultMessage":"Bandwidth Info"})} {this.props.networkData.downkpbs}
          </div>
          <div
              style={this.getStyle('li')}
          >
              {formatMessage({"id":"BANDWIDTH_INFO_VIDEO_RES", "defaultMessage":"Bandwidth Info"})} {this.props.networkData.vidQual}
          </div>
        </span>
      );
    } else {
      toolTipMessage =(
        <span>
          <div style={this.getStyle('header')} >
              {formatMessage({"id":"BANDWIDTH_INFO", "defaultMessage":"Bandwidth Info"})}
          </div>
          <div
              style={this.getStyle('noInfo')}
          >
            Information not currently available.
          </div>
        </span>
      );
    }

    if (this.props.allowDisplayDetails) {
      return  (<ToolTip place="bottom" name="nsi" msg={toolTipMessage} custStyle={{base:{marginTop:'10px'}, content:{padding:'0px'}}}>{icon}</ToolTip>) ;
    } else {
      return (icon);
    }
  }
}

export default injectIntl(NetworkStatusIndicator);
// reviewed on 7/14/2016
