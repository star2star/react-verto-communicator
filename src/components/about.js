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
      Modal : {
        content: {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          '@media (minWidth: 786px)': {
            width: '80vw'
          }
        }
      }
    };
    return (styles[styleName]);
  }

  render() {
    const logoSrc = WhiteLabel.get('logoSrc');
    return (
      <Modal isOpen={true} onRequestClose={()=>{App.toggleModal();}} style={{...this.getStyle('Modal')}}>
        <div>
          <img src={logoSrc} />
        </div>
      </Modal> );
  }
}

About.propTypes = propTypes;

export default Radium(About);
