import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import {injectIntl, FormattedMessage} from 'react-intl';
import Radium from 'radium';
import Input from './input';

const propTypes = {
  compStyle : React.PropTypes.object,
  settings: React.PropTypes.object.isRequired
};

class Login extends VertoBaseComponent{
  constructor(props) {
    super(props);
    this.state = {advanced: false, settings: this.props.settings, emptyFields: false };

    this.changingInput = this.changingInput.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
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
        display: this.state.emptyFields ? 'flex' : 'none',
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
    this.setState({ ...this.state, settings: xData, emptyFields: false });
  }

  submitLogin() {
    //TODO validate data before sending
    //const emailExp = new RegExp('[\w-]+@([\w-]+\.)+[\w-]+');
    if (this.state.settings.name.length > 0 && this.state.settings.email.length > 0){
      this.props.cbClick(this.state.settings);
      // if(this.state.settings.email.value == emailExp) {
      //   this.props.cbClick(this.state.settings);
      // } else {
      //   this.setState({...this.state, emptyFields: true});
      // }
    } else {
      this.setState({...this.state, emptyFields: true});
    }
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
          />
          <Input
              tabindex="0"
              type="password"
              label={formatMessage({"id":"PASSWORD", "defaultMessage":"Password"})}
              placeholder={formatMessage({"id":"YOUR_PASSWORD", "defaultMessage":"Your Password"})+" i.e. 1234"}
              cbChanging={this.changingInput}
              value={this.state.settings.password}
          />
          <Input
              tabindex="0"
              label={formatMessage({"id":"CALLER_ID", "defaultMessage":"Caller Id"})}
              placeholder={formatMessage({"id":"CALLER_ID", "defaultMessage":"Caller Id"})}
              cbChanging={this.changingInput}
              value={this.state.settings.callerid}
          />
          <Input
              tabindex="0"
              label={formatMessage({"id":"HOSTNAME", "defaultMessage":"Hostname"})}
              placeholder={formatMessage({"id":"HOSTNAME", "defaultMessage":"Hostname"})}
              cbChanging={this.changingInput}
              value={this.state.settings.hostname}
          />
          <Input
              tabindex="0"
              label={formatMessage({"id":"WEBSOCKET_URL", "defaultMessage":"Websocket URL"})}
              placeholder={formatMessage({"id":"WEBSOCKET_URL", "defaultMessage":"Websocket URL"})}
              cbChanging={this.changingInput}
              value={this.state.settings.websocketurl}/>
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
        />
        <Input
            label={formatMessage({"id":"EMAIL", "defaultMessage":"Email"})}
            placeholder={formatMessage({"id":"YOUR_EMAIL", "defaultMessage":"Your email"})}
            cbChanging={this.changingInput}
            value={this.state.settings.email}
        />
        {moreSettings}
        <div style={{...this.getStyle('settingsLoginCont')}}>
          <a
              href="#"
              style={{...this.getStyle('settingsLink')}}
              onClick={()=>{
                this.setState({...this.state, advanced: !this.state.advanced });
              }}
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

Login.propTypes = propTypes;
export default injectIntl(Radium(Login));
// reviewed on 7/13/2016
