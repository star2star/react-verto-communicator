import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import SplashMessage from './splashmessage';
import Radium from 'radium';

const propTypes = {
  step:   React.PropTypes.shape({
    number: React.PropTypes.number,
    current: React.PropTypes.number,
    title: React.PropTypes.string
  }).isRequired,
  title: React.PropTypes.string,
  compStyle : React.PropTypes.object
};

class Splash extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.getProgressBarWidth = this.getProgressBarWidth.bind(this);
    Splash.getProgressBarWidth = this.getProgressBarWidth.bind(this);

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
        margin: "auto", // for centering in viewport
        background: "#FFFFFF",
        color: '#282828',
        boxShadow: ' 0px 2px 2.5px #D3D3D3, -2.5px 2px 3.75px #D3D3D3, 2.5px 2px 3.75px #D3D3D3',
        '@media (max-width: 991px)': {
          width: '80vw'
        }
      },
      loadingStyle: {
        paddingBottom: "20px",
        paddingTop: "15px",
        fontSize: "30px",
        fontWeight: "200"
      },
      loadingBarStyle: {
        position: "relative",
        width: "90%",
        height: "4px",
        backgroundColor: "#C8C8C8"
      },
      loadingBarFilled: {
        position: "absolute",
        height: "100%",
        backgroundColor: "#26A599"
      }
    };
    return (styles[styleName]);
  }

// testability change
  getProgressBarWidth(aStepObject) {
    return Math.ceil(aStepObject.current/aStepObject.number * 100)  ;
  }

  render() {

    //calc for progress bar width
    const progressWidth = this.getProgressBarWidth(this.props.step) + "%";
    return (
      <div style={this.getStyle('splashStyle')}>
        <div style={this.getStyle('loadingStyle')}>{this.props.title}</div>
        {/* progress bar */}
        <div style={this.getStyle('loadingBarStyle')}>
          <div style={{...this.getStyle('loadingBarFilled'), width: progressWidth}}/>
        </div>
        <SplashMessage statusTitle={this.props.step.title} errorObject={this.props.step.errorObject}  />
      </div>);
  }
}

Splash.propTypes = propTypes;

export default Radium(Splash);
// reviewed on 7/14/2016
