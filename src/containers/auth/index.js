import React from 'react';
import VertoBaseComponent from '../../components/vertobase';
//import Radium from 'radium';
import { connect } from 'react-redux';
//import ReactTooltip from 'react-tooltip';
import VCStatus from '../../components/vcstatus';

class Auth extends VertoBaseComponent {
  constructor(props) {
    super(props);

    this.state={};
  }

  componentWillMount() {
  }

  getDefaultStyle(styleName) {
    const styles = {

        };

    return (styles[styleName]);
  }

  render() {
    return (<div>auth</div>);
  }
}

export default connect((state)=>{
  console.log('----STORE in auth ----', state);
  return ({
    authSettings: state.auth.loginSettings
  });
})(Auth);
