import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import { FormattedMessage } from 'react-intl';
import AlertService from '../js/alertService';
import AlertLogItem from './alertLogItem';
import Modal from 'react-modal';
import { fromJS } from "immutable";


class AlertLog extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {};

    this.state.alertArray = AlertService.getInstance().getAlertLog();

    this.handleRemoveAlert = this.handleRemoveAlert.bind(this);
    this.handleClearAlerts= this.handleClearAlerts.bind(this);
  }

  static propTypes = {
    compStyle : React.PropTypes.object
  };

  static filename = "alertLog";
  static displayName = "AlertLog";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  getDefaultStyle(styleName) {
    const styles = {
      ALogStyles : {
        maxHeight: '60vh',
        overflowY: 'auto',
        width: '60vw',
        minWidth: '400px',
        fontSize: '.8rem'
      },
      myModal : {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#FAFAFA',
          boxShadow: '0px 27px 24px 0px rgba(0,0,0,.2), 0px 40px 77px 0px rgba(0,0,0,.22)'
        },
        overlay: {
          zIndex: "1"
        }
      },
      noDataContainer : {
        padding: '75px',
        fontWeight: '500'
        // backgroundColor: '#FAFAFA'
      },
      clearAlertBtnStyle : {
        padding: '8px 30px',
        border: '0px',
        borderRadius: '3px',
        fontSize: '.75rem',
        fontWeight: '400',
        margin: '25px 0px 10px 0px',
        cursor: 'pointer',
        backgroundColor: '#3974D9',
        color: '#FFF',
        textTransform: 'uppercase'
      }
    };

    return styles[styleName];
  }

  handleRemoveAlert(removeIndex) {
    // remove the alert at dismissIndex from this.state.alertArray
    let newAlertArray = this.state.alertArray.filter((alert, index)=>{return(removeIndex !== index);});

    // console.log('->->->->->-> Remove alert from log', removeIndex);
    AlertService.getInstance().setAlertLog(newAlertArray);
    this.setState({...this.state, alertArray: AlertService.getInstance().getAlertLog()});
  }

  handleClearAlerts(){
    AlertService.getInstance().clearAlerts();
    this.setState({...this.state, alertArray: AlertService.getInstance().getAlertLog()});
  }

  render(){
    // const alertArray= AlertService.getInstance().getAlertLog();
    // console.log('##### alert log data', alertArray);

    let alertContent;
    if (this.state.alertArray.length !== 0) {
      alertContent = (
        <div className="container">
          <button
              style={this.getStyle("clearAlertBtnStyle")}
              onClick={this.handleClearAlerts}>
                <FormattedMessage
                    id="CLEAR_ALERTS"
                    defaultMessage="Clear Alerts"
                />
          </button>
            <div className="alertList" style={this.getStyle("ALogStyles")}>
            {this.state.alertArray.map((alert, index)=>{
              return (
                <AlertLogItem
                    key={index}
                    index={index}
                    alertData={alert}
                    cbRemoveAlert={this.handleRemoveAlert}

                /> );
            })}
            </div>
        </div>
      );
    } else {
      alertContent = (
        <div className="nodatacontainer" style={this.getStyle("noDataContainer")}>
          <FormattedMessage
              id="NO_LOG"
              defaultMessage="No Log Data"
          />
        </div>
      );
    }
    return(
        <Modal isOpen contentLabel = "Alerts Modal" onRequestClose={this.props.cbClose} style={this.getStyle("myModal")}>
          {alertContent}
        </Modal>
    );
  }
}

export default AlertLog;
// reviewed 7/13/2016
