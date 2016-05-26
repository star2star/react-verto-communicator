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
        this.props.dispatch(doSubmitLogin({a:1,b:2}));
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
