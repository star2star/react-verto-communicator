import React from 'react';
import VertoBaseComponent from './vertobasecomponent';

const propTypes = {
  errorObject: React.PropTypes.object,
  compStyle:   React.PropTypes.object,
  statusTitle: React.PropTypes.string
};

class SplashMessage extends VertoBaseComponent{
  constructor(props) {
    super(props);
  }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
      const styles = {
            titleStyle: {
              color: "#272727",
              alignSelf: "center",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              paddingBottom: "5px"
            },
            headerStyle: {
              color: "#FFFFFF",
              flex: "1",
              alignSelf: "center",
              fontSize: "24px",
              padding: "5px 0px"
            },
            bodyStyle: {
              color: "#FFFFFF",
              textAlign: "center",
              alignSelf: "center",
              width: "95%",
              backgroundColor: "#E16565",
              textWeight: "bold",
              wordWrap: "break-word",
              padding: "5px"
            },
            errorStyle: {
              backgroundColor: "#FC7E7E",
              display: "flex",
              flexDirection: "column",
              paddingBottom: "15px"
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
      <div>
        <div style={this.getStyle('titleStyle')}> {this.props.statusTitle} </div>
        {errorMessage}
      </div>
    );
  }
}



SplashMessage.propTypes = propTypes;
export default SplashMessage;
