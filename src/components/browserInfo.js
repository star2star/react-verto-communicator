import React from 'react';
import VertoBaseComponent from './vertobasecomponent';

 const propTypes = {
   browserData : React.PropTypes.object.isRequired,
   compStyle : React.PropTypes.object
};

class BrowserInfo extends VertoBaseComponent {
    constructor(props){
        super(props);
    }

    getDefaultStyle(styleName) {
      const styles = {
        /*TODO flex  it, etc */
         bnsInfoStyle : {
            display: 'inline-block', //inline-flex?
            width: '11rem',
            textAlign: 'center'
        },
         browserIconStyle : {
            paddingLeft: '1rem'
        },
         browserNameStyle : {
            fontWeight: 'bold',
            borderBottom: 'solid 2px gray',
            paddingLeft: '1rem',
            paddingBottom: '1rem',
            marginTop: '1.5rem'
        },
         browserVersionStyle : {
            borderBottom: 'solid 1px gray',
            lineHeight: '3rem',
            paddingLeft: '1rem'
        }
      };

      return (styles[styleName]);
    }

        render() {
          return (
              <div style={this.getDefaultStyle("bnsInfoStyle")}>
                  <div style={this.getDefaultStyle("browserIconStyle")}>
                      <a href={this.props.browserData.link} target="_blank">
                          {this.props.browserData.icon}
                      </a>
                  </div>
                  <div
                      style={this.getDefaultStyle("browserNameStyle")}>
                      {this.props.browserData.name}
                  </div>
                  <div  style={this.getDefaultStyle("browserVersionStyle")}>
                      {this.props.browserData.version}
                  </div>
              </div>

        );
    }
}

BrowserInfo.propTypes = propTypes;

export default BrowserInfo;

/*
const browserData = {
  icon:
  name:
  link:
  version:
};
*/
