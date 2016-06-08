import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import Numberpad from './numberpad';
import { CallHistoryIconSVG, PhoneIconSVG, RemoveIconSVG, DeleteIconSVG } from './svgIcons';
import Radium from 'radium';

const propTypes = {
  compStyle : React.PropTypes.object,
  cbCall: React.PropTypes.func.isRequired,
  nbrToDial: React.PropTypes.string,
  lastNumber : React.PropTypes.string
};

class Dialpad extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {number: this.props.nbrToDial, inputFocused: false, lcDisplayed: false};
  }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      container: {
        display: 'flex',
        flex: 1,
        alignItems: "center",
        justifyContent: 'flex-start',
        flexDirection: "column",
        maxWidth: "500px",
        '@media (max-width: 768px)': {
          //width: '90vw'
        },
        boxShadow: '0 16px 28px 0 rgba(0,0,0,.22),0 25px 55px 0 rgba(0,0,0,.21)'
      },
      header: {
        display: 'flex',
        flex: 10,
        alignItems: 'center',
        alignContent: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: '#eee',
        padding: '15px',
        borderBottom: '2px solid #ccc'
      },
      span : {
        flex: 1
      },
      callhist : {
        width: "24px", // this is for svg styling
        height: "24px",
        fill: "green"
      },
      input: {
        display: 'flex',
        backgroundColor: this.state.inputFocused ? '#eee' : 'transparent',
        color: '#4a4a4a',
        height: '75px',
        //padding: '0px 25px 0px 25px',
        border: 'none',
        outline: 'none',
        fontSize: '40px', //!this.state.number ? '1vw' : '1.5vw',
        '@media (max-width: 768px)': {
          fontSize: '1em'
        }
      },
      back : {
        width: "24px", // this is for svg styling
        height: "24px",
        fill: "#ccc",
        cursor: 'pointer'
      },
      bar: {
        flex: 10,
        zIndex: this.state.inputFocused ? 'auto' : '-1',
        position: 'relative',
        bottom: '2px',
        display: 'flex',
        justifyContent: 'space-between',
        content: '" "',
        height: '2px',
        borderWidth: '2px',
        borderColor: '#ccc',
        width: '100%',
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
      callcont: {
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
        width: "24px", // this is for svg styles
        height: "24px",
        fill: "#fff"
        }
    };

    return (styles[styleName]);
  }

  makeCall(){
    if(this.state.number) {
      // makes a call if there is a number entered.
      this.props.cbCall(this.state.number);
    } else {
      // if there is NOT a number it gets the last number dialed.
      this.setState({...this.state, number: this.props.lastNumber, redialing: true });
      // setTimeout(()=>{
      //   this.setState({...this.state, redialing: false});
      // }, 5000);
    }
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
      <div
            style={{...this.getDefaultStyle('container')}}
            onKeyPress={(e)=>{
              if(e.which == 13 || e.keyCode == 13) {
                this.makeCall();
                return false;
              }}}
          >
        <div
          style={{...this.getDefaultStyle('header')}}
        >
          <span
              style={{...this.getStyle('span')}}
              onClick={()=>{}}
          >
            <CallHistoryIconSVG
              svgStyle={{...this.getDefaultStyle('callhist')}}
            />
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
          <DeleteIconSVG svgStyle={{...this.getDefaultStyle('back')}}
          />
          </span>
        </div>
        <div
            style={{...this.getStyle('bar')}}
        >
          <span
              className="left"
              style={{...this.getStyle('left')}}
          >
              &nbsp;
          </span>
          <span
              className="right"
              style={{...this.getStyle('right')}}
          >
            &nbsp;
          </span>
        </div>
        <Numberpad cbClick={this.dialNumber.bind(this)} />
        <div
            onFocus={()=>{
              this.setState({...this.state,'inputFocused': false});
            }}
            style={{...this.getDefaultStyle('callcont')}}>
          <div
              onClick={this.makeCall.bind(this)}
              style={{...this.getDefaultStyle('callbg')}} >
            <PhoneIconSVG
                svgStyle={{...this.getDefaultStyle('call')}}
                //svgTransform={{rotate(15)}}
            />
          </div>
        </div>
      </div>);
  }
}

Dialpad.propTypes = propTypes;

export default Radium(Dialpad);
