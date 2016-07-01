import React from 'react';
import VertoBaseComponent from './vertobasecomponent.js';
import {Motion, spring} from 'react-motion';

const propTypes = {
  cbSubmitSetting: React.PropTypes.func.isRequired,
  checkedOption: React.PropTypes.shape({
    name: React.PropTypes.string,
    value: React.PropTypes.bool
  }).isRequired,
  compStyle : React.PropTypes.object,
  label: React.PropTypes.string.isRequired
};

const springSettings = {stiffness: 170, damping: 26};

class SettingsCheckbox extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state={ isChecked: this.props.checkedOption.value, items: [[13,5],[13,5]], currItem: 0 };

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
        paddingBottom: '5px',
        position: 'relative'
      },

      cbcont: {
        position: 'relative',
        borderRadius: '2px',
        backgroundColor: '#fff',
        display: 'inline-block',
        height: '14px',
        width: '14px'
      },
      input: {
        zIndex: 10,
        position: 'absolute',
        left: '-5px',
        top: '-7px',
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
        backgroundColor: '#fff',
        borderRadius: '4px',
        height: '14px',
        position: 'absolute',
        width: '14px'
      },
      cmafter: {
        zIndex: 1,
        position: 'absolute',
        left: '2px',
        top: '0px',
        content: '" "',
        transform: 'rotate(135deg)',
        borderRight: this.state.isChecked ? '3px solid #4caf50' : 'none',
        borderTop: this.state.isChecked ? '3px solid #4caf50' : 'none',
        height: this.state.isChecked ? '5px' : '0px',
        width: this.state.isChecked ? '13px' : '0px',
        transition : 'width .5s ease, height .5s ease',
        //animation: 'x .5s ease',
        //animationName: checkoff,
      },
      emptyDiv: {

      }
    };

    return (styles[styleName]);
  }



  render() {



    // Sliding Animation Styles
      // const {items, currItem} = this.state;
      // const [currWidth, currHeight] = items[currItem];
      // const widths = items.map(([origW, origH])=> currHeight / origH * origW);
      // const leftStartCoords = widths
      //   .slice(0, currItem)
      //   .reduce((sum,width) => sum - width, 0);
      //
      // let configs = [];
      // items.reduce((prevLeft, [origW, origH], i) => {
      //   configs.push({
      //     left: spring(prevLeft, springSettings),
      //     height: spring(currHeight, springSettings),
      //     width: spring(widths[i], springSettings)
      //   });
      //   return prevLeft + widths[i];
      // }, leftStartCoords);

    return (
      <div
          style={{...this.getStyle('container')}}
      >
        <div
            className="cbcont"
            style={{...this.getDefaultStyle('cbcont')}}
        >
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
