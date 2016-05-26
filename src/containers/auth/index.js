import React from 'react';
import VertoBaseComponent from '../../components/vertobase';
//import Radium from 'radium';
import { connect } from 'react-redux';
//import ReactTooltip from 'react-tooltip';
import VCStatus from '../../components/vcstatus';
import { doSubmitLogin, doSubmitLogOut } from './action-creators';

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
    if (this.props.auth.showLogin ){
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

    } else {
      loggedInfo = (<div style={{cursor: "pointer"}}  onClick={()=>{
        this.props.dispatch(doSubmitLogOut());
      }} >Simulate LOGOUT</div>);
    }

    return (<div>auth {loggedInfo}</div>);
  }
}

export default connect((state)=>{
  return ({
    auth: state.auth
  });
})(Auth);
