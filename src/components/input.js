import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
//import SvgIcons from './svgIcons';
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl';
import Radium from 'radium';

const propTypes = {
  compStyle : React.PropTypes.object,
  //settings: React.PropTypes.object.isRequired
};

class Input extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = { 'onFocus' : false };

    this.setFocusState = this.setFocusState.bind(this);
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
        backgroundRepeat: 'no-repeat'
      },
      bar: {
        position: 'relative',
        bottom: '3px',
        display: 'flex',
        justifyContent: 'space-between',
        content: '" "',
        height: '2px',
        borderWidth: '3px',
        borderColor: '#fff',
        width: '101%',
        backgroundColor: '#fff'
      },
      left: {
        content: '" "',
        height: '3px',
        position: 'absolute',
        backgroundColor: '#009688',
        transition : 'left 1s',
        left: this.state.onFocus ?  '0%' : '50%',
        right: '50%'
      },
      right: {
        content: '" "',
        height: '3px',
        //width: '0px',
        position: 'absolute',
        backgroundColor: '#009688',
        transition : 'right 1s',
        right: this.state.onFocus ?  '0%' : '50%',
        left: '50%'
      }

     };

    return (styles[styleName]);
  }

  setFocusState() {
    this.setState({...this.state,'onFocus': true});
    console.log('%%%%%%%%%%%%%%%%%%%%%%', this.state.onFocus);
  }



  render(){

    if(this.state.onFocus) {
      //console.log('set them styles baby');

    } else {
      //console.log('dont set them styles ho');
    }

    return (
      <div style={{...this.getStyle('fieldset')}}>
        <div style={{...this.getStyle('label')}}>{this.props.label}</div>
        <div>
          <input
            type={this.props.type}
            ref="name"
            placeholder={this.props.placeholder}
            style={{...this.getStyle('inputArea') }}
            onBlur={()=>{
              this.setState({...this.state, 'onFocus': false });
              console.log('LOSING FOCUS', this.state.onFocus);
            }}
            onFocus={()=>{
              this.setState({...this.state,'onFocus': true});
              console.log('GETTING FOCUSED', this.state.onFocus);
            }}
            onChange={
            (e) =>{
              this.props.cbChanging(this.props.label.replace(' ', '').toLowerCase(), e.target.value );
            }
          } defaultValue={this.props.value}
          />
          <span style={{...this.getStyle('bar')}}>
            <span className="left" style={{...this.getStyle('left')}}> &nbsp;</span>
            <span className="right" style={{...this.getStyle('right')}}>&nbsp; </span>
          </span>
        </div>

      </div>);
  }

}

Input.propTypes = propTypes;
export default injectIntl(Radium(Input));
