import React from 'react';
import VertoBaseComponent from '../../components/vertobasecomponent';
//import Radium from 'radium';
import { connect } from 'react-redux';
//import ReactTooltip from 'react-tooltip';
import VCStatus from '../../components/vcstatus';
import { doSubmitLogin, doSubmitLogOut, doMakeCall } from './action-creators';
import Splash from '../../components/splash';
import Login from '../../components/login';
import Dialpad from '../../components/dialpad';
import {injectIntl} from 'react-intl'




class Main extends VertoBaseComponent {
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

  makeCall(number) {
    console.log('calling ...', number, this.props.app);
    this.props.dispatch(doMakeCall(number, this.props.app));
  }

  render() {
    const { formatMessage } = this.props.intl;

    let loggedInfo;
    const splashObject = { ...this.props.auth.splash };

    switch (this.props.auth.showPage){
      case 'splash':
        switch(this.props.auth.splash.title){
          case 'browser':
            splashObject.title = formatMessage({"id":"BROWSER_COMPATIBILITY", "defaultMessage":"Checking browser compatibility."});
            break;
          case 'media':
            splashObject.title = formatMessage({"id":"CHECK_PERMISSION_MEDIA", "defaultMessage":"Checking media permissions"});
            break;
          case 'resolution':
          default:
            splashObject.title = formatMessage({"id":"CHECK_RESOLUTION", "defaultMessage":"Checking resolution."});
            break;
        }
        break;
      case 'login':
      case 'logout':
        loggedInfo = (
          <div>
            <Login cbClick={(data)=>{
              // fix websocket url
              this.props.dispatch(doSubmitLogin({ ...data, wsURL: data.websocketurl }));
            }} settings={this.props.auth.loginSettings} />
        </div>);
        break;
      case 'resolution_refresh':
        loggedInfo = (<div >Resolution Refresh .... in progress</div>);
        break;
      case 'loggedIn':
        loggedInfo = (
          <div>
            <Dialpad cbCall={this.makeCall.bind(this)} nbrToDial="1000" />
        </div>);
        break;
      case 'resolution_failed':
        splashObject.title = formatMessage({"id":"CHECK_RESOLUTION", "defaultMessage":"Checking resolution."});
        splashObject.errorObject = {
          header: formatMessage({"id":"ERRORS", "defaultMessage":"Errors"}),
          body: formatMessage({"id":"ERROR_PERMISSION_MEDIA", "defaultMessage":"Error: internal error checking resolution"})
        }
        break;
      case 'bns':
        console.log('BBBNNNNSSSS', this.props.auth);
        splashObject.title = formatMessage({"id":"BROWSER_COMPATIBILITY", "defaultMessage":"Checking browser compatibility."});
        splashObject.errorObject = {
          header: formatMessage({"id":"ERRORS", "defaultMessage":"Errors"}),
          body: formatMessage({"id":"BROWSER_WITHOUT_WEBRTC", "defaultMessage":"Error: browser doesn't support WebRTC"})
        }
        break;
      case 'noMedia':
        splashObject.title = formatMessage({"id":"CHECK_PERMISSION_MEDIA", "defaultMessage":"Checking media permissions"});
        splashObject.errorObject = {
          header: formatMessage({"id":"ERRORS", "defaultMessage":"Errors"}),
          body: formatMessage({"id":"ERROR_PERMISSION_MEDIA", "defaultMessage":"Error: Media Permission Denied"})
        }
        break;
      case 'call_inprogress':
        loggedInfo = (
          <div>call in progress screen --- will timeout after 5 seconds </div>
        );
        break;
      default:
        break;
    }
    let showSplash;
    if (this.props.auth.splash && this.props.auth.splash.current != this.props.auth.splash.number) {
      const intlTitle = formatMessage({"id": "LOADING", "defaultMessage": "Loading"});
      showSplash = (<Splash step={splashObject} title={intlTitle} />);
    }
    return (
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        {loggedInfo}
        {showSplash}
      </div>);
  }
}

export default connect((state)=>{
  return ({
    auth: state.auth,
    app: state.app
  });
})(injectIntl(Main));
