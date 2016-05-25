import React from 'react';
import VertoBaseComponent from '../../components/vertobase';
import Radium from 'radium';
//import ReactTooltip from 'react-tooltip';
import VCStatus from '../../components/vcstatus';

class AppBar extends VertoBaseComponent {
  constructor(props) {
    super(props);

    this.state={};
  }

  componentWillMount() {
  }

  getDefaultStyle(styleName) {
    const styles = {
          appbarStyles: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            order: '0',
            backgroundColor: '#0544a4',
            width: '100%',
            color: '#FFFFFF',
            height: '70px'
          }
        };

    return (styles[styleName]);
  }

//   getStyle(styleName) {
//     const styles = {
//       appbarStyles: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         flexDirection: 'row',
//         order: '0',
//         backgroundColor: '#0544a4',
//         width: '100%',
//         color: '#FFFFFF',
//         height: '70px'
//       }
//     };
//
//   let styleReturn = styles[styleName];
//
//   // apply the themed styling
//   if(window.theme && (window.theme.value != 'default') && window.theme.themes[window.theme.value]['appbar'][styleName]) {
//     console.log('Theme Styling',window.theme.themes[window.theme.value]['appbar'][styleName]);
//     styleReturn = {...styleReturn, ...window.theme.themes[window.theme.value]['appbar'][styleName]};
//   }
//
//   if(this.props.Style && this.props.Style[styleName]) {
//     styleReturn = {...styleReturn, ...this.props.Style[styleName]};
//   }
//   return styleReturn;
// }


  render() {
    console.log('#### window theme style', window.theme);
    return (
      <div>
        <div className="appbar" style={this.getStyle('appbarStyles')}>
          <VCStatus status = 'Connecting' />
        </div>
      </div>
    );
  }
}

AppBar.contextTypes = {
  store: React.PropTypes.object
};

export default Radium(AppBar);
