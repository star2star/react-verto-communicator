import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import AdminControls from './memberAdminControlPanel';
import {MicrophoneIconSVG, VideoIconSVG, MuteMicrophoneIconSVG, MuteVideoIconSVG, KickIconSVG, FullScreenIconSVG} from './svgIcons';

const propTypes = {
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
          padding: '15px 10px 5px 10px',
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
        height: '24px',
        width: '24px'
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
    //console.log('&&&&&& member object', this.props.member);

    // Setup up based on the user status object
    const micStatus = this.props.member.conferenceStatus.audio.muted ?
            (<MuteMicrophoneIconSVG svgStyle={this.getStyle("svgStyle")}/>):
            (<MicrophoneIconSVG  svgStyle={this.getStyle("svgStyle")}/>);

    const videoStatus = this.props.member.conferenceStatus.video.muted ?
            (<MuteVideoIconSVG  svgStyle={this.getStyle("svgStyle")}/>):
            (<VideoIconSVG  svgStyle={this.getStyle("svgStyle")}/>);

    let presenterStatus;
    let presenter;
    if (true) { //TODO add test here to see if in conference as admin
      if (this.props.member.conferenceStatus.screenShare) {
        // Only show the presenter icon if admin and in screen share mode
        // TODO replace with 'presenter toggle icon'
        presenterStatus = (<FullScreenIconSVG svgStyle={{...this.getStyle("svgStyle"), fill: "#454545"}}/>);
        presenter = (<span style={this.getStyle("presenterBadgeStyle")}>Presenter</span>);
      } else {
        // TODO replace with 'presenter toggle icon toggled off'
        presenterStatus = (<FullScreenIconSVG svgStyle={{...this.getStyle("svgStyle"), fill: "#c5c5c5"}}/>);
      }

    }
    const floorLocked = this.props.member.conferenceStatus.video.floorLocked ?
            (<KickIconSVG svgStyle={this.getStyle("floorLockStyle")}/>) :
            undefined;

    const floor = this.props.member.conferenceStatus.audio.floor ?
            (<span style={this.getStyle("floorBadgeStyle")}>{floorLocked} Floor</span>) :
            undefined;

    const screenShare = this.props.member.conferenceStatus.screenShare ?
            (<span style={this.getStyle("screenShareBadgeStyle")}>Screen Share</span>) :
            undefined;

    // TODO ta - if user is logged in as admin, then render the admin controls
    // when user is clicked.  Assume there will be a callback function that
    // takes in the userId (name or whatever) and the item clicked and then
    // does the appropriate dispatch to handle the action.

    let adminControls;
    if (this.state.showAdminControls) {
      adminControls = (
        <AdminControls member={this.props.member} />
      );
    }

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
