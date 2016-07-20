import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import { StatusIconSVG } from './svgIcons';
import ToolTip from './tooltip';
import { injectIntl } from 'react-intl';

const propTypes = {
  status: React.PropTypes.oneOf(['connected','disconnected', 'connecting', 'active']).isRequired,
  compStyle:   React.PropTypes.object,
  ttPosition: React.PropTypes.string.isRequired
};

class VCStatus extends VertoBaseComponent {
  constructor(props) {
    super(props);
  }


  getDefaultStyle(styleName) {
      const styles = {
            svgStyle: {
              width: '24px',
              height: '24px'
            },
            disconnectedFill: {
              fill: "#F45A5A"
            },
            connectingFill: {
              fill: "#F7D965"
            },
            connectedFill: {
              fill: "#4ACF55"
            }
      };
      return (styles[styleName]);
  }

  render() {
    const { formatMessage } = this.props.intl;
    let fillColor;
    let intlStatus;
    switch (this.props.status) {
      case 'disconnected':
        fillColor = this.getStyle('disconnectedFill');
        intlStatus = formatMessage({"id":"DISCONNECTED", "defaultMessage":"Disconnected"});
        break;
      case 'connecting':
        fillColor = this.getStyle('connectingFill');
        intlStatus = formatMessage({"id":"CONNECTING", "defaultMessage":"Connecting"});
        break;
      case 'active':
        fillColor = this.getStyle('connectingFill');
        intlStatus = formatMessage({"id":"ACTIVE", "defaultMessage":"Active"});
        break;
      case 'connected':
        fillColor = this.getStyle('connectedFill');
        intlStatus = formatMessage({"id":"CONNECTED", "defaultMessage":"Connected"});
        break;
      default:
        fillColor = this.getDefaultStyle('disconnectedFill');
        intlStatus = formatMessage({"id":"DISCONNECTED", "defaultMessage":"Disconnected"});
        break;
      }

    //console.log("$$$$$$$$$$$$$$$$$$$$$$" + intlStatus);
    const theMsg = formatMessage({"id":"COM_STATUS", "defaultMessage":"Communication Status: "}) + intlStatus;

     return (
        <ToolTip name="vcStatus" place={this.props.ttPosition} msg={theMsg} custStyle={{base:{marginTop: '10px'}}}>
          <StatusIconSVG svgStyle = {{...this.getStyle('svgStyle'), ...fillColor}} />
        </ToolTip>
     );
  }
}

VCStatus.propTypes = propTypes;

export default injectIntl(VCStatus);
// reviewed on 7/14/2016
