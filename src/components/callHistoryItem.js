import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import moment from 'moment';
import { UpArrowIconSVG, DownArrowIconSVG, MenuIconSVG } from './svgIcons';
import Radium from 'radium';
import {injectIntl, formattedMessage } from 'react-intl';

const propTypes = {
  compStyle : React.PropTypes.object,
  data: React.PropTypes.object.isRequired,
  cbClick : React.PropTypes.func,
  cbShowCalls : React.PropTypes.func
};

class CallHistoryItem extends VertoBaseComponent {
  constructor(props) {
    super(props);

    this.call = this.call.bind(this);
    this.showCalls = this.showCalls.bind(this);
}

  getCompStyle() {
    return this.props.compStyle;
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
        minWidth: '375px',
        alignItems: "center",
        cursor: 'pointer',
        maxWidth: "500px",
        boxShadow: '0 16px 28px 0 rgba(0,0,0,.22),0 25px 55px 0 rgba(0,0,0,.21)'
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
        paddingRight: '20px',
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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
    if (this.props.cbClick) {
      this.props.cbShowCalls(this.props.data.callerId);
    }
  }

  render(){

    const renderedTS = moment(this.props.data.lastTimestamp).format('ddd MMM DD YYYY HH:mm:ss A');

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

    return (
      <div style={this.getStyle('container')}>
        <div
            onClick={this.call}
            style={{...this.getDefaultStyle('top')}}>
            <div>
              {renderedDirection}
              {this.props.data.callerId} ({this.props.data.nbrCalls})
            </div>
            <div style={{...this.getDefaultStyle('timestamp')}}>
              {renderedTS}
            </div>
        </div>
        <span
            onClick={this.showCalls}
            style={{...this.getDefaultStyle('menuCont')}}>
          <MenuIconSVG svgStyle={{...this.getStyle('dirSVG')}} />
        </span>

      </div>);
  }

}

CallHistoryItem.propTypes = propTypes;
export default CallHistoryItem;
