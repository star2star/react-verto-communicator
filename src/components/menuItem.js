import React from 'react';
import VertoBaseComponent from './vertobasecomponent.js';
import Radium from 'radium';
import { fromJS } from "immutable";

class MenuItem extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    compStyle : React.PropTypes.object
  };

  static defaultProps = {
    allowDisplayDetails : false
  };

  static filename = "menuItem";
  static displayName = "MenuItem";

  shouldComponentUpdate(nextProps, nextState) {
    return !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state));
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


export default Radium(MenuItem);
// reviewed on 7/14/2016
