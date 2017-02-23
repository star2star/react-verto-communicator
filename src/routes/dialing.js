import React from 'react';
import Dialing from '../components/dialing';
import { doHangUp, doMuteMic, doMuteVideo, doHold } from '../containers/main/action-creators';
import VertoBaseComponent from '../components/vertobasecomponent';
import { connect } from 'react-redux';
import {injectIntl} from 'react-intl';
import Radium from 'radium';
import { compose } from 'recompose';
import { fromJS } from 'immutable';

class AppDialing extends VertoBaseComponent {

  constructor(props) {
    super(props);
    this.state={};

    this.dispatchHangUp = this.dispatchHangUp.bind(this);
    this.dispatchMuteDevices = this.dispatchMuteDevices.bind(this);
    this.consoleLogcbDTMF = this.consoleLogcbDTMF.bind(this);
    this.dispatchDoHold = this.dispatchDoHold.bind(this);
  }

  getDefaultStyle(styleName) {
    const styles = {
      dialingStyle : {
        flex:'1',
        width: '40vw'
      }
    };
    return (styles[styleName]);
  }

  shouldComponentUpdate(nextProps, nextState){
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  dispatchHangUp(callId){
    this.props.dispatch(doHangUp(callId));
  }

  dispatchMuteDevices(callId, mutedDevice='mic' ){
    if (mutedDevice === 'mic'){
      this.props.dispatch(doMuteMic(callId));
    } else {
      this.props.dispatch(doMuteVideo(callId));
    }
  }

  consoleLogcbDTMF(callId, key){
    console.log('cbDTMF', callId, key);
  }

  dispatchDoHold(callId){
    this.props.dispatch(doHold(callId));
  }

  render() {
    return(
      <div style={this.getStyle("dialingStyle")}>
        <Dialing callData={this.props.callInfo.activeCalls[this.props.callInfo.currentCallId]}
            cbHangup={this.dispatchHangUp}
            cbMute ={this.dispatchMuteDevices}
            cbDTMF={this.consoleLogcbDTMF}
            cbHold={this.dispatchDoHold}
        />
      </div>
    );
  }

}

const hocComponent = compose(injectIntl, Radium, connect((state)=>{
      return ({
        callInfo: state.callInfo,
        confData: state.callInfo.currentCallId ? state.callInfo.activeCalls[state.callInfo.currentCallId].conferenceData : undefined
      });
  }));

export default hocComponent(AppDialing);
