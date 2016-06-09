import React from 'react';
import VertoBaseComponent from './vertobasecomponent';

const propTypes = {
  compStyle : React.PropTypes.object,
  history: React.PropTypes.array.isRequired,
  cbBack: React.PropTypes.func.isRequired
};

class CallHistory extends VertoBaseComponent {
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
        <div>Call History</div>
        <div>
          Call History Items Go Here
        </div>
        <div onClick={this.props.cbBack}>Back</div>
      </div>);
  }

}

CallHistory.propTypes = propTypes;
export default CallHistory;
