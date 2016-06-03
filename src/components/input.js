import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
//import SvgIcons from './svgIcons';
//import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl';
import Radium from 'radium';

const propTypes = {
  compStyle : React.PropTypes.object,
  //settings: React.PropTypes.object.isRequired
};

class Input extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = { 'onFocus' : false };
}

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      fieldset: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        paddingBottom: '15px'
        //':focus': { borderBottom: ' 5px solid red'}
      },
      label: {
        paddingBottom: '15px',
        fontWeight: '700',
        fontSize: '14px'
      },
      inputArea: {
        paddingBottom: '3px',
        borderWidth: '0px',
        outline: 'none',
        borderColor: 'rgb(85,85,85)',
        borderBottom: '1px solid #d2d2d2',
        color: "rgba(0,0,0,84)",
        fontSize: '14px',
        fontWeight: '300',
        width: '100%',
        boxShadow: 'none',
        backgroundColor: 'rgba(0,0,0,0)',
        backgroundPosition: 'center bottom,center calc(100% - 1px)',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'linearGradient(#009688,#009688),linearGradient(#d2d2d2,#d2d2d2)',
        backgroundSize: '0 2px,100% 1px',
        transition: 'borderColor ease-in-out .30s, width ease-in-out .30s',
        //transition: 'width ease-in-out .15s,box-shadow ease-in-out .15s',
        // ':focus': {
        //   // borderBottomWidth: '3px',
        //   // borderColor: '#009688'
        //   //width: '50%'
        // }
      },

      bar: {
        height: '2px',
        //backgroundColor: '#009688',
        position: 'relative',
        display: 'block',
        width: '100%',
        ':focus': {
          // backgroundColor: '#009688',
          // borderBottomWidth: '3px',
          // borderColor: '#009688'
      },
      before: {
        content: '" "',
        height: '2px',
        width: '0px',
        bottom: '1px',
        position: 'absolute',
        background: '#5264ae',
        transition: '0.2s ease all',
        left:'50%'
      },
      after: {
        content: '" "',
        height: '2px',
        width: '0px',
        bottom: '1px',
        position: 'absolute',
        background: '#5264ae',
        transition: '0.2s ease all',
        right: '50%'
      }
    }
     };

    return (styles[styleName]);
  }



  render(){
//console.log('..............................................',this.refs.name.value ? 'sugar')
    return (
      <div style={{...this.getStyle('fieldset')}}>
        <div style={{...this.getStyle('label')}}>{this.props.label}</div>
        <div>
          <input
            ref="name"
            placeholder={this.props.placeholder}
            style={{...this.getStyle('inputArea') }}
            onChange={
            (e) =>{
              this.props.cbChanging(this.props.label.replace(' ', '').toLowerCase(), e.target.value );
            }
          } defaultValue={this.props.value}
          />
        </div>
        <span style={{...this.getStyle('bar')}}>
          <span style={{...this.getStyle('before')}}> </span>
          <span style={{...this.getStyle('after')}}> </span>
        </span>
      </div>);
  }

}

Input.propTypes = propTypes;
export default Radium(Input);
