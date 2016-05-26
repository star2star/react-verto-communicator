import React from 'react';
import VertoBaseComponent from './vertobase.js';
import {
SignalNoneIconSVG,
SignalMediumIconSVG,
SignalFullIconSVG,
CaretDownIconSVG } from './svgIcons';


const propTypes = {
  conn : React.PropTypes.object.isRequired,
  //cbOpen : React.PropTypes.func.isRequired,
  cbMenuClick : React.PropTypes.func,
  menuDisplayed : React.PropTypes.bool,
  locale : React.PropTypes.string,
  label : React.PropTypes.string,
  ariaRole : React.PropTypes.string,
  tabIndex : React.PropTypes.number,
  style : React.PropTypes.object
};

const defaultProps = {
  //menuDisplayed : false
};

class NetworkStatusIndicator extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {'menuDisplayed': false};
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
        display: this.state.menuDisplayed ? 'flex' : 'none',
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
    const conn = this.props.conn;
    if(conn.upkpbs < 2000) {
      bwp--;
    }
    if(conn.downkpbs < 2000) {
      bwp--;
    }

    let icon = (<SignalFullIconSVG svgStyle={{...this.getDefaultStyle('icon'), fill: 'green'}} />);
    switch(true) {
        case 4:
            icon;
            break;
        case (bwp <= 2):
            icon = (<SignalNoneIconSVG svgStyle={{...this.getDefaultStyle('icon'), fill: 'red'}} />);
            break;
        case (bwp < 4):
            icon = (<SignalMediumIconSVG svgStyle={{...this.getDefaultStyle('icon'), fill: 'yellow'}} />);
            break;
        default:
            icon;
    }

    return (
      <div
          onClick={()=>{
            //console.log(this.state.menuDisplayed);
            this.setState({...this.state,'menuDisplayed': !this.state.menuDisplayed});
          }}
      >
        <div
            conn={this.conn}
            style={this.getDefaultStyle('container')}
        >
          {icon}
          <CaretDownIconSVG svgStyle={this.getDefaultStyle('caret')}/>
        </div>
        <div style={this.getDefaultStyle('menu')} >
          <div style={this.getDefaultStyle('header')} >Bandwidth Info</div>
          <div
              onClick={this.props.cbMenuClick}
              style={this.getDefaultStyle('li')}
          >
            Outgoing: {this.props.conn.upkpbs}
          </div>
          <div
              onClick={this.props.cbMenuClick}
              style={this.getDefaultStyle('li')}
          >
            Incoming: {this.props.conn.downkpbs}
          </div>
          <div
              onClick={this.props.cbMenuClick}
              style={this.getDefaultStyle('li')}
          >
              Video Resolution: {this.props.conn.vidQual}
          </div>
        </div>
      </div>
    );
  }
}

NetworkStatusIndicator.propTypes = propTypes;
NetworkStatusIndicator.defaultProps = defaultProps;
export default NetworkStatusIndicator;
