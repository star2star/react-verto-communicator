import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import { fromJS } from "immutable";


class Input extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = { 'onFocus' : false, isEmpty: true };

    this.stateOnFocusFalse = this.stateOnFocusFalse.bind(this);
    this.stateOnFocusTrue = this.stateOnFocusTrue.bind(this);
    this.inputOnChange = this.inputOnChange.bind(this);
}

  static propTypes = {
    cbChanging : React.PropTypes.func,
    compStyle : React.PropTypes.object,
    label : React.PropTypes.string,
    type : React.PropTypes.string,
    placeholder : React.PropTypes.string,
    value : React.PropTypes.string,
    hasErrors: React.PropTypes.bool,
    errorLabel: React.PropTypes.string
  };

  static filename = "input";
  static displayName = "Input";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
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
        fontSize: '14px',
        color:  this.props.hasErrors ? '#f44336' : '#000'
      },
      inputArea: {
        paddingBottom: '3px',
        borderWidth:  '0px',
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
        display:  this.props.hasErrors ? 'none' : 'flex',
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
        backgroundColor: this.props.hasErrors ? '#f44336' : '#009688',
        transition : this.state.onFocus ? 'left 1s' : 'left 0s',
        left: this.state.onFocus ?  '0%' : '50%',
        right: '50%'
      },
      right: {
        content: '" "',
        height: '3px',
        position: 'absolute',
        backgroundColor: this.props.hasErrors  ? '#f44336' : '#009688' ,
        transition : this.state.onFocus ? 'right 1s' : 'right 0s',
        right: this.state.onFocus ?  '0%' : '50%',
        left: '50%'
      },
      invalidStyle:{
        display:  this.props.hasErrors ? 'flex' : 'none'
      },
      inputAreaStyle:{
        border:  this.props.hasErrors ? '1px solid #f44336' : '#000'
      }

     };

    return (styles[styleName]);
  }

  stateOnFocusFalse(){
    this.setState({...this.state, 'onFocus': false });
  }

  stateOnFocusTrue(){
    this.setState({...this.state,'onFocus': true});
  }

  inputOnChange(e){
    this.props.cbChanging(this.props.label.replace(' ', '').toLowerCase(), e.target.value );
  }


  render(){

    return (
      <div style={{...this.getStyle('fieldset')}}>
        <div style={{...this.getStyle('label')}}>
          {this.props.label}
          <span style={this.getStyle('invalidStyle')}>
             {this.props.errorLabel}
          </span>
        </div>
        <div style={{...this.getStyle('inputAreaStyle')}}>
          <input
              tabIndex="0"
              type={this.props.type}
              ref="name"
              placeholder={this.props.placeholder}
              style={{...this.getStyle('inputArea') }}
              onBlur={this.stateOnFocusFalse}
              onFocus={this.stateOnFocusTrue}
              onChange={this.inputOnChange}
              defaultValue={this.props.value}
          />
          <span style={{...this.getStyle('bar')}}>
            <span className="left" style={{...this.getStyle('left')}}> &nbsp;</span>
            <span className="right" style={{...this.getStyle('right')}}>&nbsp; </span>
          </span>
        </div>
      </div>
    );
  }
}

export default Input;
// reviewed 7/13/2016
