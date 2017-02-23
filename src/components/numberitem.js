import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
//import SvgIcons from './svgIcons';
import Radium from 'radium';
import { fromJS } from "immutable";


class NumberItem extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {'onHover': false, 'onFocus': false};

    this.numberClicked = this.numberClicked.bind(this);
    this.setOnFocusState = this.setOnFocusState.bind(this);
  }

  static propTypes = {
    compStyle : React.PropTypes.object,
    cbClick: React.PropTypes.func,
    cbKeyPress : React.PropTypes.func,
    keyValue: React.PropTypes.string,
    keyString : React.PropTypes.string
  };

  static defaultProps = {
    cbClick: ()=>{}
  };

  static filename = "numberitem";
  static displayName = "NumberItem";

  numberClicked(){
    this.props.cbClick(this.props.keyValue);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
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
        padding: '0px',
        margin: '5px',
        transition: 'box-shadow .2s ease',
        outline: 'none',
        ':hover': {
          boxShadow: '2px 2px 5px #ddd, -2px 2px 5px #ddd'
        }

      },
      keyValue: {
        padding: '10px 0px',
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

  setOnFocusState(){
    this.setState({...this.state, onFocus: true});
  }

  render(){
    return (
      <div
          href="#"
          className="numberItemCont"
          tabIndex="0"
          style={{...this.getStyle('container')}}
          onFocus={this.setOnFocusState}
          onClick={this.numberClicked}
          >
        <div
            tabIndex="0"
            className="numberItemKeyVal"
            style={{...this.getStyle('keyValue')}}>
              {this.props.keyValue}
        </div>
        <div
            className="numberItemKeyString"
            style={{...this.getStyle('keyString')}}>
              {this.props.keyString}
        </div>
      </div>
    );
  }
}

export default Radium(NumberItem);
// reviewed on 7/14/2016
