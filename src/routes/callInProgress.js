import React from 'react';
import CallProgress from '../components/callprogress';
import { doHangUp, doMuteMic, doMuteVideo, doShareScreen, doSendChat, doHold } from '../containers/main/action-creators';
import VertoBaseComponent from '../components/vertobasecomponent';
import { connect } from 'react-redux';
import {injectIntl} from 'react-intl';
import Radium from 'radium';
import { compose } from 'recompose';
import { fromJS } from 'immutable';


//TODO STYLE THIS FULLY
class CallInProgress extends VertoBaseComponent {

  constructor(props) {
    super(props);
    this.state={};

    this.generateMembers = this.generateMembers.bind(this);
    this.controlClickMemberList = this.controlClickMemberList.bind(this);
    this.emptyFunction = this.emptyFunction.bind(this);
    this.dispatchDoSendChat = this.dispatchDoSendChat.bind(this);
    this.dispatchHangUp = this.dispatchHangUp.bind(this);
    this.dispatchMuteDevices = this.dispatchMuteDevices.bind(this);
    this.consoleLogDTMF = this.consoleLogDTMF.bind(this);
    this.dispatchHold = this.dispatchHold.bind(this);
    this.dispatchShareScreen = this.dispatchShareScreen.bind(this);
    this.controlClickSetLayout = this.controlClickSetLayout.bind(this);
    this.handleToggleChat = this.handleToggleChat.bind(this);
  }

  getDefaultStyle(styleName) {
    const styles = {
      inProgessStyle : {
        flex:'1',
        width: '100%'
      }
    };
    return (styles[styleName]);
  }

  shouldComponentUpdate(nextProps, nextState){
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  generateMembers(){
    Object.keys(this.props.confData.users).map(
      (k)=>{
        return ({...this.props.confData.users[k]});
      }
    )
  }

  controlClickMemberList(callId, params){
    this.handleControlClick(callId, params);
  }

  emptyFunction(){}

  dispatchDoSendChat(id,msg){
    this.props.dispatch(doSendChat(msg));
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

  consoleLogDTMF(callId, key){
    console.log('cbDTMF', callId, key);
  }

  dispatchHold(callId){
    this.props.dispatch(doHold(callId));
  }

  dispatchShareScreen(){
    this.props.dispatch(doShareScreen(this.props.app));
  }

  controlClickSetLayout(params){
    this.handleControlClick('SETLAYOUT', params);
  }

  handleToggleChat(){
    // if chat will be hidden (currently showing), then we need to keep track of how many
    // chat messages are received and update the count for the chat message badge
    // if chat is will be showing (currently hidden), then the message count in state should be 0
    //console.log('handleToggleChat')

    this.setState({...this.state, showChat: !this.state.showChat, msgCountAtToggle: this.props.chatMsgCount, newMsgCount: 0 });
  }

  render() {
    window.conf = this.props.confData;
    let chatSideBar = undefined;

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
            <Memberlist
                members={this.generateMembers()}
                isModerator={this.props.confData.currentRole == "moderator"}
                allowPresenter={this.props.confData.allowPresenter}
                hasMultipleCanvases={this.props.confData.hasMultipleCanvases}
                cbControlClick={this.controlClickMemberList}
            />
            <ChatSession
                cbRemove={this.emptyFunction}
                cbSubmitMessage={this.dispatchDoSendChat}
                chatData={this.props.confData}
            />
          </TabbedContainer>
        </div>
      );
    }

    return(
      <div>
        <div style={this.getStyle("inProgessStyle")}>
          <CallProgress callData={this.props.callInfo.activeCalls[this.props.callInfo.currentCallId]}
              cbHangup={this.dispatchHangUp}
              cbMute ={this.dispatchMuteDevices}
              cbDTMF={this.consoleLogDTMF}
              cbHold={this.dispatchHold}
              cbShare={this.dispatchShareScreen}
              cbToggleChat={this.handleToggleChat}
              isModerator={this.props.confData ? this.props.confData.currentRole == 'moderator' : undefined}
              userConfStatus={this.props.confData && this.props.confData.users[this.props.confData.callId]? this.props.confData.users[this.props.confData.callId].conferenceStatus:
                      undefined
                    }
              cbSetVideoMode={this.controlClickSetLayout}
              layouts={this.props.confData ? this.props.confData.layouts : undefined}
              currLayout={this.props.confData ? this.props.confData.videoLayout : undefined}
              newMsgCount={this.state.newMsgCount}
          />
        </div>
        {chatSideBar}
      </div>
    );
  }

}

const hocComponent = compose(injectIntl, Radium, connect((state)=>{
      return ({
        app: state.app,
        confData: state.callInfo.currentCallId ? state.callInfo.activeCalls[state.callInfo.currentCallId].conferenceData : undefined,
        auth: state.auth,
        callInfo: state.callInfo
      });
  }));

export default hocComponent(CallInProgress);
