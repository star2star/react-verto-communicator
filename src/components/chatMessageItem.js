import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import {AvatarSVG} from './svgIcons';
import moment from 'moment';
import { fromJS } from "immutable";


class ChatMessageItem extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {};
  }

  static propTypes = {
    avatarUrl : React.PropTypes.string,
    message : React.PropTypes.object,
    compStyle: React.PropTypes.object
  };

  static filename = "chatMessageItem";
  static displayName = "ChatMessageItem";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  getDefaultStyle(styleName) {
    const styles = {
      ChatMsgItem: {
          padding: '15px 10px 5px 10px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          fontFamily: 'Avenir-Book, sans-serif',
          position: 'relative',
          flex: 'auto'
      },
      ChatMsgItemRight: {
        padding: '15px 10px 5px 10px',
        display: 'flex',
        fontFamily: 'Avenir-Book, sans-serif',
        flexDirection: 'row-reverse',
        alignItems: 'flex-start',
        position: 'relative',
        flex: 'auto'
      },
      avStyle: {
        height: '40px',
        width: '40px',
        borderRadius: '50%',
        alignSelf: 'top',
        fill: '#ddd',
        backgroundColor: '#444'
      },
      avImgStyle: {
        height: '40px',
        width: '40px',
        borderRadius: '50%'
      },
      msgStyle: {
        marginLeft: '10px',
        marginRight: '10px',
        backgroundColor: '#337BA0',
        padding: '10px',
        borderRadius: '3px',
        fontSize: '.85rem',
        position: 'relative',
        maxWidth: '70%',
        wordWrap: 'break-word'
      },
      infoStyle: {
        marginTop: '10px',
        color: '#aaa',
        fontSize: '.75rem'
      },
      triangleStyleLeft: {
        width: '0px',
        height: '0px',
        borderStyle: 'solid',
        borderWidth: '8px 12px 8px 0px',
        borderColor:  'transparent ' +  this.props.message.bgColor + ' transparent transparent',
        position: 'absolute',
        top: '10px',
        left: '-8px'
      },
      triangleStyleRight: {
        width: '0px',
        height: '0px',
        borderStyle: 'solid',
        borderWidth: '8px 0px 8px 16px',
        borderColor:  'transparent transparent transparent ' + this.props.message.bgColor,
        position: 'absolute',
        top: '10px',
        right: '-8px'
      }
    };

    return styles[styleName];
  }

  render(){
    //console.log('&&&&&& chat message object', this.props.message);
    const timestamp = moment(this.props.message.utc_timestamp).calendar();

    // if this.props.avatarUrl is not undefined, use it for chat avatar, otherwise
    // use the avatar svgStyle
    let avatar = (<AvatarSVG svgStyle={this.getStyle("avStyle")}/>);

    if (this.props.avatarUrl != undefined) {
      avatar = (<img src={this.props.avatarUrl} style={this.getStyle("avImgStyle")}/>);
    }


    let chatContent;
    if (!this.props.message.isMe) {
      chatContent = (
        <div style={this.getStyle("ChatMsgItem")}>
          {avatar}
          <span style={{...this.getStyle("msgStyle"), backgroundColor:this.props.message.bgColor}}> {this.props.message.message}
            <span style={this.getStyle("triangleStyleLeft")}></span>
            <div style={this.getStyle("infoStyle")} > {this.props.message.displayName} &#8226; {timestamp}</div>
          </span>
        </div>
      );
    } else {
      chatContent =  (
        <div style={this.getStyle("ChatMsgItemRight")}>
          {avatar}
          <span style={{...this.getStyle("msgStyle"), backgroundColor:this.props.message.bgColor}}>{this.props.message.message}
            <span style={this.getStyle("triangleStyleRight")}></span>
            <div style={this.getStyle("infoStyle")} >{this.props.message.displayName} &#8226; {timestamp}</div>
          </span>
        </div>
      );
    }

    return (chatContent);
  }
}


export default ChatMessageItem;
// reviewed 7/13/2016
