import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import CallHistoryItem from './callHistoryItem';
import CallHistoryService from '../js/callHistoryService';
import { UpArrowIconSVG, DownArrowIconSVG, BackArrowIconSVG } from './svgIcons';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import {Motion, spring} from 'react-motion';
import { fromJS } from "immutable";


const springSettings = {stiffness: 170, damping: 26};

class HistoryItems extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {};

    this.generateHistory = this.generateHistory.bind(this);
    this.clearKeyPress = this.clearKeyPress.bind(this);
    this.backOnKeyPress = this.backOnKeyPress.bind(this);
  }

  static propTypes = {
    compStyle : React.PropTypes.object,
    history : React.PropTypes.array,
    cbClick : React.PropTypes.func,
    cbShowCalls : React.PropTypes.func,
    cbClearHistory : React.PropTypes.func,
    cbCall : React.PropTypes.func,
    allowToolTip : React.PropTypes.bool,
    cbBack : React.PropTypes.func,
    callerId : React.PropTypes.string
  };

  static defaultProps = {
    allowToolTip : false,
    cbBack : ()=>{},
    cbClearHistory : ()=>{}
  };

  static filename = "callHistory";
  static displayName = "HistoryItems";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  getDefaultStyle(styleName) {
    const styles = {
      headerCont: {
        width: '100%'
      },
      header: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        paddingLeft: '5px',
        paddingRight: '15px',
        justifyContent: 'stretch',
        borderTopLeftRadius: '3px',
        borderTopRightRadius: '3px',
        fontWeight: 300,
        height: '40px',
        backgroundColor: '#eee'
      },
      headerSvgs : {
        cursor: 'pointer',
        fill: "#4a4a4a",
        width: '24px',
        height: '24px'
      },
      rmvHistory : {
        marginLeft: 'auto',
        cursor: 'pointer'
      },
      body : {
        width: '100%',
        position: 'absolute',
        height: '500px',
        overflowY: 'auto',
        overflowX: 'hidden'
      },
      dir : {
        fill: '#009688',
        width: '24px',
        height: '24px'
      },
      details: {
        display: 'flex',
        minWidth: '375px',
        alignItems: 'center',
        cursor: 'pointer',
        color: '#ccc',
        fontSize: '12px'
      },
      noCallDetails: {
        display: 'flex',
        height: '100px',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 300,
        color: '#4a4a4a'
      }
      };
      return (styles[styleName]);
    }

  generateHistory() {
    let listitems;
    if(this.props.history.length >= 1){
    listitems = this.props.history.map((i, index)=>{
      const callHistoryOnClick = ()=>{
        this.props.cbCall(i.callerId);
      };

        return(
            <CallHistoryItem
                key={index}
                allowToolTip
                className="chi"
                data={i}
                cbClick={callHistoryOnClick}
                cbShowCalls ={this.props.cbShowCalls}
            />
        );
      });
    } else {
      listitems = (
        <div
            className="noCalls"
            style={{...this.getDefaultStyle('noCallDetails') }}
        >
            <span>
              No calls to show.
            </span>
        </div>
      );
    }
    return listitems;
  }

  clearKeyPress(e){
    if(e.which == 13 || e.keyCode == 13) {
      this.props.cbClearHistory();
      return false;
    }
  }

  backOnKeyPress(e){
    if(e.which == 13 || e.keyCode == 13) {
      this.props.cbBack();
      return false;
    }
  }

  render(){
    let clearHistory;
      if(this.props.history.length > 0) {
        clearHistory = (
          <span
              className="rmvHistory"
              style={{...this.getDefaultStyle('rmvHistory')}}
              onKeyPress={this.clearKeyPress}
              onClick={this.props.cbClearHistory}
              tabIndex="0"
          >
              <FormattedMessage
                  id="CLEAR_CALL_HISTORY"
              />
          </span>
        );
    }


    return (
      <div>
        <div
            className="headerCont-hist"
            style={{...this.getDefaultStyle('headerCont')}}
        >
          <div
              className="header-li"
              style={{...this.getDefaultStyle('header')}}
          >
              <span
                  className="back"
                  onKeyPress={this.backOnKeyPress}
                  onClick={this.props.cbBack}
                  tabIndex="0"
              >
                <BackArrowIconSVG svgStyle={{...this.getDefaultStyle('headerSvgs')}} />
              </span>
              <span
                  className="title"
                  style={{...this.getDefaultStyle('title')}}
              >
                <FormattedMessage
                    id="CALL_HISTORY"
                />
            </span>
            {clearHistory}
          </div>
        </div>
        <div
            className="body"
            tabIndex="0"
            style={{...this.getDefaultStyle('body')}}
        >
            {this.generateHistory()}
        </div>
      </div>
    );
  }
}

