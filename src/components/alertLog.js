import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import { injectIntl, FormattedMessage } from 'react-intl';
import AlertService from '../js/alertService';
import AlertLogItem from './alertLogItem';
import Modal from 'react-modal';

const propTypes = {
  compStyle : React.PropTypes.object
};

export default class AlertLog extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {};

    this.state.alertArray=AlertService.getInstance().getAlertLog();

    this.handleRemoveAlert = this.handleRemoveAlert.bind(this);
    this.handleClearAlerts= this.handleClearAlerts.bind(this);
  }

  getCompStyle() {
    return this.props.compStyle;
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

    let styleReturn = styles[styleName];
      if(this.props.style && this.props.style[styleName]) {
        styleReturn = {...styleReturn, ...this.props.style[styleName]};
      }
    return styleReturn;
  }

  handleRemoveAlert(removeIndex) {
    // remove the alert at dismissIndex from this.state.alertArray
    let newAlertArray = this.state.alertArray.filter((alert, index)=>{return(removeIndex !== index);});

    console.log('$$$$$$$$$ REmove alert from log', removeIndex);
    AlertService.getInstance().setAlertLog(newAlertArray);
    this.setState({...this.state, alertArray: AlertService.getInstance().getAlertLog()});
  }

  handleClearAlerts(){
    AlertService.getInstance().clearAlerts();
    this.setState({...this.state, alertArray: AlertService.getInstance().getAlertLog()});
  }

  render(){
    // const alertArray= AlertService.getInstance().getAlertLog();

    //console.log('##### alert log data', alertArray);

    const alerts = this.state.alertArray.map((alert, index)=>{
      return (
        <AlertLogItem
            key={index}
            index={index}
            alertData={alert}
            cbRemoveAlert={this.handleRemoveAlert}

        /> );
    });

    if (alerts.length !== 0) {
      return(
        <Modal isOpen onRequestClose={this.props.cbClose} style={this.getStyle('myModal')}>
          <div className="container">
            <button
                style={this.getStyle("clearAlertBtnStyle")}
                onClick={this.handleClearAlerts}>
                  <FormattedMessage
                      id="CLEAR_ALERTS"
                      defaultMessage="Clear Alerts"
                  />
            </button>
              <div className="alertList" style={this.getStyle('ALogStyles')}>
              {alerts}
              </div>
          </div>
        </Modal>
        );
    } else {
      return (
        <Modal isOpen onRequestClose={this.props.cbClose} style={this.getStyle('myModal')}>
          <div className="nodatacontainer" style={this.getStyle('noDataContainer')}>
            <FormattedMessage
                id="NO_LOG"
                defaultMessage="No Log Data"
            />
          </div>
        </Modal>
      );
    }
  }
}

AlertLog.propTypes = propTypes;
