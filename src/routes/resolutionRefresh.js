import React from 'react';
import VertoBaseComponent from '../components/vertobasecomponent';
import {injectIntl} from 'react-intl';
import Radium from 'radium';
import { compose } from 'recompose';

class AppLogin extends VertoBaseComponent {

  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    return(
      <div>Resolution Refresh .... in progress</div>
    );
  }
}

const hocComponent = compose(injectIntl, Radium);

export default hocComponent(AppLogin);
