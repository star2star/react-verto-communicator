import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import Modal from 'react-modal';
import App from '../routes/app';
import ContributorsListItem from './contributorsListItem';
import Radium from 'radium';
import { FormattedMessage } from 'react-intl';
import { fromJS } from "immutable";



class Contributors extends VertoBaseComponent{

  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    compStyle : React.PropTypes.object,
    contributorsData: React.PropTypes.array
  };

  static defaultProps = {
    contributorsData: []
  };

  static filename = "contributors";
  static displayName = "Contributors";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  getDefaultStyle(styleName) {
    const styles = {
      modal: {
        content : {
          top : '50%',
          left : '50%',
          right : 'auto',
          bottom  : 'auto',
          marginRight : '-50%',
          transform : 'translate(-50%, -50%)',
          width: '33.33%',
          boxShadow: '0px 27px 24px 0px rgba(0,0,0,.2), 0px 40px 77px 0px rgba(0,0,0,.22)',
          borderRadius: '2px',
          border: 'none',
          backgroundColor: '#fff'
        },
        overlay: {
          zIndex: "1"
        }
      },
      header : {
        fontWeight: '300',
        fontSize: '24px',
        display: 'flex',
        justifyContent: 'center'
      },
      scrollContent: {
        maxHeight: '540px', //list will scroll on overflow
        overflow: 'auto'
      }
    };

    return (styles[styleName]);
  }

  render() {
    return (
      <Modal
          isOpen
          onRequestClose={App.toggleModal}
          style={{...this.getStyle('modal')}}
          contentLabel = "Contributors Modal"
        >
        <div >
          <h1 style={{...this.getStyle('header')}}>
            <FormattedMessage
                id="CONTRIBUTORS"
                defaultMessage="Contributors"
              />
          </h1>
        </div>
        <div style={{...this.getStyle('scrollContent')}}>
            {(this.props.contributorsData).map((cont,index) => {
              return(<ContributorsListItem key={index} name={cont.name} email={cont.email} avatar={cont.avatar} />);
            })}
        </div>
      </Modal>
    );
  }
}

export default Radium(Contributors);
// reviewed 7/13/2016
