import React from 'react';
import VertoBaseComponent from './vertobasecomponent.js';
import { FormattedMessage } from 'react-intl';

const propTypes = {
  compStyle : React.PropTypes.object,
  cbClick: React.PropTypes.func.isRequired,
  cbSubmitSetting: React.PropTypes.func.isRequired,
  data: React.PropTypes.object.isRequired
};


class SettingsMenuSelect extends VertoBaseComponent {
  constructor(props) {
    super(props);
  }

handleSelect() {
  this.setState({value: event.target.value});
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

    return (
    <div>
      <select
        value=
        onChange={()=>this.handleSelect()}
      >
      </select>
      <option> </option>
    </div>
    );
  }
}

SettingsMenuSelect.propTypes = propTypes;
export default SettingsMenuSelect;
