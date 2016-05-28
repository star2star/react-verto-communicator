import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import SvgIcons from './svgIcons';

const propTypes = {
  Style : React.PropTypes.object
};

class Input extends VertoBaseComponent {
  render(){
    return (
      <div>
        <div>{this.props.label}</div>
        <div><input placeholder={this.props.placeholder} style={{}}/></div>
      </div>);
  }
}

class Login extends VertoBaseComponent{
  constructor(props) {
    super(props);
    this.state = {advanced: false}
  }

  //TODO intl
  render() {
    let moreSettings;
    if (this.state.advanced) {
      moreSettings = (
        <span>
          <Input label="User" placeholder="User i.e. 1008" />
          <Input label="Password" placeholder="Your Password i.e. 1234" />
          <Input label="Caller ID" placeholder="Caller ID" />
          <Input label="Hostname" placeholder="Hostname" />
          <Input label="Websocket URL" placeholder="websocket url" />
        </span>
      );
    }
    return (
      <div style={{background: "green", color: "yellow", display: "flex", alignItems: "center", flexDirection: "column", width: "300px"}}>
        <div>Login</div>
        <Input label="Name" placeholder="Enter your name" />
        <Input label="Email" placeholder="Your Email" />
        {moreSettings}
        <div>
          <span onClick={()=>{
            this.setState({...this.state, advanced: !this.state.advanced });
          }}>{this.state.advanced ? "Less" : "More"}</span>
          <button onClick={this.props.cbClick}>Login</button>
        </div>
      </div>);
  }
}

Login.propTypes = propTypes;

export default Login;
