import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
//import moment from 'moment.js';
import { UpArrowIconSVG, DownArrowIconSVG, MenuIconSVG } from './svgIcons';
import Radium from 'radium';
import {injectIntl, formattedMessage } from 'react-intl';

const propTypes = {
  compStyle : React.PropTypes.object,
  data: React.PropTypes.object.isRequired
};

class CallHistoryItem extends VertoBaseComponent {
  constructor(props) {
    super(props);
}

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      container: {
        display: 'flex',
        color: '#4a4a4a',
        marginTop: '20px',
        marginBottom: '20px',
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
        display: 'flex',
        flexDirection: 'column',
        fontSize: '30px',
        color: '#26ccda',
        justifyContent: 'space-between'
      },
      dirSVG : {
        width: '30px',
        height: '30px',
        fill : '#009688'
      },
      menuCont : {
        marginLeft: 'auto'
      },
      timestamp : {
        marginTop: '15px',
        fontSize: '11px',
        color: '#4a4a4a',
      }

     };

    return (styles[styleName]);
  }

  render(){

    var renderedDirection;
    if(this.props.data.lastDirection == 'outgoing') {
      renderedDirection = (<span className="outgoing">
        <UpArrowIconSVG
          svgStyle={{...this.getDefaultStyle('dirSVG')}}
        />
      </span>);
    } else {
      renderedDirection = (<span className="incoming">
        <DownArrowIconSVG
          svgStyle={{...this.getDefaultStyle('dirSVG')}}
        />
      </span>);
    }

    return (
      <div style={this.getStyle('container')}>
        <div style={{...this.getDefaultStyle('top')}}>
            <div>
              {renderedDirection}
              {this.props.data.callerId} ({this.props.data.nbrCalls})
            </div>
            <div style={{...this.getDefaultStyle('timestamp')}}>
              {this.props.data.lastTimestamp}
            </div>
        </div>
        <span style={{...this.getDefaultStyle('menuCont')}}>
          <MenuIconSVG svgStyle={{...this.getStyle('dirSVG')}} />
        </span>

      </div>);
  }

}

CallHistoryItem.propTypes = propTypes;
export default CallHistoryItem;
