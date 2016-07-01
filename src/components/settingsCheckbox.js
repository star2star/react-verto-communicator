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
    this.state={isChecked: this.props.checkedOption.value};

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
        //display: 'flex',
        //flexDirection: 'row',
        paddingTop: '10px',
        paddingBottom: '5px',
        position: 'relative'
      },

      cbcont: {
        // animation styles
        position: 'relative',
        borderRadius: '2px',
        backgroundColor: '#fff',
        display: 'inline-block',
        height: '14px',
        width: '14px',
        borderBottom: '1px solid #FFF' // I don't think this is necessary
      },
      input: {
        //display: 'none',
        zIndex: 10,
        position: 'absolute',
        left: '-5px',
        top: '1px',
        //left: '-5px', // inside cbdiv
        //top: '-7px', // inside cbdiv
        //zIndex: 20,
        width: '25px',
        height: '25px',
        opacity: 0 // yooooooooooo
      },
      label: {
        fontSize:'.9rem',
        paddingLeft: '10px'
      },
      checkmark: {
        display: 'block',
        height: '5px',
        position: 'absolute',
        width: '5px'
      },
      cmafter: {
        zIndex: 1,
        transform: 'rotate(135deg)',
        borderRight: '3px solid #4caf50',
        borderTop: '3px solid #4caf50',


        //Positioning and stuff
        content: '" "',
        display: this.state.isChecked ? 'block' : 'none',
        height: '5px',
        left: '2px',
        position: 'absolute',
        top: '0px',
        width: '15px'
      }
    };

    return (styles[styleName]);
  }

  render() {

    return (
      <div
          style={{...this.getStyle('container')}}
      >
        <div
            className="cbcont"
            ref="checkMe"
            checked={this.props.checkedOption.value}
            style={{...this.getDefaultStyle('cbcont')}}
        >
          <label
              className="checkmark"
              style={{...this.getDefaultStyle('checkmark')}}
          >
              <span
                  className="cmafter"
                  style={{...this.getDefaultStyle('cmafter')}}
              >
              </span>
          </label>
        </div>
        <input
            ref="checkMe"
            type="checkbox"
            style={{...this.getDefaultStyle('input')}}
            onChange={()=>{
              this.handleSelect();
              setTimeout(()=>this.setState({...this.state, isChecked: !this.state.isChecked}),0);
            }}
            checked={this.props.checkedOption.value}
        />
        <span
            style={{...this.getStyle('label')}}
        >
            {this.props.label}
        </span>
      </div>
    );
  }
}

SettingsCheckbox.propTypes = propTypes;
export default SettingsCheckbox;
