import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import Numberpad from './numberpad';
import { CallHistoryIconSVG, PhoneIconSVG, DeleteIconSVG } from './svgIcons';
import Radium  from 'radium';
import CallHistory from './callHistory';
import CallHistoryService from '../js/callHistoryService';
import { injectIntl } from 'react-intl';
import {Motion, spring} from 'react-motion';
import { fromJS } from "immutable";


const springSettings = {stiffness: 170, damping: 26};

class Dialpad extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {items: [[375,500],[375,500]], currItem: 0, number: this.props.nbrToDial, makingCall: false, inputFocused: false, lcDisplayed: false };
    this.generateContent = this.generateContent.bind(this);
    this.dialNumber = this.dialNumber.bind(this);
    this.makeCall = this.makeCall.bind(this);
    this.changingNumber = this.changingNumber.bind(this);
    this.setCurrItemStateClearHistory = this.setCurrItemStateClearHistory.bind(this);
    this.setNumberCurrItemState = this.setNumberCurrItemState.bind(this);
    this.setCurrItemStateZero = this.setCurrItemStateZero.bind(this);
    this.makeCallKeyPress = this.makeCallKeyPress.bind(this);
    this.setCurrItemStateOne = this.setCurrItemStateOne.bind(this);
    this.setInputFocusedTrue = this.setInputFocusedTrue.bind(this);
    this.setInputFocusedFalse = this.setInputFocusedFalse.bind(this);
    this.setStateNumber = this.setStateNumber.bind(this);
  }

  static propTypes = {
    compStyle : React.PropTypes.object,
    cbCall: React.PropTypes.func,
    nbrToDial: React.PropTypes.string,
    lastNumber : React.PropTypes.string
  };

  static defaultProps = {
    cbCall: ()=>{}
  };

  static filename = "dialpad";
  static displayName = "Dialpad";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
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

        //display: this.state.showingCallHistory ? 'none' : 'flex',
        flexDirection: "column",
        //height: this.state.showingCallHistory ? '0px': '100%',
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
    let myReturnComp;
    if(i==1){
      //console.log('>>>>>>>', style.left, style.width);
      let callHistoryDisplayStyle = 'none'
      if(style.left < style.width){
        callHistoryDisplayStyle = 'flex';
      }
      myReturnComp = (
        <span style={{...style, position: 'absolute', display: callHistoryDisplayStyle}}>
          <div
              style={{...this.getStyle('cont') }}
          >
            <CallHistory
                allowToolTip
                compStyle={{...this.getStyle('callh')}}
                history={CallHistoryService.getInstance().getHistory()}
                cbClearHistory={this.setCurrItemStateClearHistory}
                cbCall={this.setNumberCurrItemState}
                cbBack={this.setCurrItemStateZero}
            />
        </div>
      </span>
      );
    }

    if (i==0){
      let dialPadDisplayStyle = 'block';
      //console.log('>>>>>>>', style.left, style.width);
      if(style.left*-1==style.width){
        dialPadDisplayStyle = 'none';
      }
      myReturnComp = (
          <span style={{...style, position: 'absolute', display: dialPadDisplayStyle}}>
            <div
                style={{...this.getStyle('cont') }}
            >
            <div
                style={{...this.getStyle('dpad') }}
                onKeyPress={this.makeCallKeyPress}
            >
            <div
                className="header"
                style={{...this.getStyle('header')}}
            >
              <span
                  className="callhist"
                  style={{...this.getStyle('span')}}
                  onClick={this.setCurrItemStateOne}
              >
                <CallHistoryIconSVG
                    svgStyle={{...this.getStyle('callhist')}}
                />
              </span>
              <input
                  className="input"
                  placeholder={this.props.intl.formatMessage({"id":"ENTER_EXTENSION", "defaultMessage":"Enter a number"})}
                  style={{...this.getStyle('input')}}
                  value={this.state.number}
                  onChange={this.changingNumber}
                  onFocus={this.setInputFocusedTrue}
                  onBlur={this.setInputFocusedFalse}
              />
              <span
                  className="back"
                  style={{...this.getStyle('span')}}
                  onClick={this.setStateNumber}
              >
                  <DeleteIconSVG svgStyle={{...this.getStyle('back')}} />
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
                onFocus={this.setInputFocusedFalse}
                style={{...this.getStyle('callcont')}}
            >
              <div
                  className="dial"
                  onClick={this.makeCall}
                  style={{...this.getStyle('callbg')}}
              >
                <PhoneIconSVG
                    svgStyle={{...this.getStyle('call')}}

                />
              </div>
            </div>
          </div>
        </div>
      </span>
    );

}


    return myReturnComp;
  }

  setCurrItemStateClearHistory(){
    //setTimeout()
    setTimeout(()=>this.props.cbClearHistory(), 1000);
    this.setState({...this.state, currItem: 0});
  }

  setNumberCurrItemState(num){
    this.setState({...this.state, currItem: 0, number : num});
  }

  setCurrItemStateZero(){
    this.setState({ ...this.state, currItem: 0});
  }

  makeCallKeyPress(e){
      if(e.which == 13 || e.keyCode == 13) {
        this.makeCall();
        return false;
      }
  }

  setCurrItemStateOne(){
      this.setState({ ...this.state, currItem: 1});
  }

  setInputFocusedTrue(){
      this.setState({...this.state,'inputFocused': true});
  }

  setInputFocusedFalse(){
      this.setState({...this.state,'inputFocused': false});
  }

  setStateNumber(){
      const number = this.state.number;
      const newNumber = number.slice(0, number.length - 1);
      this.setState({...this.state,'number': newNumber });
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

export default injectIntl(Radium(Dialpad));
// reviewed 7/13/2016
