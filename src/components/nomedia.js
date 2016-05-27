import React from 'react';
import SvgIcons from './svgIcons';

const propTypes = {
  Style : React.PropTypes.object
};

class NoMedia extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div> No Media enable it </div>);
  }
}

NoMedia.propTypes = propTypes;

export default NoMedia;
