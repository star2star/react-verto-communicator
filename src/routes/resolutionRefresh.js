import React from 'react';
import VertoBaseComponent from '../components/vertobasecomponent';
import {injectIntl} from 'react-intl';
import Radium from 'radium';
import { compose } from 'recompose';
import { fromJS } from 'immutable';

class ResolutionRefresh extends VertoBaseComponent {

  constructor(props) {
    super(props);
    this.state={};
  }

  shouldComponentUpdate(nextProps, nextState){
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  render() {
    return(
      <div>Resolution Refresh .... in progress</div>
    );
  }
}

const hocComponent = compose(injectIntl, Radium);

export default hocComponent(ResolutionRefresh);
