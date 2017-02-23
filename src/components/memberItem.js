import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import AdminControls from './memberAdminControlPanel';
import ControlItem from './controlItem';
import Radium from 'radium';
import { FormattedMessage } from 'react-intl';
import {
  MicrophoneIconSVG,
  VideoIconSVG,
  PresenterIconSVG,
  MuteMicrophoneIconSVG,
  MuteVideoIconSVG,
  LockIconSVG
} from './svgIcons';
import { fromJS } from "immutable";


class MemberItem extends VertoBaseComponent {
  constructor(props){
    super(props);
    this.state = {showAdminControls: false};

    this.controlClickMuteMic = this.controlClickMuteMic.bind(this);
    this.controlClickMute = this.controlClickMute.bind(this);
    this.openAdminControls = this.openAdminControls.bind(this);
  }

  static propTypes = {
    cbControlClick : React.PropTypes.func,
    controlSettings : React.PropTypes.shape({
        moderator: React.PropTypes.bool,
        multCanvas: React.PropTypes.bool,
        allowPresenter: React.PropTypes.bool
      }),
    member : React.PropTypes.object,
    cbOpenAdminControls : React.PropTypes.func
  };

  static defaultProps = {
    cbControlClick : ()=>{},
    member : {},
    cbOpenAdminControls : ()=>{}
  };

