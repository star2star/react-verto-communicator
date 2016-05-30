import React from 'react';
import VertoBaseComponent from './vertobasecomponent.js';
import {
SettingsIconSVG,
CaretUpIconSVG,
CaretDownIconSVG } from './svgIcons';

const propTypes = {
  compStyle : React.PropTypes.object,
  cbClick: React.PropTypes.func.isRequired
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
        height: '32px',
        width: '32px'
      },
      caret: {
        fill: '#fff',
        flexGrow: 1,
        height: '20px',
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
      this.props.cbClick(newShow)
      this.setState({...this.state, dropdownDisplayed: newShow});
    }
  }

  render() {
    const menuContainer = (

      <div className="menuContainer" style={this.getStyle('menu')} >
        {this.props.children}
      </div>
    );


    return (
      <span onClick={this.showMenu.bind(this)}  >
        <SettingsIconSVG svgStyle={{...this.getStyle('icon'), fill: 'white'}}  />
          {this.state.dropdownDisplayed ?
              <CaretUpIconSVG svgStyle={{...this.getStyle('caret'), fill: 'white'}} /> :
              <CaretDownIconSVG svgStyle={{...this.getStyle('caret'), fill: 'white'}} />}
          {menuContainer}
      </span>
    );
  }
}

Settings.propTypes = propTypes;
Settings.defaultProps = defaultProps;
export default Settings;
