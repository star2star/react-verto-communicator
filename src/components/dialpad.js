import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import Numberpad from './numberpad';
import { CallHistoryIconSVG, PhoneIconSVG, DeleteIconSVG } from './svgIcons';
import Radium  from 'radium';
import CallHistory from './callHistory';
import CallHistoryService from '../js/callHistoryService';
import { injectIntl } from 'react-intl';
import {Motion, spring} from 'react-motion';

const propTypes = {
  compStyle : React.PropTypes.object,
  cbCall: React.PropTypes.func.isRequired,
  nbrToDial: React.PropTypes.string,
  lastNumber : React.PropTypes.string
};

const springSettings = {stiffness: 170, damping: 26};

class Dialpad extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {items: [[375,500],[375,500]], currItem: 0, number: this.props.nbrToDial, makingCall: false, inputFocused: false, lcDisplayed: false };
    this.generateContent = this.generateContent.bind(this);
    this.dialNumber = this.dialNumber.bind(this);
    this.makeCall = this.makeCall.bind(this);
    this.changingNumber = this.changingNumber.bind(this);
  }



  getDefaultStyle(styleName) {
    //console.log('>>>>>>>>>',this.state.makingCall);
    const styles = {
        container: {
          display:  'flex',
          position: 'relative',
          flex: 1,
          alignItems: 'flex-start',
          alignContent: 'stretch',
          borderRadius: '3px',
          justifyContent: 'flex-start',
          flexDirection: "column",
          height: '500px',
          minWidth: '225px', // allows animation to go in/out further without clashing 'Call History' and 'Clear History'
          overflowY: 'hidden',
          overflowX: 'hidden',
          boxShadow: '0 16px 28px 0 rgba(0,0,0,.22),0 25px 55px 0 rgba(0,0,0,.21)',
          color: "#4a4a4a"
        },
      cont: {
        display: 'flex',
        flexDirection: 'row',
        height: '500px',
        overflow: 'hidden'
      },
      callh: {
        display: 'flex'
      },
      dpad: {

        display: this.state.showingCallHistory ? 'none' : 'flex',
        flexDirection: "column",
        height: this.state.showingCallHistory ? '0px': '100%',
        width: '100%'
      },
      header: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: '#eee',
        padding: '15px',
        borderBottom: '2px solid #ccc'
      },
      span : {
        cursor: 'pointer'
      },
      callhist : {
        width: "24px",
        height: "24px",
        fill: "green",
        marginRight: "10px"
      },
      input: {
        display: 'flex',
        backgroundColor: this.state.inputFocused ? '#eee' : 'transparent',
        color: '#4a4a4a',
        height: '75px',
        fontWeight: '300',
        border: 'none',
        outline: 'none',
        fontSize: '1em'
      },
      back : {
        width: "24px",
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
        width: '100%'
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
        paddingBottom: '15px',
        display: 'flex',
        justifyContent: 'center'
      },
      callbg: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: this.state.makingCall ? 'rotate(360deg)' : 'rotate(235deg)',
        backgroundColor: this.state.makingCall ? '#f00': '#4caf50',
        transition : 'background-color .8s ease, transform .8s',
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
    if(this.state.number) {
      // makes a call if there is a number entered.
      setTimeout(()=>this.props.cbCall(this.state.number),850);
      this.setState({...this.state, makingCall: true });
    } else {
      // if there is NOT a number it gets the last number dialed.
      this.setState({...this.state, number: this.props.lastNumber, redialing: true });

    }
  }

  changingNumber(e){
    //TODO convert letter to numeric
    this.setState({ ...this.state, number: e.target.value });
  }

  dialNumber(k) {
    this.setState({ ...this.state, number: this.state.number + k });
  }

  generateContent(style, i){
    var callHistory = (
      <span style={{...style, position: 'absolute'}}>
        <div
            style={{...this.getDefaultStyle('cont') }}
        >
          <CallHistory
              allowToolTip
              compStyle={{...this.getDefaultStyle('callh')}}
              history={CallHistoryService.getInstance().getHistory()}
              cbClearHistory={()=>{
                //setTimeout()
                setTimeout(()=>this.props.cbClearHistory(), 1000);
                this.setState({...this.state, currItem: 0});
              }}
              cbCall={(num)=>{
                this.setState({...this.state, currItem: 0, number : num});
              }}
              cbBack={()=>{
                this.setState({ ...this.state, currItem: 0});
              }}
          />
      </div>
    </span>
    );
    var dialpad = (
        <span style={{...style, position: 'absolute'}}>
          <div
              style={{...this.getDefaultStyle('cont') }}
          >
          <div
              style={{...this.getDefaultStyle('dpad') }}
              onKeyPress={(e)=>{
                if(e.which == 13 || e.keyCode == 13) {
                  this.makeCall();
                  return false;
                }}}
          >
          <div
              className="header"
              style={{...this.getDefaultStyle('header')}}
          >
            <span
                className="callhist"
                style={{...this.getStyle('span')}}
                onClick={()=>{
                  this.setState({ ...this.state, currItem: 1});
                }}
            >
              <CallHistoryIconSVG
                  svgStyle={{...this.getDefaultStyle('callhist')}}
              />
            </span>
            <input
                className="input"
                placeholder={this.props.intl.formatMessage({"id":"ENTER_EXTENSION", "defaultMessage":"Enter a number"})}
                style={{...this.getDefaultStyle('input')}}
                value={this.state.number}
                onChange={this.changingNumber}
                onFocus={()=>{
                  this.setState({...this.state,'inputFocused': true});
                }}
                onBlur={()=>{
                  this.setState({...this.state,'inputFocused': false});
                }}
            />
            <span
                className="back"
                style={{...this.getStyle('span')}}
                onClick={()=>{
                  const number = this.state.number;
                  const newNumber = number.slice(0, number.length - 1);
                  this.setState({...this.state,'number': newNumber });
                }}
            >
                <DeleteIconSVG svgStyle={{...this.getDefaultStyle('back')}} />
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
          <Numberpad cbClick={this.dialNumber} />
          <div
              onFocus={()=>{
                this.setState({...this.state,'inputFocused': false});
              }}
              style={{...this.getDefaultStyle('callcont')}}
          >
            <div
                className="dial"
                onClick={()=>{
                  this.makeCall();
                }}
                style={{...this.getDefaultStyle('callbg')}}
            >
              <PhoneIconSVG
                  svgStyle={{...this.getDefaultStyle('call')}}

              />
            </div>
          </div>
        </div>
      </div>
    </span>
  );

    var renderedComponents = [dialpad, callHistory];

    return renderedComponents[i];
  }

  render() {

    // Sliding Animation Styles
    const {items, currItem} = this.state;
    const [currWidth, currHeight] = items[currItem];
    const widths = items.map(([origW, origH])=> currHeight / origH * origW);
    const leftStartCoords = widths
      .slice(0, currItem)
      .reduce((sum,width) => sum - width, 0);

    let configs = [];
    items.reduce((prevLeft, [origW, origH], i) => {
      configs.push({
        left: spring(prevLeft, springSettings),
        height: spring(currHeight, springSettings),
        width: spring(widths[i], springSettings)
      });
      return prevLeft + widths[i];
    }, leftStartCoords);

       return (
         <div
             className="container"
             style={this.getStyle('container')}
         >
            <Motion style={{height: spring(currHeight), width: spring(currWidth)}}>
              {container =>
                <div style={container}>
                  {configs.map((style,i) =>
                    <Motion key={i} style={style}>
                      {style =>
                        this.generateContent(style, i)
                      }
                    </Motion>
                  )}
                </div>
              }
            </Motion>
         </div>
      );
    }
  }

Dialpad.propTypes = propTypes;
export default injectIntl(Radium(Dialpad));
// reviewed 7/13/2016
