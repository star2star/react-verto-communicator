import React from 'react';
import { MenuIconSVG } from './svgIcons';


class VCStatus extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('^^^^^^^', this.props, MenuIconSVG);
    return (< MenuIconSVG svgStyle = {{width: "25px", height: "25px", fill: "yellow" }}/>);
  }
}

export default VCStatus;
