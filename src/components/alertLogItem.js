import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import ControlItem from './controlItem';
import moment from 'moment';
import { fromJS } from "immutable";


class AlertLogItem extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {};

    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  static propTypes = {
    alertData: React.PropTypes.object.isRequired,
    cbRemoveAlert : React.PropTypes.func.isRequired,
    compStyle : React.PropTypes.object,
    index : React.PropTypes.number
  };

  static defaultProps = {
    alertData: {},
    cbRemoveAlert : ()=>{}
  };

  static filename = "alertLogItem";
  static displayName = "AlertLogItem";

  handleRemoveClick() {
    this.props.cbRemoveAlert(this.props.index);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  getDefaultStyle(styleName) {
    const styles = {
      alertItemStyles : {
        display: 'flex',
        border: '1px solid #d1d1d1',
        backgroundColor: '#FFF'
      },
      typeTabStyles: {
        flex: '0 0 30px',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '5px',
        alignItems: 'flex-start'
      },
      timestampStyles: {
        flex: '1',
        display: 'flex',
        alignItems: 'flex-start',
        paddingTop: '5px',
        paddingLeft: '10px',
        paddingRight: '5px'
      },
      summaryStyles: {
        flex: '1',
        display: 'flex',
        alignItems: 'flex-start',
        padding: '5px'
        // overflowY: 'auto'
      },
      detailStyles: {
        flex: '1',
        display: 'flex',
        alignItems: 'flex-start',
        paddingRight: '10px',
        paddingTop: '5px',
        paddingBottom: '5px'
        // overflowY: 'auto',
      },
      compStyle : {
        controlStyle: {
          flex: '1'
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
        <div className="item container" style={this.getStyle("alertItemStyles")}>
          <div className="tab" style={{...this.getStyle("typeTabStyles"), ...tabbgColor }}>
            <ControlItem type="RemoveIconSVG" cbActionClick={this.handleRemoveClick} />
          </div>
          <div className="timestamp" style={this.getStyle("timestampStyles")}>
            {formattedTimeStamp}
          </div>
          <div className="summary" style={this.getStyle("summaryStyles")}>
            {this.props.alertData.summary}
          </div>
          <div className="detail" style={this.getStyle("detailStyles")}>
            {this.props.alertData.detail}
          </div>
        </div>
      );
  }
}

export default AlertLogItem;
// reviewed 7/13/2016
