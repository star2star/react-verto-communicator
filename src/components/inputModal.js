import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import Modal from 'react-modal';
import Input from './input';
import { FormattedMessage } from 'react-intl';

const propTypes = {
  cbClose: React.PropTypes.func.isRequired,
  cbSubmit: React.PropTypes.func.isRequired,
  compStyle: React.PropTypes.object,
  title: React.PropTypes.string,
  message: React.PropTypes.string,
  label: React.PropTypes.string,
  placeholder: React.PropTypes.string
};

class InputModal extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {inputVal: ''};
    this.changingInput = this.changingInput.bind(this);
  }



  getDefaultStyle(styleName) {
    const styles = {

      headingStyle: {
        backgroundColor: '#ccc'
      },
      messageStyle: {

      },

      modalStyle : {
        content: {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          boxShadow             : '0px 27px 24px 0px rgba(0,0,0,.2), 0px 40px 77px 0px rgba(0,0,0,.22)'
        },
        overlay: {
          zIndex: "1"
        }
      }
    };

    return (styles[styleName]);
  }

  changingInput(field, value){
    //TODO - at some point rework Input component so that it is as generic as
    // its name implies

    // we don't care about the field since there is only one here right now...
    this.setState({...this.state, inputVal: value});

  }

  render() {
    // TODO - ta INternationalize the strings here, style input, etc.

    return (
      <Modal isOpen onRequestClose={this.props.cbClose} style={this.getStyle("modalStyle")}>
        <div style={this.getStyle("container")}>
          <div className="inputHeading"
              style={this.getStyle("headingStyle")}>
              {this.props.title}
          </div>
          <div style={this.getStyle("messageStyle")}>
            {this.props.message}
          </div>
          <Input
              label={this.props.label}
              placeholder={this.props.placeholder}
              cbChanging={this.changingInput.bind(this)}
              value={this.state.inputVal}
          />

          <button className="cancelBtn"
              style={this.getStyle("cancelStyle")}
              onClick={this.props.cbClose}
          >
            <FormattedMessage id='CANCEL' defaultMessage="Cancel" />
          </button>

          <button className="okButton"
              style={this.getStyle("okStyle")}
              onClick={()=>{this.props.cbSubmit(this.state.inputVal); this.props.cbClose();}}
          >
            OK
          </button>
        </div>
      </Modal> );
  }
}

InputModal.propTypes = propTypes;

export default InputModal;
// reviewed on 7/13/2016
