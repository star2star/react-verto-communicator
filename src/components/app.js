import React from 'react';
import { Link } from 'react-router'
import VertoBaseComponent from './vertobasecomponent';

import Main from '../containers/main/index.js';
import Modal from 'react-modal';

import AppBar from '../containers/appbar/index.js';

class App extends VertoBaseComponent {
  constructor(props){
    super(props)
    this.state = {isModalOpen: false};
    this.modal = undefined;
    App.toggleModal = this.toggleModal.bind(this);
  }
  
  toggleModal(aModal){
    //console.log('aaaaa')
    if (!this.state.isModalOpen) {
      this.modal = aModal;
    } else {
      this.modal = undefined;
    }

    this.setState({ ...this.state, isModalOpen: !this.state.isModalOpen });

  }
  render(){
    return (
      <div>
        <AppBar />
        <Main />
        {this.modal}

      </div>);

  }
}

export default App;
