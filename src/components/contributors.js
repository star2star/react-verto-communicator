import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import Modal from 'react-modal';
import App from './app';


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
        fontSize: '24px',
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

    return (
      <Modal isOpen={true} onRequestClose={()=>{
        console.log('closing');
        App.toggleModal();
      }} style={{...this.getStyle('modal')}} >
        <div style={{}}>
          <h1 style={{...this.getStyle('header')}}>
            Contributors
          </h1>
          <ul>
            <li>
              <img src="" alt="" />
              <h1> </h1>
              <h3> </h3>
            </li>
          </ul>
        </div>
      </Modal> );
  }
}

Contributors.propTypes = propTypes;

export default Contributors;
