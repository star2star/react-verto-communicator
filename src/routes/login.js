import React from 'react';
import Login from '../components/login';
import { doSubmitLogin } from '../containers/main/action-creators';
import VertoBaseComponent from '../components/vertobasecomponent';
import { connect } from 'react-redux';
import {injectIntl} from 'react-intl';
import Radium from 'radium';
import { compose } from 'recompose';
import { fromJS } from 'immutable';

class AppLogin extends VertoBaseComponent {

  constructor(props) {
    super(props);
    this.state={};

    this.dispatchSubmitLogin = this.dispatchSubmitLogin.bind(this);
  }

  getDefaultStyle(styleName) {
    const styles = {
      loggedInOutStyles: {
        margin: 'auto'
      }
    };
    return (styles[styleName]);
  }

  shouldComponentUpdate(nextProps, nextState){
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  dispatchSubmitLogin(data){
    // fix websocket url
    this.props.dispatch(doSubmitLogin({ ...data, wsURL: data.websocketurl }));
  }

  render() {
    return(
      <div style={this.getStyle("loggedInOutStyles")}>
        <Login
            cbClick={this.dispatchSubmitLogin}
            settings={this.props.auth.loginSettings}
          />
    </div>
    );
  }

}

const hocComponent = compose(injectIntl, Radium, connect((state)=>{
      return ({
        auth: state.auth
      });
  }));

export default hocComponent(AppLogin);
