import React from 'react';
import VertoBaseComponent from './vertobasecomponent.js';


const propTypes = {
  compStyle : React.PropTypes.object,
  cbSubmitSetting: React.PropTypes.func.isRequired,
  options: React.PropTypes.array.isRequired,
  label: React.PropTypes.string.isRequired,
  selectedOption: React.PropTypes.object.isRequired
};


class SettingsMenuSelect extends VertoBaseComponent {
  constructor(props) {
    super(props);
  }

handleSelect() {
  // this.setState({value: event.target.value});
  console.log('handleSelect');
  // this.props.cbSubmitSetting();
}


  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      menu: {

      }
    };

    return (styles[styleName]);
  }


  render() {
    const options=this.props.options.map((option, index)=>{
      return (<option key={index} value={option}> {option.label} </option>);
    });

    return (
      <div>
        <span>{this.props.label}</span>
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
