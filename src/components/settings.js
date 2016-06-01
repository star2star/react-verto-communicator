import React from 'react';
import VertoBaseComponent from './vertobasecomponent.js';
import { FormattedMessage } from 'react-intl';
import {
SettingsIconSVG,
CaretUpIconSVG,
CaretDownIconSVG } from './svgIcons';

const propTypes = {
  compStyle : React.PropTypes.object,
  cbClick: React.PropTypes.func.isRequired,
  data: React.PropTypes.object.isRequired
};

const defaultProps = {
  allowDisplayDetails : false
};

class Settings extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {'dropdownDisplayed': this.props.allowDisplayDetails };

    this.showMenu = this.showMenu.bind(this);

    Settings.toggleSettings = this.showMenu;
  }

  handleChange() {
      const setChange= this.refs.settingSelect.value;
      // console.log('------->', setChange);
      this.props.cbSettingSubmit(setChange);
    }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      container: {
        display: 'flex',
        position: 'relative'
      },
      icon: {
        fill: this.props.allowDisplayDetails ? '#fff' : '#ccc',
        height: '24px',
        width: '24px',
        cursor: 'pointer'
      },
      caret: {
        fill: this.props.allowDisplayDetails ? '#fff' : '#ccc',
        flexGrow: 1,
        height: '16px',
        width: '20px',
        paddingBottom: '3px'
      },
      menu: {
        position: 'absolute',
        top: '60px',
        right: '30px',
        display: this.state.dropdownDisplayed ? 'flex' : 'none',
        flexDirection: 'column',
        //padding: '10px',
        border: '1px solid #ccc',
        backgroundColor: 'white'
      },
      header: {
        display: 'flex',
        justifyContent: 'center',
        color: '#4a4a4a',
        padding: '5px',
        backgroundColor: '#F7F7F7',
        fontFamily: 'sans-serif'
      },
      li: {
        color: '#4a4a4a',
        paddingLeft: '10px',
        paddingRight: '10px',
        fontFamily: 'sans-serif'
      }

    };

    return (styles[styleName]);
  }


  showMenu() {
    if (this.props.allowDisplayDetails) {
      const newShow = !this.state.dropdownDisplayed;
      this.props.cbClick(newShow);
      this.setState({...this.state, dropdownDisplayed: newShow});
    }
  }

  render() {
    const menuContainer = (

      <div className="menuContainer" style={this.getStyle('menu')} >
        {this.props.children}
      </div>
    );

    console.log('settings render props: ', this.props.data);
    return (
      <span onClick={this.showMenu.bind(this)}  >
        <SettingsIconSVG svgStyle={{...this.getStyle('icon')}}  />
          {this.state.dropdownDisplayed ?
              <CaretUpIconSVG svgStyle={{...this.getStyle('caret')}} /> :
              <CaretDownIconSVG svgStyle={{...this.getStyle('caret')}} />}
          {menuContainer}
      </span>
    );
  }
}

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;
export default Settings;
