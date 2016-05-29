import React from 'react';
import VertoBaseComponent from './vertobasecomponent.js';
import {
TagIconSVG,
CaretUpIconSVG,
CaretDownIconSVG } from './svgIcons';

const propTypes = {
  compStyle : React.PropTypes.object
};

const defaultProps = {
  allowDisplayDetails : false
};

class TagMenu extends VertoBaseComponent {
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
        <TagIconSVG svgStyle={{...this.getStyle('icon'), fill: 'white'}}  />
          {this.state.dropdownDisplayed ?
              <CaretUpIconSVG svgStyle={{...this.getStyle('caret'), fill: 'white'}} /> :
              <CaretDownIconSVG svgStyle={{...this.getStyle('caret'), fill: 'white'}} />}
          {menuContainer}
      </span>
    );
  }
}

TagMenu.propTypes = propTypes;
TagMenu.defaultProps = defaultProps;
export default TagMenu;
