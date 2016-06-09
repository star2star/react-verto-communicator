import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import ReactDOM from 'react-dom';
import ChatMessageItem from './chatMessageItem';

export default class ChatMessageList extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {};
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

  getCompStyle() {
    return this.props.compStyle;
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

    let styleReturn = styles[styleName];
      if(this.props.style && this.props.style[styleName]) {
        styleReturn = {...styleReturn, ...this.props.style[styleName]};
      }
    return styleReturn;
  }



  render(){

    const messages = this.props.chatItems.map((msgObj, index)=>{
      return (<ChatMessageItem key={index} message={msgObj} /> );
    });

    return(
        <div className="chatMsgList" style={this.getStyle('CMLStyles')}>
          {messages}
        </div>
      );
  }
}

ChatMessageList.propTypes = {
  chatItems : React.PropTypes.array,
  style : React.PropTypes.object
};
