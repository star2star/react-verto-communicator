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
    this.state = { callDetailDisplayed : false};

    //CallHistory.showCallDetails = this.showCallDetails.bind(this);
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

  render(){

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
          {this.props.history.map((i, index)=>{
            return (
              <CallHistoryItem key={index} data={i}
              />
            );
          })}
        </div>
        <div onClick={this.props.cbBack}>Back</div>
      </div>);

      const self = this;
      const detailData = CallHistoryService.getInstance().getHistoryDetail(404);
      const details = detailData.map(function(i, key){
        let renderedDirection;
        if(i.direction == 'outgoing') {
          renderedDirection = (<span className="incoming" >
            <UpArrowIconSVG svgStyle={{fill: '#009688', width: '24px', height: '24px'}}/>
          </span>);
        } else {
          renderedDirection = (<span className="outgoing">
            <DownArrowIconSVG svgStyle={{fill: '#009688', width: '24px', height: '24px'}} />
          </span>);
        }
        const formattedTimestamp = moment(i.timestamp).format('ddd MMM DD YYYY HH:mm:ss A');
        return (
          <div className="details"key={key} style={{...self.getDefaultStyle('details')}}>
            {renderedDirection}
            {formattedTimestamp}
          </div>);
      });

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

      const renderedState = this.state.callDetailDisplayed ? callDetailState : defaultState ;

    return (renderedState);
  }

}

CallHistory.propTypes = propTypes;
export default CallHistory;
