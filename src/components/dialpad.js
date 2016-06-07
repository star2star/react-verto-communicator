import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import Numberpad from './numberpad';
import { CallHistoryIconSVG, BackIconSVG, PhoneIconSVG } from './svgIcons';

const propTypes = {
  compStyle : React.PropTypes.object,
  cbCall: React.PropTypes.func.isRequired,
  nbrToDial: React.PropTypes.string
};

class Dialpad extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {number: this.props.nbrToDial};
  }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      container: {
        paddingLeft: '15px',
        paddingRight: '15px',
        display: "flex",
        alignItems: "center",
        justifyContent: 'flex-start',
        flexDirection: "column",
        maxWidth: "500px",
        boxShadow: '0 16px 28px 0 rgba(0,0,0,.22),0 25px 55px 0 rgba(0,0,0,.21)'
      },
      header: {
        background: "#eee",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#eee',
        height: '100px',
        width: '100%',
        padding: '15px',
        borderBottom: '2px solid #ccc'
      },
      callhist : {
        width: "24px",
        height: "24px",
        fill: "green"
      },
      input: {
        backgroundColor: 'transparent',
        color: '#4a4a4a',
        //height: '100px',
        width: '80%',
        padding: '10px',
        border: 'none',
        outline: 'none',
        fontSize: '40px'
      },
      back : {
        width: "24px",
        height: "24px",
        fill: "#ccc"
      },
      bodycont: {
        width: '100%'
      },
      callcont: {
        width: '100%',
        paddingTop: '15px',
        paddingBottom: '15px',
        display: 'flex',
        justifyContent: 'center'
      },
      callbg: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#4caf50",
        borderRadius: '50%',
        width: '56px',
        height: '56px',
        cursor: 'pointer'
      },
      call: {
        width: "24px",
        height: "24px",
        fill: "#fff"
      }

    };

    return (styles[styleName]);
  }

  makeCall(){
    //TODO validate
    this.props.cbCall(this.state.number)
  }

  changingNumber(e){
    //TODO convert letter to numeric
    this.setState({ ...this.state, number: e.target.value });
  }

  dialNumber(k) {
    this.setState({ ...this.state, number: this.state.number + k });
  }

  render() {
    return (
      <div style={{...this.getDefaultStyle('container')}}>
        <div style={{...this.getDefaultStyle('header')}}>
          <CallHistoryIconSVG svgStyle={{...this.getDefaultStyle('callhist')}} />
          <input
          placeholder="Enter an extension"
          style={{...this.getDefaultStyle('input')}}
          value={this.state.number} onChange={this.changingNumber.bind(this)}/>
          <BackIconSVG svgStyle={{...this.getDefaultStyle('back')}} />
        </div>
        <Numberpad cbClick={this.dialNumber.bind(this)} />
        <div style={{...this.getDefaultStyle('callcont')}}>
          <div
              onClick={this.makeCall.bind(this)}
              style={{...this.getDefaultStyle('callbg')}} >
            <PhoneIconSVG svgStyle={{...this.getDefaultStyle('call')}} />
          </div>
        </div>
      </div>);
  }
}

Dialpad.propTypes = propTypes;

export default Dialpad;
