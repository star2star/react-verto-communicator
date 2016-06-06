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
        paddingBottom: '5px'
        // borderBottom: '1px solid #FFF'
      },
      label: {
        fontSize:'.85rem',
        paddingLeft: '10px'
      }
    };

    return (styles[styleName]);
  }

  render() {

    return (
      <div style={{...this.getStyle('container')}}>
      <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.handleSelect}
    />
        <span style={{...this.getStyle('label')}}>{this.props.label}</span>
      </div>
    );
  }
}

SettingsCheckbox.propTypes = propTypes;
export default SettingsCheckbox;
