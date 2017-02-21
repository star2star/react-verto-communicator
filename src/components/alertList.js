import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import AlertItem from './alertItem';
import { fromJS } from "immutable";


class AlertList extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {alertArray: []};
    this.nextId = 0;

    this.handleNewAlert = this.handleNewAlert.bind(this);
    this.handleDismissAlert = this.handleDismissAlert.bind(this);
  }

  static propTypes = {
    compStyle : React.PropTypes.object
  };

  static filename = "alertList";
  static displayName = "AlertList";

  componentDidMount(){
    document.addEventListener('alert', this.handleNewAlert);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  getDefaultStyle(styleName) {
    const styles = {
      ALStyles : {
        maxHeight: '100%', // need this so list will scroll on overflow...
        overflowY: 'auto',
        position: 'absolute',
        top: '10px',
        right: '15px',
        width: '30vw',
        maxWidth: '300px'
      }
    };

    return styles[styleName];
  }

  handleNewAlert(e){
    // add the new alert to start of this.state.alertArray.  Use concat!!!!
    const newObj = { ...e.detail.alert, id: this.nextId++};

    this.setState({...this.state, alertArray: [newObj].concat(this.state.alertArray)});
  }

  handleDismissAlert(id) {
    // remove the alert at dismissIndex from this.state.alertArray

    let newAlertArray = this.state.alertArray.filter((a)=>{
      return a.id != id;
    });

    this.setState({...this.state, alertArray: newAlertArray});
  }

  render(){
    //console.log('---- ', this.state.alertArray);

    return(
        <div className="alertList" style={this.getStyle("ALStyles")}>
        {this.state.alertArray.map((a)=>{
          return (
            <AlertItem
                key={a.id}
                alertData={a}
                cbDismissAlert={this.handleDismissAlert}
            /> );
        })}
        </div>
      );
  }
}

export default AlertList;
// reviewed 7/13/2016
