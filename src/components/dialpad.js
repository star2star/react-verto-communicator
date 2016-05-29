import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import Numberpad from './numberpad';

const propTypes = {
  Style : React.PropTypes.object,
  cbCall: React.PropTypes.func.isRequired,
  nbrToDial: React.PropTypes.string
};

class Dialpad extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {number: this.props.nbrToDial};
  }

  makeCall(){
    //TODO validate
    this.props.cbCall(this.state.number)
  }

  changingNumber(e){
    //TODO convert letter to numeric
    this.setState({ ...this.state, number: e.target.value });
  }

  dialNumber(k) {
    this.setState({ ...this.state, number: this.state.number + k });
  }

  render() {
    return (
      <div style={{background: "green", color: "yellow", display: "flex", alignItems: "center", flexDirection: "column", width: "300px", height: "400px"}}>
        <div>
          <input value={this.state.number} onChange={this.changingNumber.bind(this)}/>
          <button onClick={this.makeCall.bind(this)}>Call</button>
        </div>
        <Numberpad cbClick={this.dialNumber.bind(this)} />
      </div>);
  }
}

Dialpad.propTypes = propTypes;

export default Dialpad;
