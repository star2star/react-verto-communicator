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
        flex: '0 0 30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      timestampStyles: {
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '10px',
        paddingRight: '5px'
      },
      summaryStyles: {
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '5px',
        paddingRight: '5px'
        // overflowY: 'auto'
      },
      detailStyles: {
        flex: '1',
        display: 'flex',
        fontSize: '.75rem',
        alignItems: 'center',
        paddingRight: '10px'
        // overflowY: 'auto',
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
        <div className="item container" style={this.getStyle('alertItemStyles')}>
          <div className="tab" style={{...this.getStyle('typeTabStyles'), ...tabbgColor }}>
            <ControlItem type="RemoveIconSVG" cbActionClick={this.handleRemoveClick} />
          </div>
          <div className="timestamp" style={this.getStyle("timestampStyles")}>
            {formattedTimeStamp}
          </div><div className="summary" style={this.getStyle("summaryStyles")}>
            {this.props.alertData.summary}
          </div>
          <div className="detail" style={this.getStyle("detailStyles")}>
            {this.props.alertData.detail}
          </div>
        </div>
      );
  }
}

AlertLogItem.propTypes = propTypes;
