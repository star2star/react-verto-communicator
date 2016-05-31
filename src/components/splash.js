import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import SplashMessage from './splashmessage';
import { FormattedMessage } from 'react-intl';

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
        background: "#FFFFFF",
        color: '#282828',
        boxShadow: ' 0px 2px 2.5px gray, -2.5px 2px 3.75px gray, 2.5px 2px 3.75px gray'
      },
      loadingStyle: {
        paddingBottom: "20px",
        fontSize: "30px",
        textWeight: "100"
      },
      loadingBarStyle: {
        position: "relative",
        width: "500px",
        height: "4px",
        backgroundColor: "gray"
      },
      loadingBarFilled: {
        position: "absolute",
        height: "100%",
        backgroundColor: "#009688"
      }
    };
    return (styles[styleName]);
  }
  render() {

    //calc for progress bar width
    const progressWidth = Math.ceil(this.props.step.current/this.props.step.number * 100) + "%";
    return (
      <div style={this.getStyle('splashStyle')}>
        <div style={this.getStyle('loadingStyle')}><FormattedMessage id="LOADING" defaultMessage="Loading"/></div>
        {/* progress bar */}
        <div style={this.getStyle('loadingBarStyle')}>
          <div style={{...this.getStyle('loadingBarFilled'), width: progressWidth}}/>
        </div>
        <SplashMessage statusTitle={this.props.step.title} errorObject={this.props.step.errorObject}  />
      </div>);
  }
}

Splash.propTypes = propTypes;

export default Splash;