  static filename = "memberItem";
  static displayName = "MemberItem";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  getDefaultStyle(styleName) {
    const styles = {
      //styles item container
      memberWrapStyle: {
        padding: '15px 10px 5px 10px',
          ':hover': {
            backgroundColor: '#f8f8f8'
        }
      },
      //item content flex-spacing
      memberStyle: {
        display: 'flex',
        flex: 1
      },
      //(gr)avatar icon
      avatarStyle: {
        height: '40px',
        width: '40px',
        borderRadius: '50%'
      },
      avatarSpacing: {
        marginRight: '15px'
      },
      //name/email grouping for flex-positioning
      userInfoStyle: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        marginRight: '5px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      },
      //name line
      nameStyle: {
        color: '#393939',
        paddingBottom: '5px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      },
      //email line
      emailStyle: {
        fontSize:'.75rem',
        color: '#9b9b9b',
        paddingBottom: '1px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      },
      //groups audio, video, presenter icons for placement
      avStatusStyle: {
        display: 'flex',
        alignItems: 'center',
        paddingRight: '15px'
      },
      svgStyle: {
        height: '24px',
        fill: '#65ac43'
      },
      controlAudioIconStyle: {
        svgStyle: {
          height: '24px',
          fill: this.props.member.conferenceStatus.audio.muted  ? '#333333' : '#65ac43',
          paddingRight: '10px'
        }
      },
      controlVideoIconStyle: {
        svgStyle: {
          height: '24px',
          fill: this.props.member.conferenceStatus.video.muted  ? '#333333' : '#65ac43',
          paddingRight: '10px'
        }
      },
      //floor & (locked) badge styles
      floorBadgeStyle: {
        backgroundColor: this.props.member.conferenceStatus.video.floorLocked ? '#f45a5a' :'#1194f6',
        color: '#fff',
        fontSize: '.7rem',
        padding: '1px 6px',
        marginRight: '2px'
      },
      //styles the lock icon
      floorLockStyle: {
        height: '10px',
        fill: '#fff'
      },
      //screen share badge styles
      screenShareBadgeStyle: {
        backgroundColor: '#1194f6',
        color: '#fff',
        fontSize: '.7rem',
        padding: '1px 6px',
        marginRight: '2px'
      },
      //presenter badge styles
      presenterBadgeStyle: {
        backgroundColor: '#1194f6',
        color: '#fff',
        fontSize: '.7rem',
        padding: '1px 6px',
        marginRight: '2px'
      }
    };

    let styleReturn = styles[styleName];
      if(this.props.style && this.props.style[styleName]) {
        styleReturn = {...styleReturn, ...this.props.style[styleName]};
      }
    return styleReturn;
  }

  controlClickMuteMic(){
    this.props.cbControlClick("MUTEMIC", [this.props.member.memberId]);
  }

  controlClickMute(){
    this.props.cbControlClick("MUTEVIDEO", [this.props.member.memberId]);
  }

  openAdminControls(){
     this.props.cbOpenAdminControls(this.props.member);
   }

  render(){
    //console.log('&&&&&& member object', this.props.member, this.props.controlSettings);

    // Setup up mic and video status/controls
    let micStatus = this.props.member.conferenceStatus.audio.muted ?
            (<MuteMicrophoneIconSVG svgStyle={this.getStyle("svgStyle")} />) :
            (<MicrophoneIconSVG  svgStyle={this.getStyle("svgStyle")} />);

    let videoStatus = this.props.member.conferenceStatus.video.muted ?
            (<MuteVideoIconSVG  svgStyle={this.getStyle("svgStyle")} />) :
            (<VideoIconSVG  svgStyle={this.getStyle("svgStyle")} />);

    let avatarStyle = {...this.getStyle("avatarStyle")};
    if (this.props.member.conferenceStatus.audio.muted) {
      avatarStyle = ({...this.getStyle("avatarStyle"), boxShadow:'1px 1px 9px red'});
    }
    if (this.props.member.conferenceStatus.audio.talking) {
      avatarStyle = ({...this.getStyle("avatarStyle"), boxShadow:'1px 1px 9px green'});
    }

    if (this.props.controlSettings.moderator) {
      // since we are in admin mode, redefine audio and video status indicators to
      // be controlStyle

      micStatus = this.props.member.conferenceStatus.audio.muted ?
              (<ControlItem type="MuteMicrophoneIconSVG"
                  compStyle={this.getStyle("controlAudioIconStyle")}
                  cbActionClick={this.controlClickMuteMic}
              />) :
              (<ControlItem type="MicrophoneIconSVG"
                  compStyle={this.getStyle("controlAudioIconStyle")}
                  cbActionClick={this.controlClickMuteMic}
              />);

      videoStatus = this.props.member.conferenceStatus.video.muted ?
              (<ControlItem type="MuteVideoIconSVG"
                  compStyle={this.getStyle("controlVideoIconStyle")}
                  cbActionClick={this.controlClickMute}
              />) :
              (<ControlItem type="VideoIconSVG"
                  compStyle={this.getStyle("controlVideoIconStyle")}
                  cbActionClick={this.controlClickMute}
              />);
    }

    let presenterStatus;
    let presenter;
    let adminControls;
    if (this.props.controlSettings.moderator) {
      // Setup all the stuff specific to logged in user being admin

      if (this.props.controlSettings.allowPresenter) {
        // Only show the presenter icon if moderator and can allowPresenter
        if (this.props.member.conferenceStatus.video.reservationID == 'presenter') {
          // TODO replace with 'presenter toggle icon'
          presenterStatus = (<PresenterIconSVG svgStyle={{...this.getStyle("svgStyle"), fill: "#454545", cursor: "pointer"}}/>);
          // set the presenter 'badge'
          presenter = (<span style={this.getStyle("presenterBadgeStyle")}>
            <FormattedMessage
                id="PRESENTER"
                defaultMessage="Presenter"
            />
          </span>);
        } else {
          // TODO replace with 'presenter toggle icon toggled off'
          presenterStatus = (<PresenterIconSVG svgStyle={{...this.getStyle("svgStyle"), fill: "#c5c5c5", cursor: "pointer"}}/>);
        }
      } else {
        // just show the icon as 'disabled'
        presenterStatus = (<PresenterIconSVG svgStyle={{...this.getStyle("svgStyle"), fill: "#c5c5c5"}}/>);
      }

      if (this.props.showAdminControls) {
        adminControls = (
          <AdminControls
              member={this.props.member}
              multCanvas={this.props.controlSettings.multCanvas}
              cbControlClick={this.props.cbControlClick}
          />
        );
      }
    }

    const floorLocked = this.props.member.conferenceStatus.video.floorLocked ?
            (<LockIconSVG svgStyle={this.getStyle("floorLockStyle")}/>) :
            undefined;

    const floor = this.props.member.conferenceStatus.audio.floor ?
            (<span style={this.getStyle("floorBadgeStyle")}>
            {floorLocked} <FormattedMessage
                id="CHAT_FLOOR"
                defaultMessage="Floor"
              />
          </span>) :
            undefined;

    const screenShare = this.props.member.conferenceStatus.video.screenShare ?
            (<span style={this.getStyle("screenShareBadgeStyle")}>
              <FormattedMessage
                  id="SCREEN_SHARE"
                  defaultMessage="Screen Share"
              />
              </span>) :
            undefined;

    return (
      <div className="outer container" style={this.getStyle("memberWrapStyle")}>
        <div className="inner container" style={this.getStyle("memberStyle")}>
          <span style={this.getStyle('avatarSpacing')}>
              <img src={this.props.member.avatar.avatar} style={avatarStyle}/>
          </span>
          <div className="userInfo" style={this.getStyle("userInfoStyle")}
              onClick={this.openAdminControls}
          >
            <span style={this.getStyle("nameStyle")}>{this.props.member.name}</span>
            <span style={this.getStyle("emailStyle")}>{this.props.member.avatar.email}</span>
            <span>
              {floor}
              {screenShare}
              {presenter}
           </span>
        </div>
        <div className="a/v icons" style={this.getStyle("avStatusStyle")}>
          {micStatus}
          {videoStatus}
          {presenterStatus}
        </div>
      </div>
        {adminControls}
      </div>
    );
  }
}

export default (Radium(MemberItem));
// reviewed 7/14/2016
