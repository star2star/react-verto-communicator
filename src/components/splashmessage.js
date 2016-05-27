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
      errorMessage = this.props.errorObject;
    }
    return (<div>aaaa</div>);
  }
}

export default SplashMessage;
//return tiitle && errorMessage
//return(<div> {statusTitle} </div>
         //<div>   )
