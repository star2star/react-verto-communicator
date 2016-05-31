import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import SplashMessage from './splashmessage';

const propTypes = {
  step:   React.PropTypes.shape({
    number: React.PropTypes.number,
    current: React.PropTypes.number,
    title: React.PropTypes.string
  }).isRequired,
  compStyle : React.PropTypes.object
};

class Splash extends VertoBaseComponent {
  constructor(props) {
    super(props);
  }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      splashStyle: {
        display: "flex",
        flexDirection: "column",
        paddingTop: "20px",
        paddingBottom: "20px",
        alignItems: "center",
        width: "600px",
        background: "green",
        color: 'yellow',
        boxShadow: '10px 10px 5px #888888'
      },
      loadingStyle: {
        paddingBottom: "20px"
      },
      loadingBarStyle: {
        position: "relative",
        width: "500px",
        height: "30px",
        backgroundColor: "gray"
      },
      loadingBarFilled: {
        position: "absolute",
        height: "100%",
        backgroundColor: "#4CAF50"
      }
    };
    return (styles[styleName]);
  }
  render() {
    //calc for progress bar width
    const progressWidth = Math.ceil(this.props.step.current/this.props.step.number * 100) + "%";
    return (
      <div style={this.getStyle('splashStyle')}>
        <div style={this.getStyle('loadingStyle')}>Loading</div>
        {/* progress bar */}
        <div style={this.getStyle('loadingBarStyle')}>
          <div style={{...this.getStyle('loadingBarFilled'), width: progressWidth}}/>
        </div>
          <SplashMessage statusTitle={this.props.step.title} errorObject={{header: 'Error', body: 'You media permissions are turned off.'}} />
      </div>);
  }
}

Splash.propTypes = propTypes;

export default Splash;
