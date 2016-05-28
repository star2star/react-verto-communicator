import React from 'react';
import SvgIcons from './svgIcons';

const propTypes = {
  Style : React.PropTypes.object,
  cbCall: React.PropTypes.func.isRequired
};

class Dialpad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {number: ''};
  }

  makeCall(){
    //TODO validate
    this.props.cbCall(this.state.number)
  }

  changingNumber(e){
    //TODO convert letter to numeric 
    this.setState({ ...this.state, number: e.target.value });
  }

  render() {
    return (
      <div style={{background: "green", color: "yellow", display: "flex", alignItems: "center", flexDirection: "column", width: "300px", height: "400px"}}>
        <div>
          <input value={this.state.number} onChange={this.changingNumber.bind(this)}/>
          <button onClick={this.makeCall.bind(this)}>Call</button>
        </div>

      </div>);
  }
}

Dialpad.propTypes = propTypes;

export default Dialpad;
