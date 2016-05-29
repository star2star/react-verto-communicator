import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import SvgIcons from './svgIcons';

const propTypes = {
  Style : React.PropTypes.object,
  cbClick: React.PropTypes.func.isRequired,
  keyValue: React.PropTypes.string
};

class NumberItem extends VertoBaseComponent {
  numberClicked(e){
    this.props.cbClick(this.props.keyValue)
  }
  render(){

    return (
      <div onClick={this.numberClicked.bind(this)}>
        <div>{this.props.keyValue}</div>
        <div>{this.props.keyString}</div>
      </div>
    );
  }
}

class Numberpad extends VertoBaseComponent {
  constructor(props) {
    super(props);
  }
  numberClicked(k){
    this.props.cbClick(k);
  }
  render() {
    return (
      <div style={{background: "green", color: "yellow", display: "flex", flexDirection: "column", width: "300px", height: "400px"}}>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", flexGrow: 1, alignItems:"center"}}>
          <NumberItem keyValue="1" keyString="" cbClick={this.numberClicked.bind(this)} />
          <NumberItem keyValue="2" keyString="ABC" cbClick={this.numberClicked.bind(this)} />
          <NumberItem keyValue="3" keyString="DEF" cbClick={this.numberClicked.bind(this)} />
        </div>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", flexGrow: 1, alignItems:"center"}}>
          <NumberItem keyValue="4" keyString="GHI" cbClick={this.numberClicked.bind(this)} />
          <NumberItem keyValue="5" keyString="JKL" cbClick={this.numberClicked.bind(this)} />
          <NumberItem keyValue="6" keyString="MNO" cbClick={this.numberClicked.bind(this)} />
        </div>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", flexGrow: 1, alignItems:"center"}}>
          <NumberItem keyValue="7" keyString="PQRS" cbClick={this.numberClicked.bind(this)} />
          <NumberItem keyValue="8" keyString="TUV" cbClick={this.numberClicked.bind(this)} />
          <NumberItem keyValue="9" keyString="WXYZ" cbClick={this.numberClicked.bind(this)} />
        </div>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", flexGrow: 1, alignItems:"center"}}>
          <NumberItem keyValue="*" keyString="" cbClick={this.numberClicked.bind(this)} />
          <NumberItem keyValue="0" keyString="+" cbClick={this.numberClicked.bind(this)} />
          <NumberItem keyValue="#" keyString="" cbClick={this.numberClicked.bind(this)} />
        </div>
      </div>);
  }
}

Numberpad.propTypes = propTypes;

export default Numberpad;
