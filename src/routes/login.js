import React from 'react';
import Login from '../components/login';
import { doSubmitLogin } from './action-creators';
import VertoBaseComponent from '../components/vertobasecomponent';

class AppLogin extends VertoBaseComponent {

  constructor(props) {
    super(props);
    this.state={};
  }

  getDefaultStyle(styleName) {
    const styles = {
      logoStyles: {
        textAlign: 'center',
        margin: '15px 0px'
      }
    };
    return (styles[styleName]);
  }

  render() {
    return(
      <div style={this.getStyle("loggedInOutStyles")}>
        <Login cbClick={(data)=>{
          // fix websocket url
          this.props.dispatch(doSubmitLogin({ ...data, wsURL: data.websocketurl }));
              }}
            settings={this.props.auth.loginSettings} />
    </div>
    );
  }

}

export default AppLogin;
