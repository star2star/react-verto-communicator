import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import SvgIcons from './svgIcons';

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
        } value={this.props.value}/></div>
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
    console.log('submitting login with this data: ', this.state.settings);
    this.props.cbClick(this.state.settings)
  }
  //TODO intl
  render() {
    let moreSettings;
    if (this.state.advanced) {
      moreSettings = (
        <span>
          <Input label="User" placeholder="User i.e. 1008"  cbChanging={this.changingInput.bind(this)} value={this.state.settings.user}/>
          <Input label="Password" placeholder="Your Password i.e. 1234"  cbChanging={this.changingInput.bind(this)}  value={this.state.settings.password}/>
          <Input label="Caller ID" placeholder="Caller ID"  cbChanging={this.changingInput.bind(this)} value={this.state.settings.callerid}/>
          <Input label="Hostname" placeholder="Hostname" cbChanging={this.changingInput.bind(this)}  value={this.state.settings.hostname}/>
          <Input label="Websocket URL" placeholder="websocket url" cbChanging={this.changingInput.bind(this)}  value={this.state.settings.websocketurl}/>
        </span>
      );
    }

    return (
      <div style={{background: "green", color: "yellow", display: "flex", alignItems: "center", flexDirection: "column", width: "300px"}}>
        <div>Login</div>
        <Input label="Name" placeholder="Enter your name" cbChanging={this.changingInput.bind(this)}  value={this.state.settings.name}/>
        <Input label="Email" placeholder="Your Email"  cbChanging={this.changingInput.bind(this)}  value={this.state.settings.email }/>
        {moreSettings}
        <div>
          <span onClick={()=>{
            this.setState({...this.state, advanced: !this.state.advanced });
          }}>{this.state.advanced ? "Less Settings" : "More Settings"}</span>
          <button onClick={this.submitLogin.bind(this)}>Login</button>
        </div>
      </div>);
  }
}

Login.propTypes = propTypes;

export default Login;
