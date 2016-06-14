import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import CallHistoryItem from './callHistoryItem';
import CallHistoryService from '../js/callHistoryService';
import { UpArrowIconSVG, DownArrowIconSVG } from './svgIcons';
import moment from 'moment';

const propTypes = {
  compStyle : React.PropTypes.object,
  history: React.PropTypes.array,
  cbBack: React.PropTypes.func.isRequired
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
        minWidth: '375px',
        maxWidth: "500px",
        boxShadow: '0 16px 28px 0 rgba(0,0,0,.22),0 25px 55px 0 rgba(0,0,0,.21)',
        color: "#4a4a4a"
      },
      header: {
        display: 'flex',
        width: '100%',
        borderTopLeftRadius: '3px',
        borderTopRightRadius: '3px',
        alignItems: 'center',
        justifyContent: 'stretch',
        fontWeight: 300,
        height: '40px',
        backgroundColor: '#eee'
      },
      details: {
        display: 'flex',
        alignItems: 'center',
        color: '#ccc',
        fontSize: '12px'
      }
     };

    return (styles[styleName]);
  }


  getCallerId(callerId){
    return callerId;
  }

  render(){

    const self = this; // Because 'this' inside of function does not work.
    let details; // declaring 'details' outside of function so it can be recognized elsewhere
    if(this.state.callDetailDisplayed) { // if the state of callDetailDisplayed is true
    var callerId = this.getCallerId(); // callerId is equal to the return value of method
    //console.log(callerId); // fakeout!....it's undefined.
    const detailData = CallHistoryService.getInstance().getHistoryDetail(callerId); // this is the service method that returns a list of all my doodads. It has an argument of callerId which is currently undefined....
    details = detailData.map(function(i, key){ // mapping over doodads and assigning it to 'details' because details is a bad boss and everyone recognizes it
      let renderedDirection; // declaring 'renderedDirection' variable which will store svgs based on the value of the direction property.
      if(i.direction == 'outgoing') { // if 'outgoing' it renders an up arrow svg
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

      const formattedTimestamp = moment(i.timestamp).format('ddd MMM DD YYYY HH:mm:ss A'); // fancy formatted message courtesy of moment.js

      return ( // end result is a simple div with the resulting direction svg and formatted timestamp.
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
  }

    // regular state list items renders an arrow svg, ext, number of calls, timestamp, and a menu svg
    const listitems = this.props.history.map((i, index)=>{
      return(
        <CallHistoryItem key={index} data={i} cbShowCalls={()=>{
          this.getCallerId(i.callerId);
          //this.setState({...this.state, 'callItem': i.callId});
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
            className="header"
            style={{...this.getDefaultStyle('header')}}
        >
            Call History
        </div>
        <div
            className="body"
            style={{...this.getDefaultStyle('body')}}
        >
          <div>
            {details}
          </div>
        </div>
        <div onClick={this.props.cbBack}>
          Back
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
            className="header"
            style={{...this.getDefaultStyle('header')}}
        >
            Call History
        </div>
        <div
          className="body"
          style={{...this.getDefaultStyle('body')}}
        >
          {listitems}
        </div>
        <div onClick={this.props.cbBack}>Back</div>
      </div>);

      const renderedState = this.state.callDetailDisplayed ? callDetailState : defaultState ;

    return (renderedState);
  }

}

CallHistory.propTypes = propTypes;
export default CallHistory;
