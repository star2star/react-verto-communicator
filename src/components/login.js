import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import {injectIntl, FormattedMessage} from 'react-intl';
import Radium from 'radium';
import Input from './input';
import { fromJS } from "immutable";


class Login extends VertoBaseComponent{
  constructor(props) {
    super(props);
    this.state = {advanced: false, settings: this.props.settings, emptyFields: [] };

    this.changingInput = this.changingInput.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.poundOnClick = this.poundOnClick.bind(this);
  }

  static propTypes = {
    compStyle : React.PropTypes.object,
    settings: React.PropTypes.object
  };

  static defaultProps = {
    settings: {}
  };

  static filename = "login";
  static displayName = "Login";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  getDefaultStyle(styleName) {
    const styles = {
      container: {
        display: 'flex',
        padding: '30px',
        backgroundColor: '#fff',
        color: "rgba(0,0,0,84)",
        flexDirection: "column",
        boxShadow: "0px 8px 17px 0px rgba(0,0,0,.2), 0px 6px 20px 0px rgba(0,0,0,.19)",
        width: "30vw",
        '@media (max-width: 991px)': {
          width: '80vw'
        }
      },
      header: {
        fontSize: '24px',
        fontWeight: '300',
        marginTop: '0px',
        marginBottom: '20px'
      },
      settingsLoginCont: {
        display: 'flex',
        marginTop: '10px',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      settingsLink: {
        color: '#009688',
        fontWeight: '300',
        cursor: 'pointer',
        size: '12px',
        textDecoration: 'none',
        ':hover': {
          textDecoration: 'underline'
        }
      },
      verifyFields: {
        display: this.state.emptyFields.length > 0 ? 'flex' : 'none',
        backgroundColor: '#F44336',
        fontWeight: '300',
        color: '#fff',
        padding: '15px',
        marginBottom: '10px'
      },
      loginButton: {
        backgroundColor: '#5cb85c',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '400',
        padding: '8px 30px',
        border: '0px',
        margin: '10px 1px',
        cursor: 'pointer',
        borderRadius: '2px',
        textTransform: 'uppercase',
        textDecoration: 'none'
      }
    };

    return (styles[styleName]);
  }

  changingInput(field, value){
    let xData = { ...this.state.settings };
    xData[field] = value;
    const newEmptyFields = this.state.emptyFields.filter((f)=>f!==field);
    //console.log(field, value, newEmptyFields);
    this.setState({ ...this.state, settings: xData, emptyFields: newEmptyFields });
  }


  submitLogin() {
    //console.log('>>>>>>>>>>>>>>>>>>', this.state.settings);
    //TODO validate data before sending
    const newState = { ...this.state, 'emptyFields': [] };
    const emailExp = new RegExp(/(\w+)@(\w+)(\.)(\w)/);
    //valiate name
    if (this.state.settings.name.length === 0 ){
      newState.emptyFields.push('name');
    }
    if(!emailExp.test(this.state.settings.email)) {
      newState.emptyFields.push('email');
    }
    if (this.state.settings.user.length === 0 ){
      newState.emptyFields.push('user');
    }
    if (this.state.settings.password.length === 0 ){
      newState.emptyFields.push('password');
    }
    // if (this.state.settings.callerid.length === 0 ){
    //   newState.emptyFields.push('callerid');
    // }
    if (this.state.settings.hostname.length === 0 ){
      newState.emptyFields.push('hostname');
    }
    if (this.state.settings.websocketurl.length === 0 ){
      newState.emptyFields.push('websocketurl');
    }
    if (newState.emptyFields.length == 0){
      this.props.cbClick(this.state.settings);
    } else {
      this.setState(newState);
    }

  }

  poundOnClick(){
    this.setState({...this.state, advanced: !this.state.advanced });
  }


  render() {
    const { formatMessage } = this.props.intl;

    let moreSettings;
    if (this.state.advanced) {
      moreSettings = (
        <form>
          <Input
              tabindex="0"
              label={formatMessage({"id":"USER", "defaultMessage":"User"})}
              placeholder= {formatMessage({"id":"USER", "defaultMessage":"User"})+" i.e. 1008"}
              cbChanging={this.changingInput}
              value={this.state.settings.user}
              hasErrors={this.state.emptyFields.indexOf('user')>-1}
              errorLabel={formatMessage({"id":"PLEASE_ENTER", "defaultMessage":"Please enter a valid "}) + formatMessage({"id":"USER", "defaultMessage":"User"})}
          />
          <Input
              tabindex="0"
              type="password"
              label={formatMessage({"id":"PASSWORD", "defaultMessage":"Password"})}
              placeholder={formatMessage({"id":"YOUR_PASSWORD", "defaultMessage":"Your Password"})+" i.e. 1234"}
              cbChanging={this.changingInput}
              value={this.state.settings.password}
              hasErrors={this.state.emptyFields.indexOf('password')>-1}
              errorLabel={formatMessage({"id":"PLEASE_ENTER", "defaultMessage":"Please enter a valid "}) + formatMessage({"id":"PASSWORD", "defaultMessage":"Password"})}
          />
          <Input
              tabindex="0"
              label={formatMessage({"id":"CALLER_ID", "defaultMessage":"Caller Id"})}
              placeholder={formatMessage({"id":"CALLER_ID", "defaultMessage":"Caller Id"})}
              cbChanging={this.changingInput}
              value={this.state.settings.callerid}
              hasErrors={this.state.emptyFields.indexOf('callerid')>-1}
              errorLabel={formatMessage({"id":"PLEASE_ENTER", "defaultMessage":"Please enter a valid "}) + formatMessage({"id":"CALLER_ID", "defaultMessage":"Caller ID"})}
          />
          <Input
              tabindex="0"
              label={formatMessage({"id":"HOSTNAME", "defaultMessage":"Hostname"})}
              placeholder={formatMessage({"id":"HOSTNAME", "defaultMessage":"Hostname"})}
              cbChanging={this.changingInput}
              value={this.state.settings.hostname}
              hasErrors={this.state.emptyFields.indexOf('hostname')>-1}
              errorLabel={formatMessage({"id":"PLEASE_ENTER", "defaultMessage":"Please enter a valid "}) + formatMessage({"id":"HOSTNAME", "defaultMessage":"Hostname"})}
          />
          <Input
              tabindex="0"
              label={formatMessage({"id":"WEBSOCKET_URL", "defaultMessage":"Websocket URL"})}
              placeholder={formatMessage({"id":"WEBSOCKET_URL", "defaultMessage":"Websocket URL"})}
              cbChanging={this.changingInput}
              value={this.state.settings.websocketurl}
              hasErrors={this.state.emptyFields.indexOf('websocketurl')>-1}
              errorLabel={formatMessage({"id":"PLEASE_ENTER", "defaultMessage":"Please enter a valid "}) + formatMessage({"id":"WEBSOCKET_URL", "defaultMessage":"Websock URL"})}
              />
        </form>
      );
    }

    return (
      <div style={{...this.getStyle('container')}}>
        <div style={{...this.getStyle('header')}}>
          <FormattedMessage id="LOGIN" defaultMessage="Login"  />
        </div>
        <div
            style={{...this.getStyle('verifyFields')}}
        >
            Verify fields below and try again.
        </div>
        <Input
            label={formatMessage({"id":"NAME", "defaultMessage":"Name"})}
            placeholder={formatMessage({"id":"YOUR_NAME", "defaultMessage":"Your name"})}
            cbChanging={this.changingInput}
            value={this.state.settings.name}
            hasErrors={this.state.emptyFields.indexOf('name')>-1}
            errorLabel={formatMessage({"id":"PLEASE_ENTER", "defaultMessage":"Caller Id"}) + formatMessage({"id":"NAME", "defaultMessage":"Name"})}
        />
        <Input
            label={formatMessage({"id":"EMAIL", "defaultMessage":"Email"})}
            placeholder={formatMessage({"id":"YOUR_EMAIL", "defaultMessage":"Your email"})}
            cbChanging={this.changingInput}
            value={this.state.settings.email}
            hasErrors={this.state.emptyFields.indexOf('email')>-1}
            errorLabel={formatMessage({"id":"PLEASE_ENTER", "defaultMessage":"Caller Id"}) + formatMessage({"id":"EMAIL", "defaultMessage":"Email"})}
        />
        {moreSettings}
        <div style={{...this.getStyle('settingsLoginCont')}}>
          <a
              href="#"
              style={{...this.getStyle('settingsLink')}}
              onClick={this.poundOnClick}
          >
              {this.state.advanced ? <FormattedMessage id="LESS_SETTINGS" defaultMessage="Less Settings"/> :
              <FormattedMessage id="MORE_SETTINGS" defaultMessage="More Settings"/>}</a>
          <button
              style={{...this.getStyle('loginButton')}}
              onClick={this.submitLogin}
          >
            <FormattedMessage id="LOGIN" defaultMessage="Login"/>
          </button>
        </div>
      </div>);
  }
}

export default injectIntl(Radium(Login));
// reviewed on 7/13/2016
