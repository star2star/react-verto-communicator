import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import CallHistoryItem from './callHistoryItem';
import CallHistoryService from '../js/callHistoryService';
import { UpArrowIconSVG, DownArrowIconSVG, RemoveIconSVG, BackArrowIconSVG } from './svgIcons';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import Radium  from 'radium';
import {TransitionMotion, Motion, spring} from 'react-motion';

const propTypes = {
  compStyle : React.PropTypes.object,
  history : React.PropTypes.array,
  cbClick : React.PropTypes.func,
  cbShowCalls : React.PropTypes.func,
  cbClearHistory : React.PropTypes.func.isRequired,
  cbCall : React.PropTypes.func,
  allowToolTip : React.PropTypes.bool,
  cbBack: React.PropTypes.func.isRequired,
  callerId : React.PropTypes.string
};

const defaultProps = {
  allowToolTip : false
};

const springSettings = {stiffness: 170, damping: 26};

class HistoryItems extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {};

    this.generateHistory = this.generateHistory.bind(this);
  }

  getCompStyle() {
    return this.props.compStyle;
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


  generateHistory(config) {
    let listitems;
    //const d1 = config.style.width < 250 ? 'none': 'block';
    if(this.props.history.length > 1){
    listitems = this.props.history.map((i)=>{
        return(
            <CallHistoryItem
                allowToolTip = {this.props.allowToolTip}
                className="chi"
                data={i}
                cbClick={()=>{
                  this.props.cbCall(i.callerId);
                }}
                cbShowCalls ={this.props.cbShowCalls}
            />
        );
      });
    } else {
      listitems = (
        <div
            className="noCalls"
            style={{...this.getDefaultStyle('noCallDetails'), ...config}}
        >
            <span>
              No calls to show.
            </span>
        </div>
      );
    }
    //console.log('listitems: ', listitems);
    return listitems;
  }



  render(){
    let clearHistory;
      if(this.props.history.length > 0) {
        clearHistory = (
          <span
              className="rmvHistory"
              style={{...this.getDefaultStyle('rmvHistory')}}
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
            className="headerCont"
            style={{...this.getDefaultStyle('headerCont')}}
        >
          <div
              className="header"
              style={{...this.getDefaultStyle('header')}}
          >
              <span
                  onClick={this.props.cbBack}
                  tabIndex="0"
              >
                  <RemoveIconSVG svgStyle={{...this.getDefaultStyle('headerSvgs')}} />
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
  }

  getCompStyle() {
    return this.props.compStyle;
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
    console.log('details callerId',this.props.callerId);
    const self = this;
    let details;
    const detailData = CallHistoryService.getInstance().getHistoryDetail(this.props.callerId);
    //console.log('detailData',detailData); // empty array onload
    details = detailData.length ? (
      detailData.map(function(i){
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
      //const d1 = config.style.width < 150 ? 'none': 'block';
      return (
            <div
                className="details"
                onClick={()=>{
                  self.props.cbCall(i.callerId);
                }}
                style={{...self.getDefaultStyle('details')}}
            >
              {renderedDirection}
              {formattedTimestamp}
            </div>
      );
    })
  ) : null;

    //console.log('Details:', details);
    return details;
  }

  render(){
    return (
      <div>
        <div
              className="headerCont"
              style={{...this.getDefaultStyle('headerCont')}}
          >
            <div
                className="header"
                style={{...this.getDefaultStyle('header')}}
            >
                <span
                    onClick={this.props.cbBack}
                    tabIndex="0"
                >
                    <RemoveIconSVG svgStyle={{...this.getDefaultStyle('headerSvgs')}} />
                </span>
                <span
                    className="title"
                    style={{...this.getDefaultStyle('title')}}
                >
                  {this.callerId}
                </span>
            </div>
          </div>
          <div
              className="body"
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
    this.state = { item: [[375,400], [375,400]], currItem: 0, callDetailDisplayed : false, callItem: ''};

    this.clickHandler = this.clickHandler.bind(this);
}

  clickHandler() {
    console.log('clickHandler clicked');
    if(this.state.currItem == 0) {
      this.setState({...this.state, currItem : 1 });
      console.log('setting state currItem 1');
    } else {
      this.setState({...this.state, currItem: 0 });
      console.log('setting state currItem 0');

    }
  }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      container: {
        display: 'flex',
        position: 'relative',
        flex: 1,
        alignItems: 'flex-start',
        alignContent: 'stretch',
        borderRadius: '3px',
        justifyContent: 'flex-start',
        flexDirection: "column",
        height: '500px',
        minWidth: '225px', // allows animation to go in/out further without clashing 'Call History' and 'Clear History'
        overflowY: 'auto',
        overflowX: 'hidden',
        boxShadow: '0 16px 28px 0 rgba(0,0,0,.22),0 25px 55px 0 rgba(0,0,0,.21)',
        color: "#4a4a4a"
      }
     };

    return (styles[styleName]);
  }

  generateContent() {
    var historyItems = (
      <HistoryItems
          history={this.props.history}
          cbClick={this.clickHandler}
          cbBack={this.props.cbBack}
          cbShowCalls={(num)=>{
            console.log('num',num);
            this.setState({...this.state, currItem : 1, callItem: num});
            //this.clickHandler();
          }}
          cbClearHistory={this.props.cbClearHistory}
          cbCall={this.props.cbCall}
      />
    );

    var detailItems = (
      <DetailItems
          cbBack={()=>{
            this.clickHandler();
            //this.setState({...this.state, currItem : 0});
          }}
          callerId={this.state.callItem}
      />
    );

    var renderedComponent = [historyItems, detailItems];
    //console.log('comp[i]:', i, comp[i]);

    if(this.state.currItem == 0) {
      return renderedComponent[0];
    } else {
      return renderedComponent[1];
    }
  }

  render(){

    // animation hell
    const {item, currItem} = this.state;
    //console.log('this.state.item + this.state.currItem', item, currItem);
    const [currWidth, currHeight] = item[currItem];
    //console.log('currWidth + currHeight',currWidth, currHeight);

    const widths = item.map(([origW, origH])=> currHeight / origH * origW);
    //console.log('widths',widths);

    const leftStartCoords = widths
      .slice(0, currItem)
      .reduce((sum,width) => sum-width, 0);
    //console.log('Left Start Coords',leftStartCoords);

    let configs = [];
    item.reduce((prevLeft, [origW, origH], i) => {
      configs.push({
        left: spring(prevLeft, springSettings),
        height: spring(currHeight, springSettings),
        width: spring(widths[i], springSettings)
      });
      return prevLeft + widths[i];
    }, leftStartCoords);
    //console.log('configs array',configs);

    return (
      <div
          className="container"
          style={this.getStyle('container')}
      >
        {this.generateContent()}
      </div>
    );
  }

}

CallHistory.defaultProps = defaultProps;
CallHistory.propTypes = propTypes;
export default CallHistory;
