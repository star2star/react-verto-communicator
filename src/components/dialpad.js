import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import Numberpad from './numberpad';
import { CallHistoryIconSVG, PhoneIconSVG, RemoveIconSVG, DeleteIconSVG } from './svgIcons';
import Radium  from 'radium';
import CallHistory from './callHistory';
import CallHistoryService from '../js/callHistoryService';
import { FormattedMessage, injectIntl } from 'react-intl';
import {TransitionMotion, spring} from 'react-motion';

const propTypes = {
  compStyle : React.PropTypes.object,
  cbCall: React.PropTypes.func.isRequired,
  nbrToDial: React.PropTypes.string,
  lastNumber : React.PropTypes.string
};

class Dialpad extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {items: [], number: this.props.nbrToDial, inputFocused: false, lcDisplayed: false, showingCallHistory: false };

  }

  componentDidMount() {
    this.showDialpad();
  }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      cont: {
        display: 'block',
        height: '500px',
        overflow: 'hidden',
        boxShadow: '0 16px 28px 0 rgba(0,0,0,.22),0 25px 55px 0 rgba(0,0,0,.21)'
      },
      callh: {
        display: 'flex' //this.state.showingCallHistory ? 'flex' : 'none'
      },
      dpad: {

        display: this.state.showingCallHistory ? 'none' : 'flex',
        flexDirection: "column",
        height: this.state.showingCallHistory ? '0px': '100%',
        width: '25vw',
        //minWidth: '479px',
        // '@media (max-width: 1280px)': {
        //   width: '50vw'
        // },
        // '@media (max-width: 768px)': {
        //   width: '80vw'
        // }

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
        fontSize: '1em',
        //fontSize: '25px',
        '@media (max-width: 768px)': {
          fontSize: '1em'
        }
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

  willLeave() {
    //triggered when c's gone. Keeping c until its width/height reach 0.
    //console.log('will Leave', arguments[0]);
    return {width: spring(0) };
  }
  willEnter(){
    //console.log('-----willEnter: ',arguments[0]);
    return {width: 0 };
  }
  removeItem(control){
    var x = { ...this.state };
    //console.log('RRRRR', this.state );
    x.items = x.items.filter((i)=>i.key != control  )

    this.setState( x);
  }

  showDialpad() {
    //console.log('in showDialpad method');
    var x = { ...this.state };
    x.items.push({key: "dp", size: spring(375) });
    this.setState(x);
  }

  showCallHistory() {
    //console.log('cccccaaallll history showing ')
    var x = { ...this.state };
    x.items.push({key: "ch", size: spring(375) });
    //console.log('xxxxxx', x);
    this.setState(x);
  }

  makeCall(){
    //console.log('***********',this.state.number);
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

    const { formatMessage } = this.props.intl;

    var nStyles = this.state.items.map(item => {
      //console.log(item);
      var x = {
        key: item.key,
        style: {width: item.size },
      };
      //console.log(item, x);
      return (x);
    });

    //console.log('NNNN:', nStyles);
    //const displayObject = this.state.showCallHistory ? callhistory : dialpad ;


    //console.log(this.state, displayObject);
    //const displayObject = this.state.items[0].key == "ch" ? callhistory : dialpad;

       return (
         <TransitionMotion
             styles={nStyles}
             willLeave={this.willLeave.bind(this)}
             willEnter={this.willEnter.bind(this)}
         >
          {interpolatedStyles =>{
              return (<span>
                {interpolatedStyles.map(config => {
                if (this.state.showingCallHistory){
                  //console.log('CH  CCCCC: ', config.style.width);
                  const d = config.style.width < 50 ? 'none': 'flex';
                  return (
                    <div
                      style={{...this.getDefaultStyle('cont'), ...config.style, display: d }}
                    >
                    <CallHistory
                      compStyle={{...this.getDefaultStyle('callh')}}
                      history={CallHistoryService.getInstance().getHistory()}
                      cbClearHistory={()=>{
                        this.props.cbClearHistory();
                        setTimeout(()=>this.setState({...this.state, showingCallHistory: false}), 0);
                        setTimeout(()=> this.removeItem('ch'), 0);
                        setTimeout(()=>this.showDialpad(),300 )
                      }}
                      cbCall={(num)=>{
                        //console.log('**********', num);
                        this.setState({...this.state, showingCallHistory: !this.state.showingCallHistory, number : num});
                        setTimeout(()=>this.makeCall(),0);

                      }}
                      cbBack={()=>{
                        //this.showDialpad();
                        this.setState({ ...this.state, showingCallHistory: !this.state.showingCallHistory});
                        setTimeout(()=> this.removeItem('ch'), 0);
                        setTimeout(()=>this.showDialpad(),300 )
                  }}
                  />
                  </div>
                );
                } else {
                  //console.log('DP  CCCCC: ', config);
                  const d1 = config.style.width < 55 ? 'none': 'flex';
                  return (
                    <div
                      style={{...this.getDefaultStyle('cont'), ...config.style, display: d1 }}
                    >
                    <div
                      style={{...this.getDefaultStyle('dpad'), ...config.style }}
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
                            this.setState({ ...this.state, showingCallHistory: true});
                            setTimeout(()=> this.removeItem('dp'), 0);
                            setTimeout(()=>this.showCallHistory(),300)
                          }}
                      >
                        <CallHistoryIconSVG
                            svgStyle={{...this.getDefaultStyle('callhist')}}
                        />
                      </span>
                      <input
                          className="input"
                          placeholder={formatMessage({"id":"ENTER_EXTENSION", "defaultMessage":"Enter a number"})}
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
                          className="back"
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
                          className="dial"
                          onClick={this.makeCall.bind(this)}
                          style={{...this.getDefaultStyle('callbg')}} >
                        <PhoneIconSVG
                            svgStyle={{...this.getDefaultStyle('call')}}
                            //svgTransform={{rotate(15)}}
                        />
                      </div>
                    </div>
                  </div>
                </div>);
                }
              })}
            </span>);
          }}
      </TransitionMotion>
      );
    }
  }

Dialpad.propTypes = propTypes;

export default injectIntl(Radium(Dialpad));
