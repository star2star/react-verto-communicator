import React from 'react';
import { MenuIconSVG } from './svgIcons';
//waiting on the SVG icon from design CJS
const propTypes = {
  status : React.PropTypes.oneOf(['Connected','Disconnected', 'Connecting']).isRequired,
}

class VCStatus extends React.Component {
  constructor(props) {
    super(props);
  }
  getStyle(styleName) {
    const styles = {
      svgStyle: {width: "25px",
      height: "25px"}

    };

  let styleReturn = styles[styleName];
  if(this.props.Style && this.props.Style[styleName]) {
    styleReturn = {...styleReturn, ...this.props.Style[styleName]};
  }
  return styleReturn;
}

  render() {
    //Still waiting on what the actual status name will be, should still be pretty clear
    let fillColor;
    if(this.props.status == 'Disconnected'){
      fillColor = "red";
    }else if(this.props.status == 'Connecting'){
      fillColor = "yellow";
    }else if(this.props.status == 'Connected' ){
      fillColor = "green";
    }
     return (< MenuIconSVG svgStyle = {{...this.getStyle('svgStyle'), fill: fillColor}} />);
  }
}

VCStatus.propTypes = propTypes;

export default VCStatus;
