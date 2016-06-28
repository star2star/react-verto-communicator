import React from 'react';
import VertoBaseComponent from '../../components/vertobasecomponent';
import Radium from 'radium';
import { connect } from 'react-redux';
//import ReactTooltip from 'react-tooltip';
import VCStatus from '../../components/vcstatus';
import {
    doSubmitLogin,
    doSubmitLogOut,
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
from './action-creators';
import Splash from '../../components/splash';
import Login from '../../components/login';
import Dialpad from '../../components/dialpad';
import {injectIntl} from 'react-intl';
import CallProgress from '../../components/callprogress';
import Dialing from '../../components/dialing';
import IncomingCall from '../../components/incomingcall';
import ChatSession from '../../components/chatSession';
import Memberlist from '../../components/memberlist';
import TabbedContainer from '../../components/tabbedContainer';
import AlertService from '../../js/alertService';
import AlertList from '../../components/alertList';

class Main extends VertoBaseComponent {
  constructor(props) {
    super(props);

    this.state={showChat: true, msgCountAtToggle: 0, newMsgCount: 0};

    this.handleControlClick = this.handleControlClick.bind(this);
    this.handleClearHistory = this.handleClearHistory.bind(this);
    this.handleToggleChat = this.handleToggleChat.bind(this);
    this.makeCall = this.makeCall.bind(this);
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


  getCompStyle() {
    return this.props.compStyle;
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
      }

    };

    return (styles[styleName]);
  }

  makeCall(number) {
    //console.log('calling ...', number, this.props.app);
    this.props.dispatch(doMakeCall(number, this.props.app));
  }

  handleControlClick(controlId, params) {
    // based on the controlId, call the appropriate dispatch
    //console.log('@@@@@@@@@@@ control click', controlId, params);
    this.props.dispatch(doSendConfCommand(controlId, params));
  }

  handleClearHistory(){
    console.log('at handleClearHistory()');
    this.props.dispatch(doClearHistory());
  }

  handleToggleChat(){
    // if chat will be hidden (currently showing), then we need to keep track of how many
    // chat messages are received and update the count for the chat message badge
    // if chat is will be showing (currently hidden), then the message count in state should be 0

    this.setState({...this.state, showChat: !this.state.showChat, msgCountAtToggle: this.props.chatMsgCount, newMsgCount: 0 });
  }

  render() {
    const { formatMessage } = this.props.intl;

    let loggedInfo;
    let chatSideBar;
    const splashObject = { ...this.props.auth.splash };

    const incomingCall = this.props.callInfo && Object.keys(this.props.callInfo.incomingCalls).map((callId)=>{
      console.log('------- GOT CALL', this.props.callInfo.incomingCalls[callId]);
      return (
          <IncomingCall key={callId}
              callData={this.props.callInfo.incomingCalls[callId]}
              cbHangup={(d)=>{
                console.log('hang up', d);
                this.props.dispatch(doHangUp(d.callID));
              }}
              cbAnswer={(d)=>{
                console.log('Answering: ', d);
                this.props.dispatch(doAnswer(d.callID));
              }}
          />
      );
    });

    const incomingCallsContainer = incomingCall.length ? (
            <div className="incomingCallContainer" style={this.getStyle("incomingContainerStyles")}>
              {incomingCall}
            </div>
          ) : undefined;


    switch (this.props.auth.showPage){
      case 'splash':
        switch(this.props.auth.splash.title){
          case 'browser':
            splashObject.title = formatMessage({"id":"BROWSER_COMPATIBILITY", "defaultMessage":"Checking browser compatibility."});
            break;
          case 'media':
            splashObject.title = formatMessage({"id":"CHECK_PERMISSION_MEDIA", "defaultMessage":"Checking media permissions"});
            break;
          case 'resolution':
          default:
            splashObject.title = formatMessage({"id":"CHECK_RESOLUTION", "defaultMessage":"Checking resolution."});
            break;
        }
        break;
      case 'login':
      case 'logout':
        loggedInfo = (
          <div style={this.getStyle("loggedInOutStyles")}>
            <Login cbClick={(data)=>{
              // fix websocket url
              this.props.dispatch(doSubmitLogin({ ...data, wsURL: data.websocketurl }));
            }} settings={this.props.auth.loginSettings} />
        </div>);
        break;
      case 'resolution_refresh':
        loggedInfo = (<div >Resolution Refresh .... in progress</div>);
        break;
      case 'loggedIn':
        loggedInfo = (
          <div style={this.getStyle("loggedInOutStyles")}>
            <Dialpad cbCall={this.makeCall} cbClearHistory={this.handleClearHistory} lastNumber={this.props.callInfo.lastNumber} nbrToDial="" />
        </div>);
        break;
      case 'resolution_failed':
        splashObject.title = formatMessage({"id":"CHECK_RESOLUTION", "defaultMessage":"Checking resolution."});
        splashObject.errorObject = {
          header: formatMessage({"id":"ERRORS", "defaultMessage":"Errors"}),
          body: formatMessage({"id":"ERROR_PERMISSION_MEDIA", "defaultMessage":"Error: internal error checking resolution"})
        };
        break;
      case 'bns':
        //console.log('BBBNNNNSSSS', this.props.auth);
        splashObject.title = formatMessage({"id":"BROWSER_COMPATIBILITY", "defaultMessage":"Checking browser compatibility."});
        splashObject.errorObject = {
          header: formatMessage({"id":"ERRORS", "defaultMessage":"Errors"}),
          body: formatMessage({"id":"BROWSER_WITHOUT_WEBRTC", "defaultMessage":"Error: browser doesn't support WebRTC"})
        };
        break;
      case 'noMedia':
        splashObject.title = formatMessage({"id":"CHECK_PERMISSION_MEDIA", "defaultMessage":"Checking media permissions"});
        splashObject.errorObject = {
          header: formatMessage({"id":"ERRORS", "defaultMessage":"Errors"}),
          body: formatMessage({"id":"ERROR_PERMISSION_MEDIA", "defaultMessage":"Error: Media Permission Denied"})
        };
        break;
      case 'dialing':
        loggedInfo = (
            <div style={this.getStyle("dialingStyle")}>
              <Dialing callData={this.props.callInfo.activeCalls[this.props.callInfo.currentCallId]}
                  cbHangup={(callId)=>{
                    this.props.dispatch(doHangUp(callId));
                  }}
                  cbMute ={(callId, mutedDevice='mic' )=>{
                    if (mutedDevice === 'mic'){
                      this.props.dispatch(doMuteMic(callId));
                    } else {
                      this.props.dispatch(doMuteVideo(callId));
                    }
                  }}
                  cbDTMF={(callId, key)=>{

                  }}
                  cbHold={(callId)=>{
                    this.props.dispatch(doHold(callId));
                  }}
              />
            </div>
          );
        break;

      case 'call_inprogress':
        //console.log('jjj');
        // Extract conference data from currentCall (if it is a conference)
        {
          //const confData = this.props.callInfo.activeCalls[this.props.callInfo.currentCallId].conferenceData;
          window.conf = this.props.confData;
          // if (this.props.confData) {
            loggedInfo = (
              <div style={this.getStyle("inProgessStyle")}>
                <CallProgress callData={this.props.callInfo.activeCalls[this.props.callInfo.currentCallId]}
                    cbHangup={(callId)=>{
                      this.props.dispatch(doHangUp(callId));
                    }}
                    cbMute ={(callId, mutedDevice='mic' )=>{
                      if (mutedDevice === 'mic'){
                        this.props.dispatch(doMuteMic(callId));
                      } else {
                        this.props.dispatch(doMuteVideo(callId));
                      }
                    }}
                    cbDTMF={(callId, key)=>{

                    }}
                    cbHold={(callId)=>{
                      this.props.dispatch(doHold(callId));
                    }}
                    cbShare={()=>{
                      this.props.dispatch(doShareScreen(this.props.app));
                    }}
                    cbToggleChat={this.handleToggleChat}
                    isModerator={this.props.confData ? this.props.confData.currentRole == 'moderator' : undefined}
                    userConfStatus={this.props.confData && this.props.confData.users[this.props.confData.callId]? this.props.confData.users[this.props.confData.callId].conferenceStatus:
                            undefined
                          }
                    cbSetVideoMode={(params)=>{this.handleControlClick('SETLAYOUT', params);}}
                    layouts={this.props.confData ? this.props.confData.layouts : undefined}
                    currLayout={this.props.confData ? this.props.confData.videoLayout : undefined}
                    newMsgCount={this.state.newMsgCount}
                />
              </div>
            );

          // } // end if confData
          // setup chat/memberlist here

          // Show chat sidebar only if confData has a value
          //console.log('#### conf data', confData);

          // NOTE:  Child components MUST be in the same order that their labels
          // are in the tabLabels array
          if (this.props.confData) {
            const contentStyle = this.state.showChat ?
                          {...this.getStyle("sidebarWrapStyles")} :
                          {...this.getStyle("sidebarWrapStyles"),
                              opacity: '0',
                              width: '0px',
                              visibility: 'hidden',
                              transition: 'opacity 0.4s ease-out, width 0.3s ease-out, visibility 1s'};

            chatSideBar = (
              <div className="sidebarWrapper"
                  style={contentStyle}
              >
                <TabbedContainer tabLabels={["Members", "Chat"]}>
                  <Memberlist members={Object.keys(this.props.confData.users).map(
                    (k)=>{
                        return ({...this.props.confData.users[k]});
                      }
                    )}
                      isModerator={this.props.confData.currentRole == "moderator"}
                      allowPresenter={this.props.confData.allowPresenter}
                      hasMultipleCanvases={this.props.confData.hasMultipleCanvases}
                      cbControlClick={(callId, params)=>{this.handleControlClick(callId, params);}}
                  />
                  <ChatSession
                      cbRemove={()=>{}}
                      cbSubmitMessage={(id,msg)=>{this.props.dispatch(doSendChat(msg));}}
                      chatData={this.props.confData}
                  />
                </TabbedContainer>
              </div>
            );
          }
        }
        break;

      default:
        break;
    }
    let showSplash;
    if (this.props.auth.splash && this.props.auth.splash.current != this.props.auth.splash.number) {
      const intlTitle = formatMessage({"id": "LOADING", "defaultMessage": "Loading"});
      showSplash = (<Splash step={splashObject} title={intlTitle} style={this.getStyle('showSplashStyle')}/>);
    }

    return (
      <div id="chatVideoWrapper" style={this.getStyle('chatVidWrapStyles')}>
        <AlertList />
        <div style={this.getStyle("vidWindowStyle")}>
          {incomingCallsContainer}
          <video id="webcam" autoPlay="autoplay"  style={this.getStyle("videoStyles")}></video>
          {loggedInfo}
          {showSplash}
        </div>
        {chatSideBar}
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
