import React from 'react';
import VertoBaseComponent from '../components/vertobasecomponent';
import Radium from 'radium';
import { connect } from 'react-redux';
//import ReactTooltip from 'react-tooltip';
//import VCStatus from '../../components/vcstatus';
import {
    doSubmitLogin,
    //doSubmitLogOut,
    doMakeCall,
    doSendChat,
    doHangUp,
    doAnswer,
    doMuteMic,
    doHold,
    doMuteVideo,
    doSendConfCommand,
    doShareScreen,
    doClearHistory }
from '../containers/main/action-creators';
import Splash from '../components/splash';
import Login from '../components/login';
import Dialpad from '../components/dialpad';
import {injectIntl} from 'react-intl';
import CallProgress from '../components/callprogress';
import Dialing from '../components/dialing';
import IncomingCall from '../components/incomingcall';
import ChatSession from '../components/chatSession';
import Memberlist from '../components/memberList';
import TabbedContainer from '../components/tabbedContainer';
//import AlertService from '../../js/alertService';
import AlertList from '../components/alertList';
import Loader from 'halogen/ClipLoader';

class Main extends VertoBaseComponent {
  constructor(props) {
    super(props);

    this.state={showChat: true, msgCountAtToggle: 0, newMsgCount: 0};

    this.handleControlClick = this.handleControlClick.bind(this);
    this.handleClearHistory = this.handleClearHistory.bind(this);
    this.handleToggleChat = this.handleToggleChat.bind(this);
    this.makeCall = this.makeCall.bind(this);
    this.dispatchHangUp = this.dispatchHangUp.bind(this);
    this.dispatchAnswer = this.dispatchAnswer.bind(this);
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.showChat) {
      // in case we got thrown from session, check integrity of data
      const newCountAtToggle = nextProps.chatMsgCount < this.state.msgCountAtToggle ?
                              nextProps.chatMsgCount :
                              this.state.msgCountAtToggle;

      this.setState({...this.state, newMsgCount: nextProps.chatMsgCount - newCountAtToggle, msgCountAtToggle: newCountAtToggle});
    }
  }



  getDefaultStyle(styleName) {
    const styles = {
      sidebarWrapperStyles: {
        flex:'0 0 360px',
        height: '100%'
      },
      incomingContainerStyles: {
        minWidth: '40vw',
        margin: 'auto'
      },
      chatVidWrapStyles: {
        display: 'flex',
        height: '100%',
        position: 'relative' // for positioning of alert list
      },
      chatVidStyle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex:'1'},
      showSplashStyle: {
        margin: 'auto'
      },
      sidebarWrapStyles: {
        width: '360px',
        height: '100%',
        opacity: '1',
        transition: 'width 0.3s ease-out opacity 0.2s ease-out',
        '@media (max-width: 768px)': {
          width: '0px'
        }
      },
      videoStyles : {
        display: 'none',
        maxWidth: '100%',
        objectFit: 'inherit',
        flex: '1',
        transition: 'padding 0.3s ease-out'
      },
      loggedInOutStyles: {
        margin: 'auto'
      },
      dialingStyle : {
        flex:'1',
        width: '40vw'
      },
      inProgessStyle : {
        flex:'1',
        width: '100%'
      },
      vidWindowStyle : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex:'1',
        overflowY: 'auto'
      },
       testingStyle:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '30px',
        paddingBottom: '30px',
      },
      loaderStyle:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }


    };

    return (styles[styleName]);
  }

  makeCall(number) {
    // console.log('calling ...', number, this.props.app);
    this.props.dispatch(doMakeCall(number, this.props.app));
  }

  handleControlClick(controlId, params) {
    // based on the controlId, call the appropriate dispatch
    // console.log('@@@@@@@@@@@ control click', controlId, params);
    this.props.dispatch(doSendConfCommand(controlId, params));
  }

  handleClearHistory(){
    // console.log('at handleClearHistory()');
    this.props.dispatch(doClearHistory());
  }

  handleToggleChat(){
    // if chat will be hidden (currently showing), then we need to keep track of how many
    // chat messages are received and update the count for the chat message badge
    // if chat is will be showing (currently hidden), then the message count in state should be 0
    //console.log('handleToggleChat')

    this.setState({...this.state, showChat: !this.state.showChat, msgCountAtToggle: this.props.chatMsgCount, newMsgCount: 0 });
  }

  dispatchHangUp(d){
    // console.log('hang up', d);
    this.props.dispatch(doHangUp(d.callID));
  }

  dispatchAnswer(d){
    // console.log('Answering: ', d);
    this.props.dispatch(doAnswer(d.callID));
  }

  render() {
    const { formatMessage } = this.props.intl;

    const incomingCall = this.props.callInfo && Object.keys(this.props.callInfo.incomingCalls).map((callId)=>{
      // console.log('------- GOT CALL', this.props.callInfo.incomingCalls[callId]);
      return (
          <IncomingCall key={callId}
              callData={this.props.callInfo.incomingCalls[callId]}
              cbHangup={this.dispatchHangUp}
              cbAnswer={this.dispatchAnswer}
          />
      );
    });

    const incomingCallsContainer = incomingCall.length ? (
            <div className="incomingCallContainer" style={this.getStyle("incomingContainerStyles")}>
              {incomingCall}
            </div>
          ) : undefined;


    return (
      <div id="chatVideoWrapper" style={this.getStyle('chatVidWrapStyles')}>
        <AlertList />
        <div style={this.getStyle("vidWindowStyle")}>
          {incomingCallsContainer}
          <video id="webcam" autoPlay="autoplay"  style={this.getStyle("videoStyles")}></video>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect((state)=>{
  return ({
    auth: state.auth,
    app: state.app,
    callInfo: state.callInfo,
    confData: state.callInfo.currentCallId ? state.callInfo.activeCalls[state.callInfo.currentCallId].conferenceData : undefined,
    chatMsgCount: state.callInfo.currentCallId && state.callInfo.activeCalls[state.callInfo.currentCallId].conferenceData ? state.callInfo.activeCalls[state.callInfo.currentCallId].conferenceData.messages.length : undefined
  });
})(injectIntl(Radium(Main)));
// reviewed on 7/15/2016
