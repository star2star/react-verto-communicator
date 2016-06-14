import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import CallHistoryItem from './callHistoryItem';
import CallHistoryService from '../js/callHistoryService';
import { UpArrowIconSVG, DownArrowIconSVG } from './svgIcons';
import moment from 'moment';

const propTypes = {
  compStyle : React.PropTypes.object,
  history : React.PropTypes.array,
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
        minWidth: '375px',
        maxWidth: "500px",
        maxHeight: '500px',
        overflowY: 'scroll',
        boxShadow: '0 16px 28px 0 rgba(0,0,0,.22),0 25px 55px 0 rgba(0,0,0,.21)',
        color: "#4a4a4a"
      },
      header: {
        //display: 'flex',
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


  render(){

    const self = this;
    let details;
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
  }

    // regular state list items renders an arrow svg, ext, number of calls, timestamp, and a menu svg
    const listitems = this.props.history.map((i, index)=>{
      return(
        <CallHistoryItem
            key={index}
            data={i}
            cbClick={()=>{
              console.log('sup bitch', i.callerId);
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
