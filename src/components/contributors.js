import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import Modal from 'react-modal';
import App from './app';
import ContributorsListItem from './contributorsListItem';
import ContributorsData from '../config/contributorsData.js';

const propTypes = {
  compStyle : React.PropTypes.object
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
        }
      },

      body : {
        //padding: '0px 24px 16px'
      },
      header : {
        fontWeight: '300',
        fontSize: '24px'
        //padding: '24px 24px 0px'
      },
      ul : {

      },
      li : {

      }
    };

    return (styles[styleName]);
  }



  render() {
    //CD.map
    const contributorsArray = ContributorsData;
    //this is just for testing
    //console.log(contributorsArray[0]);
    //^^^^^^^^^^^^^^^^^^^^^^^^^^
    return (
      <Modal isOpen={true} onRequestClose={()=>{
        console.log('closing');
        App.toggleModal();
      }} style={{...this.getStyle('modal')}} >
        <div >
          <h1 style={{...this.getStyle('header')}}>
            Contributors
          </h1>
        </div>
        <div>
          <ContributorsListItem contr={contributorsArray[0]} index={0} />
        </div>
      </Modal> );
  }
}

Contributors.propTypes = propTypes;

export default Contributors;
