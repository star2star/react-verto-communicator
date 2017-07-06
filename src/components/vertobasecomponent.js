import React from 'react';
import { fromJS } from 'immutable';
import themes from '../themes/theme-styles';

const objectMerge = require('object-merge');

class VertoBaseComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // static filename = "vertobasecomponent";
  //  static displayName = "VertoBaseComponent";

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !fromJS(nextProps).equals(fromJS(this.props)) || !fromJS(nextState).equals(fromJS(this.state))
    );
  }

  getStyle(styleName) {
    const styles = this.getDefaultStyle(styleName);

    let styleReturn = styles;

    // apply the themed styling
    if (window.theme && window.theme.value !== 'default') {
      styleReturn = this.applyThemeStyle(styleName, styles);
    }

    // apply style from props
    const compStyle = this.getCompStyle();
    if (compStyle && compStyle[styleName]) {
      styleReturn = objectMerge(styleReturn, compStyle[styleName]);
    }
    return styleReturn;
  }

  getCompStyle(styleName) {
    return this.props.compStyle && this.props.compStyle[styleName]
      ? this.props.compStyle[styleName]
      : this.props.compStyle;
  }

  getClassName() {
    const xName = Object.getPrototypeOf(this.constructor).name;
    // if it equals base we need to just get it from constructor ... we handle higher order objects by default
    return xName.toLowerCase() === 'vertobasecomponent' ? this.constructor.name : xName;
  }

  findWrappedMethods(obj = {}, methodName) {
    if (!methodName) return;

    if (obj[methodName]) return obj;

    if (obj.getWrappedInstance) {
      return this.findWrappedMethods(obj.getWrappedInstance(), methodName);
    }
  }

  applyThemeStyle(styleName, styles) {
    // NOTE: the 'themes' object is imported (in case you are looking for where
    // it is defined)

    const componentName = this.getClassName().toLowerCase();
    if (
      themes[window.theme.value][componentName] &&
      themes[window.theme.value][componentName][styleName]
    ) {
      return objectMerge(styles, themes[window.theme.value][componentName][styleName]);
    }
    return styles;
  }
}

export default VertoBaseComponent;
// reviewed on 7/14/2016
