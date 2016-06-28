import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import Modal from 'react-modal';
import { FormattedMessage } from 'react-intl';
import WhiteLabel from '../js/whitelabel.js';

const propTypes = {
  compStyle: React.PropTypes.object,
  version: React.PropTypes.string,
  gitRev: React.PropTypes.string,
  cbClose: React.PropTypes.func.isRequired
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

      mymodal : {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0px 27px 24px 0px rgba(0,0,0,.2), 0px 40px 77px 0px rgba(0,0,0,.22)'
        },
        overlay: {
          zIndex: "1"
        }
      },
      logoSrcStyle: {
        width: '100%'
      }
    };

    return (styles[styleName]);
  }

  render() {
    const logoSrc = WhiteLabel.get('logoSrc');
    const poweredBy = WhiteLabel.get('poweredBy');
    return (
      <Modal isOpen onRequestClose={this.props.cbClose} style={this.getStyle('mymodal')}>
        <div className="container" style={this.getStyle('container')}>
          <div className="image" style={this.getStyle('imageStyle')}>
            <img src={logoSrc} style={this.getStyle("logoSrcStyle")}  />
          </div>

          <div className="version">
           <FormattedMessage id='VERSION' defaultMessage="Version"/>
           <span> {this.props.version} </span>
          </div>

          <div className="poweredBy">
            <FormattedMessage id='POWERED_BY' defaultMessage="Powered By: " />
            <img src={poweredBy} />
          </div>
        </div>
      </Modal>
    );
  }
}

About.propTypes = propTypes;

export default About;
