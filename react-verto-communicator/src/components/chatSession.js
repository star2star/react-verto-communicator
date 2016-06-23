import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import ChatMessageList from './chatMessageList';
import ChatInput from './chatInput';
import { ChatIconSVG, ExtractIconSVG } from './svgIcons';
import Radium from 'radium';


const propTypes = {
  cbRemove : React.PropTypes.func,
  cbSubmitMessage: React.PropTypes.func,
  chatData : React.PropTypes.object,
  compStyle: React.PropTypes.object
};


export default class ChatSession extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {};

    console.log('Chat Session props Chat Data', this.props.chatData);
  }

  getCompStyle() {
    return this.props.compStyle;
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
        // maxHeight:'182px',
        flex: '1',
        borderLeft: '0px'
      }
    };

    let styleReturn = styles[styleName];
      if(this.props.style && this.props.style[styleName]) {
        styleReturn = {...styleReturn, ...this.props.style[styleName]};
      }
    return styleReturn;
  }

    render(){
        //console.log('#### chatDatain Chat SEssion', this.props.chatData);
      const chatTitle = "Chat History";
      // ta - not using heading in this implementation
      const chatHeading = (
        <span style={this.getStyle("headerStyles")} >
          <ChatIconSVG svgStyle={this.getStyle("chatIconStyle")} />
          <span style={this.getStyle("chatDataViewStyle")} >
              {chatTitle}
          </span>
          <ExtractIconSVG
              svgStyle={this.getStyle("extractStyle")}
              cbClick={()=>this.props.cbRemove(this.props.chatData.name)}
          />
        </span>
      );

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


ChatSession.propTypes = propTypes;

export default Radium(ChatSession);
