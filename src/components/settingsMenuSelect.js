import React from 'react';
import VertoBaseComponent from './vertobasecomponent.js';

const propTypes = {
  cbSubmitSetting: React.PropTypes.func.isRequired,
  compStyle : React.PropTypes.object,
  label: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired,
  selectedOption: React.PropTypes.object.isRequired
};

class SettingsMenuSelect extends VertoBaseComponent {
  constructor(props) {
    super(props);
  }

handleSelect() {
//   let selObj = {};
//
//   selObj.key = this.refs.select.value.
//
//
  console.log('######', this.refs.select.selectedIndex.value);
  this.props.cbSubmitSetting(this.refs.select.value);
}

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      container: {
        paddingTop: '10px',
        paddingBottom: '5px',
        borderBottom: '1px solid #FFF'
      },
      label: {
        display:'flex',
        paddingBottom: '10px',
        fontWeight: 'bold'
      }
    };

    return (styles[styleName]);
  }

  render() {
    const options=this.props.options.map((option, index)=>{
      return (<option key={index} value={option}>{option.label}</option>);
    });

    return (
      <div style={{...this.getStyle('container')}}>
        <span style={{...this.getStyle('label')}}>{this.props.label}</span>
        <select
            ref="select"
            onChange={()=>this.handleSelect()}
        >
          {options}
        </select>
      </div>
    );
  }
}

SettingsMenuSelect.propTypes = propTypes;
export default SettingsMenuSelect;
