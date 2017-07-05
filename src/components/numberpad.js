import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import Radium from 'radium';
import NumberItem from './numberitem';
import { fromJS } from "immutable";


class Numberpad extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {};

    this.numberClicked = this.numberClicked.bind(this);
  }

  static propTypes = {
    compStyle : React.PropTypes.object,
    cbClick: React.PropTypes.func
  };

  static defaultProps = {
    cbClick: ()=>{}
  };

  static filename = "numberpad";
  static displayName = "Numberpad";

  numberClicked(k){
    this.props.cbClick(k);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  getDefaultStyle(styleName) {
    const styles = {
      wrapper: {
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        width: "100%"
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
          <NumberItem
              keyValue="1"
              keyString=""
              cbClick={this.numberClicked}
          />
          <NumberItem
              keyValue="2"
              keyString="ABC"
              cbClick={this.numberClicked}
          />
          <NumberItem
              keyValue="3"
              keyString="DEF"
              cbClick={this.numberClicked}
          />
        </div>
        <div style={{...this.getStyle('rows')}}>
          <NumberItem
              keyValue="4"
              keyString="GHI"
              cbClick={this.numberClicked}
          />
          <NumberItem
              keyValue="5"
              keyString="JKL"
              cbClick={this.numberClicked}
          />
          <NumberItem
              keyValue="6"
              keyString="MNO"
              cbClick={this.numberClicked}
          />
        </div>
        <div style={{...this.getStyle('rows')}}>
          <NumberItem
              keyValue="7"
              keyString="PQRS"
              cbClick={this.numberClicked}
          />
          <NumberItem
              keyValue="8"
              keyString="TUV"
              cbClick={this.numberClicked}
          />
          <NumberItem
              keyValue="9"
              keyString="WXYZ"
              cbClick={this.numberClicked}
          />
        </div>
        <div style={{...this.getStyle('rows')}}>
          <NumberItem
              keyValue="*"
              keyString=""
              compStyle={{keyValue: {color: '#999'}}}
              cbClick={this.numberClicked}
          />
          <NumberItem
              keyValue="0"
              keyString="+"
              cbClick={this.numberClicked}
          />
          <NumberItem
              keyValue="#"
              keyString=""
              compStyle={{keyValue: {color: '#999'}}}
              cbClick={this.numberClicked}
          />
        </div>
      </div>);
  }
}

export default Radium(Numberpad);
// reviewed 7/14/2016
