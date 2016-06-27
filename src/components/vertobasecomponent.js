import React from 'react';
import themes from '../themes/theme-styles.js';

class VertoBaseComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  findWrappedMethods(obj={},methodName){
    //console.log('ooooo', obj, methodName );
    if (!methodName) return;

    if (obj[methodName])
      return obj;

    if(obj['getWrappedInstance']){
      return this.findWrappedMethods(obj['getWrappedInstance'](), methodName);
    }

    return;
  }
  getClassName() {
    //console.log('*****', this, this.constructor.name );
    const xName = Object.getPrototypeOf(this.constructor).name;
    // if it equals base we need to just get it from constructor ... we handle higher order objects by default
    return xName.toLowerCase() === 'vertobasecomponent' ? this.constructor.name : xName;
  }
  applyThemeStyle(styleName, styles) {
    // NOTE: the 'themes' object is imported (in case you are looking for where
    // it is defined)

    const componentName = this.getClassName().toLowerCase();
    //console.log("############################",componentName);
    if(themes[window.theme.value][componentName][styleName]) {
      //console.log('Theme Styling',themes[window.theme.value][componentName][styleName]);
      return( {...styles, ...themes[window.theme.value][componentName][styleName]});
    }
  }

  getStyle(styleName) {
    const styles = this.getDefaultStyle(styleName);

    let styleReturn = styles;

    // apply the themed styling
    if(window.theme && (window.theme.value != 'default')) {
      styleReturn = this.applyThemeStyle(styleName, styles);
    }

    // apply style from props
    const compStyle = this.getCompStyle();
    //console.log('base style props', compStyle);
    if(compStyle && compStyle[styleName]) {
      styleReturn = {...styleReturn, ...compStyle[styleName]};
    }
    return styleReturn;
  }




}

export default VertoBaseComponent;
