import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import { FormattedMessage } from 'react-intl';
import { EdgeBrowserIconSVG,
              ChromeBrowserIconSVG,
              FireFoxBrowserIconSVG,
              OperaBrowserIconSVG } from './svgIcons.js';
import BrowserInfo from './browserInfo.js';

const propTypes = {

};

class Browser extends VertoBaseComponent {
  constructor(props) {
    super(props);
  }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      browserStyles : {

      },
        pageStyle : {
            fontFamily: 'sans-serif',
            color: 'gray',
            margin: '0rem'
        },
        infoContainerStyle : {
            margin: '0 auto 0 auto',
            width: '44rem'
        },
        headerContainerStyle : {
            backgroundColor: '#CB6969',
            color: '#fff',
            minHeight: '30rem',
            margin: '0 auto',
            fontStyle: 'none',
            marginBottom: '4rem'
        },
        titleStyle : {
            fontSize: '5rem',
            textAlign: 'center',
            paddingTop: '10rem'
        },
        browserIcon : {
            margin: '0 ',
            padding: '0',
            width: '40px',
            height: '40px'
        }
    };

    return (styles[styleName]);
  }

  render() {
    return (
    <div>Browser Not Supported</div>
      /*<div style={this.getStyle("pageStyle")}>
          <div
              className="headerContainer"
              style={this.getStyle("headerContainerStyle")}>
                titleStyle={this.getStyle("titleStyle")}
                <FormattedMessage
                    id="BROWSER_SUPPORT_TITLE"
                    value="Browser not supported"/>
                <FormattedMessage
                    id="BROWSER_SUPPORT_TEXT"
                    defaultMessage="The browser you are using isn't supported by our software. Please see below for alternate browser you can use. Once you have chosen an alternative browser you'll be able to access the session link using it."/>
            </div>

                <div style={{width:'100%'}}>
                    <div className="infoContainer"
                        style={this.getStyle("infoContainerStyle")}>

                        <BrowserInfo
                            browserIcon=<EdgeBrowserIconSVG
                                svgStyle={{height: '24px', width: '24px'}}/>
                            browserName=<FormattedMessage
                                id="BROWSER_NAME_EDGE"
                                defaultMessage="Edge"/>
                            browserVersion=<FormattedMessage
                                id="BROWSER_VERSIONS_EDGE"
                                defaultMessage="All"/>
                              />

                        <BrowserInfo
                            browserIcon=<ChromeBrowserIconSVG
                                svgStyle={{'height: '24px', width: '24px'}}
                              />
                            browserLink={WhiteLabel.get('chromeDownloadURL')}
                            browserName=<FormattedMessage
                                id="BROWSER_NAME_CHROME"
                                defaultMessage="Chrome"/>
                            browserVersion=<FormattedMessage
                                id=""BROWSER_VERSIONS_CHROME"
                                defaultMessage="All"/>
                        />

                        <BrowserInfo
                            browserIcon=<FireFoxBrowserIconSVG
                                svgStyle={{ height: '24px', width: '24px'}}
                              />
                            browserLink={WhiteLabel.get('firefoxDownloadURL')}
                            browserName=<FormattedMessage
                                id="BROWSER_NAME_FIREFOX"
                                defaultMessage="Firefox"/>
                            browserVersion=<FormattedMessage
                                id="BROWSER_VERSIONS_FIREFOX"
                                defaultMessage="All"/>
                        />

                      <BrowserInfo
                          browserIcon=<OperaBrowserIconSVG
                              svgStyle={{height: '24px', width: '24px'}} />
                          browserLink={WhiteLabel.get('safariDownloadURL')}
                          browserName=<FormattedMessage
                              id="BROWSER_NAME_OPERA"
                              defaultMessage="Opera" />
                          browserVersion=<FormattedMessage
                              id="bns.operaVersions"
                              defaultMessage="All" />
                        />
                    </div>
                </div>
            </div>*/
        );
    }
}

Browser.propTypes = propTypes;

export default Browser;
