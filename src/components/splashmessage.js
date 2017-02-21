import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import { fromJS } from "immutable";


class SplashMessage extends VertoBaseComponent{
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    errorObject: React.PropTypes.object,
    compStyle:   React.PropTypes.object,
    statusTitle: React.PropTypes.string
  };

  static defaultProps = {
    statusTitle: 'noTitle'
  };

  static filename = "splashmessage";
  static displayName = "SplashMessage";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  getDefaultStyle(styleName) {
      const styles = {
            combinedStyle: {
              width: "95%",
              margin: "0 2.5%",
              paddingTop: "20px"
            },
            titleStyle: {
              color: "#272727",
              alignSelf: "center",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              paddingBottom: "10px"
            },
            headerStyle: {
              color: "#FFFFFF",
              flex: "1",
              alignSelf: "center",
              fontSize: "20px",
              padding: "5px 0px",
              paddingTop: "10px"
            },
            bodyStyle: {
              color: "#FFFFFF",
              textAlign: "center",
              alignSelf: "center",
              width: "95%",
              backgroundColor: "#E16565",
              fontWeight: "500",
              wordWrap: "break-word",
              padding: "5px"
            },
            errorStyle: {
              backgroundColor: "#FC7E7E",
              display: "flex",
              flexDirection: "column",
              paddingBottom: "25px",
              paddingTop: "5px"
            }
      };
      return (styles[styleName]);
  }

  render() {
    let errorMessage;
    if(this.props.errorObject){
      errorMessage = (
        <div style={this.getStyle('errorStyle')}>
          <div style={this.getStyle('headerStyle')}> {this.props.errorObject.header} </div>
          <div style={this.getStyle('bodyStyle')}>  {this.props.errorObject.body}  </div>
        </div>
      );
    }
    // main return
    return (
      <div style={this.getStyle('combinedStyle')}>
        <div style={this.getStyle('titleStyle')}> {this.props.statusTitle} </div>
        {errorMessage}
      </div>
    );
  }
}

export default SplashMessage;
// reviewed on 7/14/2016
