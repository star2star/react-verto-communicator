import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import {AvatarSVG, PhoneIconSVG } from './svgIcons';

 const propTypes = {
   callData : React.PropTypes.object.isRequired,
   cbHangup : React.PropTypes.func.isRequired,
   cbAnswer:  React.PropTypes.func.isRequired,
   compStyle : React.PropTypes.object
};

class IncomingCall extends VertoBaseComponent {
    constructor(props){
        super(props);
        this.state={};
    }


    getCompStyle() {
      return this.props.compStyle;
    }

    getDefaultStyle(styleName) {
      const styles = {
      };

      return (styles[styleName]);
    }

    render() {
      console.log('CP: ', this.props.callData);

      return (
          <div style={{flexDirection: "column", display:"flex"}}>
            <div style={{flexDirection: "row", display:"flex"}}>
              <AvatarSVG svgStyle={{width: "100px", height: "100px", fill: "black"}} />
              <div style={{flexDirection: "column", display:"flex"}} >
                <div>{this.props.callData.params.caller_id_number}</div>
              </div>
            </div>
            <div style={{backgroundColor: "yellow"}}>
              <span onClick={()=>{
                //console.log('answer clicked: ', this.props);
                this.props.cbAnswer(this.props.callData);
              }}>
                <PhoneIconSVG svgStyle={{width: "20px", height: "20px", fill: "green"}} />
              </span>
              <span onClick={()=>{
                //console.log('hangup clicked: ', this.props);
                this.props.cbHangup(this.props.callData);
              }}>
                <PhoneIconSVG svgStyle={{width: "20px", height: "20px", fill: "red"}} />
              </span>
            </div>
          </div>
        );
    }
}

IncomingCall.propTypes = propTypes;

export default IncomingCall;
