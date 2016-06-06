import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import SvgIcons from './svgIcons';

const propTypes = {
  compStyle : React.PropTypes.object,
  cbClick: React.PropTypes.func.isRequired,
  keyValue: React.PropTypes.string,
  keyString : React.PropTypes.string
};

class NumberItem extends VertoBaseComponent {
  numberClicked(e){
    this.props.cbClick(this.props.keyValue)
  }
  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        width: '33.33%',
        backgroundColor: '#fff',
        cursor: 'pointer',
        //padding: '10px 0px'
        paddingLeft: '15px',
        paddingRight: '15px'
      },
      keyValue: {
        color: '#26ccda',
        fontSize: '30px',
        fontWeight: '300'
      },
      keyString: {
        color: '#ccc',
        fontSize: '11px'
      }
    };
    return (styles[styleName]);
  }


  render(){

//     switch(this.props.keySTring) {
//     case n:
//         code block
//         break;
//     case n:
//         code block
//         break;
//     default:
//         default code block
// }
//

    return (
      <div
        style={{...this.getStyle('container')}}
        onClick={this.numberClicked.bind(this)}>
        <div style={{...this.getStyle('keyValue')}}>{this.props.keyValue}</div>
        <div style={{...this.getStyle('keyString')}}>{this.props.keyString} </div>
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
  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      wrapper: {
        backgroundColor: "#fff",
        display: "flex",
        padding: '15px',
        flexDirection: "column",
        width: "100%",
        height: "400px",
        border: '1px solid red'
      },
      rows: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'flex-start',
        justifyContent: "space-around",
        flexGrow: 1
      }
    };
    return (styles[styleName]);
  }


  render() {
    return (
      <div style={{...this.getStyle('wrapper')}}>
        <div style={{...this.getStyle('rows')}}>
          <NumberItem keyValue="1" keyString="" cbClick={this.numberClicked.bind(this)} />
          <NumberItem keyValue="2" keyString="ABC" cbClick={this.numberClicked.bind(this)} />
          <NumberItem keyValue="3" keyString="DEF" cbClick={this.numberClicked.bind(this)} />
        </div>
        <div style={{...this.getStyle('rows')}}>
          <NumberItem keyValue="4" keyString="GHI" cbClick={this.numberClicked.bind(this)} />
          <NumberItem keyValue="5" keyString="JKL" cbClick={this.numberClicked.bind(this)} />
          <NumberItem keyValue="6" keyString="MNO" cbClick={this.numberClicked.bind(this)} />
        </div>
        <div style={{...this.getStyle('rows')}}>
          <NumberItem keyValue="7" keyString="PQRS" cbClick={this.numberClicked.bind(this)} />
          <NumberItem keyValue="8" keyString="TUV" cbClick={this.numberClicked.bind(this)} />
          <NumberItem keyValue="9" keyString="WXYZ" cbClick={this.numberClicked.bind(this)} />
        </div>
        <div style={{...this.getStyle('rows')}}>
          <NumberItem keyValue="*" keyString="" cbClick={this.numberClicked.bind(this)} />
          <NumberItem keyValue="0" keyString="+" cbClick={this.numberClicked.bind(this)} />
          <NumberItem keyValue="#" keyString="" cbClick={this.numberClicked.bind(this)} />
        </div>
      </div>);
  }
}

Numberpad.propTypes = propTypes;

export default Numberpad;
