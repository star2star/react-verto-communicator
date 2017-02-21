import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import ReactDOM from 'react-dom';
import ChatMessageItem from './chatMessageItem';
import { fromJS } from "immutable";



class ChatMessageList extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {};
    //console.log('ChatMessageList chatItems prop', this.props.chatItems);
  }

  static propTypes = {
    chatItems : React.PropTypes.array,
    chatUsers : React.PropTypes.object,
    compStyle : React.PropTypes.object
  };

  static filename = "chatMessageList";
  static displayName = "ChatMessageList";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  componentDidUpdate() {
    // scroll to bottom of message list
    const node = ReactDOM.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  }

  componentDidMount() {
    // scroll to bottom of message list
    const node = ReactDOM.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  }


  getDefaultStyle(styleName) {
    const styles = {
      CMLStyles : {
        flex: 1,
        borderLeft: '1px solid #d1d1d1',
        backgroundColor: '#FAFAFA',
        overflowY: 'auto'
      }
    };

    return styles[styleName];
  }

  getAvatar(displayName) {
    // get the avatar url from gravatar if it exists and if the user displayName
    // is unique.  Don't want to pull the wrong avatar.
    const displayNameArray = Object.keys(this.props.chatUsers).map((callId)=>{
            return( {displayName: this.props.chatUsers[callId].name,
                     avatarUrl: this.props.chatUsers[callId].avatar.avatar}
              );
            }).filter((user)=>{
                return(displayName == user.displayName);
          });

    if (displayNameArray.length > 1) {
      return (undefined);
    } else {
      return (displayNameArray[0].avatarUrl);
    }
  }


  render(){
    //console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^", this.props.chatUsers);
    return(
        <div className="chatMsgList" style={this.getStyle('CMLStyles')}>
          {this.props.chatItems.map((msgObj, index)=>{
            const avatarUrl = this.getAvatar(msgObj.displayName);

            return (<ChatMessageItem key={index} avatarUrl={avatarUrl} message={msgObj} /> );
          })}
        </div>
      );
  }
}

export default ChatMessageList;
// reviewed 7/13/2016
