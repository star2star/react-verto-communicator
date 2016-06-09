import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import AvatarSVG from './svgIcons';
import moment from 'moment';
//import Radium from 'radium';

const propTypes = {
  message : React.PropTypes.object

};

export default class ChatMessageItem extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {};
  }

  getCompStyle() {
    return this.props.compStyle;
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
        height: '20px',
        // borderRadius: '50%',
        width: '20px',
        // alignSelf: 'top',
        fill: '#ddd'
        // padding: '10px'
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
        //content: ' ',
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
        //content: ' ',
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

    let styleReturn = styles[styleName];
      if(this.props.style && this.props.style[styleName]) {
        styleReturn = {...styleReturn, ...this.props.style[styleName]};
      }
    return styleReturn;
  }




  render(){
    console.log('&&&&&& chat message object', this.props.message);
    const timestamp = moment(this.props.message.utc_timestamp).calendar();

    if (!this.props.message.isMe) {
      return (
        <div style={this.getStyle("ChatMsgItem")}>
          {/*<AvatarSVG svgStyle={this.getStyle("avStyle")}/>*/}
          <span style={{...this.getStyle("msgStyle"), backgroundColor:this.props.message.bgColor}}> {this.props.message.message}
            <span style={this.getStyle("triangleStyleLeft")}></span>
            <div style={this.getStyle("infoStyle")} > {this.props.message.displayName} &#8226; {timestamp}</div>
          </span>
        </div>
      );
    } else {
      return (
        <div style={this.getStyle("ChatMsgItemRight")}>
          {/*<AvatarSVG svgStyle={this.getStyle("avStyle")}/>*/}
          <span style={{...this.getStyle("msgStyle"), backgroundColor:this.props.message.bgColor}}>{this.props.message.message}
            <span style={this.getStyle("triangleStyleRight")}></span>
            <div style={this.getStyle("infoStyle")} >{this.props.message.displayName} &#8226; {timestamp}</div>
          </span>
        </div>
      );
    }
  }
}

ChatMessageItem.propTypes = propTypes;



//export default Radium(ChatMessageItem);
