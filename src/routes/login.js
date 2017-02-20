import React from 'react';
import Login from '../components/login';
import { doSubmitLogin } from './action-creators';
import VertoBaseComponent from '../components/vertobasecomponent';
import { connect } from 'react-redux';
import {injectIntl} from 'react-intl';
import Radium from 'radium';
import { compose } from 'recompose';

class AppLogin extends VertoBaseComponent {

  constructor(props) {
    super(props);
    this.state={};
  }

  getDefaultStyle(styleName) {
    const styles = {
      loggedInOutStyles: {
        margin: 'auto'
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

const hocComponent = compose(injectIntl, Radium, connect((state)=>{
      //console.log('Contacts -- route state', state);
      return ({
        auth: state.auth
      });
  }));

export default hocComponent(AppLogin);
