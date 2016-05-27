import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import SplashMessage from './splashmessage';

const propTypes = {
  Style : React.PropTypes.object
};

class Splash extends VertoBaseComponent {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <div>Loading</div>
        <div>bar goes here</div>
        <SplashMessage statusTitle="Media Check" />
      </div>);
  }
}

Splash.propTypes = propTypes;

export default Splash;
