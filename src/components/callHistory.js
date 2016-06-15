import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import CallHistoryItem from './callHistoryItem';
import CallHistoryService from '../js/callHistoryService';
import { UpArrowIconSVG, DownArrowIconSVG, RemoveIconSVG, BackArrowIconSVG } from './svgIcons';
import moment from 'moment';

const propTypes = {
  compStyle : React.PropTypes.object,
  history : React.PropTypes.array,
  cbClearHistory : React.PropTypes.func.isRequired,
  cbCall : React.PropTypes.func,
  cbBack: React.PropTypes.func.isRequired,
  callerId : React.PropTypes.string
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
        alignItems: "flex-start",
        borderRadius: '3px',
        justifyContent: 'flex-start',
        flexDirection: "column",
        minHeight: '375px',
        minWidth: '375px',
        maxWidth: "500px",
        maxHeight: '500px',
        overflowY: 'auto',
        overflowX: 'hidden',
        boxShadow: '0 16px 28px 0 rgba(0,0,0,.22),0 25px 55px 0 rgba(0,0,0,.21)',
        color: "#4a4a4a"
      },
      headerCont : {
        display: 'block',
        //flex: '1 100%',
        //width: '100%', // this is a bad bad no no
        //flex: 'auto',
        minWidth: '375px' // i'm not sure if this is ok...
        //justifyContent: 'stretch'
      },
      header: {
        display: 'flex',
        //flex: 1,
        //minWidth: '375px',
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
      minHeight: '375px',
      minWidth: '375px',
      maxWidth: "500px",
      maxHeight: '500px',
      overflowY: 'auto',
      overflowX: 'hidden'
    },
      details: {
        display: 'flex',
        alignItems: 'center',
        color: '#ccc',
        fontSize: '12px'
      },
      noCallDetails: {
        display: 'flex',
        height: '100px',
        width: '100%',
        alignItems: 'center',
        color: '#ccc',
        backgroundColor: '#f00'
      }
     };

    return (styles[styleName]);
  }


  render(){

    const self = this; // so I can use inside of map
    let details; // declaring details variable
    if(this.props.history.length > 0){ // if history array is greater than zero
      if(this.state.callDetailDisplayed) {
        const detailData = CallHistoryService.getInstance().getHistoryDetail(this.callerId);
        details = detailData.map(function(i, key){
          let renderedDirection;
          if(i.direction == 'outgoing') {
            renderedDirection = (
              <span className="outgoing" >
                <UpArrowIconSVG svgStyle={{fill: '#009688', width: '24px', height: '24px'}}/>
              </span>);
          } else {
            renderedDirection = ( // if 'incoming' it renders a down arrow svg
              <span className="incoming">
                <DownArrowIconSVG svgStyle={{fill: '#009688', width: '24px', height: '24px'}} />
              </span>);
          }

          const formattedTimestamp = moment(i.timestamp).format('ddd MMM DD YYYY HH:mm:ss A');

          return (
            <div
                className="details"
                key={key}
                style={{...self.getDefaultStyle('details')}}
            >
              {renderedDirection}
              {formattedTimestamp}
            </div>
          );
      });
    } else {
        details = (<div
              className="noCallDetails"
              style={{...self.getDefaultStyle('noCallDetails')}}
          >
            <div>
              No calls to show.
            </div>
        </div>
      );
    }
  }

    // regular state list items renders an arrow svg, ext, number of calls, timestamp, and a menu svg
    const listitems = this.props.history.map((i, index)=>{
      return(
        <CallHistoryItem
            key={index}
            data={i}
            cbClick={()=>{
              this.props.cbCall(i.callerId);
            }}
            cbShowCalls={()=>{
              this.callerId = i.callerId;
              this.setState({...this.state, 'callDetailDisplayed' : true});
            }}
        />);
    });

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
              <span
                  className="rmvHistory"
                  style={{...this.getDefaultStyle('rmvHistory')}}
                  onClick={this.props.cbClearHistory}
                  tabIndex="0"
              >
                  Remove History
              </span>
          </div>
        </div>
        <div
            className="body"
            tabIndex="0"
            style={{...this.getDefaultStyle('body')}}
        >
          <div>
            {details}
          </div>
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
                  Call History
              </span>
              <span
                  className="rmvHistory"
                  style={{...this.getDefaultStyle('rmvHistory')}}
                  onClick={this.props.cbClearHistory}
                  tabIndex="0"
              >
                  Remove History
              </span>
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

CallHistory.propTypes = propTypes;
export default CallHistory;
