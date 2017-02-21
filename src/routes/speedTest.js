import React from 'react';
import Loader from 'halogen/ClipLoader';
import VertoBaseComponent from '../components/vertobasecomponent';
import {injectIntl} from 'react-intl';
import Radium from 'radium';
import { compose } from 'recompose';

class SpeedTest extends VertoBaseComponent {

  constructor(props) {
    super(props);
    this.state={};
  }

  getDefaultStyle(styleName) {
    const styles = {
      testingStyle:{
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center',
       fontSize: '30px',
       paddingBottom: '30px'
     },
     loaderStyle:{
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center'
     }
    };
    return (styles[styleName]);
  }

  render() {
    const { formatMessage } = this.props.intl;

    return(
      <div>
        <div style={this.getStyle('testingStyle')}>
          {formatMessage({"id":"DETERMINING_SPEED", "defaultMessage":"Error: Media Permission Denied"})}
        </div>
        <div style={this.getStyle('loaderStyle')}>
          <Loader color="black" size="325px"/>
        </div>
      </div>
    );
  }

}

const hocComponent = compose(injectIntl, Radium);

export default hocComponent(SpeedTest);
