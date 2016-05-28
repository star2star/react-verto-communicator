import React from 'react';
import SvgIcons from './svgIcons';

const propTypes = {
  Style : React.PropTypes.object
};

class Dialpad extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <input />
        </div>
        
      </div>);
  }
}

Dialpad.propTypes = propTypes;

export default Dialpad;
