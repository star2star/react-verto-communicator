import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import AdminControls from './memberAdminControlPanel';
import ControlItem from './controlItem';
import {MicrophoneIconSVG, VideoIconSVG, MuteMicrophoneIconSVG, MuteVideoIconSVG, KickIconSVG, FullScreenIconSVG} from './svgIcons';

const propTypes = {
  cbControlClick : React.PropTypes.func.isRequired,
  member : React.PropTypes.object.isRequired

};

export default class MemberItem extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {showAdminControls: false};
  }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      memberWrapStyle: {
          padding: '15px 10px 5px 10px'
          //display: 'flex',
          //justifyContent: 'flex-start',
          //alignItems: 'flex-start'
      },
      memberStyle: {
          //padding: '15px 10px 5px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
      },
      avatarStyle: {
        height: '40px',
        width: '40px',
        borderRadius: '50%'
      },
      svgStyle: {
        height: '20px',
        fill: '#65ac43'
      },
      floorLockStyle: {
        height: '10px',
        fill: '#888'
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
    console.log('&&&&&& member object', this.props.member);

    // Setup up mic and video status/controls
    let micStatus = this.props.member.conferenceStatus.audio.muted ?
            (<MuteMicrophoneIconSVG svgStyle={this.getStyle("svgStyle")}/>):
            (<MicrophoneIconSVG  svgStyle={this.getStyle("svgStyle")}/>);

    let videoStatus = this.props.member.conferenceStatus.video.muted ?
            (<MuteVideoIconSVG  svgStyle={this.getStyle("svgStyle")}/>):
            (<VideoIconSVG  svgStyle={this.getStyle("svgStyle")}/>);

    if (true) { // TODO add test to see if we are admin
      // since we are in admin mode, redefine audio and video status indicators to
      // be controlStyle
      micStatus = this.props.member.conferenceStatus.audio.muted ?
              (<ControlItem type="MuteMicrophoneIconSVG" label="UNMUTE"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbClick={()=>{this.props.cbControlClick(this.props.member.callId, "audioMute");}}
              />) :
              (<ControlItem type="MicrophoneIconSVG" label="MUTE"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbClick={()=>{this.props.cbControlClick(this.props.member.callId, "audioMute");}}
              />);

      videoStatus = this.props.member.conferenceStatus.video.muted ?
              (<ControlItem type="MuteVideoIconSVG" label="UNMUTE"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbClick={()=>{this.props.cbControlClick(this.props.member.callId, "videoMute");}}
              />) :
              (<ControlItem type="VideoIconSVG" label="MUTE"
                  compStyle={this.getStyle("controlIconStyle")}
                  cbClick={()=>{this.props.cbControlClick(this.props.member.callId, "videoMute");}}
              />);
    }

    let presenterStatus;
    let presenter;
    let adminControls;
    if (true) { //TODO add test here to see if in conference as admin
      // Setup all the stuff specific to logged in user being admin

      if (true) { // TODO add test for presenter video mode
        // Only show the presenter icon if admin and in screen share mode
        if (this.props.member.conferenceStatus.video.reservationID == 'presenter') {
          // TODO replace with 'presenter toggle icon'
          presenterStatus = (<FullScreenIconSVG svgStyle={{...this.getStyle("svgStyle"), fill: "#454545"}}/>);
          // set the presenter 'badge'
          presenter = (<span style={this.getStyle("presenterBadgeStyle")}>Presenter</span>);
        } else {
          // TODO replace with 'presenter toggle icon toggled off'
          presenterStatus = (<FullScreenIconSVG svgStyle={{...this.getStyle("svgStyle"), fill: "#c5c5c5"}}/>);
        }
      }

      if (this.state.showAdminControls) {
        adminControls = (
          <AdminControls member={this.props.member} />
        );
      }
    }

    const floorLocked = this.props.member.conferenceStatus.video.floorLocked ?
            (<KickIconSVG svgStyle={this.getStyle("floorLockStyle")}/>) :
            undefined;

    const floor = this.props.member.conferenceStatus.audio.floor ?
            (<span style={this.getStyle("floorBadgeStyle")}>{floorLocked} Floor</span>) :
            undefined;

    const screenShare = this.props.member.conferenceStatus.video.screenShare ?
            (<span style={this.getStyle("screenShareBadgeStyle")}>Screen Share</span>) :
            undefined;


    return (
      <div style={this.getStyle("memberWrapStyle")}>
      <div style={this.getStyle("memberStyle")}>
        <img src={this.props.member.avatar.avatar} style={this.getStyle("avatarStyle")} />
        <div className="userInfo" style={this.getStyle("userInfoStyle")}
            onClick={()=>{this.setState({...this.state, showAdminControls: !this.state.showAdminControls});}}
        >
          <span style={this.getStyle("nameStyle")}>{this.props.member.name}</span>
          <span style={this.getStyle("emailStyle")}>{this.props.member.avatar.email}</span>
          {floor}
          {screenShare}
          {presenter}
        </div>
        {micStatus}
        {videoStatus}
        {presenterStatus}
      </div>
      {adminControls}
      </div>
    );
  }
}

MemberItem.propTypes = propTypes;



//export default Radium(ChatMessageItem);
