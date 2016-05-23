import React from 'react';
import Radium from 'radium';
//import ReactTooltip from 'react-tooltip';
import VCStatus from '../../components/vcstatus';

class AppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  componentWillMount() {
  }


  render() {
    // app bar styles
    const styles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      order: '0',
      backgroundColor: '#0544a4',
      width: '100%',
      color: '#FFFFFF',
      height: '70px'
      };


    return (
      <div>
        <div className="appbar" style={styles}>
          <VCStatus status="offline" />
        </div>
      </div>
    );
  }
}

AppBar.contextTypes = {
  store: React.PropTypes.object
};

export default Radium(AppBar);
