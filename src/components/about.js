import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import Modal from 'react-modal';
import App from './app';
import { FormattedMessage } from 'react-intl';
import Radium from 'radium';
import WhiteLabel from '../js/whitelabel.js';

const propTypes = {
  compStyle: React.PropTypes.object,
  version: React.PropTypes.string,
  gitRev: React.PropTypes.string
};

class About extends VertoBaseComponent{
  constructor(props) {
    super(props);
  }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {

      gitRevStyle: {
        paddingTop: '15px'
      },

      imageStyle: {
        width: '100%',
        height: '100%'
      },

      container: {
        '@media (max-width: 767px)': {
          alignItems: "center"
        }
      },
      mymodal : {
        content: {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      }
    };
    return (styles[styleName]);
  }

  render() {
    const logoSrc = WhiteLabel.get('logoSrc');
    const poweredBy = WhiteLabel.get('poweredBy');
    return (
      <Modal isOpen={true} onRequestClose={()=>{App.toggleModal();}} style={this.getStyle('mymodal')}>
        <div style={this.getStyle('container')}>
          <div style={this.getStyle('imageStyle')}>
            <img src={logoSrc} style={{width: "100%" }}  />
          </div>

          <div>
           <FormattedMessage id='VERSION' />
           <span> {this.props.version} </span>
          </div>

          <div style={this.getStyle('gitRevStyle')}>
            <FormattedMessage id='GIT_REV' />
            <span> {this.props.gitRev} </span>
          </div>

          <div>
            <FormattedMessage id='POWERED_BY' />
            <img src={poweredBy} />
          </div>
        </div>
      </Modal> );
  }
}

About.propTypes = propTypes;

export default Radium(About);
