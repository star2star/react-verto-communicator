import React from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import VertoBaseComponent from './vertobasecomponent';
import IncomingCall from '../components/incomingcall';
import { doHangUp, doAnswer } from '../containers/main/action-creators';

class IncomingCalls extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.dispatchHangUp = this.dispatchHangUp.bind(this);
    this.dispatchAnswer = this.dispatchAnswer.bind(this);
  }

  static defaultProps = {
    callInfo: {},
  };

  static filename = 'incomingcalls';
  static displayName = 'IncomingCalls';

  shouldComponentUpdate(nextProps, nextState) {
    return true;
    //!fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state))
  }

  getDefaultStyle(styleName) {
    const styles = {
      incomingContainerStyles: {
        minWidth: '40vw',
        margin: 'auto',
      },
    };

    return styles[styleName];
  }

  dispatchHangUp(d) {
    // console.log('hang up', d);
    this.props.dispatch(doHangUp(d.callID));
  }

  dispatchAnswer(d) {
     console.log('this.props.appSettings ', this.props.appSettings);
    this.props.dispatch(doAnswer(d.callID, this.props.appSettings));
  }

  render() {
    let { callInfo } = this.props;
    const incomingCall =
      this.props.callInfo &&
      Object.keys(callInfo.incomingCalls).map(callId =>
        <IncomingCall
          key={callId}
          callData={callInfo.incomingCalls[callId]}
          cbHangup={this.dispatchHangUp}
          cbAnswer={this.dispatchAnswer}

        />,
      );

    return (
      <div className="incomingCallContainer" style={this.getStyle('incomingContainerStyles')}>
        {incomingCall}
      </div>
    );
  }
}

IncomingCalls.propTypes = {
  callInfo: PropTypes.object,
};

export default connect(state => ({
  callInfo: state.callInfo,
  appSettings: state.app.settings,
}))(IncomingCalls);
