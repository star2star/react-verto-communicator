import React from 'react';
import VertoBaseComponent from './vertobasecomponent';

const propTypes = {
  cbChanging : React.PropTypes.func,
  compStyle : React.PropTypes.object,
  label : React.PropTypes.string,
  type : React.PropTypes.string,
  placeholder : React.PropTypes.string,
  value : React.PropTypes.string,
  hasErrors: React.PropTypes.bool
};

class Input extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = { 'onFocus' : false, isEmpty: true };
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
        color: this.props.value == '' || this.props.hasErrors ? '#f44336' : '#000'
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
        backgroundColor: this.props.value == '' ? '#f44336' : '#009688',
        transition : this.state.onFocus ? 'left 1s' : 'left 0s',
        left: this.state.onFocus ?  '0%' : '50%',
        right: '50%'
      },
      right: {
        content: '" "',
        height: '3px',
        position: 'absolute',
        backgroundColor: this.props.value == '' ? '#f44336' : '#009688' ,
        transition : this.state.onFocus ? 'right 1s' : 'right 0s',
        right: this.state.onFocus ?  '0%' : '50%',
        left: '50%'
      }

     };

    return (styles[styleName]);
  }

  render(){

    return (
      <div style={{...this.getStyle('fieldset')}}>
        <div style={{...this.getStyle('label')}}>
          {this.props.label}
        </div>
        <div>
          <input
              tabIndex="0"
              type={this.props.type}
              ref="name"
              placeholder={this.props.placeholder}
              style={{...this.getStyle('inputArea') }}
              onBlur={()=>{
                this.setState({...this.state, 'onFocus': false });
            }}
              onFocus={()=>{
                this.setState({...this.state,'onFocus': true});
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
      </div>
    );
  }
}

Input.propTypes = propTypes;
export default Input;
// reviewed 7/13/2016
