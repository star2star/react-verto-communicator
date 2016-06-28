import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import Modal from 'react-modal';
import App from './app';
import ContributorsListItem from './contributorsListItem';
import Radium from 'radium';
import { FormattedMessage } from 'react-intl';

const propTypes = {
  compStyle : React.PropTypes.object,
  contributorsData: React.PropTypes.array.isRequired
};

class Contributors extends VertoBaseComponent{

  constructor(props) {
    super(props);
  }

  getCompStyle() {
    return this.props.compStyle;
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

    let contList = (this.props.contributorsData).map((cont,index) => {
      return(<ContributorsListItem key={index} name={cont.name} email={cont.email} avatar={cont.avatar} />);
    });
    return (
      <Modal isOpen={true} onRequestClose={()=>{
        // console.log('closing');
        App.toggleModal();
      }} style={{...this.getStyle('modal')}} >
        <div >
          <h1 style={{...this.getStyle('header')}}>
            <FormattedMessage
                id="CONTRIBUTORS"
                defaultMessage="Contributors"
              />
          </h1>
        </div>
        <div style={{...this.getStyle('scrollContent')}}>
            {contList}
        </div>
      </Modal>
    );
  }
}

Contributors.propTypes = propTypes;

export default Radium(Contributors);
