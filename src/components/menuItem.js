import React from 'react';
import VertoBaseComponent from './vertobasecomponent.js';

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
        color: '#4a4a4a',
        paddingLeft: '10px',
        paddingRight: '10px',
        fontFamily: 'sans-serif',
        cursor: 'pointer'
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
export default MenuItem;
