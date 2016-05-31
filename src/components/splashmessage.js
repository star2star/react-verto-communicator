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
              alignSelf: "center",
              display: "flex",
              flexDirection: "column"
            },
            headerStyle: {
              flex: "1",
              alignSelf: "center"
            },
            bodyStyle: {
              textAlign: "center",
              width: "95%",
              backgroundColor: "gray",
              alignSelf: "center"
            },
            errorStyle: {
              backgroundColor: "red",
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

export default SplashMessage;
//return tiitle && errorMessage
//return(<div> {statusTitle} </div>
         //<div>   )
