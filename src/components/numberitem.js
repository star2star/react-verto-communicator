import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import SvgIcons from './svgIcons';
import Radium from 'radium';

const propTypes = {
  compStyle : React.PropTypes.object,
  cbClick: React.PropTypes.func.isRequired,
  cbKeyPress : React.PropTypes.func,
  keyValue: React.PropTypes.string,
  keyString : React.PropTypes.string
};

class NumberItem extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {'onHover': false, 'onFocus': false};

    //this.numberClicked(e) = this.numberClicked.bind(this);
  }
  numberClicked(e){
    this.props.cbClick(this.props.keyValue);
    //this.props.cbKeyPress(this.props.keyValue);
  }

  // numberEntered(e){
  //   if(e.which == 13 || e.keyCode == 13 && this.state.onFocus) {
  //     //console.log('key press', this.props.keyValue);
  //     this.props.cbKeyPress(this.props.keyValue);
  //     return false;
  //   }
  // }

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
        padding: '0px',
        margin: '5px',
        //padding: '0px 15px 15px 15px',
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

  render(){

    // if item is hovered, light box shadow
    // if item is focused, harsher box shadow style
    // else no box shadow



    return (
      <div
          href="#"
          className="numberItemCont"
          tabIndex="0"
          style={{...this.getStyle('container')}}
          onFocus={()=>{
            this.setState({...this.state, onFocus: true});
          }}
          //onKeyPress={this.numberEntered.bind(this)}
          onClick={this.numberClicked.bind(this)}
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
