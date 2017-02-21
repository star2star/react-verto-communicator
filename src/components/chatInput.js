import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import { fromJS } from "immutable";


class ChatInput extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {};
  }

  static propTypes = {
    cbSubmitMessage : React.PropTypes.func,
    sessionId: React.PropTypes.string,
    compStyle: React.PropTypes.object
  };

  static filename = "chatInput";
  static displayName = "ChatInput";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  handleKeyPress(e){
    // send to parent
    if (e.charCode == 13 && this.refs.msgInput.value.length > 0) {
      //console.log('HANDLE SUBMIT - charcode', this.refs.filterInput.value);
      // call the callback function for processing text input since user
      // did not select from the filtered list
      //console.log('enter pressed....');
      this.props.cbSubmitMessage(this.props.sessionId, this.refs.msgInput.value);
      // clear the input value
      this.refs.msgInput.value='';
    }
  }



  getDefaultStyle(styleName) {
    const styles = {
      ChatInpStyle: {
          //width: '290px',
          // height: '56px',
          flex: '0 0 56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f7f8fb',
          borderRight: '0px',
          outline: 'none',
          marginLeft: '5px',
          marginRight: '5px'
      },
      inputSpacing: {
          display:'flex',
          justifyContent:'stretch',
          flex: 1
      },
      inputStyle: {
          display: 'flex',
          flex: 1,
          fontFamily: 'Avenir-Medium, sans-serif',
          justifyContent: 'stretch',
          height: '30px',
          color: '#4a4a4a',
          fontSize: '0.9rem',
          outline: 'none',
          border: '1px solid #d5dde0',
          marginLeft: '3px',
          marginRight: '3px',
          paddingLeft: '5px'
      }
    };

    return styles[styleName];
  }

  render(){
    return(
      <div
          style={this.getStyle("ChatInpStyle")}
          ref="inputtext"
      >
        <input
            style={this.getStyle("inputStyle")}
            ref="msgInput"
            type="text" onKeyPress={this.handleKeyPress.bind(this)} placeholder="Type your message..."
        />
      </div>
    );
  }
}

export default ChatInput;
//reviewed 7/13/2016
