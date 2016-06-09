import React from 'react';
import VertoBaseComponent from './vertobasecomponent';

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
        flex: 1,
        alignItems: "center",
        justifyContent: 'flex-start',
        flexDirection: "column",
        maxWidth: "500px",
        boxShadow: '0 16px 28px 0 rgba(0,0,0,.22),0 25px 55px 0 rgba(0,0,0,.21)',
        backgroundColor: "green",
        color: "yellow"
      },
     };

    return (styles[styleName]);
  }

  render(){

    return (
      <div style={this.getStyle('container')}>
        <span>{this.props.data.callerId}</span>
        <span>{this.props.data.lastTimestamp}</span>
        <span>{this.props.data.nbrCalls}</span>
        <span>{this.props.data.lastDirection}</span>
      </div>);
  }

}

CallHistoryItem.propTypes = propTypes;
export default CallHistoryItem;
