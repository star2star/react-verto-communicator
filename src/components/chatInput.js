import React from 'react';
import VertoBaseComponent from './vertobasecomponent';

const propTypes = {
  cbSubmitMessage : React.PropTypes.func,
  sessionId: React.PropTypes.string,
  compStyle: React.PropTypes.object
};

export default class ChatInput extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {};
  }

  handleKeyPress(e){
    // send to parent
    if (e.charCode == 13 && this.refs.msgInput.value.length > 0) {
      //console.log('HANDLE SUBMIT - charcode', this.refs.filterInput.value);
      // call the callback function for processing text input since user
      // did not select from the filtered list
      console.log('enter pressed....');
      this.props.cbSubmitMessage(this.props.sessionId, this.refs.msgInput.value);
      // clear the input value
      this.refs.msgInput.value='';
    }
  }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      ChatInpStyle: {
          //width: '290px',
          // height: '56px',
          flex: '0 0 56px',
          display: 'flex',
          // flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f7f8fb',
          // border: '1px solid #d1d1d1',
          //borderTop: '1px solid #d1d1d1',
          borderRight: '0px',
          outline: 'none',
          marginLeft: '5px',
          marginRight: '5px'
          //borderRadius: '0px 0px 0px 5px'
      },
      inputSpacing: {
          //marginLeft: '10px',
          //marginRight: '10px',
          //paddingBottom: '5px',
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
          //borderRadius: '5px',
          //paddingLeft: '10px',
          color: '#4a4a4a',
          fontSize: '0.9rem',
          outline: 'none',
          border: '1px solid #d5dde0',
          marginLeft: '3px',
          marginRight: '3px'
      }
    };

    let styleReturn = styles[styleName];
      if(this.props.style && this.props.style[styleName]) {
        styleReturn = {...styleReturn, ...this.props.style[styleName]};
      }
    return styleReturn;
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

ChatInput.propTypes = propTypes;
