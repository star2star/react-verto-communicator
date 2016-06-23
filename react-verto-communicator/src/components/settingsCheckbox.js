import React from 'react';
import VertoBaseComponent from './vertobasecomponent.js';

const propTypes = {
  cbSubmitSetting: React.PropTypes.func.isRequired,
  checkedOption: React.PropTypes.shape({
    name: React.PropTypes.string,
    value: React.PropTypes.bool
  }).isRequired,
  compStyle : React.PropTypes.object,
  label: React.PropTypes.string.isRequired
};

class SettingsCheckbox extends VertoBaseComponent {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

handleSelect() {
  console.log('handleSelect');
  // this.props.cbSubmitSetting();

let chkdObj = {};
  chkdObj[this.props.checkedOption.name] = this.refs.checkMe.checked;
  // console.log('things-------', this.refs.checkMe.checked, chkdObj);
  this.props.cbSubmitSetting(chkdObj);
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
        fontSize:'.9rem',
        paddingLeft: '10px'
      }
    };

    return (styles[styleName]);
  }

  render() {

    return (
      <div style={{...this.getStyle('container')}}>
        <input
            ref="checkMe"
            type="checkbox"
            onChange={()=>this.handleSelect()}
            checked={this.props.checkedOption.value}
        />
        <span style={{...this.getStyle('label')}}>{this.props.label}</span>
      </div>
    );
  }
}

SettingsCheckbox.propTypes = propTypes;
export default SettingsCheckbox;
