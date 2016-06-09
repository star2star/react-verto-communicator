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

     };

    return (styles[styleName]);
  }

  render(){

    return (
      <div style={{background: "green", color: "yellow"}}>
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
