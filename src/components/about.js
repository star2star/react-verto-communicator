import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import Modal from 'react-modal';
import App from './app';


const propTypes = {
  Style : React.PropTypes.object
};

class About extends VertoBaseComponent{

  constructor(props) {
    super(props);
  }


  render() {

    return (
      <Modal isOpen={true} onRequestClose={()=>{
        console.log('closing');
        App.toggleModal();
      }} style={{
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
}}>
        <div style={{width: "300px", height: "300px"}}>
          <h1>About</h1>
        </div>
      </Modal> );
  }
}

About.propTypes = propTypes;

export default About;
