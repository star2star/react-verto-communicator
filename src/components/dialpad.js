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
    this.state = {number: this.props.nbrToDial, inputFocused: false};
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
        //justifyContent: 'space-between',
        backgroundColor: '#eee',
        //height: '100px',
        width: '100%',
        padding: '15px',
        borderBottom: '2px solid #ccc'
      },
      callhist : {
        display: this.state.inputFocused ?  'none' : 'block',
        width: "24px",
        height: "24px",
        fill: "green"
      },
      span : {
        width: '24px'
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
        display: this.state.inputFocused ?  'none' : 'inline',
        width: "24px",
        height: "24px",
        fill: "#ccc",
        cursor: 'pointer'
      },
      bar: {
        position: 'relative',
        bottom: '2px',
        padding: '0px 14px 0px 12px',
        display: 'flex',
        justifyContent: 'space-between',
        content: '" "',
        height: '2px',
        borderWidth: '2px',
        borderColor: '#ccc',
        width: '101%',
        backgroundColor: '#ccc'
      },
      left: {
        content: '" "',
        height: '2px',
        position: 'absolute',
        backgroundColor: '#009688',
        transition : this.state.inputFocused ? 'left 1s' : 'left 0s',
        left: this.state.inputFocused ?  '0%' : '50%',
        right: '50%'
      },
      right: {
        content: '" "',
        height: '2px',
        position: 'absolute',
        backgroundColor: '#009688',
        transition : this.state.inputFocused ? 'right 1s' : 'right 0s',
        right: this.state.inputFocused ?  '0%' : '50%',
        left: '50%'
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
          <span
              style={{...this.getStyle('span')}}
              onClick={()=>{console.log('Hi Mom!')}}
          >
            <CallHistoryIconSVG
              svgStyle={{...this.getDefaultStyle('callhist')}} />
          </span>
          <input
              placeholder="Enter an extension"
              style={{...this.getDefaultStyle('input')}}
              value={this.state.number}
              onChange={this.changingNumber.bind(this)}
              onFocus={()=>{
                this.setState({...this.state,'inputFocused': true});
              }}
              onBlur={()=>{
                this.setState({...this.state,'inputFocused': false});
              }}
          />
          <span
              style={{...this.getStyle('span')}}
              onClick={()=>{
                const number = this.state.number;
                const newNumber = number.slice(0, number.length - 1);
                this.setState({...this.state,'number': newNumber });
              }}
          >
            <BackIconSVG svgStyle={{...this.getDefaultStyle('back')}}
          />
          </span>
        </div>
        <div style={{...this.getStyle('bar')}}>
          <span className="left" style={{...this.getStyle('left')}}> &nbsp;</span>
          <span className="right" style={{...this.getStyle('right')}}>&nbsp; </span>
        </div>
        <Numberpad cbClick={this.dialNumber.bind(this)} />
        <div
            onFocus={()=>{
              this.setState({...this.state,'inputFocused': false});
              console.log('******************', this.state.inputFocused);
            }}
            style={{...this.getDefaultStyle('callcont')}}>
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
