import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import moment from 'moment';
import { UpArrowIconSVG, DownArrowIconSVG, MenuIconSVG } from './svgIcons';
import ToolTip from './tooltip';
import { fromJS } from "immutable";



class CallHistoryItem extends VertoBaseComponent {
  constructor(props) {
    super(props);

    this.call = this.call.bind(this);
    this.showCalls = this.showCalls.bind(this);
    this.showCallOnKeyPress = this.showCallOnKeyPress.bind(this);
    this.callOnKeyPress = this.callOnKeyPress.bind(this);
  }

  static propTypes = {
    compStyle : React.PropTypes.object,
    data: React.PropTypes.object,
    cbClick : React.PropTypes.func,
    cbShowCalls : React.PropTypes.func,
    allowToolTip : React.PropTypes.bool
  };

  static defaultProps = {
    data: {}
  };

  static filename = "callHistoryItem";
  static displayName = "CallHistoryItem";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  getDefaultStyle(styleName) {
    const styles = {
      container: {
        display: 'flex',
        color: '#4a4a4a',
        paddingTop: '10px',
        paddingBottom: '10px',
        backgroundColor: '#fff',
        flex: 1,
        fontWeight: '300',
        alignItems: 'flex-start',
        cursor: 'pointer'
      },
      top: {
        paddingLeft: '20px',
        flex: 9,
        display: 'flex',
        flexDirection: 'column',
        fontSize: '30px',
        color: '#26ccda',
        justifyContent: 'space-between'
      },
      dirCont : {
        paddingRight: '20px'
      },
      dirSVG : {
        width: '30px',
        height: '30px',
        fill : '#009688'
      },
      menuCont : {
        flex: 1,
        paddingTop: '3px',
        paddingRight: '20px',
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      ttip: {
        padding: '0px'
      },
      timestamp : {
        marginTop: '15px',
        fontSize: '11px',
        color: '#ccc'
      }

     };

    return (styles[styleName]);
  }

  call() {
    if (this.props.cbClick) {
      this.props.cbClick(this.props.data.callerId);
    }
  }
  showCalls() {
    if (this.props.cbShowCalls) {
      this.props.cbShowCalls(this.props.data.callerId);
    }
  }

  showCallOnKeyPress(e){
    if(e.which == 13 || e.keyCode == 13) {
      this.showCalls();
      return false;
  }}
  callOnKeyPress(e){
    if(e.which == 13 || e.keyCode == 13) {
      this.call();
      return false;
  }}


  render(){
    const renderedTS = moment(this.props.data.lastTimestamp).format('ddd MMM DD YYYY HH:mm:ss A');

    let nbrCalls;
    let menu;
    if(this.props.data.nbrCalls == 1) {
      nbrCalls = (<span className="nbrCalls">
      </span>);
      menu = (<span></span>);
    } else {
      nbrCalls = (<span className="nbrCalls">
        ({this.props.data.nbrCalls})
      </span>);
      menu = (
        <span
            tabIndex="0"
            className="menuCont"
            onKeyPress={this.showCallOnKeyPress}
            onClick={this.showCalls}
            style={{...this.getDefaultStyle('menuCont')}}>
          <MenuIconSVG svgStyle={{...this.getStyle('dirSVG')}} />
        </span>);
    }

    var renderedDirection;
    if(this.props.data.lastDirection == 'outgoing') {
      renderedDirection = (<span className="incoming" style={{...this.getDefaultStyle('dirCont')}}>
        <UpArrowIconSVG
            svgStyle={{...this.getDefaultStyle('dirSVG')}}
        />
      </span>);
    } else {
      renderedDirection = (<span className="outgoing" style={{...this.getDefaultStyle('dirCont')}}>
        <DownArrowIconSVG
            svgStyle={{...this.getDefaultStyle('dirSVG')}}
        />
      </span>);
    }

    let displayObject;
    if(this.props.allowToolTip){
    displayObject = (
      <ToolTip
          place="bottom"
          compStyle={{...this.getDefaultStyle('ttip')}}
          name="chi"
          msg="Click to dial"
      >
        <div
            tabIndex="0"
            style={this.getStyle('container')}>
          <div
              tabIndex="0"
              className="top"
              onKeyPress={this.callOnKeyPress}
              onClick={this.call}
              style={{...this.getDefaultStyle('top')}}>
              <div className="info">
                {renderedDirection}
                <span className="callerId">
                  {this.props.data.callerId}
                </span>
                {nbrCalls}
              </div>
              <div
                  className="timestamp"
                  style={{...this.getDefaultStyle('timestamp')}}
              >
                {renderedTS}
              </div>
          </div>
          {menu}
        </div>
      </ToolTip>
    );} else {
      displayObject = (
        <div
            className=""
            tabIndex="0"
            style={this.getStyle('container')}
        >
          <div
              tabIndex="0"
              className="top"
              onKeyPress={this.callOnKeyPress}
              onClick={this.call}
              style={{...this.getDefaultStyle('top')}}>
              <div className="info">
                {renderedDirection}
                <span className="callerId">
                  {this.props.data.callerId}
                </span>
                {nbrCalls}
              </div>
              <div
                  className="timestamp"
                  style={{...this.getDefaultStyle('timestamp')}}
              >
                {renderedTS}
              </div>
          </div>
          {menu}
        </div>
      );
    }

    return (
      displayObject
    );
  }

}

export default CallHistoryItem;
// reviewed 7/13/2016
