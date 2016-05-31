import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import SplashMessage from './splashmessage';

const propTypes = {
  step:   React.PropTypes.shape({
    number: React.PropTypes.number,
    current: React.PropTypes.number,
    title: React.PropTypes.string
  }).isRequired,
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
        <div style={{background: "yellow", width: "500px", height: "20px", opacity: ".4", marginBottom: "10px"}}>
        </div>
        <div style= {{width: "95%", margin: "0 2.5%"}}>
          < SplashMessage statusTitle={this.props.step.title} />
          < SplashMessage errorObject={{header: 'error'}} />
        </div>
        <div style= {{width: "92%", margin: "0 2.5%"}}>
          < SplashMessage errorObject={{body: 'Message'}} />
        </div>
      </div>);
  }
}

Splash.propTypes = propTypes;

export default Splash;
