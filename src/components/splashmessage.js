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
              textAlign: "center",
              width: "100%"
            },
            headerStyle: {
              backgroundColor: "red",
              width: "100%",
              textAlign: "center"
            },
            bodyStyle: {
              width: "100%",
              textAlign: "center",
              backgroundColor: "darkred"
            }
      };
      return (styles[styleName]);
  }

  render() {
    let errorMessage;
    if(this.props.errorObject){
      errorMessage = (<div>
        <div style={this.getStyle('headerStyle')}> {this.props.errorObject.header} </div>
        <div style={this.getStyle('bodyStyle')}>  {this.props.errorObject.body}  </div>
         </div>);
    }
    return (<div>
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
