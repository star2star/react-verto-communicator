import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import Modal from 'react-modal';
import { FormattedMessage, injectIntl } from 'react-intl';
import SettingsMenuSelect from './settingsMenuSelect.js';
import vMeter from 'volume-meter';
import VolumeMeter from './volumeMeter';
import { RestoreIconSVG } from './svgIcons';
import { fromJS } from "immutable";


class SettingsPreview extends VertoBaseComponent{
  constructor(props) {
    super(props);
    this.streamObj={};
    this.audioContext = new AudioContext();
    // initialize selectedVideo and selectedAudio state to the prop values, and
    // volume to 0
    this.state={selectedVideo: this.props.settingsData.selectedVideo,
                selectedAudio: this.props.settingsData.selectedAudio,
                volume: 0};

    this.handleMedia = this.handleMedia.bind(this);
    this.stopMedia = this.stopMedia.bind(this);
    this.submitSave = this.submitSave.bind(this);
    this.submitRefresh = this.submitRefresh.bind(this);
    this.setStateSelectedVideo = this.setStateSelectedVideo.bind(this);
    this.setStateSelectedAudio = this.setStateSelectedAudio.bind(this);
  }

  static propTypes = {
    compStyle: React.PropTypes.object,
    cbClose: React.PropTypes.func,
    cbSubmitSettings: React.PropTypes.func,
    settingsData: React.PropTypes.object
  };

  static defaultProps = {
    cbClose: ()=>{},
    cbSubmitSettings: ()=>{},
    settingsData: {}
  };

  static filename = "settingsPreview";
  static displayName = "SettingsPreview";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  componentDidMount(){
    //console.log('this.props', this.props.settingsData);
    this.setupMedia(this.state.selectedAudio, this.state.selectedVideo);
  }

  componentWillUnmount() {
    // console.log('Unmounting Settings Preview');
    this.audioContext.close();
    this.stopMedia(this.streamObj);
  }

  componentWillUpdate(nextProps, nextState) {
    if ((nextState.selectedVideo && this.state.selectedVideo.id != nextState.selectedVideo.id) ||
        (nextState.selectedAudio && this.state.selectedAudio.id != nextState.selectedAudio.id)) {

      this.setupMedia(nextState.selectedAudio, nextState.selectedVideo);
    }
  }

  setupMedia(selAudio, selVideo) {
    let constraints = {
      mirrored: true,
      audio: {
        optional: [{ sourceId: selAudio.id }]
      }
    };

    if (selVideo.id !== 'none') {
      constraints.video = {
        optional: [{ sourceId: selVideo.id }]
      };
    }
    // console.log('CONSTRAINTS', constraints);

    navigator.getUserMedia(constraints, this.handleMedia, function(err, data) {
        console.error('Error with getUserMedia', err, data);
          });
  }

  stopMedia(stream) {
    //console.log('Stop? But why?', stream)
    if (typeof stream == 'function') {
      stream.stop();
    } else {
      if (stream.active) {
        var tracks = stream.getTracks();
        //console.log('tracks??', tracks)
        tracks.forEach(function(track) {
          track.stop();
        });
      }
    }
  }

  handleMedia(stream) {
    if (this.streamObj) {
      this.stopMedia(this.streamObj);
    }

    this.streamObj = stream;
    this.refs.localvideo.src = window.URL.createObjectURL(stream);

    const mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
    const self = this;

    const meter = vMeter(self.audioContext, {tweenIn: 2, tweenOut: 6 }, function (volume) {
      //console.log('=======> volume', volume);
      self.setState({...self.state, volume: volume});
    });

    mediaStreamSource.connect(meter);
    this.streamObj.onended = meter.stop.bind(meter);
  }

