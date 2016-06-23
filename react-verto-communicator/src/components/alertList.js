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
    this.nextId = 0;

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

    const alerts = this.state.alertArray.map((a, index)=>{
      return (
        <AlertItem
            key={a.id}
            alertData={a}
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
