import React from 'react';
import SvgIcons from './svgIcons';

const propTypes = {
  Style : React.PropTypes.object
};

class Browser extends React.Component {
  constructor(props) {
    super(props);
  }

  getStyle(styleName) {
        const styles = {

        };

  let styleReturn = styles[styleName];
  if(this.props.Style && this.props.Style[styleName]) {
    styleReturn = {...styleReturn, ...this.props.Style[styleName]};
  }
  return styleReturn;
}


  render() {
    return (<div>Browser</div>);
  }
}

Browser.propTypes = propTypes;

export default Browser;
