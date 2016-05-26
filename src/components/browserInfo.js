import React from 'react';
import VertoBaseComponent from '../../components/vertobase';

 const propTypes = {
    browserIcon : React.PropTypes.object.isRequired,
    browserLink : React.PropTypes.string.isRequired,
    browserName : React.PropTypes.object.isRequired,
    browserVersion : React.PropTypes.object.isRequired,
    ariaLabel : React.PropTypes.string,
    role : React.PropTypes.string,
    tabIndex : React.PropTypes.number,
    style : React.PropTypes.object
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
              <div style={this.getStyle("bnsInfoStyle")}>
                  <div
                      style={this.getStyle("browserIconStyle")}
                      tabIndex={this.props.tabIndex}
                      >
                      <a
                          href ={this.props.browserLink} target="_blank"
                          ariaLabel={this.props.ariaLabel}
                          role={this.props.role}
                        >
                        {this.props.browserIcon}
                      </a>
                  </div>
                  <div
                      style={this.getStyle("browserNameStyle")}
                      ariaLabel={this.props.ariaLabel}
                      tabIndex={this.props.tabIndex}
                      >
                      {this.props.browserName}
                  </div>
                  <div
                      style={this.getStyle("browserVersionStyle")}
                      tabIndex={this.props.tabIndex}
                      ariaLabel={this.props.ariaLabel}
                      >
                      {this.props.browserVersion}
                  </div>
              </div>

        );
    }
}

BrowserInfo.propTypes = propTypes;

export default BrowserInfo;
