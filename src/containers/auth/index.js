import React from 'react';
import VertoBaseComponent from '../../components/vertobasecomponent';
//import Radium from 'radium';
import { connect } from 'react-redux';
//import ReactTooltip from 'react-tooltip';
import VCStatus from '../../components/vcstatus';
import { doSubmitLogin, doSubmitLogOut } from './action-creators';
import Splash from '../../components/splash';
import Login from '../../components/login';



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
        loggedInfo = (
          <div>
            <Login cbClick={(data)=>{
              const xLoginData = { ...data};
              xLoginData.wsURL = data.websocketurl;

              this.props.dispatch(doSubmitLogin(xLoginData));
            }} settings={this.props.auth.loginSettings} />
        </div>);
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
        //TODO fix splash object here intl
        //loggedInfo = (<div >Resolution failed</div>);
        break;
      case 'bns':
        //TODO fix splash object here intl
        //loggedInfo = (<Browser />);
        break;
      case 'noMedia':
        //TODO fix splash object here intl
        //loggedInfo = (<NoMedia />);
        break;
      default:
        break;
    }
    let showSplash;
    if (this.props.auth.splash && this.props.auth.splash.current != this.props.auth.splash.number) {
      showSplash = (<Splash step={this.props.auth.splash} />);
    }
    return (
      <div>
        {loggedInfo}
        {showSplash}
      </div>);
  }
}

export default connect((state)=>{
  return ({
    auth: state.auth
  });
})(Auth);
