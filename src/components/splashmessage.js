import React from 'react';
import VertoBaseComponent from './vertobasecomponent';

//prop valudation
const propTypes = {
  errorObject: React.PropTypes.object,
  compStyle:   React.PropTypes.object,
  statusTitle: React.PropTypes.string
};
//errorObject has 2 props header and body
class SplashMessage extends VertoBaseComponent{
  constructor(props) {
    super(props);
  }

  getDefaultStyle(styleName) {
      const styles = {
            titleStyle: {
              width: '100%'
            },
            headerStyle: {
              width: '100%',
              backgroundColor: 'darkred'
            },
            bodyStyle: {
              width: '100%',
              backgroundColor: 'red'
            }
      };
      return (styles[styleName]);
  }

  render() {
    let errorMessage;
    if(this.props.errorObject){
      errorMessage = (<div>
        <div> {this.props.errorObject.header} </div>
        <div> {this.props.errorObject.body} </div>
         </div>);
    }
    return (<div>
      <div> {this.props.statusTitle} </div>
      {errorMessage}
      </div>
    );
  }
}

export default SplashMessage;
//return tiitle && errorMessage
//return(<div> {statusTitle} </div>
         //<div>   )
