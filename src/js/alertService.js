let _instance;

class AlertService {
  constructor(){
    let lsAlertLog;
    if (localStorage) {
      lsAlertLog = JSON.parse(localStorage.getItem('alerts'));
    }
    this.alerts = lsAlertLog;

  }

  createAlert(objAlertItem) {
    //console.log('alert: create', objAlertItem);ß
    // objAlertItem
    // {
    //    level: info/warn/error
    //    timestamp:
    //    summary: brief string that will go in headingStyle
    //    detail: more information on the alert...
    // }

    // initialize if alerts log does not exist
    if (!this.alerts){
      this.alerts = [];
    }
    this.alerts = [].concat(objAlertItem, this.alerts);
    if (localStorage) {
      localStorage.setItem('alerts', JSON.stringify(this.alerts));
    }

    let event = new CustomEvent('alert', { detail: {alert: objAlertItem}});

    document.dispatchEvent(event);
  }

  clearAlerts(){
    this.alerts = [];

    // clear the local storage
    if (localStorage) {
      localStorage.setItem('alerts', JSON.stringify(this.alerts));
    }
  }

  setAlertLog(alertArray){
    this.alerts = alertArray;
    // update the local storage
    if (localStorage) {
      localStorage.setItem('alerts', JSON.stringify(this.alerts));
    }
  }

  getAlertLog(){
    // converting object to array and sorting descending on lasttimestamp
    if (this.alerts){
      return this.alerts.sort((a,b)=>{
        return a.timestamp < b.timestamp;
      });
    } else {
      return [];
    }

  }

  static getInstance() {
    if (!_instance) {
      _instance = new AlertService();
    }

    return _instance;
  }

}

//exporting
export default AlertService;
