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
    //calc for progress bar width 
    const progressWidth = Math.ceil(this.props.step.current/this.props.step.number * 100) + "%"
    return (
      <div style={{display: "flex", flexDirection: "column", paddingTop: "20px", paddingBottom: "20px", alignItems: "center", width: "600px", background: "green", color: 'yellow'}}>
        <div style={{paddingBottom: "20px"}}>Loading ...</div>
        {/* progress bar */}
        <div style={{position: "relative", width: "500px", height: "30px", backgroundColor: "gray" }}>
          <div style={{position: "absolute", width: progressWidth, height: "100%", backgroundColor: "#4CAF50" }} />
        </div>
        <SplashMessage statusTitle={this.props.step.title} errorObject={{header: 'error', body: 'Message'}} />
      </div>);
  }
}

Splash.propTypes = propTypes;

export default Splash;
