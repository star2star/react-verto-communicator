import React from 'react';
import Dialpad from '../components/dialpad';
import VertoBaseComponent from '../components/vertobasecomponent';
import { connect } from 'react-redux';
import {injectIntl} from 'react-intl';
import Radium from 'radium';
import { compose } from 'recompose';
import { doClearHistory, doMakeCall } from '../containers/main/action-creators';
import { fromJS } from 'immutable';

class LoggedIn extends VertoBaseComponent {

  constructor(props) {
    super(props);
    this.state={};

    this.handleClearHistory = this.handleClearHistory.bind(this);
    this.makeCall = this.makeCall.bind(this);
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

  handleClearHistory(){
    //console.log('at handleClearHistory()');
    this.props.dispatch(doClearHistory());
  }

  makeCall(number) {
    //console.log('calling ...', number, this.props.app);
    this.props.dispatch(doMakeCall(number, this.props.app));
  }

  render() {
    return(
      <div style={this.getStyle("loggedInOutStyles")}>
        <Dialpad cbCall={this.makeCall} cbClearHistory={this.handleClearHistory} lastNumber={this.props.callInfo.lastNumber} nbrToDial="" />
      </div>
    );
  }

}

const hocComponent = compose(injectIntl, Radium, connect((state)=>{
      return ({
        app: state.app,
        callInfo: state.callInfo
      });
  }));

export default hocComponent(LoggedIn);
