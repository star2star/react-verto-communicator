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
        container: {
          backgroundColor: '#fff',
          boxShadow: "0px 8px 17px 0px rgba(0,0,0,.2), 0px 6px 20px 0px rgba(0,0,0,.19)",
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 0px'
        },
        displayAreaStyle: {
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'center',
          flex: '1',
          marginRight: '15px'
        },
        avatarStyle: {
          width: '70px',
          height: '70px',
          fill: '#444'
        },
        callFromDisplay: {
          display: 'flex',
          flexDirection: 'column',
          color: '#444'
        },
        callIdDisplay: {
          wordWrap: 'break-word'
        },
        callControlStyle: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems:'center',
          // width: '120px',
          marginRight: '15px',
          color: '#444',
          flex: '0 0 120px'
        },
        // adds spacing between buttons and "answer"/"reject"
        labelSpacingStyle: {
          paddingTop:'3px'
        },
        // styles the container for each button(answer/reject)
        buttonContainer: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        },
        //styles the answer button (the green one)
        answerIconStyle: {
          width: '20px',
          height: '20px',
          padding: '10px',
          transform: 'rotate(235deg)',
          fill: 'white',
          backgroundColor: 'green',
          borderRadius: '50%',
          cursor: 'pointer'
        },
        // styles the reject button (the red one)
        rejectIconStyle: {
          width: '20px',
          height: '20px',
          padding: '10px',
          fill: 'white',
          backgroundColor:"red",
          borderRadius: '50%',
          cursor: 'pointer'
        }
      };

      return (styles[styleName]);
    }

    render() {
      //console.log('CP: ', this.props.callData);

      return (
          <div className="container" style={this.getStyle("container")}>
            <div className="displayArea"style={this.getStyle("displayAreaStyle")}>
              <AvatarSVG svgStyle={this.getStyle("avatarStyle")} />
                <div className="callFrom" style={this.getStyle("callFromDisplay")}>
                  <span>
                    <FormattedMessage
                        id="CALL_FROM"
                        defaultMessage="Call From:"
                    />
                  </span>
                  <span className="callID" style={this.getStyle("callIdDisplay")}>
                      {this.props.callData.params.caller_id_number}
                  </span>
                </div>
            </div>
            <div className="callControls" style={this.getStyle("callControlStyle")}>
              <span style={this.getStyle("buttonContainer")} onClick={()=>{
                //console.log('answer clicked: ', this.props);
                this.props.cbAnswer(this.props.callData);
                }}
              >
                <PhoneIconSVG svgStyle={this.getStyle("answerIconStyle")} />
                  <span style={this.getStyle("labelSpacingStyle")}>
                    <FormattedMessage
                        id="ANSWER"
                        defaultMessage="Answer"
                    />
                  </span>
              </span>
              <span style={this.getStyle("buttonContainer")} onClick={()=>{
                //console.log('hangup clicked: ', this.props);
                this.props.cbHangup(this.props.callData);
                }}
              >
                <PhoneIconSVG svgStyle={this.getStyle("rejectIconStyle")} />
                  <span style={this.getStyle("labelSpacingStyle")}>
                    <FormattedMessage
                        id="REJECT"
                        defaultMessage="Reject"
                    />
                  </span>
              </span>
            </div>
          </div>
        );
    }
}

IncomingCall.propTypes = propTypes;

export default IncomingCall;
