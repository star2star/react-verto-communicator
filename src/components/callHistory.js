import React from 'react';
import VertoBaseComponent from './vertobasecomponent';
import CallHistoryItem from './callHistoryItem';

const propTypes = {
  compStyle : React.PropTypes.object,
  history: React.PropTypes.array.isRequired,
  cbBack: React.PropTypes.func.isRequired
};

class CallHistory extends VertoBaseComponent {
  constructor(props) {
    super(props);
}

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      container: {
        display: 'flex',
        flex: 1,
        alignItems: "flex-start",
        borderRadius: '3px',
        justifyContent: 'flex-start',
        flexDirection: "column",
        maxWidth: "500px",
        boxShadow: '0 16px 28px 0 rgba(0,0,0,.22),0 25px 55px 0 rgba(0,0,0,.21)',
        color: "#4a4a4a"
      },
      header: {
        display: 'flex',
        width: '100%',
        borderTopLeftRadius: '3px',
        borderTopRightRadius: '3px',
        alignItems: 'center',
        justifyContent: 'stretch',
        fontWeight: 300,
        height: '40px',
        backgroundColor: '#eee'
      }
     };

    return (styles[styleName]);
  }

  render(){
    return (
      <div
          className="container"
          style={this.getStyle('container')}
      >
        <div
            className="header"
            style={{...this.getDefaultStyle('header')}}
        >
            Call History
        </div>
        <div
          className="body"
          style={{...this.getDefaultStyle('body')}}
        >
          {this.props.history.map((i, index)=>{
            return (
              <CallHistoryItem key={index} data={i} />
            );
          })}
        </div>
        <div onClick={this.props.cbBack}>Back</div>
      </div>);
  }

}

CallHistory.propTypes = propTypes;
export default CallHistory;
