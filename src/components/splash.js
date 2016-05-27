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
      <div style={{display: "flex", flexDirection: "column", paddingTop: "20px", paddingBottom: "20px", alignItems: "center", width: "600px", background: "green", color: 'yellow'}}>
        <div style={{paddingBottom: "20px"}}>Loading</div>
        <div style={{background: "yellow", width: "500px", height: "20px", opacity: ".4" }}>
        </div>
        <SplashMessage statusTitle="Media Check" errorObject={{header: 'error', body: 'Message'}} />
      </div>);
  }
}

Splash.propTypes = propTypes;

export default Splash;
