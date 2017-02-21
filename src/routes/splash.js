import React from 'react';
import Splash from '../components/splash';
import { connect } from 'react-redux';
import {injectIntl} from 'react-intl';
import Radium from 'radium';
import { compose } from 'recompose';
import VertoBaseComponent from '../components/vertobasecomponent';

class AppSlpash extends VertoBaseComponent {

  constructor(props) {
    super(props);
    this.state={};
  }

  getDefaultStyle(styleName) {
    const styles = {
      showSplashStyle: {
        margin: 'auto'
      }
    };
    return (styles[styleName]);
  }

  render() {
    const { formatMessage } = this.props.intl;
    const splashObject = { ...this.props.auth.splash };
    const intlTitle = formatMessage({"id": "LOADING", "defaultMessage": "Loading"});

    switch(this.props.params.event){
      
      case 'browser':
        splashObject.title = formatMessage({"id":"BROWSER_COMPATIBILITY", "defaultMessage":"Checking browser compatibility."});
        break;

      case 'meida':
        splashObject.title = formatMessage({"id":"CHECK_PERMISSION_MEDIA", "defaultMessage":"Checking media permissions"});
        break;

      case 'resolution':
        splashObject.title = formatMessage({"id":"CHECK_RESOLUTION", "defaultMessage":"Checking resolution."});
        break;

      case 'resolution_failed':
        splashObject.title = formatMessage({"id":"CHECK_RESOLUTION", "defaultMessage":"Checking resolution."});
        splashObject.errorObject = {
          header: formatMessage({"id":"ERRORS", "defaultMessage":"Errors"}),
          body: formatMessage({"id":"ERROR_PERMISSION_MEDIA", "defaultMessage":"Error: internal error checking resolution"})
        };
        break;

      case 'bns':
        //console.log('BBBNNNNSSSS', this.props.auth);
        splashObject.title = formatMessage({"id":"BROWSER_COMPATIBILITY", "defaultMessage":"Checking browser compatibility."});
        splashObject.errorObject = {
          header: formatMessage({"id":"ERRORS", "defaultMessage":"Errors"}),
          body: formatMessage({"id":"BROWSER_WITHOUT_WEBRTC", "defaultMessage":"Error: browser doesn't support WebRTC"})
        };
        break;

      case 'noMedia':
        splashObject.title = formatMessage({"id":"CHECK_PERMISSION_MEDIA", "defaultMessage":"Checking media permissions"});
        splashObject.errorObject = {
          header: formatMessage({"id":"ERRORS", "defaultMessage":"Errors"}),
          body: formatMessage({"id":"ERROR_PERMISSION_MEDIA", "defaultMessage":"Error: Media Permission Denied"})
        };
        break;

      default:
        break;

    }

    return(
      <Splash step={splashObject} title={intlTitle} style={this.getStyle('showSplashStyle')}/>
    );
  }

}

const hocComponent = compose(injectIntl, Radium, connect((state)=>{
      return ({
        auth: state.auth
      });
  }));

export default hocComponent(AppSlpash);
