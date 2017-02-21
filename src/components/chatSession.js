import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import ChatMessageList from './chatMessageList';
import ChatInput from './chatInput';
import Radium from 'radium';
import { fromJS } from "immutable";


class ChatSession extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {};
  }

  static propTypes = {
    cbRemove : React.PropTypes.func,
    cbSubmitMessage: React.PropTypes.func,
    chatData : React.PropTypes.object,
    compStyle: React.PropTypes.object
  };

  static filename = "chatSession";
  static displayName = "ChatSession";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  getDefaultStyle(styleName) {
    const styles = {
      csStyles : {
        fontFamily: 'Avenir-Medium, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'stretch',
        overflow: 'hidden',
        height: '100%'  // fill the container height
      },

      headerStyles : {
        display: 'flex',
        flex: '0 0 40px',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: '0.9rem',
        color: '#4a4a4a',
        paddingLeft: '10px',
        background:'#fff',
        borderBottom:'1px solid #d1d1d1',
        borderRadius:'5px 0px 0px 0px'
      },
      //styles the ChatIconSVG in the top left corner of header
      chatIconStyle : {
        width: '24px',
        height: '24px',
        fill: '#4a4a4a'
      },
      //styles the ExtractIconSVG in the top right corner of header
      extractStyle : {
        width: '24px',
        height: '24px',
        marginRight: '14px',
        fill: '#d5dde0',
        cursor:'pointer'
      },
      chatDataViewStyle : {
        marginLeft: '10px',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto'
      },
      CMLStyles : {
        flex: '1',
        borderLeft: '0px'
      }
    };

    return styles[styleName];
  }

    render(){
      //console.log('#### chatDatain Chat SEssion', this.props.chatData);
      return(
        <div className="chatSession" style={this.getStyle("csStyles")} >
          <ChatMessageList
              chatItems={this.props.chatData.messages}
              chatUsers={this.props.chatData.users}
              style={{CMLStyles: this.getStyle('CMLStyles')}}
          />
          <ChatInput
              cbSubmitMessage={this.props.cbSubmitMessage}
              sessionId={this.props.chatData.name}
          />
        </div>
      );
    }
}


export default Radium(ChatSession);
// reviewed 7/13/2016
