import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import {MicrophoneIconSVG, VideoIconSVG, MuteMicrophoneIconSVG, MuteVideoIconSVG} from './svgIcons';

const propTypes = {
  member : React.PropTypes.object.isRequired

};

export default class MemberItem extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {};
  }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      memberStyles: {
          padding: '15px 10px 5px 10px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          fontFamily: 'Avenir-Book, sans-serif',
          position: 'relative',
          flex: 'auto'
      },
      avatarStyle: {
        height: '24px',
        width: '24px'
      },
      svgStyle: {
        height: '20px',
        fill: '#65ac43'
      },
      userInfoStyle: {
        display: 'flex',
        flexDirection: 'column'
      }
    };

    let styleReturn = styles[styleName];
      if(this.props.style && this.props.style[styleName]) {
        styleReturn = {...styleReturn, ...this.props.style[styleName]};
      }
    return styleReturn;
  }

  render(){
    //console.log('&&&&&& member object', this.props.member);

    // Setup up based on the user status object
    const micStatus = this.props.member.conferenceStatus.audio.muted ?
            (<MuteMicrophoneIconSVG svgStyle={this.getStyle("svgStyle")}/>):
            (<MicrophoneIconSVG  svgStyle={this.getStyle("svgStyle")}/>);

    const videoStatus = this.props.member.conferenceStatus.video.muted ?
            (<MuteVideoIconSVG  svgStyle={this.getStyle("svgStyle")}/>):
            (<VideoIconSVG  svgStyle={this.getStyle("svgStyle")}/>);

    const floor = this.props.member.conferenceStatus.audio.floor ?
            (<span style={this.getStyle("floorStyle")}>Floor</span>) :
            undefined;

    // TODO ta - if user is logged in as admin, then render the admin controls
    // when user is clicked.  Assume there will be a callback function that
    // takes in the userId (name or whatever) and the item clicked and then
    // does the appropriate dispatch to handle the action.



    return (
      <div style={this.getStyle("memberStyles")}>
        <img src={this.props.member.avatar.avatar} style={this.getStyle("avatarStyle")} />
        <div className="userInfo" style={this.getStyle("userInfoStyle")}>
          <span style={this.getStyle("nameStyle")}>{this.props.member.name}</span>
          <span style={this.getStyle("emailStyle")}>{this.props.member.avatar.email}</span>
          {floor}
        </div>
        {micStatus}
        {videoStatus}
      </div>
    );
  }
}

MemberItem.propTypes = propTypes;



//export default Radium(ChatMessageItem);