class DetailItems extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {};

    this.generateDetails = this.generateDetails.bind(this);
    this.headerBackKeyPress = this.headerBackKeyPress.bind(this);
  }

  static propTypes = {
    compStyle : React.PropTypes.object,
    history : React.PropTypes.array,
    cbClick : React.PropTypes.func,
    cbShowCalls : React.PropTypes.func,
    cbClearHistory : React.PropTypes.func,
    cbCall : React.PropTypes.func,
    allowToolTip : React.PropTypes.bool,
    cbBack : React.PropTypes.func,
    callerId : React.PropTypes.string
  };

  static defaultProps = {
    allowToolTip : false,
    cbBack : ()=>{},
    cbClearHistory : ()=>{}
  };

  static filename = "callHistory";
  static displayName = "DetailItems";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }


  getDefaultStyle(styleName) {
    const styles = {
      headerCont: {
        width: '100%'
      },
      header: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        paddingLeft: '5px',
        paddingRight: '15px',
        justifyContent: 'stretch',
        borderTopLeftRadius: '3px',
        borderTopRightRadius: '3px',
        fontWeight: 300,
        height: '40px',
        backgroundColor: '#eee'
      },
      headerSvgs : {
        cursor: 'pointer',
        fill: "#4a4a4a",
        width: '24px',
        height: '24px'
      },
      rmvHistory : {
        marginLeft: 'auto',
        cursor: 'pointer'
      },
      body : {
        width: '100%',
        position: 'absolute',
        maxHeight: '500px',
        overflowY: 'auto',
        overflowX: 'hidden'
      },
      dir : {
        fill: '#009688',
        width: '24px',
        height: '24px'
      },
      details: {
        display: 'flex',
        minWidth: '375px',
        alignItems: 'center',
        cursor: 'pointer',
        color: '#ccc',
        fontSize: '12px'
      },
      noCallDetails: {
        display: 'flex',
        height: '100px',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 300,
        color: '#4a4a4a'
      }
    };
    return (styles[styleName]);
  }

  generateDetails() {
    const self = this;
    let details;
    if(!this.props.callerId) {
      return;
    }
    const detailData = CallHistoryService.getInstance().getHistoryDetail(this.props.callerId);
    details = detailData.length ? (
      detailData.map(function(i, index){
      const detailsOnClick = ()=>{
          self.props.cbCall(i.callerId);
        }
      let renderedDirection;
      if(i.direction == 'outgoing') {
        renderedDirection = (
          <span className="outgoing" >
            <UpArrowIconSVG svgStyle={{...self.getDefaultStyle('dir')}} />
          </span>);
      } else {
        renderedDirection = (
          <span className="incoming">
            <DownArrowIconSVG svgStyle={{...self.getDefaultStyle('dir')}} />
          </span>);
      }

      const formattedTimestamp = moment(i.timestamp).format('ddd MMM DD YYYY HH:mm:ss A');
      return (
            <div
                key={index}
                className="details"
                onClick={detailsOnClick}
                style={{...self.getDefaultStyle('details') }}
            >
              {renderedDirection}
              {formattedTimestamp}
            </div>
      );
    })
  ) : null;

    return details;
  }

  headerBackKeyPress(e){
  if(e.which == 13 || e.keyCode == 13) {
    this.props.cbBack();
    return false;
  }}

  render(){
    return (
      <div>
        <div
            className="headerCont-deets"
            style={{...this.getDefaultStyle('headerCont')}}
        >
            <div
                className="header-de"
                style={{...this.getDefaultStyle('header')}}
            >
                <span
                    onKeyPress={this.headerBackKeyPress}
                    onClick={this.props.cbBack}
                    tabIndex="0"
                >
                    <BackArrowIconSVG svgStyle={{...this.getDefaultStyle('headerSvgs')}} />
                </span>
                <span
                    className="title-de"
                    style={{...this.getDefaultStyle('title')}}
                >
                  {this.props.callerId}
                </span>
            </div>
          </div>
          <div
              className="body-de"
              tabIndex="0"
              style={{...this.getDefaultStyle('body')}}
          >
              {this.generateDetails()}
          </div>
        </div>
    );
  }
}

