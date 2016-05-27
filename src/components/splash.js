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
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "600px", background: "green", color: 'yellow'}}>
        <div >Loading</div>
        <div style={{background: "yellow", width: "500px", height: "20px", opacity: ".4"}}>
        </div>
        <SplashMessage statusTitle="Media Check" />
      </div>);
  }
}

Splash.propTypes = propTypes;

export default Splash;
