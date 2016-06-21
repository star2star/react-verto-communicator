import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import ControlItem from './controlItem';
import moment from 'moment';


const propTypes = {
  alertData: React.PropTypes.object.isRequired,
  cbRemoveAlert : React.PropTypes.func.isRequired,
  compStyle : React.PropTypes.object,
  index : React.PropTypes.number
};

export default class AlertLogItem extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {};

    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  handleRemoveClick() {
    this.props.cbRemoveAlert(this.props.index);
  }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      alertItemStyles : {
        display: 'flex',
        border: '1px solid #d1d1d1',
        backgroundColor: '#FAFAFA'
      },
      typeTabStyles: {
        flex: '0 0 30px'
      },
      summaryStyles: {
        flex: '1',
        overflowY: 'auto'
      },
      timestampStyles: {
        flex: '1'
      },
      detailStyles: {
        flex: '1',
        overflowY: 'auto'
      },
      compStyle : {
        controlStyle: {
          flex: 1
        }
      }
    };

    let styleReturn = styles[styleName];
    return styleReturn;
  }

  render(){
    //console.log('---- ', this.props.alertData);
    let tabbgColor;
    switch (this.props.alertData.level) {
      case 'error':
        tabbgColor = {backgroundColor: '#FD5F56'};
        break;
      case 'warn':
        tabbgColor = {backgroundColor: '#FFC02F'};
        break;
      case 'info':
      default:
        tabbgColor = {backgroundColor: '#63B653'};
    }
    const formattedTimeStamp = moment(this.props.alertData.timestamp).format('ddd MMM DD YYYY HH:mm:ss A');

    return(
        <div style={this.getStyle('alertItemStyles')}>
          <div style={{...this.getStyle('typeTabStyles'), ...tabbgColor }}>
            <ControlItem type="RemoveIconSVG" cbActionClick={this.handleRemoveClick} />
          </div>
          <div style={this.getStyle("timestampStyles")}>
            {formattedTimeStamp}
          </div><div style={this.getStyle("summaryStyles")}>
            {this.props.alertData.summary}
          </div>
          <div style={this.getStyle("detailStyles")}>
            {this.props.alertData.detail}
          </div>
        </div>
      );
  }
}

AlertLogItem.propTypes = propTypes;
