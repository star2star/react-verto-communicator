import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import Modal from 'react-modal';
import { FormattedMessage } from 'react-intl';
import SettingsMenuSelect from './settingsMenuSelect.js';
import vMeter from 'volume-meter';
import VolumeMeter from './volumeMeter';
// TODO replace with 'refresh' icon when available...
import { RestoreIconSVG } from './svgIcons';

const propTypes = {
  compStyle: React.PropTypes.object,
  cbClose: React.PropTypes.func.isRequired,
  settingsData: React.PropTypes.object.isRequired
};
class SettingsPreview extends VertoBaseComponent{
  constructor(props) {
    super(props);
    this.state={volume: 0};
    this.streamObj={};
    this.audioContext = new AudioContext();

    this.handleMedia = this.handleMedia.bind(this);
    this.stopMedia = this.stopMedia.bind(this);
    this.submitSave = this.submitSave.bind(this);
    this.submitRefresh = this.submitRefresh.bind(this);
  }

  componentDidMount(){

    console.log('this.props', this.props.settingsData);
    let constraints = {
      mirrored: true,
      audio: {
        optional: [{ sourceId: this.props.settingsData.selectedAudio.id }]
      }
    };

    if (this.props.settingsData.selectedVideo.id !== 'none') {
      constraints.video = {
        optional: [{ sourceId: this.props.settingsData.selectedVideo.id }]
      };
    }
    // console.log('CONSTRAINTS', constraints);

    navigator.getUserMedia(constraints, this.handleMedia, function(err, data) {
        console.error('Error with getUserMedia', err, data);
          });
  }

  componentWillUnmount() {
    this.stopMedia(this.streamObj);
  }

  stopMedia(stream) {
    if (typeof stream == 'function') {
      stream.stop();
    } else {
      if (stream.active) {
        var tracks = stream.getTracks();
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
    // meter = createAudioMeter(audioContext);

    const self = this;
    const meter = vMeter(self.audioContext, {tweenIn: 2, tweenOut: 6 }, function (volume) {
      //console.log('=======> volume', volume);
      self.setState({...self.state, volume: volume});
    });

    mediaStreamSource.connect(meter);
    this.streamObj.onended = meter.stop.bind(meter);
  }

  getCompStyle() {
    return this.props.compStyle;
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
          borderBottom: '1px solid #ccc',
          display: 'flex',
          flex: 2,
          flexDirection: 'column'
        },
        label: {
          display:'flex',
          paddingBottom: '10px',
          fontWeight: 'bold'
        },
        select: {
          border: '0',
          boxShadow:'none',
          borderRadius: '0',
          fontSize: '.85rem;',
          backgroundColor: 'rgba(0,0,0,0)',
          color: 'black'
        }
      },
      compVolMeterStyles: {
        volMeterStyles: {
          position: 'absolute',
          //top: '375px',
          marginTop: '-105px',
          marginLeft: '10px'
        }
      },
      modal : {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          padding: '0 0 20px 0'
        },
        overlay: {
          zIndex: "1"
        }
      },
      menuStyle: {
        display: "flex"
      },
      refreshStyle: {
        backgroundColor: "#009688",
        display: 'flex',
        flex: 1,
        justifyContent: 'center'
      },
       saveStyle: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '5px 30px 5px 30px',
        fontSize: '20px'

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
        }
    };

    return (styles[styleName]);
  }

  submitRefresh() {
    console.log('Clicked Refresh');
    //TODO add call to callback function that will refresh the device list
  }

  submitSave() {
    console.log('Clicked Save');
    //TODO add call to callback function that will save changes to selected devices
  }


  render() {

    return (
      <Modal isOpen onRequestClose={this.props.cbClose} style={this.getStyle('modal')}>
        <div style={this.getStyle("previewStyles")}>
          <div style={this.getStyle('headerStyle')}>
            <FormattedMessage id="TITLE_PREVIEW_SETTINGS" defaultMessage="Setup your camera and microphone settings" />
          </div>
          <video style={{...this.getStyle('videoStyle')}} ref="localvideo" className="videoPreview" muted autoPlay> </video>
          <VolumeMeter volumeLevel={this.state.volume} compStyle={this.getStyle("compVolMeterStyles")}/>
          <div style={this.getStyle('menuStyle')}>
            <SettingsMenuSelect
                compStyle={this.getStyle("compMenuStyles")}
                cbSubmitSetting={(data)=>{console.log('settings submit callback', data);}}
                options={this.props.settingsData.videoDevices ? this.props.settingsData.videoDevices : []}
                label="Camera:"
                selectedOption={{id:"selectedVideo", label:this.props.settingsData.selectedVideo && this.props.settingsData.selectedVideo.label}}
            />
            <SettingsMenuSelect
                compStyle={this.getStyle("compMenuStyles")}
                cbSubmitSetting={(data)=>{console.log('settings submit callback', data);}}
                options={this.props.settingsData.audioDevices ? this.props.settingsData.audioDevices : []}
                label="Microphone:"
                selectedOption={{id:"selectedAudio", label:this.props.settingsData.selectedAudio && this.props.settingsData.selectedAudio.label}}
            />
            <button
                style={{...this.getStyle('refreshStyle')}}
                onClick={this.submitRefresh.bind(this)}
              >
              <RestoreIconSVG svgStyle={{height:"20px", width: "20px", fill: "white"}}/>
            </button>
          </div>
          <div style={{...this.getStyle('saveContainer')}}>
            <button
                style={{...this.getStyle('saveStyle')}}
                onClick={this.submitSave.bind(this)}
              >
              <FormattedMessage
                  id="SAVE"
                  defaultMessage="save"
                />
            </button>
          </div>
        </div>
      </Modal> );
  }
}

SettingsPreview.propTypes = propTypes;

export default SettingsPreview;
