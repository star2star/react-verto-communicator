import React from 'react';
import VertoBaseComponent from './vertobasecomponent.js';
import {
AvatarSVG,
CaretUpIconSVG,
CaretDownIconSVG } from './svgIcons';

const propTypes = {
  compStyle : React.PropTypes.object
};

const defaultProps = {
  allowDisplayDetails : false
};

class UserMenu extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {'dropdownDisplayed': false};
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
        width: '32px',
        cursor: 'pointer'
      },
      caret: {
        fill: '#fff',
        flexGrow: 1,
        cursor: 'pointer',
        height: '20px',
        width: '20px',
        paddingBottom: '3px'
      },
      menu: {
        position: 'absolute',
        fontSize: '14px',
        top: '60px',
        right: '100px',
        minWidth: '160px',
        padding: '5px 0',
        margin: '2px 0 0',
        display: this.state.dropdownDisplayed ? 'flex' : 'none',
        flexDirection: 'column',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
        boxShadow: '0 2px 5px 0 rgba(0,0,0,.25)'
      },
      // header: {
      //   display: 'flex',
      //   justifyContent: 'center',
      //   color: '#4a4a4a',
      //   padding: '5px',
      //   backgroundColor: '#F7F7F7',
      //   fontFamily: 'sans-serif'
      // },
      ul: {

      },
      li: {
        color: 'red',
        //padding: '8px 20px',
        //padding: '20px 20px',
        fontWeight: '400',
        fontSize: '14px',
        fontFamily: 'sans-serif'
      }

    };

    return (styles[styleName]);
  }


  showMenu() {
    if (this.props.allowDisplayDetails) {
      this.setState({...this.state, dropdownDisplayed: !this.state.dropdownDisplayed});
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
        <AvatarSVG svgStyle={{...this.getStyle('icon'), fill: 'white'}}  />
          {this.state.dropdownDisplayed ?
              <CaretUpIconSVG svgStyle={{...this.getStyle('caret'), fill: 'white'}} /> :
              <CaretDownIconSVG svgStyle={{...this.getStyle('caret'), fill: 'white'}} />}
            {menuContainer}
      </span>
    );
  }
}

UserMenu.propTypes = propTypes;
UserMenu.defaultProps = defaultProps;
export default UserMenu;
