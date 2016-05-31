import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
//import SvgIcons from './svgIcons';
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl';

const propTypes = {
  Style : React.PropTypes.object,
  settings: React.PropTypes.object.isRequired
};

class Input extends VertoBaseComponent {
  render(){
    return (
      <div>
        <div>{this.props.label}</div>
        <div><input placeholder={this.props.placeholder} style={{}} onChange={
          (e) =>{
            this.props.cbChanging(this.props.label.replace(' ', '').toLowerCase(), e.target.value );
          }
        } defaultValue={this.props.value}/></div>
      </div>);
  }
}


class Login extends VertoBaseComponent{

  constructor(props) {
    super(props);
    this.state = {advanced: false, settings: this.props.settings };
    //console.log('&&&', this.props.settings)
  }

  changingInput(field, value){
    //console.log('xxxx', field, value);
    let xData = { ...this.state.settings };
    xData[field] = value;
    this.setState({ ...this.state, settings: xData });
    //console.log('....', this.state );
  }

  submitLogin() {
    //TODO validate data before sending
    //console.log('submitting login with this data: ', this.state.settings);
    this.props.cbClick(this.state.settings);
  }
  //TODO intl
  render() {
    const { formatMessage } = this.props.intl;

    let moreSettings;
    if (this.state.advanced) {
      moreSettings = (
        <span>
          <Input
              label={formatMessage({"id":"USER", "defaultMessage":"User"})}
              placeholder= {formatMessage({"id":"USER", "defaultMessage":"User"})+" i.e. 1008"}
              cbChanging={this.changingInput.bind(this)}
              value={this.state.settings.user}
          />
          <Input
              label={formatMessage({"id":"PASSWORD", "defaultMessage":"Password"})}
              placeholder={formatMessage({"id":"YOUR_PASSWORD", "defaultMessage":"Your Password"})+" i.e. 1234"}
              cbChanging={this.changingInput.bind(this)}
              value={this.state.settings.password}
          />
          <Input
              label={formatMessage({"id":"CALLER_ID", "defaultMessage":"Caller Id"})}
              placeholder={formatMessage({"id":"CALLER_ID", "defaultMessage":"Caller Id"})}
              cbChanging={this.changingInput.bind(this)}
              value={this.state.settings.callerid}
          />
          <Input
              label={formatMessage({"id":"HOSTNAME", "defaultMessage":"Hostname"})}
              placeholder={formatMessage({"id":"HOSTNAME", "defaultMessage":"Hostname"})}
              cbChanging={this.changingInput.bind(this)}
              value={this.state.settings.hostname}
          />
          <Input
              label={formatMessage({"id":"WEBSOCKET_URL", "defaultMessage":"Websocket URL"})}
              placeholder={formatMessage({"id":"WEBSOCKET_URL", "defaultMessage":"Websocket URL"})}
              cbChanging={this.changingInput.bind(this)}
              value={this.state.settings.websocketurl}/>
        </span>
      );
    }

    return (
      <div style={{background: "green", color: "yellow", display: "flex", alignItems: "center", flexDirection: "column", width: "300px"}}>
        <div><FormattedMessage id="LOGIN" defaultMessage="Login"/></div>
        <Input
            label={formatMessage({"id":"NAME", "defaultMessage":"Name"})}
            placeholder={formatMessage({"id":"YOUR_NAME", "defaultMessage":"Your name"})}
            cbChanging={this.changingInput.bind(this)}
            value={this.state.settings.name}
        />
        <Input
            label={formatMessage({"id":"EMAIL", "defaultMessage":"Email"})}
            placeholder={formatMessage({"id":"YOUR_EMAIL", "defaultMessage":"Your email"})}
            cbChanging={this.changingInput.bind(this)}
            value={this.state.settings.email}
        />
        {moreSettings}
        <div>
          <span onClick={()=>{
            this.setState({...this.state, advanced: !this.state.advanced });
          }}>{this.state.advanced ? <FormattedMessage id="LESS_SETTINGS" defaultMessage="Less Settings"/> :
              <FormattedMessage id="MORE_SETTINGS" defaultMessage="More Settings"/>}</span>
          <button onClick={this.submitLogin.bind(this)}><FormattedMessage id="LOGIN" defaultMessage="Login"/></button>
        </div>
      </div>);
  }
}

Login.propTypes = propTypes;

export default injectIntl(Login);
