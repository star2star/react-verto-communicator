import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import AlertItem from './alertItem';

const propTypes = {
  compStyle : React.PropTypes.object
};

export default class AlertList extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {alertArray: []};

    this.handleNewAlert = this.handleNewAlert.bind(this);
    this.handleDismissAlert = this.handleDismissAlert.bind(this);
  }

  componentDidMount(){
    document.addEventListener('alert', this.handleNewAlert);

  }

  getCompStyle() {
    return this.props.compStyle;
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

    let styleReturn = styles[styleName];
      if(this.props.style && this.props.style[styleName]) {
        styleReturn = {...styleReturn, ...this.props.style[styleName]};
      }
    return styleReturn;
  }

  handleNewAlert(e){
    // add the new alert to start of this.state.alertArray.  Use concat!!!!
    console.log('alert event!!', e.detail);

    this.setState({...this.state, alertArray: [e.detail.alert].concat(this.state.alertArray)});
  }

  handleDismissAlert(dismissIndex) {
    // remove the alert at dismissIndex from this.state.alertArray
    let newAlertArray = this.state.alertArray.filter((alert, index)=>{return(dismissIndex !== index);});

    this.setState({...this.state, alertArray: newAlertArray});
  }


  render(){
    //console.log('---- ', this.state.alertArray);
    console.log('this.handleDismissAlert', this.handleDismissAlert);


    const alerts = this.state.alertArray.map((alert, index)=>{
      return (
        <AlertItem
            key={index}
            index={index}
            alertData={alert}
            cbDismissAlert={this.handleDismissAlert}
        /> );
    });

    return(
        <div className="alertList" style={this.getStyle('ALStyles')}>
        {alerts}
        </div>
      );
  }
}

AlertList.propTypes = propTypes;
