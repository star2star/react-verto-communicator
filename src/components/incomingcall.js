import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import { FormattedMessage } from 'react-intl';
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
        container: {backgroundColor: "#fff",
          boxShadow: "0px 8px 17px 0px rgba(0,0,0,.2), 0px 6px 20px 0px rgba(0,0,0,.19)",
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 0px'
        },
        displayStyle: {
          flexDirection: "row",
          display:"flex",
          alignItems: 'center',
          flex: '1',
          marginRight: '15px'
        },
        avatarStyle: {
          width: "70px",
          height: "70px",
          fill: "#444"
        },
        callFromDisplay: {
          display: 'flex',
          flexDirection:'column',
          color: '#444'
        },
        callIdDisplay: {
          wordWrap: 'break-word'
        }
      };

      return (styles[styleName]);
    }

    render() {
      //console.log('CP: ', this.props.callData);

      return (
          <div style={this.getStyle("container")}>
            <div style={this.getStyle("displayStyle")}>
              <AvatarSVG svgStyle={this.getStyle("avatarStyle")} />
                <div style={this.getStyle("callFromDisplay")}>
                  <span>
                    <FormattedMessage
                        id="CALL_FROM"
                        defaultMessage="Call From:"
                    />
                  </span>
                  <span style={this.getStyle("callIdDisplay")}>
                      {this.props.callData.params.caller_id_number}
                  </span>
                </div>
            </div>
            <div className="callControls" style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '120px', marginRight: '15px', color: '#444', flex: '0 0 120px'}}>
              <span style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} onClick={()=>{
                //console.log('answer clicked: ', this.props);
                this.props.cbAnswer(this.props.callData);
              }}>
                <PhoneIconSVG svgStyle={{width: "20px", height: "20px", padding:'10px', transform: 'rotate(235deg)', fill: "white", backgroundColor:"green", borderRadius: "50%" }} />
                <span>Answer</span>
              </span>
              <span style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} onClick={()=>{
                //console.log('hangup clicked: ', this.props);
                this.props.cbHangup(this.props.callData);
              }}>
                <PhoneIconSVG svgStyle={{width: "20px", height: "20px", padding:'10px', fill: "white", backgroundColor:"red", borderRadius: "50%"}} />
                <span>Reject</span>
              </span>

            </div>
          </div>
        );
    }
}

IncomingCall.propTypes = propTypes;

export default IncomingCall;
