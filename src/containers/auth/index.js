import React from 'react';
import VertoBaseComponent from '../../components/vertobasecomponent';
//import Radium from 'radium';
import { connect } from 'react-redux';
//import ReactTooltip from 'react-tooltip';
import VCStatus from '../../components/vcstatus';
import { doSubmitLogin, doSubmitLogOut } from './action-creators';
import Browser from '../../components/browser';
import NoMedia from '../../components/nomedia';

class Auth extends VertoBaseComponent {
  constructor(props) {
    super(props);

    this.state={};
  }

  componentWillMount() {
  }

  getDefaultStyle(styleName) {
    const styles = {

        };

    return (styles[styleName]);
  }

  render() {
    let loggedInfo;
    switch (this.props.auth.showPage){
      case 'login':
      case 'logout':
        loggedInfo = (<div style={{cursor: "pointer"}} onClick={()=>{
          const xLoginData = { ...this.props.auth.loginSettings};
          xLoginData.callerId = 'James';
          xLoginData.email = 'james@james.com';
          xLoginData.user = 1008;
          xLoginData.hostname = "verto.star2starglobal.com";
          xLoginData.name = "James Schimmoeller";
          xLoginData.wsURL = "wss://verto.star2starglobal.com:8082"

          this.props.dispatch(doSubmitLogin(xLoginData));
        }} >Simulate login</div>);
        break;
      case 'resolution_refresh':
        loggedInfo = (<div >Resolution Refresh .... in progress</div>);
        break;
      case 'loggedIn':
        loggedInfo = (<div style={{cursor: "pointer"}}  onClick={()=>{
          this.props.dispatch(doSubmitLogOut());
        }} >Simulate LOGOUT</div>);
        break;
      case 'resolution_failed':
        loggedInfo = (<div >Resolution failed</div>);
        break;
      case 'bns':
        loggedInfo = (<Browser />);
        break;
      case 'noMedia':
        loggedInfo = (<NoMedia />);
        break;
      default:
        break;
    }

    return (<div>auth {loggedInfo}</div>);
  }
}

export default connect((state)=>{
  return ({
    auth: state.auth
  });
})(Auth);
