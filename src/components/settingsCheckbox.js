import React from 'react';
import VertoBaseComponent from './vertobasecomponent.js';

const propTypes = {
  cbSubmitSetting: React.PropTypes.func.isRequired,
  compStyle : React.PropTypes.object,
  checkLabel: React.PropTypes.string
};

class SettingsCheckbox extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {isChecked: false};

    this.handleSelect = this.handleSelect.bind(this);
  }

handleSelect() {
    this.setState({isChecked: !this.state.isChecked});
  console.log('handleSelect');
  // this.props.cbSubmitSetting();
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
      }
    };

    return (styles[styleName]);
  }

  render() {
    // const options=this.props.options.map((option, index)=>{
    //   return (<option key={index} value={option}> {option.label} </option>);
    // });
    return (
      <div style={{...this.getStyle('container')}}>
      <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.handleSelect}
    />
        {this.props.label}
      </div>
    );
  }
}

SettingsCheckbox.propTypes = propTypes;
export default SettingsCheckbox;