class CallHistory extends VertoBaseComponent {
  constructor(props) {
      super(props);
      this.state = {
        item: [[375,375], [375,375]],
        currItem: 0,
        callItem: ''
      };

      this.clickHandler = this.clickHandler.bind(this);
      this.showCallSetState = this.showCallSetState.bind(this);
  }

  static propTypes = {
    compStyle : React.PropTypes.object,
    history : React.PropTypes.array,
    cbClick : React.PropTypes.func,
    cbShowCalls : React.PropTypes.func,
    cbClearHistory : React.PropTypes.func,
    cbCall : React.PropTypes.func,
    allowToolTip : React.PropTypes.bool,
    cbBack : React.PropTypes.func,
    callerId : React.PropTypes.string
  };

  static defaultProps = {
    allowToolTip : false,
    cbBack : ()=>{},
    cbClearHistory : ()=>{}
  };

  static filename = "callHistory";
  static displayName = "CallHistory";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  clickHandler() {
    if(this.state.currItem == 0) {
      this.setState({...this.state, currItem : 1 });
    } else {
      this.setState({...this.state, currItem: 0 });
    }
  }



  getDefaultStyle(styleName) {
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
      }
     };

    return (styles[styleName]);
  }

  showCallSetState(num){
    this.setState({...this.state, currItem : 1, callItem: num});
  }

  generateContent(style, i) {
    let myReturnComp;
    if (i==0){
      let callHistoryDisplayStyle = 'block';
      //console.log('>>><><>>>>>>', style.left);
      if(style.left*-1==style.width){
        callHistoryDisplayStyle = 'none';
      }
      myReturnComp = (
        <span
            style={{...style, position: 'absolute', display: callHistoryDisplayStyle}}
        >
        <HistoryItems
            key={i}
            history={this.props.history}
            cbClick={this.clickHandler}
            cbBack={this.props.cbBack}
            cbShowCalls={this.showCallSetState}
            cbClearHistory={this.props.cbClearHistory}
            cbCall={this.props.cbCall}
        />
        </span>
      );
    }
    if (i==1){
      let detailViewDisplayStyle = 'none';
      if(style.left < style.width){
        detailViewDisplayStyle = 'block';
      }
      myReturnComp = (
        <span
            style={{...style, position: 'absolute', display: detailViewDisplayStyle}}
        >
          <DetailItems
              key={i}
              cbBack={this.clickHandler}
              cbCall={this.props.cbCall}
              callerId={this.state.callItem}
          />
        </span>
      );
    }

    //var renderedComponent = [historyItems, detailItems];

    return myReturnComp;
  }

  render(){

    const {item, currItem} = this.state;
    const [currWidth, currHeight] = item[currItem];
    const widths = item.map(([origW, origH])=> currHeight / origH * origW);
    const leftStartCoords = widths
      .slice(0, currItem)
      .reduce((sum,width) => sum - width, 0);

    let configs = [];
    item.reduce((prevLeft, [origW, origH], i) => {
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

export default CallHistory;
// reviewed 7/13/2016
