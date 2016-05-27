import React from 'react';
import VertoBaseComponent from './vertobasecomponent.js';
import {
//SignalNoneIconSVG,
SignalMediumIconSVG,
SignalFullIconSVG,
SignalLowIconSVG,
CaretUpIconSVG,
CaretDownIconSVG } from './svgIcons';


const propTypes = {
  networkData : React.PropTypes.object.isRequired,
  allowDisplayDetails : React.PropTypes.bool,
  compStyle : React.PropTypes.object
};

const defaultProps = {
  allowDisplayDetails : true
};

class NetworkStatusIndicator extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {'dropdownDisplayed': false};

    this.toggleDisplay = this.toggleDisplay.bind(this);

    NetworkStatusIndicator.toggleNetworkStatus = this.toggleDisplay.bind(this);
  }

  getCompStyle() {
    console.log('#### compStyle', this.props.compStyle);
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      container: {
        display: 'flex',
        position: 'relative'
      },
      icon: {
        height: '24px',
        width: '24px'
      },
      caret: {
        fill: '#fff',
        flexGrow: 1,
        height: '17px',
        width: '19px'
      },
      menu: {
        position: 'absolute',
        top: '60px',
        right: '30px',
        display: this.state.dropdownDisplayed ? 'flex' : 'none',
        flexDirection: 'column',
        //padding: '10px',
        border: '1px solid #ccc'
      },
      header: {
        display: 'flex',
        justifyContent: 'center',
        color: '#4a4a4a',
        padding: '5px',
        backgroundColor: '#F7F7F7',
        fontFamily: 'sans-serif'
      },
      li: {
        color: '#4a4a4a',
        paddingLeft: '10px',
        paddingRight: '10px',
        fontFamily: 'sans-serif'
      }

    };

    return (styles[styleName]);
  }

  toggleDisplay() {
    this.setState({...this.state,'dropdownDisplayed': !this.state.dropdownDisplayed});
  }



  render() {

    console.log('&&&&&&&&&&&&& this.props.compStyle', this.props.compStyle);

    let bwp = 4;
    const networkData = this.props.networkData;
    if(networkData.upkpbs < 2000) {
      bwp--;
    }
    if(networkData.downkpbs < 2000) {
      bwp--;
    }

    let icon;
    switch(bwp) {
        case 4:
            icon = (<SignalFullIconSVG svgStyle={{...this.getStyle('icon'), fill: 'green'}} />);
            break;
        case 3:
            icon = (<SignalMediumIconSVG svgStyle={{...this.getStyle('icon'), fill: 'yellow'}} />);
            break;
        default:
            icon = (<SignalLowIconSVG svgStyle={{...this.getStyle('icon'), fill: 'red'}} />);
    }

    const caret = this.state.dropdownDisplayed ? (<CaretUpIconSVG svgStyle={this.getStyle('caret')}/>)
    : (<CaretDownIconSVG svgStyle={this.getStyle('caret')}/>);

    const iconsContainer = (
      <div
          networkData={this.networkData}
<<<<<<< HEAD
=======
          style={this.getStyle('container')}
>>>>>>> 814ffc744c5214969f45e6d475e3ffbb3f85f76a
      >
        {icon}
        {caret}
      </div>
    );

    const menuContainer = (
<<<<<<< HEAD
      <div className="menuContainer" style={this.getStyle('menu')} >
=======
      <div style={this.getStyle('menu')} >
>>>>>>> 814ffc744c5214969f45e6d475e3ffbb3f85f76a
        <div style={this.getStyle('header')} >
            Bandwidth Info
        </div>
        <div
            onClick={this.props.cbMenuClick}
            style={this.getStyle('li')}
<<<<<<< HEAD
            className="upkpbs"
=======
>>>>>>> 814ffc744c5214969f45e6d475e3ffbb3f85f76a
        >
          Outgoing: {this.props.networkData.upkpbs}
        </div>
        <div
            onClick={this.props.cbMenuClick}
            style={this.getStyle('li')}
        >
          Incoming: {this.props.networkData.downkpbs}
        </div>
        <div
            onClick={this.props.cbMenuClick}
            style={this.getStyle('li')}
        >
            Video Resolution: {this.props.networkData.vidQual}
        </div>
      </div>
    );

    let nsi;
    if(this.props.allowDisplayDetails) {
      nsi =
        (<div
            style={this.getStyle('container')}
            onClick={
              this.toggleDisplay
            }
         >
          {iconsContainer}
          {menuContainer}
        </div>);
    } else {
      return icon;
    }

    return (
      nsi
    );
  }
}

NetworkStatusIndicator.propTypes = propTypes;
NetworkStatusIndicator.defaultProps = defaultProps;
export default NetworkStatusIndicator;
