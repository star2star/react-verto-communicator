import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import CallHistoryItem from './callHistoryItem';
import CallHistoryService from '../js/callHistoryService';
import { UpArrowIconSVG, DownArrowIconSVG, RemoveIconSVG, BackArrowIconSVG } from './svgIcons';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import Radium  from 'radium';

const propTypes = {
  compStyle : React.PropTypes.object,
  history : React.PropTypes.array,
  cbClearHistory : React.PropTypes.func.isRequired,
  cbCall : React.PropTypes.func,
  allowToolTip : React.PropTypes.bool,
  cbBack: React.PropTypes.func.isRequired,
  callerId : React.PropTypes.string
};

const defaultProps = {
  allowToolTip : false
};

class CallHistory extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = { callDetailDisplayed : false, callItem: ''};

}

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      container: {
        display: 'flex',
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
      },
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
    } else {
      clearHistory = (<span></span>);
    }

    const self = this; // so I can use inside of map
    let details; // declaring details variable
    if(this.props.history.length > 0){ // if history array is greater than zero
      if(this.state.callDetailDisplayed) { // detail state is true
        const detailData = CallHistoryService.getInstance().getHistoryDetail(this.callerId);
        details = detailData.map(function(i, key){ // mapping over detailData and assigning it to details
          let renderedDirection; // svg fun
          if(i.direction == 'outgoing') { // if 'outgoing' it renders an up arrow svg
            renderedDirection = (
              <span className="outgoing" >
                <UpArrowIconSVG svgStyle={{...self.getDefaultStyle('dir')}}/>
              </span>);
          } else {
            renderedDirection = ( // if 'incoming' it renders a down arrow svg
              <span className="incoming">
                <DownArrowIconSVG svgStyle={{...self.getDefaultStyle('dir')}} />
              </span>);
          }

          const formattedTimestamp = moment(i.timestamp).format('ddd MMM DD YYYY HH:mm:ss A');

          return ( //after all that it returns a simple div with the correlating svg and formatted timestamp
            <div
                className="details"
                key={key}
                onClick={()=>{
                  self.props.cbCall(i.callerId);
                }}
                style={{...self.getDefaultStyle('details')}}
            >
              {renderedDirection}
              {formattedTimestamp}
            </div>
          );
      }); // end of map function
    }} else {
        details = (<div
              className="noCallDetails"
              style={{...self.getDefaultStyle('noCallDetails')}}
          >
            <span>
              No calls to show.
            </span>
        </div>
      );
    }


    // regular state list items renders an arrow svg, ext, number of calls, timestamp, and a menu svg
    let listitems;
    if(this.props.history.length > 0){
    listitems = this.props.history.map((i, index)=>{
        return(
          <CallHistoryItem
              allowToolTip = {this.props.allowToolTip}
              className="chi"
              key={index}
              data={i}
              cbClick={()=>{
                this.props.cbCall(i.callerId);
              }}
              cbShowCalls={()=>{
                this.callerId = i.callerId;
                this.setState({...this.state, 'callDetailDisplayed' : true});
              }}
          />
        );
      });
    } else {
      listitems = (
        <div
            className="noCalls"
            style={{...self.getDefaultStyle('noCallDetails')}}
        >
            <span>
              No calls to show.
            </span>
        </div>
      );
    }

    // callDetail state area (the whole container)
    const callDetailState = (
      <div
          className="container"
          style={this.getStyle('container')}
      >
      <div
          className="headerCont"
          style={{...this.getDefaultStyle('headerCont')}}
      >
          <div
              className="header"
              style={{...this.getDefaultStyle('header')}}
          >
              <span
                  onClick={()=>{
                    this.setState({...this.state, 'callDetailDisplayed': false});
                  }}
              >
                  <BackArrowIconSVG svgStyle={{...this.getDefaultStyle('headerSvgs')}} />
              </span>
              {this.callerId}
          </div>
        </div>
        <div
            className="detailBody"
            tabIndex="0"
            style={{...this.getDefaultStyle('body')}}
        >
            {details}

        </div>
      </div>
    );

    // default state (whole container)
    const defaultState = (
      <div
          className="container"
          style={this.getStyle('container')}
      >
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
          {listitems}
        </div>
      </div>);

      const renderedState = this.state.callDetailDisplayed ? callDetailState : defaultState ;

    return (renderedState);
  }

}

CallHistory.defaultProps = defaultProps;
CallHistory.propTypes = propTypes;
export default Radium(CallHistory);