  getDefaultStyle(styleName) {
    const styles = {
      previewStyles: {
        position: 'relative'
      },
      compMenuStyles:{
        container: {
          paddingTop: '10px',
          paddingBottom: '5px',
          display: 'flex',
          flex: 1,
          flexDirection: 'column'
        },
        label: {
          display:'flex',
          paddingBottom: '10px',
          fontWeight: 'bold'
        },
        select: {
          borderBottom: '1px solid #ccc',
          border: '0px',
          boxShadow:'none',
          borderRadius: '0px',
          fontSize: '.85rem',
          backgroundColor: 'rgba(0,0,0,0)',
          color: 'black',
          marginLeft: '8px',
          display: 'flex',
          flexWrap: 'wrap'

        }
      },
      compVolMeterStyles: {
        volMeterStyles: {
          position: 'absolute',
          marginTop: '-130px',
          marginLeft: '10px'
        }
      },
      modal : {
        content: {
          boxShadow: '0px 27px 24px 0px rgba(0,0,0,.2), 0px 40px 77px 0px rgba(0,0,0,.22)',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          padding: '0px 0px 20px 0px'
        },
        overlay: {
          zIndex: "1"
        }
      },
      menuStyle: {
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'wrap'
      },
      refreshStyle: {
        backgroundColor: "#009688",
        display: 'flex',
        flex: 0.25,
        justifyContent: 'center',
        border: '0px',
        marginTop: '25px',
        marginBottom: '5px',
        marginLeft: '10px',
        padding: '0 20px 0 20px',
        cursor: 'pointer',
        flexWrap: 'wrap'
      },
       saveStyle: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '5px 25px 5px 25px',
        border: '0px',
        fontSize: '15px',
        cursor: 'pointer'

      },
        saveContainer: {
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          paddingTop: '25px'
        },
        videoStyle: {
          width: '100%',
          height: '100%'
        },
        headerStyle: {
          backgroundColor: '#0D47A1',
          paddingTop: '10px',
          color: 'white',
          textAlign: 'center',
          fontSize: '15px',
          paddingBottom: '10px'
        },
        bodyStyle: {
          padding: '15px'
        }
    };

    return (styles[styleName]);
  }

  submitRefresh() {
    console.log('Clicked Refresh');
    //TODO add call to callback function that will refresh the device list
  }

  submitSave() {
    if (this.streamObj) {
      this.stopMedia(this.streamObj);
    }
    // only save settings if they have changed from this.props....
    let settingsArray = [];
    if (this.props.settingsData.selectedAudio.id != this.state.selectedAudio.id) {
      settingsArray.push({selectedAudio: this.state.selectedAudio});
    }
    if (this.props.settingsData.selectedVideo.id != this.state.selectedVideo.id) {
      settingsArray.push({selectedVideo: this.state.selectedVideo});
    }

    if ( settingsArray.length) {
      this.props.cbSubmitSettings(settingsArray);
    }
    this.props.cbClose();
  }

  setStateSelectedVideo(data){
    this.setState({...this.state, selectedVideo: data.selectedVideo});
  }

  setStateSelectedAudio(data){
    this.setState({...this.state, selectedAudio: data.selectedAudio});
  }


  render() {
    //console.log(this.state.volume);
    const { formatMessage } = this.props.intl;

    return (
      <Modal isOpen onRequestClose={this.props.cbClose} contentLabel = "Settings Modal" style={this.getStyle('modal')}>
        <div style={this.getStyle("previewStyles")}>
          <div style={this.getStyle('headerStyle')}>
            <FormattedMessage id="TITLE_PREVIEW_SETTINGS" defaultMessage="Setup your camera and microphone settings" />
          </div>
            <div style={this.getStyle('bodyStyle')}>
              <video style={{...this.getStyle('videoStyle')}} ref="localvideo" className="videoPreview" muted autoPlay> </video>
              <VolumeMeter volumeLevel={this.state.volume} compStyle={this.getStyle("compVolMeterStyles")}/>
              <div style={this.getStyle('menuStyle')}>
                <SettingsMenuSelect
                    compStyle={this.getStyle("compMenuStyles")}
                    cbSubmitSetting={this.setStateSelectedVideo}
                    options={this.props.settingsData.videoDevices ? this.props.settingsData.videoDevices : []}
                    label={formatMessage({"id": "CAMERA_SETTINGS", "defaultMessage": "Camera:"})}
                    selectedOption={{id:"selectedVideo", data:this.state.selectedVideo}}
                />
                <SettingsMenuSelect
                    compStyle={this.getStyle("compMenuStyles")}
                    cbSubmitSetting={this.setStateSelectedAudio}
                    options={this.props.settingsData.audioDevices ? this.props.settingsData.audioDevices : []}
                    label={formatMessage({"id": "MIC_SETTINGS", "defaultMessage": "Microphone:"})}
                    selectedOption={{id:"selectedAudio", data:this.state.selectedAudio}}
                />
                <button
                    style={{...this.getStyle('refreshStyle')}}
                    onClick={this.submitRefresh}
                  >
                  <RestoreIconSVG svgStyle={{height:"20px", width: "20px", fill: "white"}}/>
                </button>
              </div>
              <div style={{...this.getStyle('saveContainer')}}>
                <button
                    style={{...this.getStyle('saveStyle')}}
                    onClick={this.submitSave}
                  >
                  <FormattedMessage
                      id="SAVE"
                      defaultMessage="save"
                    />
                </button>
              </div>
            </div>
        </div>
      </Modal> );
  }
}


export default injectIntl(SettingsPreview);
// reviewed on 7/14/2016
