import React from 'react';
import VertoBaseComponent from './vertobasecomponent.js';
import { fromJS } from "immutable";


class SettingsMenuSelect extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    cbSubmitSetting: React.PropTypes.func,
    compStyle : React.PropTypes.object,
    label: React.PropTypes.string,
    options: React.PropTypes.array,
    selectedOption: React.PropTypes.object
  };

  static defaultProps = {
    cbSubmitSetting: ()=>{},
    label: 'notAvailable',
    options: [],
    selectedOption: {}
  };

  static filename = "settingsCheckbox";
  static displayName = "SettingsCheckbox";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
  }

  handleSelect() {
    const theSelect = this.refs.select;

      // get the selected option from the options array.  Use [0] to get the array
      // element only (should only be one).
    const selValue = this.props.options.filter((opt)=>{
      //console.log('theSelect', theSelect);
      return (opt.id == theSelect[theSelect.selectedIndex].value);
    })[0];


    // The selectedOption prop has the structure that we need for the 'selected'
    // value in the settings store.  Just replace the id and label values and
    // return the structure to the callback function...
    // The id is the name of the setting attribute to be set, and the data attribute
    // is the value.

    let selObj = {};
    selObj[this.props.selectedOption.id] = {...this.props.selectedOption.data, ...selValue};
    this.props.cbSubmitSetting(selObj);
  }



  getDefaultStyle(styleName) {
    const styles = {
      container: {
        paddingTop: '10px',
        paddingBottom: '5px',
        borderBottom: '1px solid #FFF',
        display: 'flex',
        flexDirection: 'column'
      },
      label: {
        display:'flex',
        paddingBottom: '10px',
        fontWeight: 'bold',
        fontSize: '1rem'
      },
      select: {
        border: 'none',
        boxShadow:'none',
        fontSize: '.9rem',
        backgroundColor: 'rgba(0,0,0,0)',
        color: '#FFF'
      }
    };

    return (styles[styleName]);
  }

  render() {
    const options=this.props.options.map((option, index)=>{
        return (<option key={index} value={option.id}>{option.label}</option>);
    });

    return (
      <div style={{...this.getStyle('container')}}>
        <span style={{...this.getStyle('label')}}>{this.props.label}</span>
        <select
            ref="select"
            style={this.getStyle('select')}
            onChange={()=>this.handleSelect()}
            value={this.props.selectedOption.data && this.props.selectedOption.data.id ? this.props.selectedOption.data.id : ''}
        >
          {options}
        </select>
      </div>
    );
  }
}

export default SettingsMenuSelect;
// reviewed on 7/14/2016
