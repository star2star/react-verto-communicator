import React from 'react';
import VertoBaseComponent from './vertobase.js';
import {
SignalNoneIconSVG,
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
  //menuDisplayed : false
};

class NetworkStatusIndicator extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {'dropdownDisplayed': false};
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

  render() {

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
            icon = (<SignalFullIconSVG svgStyle={{...this.getDefaultStyle('icon'), fill: 'green'}} />);
            break;
        case 3:
            icon = (<SignalMediumIconSVG svgStyle={{...this.getDefaultStyle('icon'), fill: 'yellow'}} />);
            break;
        case 2:
            icon = (<SignalMediumIconSVG svgStyle={{...this.getDefaultStyle('icon'), fill: 'yellow'}} />);
            break;
        default:
            icon = (<SignalLowIconSVG svgStyle={{...this.getDefaultStyle('icon'), fill: 'red'}} />);
    }

    const caret = this.state.dropdownDisplayed ? (<CaretUpIconSVG svgStyle={this.getDefaultStyle('caret')}/>)
    : (<CaretDownIconSVG svgStyle={this.getDefaultStyle('caret')}/>);

    return (
      <div
          onClick={()=>{
            //console.log(this.state.menuDisplayed);
            this.setState({...this.state,'dropdownDisplayed': !this.state.dropdownDisplayed});
          }}
      >
        <div
            conn={this.conn}
            style={this.getDefaultStyle('container')}
        >
          {icon}
          {caret}
        </div>
        <div style={this.getDefaultStyle('menu')} >
          <div style={this.getDefaultStyle('header')} >Bandwidth Info</div>
          <div
              onClick={this.props.cbMenuClick}
              style={this.getDefaultStyle('li')}
          >
            Outgoing: {this.props.networkData.upkpbs}
          </div>
          <div
              onClick={this.props.cbMenuClick}
              style={this.getDefaultStyle('li')}
          >
            Incoming: {this.props.networkData.downkpbs}
          </div>
          <div
              onClick={this.props.cbMenuClick}
              style={this.getDefaultStyle('li')}
          >
              Video Resolution: {this.props.networkData.vidQual}
          </div>
        </div>
      </div>
    );
  }
}

NetworkStatusIndicator.propTypes = propTypes;
NetworkStatusIndicator.defaultProps = defaultProps;
export default NetworkStatusIndicator;
