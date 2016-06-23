import React from 'react';
import VertoBaseComponent from './vertobasecomponent.js';
import Radium from 'radium';

const propTypes = {
  compStyle : React.PropTypes.object
};

const defaultProps = {
  allowDisplayDetails : false
};

class MenuItem extends VertoBaseComponent {
  constructor(props) {
    super(props);
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
      li: {
        color: '#333',
        padding: '5px 20px',
        fontFamily: 'sans-serif',
        cursor: 'pointer',
        ':hover': {
          color: '#009688'
        }
      }

    };

    return (styles[styleName]);
  }

  render() {
    return (
      <div
          onClick={this.props.cbAction}
          style={this.getStyle('li')}
      >
        {this.props.label}
      </div>
    );
  }
}

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;
export default Radium(MenuItem);
