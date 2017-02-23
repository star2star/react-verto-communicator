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
                members={Object.keys(this.props.confData.users).map(
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

    return(
      <div>
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
                console.log('cbDTMF', callId, key);
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
